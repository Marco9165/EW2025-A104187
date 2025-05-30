var express = require("express")
var router = express.Router()

// GET /books - lista todos os livros
router.get("/", async (req, res, next) => {
  try {
    const db = req.app.locals.db
    const collection = db.collection("livros")

    // Check for query parameters
    const { character, genre } = req.query
    const query = {}

    if (character) {
      query.characters = { $regex: character, $options: "i" }
    }

    if (genre) {
      query.genres = { $regex: genre, $options: "i" }
    }

    const books = await collection.find(query).toArray()
    res.json(books)
  } catch (error) {
    next(error)
  }
})

// GET /books/genres - lista de géneros
router.get("/genres", async (req, res, next) => {
  try {
    const db = req.app.locals.db
    const collection = db.collection("livros")

    const pipeline = [{ $unwind: "$genres" }, { $group: { _id: "$genres" } }, { $sort: { _id: 1 } }]

    const genres = await collection.aggregate(pipeline).toArray()
    const genreList = genres.map((g) => g._id)

    res.json(genreList)
  } catch (error) {
    next(error)
  }
})

// GET /books/characters - lista de personagens
router.get("/characters", async (req, res, next) => {
  try {
    const db = req.app.locals.db
    const collection = db.collection("livros")

    const pipeline = [{ $unwind: "$characters" }, { $group: { _id: "$characters" } }, { $sort: { _id: 1 } }]

    const characters = await collection.aggregate(pipeline).toArray()
    const characterList = characters.map((c) => c._id)

    res.json(characterList)
  } catch (error) {
    next(error)
  }
})

// GET /books/:id - livro específico
router.get("/:id", async (req, res, next) => {
  try {
    const db = req.app.locals.db
    const collection = db.collection("livros")

    const book = await collection.findOne({ bookId: req.params.id })

    if (!book) {
      return res.status(404).json({ error: "Book not found" })
    }

    res.json(book)
  } catch (error) {
    next(error)
  }
})

// POST /books - adicionar novo livro
router.post("/", async (req, res, next) => {
  try {
    const db = req.app.locals.db
    const collection = db.collection("livros")

    const newBook = req.body

    // Ensure required fields
    if (!newBook.bookId || !newBook.title) {
      return res.status(400).json({ error: "bookId and title are required" })
    }

    const result = await collection.insertOne(newBook)
    res.status(201).json({ message: "Book created", id: result.insertedId })
  } catch (error) {
    next(error)
  }
})

// PUT /books/:id - atualizar livro
router.put("/:id", async (req, res, next) => {
  try {
    const db = req.app.locals.db
    const collection = db.collection("livros")

    const result = await collection.updateOne({ bookId: req.params.id }, { $set: req.body })

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Book not found" })
    }

    res.json({ message: "Book updated" })
  } catch (error) {
    next(error)
  }
})

// DELETE /books/:id - eliminar livro
router.delete("/:id", async (req, res, next) => {
  try {
    const db = req.app.locals.db
    const collection = db.collection("livros")

    const result = await collection.deleteOne({ bookId: req.params.id })

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Book not found" })
    }

    res.json({ message: "Book deleted" })
  } catch (error) {
    next(error)
  }
})

module.exports = router
