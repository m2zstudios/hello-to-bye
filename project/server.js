const express = require("express");
const path = require("path");
const { validateKey } = require("./bladimirxyz");

const app = express();

app.use("/public", express.static(path.join(__dirname, "public")));

app.get("/validate", (req, res) => {
    const { key, domain } = req.query;

    const result = validateKey(key, domain);

    if (!result.valid) {
        return res.status(403).json({ success: false });
    }

    res.json({
        success: true,
        plan: result.plan
    });
});

app.listen(3000, () => console.log("Server running"));
