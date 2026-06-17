// ========== IMAGE MAPPING ==========
// M1 -> r1.jpg, r2.jpg, r3.jpg  (serene)
// M2 -> g1.jpg, g2.jpg, g3.jpg  (vivid)
function getImageForCombination(radioMode, aValue) {
  const prefix = radioMode === "M1" ? "r" : "g";
  return `assets/${prefix}${aValue}.png`;
}

// ========== APP STATE ==========
let appState = {
  a: 1,
  b: 1,
  c: 1,
  d: 1,
  color: "M1"    // "M1" or "M2"
};

// ========== DERIVED B, C, D FROM A ==========
function computeBCDfromA(aVal) {
  if (aVal === 1) return { b: 1, c: 1, d: 1 };
  if (aVal === 2) return { b: 2, c: 1, d: 2 };
  return { b: 3, c: 2, d: 3 }; // aVal === 3
}

function updateBCD() {
  const { b, c, d } = computeBCDfromA(appState.a);
  appState.b = b;
  appState.c = c;
  appState.d = d;
}

// ========== UPDATE SLIDERS UI ==========
function updateSlidersUI() {
  document.getElementById('sliderA').value = appState.a;
  document.getElementById('sliderB').value = appState.b;
  document.getElementById('sliderC').value = appState.c;
  document.getElementById('sliderD').value = appState.d;
}

// ========== SET A VALUE (ONLY INTERACTIVE SLIDER) ==========
function setAValue(newVal) {
  if (newVal === appState.a) return;
  appState.a = newVal;
  updateBCD();
  updateSlidersUI();
  updateDynamicImage();
}

// ========== SET COLOR (DROPDOWN) ==========
function setColor(value) {
  if (value === appState.color) return;
  appState.color = value;
  // sync dropdown UI
  document.getElementById('colorSelect').value = value;
  updateDynamicImage();
}

// ========== UPDATE IMAGE ==========
function updateDynamicImage() {
  const img = document.getElementById('dynamicImage');
  if (!img) return;
  const url = getImageForCombination(appState.color, appState.a);
  img.src = url;
  img.alt = `${appState.color} - A=${appState.a}`;
}

// ========== EVENT LISTENERS ==========
function initSliderA() {
  const sliderA = document.getElementById('sliderA');
  sliderA.addEventListener('input', (e) => {
    setAValue(parseInt(e.target.value, 10));
  });
}

function initDropdown() {
  const dropdown = document.getElementById('colorSelect');
  dropdown.addEventListener('change', (e) => {
    setColor(e.target.value);
  });
  // set initial value
  dropdown.value = appState.color;
}

// ========== INIT ==========
function init() {
  appState.a = 1;
  updateBCD();            // b=1,c=1,d=1
  updateSlidersUI();
  initSliderA();
  initDropdown();
  updateDynamicImage();
}

init();