const body = document.body;
const ricoBtn = document.getElementById("ricoBtn");
const replay = document.getElementById("replay");
const particles = document.getElementById("particles");
const speech = document.getElementById("speech");
const ticker = document.getElementById("tickerText");
const energy = document.getElementById("energy");
const market = document.getElementById("market");
const cursorRico = document.getElementById("cursorRico");
let activated = false;
const messages = [
  "MARKET STATUS: NORMAL",
  "RICO ACTIVITY: DETECTED",
  "DUCK INDEX: RISING",
  "COMMON SENSE: FALLING",
  "RICO IS COOKING",
  "MARKET STATUS: ???"
];
let messageIndex = 0;
function updateTicker() {
  ticker.textContent = messages[messageIndex];
  messageIndex = (messageIndex + 1) % messages.length;
}
setInterval(updateTicker, 2500);
function flashScreen() {
  body.classList.remove("flash");
  void body.offsetWidth;
  body.classList.add("flash");
}
function shakeScreen() {
  body.classList.remove("shake");
  void body.offsetWidth;
  body.classList.add("shake");
  setTimeout(() => {
    body.classList.remove("shake");
  }, 400);
}
function createMoney() {
  particles.innerHTML = "";
  const centerX = window.innerWidth * 0.72;
  const centerY = window.innerHeight * 0.55;
  for (let i = 0; i < 90; i++) {
    const bill = document.createElement("div");
    bill.className = "money";
    bill.textContent = "$";
    const angle = Math.random() * Math.PI * 2;
    const distance =
      180 + Math.random() * Math.max(window.innerWidth, window.innerHeight) * 0.75;
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;
    const rotation = -360 + Math.random() * 720;
    bill.style.left = `${centerX}px`;
    bill.style.top = `${centerY}px`;
    bill.style.setProperty("--x", `${x}px`);
    bill.style.setProperty("--y", `${y}px`);
    bill.style.setProperty("--r", `${rotation}deg`);
    bill.style.setProperty(
      "--time",
      `${1.1 + Math.random() * 1.5}s`
    );
    bill.style.width =
      `${35 + Math.random() * 35}px`;
    bill.style.height =
      `${18 + Math.random() * 15}px`;
    bill.style.animationDelay =
      `${Math.random() * .35}s`;
    particles.appendChild(bill);
  }
}
function animateStats() {
  let value = 0;
  const interval = setInterval(() => {
    value += Math.floor(Math.random() * 12) + 5;
    if (value >= 100) {
      value = 100;
      clearInterval(interval);
    }
    energy.textContent = `${value}%`;
  }, 70);
  setTimeout(() => {
    market.textContent = ["↑", "↑", "?", "🚀"][Math.floor(Math.random() * 4)];
  }, 900);
}
function activateRico() {
  if (activated) return;
  activated = true;
  flashScreen();
  setTimeout(() => {
    body.classList.add("activated");
  }, 250);
  setTimeout(() => {
    speech.textContent = "you pressed it.";
    speech.classList.add("show");
  }, 650);
  setTimeout(() => {
    speech.textContent = "bad decision.";
  }, 1500);
  setTimeout(() => {
    shakeScreen();
    flashScreen();
    createMoney();
    animateStats();
  }, 2200);
  setTimeout(() => {
    speech.textContent = "RICO'D.";
  }, 2700);
}
function resetRico() {
  activated = false;
  body.classList.remove("activated");
  speech.classList.remove("show");
  speech.textContent = "...";
  particles.innerHTML = "";
  energy.textContent = "0%";
  market.textContent = "?";
  updateTicker();
}
ricoBtn.addEventListener("click", activateRico);
replay.addEventListener("click", () => {
  resetRico();
  setTimeout(() => {
    activateRico();
  }, 450);
});
/* Small duck follows the cursor on desktop */
document.addEventListener("mousemove", (event) => {
  if (window.innerWidth < 800) return;
  cursorRico.style.left = `${event.clientX}px`;
  cursorRico.style.top = `${event.clientY}px`;
});
/* Mobile touch interaction */
document.addEventListener("touchmove", (event) => {
  if (!activated) return;
  const touch = event.touches[0];
  cursorRico.style.left = `${touch.clientX}px`;
  cursorRico.style.top = `${touch.clientY}px`;
}, { passive: true });