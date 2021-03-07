let poolError = null;
const {pool} = require('../config');
const handleError = require('./helpers/handleError')
const Parser = require('./helpers/registryLinkParser')

async function getAllRegistry(req, res) {
    await pool.query('select * from registry where archived = false', (error, results) => {
        if (error) handleError(error, res);
        res.status(200).json(results.rows);
    })
}

async function getRegistryItem(req, res) {
    const {id} = req.params;
    await pool.query(`select * from registry where id = '${id}' and archived = false`, (error, results) => {
        if (error) handleError(error, res);
        res.status(200).json(results.rows);
    })
}

async function handleRegistryItemPost(req, res) {
    const {id} = req.body;
    if (id) return await editRegistryItem(req, res);
    else return await createRegistryItem(req, res);
}

async function createRegistryItem(req, res) {
    let {name, url, store, picture_url, price} = req.body;
    const ProductPage = new Parser(url);
    name === '' ? ProductPage.name : name;
    store === '' ? ProductPage.store : store;
    picture_url === '' ? ProductPage.picture : picture_url;
    price === '' ? ProductPage.price : price;
    console.log({name, store, picture_url, price});
    await pool.query(
        `insert into registry (
                      name,
                      url,
                      store,
                      picture_url,
                      price,
                      date_created,
                      date_modified
                      )
                values ($1, $2, $3, $4, $5, current_timestamp, current_timestamp)`,
        [
            name,
            url,
            store,
            picture_url,
            price
        ],
        error => {
            if (error) handleError(error, res);
            poolError = error;
        }
    )
    let message = poolError ? poolError.toString() : 'success';
    console.log(message);
    res.end(message);
}

async function editRegistryItem(req, res) {
    let {name, url, store, picture_url, price, purchased, archived, id} = req.body;
    const ProductPage = new Parser(url);
    name === '' ? await ProductPage.name : name;
    store === '' ? await ProductPage.store : store;
    picture_url === '' ? await ProductPage.picture : picture_url;
    price === '' ? await ProductPage.price : price;
    console.log({name, store, picture_url, price});
    const query = `update registry
        set name = '${name}',
            url = '${url}',
            store = '${store}',
            picture_url = '${picture_url}',
            price = '${price}',
            purchased = '${purchased}',
            archived = '${archived}', 
            date_modified = current_timestamp
        where id = '${id};'
    `
    await pool.query(query, [], error => {
        if (error) handleError(error, res);
        poolError = error;
    })

    let message = poolError ? poolError.toString() : 'success';
    res.end(message);
}

async function queryEditRegistryItem(body) {
    const {name, url, store, picture_url, price, purchased, archived, id} = body;
    const result = {};
    const query = `update registry
        set name = '${name}',
            url = '${url}',
            store = '${store}',
            picture_url = '${picture_url}',
            price = '${price}',
            purchased = '${purchased}',
            archived = '${archived}',
            date_modified = current_timestamp
        where id = '${id};'
    `
    await pool.query(query, [], error => {
        if (error) result.error = error;
    })
    return result;
}

async function handleDeleteRegistryItem(req, res) {
    const {id} = req.params;
    const query = `update registry
            set archived = true
            where id = '${id}'`;

    await pool.query(query, [], error => {
        if (error) handleError(error, res);
        poolError = error;
    })

    let message = poolError ? poolError.toString() : 'success';
    res.end(message);
}

module.exports = {
    getAllRegistry,
    getRegistryItem,
    handleRegistryItemPost,
    handleDeleteRegistryItem
}