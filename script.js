/* ============ TOKENS (warm ink + amber/coral) ============ */
:root{
    --bg:#0b0a09;
    --surface:#131110;
    --surface-2:#1b1816;
    --border:rgba(255,240,225,.09);
    --border-strong:rgba(255,240,225,.18);
    --hover:rgba(255,240,225,.07);
    --line:rgba(255,240,225,.035);
    --text:#f5efe8;
    --muted:#a39a90;
    --accent:#ff8a4c;
    --accent-2:#ff5d8f;
    --accent-soft:rgba(255,138,76,.12);
    --on-accent:#1a0e06;
    --green:#5eead4;
    --cursor-ring:rgba(255,240,225,.4);
    --radius:18px;
    --font:'Inter',system-ui,-apple-system,sans-serif;
    --serif:'Instrument Serif',Georgia,serif;
}
:root[data-theme="light"]{
    --bg:#faf6f0;
    --surface:#ffffff;
    --surface-2:#f3ede4;
    --border:rgba(26,22,18,.09);
    --border-strong:rgba(26,22,18,.2);
    --hover:rgba(26,22,18,.06);
    --line:rgba(26,22,18,.05);
    --text:#1a1612;
    --muted:#6b625a;
    --accent:#e8530f;
    --accent-2:#d72b6a;
    --accent-soft:rgba(232,83,15,.10);
    --on-accent:#ffffff;
    --green:#0f9d8a;
    --cursor-ring:rgba(26,22,18,.4);
}

*{margin:0;padding:0;box-sizing:border-box}
html{scroll-behavior:smooth;scroll-padding-top:84px}
body{
    font-family:var(--font);background:var(--bg);color:var(--text);
    line-height:1.7;overflow-x:hidden;-webkit-font-smoothing:antialiased;
}
body.intro-active{overflow:hidden}
a{color:inherit;text-decoration:none}
ul,ol{list-style:none}
img{max-width:100%;display:block}
button,input,textarea{font-family:inherit}
h1,h2,h3{font-family:var(--font);line-height:1.1;letter-spacing:-.03em;font-weight:600}
::selection{background:var(--accent);color:var(--on-accent)}
::-webkit-scrollbar{width:8px}
::-webkit-scrollbar-thumb{background:var(--border-strong);border-radius:10px}
:focus-visible{outline:2px solid var(--accent);outline-offset:3px;border-radius:6px}

.container{width:min(1120px,100% - 48px);margin-inline:auto}
.skip{position:absolute;left:-999px;top:10px;background:var(--accent);color:var(--on-accent);padding:10px 16px;border-radius:8px;z-index:2000000}
.skip:focus{left:10px}

/* Serif italic accent words (2026 editorial trend) */
.serif{font-family:var(--serif);font-style:italic;font-weight:400;letter-spacing:-.01em;font-size:1.08em}
.grad{
    background:linear-gradient(90deg,var(--accent),var(--accent-2));
    -webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;
}

