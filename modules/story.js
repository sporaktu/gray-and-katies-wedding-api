const {pool} = require('../config');
const handleError = require('./helpers/handleError');
const parsePoolMessage = require('./helpers/parsePoolMessage')

async function getAllStoryParts(req, res) {
    let poolError = null;
    await pool.query('select * from story where archived = false ORDER BY "order"', (error, results) => {
        if (error) handleError(error, res);
        else res.status(200).json(results.rows);
    })
}

async function getStoryPart(req, res) {
    console.log('getStoryPart')
    let poolError = null;
    const {id} = req.params;
    await pool.query(`select * from story where id = '${id}' and archived = false`, (error, results) => {
        if (error) handleError(error, res);
        else res.status(200).json(results.rows);
    })
}

async function handleStoryPost(req, res) {
    const {id} = req.body;
    if (id) return await editStoryPart(req, res);
    else return await createStoryPart(req, res);
}

async function createStoryPart(req, res) {
    let poolError = null;
    const {body, order} = req.body;

    await pool.query(
        `insert into story (body, "order")
         VALUES ($1, $2)`,
        [body, order],
        error => {
            if (error) handleError(error, res);
            poolError = error;
        }
    )
   let message = poolError ? poolError.toString() : 'success';
    res.end(message);
}

async function editStoryPart(req, res) {
    let poolError = null;
    let {body, order, id} = req.body;
    body = body.replace(/'/g, "''");
    const query = `update story
        set body = '${body}',
            "order" = '${order}'
        where id = ${id}; 
        `
    console.log(query)
    await pool.query(query, [], error => {
        // if (error) handleError(error, res);
        // poolError = error;
        console.error(error)
    })

    let message = poolError ? poolError.toString() : 'success';
    res.end(message);
}

async function handleDeleteStory(req, res) {
    let poolError = null;
    const {id} = req.params;
    const query = `update story
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
    getAllStoryParts,
    getStoryPart,
    handleStoryPost,
    handleDeleteStory
}