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

function updateSlidersUI() {
  document.getElementById('sliderA').value = appState.a;
  document.getElementById('sliderB').value = appState.b;
  document.getElementById('sliderC').value = appState.c;
  document.getElementById('sliderD').value = appState.d;
}

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

// ========== EVENT BINDING (mobile‑friendly) ==========
function initSliderA() {
  const slider = document.getElementById('sliderA');
  // Use 'input' for real-time, 'change' as fallback
  slider.addEventListener('input', (e) => {
    setAValue(parseInt(e.target.value, 10));
  });
  // Also listen to 'change' for touch devices that may not fire input
  slider.addEventListener('change', (e) => {
    setAValue(parseInt(e.target.value, 10));
  });
}

function initDropdown() {
  const dropdown = document.getElementById('colorSelect');
  // 'change' works on desktop, but on mobile sometimes only 'input' fires reliably
  dropdown.addEventListener('change', (e) => {
    setColor(e.target.value);
  });
  // Add 'input' as a fallback for mobile Safari/Chrome
  dropdown.addEventListener('input', (e) => {
    setColor(e.target.value);
  });
  // Also listen to 'blur' in case the value changes but event not triggered
  dropdown.addEventListener('blur', (e) => {
    setColor(e.target.value);
  });
  // Ensure initial value is set
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