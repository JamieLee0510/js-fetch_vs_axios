import { initFetch } from "demo-fetch/fetch/index.js";
import { createInstance } from "demo-fetch/axios-alike/index.js";

const URL = "http://localhost:3030/api/hihi";

const getDataFromFetch = async () => {
    await initFetch();

    const response = await fetch(URL, { method: "GET" });
    const data = await response.json();

    console.log("---getDataFromFetch, data:", data);
};

const getDataFromAxiosAlike = async () => {
    const axiosInstance = createInstance({
        headers: { "Content-Type": "application/json" },
    });

    const response = await axiosInstance({ url: URL, method: "GET" });
    console.log("---getDataFromAxiosAlike, data:", response.data);
};

getDataFromFetch();
getDataFromAxiosAlike();
