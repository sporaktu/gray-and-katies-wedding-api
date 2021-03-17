const {pool} = require('../config');
const handleError = require('./helpers/handleError');
const parsePoolMessage = require('./helpers/parsePoolMessage')
let poolError = null;

async function getAllStoryParts(req, res) {
    await pool.query('select * from story where archived = false ORDER BY "order"', (error, results) => {
        if (error) handleError(error, res);
        res.status(200).json(results.rows);
    })
}

async function getStoryPart(req, res) {
    const {id} = req.params;
    await pool.query(`select * from story where id = '${id}' and archived = false`, (error, results) => {
        if (error) handleError(error, res);
        res.status(200).json(results.rows);
    })
}

async function handleStoryPost(req, res) {
    const {id} = req.body;
    if (id) return await editStoryPart(req, res);
    else return await createStoryPart(req, res);
}

async function createStoryPart(req, res) {
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
    res.end(parsePoolMessage(poolError))
}

async function editStoryPart(req, res) {
    const {body, order, id, archived} = req.body;
    const query = `update story
        set body = '${body}',
            order = '${order}',
            archived = '${archived}'
        where id = '${id}';
        `
    await pool.query(query, [], error => {
        if (error) handleError(error, res);
        poolError = error;
    })

    res.end(parsePoolMessage(poolError))
}

async function handleDeleteStory(req, res) {
    const {id} = req.params;
    const query = `update story
                set archived = true
                where id = '${id}'`;

    await pool.query(query, [], error => {
        if (error) handleError(error, res);
        poolError = error;
    })
    res.end(parsePoolMessage(poolError))
}

module.exports = {
    getAllStoryParts,
    getStoryPart,
    handleStoryPost,
    handleDeleteStory
}