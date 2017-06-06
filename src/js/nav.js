"use strict";

var hElements = document.querySelectorAll("h1,h2,h3,h4,h5,h6");

var links = buildLinks(hElements);
var navHtml = buildNavHtml(links);

var containerHtml = buildContainerHtml(navHtml);

document.body.innerHTML += containerHtml;
document.body.style.paddingLeft = "320px";

function buildContainerHtml(html) {
    return "<div class='auto-nav-container'>"
        + html
        + "</div>";
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
        var aHtml = "<a"
                  + " href='#" + link.id + "'"
                  + " class='auto-nav-" + link.tagName + "'"
                  + ">"
                  + link.text
                  + "</a>";
        navHtml += aHtml;
    }

    navHtml += "</div>";

    return navHtml;
}