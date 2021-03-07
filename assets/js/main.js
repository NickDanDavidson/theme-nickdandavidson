document.addEventListener('DOMContentLoaded', function() {

    (function($, window) {
        "use strict";

        const siteMainScript = {
            navToggle: {
                test() {
                    return true;
                },
                run() {
                    const $window = $("window"),
                          body = $("body"),
                          nav = $(".nav"),
                          navLinks = $(".nav__list--item"),
                          navToggle = $(".nav__toggle"),
                          colorStack = $(".pantone__stack"),
                          stackPosition = colorStack.offset(),
                          pantoneColors = $(".pantone__color");

                    function setupNav() {
                        navToggle.on("click", function toggleNav() {
                            navToggle.toggleClass("nav-open");
                            nav.toggleClass("nav-open");
                        });
                    }

                    function handleColorStack() {
                        $window.on("scroll", function watchScroll() {
                            let scrollPos = window.scrollY;
                            console.log(scrollPos);

                            if (scrollPos >= stackPosition && !colorStack.hasClass("fixed-position")) {
                                colorStack.addClass("fixed-position");
                                console.log("ADDED");
                            }
                            if (scrollPos < stackPosition && colorStack.hasClass("fixed-position")) {
                                colorStack.removeClass("fixed-position");
                                console.log("REMOVED");
                            }
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
