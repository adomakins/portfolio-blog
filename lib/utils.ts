import { Client } from '@notionhq/client'
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'
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