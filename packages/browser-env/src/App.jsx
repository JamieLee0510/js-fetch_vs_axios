import { initFetch, createInstance } from "demo-fetch";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

import "./App.css";
import { useState } from "react";
const URL = "http://localhost:3030/api/hihi";

function App() {
    const [fetchDataResult, setFetchResult] = useState("");
    const [axiosAlikeDataResult, setAxiosAlikeResult] = useState("");
    const requestFetch = async () => {
        await initFetch();
        const response = await fetch(URL, { method: "GET" });
        const data = await response.json();
        setFetchResult(data.data);
    };
    const requestAxiosAlike = async () => {
        const axiosInstance = await createInstance({
            headers: { "Content-Type": "application/json" },
        });

        const response = await axiosInstance({ url: URL, method: "GET" });
        setAxiosAlikeResult(response.data.data);
    };

    return (
        <>
            <div>
                <a href="https://vitejs.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank">
                    <img
                        src={reactLogo}
                        className="logo react"
                        alt="React logo"
                    />
                </a>
            </div>
            <h1>Vite + React</h1>
            <div className="card">
                <button onClick={requestFetch}>
                    fetch, data---{fetchDataResult}
                </button>
                <button onClick={requestAxiosAlike}>
                    axios alike, data---{axiosAlikeDataResult}
                </button>
            </div>
        </>
    );
}

export default App;
