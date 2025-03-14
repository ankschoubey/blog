import { describe, expect, it, test } from "vitest";
import {iterateMarkdownFiles } from "./testUtils";
import { SeoCheck } from "seord";
const writeGood = require('write-good');


iterateMarkdownFiles()

.slice(0, 10)
.filter(({frontMatter}) => frontMatter.title.includes('PIT'))
.forEach(({frontMatter, body, html}) => {
    test(frontMatter.title + ' ' + frontMatter.slug, async() => {
        console.log(frontMatter.title);
        expectHeader2ToBeInFormOfQuestion(body);
        expectTitleShouldBeBetween50To60(frontMatter);
        expectExcerptShouldBeBetween70To155(frontMatter);
        expectSeoKeywordsShouldExistOrBeEmpty(frontMatter);
        expectNoWritingSuggestions(body);
        expectSeoAnalysisToBePerfect(frontMatter, html);
    }
);
});


const expectTitleShouldBeBetween50To60 = (frontMatter) => {
    const message = `Title length should be between 50 to 60. Found: ${frontMatter.title.length} characters '${frontMatter.title}'`;
    expect.soft(frontMatter.title.length,message).toBeGreaterThanOrEqual(50);
    expect.soft(frontMatter.title.length,message).toBeLessThanOrEqual(60);
}


const expectSeoKeywordsShouldExistOrBeEmpty = (frontMatter) => {
    expect.soft(frontMatter.seoKeywords, "SEO Keywords should exist").not.toBeNull();
}

const expectExcerptShouldBeBetween70To155 = (frontMatter) => {
    const message = `Excerpt length should be between 70 to 155. Found: ${frontMatter.excerpt.length} characters '${frontMatter.excerpt}'`;
    expect.soft(frontMatter.excerpt.length, message).toBeGreaterThanOrEqual(70);
    expect.soft(frontMatter.excerpt.length, message).toBeLessThanOrEqual(155);
}

const expectHeader2ToBeInFormOfQuestion = (body: string) => {
    const headers = getHeaders(body);
    expect.soft(headers, "No headers found").not.toBeNull();
    headers
        ?.filter(header => header.startsWith('## '))
        .filter(header => !header.includes('## Ending'))
        .filter(header => !header.includes('## Conclusion'))
        .filter(header => !header.includes('## Concluding'))

    .forEach(header => {
        expect.soft(header, "Header is not a question").toMatch(/#{1,6} .*\?/);
    });
}

const seoAnalysis = (frontMatter, html) => {
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
        html, 
        seoCheck: new SeoCheck(contentJson)
    };
}   

const expectSeoAnalysisToBePerfect = async (frontMatter, html) => {
    const analysis = await seoAnalysis(frontMatter, html).seoCheck.analyzeSeo();
    expect.soft(analysis.messages.warnings, "SEO analysis found").toEqual([]);
    expect.soft(analysis.messages.minorWarnings, "SEO analysis found").toEqual([]);
    expect.soft(analysis.messages.goodPoints, "SEO analysis found").not.toEqual([]);
}


const expectNoWritingSuggestions = (body: string) => {
    const suggestions = writeGood(body);
    expect.soft(suggestions, "Writing suggestions found").toEqual([]);
}

// get headers from markdown string
const getHeaders = (markdown: string) => {
    const headers = markdown.match(/#{1,6} .*/g);
    return headers;
}
