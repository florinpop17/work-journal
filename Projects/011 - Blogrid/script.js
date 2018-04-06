const body = document.querySelector('body');

function debounce(func, wait = 5, immediate = true) {
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