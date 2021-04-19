const mysql = require("mysql")

const db = mysql.createConnection({
  host: "vkh7buea61avxg07.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
  user: "aoyg9riw90ba1n3s",
  password: "juh752ipvxv1ne5v",
  database: "ep46pppa41wjmav5",
  multipleStatements: true
})
module.exports = db;
