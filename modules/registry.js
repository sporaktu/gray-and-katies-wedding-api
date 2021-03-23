let poolError = null;
const {pool} = require('../config');
const handleError = require('./helpers/handleError')

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
    console.log({...req.body})
    if (id) return await editRegistryItem(req, res);
    else return await createRegistryItem(req, res);
}

async function createRegistryItem(req, res) {
    const {name, url, store, picture_url, price} = req.body;

    await pool.query(
        `insert into registry (name,
                               url,
                               store,
                               picture_url,
                               price,
                               date_created,
                               date_modified)
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
    console.log('edit message', message);
    res.end(message);
}

async function editRegistryItem(req, res) {
    const {name, url, store, picture_url, price, id} = req.body;
    console.log({...req.body})
    const query = `update registry
        set name = '${name}',
            url = '${url}',
            store = '${store}',
            picture_url = '${picture_url}',
            price = '${price}',
            date_modified = current_timestamp
        where id = '${id}';
    `
    console.log(query)
    await pool.query(query, [],
        error => {
        // This is not how you handle the error. @TODO fix this
            // if (error) handleError(error, res);
            // poolError = error;
            console.error(error)
        })

    let message = poolError ? poolError.toString() : 'success';
    res.end(message);
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