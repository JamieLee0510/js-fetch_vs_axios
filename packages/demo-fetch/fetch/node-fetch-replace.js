import http from "http";
import https from "https";
import { URL } from "url";

function fetch(url, options = {}) {
    return new Promise((resolve, reject) => {
        const urlObj = new URL(url);
        const isHttps = urlObj.protocol === "https:";
        const { method = "GET", headers = {}, body } = options;

        const requestOptions = {
            method,
            headers,
        };

        const request = (isHttps ? https : http).request(
            urlObj,
            requestOptions,
            (response) => {
                let data = "";

                response.on("data", (chunk) => {
                    data += chunk;
                });

                response.on("end", () => {
                    const responseData = {
                        ok:
                            response.statusCode >= 200 &&
                            response.statusCode < 300,
                        status: response.statusCode,
                        statusText: response.statusMessage,
                        headers: response.headers,
                        url: response.url || url,
                        json: () => Promise.resolve(JSON.parse(data)),
                        text: () => Promise.resolve(data),
                        blob: () => Promise.resolve(Buffer.from(data)),
                    };
                    resolve(responseData);
                });
            },
        );

        request.on("error", (error) => {
            reject(error);
        });

        if (body) {
            request.write(body);
        }

        request.end();
    });
}

export default fetch;
