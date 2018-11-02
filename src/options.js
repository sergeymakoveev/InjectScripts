const SRC_DEFAULT = 'http://localhost:4444/browser-sync/browser-sync-client.js';

const save = () => {
    const value = document.getElementById('src').value;
    const src = value.trim() || SRC_DEFAULT;
    chrome.storage.local.set(
        { src },
        () => {
            const status = document.getElementById('status');
            status.textContent = 'Options saved.';
            setTimeout(() => (status.textContent = ''), 750);
            src !== value
            && restore();
        }
    );
};

function restore () {
    chrome.storage.local.get(
        [ 'src' ],
        (options) => {
            const src = options.src || SRC_DEFAULT;
            document.getElementById('src').value = src;
            src !== options.src
            && save();
        }
    );
};

document.addEventListener('DOMContentLoaded', restore);
document.getElementById('save').addEventListener('click', save);