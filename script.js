/* =====================================================
   VOIDARC — FINAL INTERACTION SYSTEM
===================================================== */


/* =====================================================
   MOBILE NAVIGATION
===================================================== */

const menuButton = document.querySelector(".menu-button");
const navLinks = document.querySelector(".nav-links");

if (menuButton && navLinks) {

    menuButton.addEventListener("click", () => {

        navLinks.classList.toggle("active");

        const menuOpen =
            navLinks.classList.contains("active");

        menuButton.textContent =
            menuOpen ? "✕" : "☰";

        menuButton.setAttribute(
            "aria-label",
            menuOpen
                ? "Close navigation"
                : "Open navigation"
        );

    });


    navLinks.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("active");

            menuButton.textContent = "☰";

            menuButton.setAttribute(
                "aria-label",
                "Open navigation"
            );

        });

    });

}


/* =====================================================
   SCROLL REVEAL
===================================================== */

const revealElements = document.querySelectorAll(
    ".section, .proof, .contact, .card, .project, .process-step"
);

const revealObserver = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add(
                    "reveal-visible"
                );

                revealObserver.unobserve(
                    entry.target
                );

            }

        });

    },
    {
        threshold: 0.12
    }
);


revealElements.forEach(element => {

    element.classList.add("reveal-hidden");

    revealObserver.observe(element);

});


/* =====================================================
   ACTIVE NAVIGATION
===================================================== */

const sections = document.querySelectorAll(
    "section[id]"
);

const navigationLinks =
    document.querySelectorAll(
        ".nav-links a"
    );


const sectionObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) {
                    return;
                }

                navigationLinks.forEach(link => {

                    link.classList.remove(
                        "active-link"
                    );

                    const href =
                        link.getAttribute("href");

                    if (
                        href ===
                        `#${entry.target.id}`
                    ) {

                        link.classList.add(
                            "active-link"
                        );

                    }

                });

            });

        },
        {
            threshold: 0.45
        }
    );


sections.forEach(section => {

    sectionObserver.observe(section);

});


/* =====================================================
   PROJECT CARD TILT
===================================================== */

const projectCards =
    document.querySelectorAll(".project");


projectCards.forEach(card => {

    card.addEventListener(
        "mousemove",
        event => {

            if (window.innerWidth <= 850) {
                return;
            }

            const rect =
                card.getBoundingClientRect();

            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;

            const centerX =
                rect.width / 2;

            const centerY =
                rect.height / 2;

            const rotateX =
                (y - centerY) / 45;

            const rotateY =
                (centerX - x) / 45;

            card.style.transform =
                `perspective(900px)
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


/* =====================================================
   CURSOR GLOW
===================================================== */

const cursorGlow =
    document.createElement("div");

cursorGlow.className =
    "cursor-glow";

document.body.appendChild(
    cursorGlow
);


document.addEventListener(
    "mousemove",
    event => {

        if (window.innerWidth <= 850) {
            return;
        }

        cursorGlow.style.left =
            `${event.clientX}px`;

        cursorGlow.style.top =
            `${event.clientY}px`;

    }
);


/* =====================================================
   SCROLL PROGRESS
===================================================== */

const progressBar =
    document.createElement("div");

progressBar.className =
    "scroll-progress";

document.body.appendChild(
    progressBar
);


window.addEventListener(
    "scroll",
    () => {

        const scrollTop =
            window.scrollY;

        const documentHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;

        const progress =
            documentHeight > 0
                ? (scrollTop / documentHeight) * 100
                : 0;

        progressBar.style.width =
            `${progress}%`;

    },
    {
        passive: true
    }
);


/* =====================================================
   SMOOTH ANCHOR SCROLLING
===================================================== */

document
    .querySelectorAll('a[href^="#"]')
    .forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const targetId =
                    link.getAttribute("href");

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
                    behavior: "smooth",
                    block: "start"
                });

            }
        );

    });


/* =====================================================
   PAGE LOAD
===================================================== */

window.addEventListener(
    "load",
    () => {

        document.body.classList.add(
            "page-loaded"
        );

        console.log(
            "VoidArc system loaded successfully."
        );

    }
);