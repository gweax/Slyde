/*
    This is the javascript needed by Slyde itself.
    
    Do not include your own javascript. Use user.js for that instead.
 */

(function() {
    var slides = document.querySelectorAll("body > section"),
        numberOfSlides = slides.length;

    for (var i = 0; i < numberOfSlides; i++) {
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

        if (i < numberOfSlides - 1) {
            var next = document.createElement("a");
            next.appendChild(document.createTextNode(">"));
            next.href = "#slide" + (i + 2);
            nav.appendChild(next);
        }

        slide.appendChild(nav);
    }

    function getHiddenIncrementElements(onCurrentSlideOnly) {
        var root = onCurrentSlideOnly ? document.querySelector(location.hash) : document.body;

        return Array.apply(null, root.querySelectorAll(".increment:not(.show)"));
    }

    function getShownIncrementElements(onCurrentSlideOnly) {
        var root = onCurrentSlideOnly ? document.querySelector(location.hash) : document.body;

        return Array.apply(null, root.querySelectorAll(".increment.show"));
    }

    function addClass(element, className) {
        if (element.classList) {
            element.classList.add(className);
        } else {
            element.className = element.className + " " + className;
        }
    }

    function removeClass(element, className) {
        if (element.classList) {
            element.classList.remove(className);
        } else {
            element.className = element.className.replace(className, "").trim();
        }
    }

    function forward() {
        var hidden, nextSlide;

        hidden = getHiddenIncrementElements(true);

        if (hidden.length) {
            hidden[0].classList.add("show");
        } else {
            nextSlide = +location.hash.substring(6) + 1;

            if (nextSlide <= numberOfSlides) {
                location.hash = "#slide" + (nextSlide);
            }
        }
    }

    function fastForward() {
        var hidden = getHiddenIncrementElements();

        if (hidden.length) {
            hidden.forEach(function(inc) {
                inc.classList.add("show");
            });
        }

        if (+location.hash.substring(6) < numberOfSlides) {
            location.hash = "#slide" + numberOfSlides;
        }
    }

    function rewind() {
        var shown, previousSlide;

        shown = getShownIncrementElements(true);

        if (shown.length) {
            shown.pop().classList.remove("show");
        } else {
            previousSlide = +location.hash.substring(6) - 1;

            if (previousSlide > 0) {
                location.hash = "#slide" + previousSlide;
            }
        }
    }

    function fastRewind() {
        var shown = getShownIncrementElements();

        if (shown.length) {
            shown.forEach(function(inc) {
                inc.classList.remove("show");
            });
        }

        if (location.hash !== "#slide1") {
            location.hash = "#slide1";
        }
    }


    document.addEventListener("keyup", function(event) {
        if (/input|textarea/i.test(event.target.nodeName) && !(event.ctrlKey && event.shiftKey)) {
            return;
        }

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
