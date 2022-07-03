import { Client } from '@notionhq/client';
import { parseRichText } from './notion';
import slugify from 'slugify';

const notion = new Client({ auth: process.env.NOTION_API_KEY });

const fields = {
  publicationTime: 'Publication time',
  title: 'Title',
  tags: 'Tags',
  status: 'Status',
  platforms: 'Platforms',
  lastEditedTime: 'Last edited time'
}

const publishedStatus = process.env.PUBLISHED_STATUS

const platformValue = process.env.PLATFORM

function randomIntFromInterval(min: number, max: number) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function parsePost(page: any) {
  // console.log(page)
  const title = parseRichText(page.properties[fields.title].title, { textOnly: true }).join(' ');
  return {
    title,
    date: page.properties[fields.publicationTime].date?.start ?? page.properties[fields.lastEditedTime].last_edited_time,
    slug: slugify(title, { lower: true }) + '-' + page.id.replaceAll('-', ''),
    coverImage: page.cover ? page.cover[page.cover.type].url : `/assets/images/cover${randomIntFromInterval(1, 3)}.jpg`,
    tags: page.properties[fields.tags].multi_select.map((tag: any) =>
    ({
      ...tag,
      slug: tag.name,
    })),
  }
}

const getPostsFilter: any[] = [
  {
    "property": fields.status,
    "select": {
      "equals": publishedStatus
    }
  },
  {
    "property": fields.platforms,
    "multi_select": {
      "contains": platformValue
    }
  },
]

const getPostsSort: any[] = [
  {
    property: fields.publicationTime,
    direction: 'descending',
  },
]

export async function getPostBySlug(slug: string) {
  const pageId = slug.split('-').reverse()[0]
  const response = await notion.pages.retrieve({ page_id: pageId });
  // console.log(response)
  const response2 = await notion.blocks.children.list({
    block_id: pageId,
    page_size: 100,
  });
  // console.log(response2)
  const post = {
    ...parsePost(response),
    ogImage: {
      url: ''
    },
    content: response2.results,
  }
  return post
}

export async function getAllPosts() {
  const databaseId = process.env.DATABASE_ID || '';
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      and: [
        ...getPostsFilter
      ],
    },
    sorts: getPostsSort,
    page_size: 100,
  });
  // console.log(response);
  const posts = response.results.map(page => parsePost(page));
  // console.log(posts)
  return posts
}

export async function getTagBySlug(slug: string) {
  const databaseId = process.env.DATABASE_ID || '';
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      and: [
        ...getPostsFilter,
        {
          "property": fields.tags,
          "multi_select": {
            "contains": slug
          }
        },
      ],
    },
    sorts: getPostsSort,
    page_size: 100,
  });
  // console.log(response);
  const posts = response.results.map(page => parsePost(page));
  // console.log(posts)
  return {
    slug,
    posts,
    name: slug,
  }
}
