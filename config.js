require('dotenv').config();

const {Pool} = require('pg');
const isProduction = process.env.NODE_ENV === 'production';
console.log(isProduction, process.env.DATABASE_URL);
const connectionString =
    `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;

const poolConfig = {
    connectionString:
      isProduction ?
        process.env.DATABASE_URL :
        connectionString,
    ssl: isProduction
}

console.log(poolConfig);
const pool = new Pool(poolConfig);

pool.query(`create table guests (id serial primary key, firstName varchar(30) not null, lastName varchar(30) not null);`, error => {
    if (error) throw error;
})

pool.query(`insert into guests (firstName, lastName)
            values ('Kevin', 'Lacey');
`, error => {
    if (error) throw error;
})


module.exports = {pool};
