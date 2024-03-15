import type { CollectionEntry } from "astro:content";

function formatDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  return new Date(date).toLocaleDateString(undefined, options);
}

function capitalize(str: string): string {
  return `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
}

function sortBlogArticlesByDate(articles: CollectionEntry<"blog">[]): CollectionEntry<"blog">[] {
  return articles.sort(
    (a: CollectionEntry<"blog">, b: CollectionEntry<"blog">) =>
      b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );
}

export { formatDate, capitalize, sortBlogArticlesByDate };