(function (global) {
    "use strict";

    const CRAFTEX_SEARCH_BASE_URL = "https://www.craftex.com/search";

    function normalizeCode(rawCode) {
        return typeof rawCode === "string" ? rawCode.trim() : "";
    }

    function buildSearchUrl(code) {
        const cleanCode = normalizeCode(code);
        if (!cleanCode) return "";

        const url = new URL(CRAFTEX_SEARCH_BASE_URL);
        url.searchParams.set("keywords", cleanCode);
        return url.toString();
    }

    function openSearchTab(code) {
        const searchUrl = buildSearchUrl(code);
        if (!searchUrl) return { opened: false, url: "" };

        const newWindow = window.open(searchUrl, "_blank", "noopener,noreferrer");
        return {
            opened: Boolean(newWindow),
            url: searchUrl
        };
    }

    function createManualLinkElement(code, label = "Abrir búsqueda en Craftex", className = "manual-link") {
        const searchUrl = buildSearchUrl(code);
        if (!searchUrl) return null;

        const link = document.createElement("a");
        link.href = searchUrl;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.className = className;
        link.textContent = label;
        return link;
    }

    global.CraftexConnector = {
        normalizeCode,
        buildSearchUrl,
        openSearchTab,
        createManualLinkElement
    };
})(window);
