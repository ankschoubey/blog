import test, { expect } from '@playwright/test';
import fm from 'front-matter';
import { readdirSync, statSync,readFileSync } from 'fs';
import { marked } from 'marked';
import { join } from 'path';
import { fileURLToPath } from 'url';
import {SeoCheck} from "seord";
import { slugSort } from '../slug-priority';
import { LIMIT, LIMIT_TO_SLUG } from '../testConfig';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const contentDir = join(__dirname, '../../src/content');

function getMarkdownFiles(dir, fileList:string[] = []) {
    const files = readdirSync(dir);

    for (const file of files) {
        const filePath = join(dir, file);
        const stat = statSync(filePath);

        if (stat.isDirectory()) {
            getMarkdownFiles(filePath, fileList);
        } else if (file.endsWith('.md')) {
            fileList.push(filePath);
        }
    }

    return fileList;
}

const markdownFiles = getMarkdownFiles(contentDir);

interface FrontMatter {
    title: string;
    slug: string;
    publishDate: Date;
    image: string;
    excerpt: string;
    mainKeyword: string;
    seoKeywords: string[];
}

interface MarkdownFile{
    frontMatter: FrontMatter;
    html: string;
}

const getFrontMatter = (file: string) => {
    const data = readFileSync(file, 'utf8');
    var content = fm(data);
    const frontmatter = content.attributes as FrontMatter;
    return frontmatter;
}

const getMarkdownContent = (file: string) => {
    const data = readFileSync(file, 'utf8');
    var content = fm(data);
    const frontmatter = content.attributes as FrontMatter;
    return {
        frontMatter: frontmatter,
        html: marked.parse(content.body)
    }
}
const iterateMarkdownFiles = () => markdownFiles.map((file) => getMarkdownContent(file));

const iterateFrontMatters = () =>  markdownFiles.map((file) => getFrontMatter(file));

const frontMatterTest = (name: string, idealCase: (frontMatter: FrontMatter) => boolean, printDetails: (frontMatter: FrontMatter) => {}) => {
    test(name, async ({page}) => {
        let failingFrontMatters:any = iterateFrontMatters()
            .filter(frontMatter => idealCase(frontMatter))
            .map(frontMatter => {
                return {
                    title: frontMatter.title,
                    slug: frontMatter.slug,
                    ...printDetails(frontMatter)
                }
            })
            .sort((a, b) => slugSort(a.slug, b.slug))
            .slice(0, LIMIT);

            if(LIMIT_TO_SLUG.length != 0) {
                failingFrontMatters = failingFrontMatters.find(result => result.slug.includes(LIMIT_TO_SLUG));
            }
    

        expect(failingFrontMatters).toEqual([]);
    });
}

const noPrint = (frontMatter: FrontMatter) => ({});

frontMatterTest('title should be between 50-60 characters', 
    frontMatter => frontMatter.title.length < 50 || frontMatter.title.length > 60,
    frontMatter => ({length: frontMatter.title.length})
)

frontMatterTest('should have seoKeywords',
    frontMatter => !frontMatter.seoKeywords,
    noPrint
);

frontMatterTest('excerpt should be between 70 to 155 characters',
    frontMatter => frontMatter.excerpt.length < 70 || frontMatter.excerpt.length > 155,
    frontMatter => ({length: frontMatter.excerpt.length, excerpt: frontMatter.excerpt})
)


test('SEO analysis', async ({page}) => {
    var allAnalysis = iterateMarkdownFiles()
    .map(({frontMatter, html}) => {
        const contentJson = {
            title: frontMatter.title,
            htmlText: html as string,
            keyword: frontMatter.mainKeyword || '',
            subKeywords: frontMatter.seoKeywords || [],
            metaDescription: frontMatter.excerpt,
            languageCode: 'en',
            countryCode: 'us'
        };
        return {
            frontMatter, 
            html, seoCheck: new SeoCheck(contentJson)};
    })
    .map(async values => {
        var analysis = (await values.seoCheck.analyzeSeo());
        var messages = analysis.messages;


        return {
            frontmatter: values.frontMatter, 
            analysis: analysis,
            goodPoints: messages.goodPoints,
            minorWarnings: messages.minorWarnings,
            warnings: messages.warnings
        }
    });
    let results:any = await Promise.all(allAnalysis);
    results.sort((a, b) => slugSort(a.frontmatter.slug, b.frontmatter.slug))
        .slice(0, LIMIT);

        if(LIMIT_TO_SLUG.length != 0) {
            results = results.find(result => result.frontmatter.slug.includes(LIMIT_TO_SLUG));
        }

    console.log(results);
});