chrome.browserAction.onClicked.addListener(function(tab) {
    var details = { code: "window.pageTableOfContents.toggle();" };
    chrome.tabs.executeScript(null, details);
});