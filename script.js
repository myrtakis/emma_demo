// ========== IMAGE MAPPING ==========
// Place your images in the "assets" folder
// M1 (radio button "serene") → r1.jpg, r2.jpg, r3.jpg
// M2 (radio button "vivid")  → g1.jpg, g2.jpg, g3.jpg

function getImageForCombination(radioMode, aValue) {
  // radioMode is either "M1" or "M2"
  // aValue is 1, 2, or 3
  if (radioMode === "M1") {
    return `assets/r${aValue}.png`;
  } else {
    return `assets/g${aValue}.png`;
  }
}

// ========== APP STATE ==========
let appState = {
  a: 1,      // 1,2,3
  b: 1,
  c: 1,
  d: 1,
  radio: "M1"
};

// ========== B, C, D DERIVED FROM A ==========
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

// ========== UPDATE UI SLIDERS ==========
function updateSlidersUI() {
  const sliderA = document.getElementById('sliderA');
  const sliderB = document.getElementById('sliderB');
  const sliderC = document.getElementById('sliderC');
  const sliderD = document.getElementById('sliderD');
  if (sliderA) sliderA.value = appState.a;
  if (sliderB) sliderB.value = appState.b;
  if (sliderC) sliderC.value = appState.c;
  if (sliderD) sliderD.value = appState.d;
}

// ========== CHANGE A (ONLY INTERACTIVE SLIDER) ==========
function setAValue(newVal) {
  if (newVal === appState.a) return;
  appState.a = newVal;
  updateBCD();
  updateSlidersUI();
  updateDynamicImage();
}

// ========== CHANGE RADIO BUTTON ==========
function setRadio(value) {
  if (value === appState.radio) return;
  appState.radio = value;
  // sync radio UI
  const radios = document.querySelectorAll('input[name="mode"]');
  radios.forEach(r => {
    if (r.value === value) r.checked = true;
  });
  updateDynamicImage();
}

// ========== UPDATE IMAGE BASED ON CURRENT COMBINATION ==========
function updateDynamicImage() {
  const img = document.getElementById('dynamicImage');
  if (!img) return;
  const imageUrl = getImageForCombination(appState.radio, appState.a);
  img.src = imageUrl;
  img.alt = `${appState.radio} - A=${appState.a}`;
}

// ========== INITIALISE SLIDER A (ADD EVENT LISTENER) ==========
function initSliderA() {
  const sliderA = document.getElementById('sliderA');
  if (!sliderA) return;
  sliderA.addEventListener('input', (e) => {
    const val = parseInt(e.target.value, 10);
    setAValue(val);
  });
}

// ========== INITIALISE RADIO BUTTON LISTENERS ==========
function initRadioListeners() {
  const radios = document.querySelectorAll('input[name="mode"]');
  radios.forEach(btn => {
    btn.addEventListener('change', (e) => {
      if (e.target.checked) setRadio(e.target.value);
    });
  });
  // set initial checked state
  const checkedRadio = document.querySelector(`input[name="mode"][value="${appState.radio}"]`);
  if (checkedRadio) checkedRadio.checked = true;
}

// ========== FALLBACK FOR IMAGES THAT DON'T LOAD ==========
function handleImageError() {
  // optional: set a default placeholder if image missing
  const img = document.getElementById('dynamicImage');
  if (img && img.src.includes('undefined')) {
    img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="500" height="260" viewBox="0 0 500 260"%3E%3Crect width="100%25" height="100%25" fill="%23f0f0f0"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="monospace" fill="%23999"%3EImage not found%3C/text%3E%3C/svg%3E';
  }
}

// ========== INITIALISE EVERYTHING ==========
function init() {
  appState.a = 1;
  updateBCD();            // sets b=1, c=1, d=1
  updateSlidersUI();
  initSliderA();
  initRadioListeners();
  updateDynamicImage();
  
  // attach error handler to image element
  const img = document.getElementById('dynamicImage');
  if (img) img.onerror = handleImageError;
}

// Start the app
init();