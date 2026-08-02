// ===============================
// Typing Effect
// ===============================

const roles = [
    "Aspiring Data Scientist",
    "BCA Graduate",
    "Python Developer",
    "Web Developer"
];

let roleIndex = 0;
let charIndex = 0;
let typing = true;

const roleElement = document.querySelector(".typing");

function typeEffect(){

    if(!roleElement) return;

    if(typing){

        roleElement.textContent = roles[roleIndex].substring(0,charIndex++);

        if(charIndex > roles[roleIndex].length){

            typing = false;

            setTimeout(typeEffect,1200);

            return;
        }

    }else{

        roleElement.textContent = roles[roleIndex].substring(0,charIndex--);

        if(charIndex < 0){

            typing = true;

            roleIndex++;

            if(roleIndex >= roles.length){

                roleIndex = 0;
            }
        }
    }

    setTimeout(typeEffect, typing ? 120 : 60);
}

typeEffect();


// ===============================
// Sticky Navbar
// ===============================

window.addEventListener("scroll",()=>{

    const header=document.querySelector("header");

    header.classList.toggle("sticky",window.scrollY>80);

});


// ===============================
// Active Menu
// ===============================

const sections=document.querySelectorAll("section");
const navLinks=document.querySelectorAll("nav ul li a");

window.addEventListener("scroll",()=>{

    let current="";

    sections.forEach(section=>{

        const sectionTop=section.offsetTop-150;

        if(scrollY>=sectionTop){

            current=section.getAttribute("id");
        }

    });

    navLinks.forEach(link=>{

        link.classList.remove("active");

        if(link.getAttribute("href")=="#"+current){

            link.classList.add("active");
        }

    });

});


// ===============================
// Scroll Animation
// ===============================

const observer=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

});

document.querySelectorAll("section").forEach(sec=>{

sec.classList.add("hidden");

observer.observe(sec);

});


// ===============================
// Back To Top
// ===============================

const topBtn=document.createElement("button");

topBtn.innerHTML="↑";

topBtn.id="topBtn";

document.body.appendChild(topBtn);

window.addEventListener("scroll",()=>{

if(window.scrollY>400){

topBtn.style.display="block";

}else{

topBtn.style.display="none";

}

});

topBtn.onclick=()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

};
// Boot Screen

setTimeout(()=>{

document.getElementById("boot-screen").style.display="none";

document.getElementById("main-site").style.display="block";

},4200);
const input = document.getElementById("command");
const output = document.getElementById("output");

if (input && output) {
    input.addEventListener("keydown", function(e) {

        if (e.key === "Enter") {

            let cmd = input.value.trim().toLowerCase();

            output.innerHTML += `<p>> ${cmd}</p>`;

            switch(cmd){

                case "help":
                    output.innerHTML += `
                    <p>Available Commands</p>
                    <p>about</p>
                    <p>skills</p>
                    <p>projects</p>
                    <p>contact</p>
                    <p>resume</p>
                    <p>clear</p>`;
                    break;

                case "about":
                    output.innerHTML += `<p>BCA Graduate | Aspiring Data Scientist | Python Developer</p>`;
                    break;

                case "skills":
                    output.innerHTML += `<p>Python | SQL | Power BI | Pandas | NumPy | HTML | CSS | JavaScript</p>`;
                    break;

                case "projects":
                    output.innerHTML += `<p>Online Quiz Platform</p>`;
                    break;

                case "contact":
                    output.innerHTML += `<p>Email: jp0607523@gmail.com</p>`;
                    break;

                case "resume":
                    output.innerHTML += `<p>Download Resume from Hero Section.</p>`;
                    break;

                case "clear":
                    output.innerHTML = "";
                    break;

                default:
                    output.innerHTML += `<p>Command not found. Type help</p>`;
            }

            output.scrollTop = output.scrollHeight;
            input.value = "";
        }

    });
}
//================ CHATBOT ================//

function toggleChat(){

const chat=document.getElementById("chatWindow");

chat.style.display=
chat.style.display==="block"
?"none":"block";

}

function sendMessage(){

const input=document.getElementById("userMessage");

const body=document.getElementById("chatBody");

let text=input.value.trim();

if(text==="") return;

body.innerHTML+=`
<div class="user-msg">
${text}
</div>`;

let reply="I don't understand.";

text=text.toLowerCase();

if(text.includes("about"))
reply="Jayesh is a BCA Graduate and an Aspiring Data Scientist.";

if(text.includes("skill"))
reply="Python, SQL, Power BI, HTML, CSS, JavaScript, Pandas, NumPy.";

if(text.includes("project"))
reply="Online Quiz Platform developed using HTML CSS JavaScript.";

if(text.includes("contact"))
reply="Email: jp0607523@gmail.com";

if(text.includes("resume"))
reply="Resume download button is available in Dashboard Section.";

body.innerHTML+=`
<div class="bot-msg">
${reply}
</div>`;

body.scrollTop=body.scrollHeight;

input.value="";

}
/*==============================
      CUSTOM CURSOR
==============================*/

const cursor=document.querySelector(".cursor");
const dot=document.querySelector(".cursor-dot");

window.addEventListener("mousemove",(e)=>{

cursor.style.left=e.clientX+"px";
cursor.style.top=e.clientY+"px";

dot.style.left=e.clientX+"px";
dot.style.top=e.clientY+"px";

});

document.querySelectorAll("a,button").forEach(item=>{

item.addEventListener("mouseenter",()=>{

cursor.classList.add("hover");

});

item.addEventListener("mouseleave",()=>{

cursor.classList.remove("hover");

});

});
