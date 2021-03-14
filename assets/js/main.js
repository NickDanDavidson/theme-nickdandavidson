document.addEventListener('DOMContentLoaded', function() {

    (function($, window) {
        "use strict";

        const body = $("body"),
              nav = $(".nav"),
              navLinks = $(".nav__list--item"),
              navToggle = $(".nav__toggle");

        const siteMainScript = {
            handleNav: {
                test() {
                    return true;
                },
                run() {
                    function setupNav() {
                        navToggle.on("click", function toggleNav() {
                            navToggle.toggleClass("nav-open");
                            nav.toggleClass("nav-open");
                        });
                    }

                    setupNav();
                }
            },
            pantonePage: {
                test() {
                    return $(".pantone__stack").length;
                },
                run() {
                    const colorStack = $(".pantone__stack"),
                          stackPosition = colorStack.offset().top,
                          pantoneColors = $(".pantone__color"),
                          firstColor = pantoneColors.first().find("h1").text(),
                          lastColor = pantoneColors.last().find("h1").text();

                    let _scrollTimeout = null,
                        userIsWheeling = false;

                    function handleColorStack() {
                        $(window).on("scroll", function watchScroll() {
                            let scrollPos = window.scrollY;

                            if (scrollPos >= stackPosition && !colorStack.hasClass("fixed-position")) {
                                body.addClass("overflow-hidden");
                                colorStack.addClass("fixed-position");

                                function watchWheel(e) {
                                    let delta = ((typeof e.wheelDelta != "undefined") ? (-e.deltaY) : e.detail);

                                    if (!userIsWheeling) {
                                        userIsWheeling = true;
                                        let currentColor = $(".current-color").find("h1").text();

                                        if (delta > 0 && currentColor == firstColor) {
                                            // Swipe back to hero
                                            body.removeClass("overflow-hidden");
                                            $(window).off("scroll");
                                            window.removeEventListener("wheel", watchWheel);
                                            $(window).off("keydown");
                                            colorStack.removeClass("fixed-position");
                                        }
                                        if (delta < 0 && currentColor !== lastColor) {
                                            // Swipe to next color
                                            $(".current-color").removeClass("current-color").addClass("color-before");
                                            $(".color-before").last().next().addClass("current-color");
                                        }
                                        if (delta > 0) {
                                            // Swipe to previous color
                                            $(".current-color").prev().removeClass("color-before").addClass("current-color");
                                            $(".current-color").first().next().removeClass("current-color");
                                        }
                                    }

                                    clearTimeout(_scrollTimeout);
                                    _scrollTimeout = setTimeout(function setWheelingStatus() {
                                        userIsWheeling = false;
                                    }, 66);
                                };

                                window.addEventListener("wheel", watchWheel);

                                $(window).on("keydown", function watchArrows(e) {
                                    let currentColor = $(".current-color").find("h1").text();

                                    if (e.which === 38 && currentColor == firstColor) {
                                        // Swipe back to hero
                                        colorStack.removeClass("fixed-position");
                                        body.removeClass("overflow-hidden");
                                        $(window).off("scroll");
                                        window.removeEventListener("onwheel", watchWheel);
                                        $(window).off("keydown", watchArrows);
                                    }
                                    if (e.which === 40 && currentColor !== lastColor) {
                                        // Swipe to next color
                                        $(".current-color").removeClass("current-color").addClass("color-before");
                                        $(".color-before").last().next().addClass("current-color");
                                    }
                                    if (e.which === 38) {
                                        // Swipe to previous color
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
