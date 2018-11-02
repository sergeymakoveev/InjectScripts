const SRC_DEFAULT = 'http://localhost:4444/browser-sync/browser-sync-client.js';

chrome.storage.local.get(
    [ 'src' ],
    (options) => {
        const src = options.src || SRC_DEFAULT;
        const $head = document.getElementsByTagName('head')[0];
        src.split('\n')
            .forEach((s) => {
                const $script = document.createElement('script');
                $script.setAttribute('type', 'text/javascript');
                $script.setAttribute('src', s);
                $head.appendChild($script);
            });
        console.log(`Scripts injected from\n${src}`);
    }
);
