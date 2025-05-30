var express = require("express")
var router = express.Router()
var axios = require("axios")
var createError = require("http-errors")

// Helper function to generate author ID
function generateAuthorId(author) {
  return author
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "-")
    .replace(/-+/g, "-")
}

// Helper function to extract authors from author field
function extractAuthors(authorField) {
  if (!authorField) return []

  // Handle array case
  if (Array.isArray(authorField)) {
    return authorField.filter((a) => a && a.trim().length > 0)
  }

  // Handle string case
  if (typeof authorField === "string") {
    return authorField
      .split(/[,&]/)
      .map((a) => a.trim())
      .filter((a) => a.length > 0)
  }

  // Handle other types by converting to string
  return authorField
    .toString()
    .split(/[,&]/)
    .map((a) => a.trim())
    .filter((a) => a.length > 0)
}

/* GET home page */
router.get("/", async (req, res, next) => {
  try {
    const response = await axios.get(`${req.app.locals.apiUrl}/books`)
    const books = response.data

    res.render("index", {
      title: "Biblioteca de Livros",
      books: books,
      generateAuthorId: generateAuthorId,
    })
  } catch (error) {
    next(error)
  }
})

/* GET book details */
router.get("/:id", async (req, res, next) => {
  try {
    const response = await axios.get(`${req.app.locals.apiUrl}/books/${req.params.id}`)
    const book = response.data

    res.render("book", {
      title: book.title,
      book: book,
      extractAuthors: extractAuthors,
      generateAuthorId: generateAuthorId,
    })
  } catch (error) {
    if (error.response && error.response.status === 404) {
      next(createError(404, "Livro não encontrado"))
    } else {
      next(error)
    }
  }
})

/* GET author page */
router.get("/entidades/:idAutor", async (req, res, next) => {
  try {
    const response = await axios.get(`${req.app.locals.apiUrl}/books`)
    const allBooks = response.data

    // Find books by this author
    const authorBooks = allBooks.filter((book) => {
      const authors = extractAuthors(book.author)
      return authors.some((author) => generateAuthorId(author) === req.params.idAutor)
    })

    if (authorBooks.length === 0) {
      return next(createError(404, "Autor não encontrado"))
    }

    // Get author name from first book
    const firstBook = authorBooks[0]
    const authors = extractAuthors(firstBook.author)
    const authorName = authors.find((author) => generateAuthorId(author) === req.params.idAutor)

    res.render("author", {
      title: `Autor: ${authorName}`,
      authorId: req.params.idAutor,
      authorName: authorName,
      books: authorBooks,
      totalBooks: authorBooks.length,
      generateAuthorId: generateAuthorId,
    })
  } catch (error) {
    next(error)
  }
})

module.exports = router
