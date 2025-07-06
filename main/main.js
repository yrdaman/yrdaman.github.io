// GSAP Animations
gsap.registerPlugin(ScrollTrigger, Draggable);

gsap.from(".header-text", {
    opacity: 0,
    x: 100,
    duration: 1.2,
    stagger: 0.3,
    ease: "power2.out",
});

// Animate #about section paragraphs
gsap.from("#about p", {
    opacity: 0.1,
    y: 60,
    filter: "blur(4px)",
    rotate: 3,
    duration: 1.2,
    ease: "power2.out",
    stagger: 0.2,
    scrollTrigger: {
        trigger: "#about",
        start: "top 80%",
        toggleActions: "play reverse play reverse"
    }
});

// Animate contact form on scroll
gsap.from("#contactForm input, #contactForm textarea, #contactForm button", {
    opacity: 0,
    y: 20,
    duration: 0.8,
    stagger: 0.2,
    scrollTrigger: { trigger: "#contact", start: "top 80%" },
});

// Animate footer on scroll
gsap.from("footer", {
    opacity: 0,
    y: 50,
    duration: 1,
    scrollTrigger: { trigger: "footer", start: "top 90%" },
});

// Draggable Profile Card
Draggable.create("#draggableContainer", {
    type: "x,y",
    bounds: window,
    inertia: true,
    edgeResistance: 0.65,
    onPress() {
        this.target.style.cursor = "grabbing";
    },
    onRelease() {
        this.target.style.cursor = "grab";
    }
});

// Typing Effect
const CONFIG = {
    TYPING_DELAY: 150,
    DELETING_DELAY: 100,
    PAUSE_BEFORE_DELETE: 2000,
    PAUSE_BEFORE_TYPE: 100,
    PAUSE_BETWEEN_CYCLES: 1000,
    CONSTANT_TEXT: "I'm "
};

const roles = [
    { text: "Tech Enthusiast", color: "#11181f" },
    { text: "Python Programmer", color: "#11181f" },
    { text: "ML Enthusiast", color: "#11181f" },
    { text: "Data Science Student", color: "#11181f" },
    { text: "The Wandering Developer", color: "#11181f" }
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let isCyclePaused = false;

function typeEffect(element) {
    if (!element) return;

    if (isCyclePaused) {
        setTimeout(() => {
            isCyclePaused = false;
            typeEffect(element);
        }, CONFIG.PAUSE_BETWEEN_CYCLES);
        return;
    }

    const currentRole = roles[roleIndex];
    let visibleText;

    if (isDeleting) {
        charIndex--;
        visibleText = CONFIG.CONSTANT_TEXT + currentRole.text.substring(0, charIndex);
    } else {
        visibleText = CONFIG.CONSTANT_TEXT + currentRole.text.substring(0, ++charIndex);
    }

    element.innerText = visibleText;
    element.style.color = currentRole.color;

    let delay = isDeleting ? CONFIG.DELETING_DELAY : CONFIG.TYPING_DELAY;

    if (!isDeleting && charIndex === currentRole.text.length) {
        isDeleting = true;
        delay = CONFIG.PAUSE_BEFORE_DELETE;
    } else if (isDeleting && charIndex < 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        charIndex = 0;
        delay = CONFIG.PAUSE_BEFORE_TYPE;
        isCyclePaused = true;
    }

    setTimeout(() => typeEffect(element), delay);
}

// Show random quote in #quoteBox
const quotes = [
    // Tech & creativity
    "\"Code is like humor. When you have to explain it, it’s bad.\" – Cory House",
    "\"The best way to predict the future is to invent it.\" – Alan Kay",
    "\"Simplicity is the soul of efficiency.\" – Austin Freeman",
    "\"First, solve the problem. Then, write the code.\" – John Johnson",
    "\"Creativity is intelligence having fun.\" – Albert Einstein",
    "\"Strive for progress, not perfection.\"",
    "\"Your limitation—it’s only your imagination.\"",
    "\"Great things never come from comfort zones.\"",
    "\"Don’t watch the clock; do what it does. Keep going.\" – Sam Levenson",
    "\"Every great developer you know got there by solving problems they were unqualified to solve until they actually did it.\" – Patrick McKenzie",
  
    // Anime - Vagabond
    "\"The way of the sword is the way of solitude.\" – Musashi (Vagabond)",
    "\"Perfection is an illusion. Keep moving forward.\" – Musashi (Vagabond)",
    "\"I choose to live my life as I see fit, without regrets.\" – Musashi (Vagabond)",
  
    // Anime - Naruto
    "\"I’m not gonna run away. I never go back on my word. That’s my nindo, my ninja way.\" – Naruto Uzumaki",
    "\"When people are protecting something truly special to them, they truly can become as strong as they can be.\" – Naruto Uzumaki",
    "\"Hard work beats talent when talent doesn’t work hard.\" – Rock Lee",
    "\"In this world, wherever there is light, there are also shadows.\" – Madara Uchiha",
    "\"It’s not the face that makes someone a monster; it’s the choices they make with their lives.\" – Naruto Uzumaki",
    "\"No matter how far you fall, you can always get back up.\" – Naruto Uzumaki"
];


function showRandomQuote() {
    const quoteBox = document.getElementById('quoteBox');
    if (quoteBox) {
        const random = Math.floor(Math.random() * quotes.length);
        quoteBox.textContent = quotes[random];
    }
}

// Skills Grid
const skills = [
    {
        category: "Web Development",
        description: "Proficient in HTML, CSS, and JavaScript, with experience building responsive, modern web applications. Skilled with libraries such as Leaflet.js, GSAP, and Tailwind CSS."
    },
    {
        category: "Python Programming",
        description: "Intermediate proficiency in Python for scripting, data processing, and automation."
    },
    {
        category: "Java Programming",
        description: "Intermediate proficiency in Java with a solid grasp of OOP and console apps."
    },
    {
        category: "Data Science & Machine Learning",
        description: "Hands-on experience in data analysis and basic machine learning."
    },
    {
        category: "MySQL",
        description: "Skilled in designing and managing MySQL databases and writing complex queries."
    },
    {
        category: "Data Structures & Algorithms",
        description: "Strong understanding of data structures and algorithm problem-solving."
    },
    {
        category: "Tools & Platforms",
        description: "Experienced with Git, VS Code, Figma, Postman, Docker, and Linux CLI tools."
    },
    {
        category: "Continuous Learning",
        description: "Dedicated to expanding skills in web development, machine learning, and app dev."
    }
];

const skillsGrid = document.getElementById("skills-grid");
skillsGrid.innerHTML = "";

skills.forEach(skill => {
    const skillDiv = document.createElement("div");
    skillDiv.className = `
        skill-item
        bg-white
        text-black
        border border-black
        p-4
        rounded
        text-center
        transition-all
        duration-300
        transform
        hover:scale-105
        cursor-pointer
    `;

    skillDiv.innerHTML = `
        <p class="text-xl font-bold mb-2 gradient-text-animate">${skill.category}</p>
        <p class="text-base">${skill.description}</p>
    `;

    skillsGrid.appendChild(skillDiv);
});

// Contact Form Handler
document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;
    if (name && email && message) {
        alert(`Message sent from ${name} (${email}): ${message}`);
        this.reset();
    } else {
        alert("Please fill all fields.");
    }
});

