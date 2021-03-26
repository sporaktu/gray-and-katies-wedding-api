const puppeteer = require('puppeteer');
const {pool} = require('../../config');
const selectors = require('./selectors');

async function getItems() {
    return new Promise((resolve, reject) => {
        pool.query('select * from registry where archived = false',
            (error, results) => {
                if (error) {
                    console.error(error);
                    reject(error)
                } else {
                    resolve(results.rows);
                }
            })
    })
}

async function updateItem(data) {
    return new Promise(async (resolve, reject) => {
        const {name, url, store, picture_url, price, id} = data;
        const query = `update registry
    set name = ${name},
        url = '${url}',
        store = ${store},
        picture_url = '${picture_url}',
        price = ${price}
    where id = ${id}`

        await pool.query(query, (error, results) => {
            if (error) {
                console.error(error)
                reject(error);
            } else resolve();
        })
    })
}

function determineStore(url) {
    return url.split('.')[1];
}

// async function parsePage(item) {
//     return new Promise(async (resolve) => {
//         console.log('Launching Browser')
//         const browser = await puppeteer.launch();
//         const page = await browser.newPage();
//         const {id, url} = item;
//         const store = determineStore(url);
//         await page.goto(url);
//         const price = await page.$(selectors[store].price.selector)[selectors[store].price.attrName];
//         const picture = await page.$(selectors[store].picture.selector)[selectors[store].picture.attrName];
//         const name = await page.$(selectors[store].name.selector)[selectors[store].name.attrName];
//         await browser.close();
//         console.log('Closing Browser')
//         console.log({id, url, store, picture, price, name});
//         resolve({id, url, store, picture, price, name});
//     })
//
// }
//
// async function parsePages(items) {
//     let newItems = [];
//     return new Promise(async resolve => {
//         const browser = await puppeteer.launch();
//         const page = await browser.newPage();
//         items.forEach(async item => new Promise(async resolve1 => {
//             const {id, url} = item;
//             const store = determineStore(url);
//             console.log(url)
//             await page.goto(url);
//             const price = await page.$(selectors[store].price.selector)[selectors[store].price.attrName];
//             const picture = await page.$(selectors[store].picture.selector)[selectors[store].picture.attrName];
//             const name = await page.$(selectors[store].name.selector)[selectors[store].name.attrName];
//             newItems.push({id, url, store, picture, price, name})
//             resolve1();
//         }))
//         resolve(newItems);
//     })
// }

async function processAllPages(items) {
    const browser = await puppeteer.launch()
    const newItems = [];
    for (const item of items) {
        const {id, url} = item
        const page = await browser.newPage()
        await page.goto(item.url);
        const store = determineStore(url);
        if (!store in selectors) {
            await page.close();
            return;
        }
        const price = await page.$(selectors[store].price.selector)[selectors[store].price.attrName];
        const picture = await page.$(selectors[store].picture.selector)[selectors[store].picture.attrName];
        const name = await page.$(selectors[store].name.selector)[selectors[store].name.attrName];
        // await page.close();
        newItems.push({id, url, store, picture, price, name})
    }
    console.log(newItems)
    return newItems
}


async function processItem(item, page) {
    console.log('processItem');
    return new Promise(resolve => {
        parsePage(item, page).then(updateItem.then(resolve()))
    });
}

async function processNext(items) {
    console.log("processNext")
    await processItem(items.shift()).then(() => processNext(items))
}

async function process() {
    await getItems()
        .then(async (items) => {
            await processAllPages(items)
        })
        .catch(async error => {
            console.error(error);
            await browser.close();
        });

}

module.exports = process;