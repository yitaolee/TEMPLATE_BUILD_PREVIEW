export function loadCssAndJavaScripts(document: Document, css: string[], js: string[]) {
    loadCssScripts(document, css);
    loadScripts(document, js);
}

export function loadCssScripts(document: Document, css: string[]) {
    for (let i = 0; i < css.length; i++) {
        const node = document.createElement('link');
        node.href = css[i];
        node.type = 'text/css';
        node.rel = 'stylesheet';
        node.charset = 'utf-8';
        document.getElementsByTagName('head')[0].appendChild(node);
    }
}

export function loadScripts(document: Document, scripts: string[]) {
    for (let i = 0; i < scripts.length; i++) {
        const node = document.createElement('script');
        node.src = scripts[i];
        node.type = 'text/javascript';
        node.async = false;
        node.charset = 'utf-8';
        document.getElementsByTagName('head')[0].appendChild(node);
    }
}

export function formatTime(time) {
    return new Date(time).toLocaleString('en-US', {
        timeZone: 'UTC', weekday: "short", month: "short",
        day: "numeric", hour: 'numeric', minute: 'numeric'
    });
}

export function getPrice(event) {
    const priceMin = Math.min(event.price, event.priceMax);
    const priceMax = Math.max(event.price, event.priceMax);
    let price = 'Free';

    if (priceMin < priceMax) {
        price = `$${priceMin}-${priceMax}`;
    } else if (priceMin !== 0 && priceMin === priceMax) {
        price = `$${priceMin}`;
    }
    return price;
}
