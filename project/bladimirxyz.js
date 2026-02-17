// bladimirxyz.js

function validateKey(apiKey, domain) {
    if (!apiKey) return { valid: false };

    if (apiKey !== "testkey567") {
        return { valid: false };
    }

    if (domain !== "alloweddomain.com") {
        return { valid: false };
    }

    return {
        valid: true,
        plan: "pro"
    };
}

module.exports = { validateKey };
