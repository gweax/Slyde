/*
 * Add your own javascript here.
 */

(function () {

var handleSlideChange = function () {
    var selectedSlide = document.querySelector(location.hash);
    
    // do something with the current slide
};

window.onhashchange = handleSlideChange;

// call directly for the first slide, since there might not have been
// a hash*change* for that.
handleSlideChange();

})();