/* ============ BACKGROUND ============ */
.bg-aurora{position:fixed;inset:0;z-index:-3;overflow:hidden;pointer-events:none}
.bg-aurora i{position:absolute;border-radius:50%;filter:blur(120px);opacity:.2;animation:drift 34s ease-in-out infinite alternate}
.bg-aurora i:nth-child(1){width:560px;height:560px;background:#ff7a2e;top:-200px;left:-140px}
.bg-aurora i:nth-child(2){width:480px;height:480px;background:#ff3d7f;top:15%;right:-160px;animation-delay:-10s}
.bg-aurora i:nth-child(3){width:420px;height:420px;background:#ffb347;bottom:-200px;left:30%;opacity:.12;animation-delay:-18s}
:root[data-theme="light"] .bg-aurora i{opacity:.14}
@keyframes drift{to{transform:translate(70px,40px) scale(1.12)}}
.bg-grid{
    position:fixed;inset:0;z-index:-2;pointer-events:none;
    background-image:linear-gradient(var(--line) 1px,transparent 1px),linear-gradient(90deg,var(--line) 1px,transparent 1px);
    background-size:64px 64px;
    mask-image:radial-gradient(ellipse at 50% 15%,#000 15%,transparent 72%);
    -webkit-mask-image:radial-gradient(ellipse at 50% 15%,#000 15%,transparent 72%);
}
.bg-grain{
    position:fixed;inset:0;z-index:-1;pointer-events:none;opacity:.06;
    background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
}
.scroll-progress{position:fixed;top:0;left:0;height:2px;width:0;background:linear-gradient(90deg,var(--accent),var(--accent-2));z-index:100000}

/* ============ APPLE-STYLE INTRO ============ */
#intro{
    position:fixed;inset:0;z-index:1000000;background:var(--bg);
    display:grid;place-items:center;overflow:hidden;
}
#intro.fade{background:transparent;transition:background 1s ease;pointer-events:none}
.intro-hello{
    font-family:'Dancing Script','Kalam',cursive;font-weight:700;
    font-size:clamp(68px,17vw,180px);line-height:1.3;padding:0 .12em;white-space:nowrap;opacity:0;
    background:linear-gradient(90deg,var(--accent),var(--accent-2));
    -webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;
}
.intro-hello.play{animation:helloIn .9s cubic-bezier(.4,0,.2,1) forwards}
.intro-hello.hide{display:none}
@keyframes helloIn{
    0%{opacity:1;clip-path:inset(-25% 100% -25% -5%)}
    60%{opacity:1;clip-path:inset(-25% -5% -25% -5%)}
    85%{opacity:1;clip-path:inset(-25% -5% -25% -5%)}
    100%{opacity:0;clip-path:inset(-25% -5% -25% -5%)}
}
#introPhoto{
    position:fixed;opacity:0;transform:scale(.9);object-fit:cover;border-radius:28px;
    border:1px solid var(--border-strong);box-shadow:0 40px 120px rgba(0,0,0,.55);
    transition:opacity .8s ease,transform .9s cubic-bezier(.2,.8,.2,1);
}
#introPhoto.in{opacity:1;transform:scale(1)}
#skipIntro{
    position:absolute;bottom:30px;right:30px;padding:9px 18px;border-radius:50px;font-size:13px;cursor:pointer;
    color:var(--muted);background:var(--surface);border:1px solid var(--border);transition:.25s;
}
#skipIntro:hover{color:var(--text);border-color:var(--border-strong)}
#intro.fade #skipIntro{opacity:0;pointer-events:none}
body.intro-active .hero-photo img{visibility:hidden}

/* Hero entrance (starts when intro photo begins to shrink) */
.hero-reveal{opacity:0;transform:translateY(26px);transition:opacity .9s ease,transform .9s cubic-bezier(.2,.8,.2,1)}
body:not(.intro-active) .hero-reveal,body.hero-go .hero-reveal{opacity:1;transform:none}
.hero-text>.hero-reveal:nth-child(1){transition-delay:.05s}
.hero-text>.hero-reveal:nth-child(2){transition-delay:.15s}
.hero-text>.hero-reveal:nth-child(3){transition-delay:.25s}
.hero-text>.hero-reveal:nth-child(4){transition-delay:.35s}
.hero-text>.hero-reveal:nth-child(5){transition-delay:.45s}
.hero-text>.hero-reveal:nth-child(6){transition-delay:.55s}

/* ============ NAV ============ */
header{position:fixed;top:0;left:0;right:0;z-index:1000;border-bottom:1px solid transparent;transition:.3s}
header.sticky{
    background:color-mix(in srgb,var(--bg) 78%,transparent);
    backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border-color:var(--border);
}
nav{display:flex;align-items:center;justify-content:space-between;height:70px}
.logo{display:flex;align-items:center;gap:10px;font-weight:600;font-size:16px;letter-spacing:-.01em}
.logo-mark{
    width:34px;height:34px;display:grid;place-items:center;border-radius:10px;font-size:13px;font-weight:700;
    color:var(--on-accent);background:linear-gradient(135deg,var(--accent),var(--accent-2));
}
nav ul{display:flex;gap:2px}
nav ul a{display:block;padding:8px 13px;border-radius:8px;font-size:14px;color:var(--muted);transition:.2s}
nav ul a:hover{color:var(--text)}
nav ul a.active{color:var(--text);background:var(--hover)}
.nav-right{display:flex;gap:8px;align-items:center}
.kbd-btn{
    display:flex;align-items:center;gap:10px;padding:7px 12px;border-radius:10px;font-size:13px;
    color:var(--muted);background:var(--surface);border:1px solid var(--border);cursor:pointer;transition:.2s;
}
.kbd-btn:hover{color:var(--text);border-color:var(--border-strong)}
kbd{font-family:var(--font);font-size:11px;padding:1px 6px;border-radius:5px;background:var(--hover)}
.theme-btn{
    width:38px;height:38px;display:grid;place-items:center;border-radius:10px;cursor:pointer;
    color:var(--muted);background:var(--surface);border:1px solid var(--border);transition:.2s;
}
.theme-btn:hover{color:var(--text);border-color:var(--border-strong)}
.nav-cta{
    padding:9px 18px;border-radius:10px;font-size:14px;font-weight:600;color:var(--on-accent);
    background:linear-gradient(135deg,var(--accent),var(--accent-2));transition:.25s;
}
.nav-cta:hover{transform:translateY(-2px);box-shadow:0 8px 26px color-mix(in srgb,var(--accent) 40%,transparent)}
.menu-btn{display:none;background:none;border:none;color:var(--text);font-size:18px;padding:8px 10px;cursor:pointer}

/* ============ SECTIONS ============ */
section{padding:92px 0}
.section-head{margin-bottom:44px}
.eyebrow{
    display:inline-block;font-size:12px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;
    color:var(--accent);margin-bottom:14px;
}
.section-head h2,.contact h2{font-size:clamp(32px,5vw,54px)}

/* ============ HERO ============ */
.hero{
    min-height:100vh;display:grid;grid-template-columns:1.25fr .75fr;gap:56px;align-items:center;
    padding-top:130px;padding-bottom:70px;
}
.status{
    display:inline-flex;align-items:center;gap:10px;font-size:13px;color:var(--muted);
    padding:7px 15px;border:1px solid var(--border);border-radius:50px;background:var(--surface);margin-bottom:26px;
}
.dot{width:7px;height:7px;border-radius:50%;background:var(--green);animation:ping 2s infinite}
@keyframes ping{0%{box-shadow:0 0 0 0 color-mix(in srgb,var(--green) 55%,transparent)}70%,100%{box-shadow:0 0 0 9px transparent}}
.hero h1{font-size:clamp(44px,7.4vw,92px);font-weight:700;letter-spacing:-.045em;line-height:1}
.hero h1 .serif{font-weight:400;letter-spacing:-.02em}
.role{
    font-size:clamp(18px,2.4vw,24px);font-weight:500;margin:20px 0;min-height:36px;
    letter-spacing:-.01em;color:var(--text);
}
.typing{color:var(--accent)}
.caret{display:inline-block;width:2px;height:1em;background:var(--accent);margin-left:4px;vertical-align:-3px;animation:blink 1s steps(1) infinite}
@keyframes blink{50%{opacity:0}}
.summary{color:var(--muted);font-size:17px;max-width:540px;margin-bottom:32px}

.buttons{display:flex;gap:12px;flex-wrap:wrap}
.btn{
    display:inline-flex;align-items:center;gap:10px;padding:14px 26px;border-radius:12px;
    font-size:15px;font-weight:600;border:1px solid transparent;cursor:pointer;
    transition:transform .25s,box-shadow .25s,background .25s;
}
.btn-primary{color:var(--on-accent);background:linear-gradient(135deg,var(--accent),var(--accent-2))}
.btn-primary:hover{transform:translateY(-2px);box-shadow:0 10px 34px color-mix(in srgb,var(--accent) 42%,transparent)}
.btn-secondary{border-color:var(--border-strong);color:var(--text)}
.btn-secondary:hover{background:var(--hover);transform:translateY(-2px)}

.links{display:flex;gap:10px;margin-top:30px}
.links a{
    width:42px;height:42px;display:grid;place-items:center;border-radius:12px;color:var(--muted);
    border:1px solid var(--border);background:var(--surface);transition:.25s;
}
.links a:hover{color:var(--accent);border-color:var(--accent);transform:translateY(-3px)}

/* Smaller, refined portrait */
.hero-photo{justify-self:center;width:min(290px,100%)}
.photo-card{position:relative}
.photo-glow{
    position:absolute;inset:-10%;z-index:-1;border-radius:40px;filter:blur(55px);opacity:.3;
    background:linear-gradient(135deg,var(--accent),var(--accent-2));
}
.photo-card img{
    width:100%;aspect-ratio:4/5;object-fit:cover;border-radius:22px;
    border:1px solid var(--border-strong);box-shadow:0 30px 70px rgba(0,0,0,.45);
    outline:1px solid var(--border);outline-offset:8px;
}
:root[data-theme="light"] .photo-card img{box-shadow:0 24px 50px rgba(26,22,18,.18)}

/* ============ STATS ============ */
.stats-wrap{padding:0 0 30px}
.stats{
    display:grid;grid-template-columns:repeat(4,1fr);background:var(--surface);
    border:1px solid var(--border);border-radius:var(--radius);
}
.stat{padding:30px 10px;text-align:center;border-right:1px solid var(--border)}
.stat:last-child{border-right:none}
.stat h3{font-family:var(--serif);font-weight:400;font-size:clamp(34px,5vw,54px);color:var(--text);letter-spacing:-.02em}
.stat p{color:var(--muted);font-size:14px}

/* ============ MARQUEE ============ */
.marquee{
    overflow:hidden;padding:26px 0;margin:30px 0 10px;border-block:1px solid var(--border);
    mask-image:linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent);
    -webkit-mask-image:linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent);
}
.marquee-track{display:flex;gap:46px;width:max-content;animation:scroll 46s linear infinite}
.marquee:hover .marquee-track{animation-play-state:paused}
.marquee-track span{display:flex;align-items:center;gap:10px;color:var(--muted);font-size:16px;font-weight:500;white-space:nowrap}
.marquee-track i{color:var(--accent);font-size:20px}
@keyframes scroll{to{transform:translateX(-50%)}}

