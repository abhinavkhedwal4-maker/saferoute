const GEMINI_API_KEY = "AIzaSyDQgT5Tk1BRWXv91aTGR9ZbxzPriAjjmlU";

window.addEventListener('load', () => {
  setTimeout(() => {
    const splash = document.getElementById('splash');
    splash.classList.add('fade-out');
    setTimeout(() => splash.style.display = 'none', 900);
  }, 2400);
});

(function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];
  function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
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
  renderIncidents(activeCity);
  renderCrimes(activeCity);
});

renderIncidents('bengaluru');
renderCrimes('bengaluru');

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

async function findSafeRoute() {
  const startText = document.getElementById('start').value.trim();
  const endText = document.getElementById('end').value.trim();
  const timeOfDay = document.getElementById('time').value;
  if (!startText || !endText) { showToast('Please enter both start and destination.'); return; }
  const btn = document.querySelector('.find-btn');
  btn.querySelector('.btn-text').textContent = 'Analyzing route...';
  btn.disabled = true;
  const [startCoords, endCoords] = await Promise.all([geocode(startText), geocode(endText)]);
  btn.querySelector('.btn-text').textContent = 'Find Safe Route';
  btn.disabled = false;
  if (!startCoords) { showToast('Could not find starting location. Try being more specific.'); return; }
  if (!endCoords) { showToast('Could not find destination. Try being more specific.'); return; }
  if (startMarker) map.removeLayer(startMarker);
  if (endMarker) map.removeLayer(endMarker);
  if (currentRoute) map.removeLayer(currentRoute);
  if (glowRoute) map.removeLayer(glowRoute);
  const makeIcon = (color) => L.divIcon({
    className: '',
    html: `<div style="background:${color};width:14px;height:14px;border-radius:50%;border:3px solid rgba(255,255,255,0.8);box-shadow:0 0 16px ${color};"></div>`,
    iconSize: [14, 14], iconAnchor: [7, 7]
  });
  startMarker = L.marker([startCoords.lat, startCoords.lon], { icon: makeIcon('#22d3a5') })
    .addTo(map).bindPopup(`<strong>🟢 Start</strong><br>${startText}`);
  endMarker = L.marker([endCoords.lat, endCoords.lon], { icon: makeIcon('#e63a6e') })
    .addTo(map).bindPopup(`<strong>🔴 Destination</strong><br>${endText}`);
  const routeUrl = `https://router.project-osrm.org/route/v1/foot/${startCoords.lon},${startCoords.lat};${endCoords.lon},${endCoords.lat}?overview=full&geometries=geojson`;
  let routeCoords;
  try {
    const r = await fetch(routeUrl);
    const d = await r.json();
    routeCoords = d.routes[0].geometry.coordinates.map(c => [c[1], c[0]]);
  } catch(e) {
    routeCoords = [[startCoords.lat, startCoords.lon], [endCoords.lat, endCoords.lon]];
  }
  const startSafety = getSafetyScore(startText, timeOfDay);
  const endSafety = getSafetyScore(endText, timeOfDay);
  const avgScore = Math.round((startSafety.score + endSafety.score) / 2);
  let routeColor, glowColor;
  if (avgScore >= 75) { routeColor = '#22d3a5'; glowColor = 'rgba(34,211,165,0.4)'; }
  else if (avgScore >= 50) { routeColor = '#fbbf24'; glowColor = 'rgba(251,191,36,0.4)'; }
  else { routeColor = '#ef4444'; glowColor = 'rgba(239,68,68,0.4)'; }
  glowRoute = L.polyline(routeCoords, { color: glowColor, weight: 14, opacity: 0.5 }).addTo(map);
  currentRoute = L.polyline(routeCoords, { color: routeColor, weight: 5, opacity: 0.9 }).addTo(map);
  map.fitBounds(currentRoute.getBounds(), { padding: [50, 50] });
  showSafetyResult(avgScore, endSafety, timeOfDay);
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
  document.querySelector('[data-tab="route"]').classList.add('active');
  document.getElementById('tab-route').classList.add('active');
}

