"use strict";

(function(window, document) {

    var navContainerElementId = "auto-nav-container";
    var oldBodyPaddingLeft = document.body.style.paddingLeft;

    window.pageTableContent = {
        show: function() {
            var hElements = document.querySelectorAll("h1,h2,h3,h4,h5,h6");

            var links = buildLinks(hElements);
            var navHtml = buildNavHtml(links);

            var containerHtml = buildContainerHtml(navHtml);

            document.body.innerHTML += containerHtml;
            document.body.style.paddingLeft = "320px";
        },
        hide: function() {
            document.body.style.paddingLeft = oldBodyPaddingLeft;
            var navContainerElement = document.getElementById(navContainerElementId);
            document.body.removeChild(navContainerElement);
        },
        status: function() {
            return document.getElementById(navContainerElementId) ? "show" : "hide";
        }
    };

    function buildContainerHtml(html) {
        return "<div" +
            " id='" + navContainerElementId + "'" +
            " class='" + navContainerElementId + "'" +
            ">" +
            html +
            "</div>";
    }

    function buildLinks(elements) {
        var links = [];

        elements = elements || [];
        for (var i = 0; i < elements.length; i++) {
            var element = elements.item(i);
            if (!element) {
                continue;
            }
            if (!element.id) {
                element.id = "auto_nav_id_" + i;
            }
            var id = element.id;
            var text = element.innerText || "none";
            var tagName = element.tagName || element.nodeName;
            tagName = tagName && tagName.toLowerCase();

            links.push({
                id: id,
                text: text,
                tagName: tagName
            });
        }
        return links;
    }

    function buildNavHtml(links) {
        var navHtml = "<nav class='auto-nav'>";

        links = links || [];
        for (var i = 0; i < links.length; i++) {
            var link = links[i];
            var aHtml = "<a" +
                " href='#" + link.id + "'" +
                " class='auto-nav-" + link.tagName + "'" +
                ">" +
                link.text +
                "</a>";
            navHtml += aHtml;
        }

        navHtml += "</div>";

        return navHtml;
    }
})(window, document);