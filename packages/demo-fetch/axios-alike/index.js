async function getDefaultAdapter() {
    if (typeof XMLHttpRequest !== "undefined") {
        // for browser, using XHR adapter
        const { xhrAdapter } = await import("./xhrAdapter.js");

        return xhrAdapter;
    } else if (typeof process !== "undefined") {
        const { httpAdpater } = await import("./httpAdpater.js");

        return httpAdpater;
    }

    throw new Error("No suitable adapter found");
}

export async function createInstance(defaultConfig) {
    const context = {
        config: defaultConfig || {},
        adapter: await getDefaultAdapter(),
    };

    const instance = async (config) => {
        config = { ...context.config, ...config };
        return context.adapter(config);
    };
    instance.defaults = context.config;
    instance.adapter = context.adapter;

    return instance;
}
