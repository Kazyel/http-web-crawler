const { test, expect } = require("@jest/globals");
const { normalizeUrl, getURLsFromHTML } = require("./crawl.js");

test("URL normalizing", () => {
    expect(normalizeUrl("https://blog.boot.dev/path")).toBe(
        "blog.boot.dev/path"
    );
});

const url = "https://blog.boot.dev";
const html =
    ' <a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a> <a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a> <a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a>';

test("All URLS test", () => {
    expect(getURLsFromHTML(html, url)).toStrictEqual([
        "https://blog.boot.dev/",
        "https://blog.boot.dev/",
        "https://blog.boot.dev/",
    ]);
});
