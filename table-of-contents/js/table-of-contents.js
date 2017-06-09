"use strict";

(function(window, document) {

    var containerElementId = "auto-id-" + (new Date()).valueOf();
    var originalBodyPaddingLeft = document.body.style.paddingLeft;

    window.pageTableOfContents = {
        toggle: function() {
            var containerElement = document.getElementById(containerElementId);
            if (!containerElement) {
                containerElement = renderContainerElement(containerElementId);
                containerElement.style.display = "block";
                document.body.style.paddingLeft = "320px";
                return "show";
            } else if (containerElement.style.display === "block") {
                containerElement.style.display = "none";
                document.body.style.paddingLeft = originalBodyPaddingLeft;
                return "none";
            } else {
                containerElement.style.display = "block";
                document.body.style.paddingLeft = "320px";
                return "show";
            }
        }
    };

    function renderContainerElement(containerId) {
        var hElements = document.querySelectorAll("h1,h2,h3,h4,h5,h6");

        var links = buildLinks(hElements);
        var tableOfContentsHtml = buildTableOfContentsHtml(links);

        var containerHtml = buildContainerHtml(tableOfContentsHtml, containerId);

        document.body.innerHTML += containerHtml;

        return document.getElementById(containerId);
    }

    function buildContainerHtml(html, containerId) {
        return "<div" +
            " id='" + containerId + "'" +
            " class='table-of-contents-container'>" +
            html +
            "</div>";
    }

    function buildLinks(elements) {
        var links = [];

        elements = elements || [];
        for (var i = 0; i < elements.length; i++) {
            var element = elements.item(i);
            if (!element || !element.innerText) {
                continue;
            }
            if (!element.id) {
                element.id = "table_of_contents_" + i;
            }

            links.push({
                id: element.id,
                text: element.innerText,
                tagName: element.tagName.toLowerCase()
            });
        }

        return links;
    }

    function buildTableOfContentsHtml(links) {
        var tableOfContentsHtml = "<div class='table-of-contents'>";

        links = links || [];
        for (var i = 0; i < links.length; i++) {
            var link = links[i];
            var aHtml = "<a" +
                " href='#" + link.id + "'" +
                " class='table-of-contents-" + link.tagName + "'>" +
                link.text +
                "</a>";
            tableOfContentsHtml += aHtml;
        }

        tableOfContentsHtml += "</div>";

        return tableOfContentsHtml;
    }
})(window, document);