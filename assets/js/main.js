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

                    let _scrollTimeout = null;

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

                                window.onwheel = function watchWheel(e) {
                                    let d = ((typeof e.wheelDelta != "undefined") ? (-e.deltaY) : e.detail);
                                    // d = 100 * ((d>0)?1:-1);

                                    console.log("Scroll delta", d);

                                    clearTimeout(_scrollTimeout);
                                    _scrollTimeout = setTimeout(function() {
                                        console.log("Haven't scrolled in 250ms");
                                    }, 250);
                                };
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
