let poolError = null;
const {pool} = require('../config');

async function getAllWeddingParty(req, res) {
    await pool.query('select * from wedding_party', (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
};

async function getWeddingPartyMember(req, res) {
    const {id} = req.params;
    await pool.query(`select * from wedding_party where id = ${id} and archived = false`, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
};

async function handleWeddingPartyMemberPost(req, res) {
    const {id} = req.body;
    if (id) return await editWeddingPartyMember(req, res);
    else return await createWeddingPartyMember(req, res);

}

async function createWeddingPartyMember(req, res) {
    const {firstname, lastname, role, story} = req.body;
    await pool.query(
            `insert into wedding_party (firstname, lastname, role, picture_url, story, date_created, date_modified,
                                        archived)
             values ($1, $2, $3, $4, $5, current_timestamp, current_timestamp, false);`,
        [
            firstname,
            lastname,
            role,
            '',
            story,

        ],
        error => {
            if (error) throw error;
            poolError = error;
        })
    let message = poolError ? poolError.toString() : 'success';
    res.end(message);
};

async function editWeddingPartyMember(req, res) {
    const {firstname, lastname, role, story, id} = req.body;
    const parsedStory = story.replace(/'/g, "''");
    const query = `update wedding_party
        set firstname = '${firstname}',
            lastname = '${lastname}',
            role = '${role}',
            story = '${parsedStory}'
        where id = ${id};`
    await pool.query(query, [],
        error => {
            if (error) throw error;
            poolError = error;
        })

    let message = poolError ? poolError.toString() : 'success';
    res.end(message);
};

async function handleDeletePartyMember(req, res) {
    const {id} = req.params;
    const query = `update wedding_party
        set archived = true
        where id = ${id}`;

    await pool.query(query, [], error => {
        if (error) throw error;
        poolError = error;
    })

    let message = poolError ? poolError.toString() : 'success';
    res.end(message);
};


module.exports = {
    getAllWeddingParty,
    handleWeddingPartyMemberPost,
    getWeddingPartyMember,
    handleDeletePartyMember
}