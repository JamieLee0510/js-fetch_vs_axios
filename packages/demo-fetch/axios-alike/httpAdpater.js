import http from "http";
import https from "https";

export async function httpAdpater(config) {
    return new Promise((resolve, reject) => {
        const url = new URL(config.url);
        const isHttps = url.protocol === "https";
        const options = {
            method: config.method,
            headers: config.headers,
        };

        const request = (isHttps ? https : http).request(
            url,
            options,
            (response) => {
                let data = "";

                response.on("data", (chunk) => {
                    data += chunk;
                });
                response.on("end", () => {
                    resolve({
                        data: JSON.parse(data),
                        status: response.statusCode,
                        statusText: response.statusMessage,
                        headers: response.headers,
                        config: config,
                        request: response,
                    });
                });
            },
        );

        request.on("error", (error) => {
            reject(error);
        });
        if (config.data) {
            request.write(config.data);
        }

        request.end();
    });
}
