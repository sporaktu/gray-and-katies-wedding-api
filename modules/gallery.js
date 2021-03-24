const {pool} = require('../config');
const handleError = require('./helpers/handleError')


async function getAllPhotos(req, res) {
    await pool.query(`SELECT *
                      from photos ORDER BY "order"`,
        (error, results) => {
            if (error) console.error(error);
            else res.status(200).json(results.rows);
        })
}

async function addPhoto(req, res) {
    const {url, order} = req.body;
    let poolError = null;

    await pool.query(
        `insert into photos (url, "order")
         VALUES ($1, $2)`,
        [url, order],
        error => {
            if (error) handleError(error, res);
            poolError = error;
        }
    )
    let message = poolError ? poolError.toString() : 'success';
    if (!poolError) res.end(message);
}

async function deletePhoto(req, res) {
    const {id} = req.params;
    let poolError = null;
    const query = `DELETE FROM photos WHERE id = '${id}'`
    await pool.query(query, [], error => {
        poolError = error;
        if (error) handleError(error);
    })
    let message = poolError ? poolError.toString() : 'success';
    if (!poolError) res.end(message);
}

module.exports = {
    getAllPhotos,
    addPhoto,
    deletePhoto
}