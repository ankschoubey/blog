import test, { expect } from '@playwright/test';
import fm from 'front-matter';
import { readdirSync, statSync,readFileSync } from 'fs';
import { marked } from 'marked';
import { join } from 'path';
import { fileURLToPath } from 'url';
import {SeoCheck} from "seord";
import { slugSort } from '../slug-priority';
import { LIMIT, LIMIT_TO_SLUG } from '../testConfig';
import exp from 'constants';
import { iterateFrontMatters, iterateMarkdownFiles, type FrontMatter } from '../testUtils';

const frontMatterTest = (name: string, idealCase: (frontMatter: FrontMatter) => boolean, printDetails: (frontMatter: FrontMatter) => {}) => {
    test(name, async ({page}) => {
        let failingFrontMatters = iterateFrontMatters()
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
                failingFrontMatters = failingFrontMatters.filter(result => result.slug.includes(LIMIT_TO_SLUG));
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
            html, 
            seoCheck: new SeoCheck(contentJson)};
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
    let results = await Promise.all(allAnalysis);
    //results.sort((a, b) => slugSort(a.frontmatter.slug, b.frontmatter.slug))
        //.slice(0, LIMIT);

        // if(LIMIT_TO_SLUG.length != 0) {
        //     results = results.filter(result => result.frontmatter.slug.includes(LIMIT_TO_SLUG));
        // }

        console.log(results);

    const errorsList:any = [];
    const goodPointsList:any = [];
    for(const result of results) {
        if(result.warnings.length > 0) {
            errorsList.push({
                slug: result.frontmatter.slug,
                warnings: result.warnings
            });
        }
        if(result.minorWarnings.length > 0) {
            errorsList.push({
                slug: result.frontmatter.slug,
                minorWarnings: result.minorWarnings
            });
        }
        if(result.goodPoints.length > 0) {
            goodPointsList.push({
                slug: result.frontmatter.slug,
                goodPoints: result.goodPoints
            });
        }
    }

    expect(errorsList).toEqual([]);
    expect(goodPointsList).toBeGreaterThanOrEqual(1);

});