import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import postRouter from "./routes/postRouter.js"

dotenv.config();
const app = express();

app.use(express.json({limit: "100mb"}));
app.use(cors());

app.get("/", (req, res) => {
    res.send("Work")
})

app.use("/posts", postRouter)

const PORT = process.env.PORT || 5000;

mongoose.connect('mongodb+srv://Halil:1234lca@cluster0.biicrbd.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => app.listen(PORT, () => console.log(`Server is runing ${PORT}`)))
.catch((error) => console.group(error.message));

export default app