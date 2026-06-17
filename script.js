// ========== IMAGE MAPPING ==========
function getImageForCombination(color, aValue) {
  const prefix = color === "M1" ? "r" : "g";
  return `assets/${prefix}${aValue}.png`;
}

// ========== STATE ==========
let appState = { a: 1, b: 1, c: 1, d: 1, color: "M1" };

function computeBCDfromA(aVal) {
  if (aVal === 1) return { b: 1, c: 1, d: 1 };
  if (aVal === 2) return { b: 2, c: 1, d: 2 };
  return { b: 3, c: 2, d: 3 };
}
function updateBCD() {
  const { b, c, d } = computeBCDfromA(appState.a);
  appState.b = b; appState.c = c; appState.d = d;
}

// ========== UI UPDATES ==========
function updateSlidersUI() {
  document.getElementById('sliderA').value = appState.a;
  document.getElementById('sliderB').value = appState.b;
  document.getElementById('sliderC').value = appState.c;
  document.getElementById('sliderD').value = appState.d;
  updateNumberHighlights();
}

function updateNumberHighlights() {
  const bars = ['A', 'B', 'C', 'D'];
  const values = {
    A: appState.a,
    B: appState.b,
    C: appState.c,
    D: appState.d
  };
  bars.forEach(id => {
    const bar = document.querySelector(`.slider-bar[data-id="${id}"]`);
    if (!bar) return;
    const nums = bar.querySelectorAll('.slider-numbers .num');
    const val = values[id];
    nums.forEach(num => {
      const numVal = parseInt(num.getAttribute('data-value'), 10);
      num.classList.toggle('active', numVal === val);
    });
  });
}

// ========== ACTIONS ==========
function setAValue(newVal) {
  if (newVal === appState.a) return;
  appState.a = newVal;
  updateBCD();
  updateSlidersUI();
  updateImage();
}

function setColor(value) {
  if (value === appState.color) return;
  appState.color = value;
  document.getElementById('colorSelect').value = value;
  updateImage();
}

function updateImage() {
  const img = document.getElementById('dynamicImage');
  if (!img) return;
  img.src = getImageForCombination(appState.color, appState.a);
  img.alt = `${appState.color} - A=${appState.a}`;
}

// ========== EVENT BINDING ==========
function initSliderA() {
  const slider = document.getElementById('sliderA');
  slider.addEventListener('input', (e) => {
    setAValue(parseInt(e.target.value, 10));
  });
  slider.addEventListener('change', (e) => {
    setAValue(parseInt(e.target.value, 10));
  });
}

function initDropdown() {
  const dropdown = document.getElementById('colorSelect');
  dropdown.addEventListener('change', (e) => {
    setColor(e.target.value);
  });
  dropdown.addEventListener('input', (e) => {
    setColor(e.target.value);
  });
  dropdown.addEventListener('blur', (e) => {
    setColor(e.target.value);
  });
  dropdown.value = appState.color;
}

// ========== INIT ==========
function init() {
  appState.a = 1;
  updateBCD();
  updateSlidersUI();
  initSliderA();
  initDropdown();
  updateImage();
}

init();