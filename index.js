const express = require("express")
const app = express()
const cors = require("cors")
const cookieParser = require("cookie-parser")


//MIDDLEWARE
app.use(cors())
app.use(express.json())
app.use(cookieParser())

//ROUTES
app.use("/admin", require("./routes/admin"))
app.use("/users", require("./routes/users"))
app.use("/auth", require("./routes/auth"))


if (process.env.NODE_ENV === 'production') {
  // Serve only the static files form the dist directory
  app.use(express.static(__dirname + '/client/build'));
  app.get('/*', function(req,res) {  
  res.sendFile(path.join(__dirname+'/client/built/index.html'));
  });
}

const PORT = process.env.PORT || 2020

app.listen(PORT, () => {
  console.log("server is running")
})