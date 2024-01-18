const { JSDOM } = require("jsdom");

const normalizeUrl = (url) => {
    const urlObj = new URL(url);
    let normalizedUrl = `${urlObj.host}${urlObj.pathname}`;
    if (normalizedUrl.length > 0 && normalizedUrl.slice(-1) === "/") {
        normalizedUrl = normalizedUrl.slice(0, -1);
    }
    return normalizedUrl;
};

const getURLsFromHTML = (htmlBody, baseURL) => {
    const { document } = new JSDOM(htmlBody).window;

    const allURLs = [];
    const allAnchors = document.querySelectorAll("a");
    for (const anchor of allAnchors) {
        if (anchor.href.slice(0, 1) === "/") {
            try {
                allURLs.push(new URL(anchor.href, baseURL).href);
            } catch (err) {
                console.log(`${err.message}: ${anchor.href}`);
            }
        } else {
            try {
                allURLs.push(new URL(anchor.href).href);
            } catch (err) {
                console.log(`${err.message}: ${anchor.href}`);
            }
        }
    }
    return allURLs;
};

const crawlPage = async (baseURL, currentURL, pages) => {
    const currentNormalized = normalizeUrl(currentURL);
    const bsURL = new URL(baseURL);
    const curURL = new URL(currentURL);

    if (curURL.host !== bsURL.host) {
        return pages;
    } else {
        if (currentNormalized in pages) {
            pages[currentNormalized]++;
            return pages;
        } else {
            if (currentURL === baseURL) {
                pages[currentNormalized] = 0;
            } else {
                pages[currentNormalized] = 1;
            }
        }
    }

    try {
        const response = await fetch(currentURL, {
            method: "GET",
            headers: {
                "Content-Type": "text/html; charset=utf-8",
            },
        });

        if (response.status >= 400) {
            throw new Error(
                `An error happended with status code of: ${response.status}`
            );
        } else if (
            response.headers.get("Content-Type") != "text/html" &&
            response.headers.get("Content-Type") != "text/html;charset=utf-8" &&
            response.headers.get("Content-Type") !=
                "text/html; charset=utf-8" &&
            response.headers.get("Content-Type") !=
                "text/html; charset=UTF-8" &&
            response.headers.get("Content-Type") != "text/html;charset=UTF-8"
        ) {
            throw new Error(
                `\nOne of the responses returned with a wrong content-type. \nThe content-type given was ${response.headers.get(
                    "Content-Type"
                )}.`
            );
        }
        const htmlText = await response.text();
        const urls = getURLsFromHTML(htmlText, baseURL);
        for (const url of urls) {
            crawlPage(baseURL, url, pages);
        }
        return pages;
    } catch (err) {
        console.log(err.message);
    }
};

module.exports = {
    normalizeUrl,
    getURLsFromHTML,
    crawlPage,
};
