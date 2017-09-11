/*
    This is the javascript needed by Slyde itself.
    
    Do not include your own javascript. Use user.js for that instead.
 */

(function() {
    var slides = Array.apply(null, document.querySelectorAll('body > section'));

    function addId(slide, index) {
        if (!slide.id) {
            slide.id = 'slide' + (index + 1);
        }
    }

    function createLink(href, content) {
        var link = document.createElement('a');
        link.href = href;
        link.appendChild(document.createTextNode(content));

        return link;
    }

    function addNavigation(slide, i, slides) {
        var nav = document.createElement('nav');

        if (i > 0) {
            nav.appendChild(createLink('#' + slides[i - 1].id, '<'));
        }

        var current = document.createElement('span');
        current.appendChild(document.createTextNode(' ' + (i + 1) + ' '));
        nav.appendChild(current);

        if (i < slides.length - 1) {
            nav.appendChild(createLink('#' + slides[i + 1].id, '>'));
        }

        slide.appendChild(nav);        
    }

    function getCurrentSlide() {
        return document.querySelector(location.hash);
    }

    function getNextSlide(slide) {
        var index = slides.indexOf(slide);

        return slides[index + 1];
    }

    function getPreviousSlide(slide) {
        var index = slides.indexOf(slide);

        return slides[index - 1];
    }

    function sortByOrder(a, b) {
        return (a.order - b.order) || (a.originalOrder - b.originalOrder);
    }

    function mapForOrder(element, index) {
        return {
            element: element,
            originalOrder: index,
            order: element.getAttribute('data-increment') || 0
        };
    }

    function getElement(item) {
        return item.element;
    }

    function getHiddenIncrementElements(onCurrentSlideOnly) {
        var root = onCurrentSlideOnly ? getCurrentSlide() : document.body;

        return Array.apply(null, root.querySelectorAll(".increment:not(.show)"))
            .map(mapForOrder)
            .sort(sortByOrder)
            .map(getElement);
    }

    function getShownIncrementElements(onCurrentSlideOnly) {
        var root = onCurrentSlideOnly ? getCurrentSlide() : document.body;

        return Array.apply(null, root.querySelectorAll(".increment.show"))
            .map(mapForOrder)
            .sort(sortByOrder)
            .map(getElement);
    }

    function forward() {
        var hidden, nextSlide, currentSlide;

        hidden = getHiddenIncrementElements(true);

        if (hidden.length) {
            hidden[0].classList.add("show");
        } else {
            currentSlide = getCurrentSlide();
            nextSlide = getNextSlide(currentSlide);

            if (nextSlide) {
                location.hash = nextSlide.id;
            }
        }
    }

    function fastForward() {
        var hidden = getHiddenIncrementElements();

        hidden.forEach(function(inc) {
            inc.classList.add("show");
        });

        location.hash = slides[slides.length - 1].id;
    }

    function rewind() {
        var shown, previousSlide, currentSlide;

        shown = getShownIncrementElements(true);

        if (shown.length) {
            shown[shown.length - 1].classList.remove('show');
        } else {
            currentSlide = getCurrentSlide();
            previousSlide = getPreviousSlide(currentSlide);

            if (previousSlide) {
                location.hash = previousSlide.id;
            }
        }
    }

    function fastRewind() {
        var shown = getShownIncrementElements();

        shown.forEach(function(inc) {
            inc.classList.remove('show');
        });

        location.hash = slides[0].id;
    }

    function getHash(slide) {
        return '#' + slide.id;
    }

    slides.forEach(addId);
    slides.forEach(addNavigation);

    document.addEventListener('keyup', function(event) {
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

    if (slides.map(getHash).indexOf(location.hash) === -1) {
        location.hash = slides[0].id;
    }

})();