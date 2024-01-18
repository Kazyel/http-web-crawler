const { JSDOM } = require("jsdom");

const normalizeUrl = (url) => {
    const urlObj = new URL(url);
    const normalizedUrl = `${urlObj.hostname}${urlObj.pathname}`;
    if (normalizedUrl.length > 0 && normalizedUrl.slice(-1) === "/") {
        normalizedUrl = normalizedUrl.slice(0, -1);
    }
    return normalizedUrl;
};

const getURLsFromHTML = (htmlBody, baseURL) => {
    const { document } = new JSDOM(htmlBody, {
        url: baseURL,
    }).window;

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

module.exports = {
    normalizeUrl,
    getURLsFromHTML,
};
