document.addEventListener('DOMContentLoaded', function() {

    (function($, window) {
        "use strict";

        const siteMainScript = {
            navToggle: {
                test() {
                    return true;
                },
                run() {
                    const body = $("body"),
                          nav = $(".nav"),
                          navLinks = $(".nav__list--item"),
                          navToggle = $(".nav__toggle"),
                          colorStack = $(".pantone__stack"),
                          stackPosition = colorStack.offset().top,
                          pantoneColors = $(".pantone__color");

                    function setupNav() {
                        navToggle.on("click", function toggleNav() {
                            navToggle.toggleClass("nav-open");
                            nav.toggleClass("nav-open");
                        });
                    }

                    function handleColorStack() {
                        $(window).on("scroll", function watchScroll() {
                            let scrollPos = window.scrollY;

                            if (scrollPos >= stackPosition && !colorStack.hasClass("fixed-position")) {
                                body.addClass("overflow-hidden");
                                colorStack.addClass("fixed-position");
                            }
                            // if (scrollPos < stackPosition && colorStack.hasClass("fixed-position")) {
                            //     colorStack.removeClass("fixed-position");
                            // }
                        });
                    }

                    setupNav();
                    handleColorStack();
                }
            }
        };

        for (let key in siteMainScript) {
            if (siteMainScript[key].test()) {
                siteMainScript[key].run();
            }
        }

    }(jQuery, window));

});
