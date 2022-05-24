const MAX_WIDTH = 100;
const MAX_HEIGHT = 100;
const ELEMENTS_MAX = 50;
const ELEMENTS = ["toaster", "toast", "toilet", "plunger", "paper"];

const moveElement = (element) => {
  const elementSpeed = parseInt(element.getAttribute("data-speed"));
  const speed = elementSpeed / 10;

  let x = parseFloat(element.style.getPropertyValue("--x")) - speed;
  let y = parseFloat(element.style.getPropertyValue("--y")) + speed;

  const isReachLeft = x < -10;
  const isReachBottom = y > MAX_HEIGHT + 10;

  isReachLeft && (x = MAX_WIDTH + 10);
  isReachBottom && (y = -10);

  element.style.setProperty("--x", `${x}vw`);
  element.style.setProperty("--y", `${y}vh`);
};

const addElement = (type = "toaster") => {
  const element = document.createElement("div");
  element.classList.add(type);
  document.body.appendChild(element);
  const x = Math.floor(Math.random() * MAX_WIDTH);
  const y = Math.floor(Math.random() * MAX_HEIGHT);
  const speed = Math.floor(Math.random() * 3) + 1;
  element.setAttribute("data-speed", speed);
  type === "manzhead" && element.setAttribute("data-speed", 1);
  element.style.setProperty("--x", `${x}vw`);
  element.style.setProperty("--y", `${y}vh`);
  return element;
};

const elements = [];
for (let i = 0; i < ELEMENTS_MAX; i++) {
  const n = Math.floor(Math.random() * 2);
  const mhp = Math.floor(Math.random() * 2);

  const type = mhp === 0 ? "manzhead" : ELEMENTS[n];
  elements.push(addElement(type));
}

const update = () => {
  elements.forEach(element => moveElement(element));
};

const enableKey = (key) => {
  const isKey = key === "Enter";

  if (isKey) {
    elements.forEach(element => {
      const n = 2 + Math.floor(Math.random() * 3);
      element.className = ELEMENTS[n];
    });
  }
};

addEventListener("keydown", (ev) => enableKey(ev.key), { once: true });

setInterval(() => update(), 25);
