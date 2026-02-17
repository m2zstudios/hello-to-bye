(function () {

    const currentScript = document.currentScript;
    if (!currentScript) return;

    const apiKey = currentScript.getAttribute("api");
    if (apiKey !== "testkey567") {
        console.warn("Invalid API key");
        return;
    }

    let replaceCount = 0;
    let lastPing = new Date();

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
        }

        #hello-widget {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 260px;
            background: #111;
            color: #fff;
            font-family: Arial, sans-serif;
            border-radius: 12px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.3);
            z-index: 999999;
            padding: 15px;
            cursor: move;
            user-select: none;
        }

        #hello-widget h4 {
            margin: 0 0 10px 0;
            font-size: 14px;
        }

        #hello-widget .status {
            font-size: 12px;
            margin-top: 8px;
        }

        #hello-widget .ping {
            color: #00ff88;
            font-weight: bold;
        }
    `;
    document.head.appendChild(style);


    /* -------------------------
       Replace Logic
    -------------------------- */
    function replaceText(node) {

        if (node.nodeType === 3) {

            if (/hello/i.test(node.nodeValue)) {

                const span = document.createElement("span");

                span.innerHTML = node.nodeValue.replace(/hello/gi, function () {
                    replaceCount++;
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
        updateStats();
    }

    /* -------------------------
       Floating Widget
    -------------------------- */
    const widget = document.createElement("div");
    widget.id = "hello-widget";
    widget.innerHTML = `
        <h4>🚀 Hello Converter Stats</h4>
        <div>Replacements: <b id="replace-count">0</b></div>
        <div class="status">
            Ping: <span class="ping" id="ping-status">ACTIVE</span>
        </div>
    `;
    document.body.appendChild(widget);

    function updateStats() {
        document.getElementById("replace-count").innerText = replaceCount;
    }

    /* -------------------------
       Drag Functionality
    -------------------------- */
    let isDragging = false;
    let offsetX, offsetY;

    widget.addEventListener("mousedown", function (e) {
        isDragging = true;
        offsetX = e.clientX - widget.getBoundingClientRect().left;
        offsetY = e.clientY - widget.getBoundingClientRect().top;
    });

    document.addEventListener("mousemove", function (e) {
        if (isDragging) {
            widget.style.left = (e.clientX - offsetX) + "px";
            widget.style.top = (e.clientY - offsetY) + "px";
            widget.style.right = "auto";
            widget.style.bottom = "auto";
        }
    });

    document.addEventListener("mouseup", function () {
        isDragging = false;
    });

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
        runReplace();
    });

    /* -------------------------
       Ping Every 5 Seconds
    -------------------------- */
    setInterval(() => {
        lastPing = new Date();
        runReplace();

        const pingEl = document.getElementById("ping-status");
        pingEl.innerText = "ACTIVE";
        pingEl.style.color = "#00ff88";

    }, 5000);

})();
