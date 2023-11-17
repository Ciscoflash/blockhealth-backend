require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose")

const app = express();
const baseUrl = process.env.BASE_URL

// Mount Middlewares
app.use(cors())
app.use(express.json());

// DB Connect
mongoose.connect(process.env.DB_URL)
    .then(()=>console.log("Database Connected Successfully"))
    .catch((error) => console.error(error))

app.get("/", (req, res) => {
    res.send("Hello, Welcome")
})

app.listen(process.env.PORT, () => {
    console.log(`Server is listening on ${process.env.PORT}`)
})
