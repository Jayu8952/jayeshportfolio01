/* Jayesh Patil Portfolio - script.js */

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const sleep = ms => new Promise(r => setTimeout(r, ms));

$("#year").textContent = new Date().getFullYear();

/* =====================================================
   APPLE-STYLE INTRO: hello -> big photo -> shrink to hero
   ===================================================== */
const introEl = $("#intro");
const introHello = $("#introHello");
const introPhoto = $("#introPhoto");
const heroImg = $("#heroImg");
let introSkipped = false;

function endIntro() {
    document.body.classList.remove("intro-active");
    document.body.classList.add("hero-go");
    if (introEl) introEl.remove();
}

async function playIntro() {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { endIntro(); return; }

    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);

    const skip = () => { if (!introSkipped) { introSkipped = true; endIntro(); } };
    $("#skipIntro").addEventListener("click", skip);
    document.addEventListener("keydown", e => {
        if (e.key === "Escape" && document.body.classList.contains("intro-active")) skip();
    });

    // wait for fonts (max 1.2s) so the handwriting is correct from the first word
    await Promise.race([document.fonts ? document.fonts.ready : Promise.resolve(), sleep(1200)]);

    const words = ["hello", "hola", "bonjour", "ciao", "नमस्कार"];
    for (const w of words) {
        if (introSkipped) return;
        introHello.textContent = w;
        introHello.classList.remove("play");
        void introHello.offsetWidth;           // restart animation
        introHello.classList.add("play");
        await sleep(950);
    }
    if (introSkipped) return;
    introHello.classList.add("hide");

    // 1) Big photo appears in the centre
    const vw = window.innerWidth, vh = window.innerHeight;
    const bigH = Math.min(vh * 0.74, vw * 0.88 * 1.25);
    const bigW = bigH * 0.8;
    const bigL = (vw - bigW) / 2, bigT = (vh - bigH) / 2;
    Object.assign(introPhoto.style, {
        left: bigL + "px", top: bigT + "px", width: bigW + "px", height: bigH + "px"
    });
    introPhoto.classList.add("in");
    await sleep(1600);
    if (introSkipped) return;

    // 2) Photo shrinks and flies into its place in the hero
    const t = heroImg.getBoundingClientRect();
    introEl.classList.add("fade");
    setTimeout(() => document.body.classList.add("hero-go"), 450);

    const anim = introPhoto.animate([
        { left: bigL + "px", top: bigT + "px", width: bigW + "px", height: bigH + "px", borderRadius: "28px" },
        { left: t.left + "px", top: t.top + "px", width: t.width + "px", height: t.height + "px", borderRadius: "22px" }
    ], { duration: 1200, easing: "cubic-bezier(.77,0,.18,1)", fill: "forwards" });

    try { await anim.finished; } catch (e) {}
    if (!introSkipped) endIntro();
}
playIntro();

/* ---------- Typing effect ---------- */
const roles = ["Aspiring Data Scientist", "Python Developer", "Data Analyst", "Web Developer"];
let roleIndex = 0, charIndex = 0, deleting = false;
const typingEl = $(".typing");

function typeEffect() {
    const word = roles[roleIndex];
    typingEl.textContent = word.substring(0, charIndex);

    if (!deleting && charIndex < word.length) {
        charIndex++; setTimeout(typeEffect, 85);
    } else if (!deleting) {
        deleting = true; setTimeout(typeEffect, 1500);
    } else if (charIndex > 0) {
        charIndex--; setTimeout(typeEffect, 40);
    } else {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(typeEffect, 300);
    }
}
typeEffect();

/* ---------- Scroll: header, progress, active link, back-to-top ---------- */
const header = $("#header");
const progress = $("#scrollProgress");
const navLinks = $$("#navLinks a");
const sections = $$("main section[id]");

const topBtn = document.createElement("button");
topBtn.id = "topBtn";
topBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
topBtn.setAttribute("aria-label", "Back to top");
topBtn.onclick = () => window.scrollTo({ top: 0, behavior: "smooth" });
document.body.appendChild(topBtn);

function onScroll() {
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = (max > 0 ? (y / max) * 100 : 0) + "%";
    header.classList.toggle("sticky", y > 30);
    topBtn.style.display = y > 600 ? "block" : "none";

    let current = "";
    sections.forEach(sec => { if (y >= sec.offsetTop - 170) current = sec.id; });
    navLinks.forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + current));
}
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