/* ============ CARDS ============ */
.card{
    position:relative;overflow:hidden;background:var(--surface);
    border:1px solid var(--border);border-radius:var(--radius);padding:28px;
    transition:border-color .3s,transform .3s;
}
.card::before{
    content:"";position:absolute;inset:0;pointer-events:none;opacity:0;transition:opacity .3s;
    background:radial-gradient(400px circle at var(--mx,50%) var(--my,50%),color-mix(in srgb,var(--accent) 13%,transparent),transparent 45%);
}
.card:hover{border-color:var(--border-strong)}
.card:hover::before{opacity:1}
.card h3{font-size:18px;margin-bottom:12px;display:flex;align-items:center;gap:10px;letter-spacing:-.02em}
.card h3 i{color:var(--accent);font-size:16px}
.card p{color:var(--muted);font-size:15px}
.grid-3{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}

.bento{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}
.b-wide{grid-column:span 2}
.b-wide p{font-size:17px;line-height:1.8;color:var(--text);opacity:.82}

.highlights{display:grid;gap:8px;margin:4px 0 8px}
.highlights li{position:relative;padding-left:20px;font-size:14.5px;color:var(--muted)}
.highlights li::before{content:"";position:absolute;left:0;top:.62em;width:7px;height:7px;border-radius:50%;background:var(--accent)}

