// bladimirxyz.js

function validateKey(apiKey, domain) {
    if (!apiKey) return { valid: false };

    if (apiKey !== "testkey567") {
        return { valid: false };
    }

    if (domain !== "https://hello-to-bye.onrender.com") {
        return { valid: false };
    }

    return {
        valid: true,
        plan: "pro"
    };
}

module.exports = { validateKey };
