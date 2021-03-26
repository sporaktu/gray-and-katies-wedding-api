const puppeteer = require('puppeteer');
const {pool} = require('../../config');
const selectors = require('./selectors');

const browser = await puppeteer.launch();

async function getItems() {
    let res = [];
    await pool.query('select (url, id) from registry where archived = false',
        (error, results) => {
            if (error) console.error(error);
            else {
                res = [...results.rows]
            }
        })
    return res;
}

async function updateItem(data) {
    const {name, url, store, picture_url, price, id} = data;
    const query = `update registry
    set name = ${name},
        url = '${url}',
        store = ${store},
        picture_url = '${picture_url}',
        price = ${price}
    where id = ${id}`

    await pool.query(query, error => console.error(error))
}

function determineStore(url) {
    return url.split('.')[1];
}

async function parsePage(item) {
    const {id, url} = item;
    const store = determineStore(url);
    const page = await browser.newPage();
    await page.goto(url);
    const price = await page.$(selectors[store].price.selector)[selectors[store].price.attrName];
    const picture = await page.$(selectors[store].picture.selector)[selectors[store].picture.attrName];
    const name = await page.$(selectors[store].name.selector)[selectors[store].name.attrName];
    return {id, url, store, picture, price, name};
}

async function processItem(item) {
    const data = await parsePage(item);
    await updateItem(data);
}

async function process() {
    await getItems().forEach(processItem)
}

module.exports = process;