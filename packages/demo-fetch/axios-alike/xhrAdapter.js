export async function xhrAdapter(config) {
    return new Promise((resolve, reject) => {
        const request = new XMLHttpRequest();
        request.open(config.method.toUpperCase(), config.url, true);

        Object.keys(config.headers).forEach((key) => {
            request.setRequestHeader(key, config.headers[key]);
        });

        request.onload = function () {
            const response = {
                data: JSON.parse(request.responseText),
                status: request.status,
                statusText: request.getAllResponseHeaders(),
                config: config,
                request: request,
            };
            resolve(response);
        };
        request.onerror = function () {
            reject(new Error("Network Error"));
        };

        request.ontimeout = function () {
            reject(new Error(`Timeout of ${config.timeout} ms exceeded`));
        };

        request.send(config.data);
    });
}
