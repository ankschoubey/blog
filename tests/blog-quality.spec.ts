import { describe, expect, it, test } from "vitest";
import {iterateMarkdownFiles, type FrontMatter } from "./testUtils";
import { SeoCheck } from "seord";
const writeGood = require('write-good');


// iterateMarkdownFiles()

// .slice(0, 10)
// .filter(({frontMatter}) => frontMatter.title.includes('PIT'))
// .forEach(({frontMatter, body, html}) => {
//     test(frontMatter.title + ' ' + frontMatter.slug, async() => {
//         console.log(frontMatter.title);
//         expectHeader2ToBeInFormOfQuestion(body);
//         expectTitleShouldBeBetween50To60(frontMatter);
//         expectExcerptShouldBeBetween70To155(frontMatter);
//         expectSeoKeywordsShouldExistOrBeEmpty(frontMatter);
//         // expectNoWritingSuggestions(body);
//         expectSeoAnalysisToBePerfect(frontMatter, html);
//         expectNoImageWithoutAlt(body);
//         expectAtleastOneImage(body);
//     }
// );
// });


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
    show('Minor warnings', analysis.messages.minorWarnings);
    show('Good points', analysis.messages.goodPoints);

}

const expectNoImageWithoutAlt = (markdown: string) => {
    const images = markdown.match(/!\[.*\]\(.*\)/g);
    images?.forEach(image => {
        expect.soft(image, "Image without alt").not.contain('![](');
    });
}

const expectAtleastOneImage = (markdown: string) => {
    const images = markdown.match(/!\[.*\]\(.*\)/g);
    expect.soft(images, "No images found").not.toBeNull();
}


iterateMarkdownFiles()
    // .slice(0, 10)
    // .filter(({ frontMatter }) => frontMatter.title.includes('PIT'))
    .forEach(({ frontMatter, body, html, file }) => {
        test(frontMatter.title + ' ' + frontMatter.slug + ' '+ file , async () => {
            console.log(frontMatter.title);
            expectPostToBeInTechnicalOrNonTechnical(frontMatter);
            // expectHeader2ToBeInFormOfQuestion(body);
            // expectTitleShouldBeBetween50To60(frontMatter);
            // expectExcerptShouldBeBetween70To155(frontMatter);
            // expectSeoKeywordsShouldExistOrBeEmpty(frontMatter);
            // expectNoWritingSuggestions(body);
            // expectSeoAnalysisToBePerfect(frontMatter, html);
            // expectNoImageWithoutAlt(body);
            // expectAtleastOneImage(body);
            // expectMetaDescriptionToExist(frontMatter);
            // expectMetaViewportToExist(html);
            // expectOpenGraphTagsToExist(html);
            // expectValidDoctype(html);
            // expectTitleTagToExist(html);
            // expectValidHreflang(html);
            // expectFaviconToExist(html);
            // expectSeoFriendlyUrls(frontMatter);
            // expectHeadingsInOrder(body);
            // expectLegibleFontSizes(html);
            // expectTapTargetsSizedAppropriately(html);
            // expectNoPlugins(html);
            // expectTitleWidth(frontMatter);
            // expectSubheadingDistribution(body);
            // expectLinksHaveDescriptiveText(body);
            // expectInternalLinks(html);
            // expectOutboundLinks(html);
            // expectUseOfKeyphrases(frontMatter, body);
            // expectUseOfPassiveVoice(body);
            // expectUseOfTransitionWords(body);
            // expectTextLength(body);
            // expectLengthOfParagraphs(body);
            // expectLengthOfSentences(body);
        });
    });
const expectPostToBeInTechnicalOrNonTechnical = (frontMatter: FrontMatter) => {
    const categories = ['technical', 'non-technical'];
    const message = `Post should be in technical or non-technical category. Found: ${frontMatter.tags}`;
    const found = frontMatter.tags?.includes('technical') || frontMatter.tags?.includes('non-technical');
    expect.soft(found, message).toBeTruthy();    
};

const expectMetaDescriptionToExist = (frontMatter) => {
    expect.soft(frontMatter.metaDescription, "Meta description should exist").not.toBeNull();
};

const expectMetaViewportToExist = (html) => {
    expect.soft(html, "Meta viewport should exist").toContain('<meta name="viewport" content="width=device-width, initial-scale=1" />');
};

const expectOpenGraphTagsToExist = (html) => {
    expect.soft(html, "Open graph tags should exist").toContain('<meta property="og:title"');
    expect.soft(html, "Open graph tags should exist").toContain('<meta property="og:type"');
    expect.soft(html, "Open graph tags should exist").toContain('<meta property="og:image"');
    expect.soft(html, "Open graph tags should exist").toContain('<meta property="og:url"');
};

