const { argv } = require("node:process");
const { crawlPage } = require("./crawl");

function main() {
    const BASE_URL = argv[2];
    totalArgs = 0;

    argv.forEach(() => {
        totalArgs++;
    });

    if (totalArgs > 3) {
        throw new Error("Please, provide just one URL!");
    } else if (totalArgs <= 2) {
        throw new Error("Please, provide an URL!");
    }

    const crawl = async () => {
        console.log(`\nThe crawler is starting at the ${BASE_URL}`);
        console.log(await crawlPage(BASE_URL, BASE_URL, {}));
    };
    crawl();
}

main();
