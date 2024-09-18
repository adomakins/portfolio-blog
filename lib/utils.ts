import { Client } from '@notionhq/client'
import { PageObjectResponse, ListBlockChildrenResponse, BlockObjectResponse, RichTextItemResponse } from '@notionhq/client/build/src/api-endpoints'
import { QueryDatabaseParameters } from '@notionhq/client/build/src/api-endpoints'
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function notionQuery(databaseName: string, filter?: QueryDatabaseParameters['filter'], sorts?: QueryDatabaseParameters['sorts']) {
  const databaseId = process.env[`NOTION_${databaseName.toUpperCase()}_DB_ID`];
  const notion = new Client({ auth: process.env.NOTION_SECRET_KEY });

  if (!databaseId) {
    throw new Error('Database ID not found!')
  }

  const response = await notion.databases.query({
    database_id: databaseId,
    filter: filter,
    sorts: sorts
  });


  return response.results
    .filter((page): page is PageObjectResponse => 'properties' in page)
    .map(page => {
      const properties: { [key: string]: string } = {};
      properties['id'] = page.id;

      for (const [key, value] of Object.entries(page.properties)) {
        const lowercaseKey = key.toLowerCase();
        switch (value.type) {
          case 'title':
            properties[lowercaseKey] = value.title[0]?.plain_text ?? '' as string;
            break;
          case 'rich_text':
            properties[lowercaseKey] = value.rich_text[0]?.plain_text ?? '' as string;
            break;
          case 'url':
            properties[lowercaseKey] = value.url ?? '' as string;
            break;
          case 'select':
            properties[lowercaseKey] = value.select?.name ?? '' as string;
            break;
          case 'files':
            const fileObj = value.files[0];
            if (fileObj) {
              properties[lowercaseKey] = 'file' in fileObj
                ? fileObj.file.url
                : fileObj.external?.url ?? '' as string;
            } else {
              properties[lowercaseKey] = '' as string;
            }
            break;
          case 'date':
            properties[lowercaseKey] = value.date?.start ?? '' as string;
            break;
          case 'checkbox':
            properties[lowercaseKey] = value.checkbox.toString() ?? '' as string;
            break;
        }
      }

      return properties;
    });
}

interface RichTextItem {
  text: string;
  link?: string;
  annotations?: RichTextItemResponse['annotations'];
  // Add any other fields you might need
}

interface Block {
  type: string;
  text: RichTextItem[];
}

interface Section {
  title: string;
  content: Block[];
}

export async function parsePage(pageId: string): Promise<Section[]> {
  const notion = new Client({ auth: process.env.NOTION_SECRET_KEY });

  const response: ListBlockChildrenResponse = await notion.blocks.children.list({
    block_id: pageId,
  });

  const blocks: BlockObjectResponse[] = response.results.filter(
    (block): block is BlockObjectResponse => 'type' in block
  );

  const sections: Section[] = [];
  let currentSection: Section | null = null;

  for (const block of blocks) {
    if (block.type === 'heading_1') {
      // If there's an existing section, add it to the sections array
      if (currentSection) {
        sections.push(currentSection);
      }
      // Start a new section
      const textArray = await getBlockText(block);
      const title = textArray.map(item => item.text).join('');
      currentSection = {
        title: title,
        content: [],
      };
    } else {
      // For other block types, add them to the current section's content
      const blockText = await getBlockText(block); // Now returns RichTextItem[]

      const simplifiedBlock: Block = {
        type: block.type,
        text: blockText,
      };

      if (!currentSection) {
        // If there's no current section, create one with an empty title
        currentSection = {
          title: '',
          content: [],
        };
      }

      currentSection.content.push(simplifiedBlock);
    }
  }

  // Add the last section if it exists
  if (currentSection) {
    sections.push(currentSection);
  }

  return sections;
}

async function getBlockText(block: BlockObjectResponse): Promise<RichTextItem[]> {
  let richTextArray: RichTextItemResponse[] = [];
  switch (block.type) {
    case 'heading_1':
      richTextArray = block.heading_1.rich_text;
      break;
    case 'heading_2':
      richTextArray = block.heading_2.rich_text;
      break;
    case 'heading_3':
      richTextArray = block.heading_3.rich_text;
      break;
    case 'paragraph':
      // console.log(block.paragraph.rich_text)
      richTextArray = block.paragraph.rich_text;
      break;
    // Handle other block types as needed
    default:
      richTextArray = [];
      break;
  }

  return Promise.all(richTextArray.map(async (rt) => {
    const richTextItem: RichTextItem = {
      text: rt.plain_text,
      annotations: rt.annotations,
    };

    if (rt.type === 'text') {
      if (rt.text.link) {
        richTextItem.link = rt.text.link.url;
      }
    } else if (rt.type === 'mention') {
      if (rt.mention.type === 'page') {
        const pageId = rt.mention.page.id;
        richTextItem.link = await getInternalLink(pageId);
      } else if (rt.mention.type === 'user') {
        // Handle user mentions if needed
      }
      // Handle other mention types if necessary
    }

    return richTextItem;
  }));
}

async function getInternalLink(pageId: string): Promise<string> {
  const notion = new Client({ auth: process.env.NOTION_SECRET_KEY });
  const page = await notion.pages.retrieve({ page_id: pageId });
  console.log("getInternalLink on page:", page)
  if ('properties' in page) {
    const slug = page.properties.Slug?.type === 'rich_text' ? page.properties.Slug?.rich_text[0]?.plain_text ?? '' as string : '';
    if (slug) {
      // Determine if it's a post or project based on the database ID
      const databaseId = page.parent.type === 'database_id' ? page.parent.database_id : null;
      const formattedDatabaseId = databaseId?.replace(/-/g, '');
      if (formattedDatabaseId === process.env.NOTION_POSTS_DB_ID) {
        return `/posts/${slug}`;
      } else if (formattedDatabaseId === process.env.NOTION_PROJECTS_DB_ID) {
        return `/projects/${slug}`;
      }
    }
  }

  // Fallback to external Notion link if we can't determine the internal URL
  return `https://www.notion.so/${pageId.replace(/-/g, '')}`;
}