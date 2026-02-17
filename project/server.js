const express = require("express");
const path = require("path");

const app = express();

app.get("/script.js", (req, res) => {
    res.sendFile(path.join(__dirname, "script.js"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});
