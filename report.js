const printReport = (obj) => {
    console.log("\nThe report is starting:");
    console.log("----------------------------------")
    let sortedObjs = Object.entries(obj).sort((a, b) => {
        return a[1] + b[1];
    });

    for (const object of sortedObjs) {
        const count = object[1];
        const url = object[0];
        console.log(`Found ${count} internal links to: ${url}`);
    }
};

module.exports = {
    printReport,
};