/* ---------- Mobile menu ---------- */
const navList = $("#navLinks");
$("#menuBtn").addEventListener("click", () => navList.classList.toggle("open"));
navLinks.forEach(a => a.addEventListener("click", () => navList.classList.remove("open")));

/* ---------- Reveal on scroll + counters ---------- */
function animateCount(el) {
    const target = +el.dataset.count;
    const suffix = el.dataset.suffix || "+";
    const start = performance.now();
    (function tick(now) {
        const p = Math.min((now - start) / 1400, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased) + (p === 1 ? suffix : "");
        if (p < 1) requestAnimationFrame(tick);
    })(start);
}

const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        el.classList.add("show");
        $$("[data-count]", el).forEach(animateCount);
        io.unobserve(el);
    });
}, { threshold: 0.12 });

$$(".reveal").forEach((el, i) => {
    el.style.transitionDelay = (i % 4) * 80 + "ms";
    io.observe(el);
});

/* ---------- Card spotlight ---------- */
$$(".card").forEach(card => {
    card.addEventListener("mousemove", e => {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", e.clientX - r.left + "px");
        card.style.setProperty("--my", e.clientY - r.top + "px");
    });
});

/* ---------- Custom cursor (desktop only) ---------- */
if (window.matchMedia("(hover:hover) and (pointer:fine)").matches) {
    document.body.classList.add("cursor-on");
    const ring = $(".cursor");
    const dot = $(".cursor-dot");
    let mx = 0, my = 0, rx = 0, ry = 0;

    window.addEventListener("mousemove", e => {
        mx = e.clientX; my = e.clientY;
        dot.style.transform = `translate(${mx}px, ${my}px)`;
    });

    (function follow() {
        rx += (mx - rx) * 0.18;
        ry += (my - ry) * 0.18;
        ring.style.transform = `translate(${rx}px, ${ry}px)`;
        requestAnimationFrame(follow);
    })();

    document.addEventListener("mouseover", e => {
        const t = e.target;
        ring.classList.toggle("hover", !!t.closest("a, button, .tags li, #paletteList li"));
        ring.classList.toggle("text", !!t.closest("input, textarea"));
    });
}

/* ---------- Theme toggle (saved in localStorage) ---------- */
const root = document.documentElement;
const themeBtn = $("#themeBtn");

function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    themeBtn.innerHTML = theme === "light" ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    $('meta[name="theme-color"]').setAttribute("content", theme === "light" ? "#faf6f0" : "#0b0a09");
}
function toggleTheme() {
    const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
    applyTheme(next);
    try { localStorage.setItem("theme", next); } catch (e) {}
}
applyTheme(root.getAttribute("data-theme") || "dark");
themeBtn.addEventListener("click", toggleTheme);

/* ---------- Command palette (Ctrl/Cmd + K) ---------- */
const palette = $("#palette");
const pInput = $("#paletteInput");
const pList = $("#paletteList");
const items = [
    { label: "Home", target: "#home", icon: "fa-house" },
    { label: "About", target: "#about", icon: "fa-user" },
    { label: "Services", target: "#services", icon: "fa-layer-group" },
    { label: "Skills", target: "#skills", icon: "fa-code" },
    { label: "Projects", target: "#projects", icon: "fa-folder-open" },
    { label: "Journey", target: "#journey", icon: "fa-route" },
    { label: "Contact", target: "#contact", icon: "fa-envelope" },
    { label: "Download Resume", target: "assets/resume.pdf", icon: "fa-download", download: true },
    { label: "Toggle dark / light theme", icon: "fa-circle-half-stroke", action: () => toggleTheme() }
];
let filtered = items, sel = 0, lastFocus = null;

function renderPalette() {
    pList.innerHTML = filtered.length
        ? filtered.map((it, i) => `<li class="${i === sel ? "sel" : ""}" data-i="${i}"><i class="fas ${it.icon}"></i>${it.label}</li>`).join("")
        : "<li>No results</li>";
}
function openPalette() {
    lastFocus = document.activeElement;
    palette.classList.add("open");
    palette.setAttribute("aria-hidden", "false");
    pInput.value = ""; filtered = items; sel = 0;
    renderPalette(); pInput.focus();
}
function closePalette() {
    palette.classList.remove("open");
    palette.setAttribute("aria-hidden", "true");
    if (lastFocus) lastFocus.focus();
}
function runItem(it) {
    if (!it) return;
    closePalette();
    if (it.action) {
        it.action();
    } else if (it.download) {
        const a = document.createElement("a");
        a.href = it.target; a.download = ""; a.click();
    } else {
        $(it.target).scrollIntoView({ behavior: "smooth" });
    }
}

