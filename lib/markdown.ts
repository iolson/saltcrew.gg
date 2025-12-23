import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const recapsDirectory = path.join(process.cwd(), 'content/recaps');

export interface RecapMetadata {
  id: string;
  title: string;
  date: string;
  opponent: string;
  result: 'win' | 'loss';
  score: string;
  map?: string;
  excerpt?: string;
}

export interface Recap extends RecapMetadata {
  content: string;
}

export async function getRecapBySlug(slug: string): Promise<Recap | null> {
  try {
    const fullPath = path.join(recapsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    const { data, content } = matter(fileContents);

    const processedContent = await remark()
      .use(html, { sanitize: false })
      .process(content);
    const contentHtml = processedContent.toString();

    return {
      id: slug,
      content: contentHtml,
      title: data.title,
      date: data.date,
      opponent: data.opponent,
      result: data.result,
      score: data.score,
      map: data.map,
      excerpt: data.excerpt,
    };
  } catch (error) {
    return null;
  }
}

export function getAllRecaps(): RecapMetadata[] {
  try {
    // Create directory if it doesn't exist
    if (!fs.existsSync(recapsDirectory)) {
      fs.mkdirSync(recapsDirectory, { recursive: true });
      return [];
    }

    const fileNames = fs.readdirSync(recapsDirectory);
    const allRecaps = fileNames
      .filter((fileName) => fileName.endsWith('.md'))
      .map((fileName) => {
        const id = fileName.replace(/\.md$/, '');
        const fullPath = path.join(recapsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data } = matter(fileContents);

        return {
          id,
          title: data.title,
          date: data.date,
          opponent: data.opponent,
          result: data.result,
          score: data.score,
          map: data.map,
          excerpt: data.excerpt,
        };
      });

    // Sort by date, most recent first
    return allRecaps.sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  } catch (error) {
    return [];
  }
}
