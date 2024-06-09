import nodeFetch from "./node-fetch-replace.js";

export async function initFetch() {
    let fetch;

    if (typeof window !== "undefined" && typeof window.fetch === "function") {
        fetch = window.fetch;
    } else {
        //const nodeFetch = await import("node-fetch");
        fetch = nodeFetch;
    }

    if (typeof global !== "undefined") {
        global.fetch = fetch;
    } else if (typeof window !== "undefined") {
        window.fetch = fetch;
    }
}
