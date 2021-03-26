const puppeteer = require('puppeteer');
const {pool} = require('../../config');

let urls = [];

async function updateItem(data) {
    const {name, url, store, picture_url, price, id} = data;
    const query = `update registry
    set name = ${name},
        url = '${url}',
        store = ${store},
        picture_url = '${picture_url}',
        price = ${price}
    where id = ${id}`
}

await pool.query('select (url, id) from registry where archived = false',
    (error, results) => {
        if (error) console.error(error);
        else {
            urls = [...results.rows]
        }
    })
const browser = await puppeteer.launch();
