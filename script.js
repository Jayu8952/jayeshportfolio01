/* ============================================
   Jayesh Patil Portfolio - script.js
   ============================================ */

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

/* ---------- Preloader (short, not annoying) ---------- */
window.addEventListener("load", () => {
    setTimeout(() => $("#preloader").classList.add("done"), 900);
});

/* ---------- Footer year ---------- */
$("#year").textContent = new Date().getFullYear();

/* ---------- Typing effect ---------- */
const roles = ["Aspiring Data Scientist", "BCA Graduate", "Python Developer", "Web Developer"];
let roleIndex = 0, charIndex = 0, deleting = false;
const typingEl = $(".typing");

function typeEffect() {
    const word = roles[roleIndex];
    typingEl.textContent = word.substring(0, charIndex);

    if (!deleting && charIndex < word.length) {
        charIndex++;
        setTimeout(typeEffect, 90);
    } else if (!deleting) {
        deleting = true;
        setTimeout(typeEffect, 1400);
    } else if (charIndex > 0) {
        charIndex--;
        setTimeout(typeEffect, 45);
    } else {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(typeEffect, 300);
    }
}
typeEffect();

/* ---------- Header, progress bar, active link, back-to-top ---------- */
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
    progress.style.width = (y / max) * 100 + "%";
    header.classList.toggle("sticky", y > 40);
    topBtn.style.display = y > 500 ? "block" : "none";

    let current = "home";
    sections.forEach(sec => {
        if (y >= sec.offsetTop - 160) current = sec.id;
    });
    navLinks.forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + current));
}
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

/* ---------- Mobile menu ---------- */
const navList = $("#navLinks");
$("#menuBtn").addEventListener("click", () => navList.classList.toggle("open"));
navLinks.forEach(a => a.addEventListener("click", () => navList.classList.remove("open")));

/* ---------- Scroll reveal + counters + skill bars ---------- */
function animateCount(el) {
    const target = +el.dataset.count;
    const suffix = el.dataset.suffix || "+";
    const duration = 1400;
    const start = performance.now();
    (function tick(now) {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased) + (p === 1 ? suffix : "");
        if (p < 1) requestAnimationFrame(tick);
    })(start);
}

const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        el.classList.add("show");
        $$("[data-count]", el).forEach(animateCount);
        $$(".bar span", el).forEach(b => (b.style.width = b.dataset.w + "%"));
        io.unobserve(el);
    });
}, { threshold: 0.15 });

$$(".reveal").forEach((el, i) => {
    el.style.transitionDelay = (i % 4) * 90 + "ms";
    io.observe(el);
});

/* ---------- Card spotlight (follows mouse) ---------- */
$$(".glass").forEach(card => {
    card.addEventListener("mousemove", e => {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", e.clientX - r.left + "px");
        card.style.setProperty("--my", e.clientY - r.top + "px");
    });
});

/* ---------- Magnetic buttons ---------- */
$$(".magnetic").forEach(btn => {
    btn.addEventListener("mousemove", e => {
        const r = btn.getBoundingClientRect();
        const x = e.clientX - (r.left + r.width / 2);
        const y = e.clientY - (r.top + r.height / 2);
        btn.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
    });
    btn.addEventListener("mouseleave", () => (btn.style.transform = ""));
});

/* ---------- Custom cursor (desktop only, smooth follow) ---------- */
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
        rx += (mx - rx) * 0.16;
        ry += (my - ry) * 0.16;
        ring.style.transform = `translate(${rx}px, ${ry}px)`;
        requestAnimationFrame(follow);
    })();

    document.addEventListener("mouseover", e => {
        const t = e.target;
        ring.classList.toggle("hover", !!t.closest("a, button, .chips span, li"));
        ring.classList.toggle("text", !!t.closest("input"));
    });
}

