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

interface Block {
  type: string;
  text: string;
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
      const text = block.heading_1.rich_text[0]?.plain_text || '';
      currentSection = {
        title: text,
        content: [],
      };
    } else {
      // For other block types, add them to the current section's content
      const blockText = getBlockText(block);
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

function getBlockText(block: BlockObjectResponse): string {
  switch (block.type) {
    case 'heading_1':
      return block.heading_1.rich_text[0]?.plain_text || '';
    case 'heading_2':
      return block.heading_2.rich_text[0]?.plain_text || '';
    case 'heading_3':
      return block.heading_3.rich_text[0]?.plain_text || '';
    case 'paragraph':
      return block.paragraph.rich_text.map((text: RichTextItemResponse) => text.plain_text).join('');
    default:
      return '';
  }
}