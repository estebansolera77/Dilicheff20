const mysql = require('mysql2/promise')
const mysqlPool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'esd1037120036',
    database: 'dbganaderia'
})
module.exports = mysqlPool