const expectValidDoctype = (html) => {
    expect.soft(html.startsWith('<!DOCTYPE html>'), "Doctype should be HTML5").toBe(true);
};

const expectTitleTagToExist = (html) => {
    expect.soft(html, "Title tag should exist").toContain('<title>');
};

const expectValidHreflang = (html) => {
    expect.soft(html, "Valid hreflang should exist").toContain('<link rel="alternate" hreflang="');
};

const expectFaviconToExist = (html) => {
    expect.soft(html, "Favicon should exist").toContain('<link rel="shortcut icon"');
};

const expectSeoFriendlyUrls = (frontMatter) => {
    const url = frontMatter.slug;
    expect.soft(url, "SEO friendly URL").not.toContain(' ');
    expect.soft(url, "SEO friendly URL").not.toContain('_');
};

const expectHeadingsInOrder = (body) => {
    const headers = getHeaders(body);
    let lastLevel = 0;
    headers?.forEach(header => {
        const level = header.match(/#/g)?.length || 0;
        expect.soft(level, "Headings should be in order").toBeGreaterThanOrEqual(lastLevel);
        lastLevel = level;
    });
};

const expectLegibleFontSizes = (html) => {
    // Assuming font sizes are defined in CSS, this is a placeholder check
    expect.soft(html, "Document should use legible font sizes").toContain('font-size');
};

const expectTapTargetsSizedAppropriately = (html) => {
    // Placeholder check for tap targets
    expect.soft(html, "Tap targets should be sized appropriately").toContain('button');
};

const expectNoPlugins = (html) => {
    const plugins = ['embed', 'object', 'applet'];
    plugins.forEach(plugin => {
        expect.soft(html, "Document should avoid plugins").not.toContain(`<${plugin}`);
    });
};

const expectTitleWidth = (frontMatter) => {
    const title = frontMatter.title;
    expect.soft(title.length, "Title width should be appropriate").toBeLessThanOrEqual(60);
};

const expectSubheadingDistribution = (body) => {
    const headers = getHeaders(body);
    expect.soft(headers?.length, "Subheading distribution should be appropriate").toBeGreaterThan(0);
};

const expectLinksHaveDescriptiveText = (body) => {
    const links = body.match(/<a [^>]*>(.*?)<\/a>/g);
    links?.forEach(link => {
        expect.soft(link, "Links should have descriptive text").toMatch(/<a [^>]*>[^<]+<\/a>/);
    });
};

const expectInternalLinks = (body) => {
    const links = body.match(/<a [^>]*href="\/[^"]*"[^>]*>/g);
    expect.soft(links?.length, "Internal links should exist").toBeGreaterThan(0);
};

const expectOutboundLinks = (body) => {
    const links = body.match(/<a [^>]*href="http[^"]*"[^>]*>/g);
    expect.soft(links?.length, "Outbound links should exist").toBeGreaterThan(0);
};

const expectUseOfKeyphrases = (frontMatter, body) => {
    const keyphrase = frontMatter.mainKeyword;
    expect.soft(body, "Keyphrase should be used in body").toContain(keyphrase);
};

const expectUseOfPassiveVoice = (body) => {
    const passiveVoice = body.match(/\b(is|was|were|be|been|being|am|are)\b\s+\b(\w+ed)\b/g);
    expect.soft(passiveVoice?.length, "Use of passive voice should be minimal").toBeLessThanOrEqual(5);
};

const expectUseOfTransitionWords = (body) => {
    const transitionWords = ['and', 'but', 'so', 'because'];
    const count = transitionWords.reduce((acc, word) => acc + (body.match(new RegExp(`\\b${word}\\b`, 'g'))?.length || 0), 0);
    expect.soft(count, "Use of transition words should be sufficient").toBeGreaterThan(5);
};

const expectTextLength = (body) => {
    const wordCount = body.split(/\s+/).length;
    expect.soft(wordCount, "Text length should be sufficient").toBeGreaterThanOrEqual(1000);
};

const expectLengthOfParagraphs = (body) => {
    const paragraphs = body.split(/\n\n+/);
    paragraphs.forEach(paragraph => {
        const wordCount = paragraph.split(/\s+/).length;
        expect.soft(wordCount, "Paragraph length should be appropriate: "+ paragraph).toBeLessThanOrEqual(200);
    });
};

const expectLengthOfSentences = (body) => {
    const sentences = body.split(/[.!?]\s+/);
    sentences.forEach(sentence => {
        const wordCount = sentence.split(/\s+/).length;
        expect.soft(wordCount, "Sentence length should be less than 20: " + sentence).toBeLessThanOrEqual(20);
    });
};

const getHeaders = (markdown: string) => {
    const headers = markdown.match(/#{1,6} .*/g);
    return headers;
};

const show = (message: string, value: any) => {
    console.warn(message, value);
};