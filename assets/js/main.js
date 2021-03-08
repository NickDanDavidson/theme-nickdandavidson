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
                          pantoneColors = $(".pantone__color"),
                          lastColor = pantoneColors.last().find("h1").text();

                    let _scrollTimeout = null,
                        userIsWheeling = false;

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
                                    let delta = ((typeof e.wheelDelta != "undefined") ? (-e.deltaY) : e.detail);

                                    if (!userIsWheeling) {
                                        userIsWheeling = true;
                                        let currentColor = $(".current-color").find("h1").text();

                                        if (delta < 0 && currentColor !== lastColor) {
                                            $(".current-color").removeClass("current-color").addClass("color-before");
                                            $(".color-before").last().next().addClass("current-color");
                                        }
                                        if (delta > 0) {
                                            $(".current-color").prev().removeClass("color-before").addClass("current-color");
                                            $(".current-color").first().next().removeClass("current-color");
                                        }
                                    }

                                    // console.log("Scroll delta", delta);

                                    clearTimeout(_scrollTimeout);
                                    _scrollTimeout = setTimeout(function() {
                                        userIsWheeling = false;
                                    }, 66);
                                };

                                $(window).on("keydown", function watchArrows(e) {
                                    let currentColor = $(".current-color").find("h1").text();

                                    if (e.which === 40 && currentColor !== lastColor) {
                                        $(".current-color").removeClass("current-color").addClass("color-before");
                                        $(".color-before").last().next().addClass("current-color");
                                    }
                                    if (e.which === 38) {
                                        $(".current-color").prev().removeClass("color-before").addClass("current-color");
                                        $(".current-color").first().next().removeClass("current-color");
                                    }
                                });
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
