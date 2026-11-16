const express = require("express");

const app = express();
const PORT = 5000;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("FitTrack Backend is Running!");
});

app.listen(PORT, () => {
    console.log(`FitTrack server running at http://localhost:${PORT}`);
});