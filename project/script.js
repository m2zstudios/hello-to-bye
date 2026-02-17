(function () {

    const currentScript = document.currentScript;
    if (!currentScript) return;

    const apiKey = currentScript.getAttribute("api");
    if (apiKey !== "testkey567") {
        console.warn("Invalid API key");
        return;
    }

    /* -------------------------
       CSS Injection
    -------------------------- */
    const style = document.createElement("style");
    style.innerHTML = `
        .hello-replaced {
            color: red !important;
            font-weight: bold !important;
            background: yellow !important;
            padding: 2px 4px;
            border-radius: 4px;
            transition: 0.3s ease;
        }
    `;
    document.head.appendChild(style);


    /* -------------------------
       Text Replace with Span
    -------------------------- */
    function replaceText(node) {

        if (node.nodeType === 3) {

            if (/hello/i.test(node.nodeValue)) {

                const span = document.createElement("span");
                span.innerHTML = node.nodeValue.replace(/hello/gi, function(match) {
                    return `<span class="hello-replaced">bye</span>`;
                });

                node.replaceWith(span);
            }

        } else if (
            node.nodeType === 1 &&
            node.tagName !== "SCRIPT" &&
            node.tagName !== "STYLE" &&
            node.tagName !== "NOSCRIPT"
        ) {
            Array.from(node.childNodes).forEach(replaceText);
        }
    }

    function runReplace() {
        replaceText(document.body);
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", runReplace);
    } else {
        runReplace();
    }

    /* -------------------------
       Mutation Observer
    -------------------------- */
    const observer = new MutationObserver((mutations) => {
        mutations.forEach(mutation => {
            mutation.addedNodes.forEach(node => {
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
