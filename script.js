// ===== COUNTER ANIMATION =====
const counters = document.querySelectorAll('.counter');

const startCounter = (counter) => {
    counter.innerText = '0';

    const target = +counter.getAttribute('data-target');
    const increment = target / 120;

    const updateCounter = () => {
        const current = +counter.innerText;

        if (current < target) {
            counter.innerText = Math.ceil(current + increment);
            setTimeout(updateCounter, 20);
        } else {
            counter.innerText = target + "+";
        }
    };

    updateCounter();
};

document.addEventListener("DOMContentLoaded", () => {

    const counters = document.querySelectorAll(".counter");

    const startCount = (counter) => {

        const target = +counter.getAttribute("data-target");
        let count = 0;

        const speed = target / 100;

        const update = () => {
            count += speed;

            if (count < target) {
                counter.innerText = formatValue(Math.ceil(count), counter);
                requestAnimationFrame(update);
            } else {
                counter.innerText = formatValue(target, counter);
            }
        };

        update();
    };

    // FORMAT OUTPUT (IMPORTANT)
    const formatValue = (value, counter) => {
        const text = counter.getAttribute("data-target");

        if (counter.innerText.includes("%") || counter.dataset.target === "43" || counter.dataset.target === "92") {
            return value + "%";
        }

        if (counter.innerText.includes("M") || counter.dataset.target === "524") {
            return value + "M+";
        }

        return value.toLocaleString() + "+";
    };

    // INTERSECTION OBSERVER (RUN ONLY WHEN VISIBLE)
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCount(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        observer.observe(counter);
    });

});


// ===== BUTTON CLICK FEEDBACK (PREMIUM TOUCH) =====
const buttons = document.querySelectorAll("button");

buttons.forEach(button => {
    button.addEventListener("click", () => {
        button.style.transform = "scale(0.95)";
        setTimeout(() => {
            button.style.transform = "scale(1)";
        }, 150);
    });
});


// ===== NAVBAR SCROLL EFFECT =====
window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar");

    if (window.scrollY > 50) {
        navbar.style.background = "#ffffff";
        navbar.style.boxShadow = "0 5px 20px rgba(0,0,0,0.1)";
    } else {
        navbar.style.background = "white";
        navbar.style.boxShadow = "0 4px 20px rgba(0,0,0,0.05)";
    }
});

// Fade-in on scroll
const fadeElements = document.querySelectorAll('.fade-in');

const fadeObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
});

fadeElements.forEach(el => fadeObserver.observe(el));

document.addEventListener("DOMContentLoaded", () => {

    const timeline = document.querySelector(".timeline");
    const steps = document.querySelectorAll(".fade-step");

    if (!timeline) return; // safety check

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {

                timeline.classList.add("active");

                steps.forEach((step, index) => {
                    setTimeout(() => {
                        step.classList.add("show");
                    }, index * 300);
                });

            }
        });
    });

    observer.observe(timeline);

    // hover effect
    steps.forEach(step => {
        step.addEventListener("mouseenter", () => {
            steps.forEach(s => s.classList.remove("active"));
            step.classList.add("active");
        });
    });

});

const slides = document.querySelectorAll(".metric-slide");

window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;

    slides.forEach((slide, index) => {
        slide.classList.remove("active");

        if (scrollY >= index * 300 && scrollY < (index + 1) * 300) {
            slide.classList.add("active");
        }
    });
});

// 3D tilt effect
const cards = document.querySelectorAll(".flip-card");

cards.forEach(card => {
    card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = -(y - centerY) / 10;
        const rotateY = (x - centerX) / 10;

        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = "rotateX(0) rotateY(0)";
    });
});
document.addEventListener("DOMContentLoaded", () => {

    const cards = document.querySelectorAll(".card");

    if (!cards.length) return;

    cards.forEach((card, index) => {
        card.addEventListener("click", () => {

            cards.forEach(c => c.classList.remove("active"));
            card.classList.add("active");

            cards.forEach((c, i) => {
                if (i < index) {
                    c.style.transform = "translateX(-260px) scale(0.85)";
                    c.style.opacity = "0.4";
                } else if (i > index) {
                    c.style.transform = "translateX(260px) scale(0.85)";
                    c.style.opacity = "0.4";
                } else {
                    c.style.transform = "translateX(0) scale(1.1)";
                    c.style.opacity = "1";
                }
            });

        });
    });

});
const members = [
    {
        name: "Rajesh Tedla",
        role: "Founder & CEO",
        desc: "Rajesh leads VRT’s vision, helping entrepreneurs scale through structured systems and execution frameworks.",
        img: "images/person1.jpeg"
    },
    {
        name: "Rohit Nagpal",
        role: "Business Strategist",
        desc: "Rohit specializes in aligning leadership teams and driving execution with clarity and accountability.",
        img: "images/person2.png"
    },
    {
        name: "Gary J. Kopczyk",
        role: "Operations Expert",
        desc: "Gary focuses on operational excellence, helping businesses improve systems, margins, and scalability.",
        img: "images/person3.jpeg"
    }
];

let index = 0;

const nameEl = document.getElementById("name");
const roleEl = document.getElementById("role");
const descEl = document.getElementById("desc");
const imgEl = document.querySelector(".member img");

function updateMember() {
    nameEl.innerText = members[index].name;
    roleEl.innerText = members[index].role;
    descEl.innerText = members[index].desc;
    imgEl.src = members[index].img;
}

document.getElementById("next").onclick = () => {
    index = (index + 1) % members.length;
    updateMember();
};

document.getElementById("prev").onclick = () => {
    index = (index - 1 + members.length) % members.length;
    updateMember();
};
document.addEventListener("DOMContentLoaded", () => {

    const slides = document.querySelectorAll(".cta-slideshow img");

    if (slides.length === 0) return; // safety check

    let index = 0;

    setInterval(() => {
        slides[index].classList.remove("active");

        index = (index + 1) % slides.length;

        slides[index].classList.add("active");
    }, 3000);

});