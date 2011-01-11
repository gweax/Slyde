(function () {
var slides = document.querySelectorAll("body > section");

for (var i = 0, len = slides.length; i < len; i++) {
    var slide = slides[i];
    slide.id = "slide" + (i + 1);
    
    var nav = document.createElement("nav");
    
    if (i > 0) {
        var prev = document.createElement("a");
        prev.appendChild(document.createTextNode("<"));
        prev.href = "#slide" + i;
        nav.appendChild(prev);
    }
    
    var current = document.createElement("span");
    current.appendChild(document.createTextNode(" " + (i + 1) + " "));
    nav.appendChild(current);
    
    if (i < len - 1) {
        var next = document.createElement("a");
        next.appendChild(document.createTextNode(">"));
        next.href = "#slide" + (i + 2);
        nav.appendChild(next);
    }
    
    slide.appendChild(nav);
}

function getIncrementElements (visible) {
    visible = visible ? "visible" : "";

    return [].filter.call(document.querySelectorAll(location.hash + " .increment"), function (element) {
        return element.style.visibility === visible;
    });
}


function forward() {
    var hidden, nextSlide;
    
    hidden = getIncrementElements(false);
    
    if (hidden.length) {
        hidden[0].style.visibility = "visible";
    }
    else {
        nextSlide = +location.hash.substring(6) + 1;
        if (nextSlide <= len) {
            location.hash = "#slide" + (nextSlide);
        }
    }
}

function fastForward() {
    var hidden = getIncrementElements(false);
    
    if (hidden.length) {
        hidden.forEach(function (inc) {
            inc.style.visibility = "visible";
        });
    }
    else if (+location.hash.substring(6) < len) {
        location.hash = "#slide" + len;
    }
}

function rewind() {
    var shown, previousSlide;
    
    shown = getIncrementElements(true);
    
    if (shown.length) {
        shown.pop().style.visibility = "";
    }
    else {
        previousSlide = +location.hash.substring(6) - 1;
        if (previousSlide > 0) {
            location.hash = "#slide" + previousSlide;
        }
    }
}

function fastRewind() {
    var shown = getIncrementElements(true);
    
    if (shown.length) {
        shown.forEach(function (inc) {
            inc.style.visibility = "";
        });
    }
    else if (location.hash !== "#slide1") {
        location.hash = "#slide1";
    }
}


document.addEventListener("keyup", function (event) { 
    var key = event.keyCode;
        
    // Home
    if (key === 36) {
        fastRewind();
    }
    // End
    else if (key === 35) {
        fastForward();
    }
    // left arrow or page up
    else if (key === 37 || key === 33) {
        rewind();
    }
    // right arrow or page down
    else if (key === 39 || key === 34) {
        forward();
    }
}, false);

if (location.hash.indexOf("#slide") !== 0) {
    location.hash = "#slide1";
}
})();