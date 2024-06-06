import express from "express";
import cors from "cors";
const app = express();
const PORT = 3030;

app.use(cors());

app.get("/api/hihi", (req, res) => {
    res.send({ data: "hello world" });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
