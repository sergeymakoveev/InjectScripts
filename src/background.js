const tabs = {};
const isEnabled = (id) => Boolean(tabs[id]);
const toggle = (id) => (tabs[id] = !tabs[id]);
const inject = (id) => {
    chrome.tabs.executeScript(
        id,
        { file: 'inject.js' }
    );
    setState(id);
};
const eject = (id) => {
    chrome.tabs.executeScript(
        id,
        { file: 'eject.js' }
    );
    setState(id);
};
const setState = (id) => {
    chrome.browserAction.setIcon({
        tabId: id,
        path: `icons/icon.${isEnabled(id) ? 'in' : 'e'}jected.png`,
    });
    chrome.browserAction.setTitle({
        tabId: id,
        title: `${isEnabled(id) ? 'Eject' : 'Inject'} scripts`,
    });
};

chrome.browserAction.onClicked.addListener((tab) => {
    const { id } = tab;
    toggle(id);
    isEnabled(id)
        ? inject(id)
        : eject(id);
});

chrome.runtime.onMessage.addListener(
    (request, sender, sendResponse) => {
        const { id } = sender.tab;
        request === 'inject'
            && isEnabled(id)
            && inject(id);
    }
);