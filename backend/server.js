const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const routes = require("./routes/index.routes");
dotenv.config();

const app = express();

app.use(cors({
    origin: '*',        // Allows all origins
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']  // Specify allowed methods
}));
app.use(express.json());

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log(error);
    }
};

connectDB();

app.use("/v1", routes);

app.get("/", (req, res) => {
    res.send("Hello World");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});