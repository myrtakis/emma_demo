// ========== DOM REFS ==========
const slider1 = document.getElementById('slider1');
const slider2 = document.getElementById('slider2');
const marbleSelect = document.getElementById('marbleSelect');
const terrazzoSelect = document.getElementById('terrazzoSelect');
const dynamicImage = document.getElementById('dynamicImage');
const spinner = document.getElementById('spinner');
const startBtn = document.getElementById('startBtn');
const welcomeScreen = document.getElementById('welcome-screen');
const appScreen = document.getElementById('app-screen');

// ========== STATE ==========
let currentSliderVal = 1;
let currentMarbleVal = null;
let currentTerrazzoVal = null;

// ========== SPINNER CONTROLS ==========
function showSpinner() {
  spinner.style.display = 'block';
  dynamicImage.style.opacity = '0.5';
}

function hideSpinner() {
  spinner.style.display = 'none';
  dynamicImage.style.opacity = '1';
}

// ========== WELCOME SCREEN LOGIC ==========
startBtn.addEventListener('click', () => {
  welcomeScreen.style.display = 'none';
  appScreen.style.display = 'flex';
  window.dispatchEvent(new Event('resize'));
});

// ========== UPDATE FUNCTIONS ==========
function updateSlider2(val) {
  const newVal = 4 - val;
  slider2.value = newVal;
}

function updateImage() {
  // Show loading spinner
  showSpinner();

  let filename = `${currentSliderVal}.jpg`;
  if (currentMarbleVal !== null) {
    filename = `${currentSliderVal}_M${currentMarbleVal}.jpg`;
  } else if (currentTerrazzoVal !== null) {
    filename = `${currentSliderVal}_T${currentTerrazzoVal}.jpg`;
  }

  // Trigger image load
  dynamicImage.src = `assets/${filename}`;
  dynamicImage.alt = `Material: ${filename}`;
}

// ===== IMAGE LOAD / ERROR HANDLING =====
dynamicImage.onload = function() {
  hideSpinner();
};

dynamicImage.onerror = function() {
  hideSpinner();
  // Inline onerror in HTML will handle the fallback image
};

// ========== EVENT LISTENERS ==========
slider1.addEventListener('input', (e) => {
  const val = parseInt(e.target.value, 10);
  currentSliderVal = val;
  updateSlider2(val);
  updateImage();
});
slider1.addEventListener('change', (e) => {
  const val = parseInt(e.target.value, 10);
  currentSliderVal = val;
  updateSlider2(val);
  updateImage();
});

marbleSelect.addEventListener('change', (e) => {
  const val = e.target.value;
  if (val) {
    terrazzoSelect.value = '';
    currentTerrazzoVal = null;
    currentMarbleVal = parseInt(val, 10);
  } else {
    currentMarbleVal = null;
  }
  updateImage();
});

terrazzoSelect.addEventListener('change', (e) => {
  const val = e.target.value;
  if (val) {
    marbleSelect.value = '';
    currentMarbleVal = null;
    currentTerrazzoVal = parseInt(val, 10);
  } else {
    currentTerrazzoVal = null;
  }
  updateImage();
});

// ========== INIT ==========
function init() {
  slider1.value = 1;
  currentSliderVal = 1;
  updateSlider2(1);
  dynamicImage.src = 'assets/1.jpg';
}

init();