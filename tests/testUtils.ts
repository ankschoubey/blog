import test, { expect } from '@playwright/test';
import fm from 'front-matter';
import { readdirSync, statSync,readFileSync } from 'fs';
import { marked } from 'marked';
import { join } from 'path';
import { fileURLToPath } from 'url';
import {SeoCheck} from "seord";
import { slugSort } from './slug-priority';
import { LIMIT, LIMIT_TO_SLUG } from './testConfig';
import exp from 'constants';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const contentDir = join(__dirname, '../src/content');

function getMarkdownFiles(dir, fileList:string[] = []) {
    const files = readdirSync(dir);

    for (const file of files) {
        const filePath = join(dir, file);
        const stat = statSync(filePath);

        if (stat.isDirectory()) {
            getMarkdownFiles(filePath, fileList);
        } else if (file.endsWith('.md')) {
            fileList.push(filePath);
        } else if (file.endsWith('.mdx')) {
            fileList.push(filePath);
        }
    }

    return fileList;
}

const markdownFiles = getMarkdownFiles(contentDir);

export interface FrontMatter {
    title: string;
    slug: string;
    publishDate: Date;
    image: string;
    excerpt: string;
    mainKeyword: string;
    seoKeywords: string[];
}

export interface MarkdownFile{
    frontMatter: FrontMatter;
    html: string;
}

export const getFrontMatter = (file: string) => {
    const data = readFileSync(file, 'utf8');
    var content = fm(data);
    const frontmatter = content.attributes as FrontMatter;
    return frontmatter;
}

export const getMarkdownContent = (file: string) => {
    const data = readFileSync(file, 'utf8');
    var content = fm(data);
    const frontmatter = content.attributes as FrontMatter;
    return {
        frontMatter: frontmatter,
        body: content.body,
        html: marked.parse(content.body)
    }
}
export const iterateMarkdownFiles = () => markdownFiles.map((file) => getMarkdownContent(file))
    .sort((a, b) => {
        return b.frontMatter.publishDate.getTime() - a.frontMatter.publishDate.getTime() ;
    });

export const iterateFrontMatters = () =>  markdownFiles.map((file) => getFrontMatter(file))
    .sort((a, b) => {
        return a.publishDate.getTime() - b.publishDate.getTime();
    });
;
