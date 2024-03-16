import type { APIRoute } from "astro";
import type { CollectionEntry } from "astro:content";

import { getCollection } from "astro:content";

import { sortBlogArticlesByDate } from '../../utils';

export const GET: APIRoute = async ({ url }): Promise<Response> => {
  const query: string | null = url.searchParams.get('query');

  if (query === null) {
    return new Response(
      JSON.stringify({
        error: 'Query param is missing'
      }),
      {
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
  }

  const allArticles: CollectionEntry<'blog'>[] = await getCollection('blog');

  const searchResults: CollectionEntry<"blog">[] = allArticles.filter(
    (article) => {
      const titleMatch: boolean = article.data.title
        .toLowerCase()
        .includes(query!.toLocaleLowerCase());
      const contentMatch: boolean = article.body
        .toLowerCase()
        .includes(query!.toLocaleLowerCase());
      const slugMatch: boolean = article.slug
        .toLowerCase()
        .includes(query!.toLocaleLowerCase());
  
      return titleMatch || contentMatch || slugMatch;
    }
  );
  const searchResultsSorted: CollectionEntry<"blog">[] =
    sortBlogArticlesByDate(searchResults);

  return new Response(
    JSON.stringify(searchResultsSorted),
    {
      status: 200,
      headers: { 
        'Content-Type': 'application/json'
      }
    }
  )
}