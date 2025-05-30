var express = require("express")
var path = require("path")
var cookieParser = require("cookie-parser")
var logger = require("morgan")
var { MongoClient } = require("mongodb")

var indexRouter = require("./routes/index")
var booksRouter = require("./routes/books")

var app = express()

// MongoDB connection
const uri = "mongodb://localhost:27017"
const client = new MongoClient(uri)

async function connectDB() {
  try {
    await client.connect()
    console.log("Connected to MongoDB")
    app.locals.db = client.db("livros")
  } catch (error) {
    console.error("MongoDB connection error:", error)
  }
}

connectDB()

app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, "public")))

// CORS middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
  res.header("Access-Control-Allow-Headers", "Content-Type")
  next()
})

app.use("/", indexRouter)
app.use("/books", booksRouter)

// Error handling
app.use((req, res, next) => {
  res.status(404).json({ error: "Route not found" })
})

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    error: err.message,
    details: req.app.get("env") === "development" ? err.stack : {},
  })
})

module.exports = app