/* ---------- Command palette (Ctrl/Cmd + K) ---------- */
const palette = $("#palette");
const pInput = $("#paletteInput");
const pList = $("#paletteList");
const items = [
    { label: "Home", target: "#home", icon: "fa-house" },
    { label: "About", target: "#about", icon: "fa-user" },
    { label: "Skills", target: "#skills", icon: "fa-code" },
    { label: "Projects", target: "#projects", icon: "fa-folder-open" },
    { label: "Certificates", target: "#certificates", icon: "fa-award" },
    { label: "Terminal", target: "#terminal", icon: "fa-terminal" },
    { label: "Contact", target: "#contact", icon: "fa-envelope" },
    { label: "Download Resume", target: "assets/resume.pdf", icon: "fa-download", download: true }
];
let filtered = items, sel = 0;

function renderPalette() {
    pList.innerHTML = filtered.map((it, i) =>
        `<li class="${i === sel ? "sel" : ""}" data-i="${i}"><i class="fas ${it.icon}"></i>${it.label}</li>`
    ).join("") || "<li>No results</li>";
}
function openPalette() {
    palette.classList.add("open");
    pInput.value = ""; filtered = items; sel = 0;
    renderPalette(); pInput.focus();
}
function closePalette() { palette.classList.remove("open"); }
function runItem(it) {
    if (!it) return;
    closePalette();
    if (it.download) {
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
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        palette.classList.contains("open") ? closePalette() : openPalette();
    }
    if (!palette.classList.contains("open")) return;
    if (e.key === "Escape") closePalette();
    if (e.key === "ArrowDown") { e.preventDefault(); sel = (sel + 1) % filtered.length; renderPalette(); }
    if (e.key === "ArrowUp") { e.preventDefault(); sel = (sel - 1 + filtered.length) % filtered.length; renderPalette(); }
    if (e.key === "Enter") runItem(filtered[sel]);
});

/* ---------- Terminal ---------- */
const cmdInput = $("#command");
const output = $("#output");
const escapeHTML = s => s.replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

const commands = {
    help: "Available: about, skills, projects, contact, resume, clear",
    about: "BCA Graduate | Aspiring Data Scientist | Python Developer",
    skills: "Python | SQL | Power BI | Excel | Pandas | NumPy | Scikit-learn | Java | HTML | CSS | JavaScript",
    projects: "Online Quiz Platform (HTML, CSS, JavaScript)",
    contact: "Email: jp0607523@gmail.com",
    resume: "Use the Resume button in the hero section, or press Ctrl+K."
};

cmdInput.addEventListener("keydown", e => {
    if (e.key !== "Enter") return;
    const cmd = cmdInput.value.trim().toLowerCase();
    if (!cmd) return;
    output.innerHTML += `<p>&gt; ${escapeHTML(cmd)}</p>`;
    if (cmd === "clear") output.innerHTML = "";
    else output.innerHTML += `<p>${commands[cmd] || "Command not found. Type <span class='cmd'>help</span>"}</p>`;
    output.scrollTop = output.scrollHeight;
    cmdInput.value = "";
});

/* ---------- Chat assistant ---------- */
const chatWin = $("#chatWindow");
const chatBody = $("#chatBody");
const msgInput = $("#userMessage");

$("#chatToggle").addEventListener("click", () => chatWin.classList.toggle("open"));
$("#closeChat").addEventListener("click", () => chatWin.classList.remove("open"));
$("#sendBtn").addEventListener("click", sendMessage);
msgInput.addEventListener("keydown", e => { if (e.key === "Enter") sendMessage(); });

const replies = [
    [["hi", "hello", "hey"], "Hi there! Ask me about Jayesh's skills, projects or contact."],
    [["about", "who"], "Jayesh is a BCA graduate and an aspiring Data Scientist."],
    [["skill", "tech", "stack"], "Python, SQL, Power BI, Excel, Pandas, NumPy, Scikit-learn, Java, HTML, CSS, JavaScript."],
    [["project", "work"], "Online Quiz Platform, a timer-based quiz app built with HTML, CSS and JavaScript."],
    [["contact", "email", "hire", "reach"], "You can email Jayesh at jp0607523@gmail.com"],
    [["resume", "cv"], "Use the Resume button in the hero section to download it."],
    [["intern", "certificate"], "Internships: CodSoft, Oasis Infobyte and AICTE."]
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
    setTimeout(() => addMsg(match ? match[1] : "I can help with: about, skills, projects, internships, contact, resume.", "bot-msg"), 450);
}
