var ready = (callback) => {
    if (document.readyState != "loading") callback();
    else document.addEventListener("DOMContentLoaded", callback);
}
ready(() => {
    document.querySelector(".header").style.height = window.innerHeight + "px";

    // For changing navbar color on scroll
    window.onscroll = function () {
        const navbar = document.querySelector('.navbar-fixed-top');
        if (window.scrollY > 100) {
            navbar.classList.add('scrolling');
        } else {
            navbar.classList.remove('scrolling');
        }
    };
})