const GEMINI_API_KEY = "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";

let activeCity = 'bengaluru';

const CITY_CENTERS = {
  bengaluru: { name: "Bengaluru", lat: 12.9716, lon: 77.5946 },
  delhi:     { name: "Delhi",     lat: 28.6139, lon: 77.2090 },
  mumbai:    { name: "Mumbai",    lat: 19.0760, lon: 72.8777 },
  hyderabad: { name: "Hyderabad", lat: 17.3850, lon: 78.4867 },
  chennai:   { name: "Chennai",   lat: 13.0827, lon: 80.2707 },
  kolkata:   { name: "Kolkata",   lat: 22.5726, lon: 88.3639 },
  jaipur:    { name: "Jaipur",    lat: 26.9124, lon: 75.7873 },
  lucknow:   { name: "Lucknow",   lat: 26.8467, lon: 80.9462 }
};

window.addEventListener('load', () => {
  setTimeout(() => {
    const splash = document.getElementById('splash');
    if (splash) {
      splash.classList.add('fade-out');
      setTimeout(() => splash.style.display = 'none', 900);
    }
  }, 2400);
});

(function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];
  function resize() { 
    W = canvas.width = window.innerWidth; 
    H = canvas.height = window.innerHeight; 
  }
  window.addEventListener('resize', resize);
  resize();
  for (let i = 0; i < 60; i++) {
    particles.push({
      x: Math.random() * 9999, y: Math.random() * 9999,
      r: Math.random() * 1.5 + 0.3,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
      alpha: Math.random() * 0.5 + 0.1
    });
  }
  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      p.x = ((p.x + p.vx + W) % W);
      p.y = ((p.y + p.vy + H) % H);
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(230,58,110,${p.alpha})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }
  draw();
})();

const map = L.map('map', { zoomControl: false }).setView([12.9716, 77.5946], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap'
}).addTo(map);
L.control.zoom({ position: 'bottomright' }).addTo(map);

let currentRoute = null, startMarker = null, endMarker = null;
let glowRoute = null;

document.getElementById('city-pills').addEventListener('click', e => {
  const pill = e.target.closest('.city-pill');
  if (!pill) return;
  document.querySelectorAll('.city-pill').forEach(p => p.classList.remove('active'));
  pill.classList.add('active');
  activeCity = pill.dataset.city;
  const c = CITY_CENTERS[activeCity];
  if (c) {
    map.flyTo([c.lat, c.lon], 13, { duration: 1.4 });
    document.getElementById('start').placeholder = `e.g. Area in ${c.name}`;
    document.getElementById('end').placeholder = `e.g. Destination in ${c.name}`;
  }
  if (typeof renderIncidents === 'function') renderIncidents(activeCity);
  if (typeof renderCrimes === 'function') renderCrimes(activeCity);
});

if (typeof renderIncidents === 'function') renderIncidents('bengaluru');
if (typeof renderCrimes === 'function') renderCrimes('bengaluru');

document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById('tab-' + tab.dataset.tab).classList.add('active');
  });
});

function recenterMap() {
  const c = CITY_CENTERS[activeCity];
  if (c) map.flyTo([c.lat, c.lon], 13, { duration: 1 });
}

async function geocode(address) {
  const cityName = CITY_CENTERS[activeCity]?.name || 'India';
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address + ', ' + cityName)}&limit=1`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    if (data.length > 0) return { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon), name: data[0].display_name };
  } catch(e) {}
  return null;
}

// Keep the rest of your functions (findSafeRoute, showSafetyResult, showToast, toggleChatbot, sendChat, etc.)
// You can paste the remaining functions from my previous message if needed.

async function findSafeRoute() {
  // ... (use the version from my previous full code)
}

function showSafetyResult(score, safetyData, timeOfDay) {
  // ... (use the version from my previous full code)
}

function showToast(msg) {
  // ... (use the version from my previous full code)
}

let chatOpen = false;

function toggleChatbot() {
  // ... (use the version from my previous full code)
}

async function sendChat() {
  // ... (use the version from my previous full code)
}

function addChatMessage(text, role) {
  // ... (use the version from my previous full code)
}

function addTypingIndicator(id) {
  // ... (use the version from my previous full code)
}

function removeTypingIndicator(id) {
  // ... (use the version from my previous full code)
}