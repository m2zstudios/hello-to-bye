(function () {
    const currentScript = document.currentScript;
    if (!currentScript) return;

    const apiKey = currentScript.getAttribute("api");

    // API Validation
    if (apiKey !== "testkey567") {
        console.warn("Invalid API key");
        return;
    }

    // Text Replace Function
    function replaceText(node) {
        if (node.nodeType === 3) {
            if (node.nodeValue.match(/hello/i)) {
                node.nodeValue = node.nodeValue.replace(/hello/gi, "bye");
            }
        } else if (node.nodeType === 1 && node.childNodes && 
                   node.tagName !== "SCRIPT" && 
                   node.tagName !== "STYLE" && 
                   node.tagName !== "NOSCRIPT") {

            node.childNodes.forEach(replaceText);
        }
    }

    function runReplace() {
        replaceText(document.body);
    }

    // Initial Run
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", runReplace);
    } else {
        runReplace();
    }

    // Live DOM Changes Observer (SPA / dynamic content support)
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                replaceText(node);
            });
        });
    });

    window.addEventListener("load", () => {
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });

})();
