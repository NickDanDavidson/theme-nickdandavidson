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
                          lastColor = pantoneColors.last().find("h1").text(),
                          nextButton = $(".pantone__buttons--button.next-color"),
                          backButton = $(".pantone__buttons--button.prev-color"),
                          topButton = $(".pantone__buttons--button.back-to-top");

                    let _scrollTimeout = null,
                        userIsWheeling = false;

                    function swipeOffStack() {
                        colorStack.removeClass("fixed-position");
                        body.removeClass("overflow-hidden");
                        window.removeEventListener("wheel", watchWheel);
                        $(window).off("keydown");
                        $(window).scrollTop(stackPosition - 50);
                    }

                    function swipeNext() {
                        $(".current-color").removeClass("current-color").addClass("color-before");
                        $(".color-before").last().next().addClass("current-color");
                    }

                    function swipePrev() {
                        $(".current-color").prev().removeClass("color-before").addClass("current-color");
                        $(".current-color").first().next().removeClass("current-color");
                    }

                    nextButton.on("click", swipeNext());
                    backButton.on("click", swipePrev());
                    topButton.on("click", function() {
                        let currColorCount = $(".current-color").index();
                        for (let i = currColorCount; i >= 0; i--) {
                            swipePrev();
                        }
                        swipeOffStack();
                    });

                    function watchWheel(e) {
                        let delta = ((typeof e.wheelDelta != "undefined") ? (-e.deltaY) : e.detail);

                        if (!userIsWheeling) {
                            userIsWheeling = true;
                            let currentColor = $(".current-color").find("h1").text();

                            if (delta > 0 && currentColor == firstColor) {
                                swipeOffStack();
                            } else if (delta < 0 && currentColor !== lastColor) {
                                swipeNext();
                            } else if (delta > 0) {
                                swipePrev();
                            }
                        }

                        clearTimeout(_scrollTimeout);
                        _scrollTimeout = setTimeout(function setWheelingStatus() {
                            userIsWheeling = false;
                        }, 66);
                    };

                    function watchArrows(e) {
                        let currentColor = $(".current-color").find("h1").text();

                        if (e.which === 38 && currentColor == firstColor) {
                            swipeOffStack();
                        } else if (e.which === 40 && currentColor !== lastColor) {
                            swipeNext();
                        } else if (e.which === 38) {
                            swipePrev();
                        }
                    }

                    function handleColorStack() {
                        $(window).on("scroll", function watchScroll() {
                            let scrollPos = window.scrollY;

                            if (scrollPos >= stackPosition && !colorStack.hasClass("fixed-position")) {
                                colorStack.addClass("fixed-position");
                                body.addClass("overflow-hidden");
                                $(window).scrollTop(stackPosition);

                                window.addEventListener("wheel", watchWheel);
                                $(window).on("keydown", watchArrows);
                            }
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
