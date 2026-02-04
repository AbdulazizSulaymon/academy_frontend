import fs from 'fs';
import path from 'path';

const contentDirectory = path.join(process.cwd(), 'src/data/blog/content');

export interface MDXFrontmatter {
  title: string;
  description: string;
  author?: string;
  date?: string;
  image?: string;
  [key: string]: any;
}

export interface MDXContent {
  frontmatter: MDXFrontmatter;
  content: string;
  slug: string;
}

/**
 * Parse frontmatter from MDX content
 */
function parseFrontmatter(fileContent: string): { frontmatter: MDXFrontmatter; content: string } {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = frontmatterRegex.exec(fileContent);

  if (!match) {
    return {
      frontmatter: { title: '', description: '' },
      content: fileContent,
    };
  }

  const frontmatterString = match[1];
  const content = match[2];

  // Parse YAML-like frontmatter
  const frontmatter: any = {};
  frontmatterString.split('\n').forEach((line) => {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.substring(0, colonIndex).trim();
      let value = line.substring(colonIndex + 1).trim();
      
      // Remove quotes if present
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.substring(1, value.length - 1);
      }
      
      frontmatter[key] = value;
    }
  });

  return { frontmatter, content };
}

/**
 * Get MDX content by slug
 */
export async function getMDXContent(slug: string): Promise<MDXContent | null> {
  try {
    const filePath = path.join(contentDirectory, `${slug}.mdx`);
    
    if (!fs.existsSync(filePath)) {
      return null;
    }

    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { frontmatter, content } = parseFrontmatter(fileContent);

    return {
      frontmatter,
      content,
      slug,
    };
  } catch (error) {
    console.error(`Error reading MDX file for slug: ${slug}`, error);
    return null;
  }
}

/**
 * Check if MDX content exists for a slug
 */
export function mdxContentExists(slug: string): boolean {
  const filePath = path.join(contentDirectory, `${slug}.mdx`);
  return fs.existsSync(filePath);
}

/**
 * Get all MDX file slugs
 */
export function getAllMDXSlugs(): string[] {
  try {
    if (!fs.existsSync(contentDirectory)) {
      return [];
    }

    const files = fs.readdirSync(contentDirectory);
    return files
      .filter((file) => file.endsWith('.mdx'))
      .map((file) => file.replace('.mdx', ''));
  } catch (error) {
    console.error('Error reading MDX directory:', error);
    return [];
  }
}