function showSafetyResult(score, safetyData, timeOfDay) {
  const resultDiv = document.getElementById('safety-result');
  resultDiv.classList.remove('hidden');
  const bar = document.getElementById('score-bar');
  const scoreNum = document.getElementById('score-number');
  bar.style.width = score + '%';
  let color;
  if (score >= 75) color = '#22d3a5';
  else if (score >= 50) color = '#fbbf24';
  else color = '#ef4444';
  bar.style.background = `linear-gradient(90deg, ${color}88, ${color})`;
  let current = 0;
  const step = Math.ceil(score / 30);
  const timer = setInterval(() => {
    current = Math.min(current + step, score);
    scoreNum.textContent = current;
    if (current >= score) clearInterval(timer);
  }, 30);
  let label, icon;
  if (score >= 75) { label = 'Relatively Safe'; icon = '✅'; }
  else if (score >= 50) { label = 'Moderate Risk'; icon = '⚠️'; }
  else { label = 'High Risk — Caution'; icon = '🔴'; }
  document.getElementById('result-icon').textContent = icon;
  document.getElementById('score-text').textContent = `Safety Score: ${score}/100 — ${label}`;
  const tipsList = document.getElementById('safety-tips');
  tipsList.innerHTML = '';
  safetyData.landmarks.forEach((tip, i) => {
    const li = document.createElement('li');
    li.textContent = '✅ ' + tip;
    li.style.animationDelay = `${i * 0.08}s`;
    tipsList.appendChild(li);
  });
  safetyData.risks.forEach((risk, i) => {
    const li = document.createElement('li');
    li.textContent = '⚠️ ' + risk;
    li.style.animationDelay = `${(i + safetyData.landmarks.length) * 0.08}s`;
    tipsList.appendChild(li);
  });
  if (timeOfDay === 'night') {
    const li = document.createElement('li');
    li.textContent = '🌙 Share your live location with a trusted contact';
    tipsList.appendChild(li);
    const li2 = document.createElement('li');
    li2.textContent = '📞 Emergency: 112 (Police), 1091 (Women helpline)';
    tipsList.appendChild(li2);
  }
}

function showToast(msg) {
  const existing = document.getElementById('toast');
  if (existing) existing.remove();
  const toast = document.createElement('div');
  toast.id = 'toast';
  toast.style.cssText = `position:fixed;top:80px;left:50%;transform:translateX(-50%);background:rgba(239,68,68,0.9);color:white;padding:10px 20px;border-radius:10px;font-size:0.85rem;z-index:9999;backdrop-filter:blur(10px);font-family:var(--font-display);animation:fadeUp 0.3s ease;`;
  toast.textContent = msg;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

let chatOpen = false;

function toggleChatbot() {
  chatOpen = !chatOpen;
  const panel = document.getElementById('chatbot-panel');
  if (chatOpen) {
    panel.classList.remove('hidden');
    document.getElementById('chatbot-input').focus();
  } else {
    panel.classList.add('hidden');
  }
}

async function sendChat() {
  const input = document.getElementById('chatbot-input');
  const msg = input.value.trim();
  if (!msg) return;
  input.value = '';

  addChatMessage(msg, 'user');
  const typingId = 'typing-' + Date.now();
  addTypingIndicator(typingId);

  try {
    const systemContext = `You are SafeRoute AI, a friendly safety assistant focused on women's safety in Indian cities. You know about: Bengaluru, Delhi, Mumbai, Hyderabad, Chennai, Kolkata, Jaipur, Lucknow — safe/unsafe areas, time-based risks, crime types, practical safety tips. Emergency numbers: Police 112, Women Helpline 1091, Emergency 112. Be warm, empathetic, practical. Keep responses concise (2-4 sentences max). Never minimize safety concerns. Current city: ${CITY_CENTERS && CITY_CENTERS[activeCity] ? CITY_CENTERS[activeCity].name : 'India'}.`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: systemContext + '\n\nUser question: ' + msg }
              ]
            }
          ],
          generationConfig: {
            maxOutputTokens: 300,
            temperature: 0.7
          }
        })
      }
    );

    const data = await response.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text
      || "I'm having trouble connecting right now. Please try again!";

    removeTypingIndicator(typingId);
    addChatMessage(reply, 'bot');

  } catch(e) {
    console.error('Chat error:', e);
    removeTypingIndicator(typingId);
    addChatMessage("Having trouble connecting. Quick tip: Always share your live location with a trusted contact when traveling at night, and keep 112 handy!", 'bot');
  }
}

function addChatMessage(text, role) {
  const messages = document.getElementById('chatbot-messages');
  const div = document.createElement('div');
  div.className = `chat-msg ${role}`;
  div.innerHTML = `
    ${role === 'bot' ? '<span class="chat-avatar">🛡️</span>' : '<span class="chat-avatar">👤</span>'}
    <div class="msg-bubble">${text.replace(/\n/g, '<br>')}</div>
  `;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}

function addTypingIndicator(id) {
  const messages = document.getElementById('chatbot-messages');
  const div = document.createElement('div');
  div.id = id;
  div.className = 'chat-msg bot';
  div.innerHTML = `<span class="chat-avatar">🛡️</span><div class="msg-bubble"><div class="typing-dots"><span></span><span></span><span></span></div></div>`;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}

function removeTypingIndicator(id) {
  const el = document.getElementById(id);
  if (el) el.remove();
}