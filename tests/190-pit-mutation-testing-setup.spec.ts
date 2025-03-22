import { test, expect } from "vitest";
import { getPostForTest } from "./testUtils";

var post = await getPostForTest(__filename);

test("ensure mvn install command is present", () => {
    expect(post.body).toContain("mvn install");
});

test("ensure pitest command is present", () => {
    expect(post.body).toContain("mvn org.pitest:pitest-maven:mutationCoverage");
});

export enum ReasonEnum {
    INSTALL_DEPENDENCIES = "we need to install dependencies",
    RUN_MUTATION_TESTING = "we need to run mutation testing"
}

export function postAssert(postBody: string) {
    return {
        shouldContain: function (...expectedStrings: string[]) {
            const allExpectedStrings = [...expectedStrings];
            return {
                and: function (...moreExpectedStrings: string[]) {
                    allExpectedStrings.push(...moreExpectedStrings);
                    return this;
                },
                because(reason: string | ReasonEnum) {
                    allExpectedStrings.forEach(expectedString => {
                        test(`post body should contain "${expectedString}" because ${reason}`, () => {
                            expect(postBody).toContain(expectedString);
                        });
                    });
                }
            };
        }
    };
}

postAssert(post.body)
    .shouldContain("mvn install")
    .and("mvn org.pitest:pitest-maven:mutationCoverage")
    .because("we need to install dependencies and run mutation testing");

postAssert(post.body)
    .shouldContain("mvn install")
    .because(ReasonEnum.INSTALL_DEPENDENCIES);