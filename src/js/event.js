chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.executeScript(null, {
        code: 'window.pageTableContent.status();'
    }, function(result) {
        console.log(result);
        if (result == "show") {
            hide();
        } else {
            show();
        }
    });

    function show() {
        chrome.tabs.executeScript(null, {
            code: 'window.pageTableContent.show();'
        });
    }

    function hide() {
        chrome.tabs.executeScript(null, {
            code: 'window.pageTableContent.hide();'
        });
    }
});