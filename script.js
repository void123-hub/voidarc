/* =====================================================
   VOIDARC — FINAL INTERACTION SYSTEM
   Desktop + Mobile / Touch Optimized
===================================================== */


/* =====================================================
   DOM READY
===================================================== */

document.addEventListener("DOMContentLoaded", () => {


    /* =================================================
       DEVICE / INTERACTION DETECTION
    ================================================= */

    const supportsHover =
        window.matchMedia(
            "(hover: hover) and (pointer: fine)"
        ).matches;


    const supportsTouch =
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0;


    const prefersReducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    /* =================================================
       MOBILE NAVIGATION
    ================================================= */

    const menuButton =
        document.querySelector(".menu-button");

    const navLinks =
        document.querySelector(".nav-links");


    const closeMobileMenu = () => {

        if (!navLinks) {
            return;
        }


        navLinks.classList.remove("active");


        if (menuButton) {

            menuButton.textContent = "☰";

            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );

            menuButton.setAttribute(
                "aria-label",
                "Open navigation"
            );

        }

    };


    if (menuButton && navLinks) {

        menuButton.addEventListener(
            "click",
            () => {

                const isOpen =
                    navLinks.classList.toggle(
                        "active"
                    );


                menuButton.textContent =
                    isOpen ? "✕" : "☰";


                menuButton.setAttribute(
                    "aria-expanded",
                    String(isOpen)
                );


                menuButton.setAttribute(
                    "aria-label",
                    isOpen
                        ? "Close navigation"
                        : "Open navigation"
                );


                /* Mobile menu opening pulse */

                if (
                    isOpen &&
                    !prefersReducedMotion
                ) {

                    menuButton.classList.add(
                        "mobile-menu-pulse"
                    );


                    setTimeout(() => {

                        menuButton.classList.remove(
                            "mobile-menu-pulse"
                        );

                    }, 450);

                }

            }
        );


        navLinks
            .querySelectorAll("a")
            .forEach(link => {

                link.addEventListener(
                    "click",
                    () => {

                        closeMobileMenu();

                    }
                );

            });

    }


    /* =================================================
       CLOSE MOBILE MENU WHEN CLICKING OUTSIDE
    ================================================= */

    document.addEventListener(
        "click",
        event => {

            if (
                !navLinks ||
                !menuButton
            ) {
                return;
            }


            if (
                navLinks.classList.contains(
                    "active"
                ) &&
                !navLinks.contains(event.target) &&
                !menuButton.contains(event.target)
            ) {

                closeMobileMenu();

            }

        }
    );


    /* =================================================
       SCROLL REVEAL
    ================================================= */

    const revealElements =
        document.querySelectorAll(
            ".section, " +
            ".track-record, " +
            ".proof, " +
            ".contact, " +
            ".card, " +
            ".result-card, " +
            ".process-step, " +
            ".experience-note"
        );


    if (
        "IntersectionObserver" in window &&
        !prefersReducedMotion
    ) {

        const revealObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            !entry.isIntersecting
                        ) {
                            return;
                        }


                        entry.target.classList.add(
                            "reveal-visible"
                        );


                        revealObserver.unobserve(
                            entry.target
                        );

                    });

                },
                {
                    threshold:
                        supportsTouch
                            ? 0.05
                            : 0.08
                }
            );


        revealElements.forEach(
            element => {

                element.classList.add(
                    "reveal-hidden"
                );


                revealObserver.observe(
                    element
                );

            }
        );

    } else {

        revealElements.forEach(
            element => {

                element.classList.add(
                    "reveal-visible"
                );

            }
        );

    }


    /* =================================================
       ACTIVE NAVIGATION
    ================================================= */

    const sections =
        document.querySelectorAll(
            "section[id]"
        );


    const navigationLinks =
        document.querySelectorAll(
            ".nav-links a"
        );


    if (
        sections.length &&
        navigationLinks.length &&
        "IntersectionObserver" in window
    ) {

        const sectionObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            !entry.isIntersecting
                        ) {
                            return;
                        }


                        navigationLinks.forEach(
                            link => {

                                link.classList.remove(
                                    "active-link"
                                );


                                const href =
                                    link.getAttribute(
                                        "href"
                                    );


                                if (
                                    href ===
                                    `#${entry.target.id}`
                                ) {

                                    link.classList.add(
                                        "active-link"
                                    );

                                }

                            }
                        );

                    });

                },
                {
                    threshold: 0.35,

                    rootMargin:
                        "-10% 0px -55% 0px"
                }
            );


        sections.forEach(
            section => {

                sectionObserver.observe(
                    section
                );

            }
        );

    }


    /* =================================================
       PROJECT / RESULT CARD TILT
       DESKTOP ONLY
    ================================================= */

    const tiltCards =
        document.querySelectorAll(
            ".project, .result-card"
        );


    if (
        supportsHover &&
        !prefersReducedMotion
    ) {

        tiltCards.forEach(card => {

            card.addEventListener(
                "mousemove",
                event => {

                    const rect =
                        card.getBoundingClientRect();


                    const x =
                        event.clientX -
                        rect.left;


                    const y =
                        event.clientY -
                        rect.top;


                    const centerX =
                        rect.width / 2;


                    const centerY =
                        rect.height / 2;


                    const rotateX =
                        (y - centerY) / 55;


                    const rotateY =
                        (centerX - x) / 55;


                    card.style.transform =
                        `perspective(1000px)
                         rotateX(${rotateX}deg)
                         rotateY(${rotateY}deg)
                         translateY(-7px)`;

                }
            );


            card.addEventListener(
                "mouseleave",
                () => {

                    card.style.transform = "";

                }
            );

        });

    }


    /* =================================================
       CURSOR GLOW
       DESKTOP ONLY
    ================================================= */

    const cursorGlow =
        document.querySelector(
            ".cursor-glow"
        );


    if (
        cursorGlow &&
        supportsHover &&
        !prefersReducedMotion
    ) {

        let cursorVisible = false;


        document.addEventListener(
            "mousemove",
            event => {

                cursorGlow.style.left =
                    `${event.clientX}px`;


                cursorGlow.style.top =
                    `${event.clientY}px`;


                if (!cursorVisible) {

                    cursorGlow.style.opacity =
                        "1";


                    cursorVisible = true;

                }

            }
        );


        document.addEventListener(
            "mouseleave",
            () => {

                cursorGlow.style.opacity =
                    "0";


                cursorVisible = false;

            }
        );

    }


    /* =================================================
       SCROLL PROGRESS
    ================================================= */

    const progressBar =
        document.querySelector(
            ".scroll-progress"
        );


    const updateProgress =
        () => {

            if (!progressBar) {
                return;
            }


            const scrollTop =
                window.scrollY;


            const documentHeight =
                document.documentElement
                    .scrollHeight -
                window.innerHeight;


            const progress =
                documentHeight > 0
                    ? (
                        scrollTop /
                        documentHeight
                    ) * 100
                    : 0;


            progressBar.style.width =
                `${progress}%`;

        };


    window.addEventListener(
        "scroll",
        updateProgress,
        {
            passive: true
        }
    );


    updateProgress();


    /* =================================================
       SMOOTH ANCHOR SCROLLING
    ================================================= */

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach(link => {

            link.addEventListener(
                "click",
                event => {

                    const targetId =
                        link.getAttribute(
                            "href"
                        );


                    if (
                        !targetId ||
                        targetId === "#"
                    ) {
                        return;
                    }


                    const target =
                        document.querySelector(
                            targetId
                        );


                    if (!target) {
                        return;
                    }


                    event.preventDefault();


                    target.scrollIntoView({

                        behavior:
                            prefersReducedMotion
                                ? "auto"
                                : "smooth",

                        block: "start"

                    });

                }
            );

        });


    /* =================================================
       DESKTOP CARD POINTER LIGHT
    ================================================= */

    if (
        supportsHover &&
        !prefersReducedMotion
    ) {

        const interactiveCards =
            document.querySelectorAll(
                ".card, " +
                ".result-card, " +
                ".about-card, " +
                ".social-card"
            );


        interactiveCards.forEach(card => {

            card.addEventListener(
                "mousemove",
                event => {

                    const rect =
                        card.getBoundingClientRect();


                    const x =
                        event.clientX -
                        rect.left;


                    const y =
                        event.clientY -
                        rect.top;


                    card.style.setProperty(
                        "--mouse-x",
                        `${x}px`
                    );


                    card.style.setProperty(
                        "--mouse-y",
                        `${y}px`
                    );

                }
            );

        });

    }


    /* =================================================
       MOBILE NEON TAP SYSTEM
    ================================================= */

    const createTapGlow =
        (x, y, target) => {

            if (
                prefersReducedMotion ||
                !target
            ) {
                return;
            }


            const rect =
                target.getBoundingClientRect();


            const glow =
                document.createElement(
                    "span"
                );


            glow.className =
                "tap-neon";


            glow.style.left =
                `${x - rect.left}px`;


            glow.style.top =
                `${y - rect.top}px`;


            target.appendChild(glow);


            requestAnimationFrame(() => {

                glow.classList.add(
                    "tap-neon-active"
                );

            });


            setTimeout(() => {

                glow.remove();

            }, 700);

        };


    /* =================================================
       MOBILE CARD TOUCH FEEDBACK
    ================================================= */

    if (supportsTouch) {

        const touchTargets =
            document.querySelectorAll(
                ".card, " +
                ".result-card, " +
                ".about-card, " +
                ".social-card, " +
                ".button, " +
                ".menu-button"
            );


        touchTargets.forEach(target => {

            target.addEventListener(
                "pointerdown",
                event => {

                    if (
                        event.pointerType !==
                        "touch"
                    ) {
                        return;
                    }


                    /* Neon effect */

                    createTapGlow(
                        event.clientX,
                        event.clientY,
                        target
                    );


                    /* Tactile active state */

                    target.classList.add(
                        "touch-active"
                    );


                    setTimeout(() => {

                        target.classList.remove(
                            "touch-active"
                        );

                    }, 220);

                },
                {
                    passive: true
                }
            );

        });

    }


    /* =================================================
       MOBILE SCREEN TAP LIGHT
       Subtle ambient response
    ================================================= */

    if (
        supportsTouch &&
        !prefersReducedMotion
    ) {

        let lastTapTime = 0;


        document.addEventListener(
            "pointerdown",
            event => {

                if (
                    event.pointerType !==
                    "touch"
                ) {
                    return;
                }


                const now =
                    Date.now();


                if (
                    now - lastTapTime <
                    80
                ) {
                    return;
                }


                lastTapTime = now;


                const target =
                    event.target.closest(
                        ".card, " +
                        ".result-card, " +
                        ".about-card, " +
                        ".social-card, " +
                        ".button, " +
                        ".menu-button"
                    );


                if (target) {
                    return;
                }


                const pageGlow =
                    document.createElement(
                        "span"
                    );


                pageGlow.className =
                    "tap-screen-glow";


                pageGlow.style.left =
                    `${event.clientX}px`;


                pageGlow.style.top =
                    `${event.clientY}px`;


                document.body.appendChild(
                    pageGlow
                );


                requestAnimationFrame(() => {

                    pageGlow.classList.add(
                        "tap-screen-glow-active"
                    );

                });


                setTimeout(() => {

                    pageGlow.remove();

                }, 650);

            },
            {
                passive: true
            }
        );

    }


    /* =================================================
       TOUCH PRESS FOR BUTTONS
    ================================================= */

    const buttons =
        document.querySelectorAll(
            ".button, .social-card, .menu-button"
        );


    buttons.forEach(button => {

        button.addEventListener(
            "pointerdown",
            () => {

                button.classList.add(
                    "pressing"
                );

            },
            {
                passive: true
            }
        );


        const releasePress = () => {

            button.classList.remove(
                "pressing"
            );

        };


        button.addEventListener(
            "pointerup",
            releasePress
        );


        button.addEventListener(
            "pointercancel",
            releasePress
        );


        button.addEventListener(
            "pointerleave",
            releasePress
        );

    });


    /* =================================================
       SOCIAL LINK FEEDBACK
    ================================================= */

    const socialCards =
        document.querySelectorAll(
            ".social-card"
        );


    socialCards.forEach(card => {

        card.addEventListener(
            "click",
            () => {

                if (
                    prefersReducedMotion
                ) {
                    return;
                }


                card.classList.add(
                    "social-launch"
                );


                setTimeout(() => {

                    card.classList.remove(
                        "social-launch"
                    );

                }, 400);

            }
        );

    });


    /* =================================================
       KEYBOARD ESCAPE
    ================================================= */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape"
            ) {

                closeMobileMenu();

            }

        }
    );


    /* =================================================
       RESIZE SAFETY
    ================================================= */

    window.addEventListener(
        "resize",
        () => {

            /*
             * If the screen becomes desktop-sized
             * while the mobile menu is open,
             * reset the menu state.
             */

            if (
                window.innerWidth > 850 &&
                navLinks
            ) {

                closeMobileMenu();

            }

        },
        {
            passive: true
        }
    );


    /* =================================================
       PAGE LOADED
    ================================================= */

    requestAnimationFrame(() => {

        document.body.classList.add(
            "page-loaded"
        );

    });


    /* =================================================
       SYSTEM READY
    ================================================= */

    console.log(
        "VoidArc interaction system loaded."
    );

});