$("#openPalette").addEventListener("click", openPalette);
palette.addEventListener("click", e => { if (e.target === palette) closePalette(); });
pList.addEventListener("click", e => {
    const li = e.target.closest("li[data-i]");
    if (li) runItem(filtered[+li.dataset.i]);
});
pInput.addEventListener("input", () => {
    const q = pInput.value.toLowerCase();
    filtered = items.filter(i => i.label.toLowerCase().includes(q));
    sel = 0; renderPalette();
});
document.addEventListener("keydown", e => {
    if (document.body.classList.contains("intro-active")) return;
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        palette.classList.contains("open") ? closePalette() : openPalette();
        return;
    }
    if (!palette.classList.contains("open")) return;
    if (e.key === "Escape") closePalette();
    if (e.key === "ArrowDown" && filtered.length) { e.preventDefault(); sel = (sel + 1) % filtered.length; renderPalette(); }
    if (e.key === "ArrowUp" && filtered.length) { e.preventDefault(); sel = (sel - 1 + filtered.length) % filtered.length; renderPalette(); }
    if (e.key === "Enter") runItem(filtered[sel]);
});

/* ---------- Contact form (opens email app, no backend needed) ---------- */
const form = $("#contactForm");
const formError = $("#formError");

form.addEventListener("submit", e => {
    e.preventDefault();
    const name = $("#cfName").value.trim();
    const email = $("#cfEmail").value.trim();
    const message = $("#cfMessage").value.trim();

    if (!name || !message) { formError.textContent = "Please enter your name and a message."; return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { formError.textContent = "Please enter a valid email address."; return; }

    formError.textContent = "";
    const subject = encodeURIComponent("Portfolio enquiry from " + name);
    const body = encodeURIComponent(message + "\n\n" + name + "\n" + email);
    window.location.href = `mailto:jp0607523@gmail.com?subject=${subject}&body=${body}`;
});

/* ---------- Chat assistant ---------- */
const chatWin = $("#chatWindow");
const chatBody = $("#chatBody");
const msgInput = $("#userMessage");

$("#chatToggle").addEventListener("click", () => {
    chatWin.classList.toggle("open");
    if (chatWin.classList.contains("open")) msgInput.focus();
});
$("#closeChat").addEventListener("click", () => chatWin.classList.remove("open"));
$("#sendBtn").addEventListener("click", sendMessage);
msgInput.addEventListener("keydown", e => { if (e.key === "Enter") sendMessage(); });

const replies = [
    [["hi", "hello", "hey"], "Hello! Ask me about Jayesh's skills, projects, internships or contact details."],
    [["about", "who"], "Jayesh is a BCA graduate building a career in Data Science with Python, SQL and Power BI."],
    [["skill", "tech", "stack"], "Python, SQL, Pandas, NumPy, Scikit-learn, Power BI, Excel, Java, C, C++, HTML, CSS and JavaScript."],
    [["project", "work"], "Online Quiz Platform: a timer-based quiz app with automatic scoring, built with HTML, CSS and JavaScript."],
    [["intern", "certificate", "experience"], "Internships at CodSoft, Oasis Infobyte and AICTE."],
    [["contact", "email", "hire", "reach"], "Email Jayesh at jp0607523@gmail.com or use the contact form."],
    [["resume", "cv"], "Use the Resume button in the top navigation to download it."]
];

function addMsg(text, cls) {
    const div = document.createElement("div");
    div.className = cls;
    div.textContent = text;
    chatBody.appendChild(div);
    chatBody.scrollTop = chatBody.scrollHeight;
}

function sendMessage() {
    const text = msgInput.value.trim();
    if (!text) return;
    addMsg(text, "user-msg");
    msgInput.value = "";
    const q = text.toLowerCase();
    const match = replies.find(([keys]) => keys.some(k => q.includes(k)));
    setTimeout(() => addMsg(match ? match[1] : "I can help with: about, skills, projects, internships, contact, resume.", "bot-msg"), 400);
}
