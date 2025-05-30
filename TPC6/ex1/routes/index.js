var express = require("express")
var router = express.Router()

/* GET home page. */
router.get("/", (req, res, next) => {
  res.json({
    message: "Books API",
    version: "1.0.0",
    endpoints: [
      "GET /books - list all books",
      "GET /books/:id - get book by id",
      "GET /books?character=name - filter by character",
      "GET /books?genre=name - filter by genre",
      "GET /books/genres - list all genres",
      "GET /books/characters - list all characters",
      "POST /books - create new book",
      "PUT /books/:id - update book",
      "DELETE /books/:id - delete book",
    ],
  })
})

module.exports = router
