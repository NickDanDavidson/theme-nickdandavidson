document.addEventListener('DOMContentLoaded', function() {

    (function($, window) {
        "use strict";

        const siteMainScript = {
            navToggle: {
                test() {
                    return true;
                },
                run() {
                    // global vars
                    const nav = $(".nav-main__list"),
                          navLinks = $(".nav-main__list--item"),
                          body = $("body"),
                          contentWrapper = $(".content-wrapper");

                    // setupNav();
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
