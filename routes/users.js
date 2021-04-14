const router = require("express").Router();
const db = require("../config/dbConfig");
const verify = require("../config/verify")


// GET USER'S CUSTOMIZED VACATIONS
router.get("/all", verify, (req, res) => {
  const {user_name, username, user_type} = req.user.data;
  db.query(`INSERT IGNORE INTO ${username} ( 
    vacation_id) 
  SELECT DISTINCT vacation_id
  FROM vacations;
  
  SELECT ${username}.id, ${username}.vacation_id, vacations.destination, vacations.description, vacations.accommodation, vacations.price, vacations.start_date, vacations.end_date, vacations.image, vacations.followers, ${username}.follow FROM ${username} INNER JOIN vacations ON vacations.vacation_id = ${username}.vacation_id ORDER BY ${username}.follow DESC;`, (err, results) => {
    if (err) return res.send(err)
    res.send({name: user_name, username, type: user_type, results: results[1]})
  } )
})

// UPDATE (LIKE)
router.put("/like/:id", verify, (req, res) => {
const {binary} = req.body;
const {id} = req.params;
const {username} = req.user.data;

db.query(`UPDATE ${username} SET ${username}.follow = not follow WHERE vacation_id = ${id}`, (err, results) => {
  if (err) return res.json({err: true})
  if (binary == 0) {
  db.query(`UPDATE vacations SET vacations.followers = vacations.followers+1 WHERE vacation_id = ${id}`, (err, results) => {
            if (err) return res.json({err: true})
            res.json()
        })
      } else if (binary == 1) {
            db.query(`UPDATE vacations SET vacations.followers = vacations.followers-1 WHERE vacation_id = ${id}`, (err, results) => {
              if (err) return res.json({err: true})
              res.json()
          })
          }
        })
})

// DELETE OWN USER
router.delete("/delete", verify, (req, res) => {
  const {username, type} = req.user.data;
  // run a check to see if 
  db.query(`DROP TABLE ${username}; DELETE FROM users WHERE users.user_name = "${username}";`, (err, results) => {
    if (err) return res.send(err)
res.send("user deleted")
  })
  })

module.exports = router;