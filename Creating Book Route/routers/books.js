import express from "express";
import Joi from "joi";
// import books from "./db/books";

const router=express.Router()



const books = [
    {
        id: 1,
        title: "Black Swan",
        author: "sdf",
        descriptions: "About",
        price: 10,
        cover: "Soft cover"
    },
    {
        id: 2,
        title: "Black Swan",
        author: "sadf",
        descriptions: "About",
        price: 10,
        cover: "Soft cover"
    },
    {
        id: 3,
        title: "Black Swan",
        author: "dslfkg",
        descriptions: "About",
        price: 10,
        cover: "Soft cover"
    },
];



router.get("/", (req, res) => {
    res.json(books);
})
router.get("/:id", (req, res) => {

    const book = books.find((b => b.id === parseInt(req.params.id)))
    console.log(book);
    if (book) {
        res.status(200).json(book);
    }
    else {
        res.status(404).json({ message: "not found" });
    }
})

router.post("/", (req, res) => {

    const {err} = validateCreateBook(req.body);
    if(err){
        res.status(400).json({message:err.details[0].message})
    }
    const book = {
        id: books.length + 1,
        title: req.body.title,
        author: req.body.price,
        descriptions: req.body.descriptions,
        price: req.body.price,
        cover: req.body.cover
    }
    books.push(book);
    if (book) {
        res.status(200).json(books);
    }
    else {
        res.status(404).json({ message: "not found" });
    }
})

// module.exports=router;

function validateCreateBook(obj){
    return Joi.object({
        title: Joi.string().trim().min(3).max(200).required(),
        author: Joi.string().trim().min(3).max(200).required(),
        descriptions: Joi.string().trim().min(3).max(500).required(),
        price: Joi.number().min(0).required(),
        cover: Joi.string().trim().required(),
    }).validate(obj);
}

export default router;