// Smooth scroll for nav links
document.querySelectorAll('#mainNav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar show/hide on scroll
let lastScroll = 0;
const navbar = document.getElementById('mainNav');
const scrollThreshold = 100;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > scrollThreshold) {
        if (currentScroll > lastScroll) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    lastScroll = currentScroll;
});

// Preloader
window.addEventListener("load", function () {
  setTimeout(() => {
    document.getElementById("preloader").style.opacity = "0";
    document.getElementById("preloader").style.pointerEvents = "none";
  }, 2000);
});

Draggable.create("#preloader img", {
  type: "x,y",
  inertia: true,
  bounds: window
});


// Admin Shortcuts
document.addEventListener("keydown", function (e) {
    if (e.key === 'S' && e.shiftKey) {
        document.getElementById("adminLogin").classList.remove("hidden");
        document.getElementById("adminPass").focus();
    } else if (e.key === 'Escape') {
        document.getElementById("adminLogin").classList.add("hidden");
    } else if (e.key.toLowerCase() === 'h') {
        document.getElementById("hero").scrollIntoView({ behavior: "smooth" });
    } else if (e.key.toLowerCase() === 'a') {
        document.getElementById("about").scrollIntoView({ behavior: "smooth" });
    } else if (e.key.toLowerCase() === 'p') {
        document.getElementById("projects").scrollIntoView({ behavior: "smooth" });
    } else if (e.key.toLowerCase() === 'e') {
        document.getElementById("education").scrollIntoView({ behavior: "smooth" });
    } else if (e.key.toLowerCase() === 's') {
        document.getElementById("skills").scrollIntoView({ behavior: "smooth" });
    } else if (e.key.toLowerCase() === 'c') {
        document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
    }
});

// Admin Login
function unlockAdmin() {
    const pass = document.getElementById("adminPass").value;
    if (pass === "vagabond") {
        localStorage.setItem("isAdmin", "true");
        alert("Welcome, master. Redirecting to admin dashboard...");
        document.getElementById("adminLogin").classList.add("hidden");
        window.location.href = "../admin/admin.html";
    } else {
        alert("Wrong passphrase.");
    }
}

// Quotes
document.addEventListener("DOMContentLoaded", () => {
    showRandomQuote();
    setInterval(showRandomQuote, 4000);

    const typingElement = document.getElementById("typing");
    if (typingElement) typeEffect(typingElement);

    if (localStorage.getItem("isAdmin") === "true") {
        const btn = document.getElementById("addProjectBtn");
        if (btn) btn.classList.remove("hidden");
    }
});


// Block right-click & dev tools
document.addEventListener("contextmenu", e => e.preventDefault());
document.addEventListener("keydown", e => {
  if (e.key === "F12") e.preventDefault();
  if (e.ctrlKey && e.shiftKey && ["I", "J", "C"].includes(e.key)) e.preventDefault();
  if (e.ctrlKey && e.key === "u") e.preventDefault();
});
