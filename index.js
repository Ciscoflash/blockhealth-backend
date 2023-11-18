require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose")
const hospitalRouter = require('./routes/Hospital')
const authRouter = require("./routes/Auth")
const patientRouter = require("./routes/Patient")

const app = express();
const baseUrl = process.env.BASE_API

// Mount Middlewares
app.use(cors())
app.options("*", cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use(`${baseUrl}/hospitals`, hospitalRouter)
app.use(`${baseUrl}/auth`, authRouter)
app.use(`${baseUrl}/hospitals`, patientRouter)

// DB Connect
mongoose.connect(process.env.DB_URL)
    .then(()=>console.log("Database Connected Successfully"))
    .catch((error) => console.error(error))

app.get(baseUrl, (req, res) => {
    res.send("Hello, Welcome")
})

app.listen(process.env.PORT, () => {
    console.log(`Server is listening on ${process.env.PORT}`)
})
