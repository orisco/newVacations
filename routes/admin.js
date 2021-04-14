const router = require("express").Router()
const db = require("../config/dbConfig");
const verify = require("../config/verify");

// GET ALL VACATIONS
// router.get("/", verify, (req, res) => {
//   const {username, type} = req.user.data;
//   if (!username == "admin" || type == "admin") return res.status(404).send("Not Authorized User");
//   db.query("SELECT * FROM vacations", (err, results) => {
//     if (err) return res.send(err)
//     res.send(results)
//   })
// })

// POST ADD A NEW VACATION
router.post("/add", verify, (req, res) => {
  const {destination, description, accommodation, start_date, end_date, price, image} = req.body;
  const {username, type} = req.user.data;
  
  if (!username == "admin" || type == "admin") return res.status(404).send("Not Authorized User");
  db.query(`INSERT INTO vacations ( destination, description, accommodation, start_date, end_date, price, image)
  VALUES ("${destination}", "${description}",  "${accommodation}", "${start_date}","${end_date}", ${price}, "${image}");`, (err, results) => {
    if (err) return res.send(err)
    res.send(results)
  })
})

// UPDATE A VACATION
router.put("/update/:id", verify, (req, res) => {
  const {id} = req.params
  const {destination, description, accommodation, start_date, end_date, price, image} = req.body;
  const {username, type} = req.user.data;
  if (!username == "admin" || type == "admin") return res.status(404).send("Not Authorized User");
  db.query(`UPDATE vacations SET destination = "${destination}", description = "${description}", accommodation = "${accommodation}", start_date = "${start_date}", end_date = "${end_date}", price = ${price}, image = "${image}" WHERE vacations.vacation_id = ${id};`, (err, results) => {
    if (err) return res.send(err)
    res.send(results)
  })
})

// DELETE A VACATION
router.delete("/delete/:id", verify, (req, res) => {
  const {id} = req.params
  const {username, type} = req.user.data;
  if (!username == "admin" || type == "admin") return res.status(404).send("Not Authorized User");
  db.query(`
  SET FOREIGN_KEY_CHECKS=0;
  DELETE FROM vacations WHERE vacations.vacation_id = ${id};
  SET FOREIGN_KEY_CHECKS=1;`, (err, results) => {
    if (err) return res.send(err)
    res.send(results)
  })
})

module.exports = router;