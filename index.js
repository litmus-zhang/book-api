const express = require("express");

const app = express();
const mongoose = require("mongoose")

app.use(express.json());

const Book = new mongoose.Schema({
  author: String,
  year: String,
  pages: Number,
})


const BookModel = mongoose.model("Book", Book);

mongoose.connect("", ()=>{
    console.log("Connected to database")
    app.listen(4000, () => {
        console.log("Server is running");
    });
})



app.get("/api/books", (req, res) => {
    BookModel.find({}, (err, result) => {
        if (err) {
        res.send(err);
        }
        res.send(result);
    });
})

app.post("/api/books",async (req, res) => {
    const book = new BookModel({
        author: req.body.author,
        year: req.body.year,
        pages: req.body.pages
    });

    await book.save();
    res.send(book);
})