/* Services */
.service{padding:32px 28px}
.service:hover{transform:translateY(-5px)}
.icon-box{
    width:54px;height:54px;display:grid;place-items:center;border-radius:15px;font-size:22px;margin-bottom:20px;
    color:var(--accent);background:var(--accent-soft);border:1px solid color-mix(in srgb,var(--accent) 28%,transparent);
}
.service h3{display:block}

/* Skills */
.tags{display:flex;flex-wrap:wrap;gap:8px}
.tags li{
    padding:6px 13px;font-size:13px;border-radius:8px;color:var(--text);opacity:.85;
    background:var(--surface-2);border:1px solid var(--border);transition:.2s;
}
.tags li:hover{opacity:1;border-color:var(--accent);background:var(--accent-soft)}
.tags.small li{font-size:12px;padding:4px 10px}

/* Projects */
.projects-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:20px}
.project{padding:0;display:flex;flex-direction:column}
.project:hover{transform:translateY(-5px)}
.cover{height:160px;display:grid;place-items:center;font-size:52px;color:rgba(255,255,255,.92);position:relative;overflow:hidden}
.cover::after{content:"";position:absolute;inset:0;background:radial-gradient(circle at 25% 15%,rgba(255,255,255,.28),transparent 55%)}
.cover i{position:relative;z-index:1;filter:drop-shadow(0 8px 20px rgba(0,0,0,.35))}
.cover-a{background:linear-gradient(135deg,#ff8a4c,#ff5d8f)}
.cover-b{background:linear-gradient(135deg,#ffb347,#ff7a2e)}
.cover-c{background:linear-gradient(135deg,#ff5d8f,#8a3ffc)}
.project-body{padding:24px 26px 28px;display:flex;flex-direction:column;gap:12px;flex:1}
.project-title{display:flex;justify-content:space-between;align-items:center;gap:10px}
.project h3{margin:0;display:block}
.project-links{display:flex;gap:4px}
.project-links a{width:36px;height:36px;display:grid;place-items:center;border-radius:10px;color:var(--muted);transition:.2s}
.project-links a:hover{color:var(--text);background:var(--hover)}
.project-empty{border-style:dashed}
.project-empty .cover{opacity:.6}

/* Timeline */
.timeline{position:relative;max-width:780px;display:grid;gap:20px;padding-left:34px}
.timeline::before{
    content:"";position:absolute;left:7px;top:8px;bottom:8px;width:2px;
    background:linear-gradient(var(--accent),var(--accent-2),transparent);
}
.timeline li{position:relative}
.tl-dot{
    position:absolute;left:-34px;top:30px;width:16px;height:16px;border-radius:50%;
    background:var(--bg);border:3px solid var(--accent);box-shadow:0 0 0 5px var(--accent-soft);
}
.timeline .card{padding:24px 28px}
.timeline h3{display:block;margin-bottom:6px}
.tl-tag{
    display:inline-block;font-size:11px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;
    padding:3px 10px;border-radius:50px;margin-bottom:10px;color:var(--accent);background:var(--accent-soft);
}
.tl-tag.edu{color:var(--green);background:color-mix(in srgb,var(--green) 12%,transparent)}

/* Contact */
.contact{
    text-align:center;padding:64px 28px;display:flex;flex-direction:column;align-items:center;gap:14px;
    background:linear-gradient(180deg,var(--accent-soft),var(--surface) 65%);
}
.contact>p{color:var(--muted);max-width:500px;margin-bottom:10px}
.contact-form{width:100%;max-width:560px;text-align:left;display:grid;gap:16px}
.contact-form .row{display:grid;grid-template-columns:1fr 1fr;gap:16px}
.contact-form label{display:grid;gap:6px;font-size:13px;font-weight:500;color:var(--muted)}
.contact-form input,.contact-form textarea{
    width:100%;padding:13px 15px;border-radius:12px;font-size:15px;color:var(--text);resize:vertical;
    background:var(--surface-2);border:1px solid var(--border);outline:none;transition:.2s;
}
.contact-form input:focus,.contact-form textarea:focus{border-color:var(--accent);box-shadow:0 0 0 3px var(--accent-soft)}
.contact-form .btn{justify-content:center}
.form-error{min-height:1.2em;font-size:13px;color:#f87171;margin:0!important}
.form-note{font-size:12px;text-align:center;margin:0!important;color:var(--muted)}

footer{border-top:1px solid var(--border);padding:30px 0;margin-top:40px}
.footer-inner{display:flex;justify-content:space-between;align-items:center;gap:16px;color:var(--muted);font-size:14px}
.footer-inner .links{margin:0}
.footer-inner .links a{width:38px;height:38px}

/* ============ PALETTE ============ */
.palette{
    position:fixed;inset:0;z-index:100001;display:none;align-items:flex-start;justify-content:center;
    padding-top:16vh;background:rgba(0,0,0,.55);backdrop-filter:blur(5px);
}
.palette.open{display:flex}
.palette-box{
    width:min(540px,92%);background:var(--surface);border:1px solid var(--border-strong);
    border-radius:16px;overflow:hidden;box-shadow:0 30px 90px rgba(0,0,0,.6);animation:rise .2s ease;
}
@keyframes rise{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
#paletteInput{width:100%;padding:18px 22px;background:none;border:none;outline:none;color:var(--text);font-size:16px;border-bottom:1px solid var(--border)}
#paletteList{max-height:300px;overflow-y:auto;padding:8px}
#paletteList li{padding:11px 14px;border-radius:10px;cursor:pointer;color:var(--muted);display:flex;gap:12px;align-items:center;font-size:15px}
#paletteList li i{width:18px;text-align:center}
#paletteList li.sel,#paletteList li:hover{background:var(--accent-soft);color:var(--text)}
.palette-hint{padding:11px 20px;font-size:12px;color:var(--muted);border-top:1px solid var(--border)}

/* ============ CHAT ============ */
.ai-bot{position:fixed;right:22px;bottom:22px;z-index:9999;display:flex;flex-direction:column;align-items:flex-end;gap:12px}
.chat-btn{
    width:54px;height:54px;border:none;border-radius:50%;cursor:pointer;font-size:20px;color:var(--on-accent);
    background:linear-gradient(135deg,var(--accent),var(--accent-2));transition:.25s;
    box-shadow:0 10px 30px color-mix(in srgb,var(--accent) 35%,transparent);
}
.chat-btn:hover{transform:scale(1.08)}
.chat-window{
    display:none;width:min(340px,88vw);height:430px;flex-direction:column;background:var(--surface);
    border:1px solid var(--border-strong);border-radius:18px;overflow:hidden;box-shadow:0 30px 80px rgba(0,0,0,.5);
}
.chat-window.open{display:flex;animation:rise .2s ease}
.chat-header{display:flex;justify-content:space-between;align-items:center;padding:15px 18px;font-weight:600;font-size:14px;border-bottom:1px solid var(--border)}
.chat-header button{background:none;border:none;color:var(--muted);font-size:22px;cursor:pointer;line-height:1}
.chat-body{flex:1;overflow-y:auto;padding:14px;display:flex;flex-direction:column;gap:8px}
.bot-msg,.user-msg{max-width:86%;padding:10px 14px;border-radius:14px;font-size:14px;line-height:1.5}
.bot-msg{background:var(--surface-2);border-bottom-left-radius:4px}
.user-msg{align-self:flex-end;background:linear-gradient(135deg,var(--accent),var(--accent-2));color:var(--on-accent);border-bottom-right-radius:4px}
.chat-input{display:flex;border-top:1px solid var(--border)}
.chat-input input{flex:1;padding:14px 16px;background:none;border:none;outline:none;color:var(--text);font-size:14px}
.chat-input button{width:52px;border:none;background:none;color:var(--accent);font-size:16px;cursor:pointer}

/* ============ CURSOR (desktop only) ============ */
.cursor,.cursor-dot{display:none}
@media (hover:hover) and (pointer:fine){
    body.cursor-on,body.cursor-on *{cursor:none!important}
    .cursor,.cursor-dot{display:block;position:fixed;top:0;left:0;pointer-events:none;z-index:2000001;border-radius:50%}
    .cursor{
        width:36px;height:36px;margin:-18px 0 0 -18px;border:1px solid var(--cursor-ring);
        transition:width .25s,height .25s,margin .25s,background .25s,border-color .25s;
    }
    .cursor-dot{width:6px;height:6px;margin:-3px 0 0 -3px;background:var(--accent)}
    .cursor.hover{width:58px;height:58px;margin:-29px 0 0 -29px;background:var(--accent-soft);border-color:var(--accent)}
    .cursor.text{width:2px;height:24px;margin:-12px 0 0 -1px;border-radius:2px;background:var(--accent);border:none}
}

/* ============ SCROLL REVEAL ============ */
.reveal{opacity:0;transform:translateY(24px);transition:opacity .8s ease,transform .8s cubic-bezier(.2,.8,.2,1)}
.reveal.show{opacity:1;transform:none}
#topBtn{
    position:fixed;left:22px;bottom:22px;width:44px;height:44px;border-radius:12px;display:none;z-index:9998;
    background:var(--surface);border:1px solid var(--border);color:var(--muted);cursor:pointer;transition:.25s;
}
#topBtn:hover{color:var(--accent);border-color:var(--accent)}

/* ============ RESPONSIVE ============ */
@media(max-width:960px){
    .hero{grid-template-columns:1fr;text-align:center;padding-top:110px;gap:44px}
    .hero-photo{order:-1;width:min(220px,62%)}
    .summary{margin-inline:auto}
    .buttons,.links{justify-content:center}
    .grid-3,.bento{grid-template-columns:1fr 1fr}
    .b-wide{grid-column:span 2}
    .kbd-btn span,.kbd-btn kbd{display:none}
    .menu-btn{display:block}
    nav ul{
        position:absolute;top:72px;left:24px;right:24px;flex-direction:column;padding:10px;display:none;
        background:var(--surface);border:1px solid var(--border-strong);border-radius:16px;
    }
    nav ul.open{display:flex}
}
@media(max-width:620px){
    section{padding:72px 0}
    .grid-3,.bento{grid-template-columns:1fr}
    .b-wide{grid-column:span 1}
    .stats{grid-template-columns:repeat(2,1fr)}
    .stat:nth-child(2){border-right:none}
    .stat:nth-child(-n+2){border-bottom:1px solid var(--border)}
    .contact-form .row{grid-template-columns:1fr}
    .nav-cta{display:none}
    .footer-inner{flex-direction:column}
}
@media(prefers-reduced-motion:reduce){
    *{animation:none!important;transition:none!important}
    .reveal,.hero-reveal{opacity:1;transform:none}
}

/* ============ PRINT ============ */
@media print{
    #intro,.bg-aurora,.bg-grid,.bg-grain,header,.ai-bot,.cursor,.cursor-dot,#topBtn,.scroll-progress{display:none!important}
    body{background:#fff;color:#000;overflow:visible}
    .reveal,.hero-reveal{opacity:1!important;transform:none!important}
    body.intro-active .hero-photo img{visibility:visible!important}
}
