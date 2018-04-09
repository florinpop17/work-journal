const body = document.querySelector('body');
const boxes = document.querySelectorAll('.grid-box');

boxes.forEach((box, idx) => {
    setTimeout(function(box) {
        box.classList.add('active');
    }.bind(this, box), 300 * idx);
});

function debounce(func, wait = 1, immediate = true) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};

function showBlogContainer() {
    if (window.scrollY > 100) {
        body.classList.add('active');
    } else {
        body.classList.remove('active');
    }
}

window.addEventListener('scroll', debounce(showBlogContainer));