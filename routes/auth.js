const router = require("express").Router();
const db = require("../config/dbConfig");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

// POST
router.post("/new", (req, res) => {
  try {
    const {name, username, password} = req.body;
  // validate fields are filled
  if (!name || !username || !password )
  return res.status(404).json({err: true, msg:"You're missing some info. Please fill in all the fields."})
  // check if user exists in db
  const validate = db.query(`SELECT * FROM users WHERE user_username = "${username}";`, async (err, results) => {
    if (err) return res.send(err)
    if (results.length > 0) return res.status(404).json({err: true, msg: "username already taken, please try a different username"})
    const securePass = await bcrypt.hash(password, 10);
    await db.query(`CREATE TABLE ${username} (
      id INT AUTO_INCREMENT PRIMARY KEY,
      vacation_id INT UNIQUE,
      follow TINYINT DEFAULT 0,
      FOREIGN KEY (vacation_id) REFERENCES vacations(vacation_id)
      ); 
      INSERT INTO users (user_name, user_username, user_password) VALUES ("${name}", "${username}", "${securePass}");
      `, (err, results ) => {
      if (err) return res.status(404).json({err: true, msg: "Sorry, couldn't create your username. Please try again"})
      res.json({err: false, msg: "user created successfully"})
  })
  })
  

  } catch (error) {
    console.log(error)
  } 
})


router.post("/login",  async (req, res) => {
    const {username, password} = req.body;
  // validate fields
  if (!username || !password )
  return res.status(404).json({err: true, msg: "You're missing some info. Please fill in all the fields."})
  // find user
  db.query(`SELECT user_name, user_password AS psw, user_type
  FROM users
  WHERE user_username = "${username}";`, async (err, results) => {
    if (err) res.status(404).json("error connecting to db")
    if (results.length === 0)  return res.status(404).json({err: true, msg: "Username doesn't exist. Please try again."})
        const {user_name, psw, user_type} = results[0];
          await bcrypt.compare(password, psw, (err, results) => {
          if (err) return res.send(err)
          if (!results) return res.json({err: true, msg: "Wrong Password. Please Try Again"})
          const token = jwt.sign({
           data: {user_name, username, user_type}
              }, 'secret', { expiresIn: '1h' })
          res.cookie('token', token)
          res.json({err: false, token})
    })
  })
})

module.exports = router;

