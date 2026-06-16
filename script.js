// ============================================================
// FitBody — Main Application Script
// ============================================================

// ── STATE ─────────────────────────────────────────────────
const state = {
  selectedMuscle: null,
  gender: 'male',
  activeFilters: { type: null, level: null },
  trainerGoal: null,
  trainerLevel: null,
  favorites: JSON.parse(localStorage.getItem('fitbody_favorites') || '[]'),
  currentView: 'body', // 'body' | 'trainer' | 'favorites'
};

// ── MUSCLE LABELS (position as % of SVG wrapper) ──────────
const MUSCLE_LABELS = {
  chest:     { x: '50%', y: '28%', text: 'Pecho',    side: 'center' },
  back:      { x: '50%', y: '20%', text: 'Espalda',  side: 'center' },
  biceps:    { x: '14%', y: '33%', text: 'Bíceps',   side: 'left' },
  triceps:   { x: '86%', y: '33%', text: 'Tríceps',  side: 'right' },
  shoulders: { x: '18%', y: '21%', text: 'Hombros',  side: 'left' },
  abs:       { x: '50%', y: '45%', text: 'Abdomen',  side: 'center' },
  glutes:    { x: '82%', y: '52%', text: 'Glúteos',  side: 'right' },
  legs:      { x: '50%', y: '65%', text: 'Piernas',  side: 'center' },
};

// ── INIT ───────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initBodySVG();
  initSearch();
  initFilters();
  initTrainer();
  renderFavorites();
  initViewTabs();
  renderStats();
});

// ── BODY SVG ───────────────────────────────────────────────
function initBodySVG() {
  loadBodySVG(state.gender);

  document.getElementById('btn-male').addEventListener('click', () => {
    state.gender = 'male';
    document.getElementById('btn-male').classList.add('active');
    document.getElementById('btn-female').classList.remove('active');
    loadBodySVG('male');
  });

  document.getElementById('btn-female').addEventListener('click', () => {
    state.gender = 'female';
    document.getElementById('btn-female').classList.add('active');
    document.getElementById('btn-male').classList.remove('active');
    loadBodySVG('female');
  });
}

function loadBodySVG(gender) {
  const container = document.getElementById('body-svg-container');
  container.innerHTML = '';

  const wrapper = document.createElement('div');
  wrapper.className = 'body-svg-wrapper';

  fetch(`assets/body-${gender}.svg`)
    .then(r => r.text())
    .then(svgText => {
      wrapper.innerHTML = svgText;
      container.appendChild(wrapper);
      setupMuscleZones(wrapper);
      if (state.selectedMuscle) highlightMuscle(state.selectedMuscle, wrapper);
    })
    .catch(() => {
      // Fallback if fetch fails (e.g. local file)
      wrapper.innerHTML = getFallbackSVG(gender);
      container.appendChild(wrapper);
      setupMuscleZones(wrapper);
    });
}

function setupMuscleZones(wrapper) {
  const zones = wrapper.querySelectorAll('.muscle-zone');
  zones.forEach(zone => {
    const muscleId = zone.dataset.muscle;
    if (!muscleId) return;

    zone.addEventListener('mouseenter', () => {
      const chip = document.querySelector(`.muscle-chip[data-muscle="${muscleId}"]`);
      if (chip && muscleId !== state.selectedMuscle) {
        chip.style.borderColor = 'rgba(0, 212, 255, 0.4)';
        chip.style.color = 'rgba(0, 212, 255, 0.8)';
      }
    });

    zone.addEventListener('mouseleave', () => {
      const chip = document.querySelector(`.muscle-chip[data-muscle="${muscleId}"]`);
      if (chip && muscleId !== state.selectedMuscle) {
        chip.style.borderColor = '';
        chip.style.color = '';
      }
    });

    zone.addEventListener('click', () => {
      selectMuscle(muscleId);
    });
  });
}

function highlightMuscle(muscleId, wrapper) {
  if (!wrapper) wrapper = document.querySelector('.body-svg-wrapper');
  if (!wrapper) return;

  // Clear previous
  wrapper.querySelectorAll('.muscle-zone').forEach(z => {
    z.classList.remove('selected');
  });

  // Highlight all zones with this muscle
  wrapper.querySelectorAll(`.muscle-zone[data-muscle="${muscleId}"]`).forEach(z => {
    z.classList.add('selected');
  });
}

// ── MUSCLE SELECTION ───────────────────────────────────────
function selectMuscle(muscleId) {
  state.selectedMuscle = muscleId;

  // Update chips
  document.querySelectorAll('.muscle-chip').forEach(chip => {
    chip.classList.toggle('selected', chip.dataset.muscle === muscleId);
    chip.style.borderColor = '';
    chip.style.color = '';
  });

  // Highlight SVG
  highlightMuscle(muscleId);

  // Render panel
  renderExercisePanel(muscleId);

  // Show toast
  showToast(`💪 ${MUSCLES[muscleId].name} seleccionado`, 'success');
}

// ── EXERCISE PANEL ─────────────────────────────────────────
function renderExercisePanel(muscleId) {
  const muscle = MUSCLES[muscleId];
  if (!muscle) return;

  let exercises = [...muscle.exercises];

  // Apply filters
  if (state.activeFilters.type) {
    exercises = exercises.filter(e => e.type === state.activeFilters.type);
  }
  if (state.activeFilters.level) {
    exercises = exercises.filter(e => e.level === state.activeFilters.level);
  }

  const panel = document.getElementById('exercise-panel');
  panel.innerHTML = '';

  // Muscle header
  const header = document.createElement('div');
  header.className = 'muscle-header';
  header.innerHTML = `
    <div class="muscle-header-top">
      <span class="muscle-emoji">${muscle.icon}</span>
      <div>
        <div class="muscle-info-title">${muscle.name}</div>
        <div class="muscle-info-sub">${muscle.nameEN} · ${muscle.exercises.length} ejercicios</div>
      </div>
    </div>
    <p class="muscle-description">${muscle.description}</p>
  `;
  panel.appendChild(header);

  // Exercises container
  const listWrapper = document.createElement('div');
  listWrapper.className = 'exercises-list';

  // Count bar
  const countBar = document.createElement('div');
  countBar.className = 'exercises-count';
  countBar.innerHTML = `
    <span>${exercises.length} ejercicio${exercises.length !== 1 ? 's' : ''} ${state.activeFilters.type || state.activeFilters.level ? '(filtrados)' : ''}</span>
    ${state.activeFilters.type || state.activeFilters.level
      ? '<span style="color:var(--accent);cursor:pointer" onclick="clearFilters()">Limpiar filtros →</span>'
      : ''}
  `;
  listWrapper.appendChild(countBar);

  if (exercises.length === 0) {
    listWrapper.innerHTML += `
      <div class="empty-state">
        <div class="empty-state-icon">🔍</div>
        <div class="empty-state-text">No hay ejercicios con esos filtros</div>
      </div>
    `;
  } else {
    exercises.forEach(ex => {
      listWrapper.appendChild(createExerciseCard(ex, muscleId));
    });
  }

  panel.appendChild(listWrapper);
}

function createExerciseCard(exercise, muscleId) {
  const isFav = state.favorites.some(f => f.id === exercise.id);
  const card = document.createElement('div');
  card.className = 'exercise-card';
  card.dataset.exerciseId = exercise.id;

  card.innerHTML = `
    <div class="exercise-card-top">
      <div class="exercise-name">${exercise.name}</div>
      <div class="exercise-badges">
        <span class="badge badge-level-${exercise.level}">${capFirst(exercise.level)}</span>
        <span class="badge badge-type-${exercise.type}">${capFirst(exercise.type)}</span>
      </div>
      <button class="exercise-expand-btn" title="Ver detalles">▼</button>
    </div>
    <div class="exercise-details">
      <p class="exercise-description">${exercise.description}</p>
      <div class="exercise-meta">
        <div class="meta-item">
          <span class="meta-label">Series × Reps</span>
          <span class="meta-value">${exercise.sets}</span>
        </div>
        <div class="meta-item">
          <span class="meta-label">Descanso</span>
          <span class="meta-value">${exercise.rest}</span>
        </div>
        <div class="meta-item">
          <span class="meta-label">Equipo</span>
          <span class="meta-value" style="color:var(--text-secondary)">${exercise.equipment}</span>
        </div>
      </div>
      <div class="exercise-actions">
        <button class="btn-fav ${isFav ? 'favorited' : ''}" data-id="${exercise.id}" data-muscle="${muscleId}" data-name="${exercise.name}">
          <span class="star-icon">${isFav ? '★' : '☆'}</span>
          ${isFav ? 'Guardado' : 'Guardar'}
        </button>
      </div>
    </div>
  `;

  // Expand toggle
  card.querySelector('.exercise-expand-btn').addEventListener('click', (e) => {
    e.stopPropagation();
    card.classList.toggle('expanded');
  });

  // Click card to expand
  card.querySelector('.exercise-card-top').addEventListener('click', () => {
    card.classList.toggle('expanded');
  });

  // Favorite button
  card.querySelector('.btn-fav').addEventListener('click', (e) => {
    e.stopPropagation();
    toggleFavorite(exercise.id, muscleId, exercise.name, card.querySelector('.btn-fav'));
  });

  return card;
}

// ── SEARCH ─────────────────────────────────────────────────
function initSearch() {
  const input = document.getElementById('search-input');
  const results = document.getElementById('search-results');

  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    if (q.length < 2) {
      results.classList.remove('visible');
      return;
    }

    const matches = [];
    Object.values(MUSCLES).forEach(muscle => {
      muscle.exercises.forEach(ex => {
        if (
          ex.name.toLowerCase().includes(q) ||
          ex.description.toLowerCase().includes(q) ||
          ex.type.toLowerCase().includes(q) ||
          muscle.name.toLowerCase().includes(q)
        ) {
          matches.push({ exercise: ex, muscle });
        }
      });
    });

    if (matches.length === 0) {
      results.innerHTML = '<div class="search-result-item text-muted" style="justify-content:center">Sin resultados</div>';
    } else {
      results.innerHTML = matches.slice(0, 8).map(({ exercise, muscle }) => `
        <div class="search-result-item" data-exercise="${exercise.id}" data-muscle="${muscle.id}">
          <span>${exercise.name}</span>
          <span class="search-result-muscle">${muscle.name}</span>
          <span class="badge badge-type-${exercise.type}" style="margin-left:auto">${capFirst(exercise.type)}</span>
        </div>
      `).join('');

      results.querySelectorAll('.search-result-item').forEach(item => {
        item.addEventListener('click', () => {
          const muscleId = item.dataset.muscle;
          selectMuscle(muscleId);
          input.value = '';
          results.classList.remove('visible');
          // Expand that specific exercise
          setTimeout(() => {
            const card = document.querySelector(`.exercise-card[data-exercise-id="${item.dataset.exercise}"]`);
            if (card) {
              card.classList.add('expanded');
              card.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
          }, 200);
        });
      });
    }

    results.classList.add('visible');
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-bar')) {
      results.classList.remove('visible');
    }
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') results.classList.remove('visible');
  });
}

// ── FILTERS ────────────────────────────────────────────────
function initFilters() {
  document.querySelectorAll('.filter-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const filterType = chip.dataset.filterType;
      const filterValue = chip.dataset.filterValue;

      if (state.activeFilters[filterType] === filterValue) {
        // Toggle off
        state.activeFilters[filterType] = null;
        chip.classList.remove('active');
      } else {
        // Toggle off others in same group
        document.querySelectorAll(`.filter-chip[data-filter-type="${filterType}"]`).forEach(c => c.classList.remove('active'));
        state.activeFilters[filterType] = filterValue;
        chip.classList.add('active');
      }

      if (state.selectedMuscle) {
        renderExercisePanel(state.selectedMuscle);
      }
    });
  });
}

function clearFilters() {
  state.activeFilters = { type: null, level: null };
  document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
  if (state.selectedMuscle) renderExercisePanel(state.selectedMuscle);
}

// ── TRAINER ────────────────────────────────────────────────
function initTrainer() {
  // Goal options
  document.querySelectorAll('.selector-option[data-goal]').forEach(opt => {
    opt.addEventListener('click', () => {
      document.querySelectorAll('.selector-option[data-goal]').forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
      state.trainerGoal = opt.dataset.goal;
      checkGenerateBtn();
    });
  });

  // Level options
  document.querySelectorAll('.selector-option[data-level]').forEach(opt => {
    opt.addEventListener('click', () => {
      document.querySelectorAll('.selector-option[data-level]').forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
      state.trainerLevel = opt.dataset.level;
      checkGenerateBtn();
    });
  });

  // Generate button
  document.getElementById('generate-btn').addEventListener('click', generateRoutine);
}

function checkGenerateBtn() {
  const btn = document.getElementById('generate-btn');
  btn.disabled = !(state.trainerGoal && state.trainerLevel);
}

function generateRoutine() {
  const routine = ROUTINES[state.trainerGoal]?.[state.trainerLevel];
  if (!routine) return;

  const display = document.getElementById('routine-display');
  display.classList.add('visible');

  document.getElementById('routine-name').textContent = routine.name;
  document.getElementById('routine-desc').textContent = routine.description;

  const grid = document.getElementById('routine-grid');
  grid.innerHTML = routine.schedule.map(day => `
    <div class="routine-day ${day.muscles.length === 0 ? 'rest' : ''}" 
         data-muscles="${day.muscles.join(',')}"
         title="${day.focus}">
      <div class="routine-day-name">${day.day.slice(0, 3)}</div>
      <div class="routine-day-emoji">${day.emoji}</div>
      <div class="routine-day-focus">${day.focus}</div>
    </div>
  `).join('');

  // Click on routine day to see those muscles
  grid.querySelectorAll('.routine-day:not(.rest)').forEach(dayEl => {
    dayEl.addEventListener('click', () => {
      const muscles = dayEl.dataset.muscles.split(',').filter(Boolean);
      if (muscles.length > 0) {
        selectMuscle(muscles[0]);
        // Switch to body view
        document.getElementById('view-body').click();
        showToast(`📅 Mostrando ejercicios para ${muscles.map(m => MUSCLES[m]?.name).filter(Boolean).join(' + ')}`, 'success');
      }
    });
  });

  display.scrollIntoView({ behavior: 'smooth', block: 'start' });
  showToast('✅ Rutina generada', 'success');
}

// ── FAVORITES ──────────────────────────────────────────────
function toggleFavorite(exerciseId, muscleId, exerciseName, btn) {
  const idx = state.favorites.findIndex(f => f.id === exerciseId);
  if (idx > -1) {
    state.favorites.splice(idx, 1);
    btn.classList.remove('favorited');
    btn.querySelector('.star-icon').textContent = '☆';
    btn.lastChild.nodeValue = ' Guardar';
    showToast('⭐ Eliminado de favoritos', 'warning');
  } else {
    state.favorites.push({ id: exerciseId, muscleId, name: exerciseName });
    btn.classList.add('favorited');
    btn.querySelector('.star-icon').textContent = '★';
    btn.lastChild.nodeValue = ' Guardado';
    showToast('⭐ Guardado en favoritos', 'success');
  }

  saveFavorites();
  renderFavorites();
  renderStats();
}

function saveFavorites() {
  localStorage.setItem('fitbody_favorites', JSON.stringify(state.favorites));
}

function renderFavorites() {
  const section = document.getElementById('favorites-section');
  const grid = document.getElementById('fav-grid');

  if (state.favorites.length === 0) {
    section.classList.remove('has-favorites');
    return;
  }

  section.classList.add('has-favorites');

  grid.innerHTML = state.favorites.map(fav => {
    const muscle = MUSCLES[fav.muscleId];
    return `
      <div class="fav-card">
        <button class="fav-remove" data-id="${fav.id}" title="Eliminar">✕</button>
        <div class="fav-card-name">${fav.name}</div>
        <div class="fav-card-muscle">${muscle?.name || fav.muscleId}</div>
      </div>
    `;
  }).join('');

  grid.querySelectorAll('.fav-remove').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      state.favorites = state.favorites.filter(f => f.id !== id);
      saveFavorites();
      renderFavorites();
      // Update any visible exercise card
      const card = document.querySelector(`.exercise-card[data-exercise-id="${id}"] .btn-fav`);
      if (card) {
        card.classList.remove('favorited');
        card.querySelector('.star-icon').textContent = '☆';
      }
      showToast('⭐ Eliminado de favoritos', 'warning');
      renderStats();
    });
  });
}

// ── STATS ──────────────────────────────────────────────────
function renderStats() {
  const totalExercises = Object.values(MUSCLES).reduce((acc, m) => acc + m.exercises.length, 0);
  document.getElementById('stat-total').textContent = totalExercises;
  document.getElementById('stat-muscles').textContent = Object.keys(MUSCLES).length;
  document.getElementById('stat-favorites').textContent = state.favorites.length;
}

// ── VIEW TABS ──────────────────────────────────────────────
function initViewTabs() {
  const tabs = document.querySelectorAll('.view-tab');
  const views = {
    body: document.getElementById('view-body-content'),
    trainer: document.getElementById('view-trainer-content'),
    favorites: document.getElementById('view-favorites-content'),
  };

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const target = tab.dataset.view;
      state.currentView = target;
      Object.entries(views).forEach(([key, el]) => {
        if (el) el.classList.toggle('hidden', key !== target);
      });
    });
  });
}

// ── TOAST ─────────────────────────────────────────────────
function showToast(message, type = 'success') {
  const toast = document.getElementById('toast');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span class="toast-icon">${type === 'success' ? '✓' : '⚠'}</span>${message}`;
  toast.classList.add('show');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('show'), 2500);
}

// ── HELPERS ────────────────────────────────────────────────
function capFirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Fallback SVG if fetch fails (inline male body)
function getFallbackSVG(gender) {
  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 600">
  <ellipse cx="150" cy="52" rx="32" ry="38" fill="#2a2a3e" stroke="#4a4a6a" stroke-width="1.5"/>
  <rect x="138" y="86" width="24" height="20" rx="4" fill="#2a2a3e" stroke="#4a4a6a" stroke-width="1.5"/>
  <ellipse cx="95" cy="120" rx="22" ry="15" fill="#1e1e32" stroke="#4a4a6a" stroke-width="1" class="muscle-zone" data-muscle="shoulders"/>
  <ellipse cx="205" cy="120" rx="22" ry="15" fill="#1e1e32" stroke="#4a4a6a" stroke-width="1" class="muscle-zone" data-muscle="shoulders"/>
  <path d="M 108 105 Q 150 100 192 105 L 195 155 Q 150 160 105 155 Z" fill="#1e1e32" stroke="#4a4a6a" stroke-width="1.5" class="muscle-zone" data-muscle="chest"/>
  <path d="M 78 112 Q 65 140 70 175 Q 80 178 92 175 Q 100 142 108 112 Z" fill="#1e1e32" stroke="#4a4a6a" stroke-width="1.5" class="muscle-zone" data-muscle="biceps"/>
  <path d="M 222 112 Q 235 140 230 175 Q 220 178 208 175 Q 200 142 192 112 Z" fill="#1e1e32" stroke="#4a4a6a" stroke-width="1.5" class="muscle-zone" data-muscle="biceps"/>
  <path d="M 78 112 Q 70 140 70 175" fill="none" stroke="#3a3a5a" stroke-width="2.5" class="muscle-zone" data-muscle="triceps" stroke-linecap="round"/>
  <path d="M 222 112 Q 230 140 230 175" fill="none" stroke="#3a3a5a" stroke-width="2.5" class="muscle-zone" data-muscle="triceps" stroke-linecap="round"/>
  <path d="M 108 155 Q 105 200 108 260 Q 130 268 150 268 Q 170 268 192 260 Q 195 200 193 155 Q 150 162 107 155 Z" fill="#1e1e32" stroke="#4a4a6a" stroke-width="1.5"/>
  <path d="M 115 162 Q 113 218 116 258 Q 135 266 150 266 Q 165 266 184 258 Q 187 218 185 162 Q 150 168 115 162 Z" fill="#1a1a2e" class="muscle-zone" data-muscle="abs"/>
  <path d="M 108 105 Q 150 100 192 105 Q 175 115 150 116 Q 125 115 108 105 Z" fill="#1a1a2e" stroke="#4a4a6a" stroke-width="1" class="muscle-zone" data-muscle="back"/>
  <path d="M 108 258 Q 95 275 100 300 L 200 300 Q 205 275 192 258 Z" fill="#252538" stroke="#4a4a6a" stroke-width="1.5"/>
  <path d="M 100 298 Q 90 340 93 390 Q 110 395 128 390 Q 135 342 148 302 Q 125 300 100 298 Z" fill="#1e1e32" stroke="#4a4a6a" stroke-width="1.5" class="muscle-zone" data-muscle="legs"/>
  <path d="M 200 298 Q 210 340 207 390 Q 190 395 172 390 Q 165 342 152 302 Q 175 300 200 298 Z" fill="#1e1e32" stroke="#4a4a6a" stroke-width="1.5" class="muscle-zone" data-muscle="legs"/>
  <path d="M 100 270 Q 92 295 100 298 Q 125 300 148 302" fill="#1a1a2e" class="muscle-zone" data-muscle="glutes"/>
  <path d="M 200 270 Q 208 295 200 298 Q 175 300 152 302" fill="#1a1a2e" class="muscle-zone" data-muscle="glutes"/>
  <path d="M 93 393 Q 90 490 93 490 Q 104 494 116 490 Q 128 443 128 393 Z" fill="#252538" stroke="#4a4a6a" stroke-width="1.2"/>
  <path d="M 207 393 Q 210 440 207 490 Q 196 494 184 490 Q 172 443 172 393 Z" fill="#252538" stroke="#4a4a6a" stroke-width="1.2"/>
  <ellipse cx="104" cy="500" rx="14" ry="10" fill="#252538" stroke="#4a4a6a" stroke-width="1"/>
  <ellipse cx="196" cy="500" rx="14" ry="10" fill="#252538" stroke="#4a4a6a" stroke-width="1"/>
  <ellipse cx="138" cy="50" rx="4" ry="5" fill="#3a3a5a" opacity="0.5"/>
  <ellipse cx="162" cy="50" rx="4" ry="5" fill="#3a3a5a" opacity="0.5"/>
  <path d="M 140 68 Q 150 74 160 68" fill="none" stroke="#3a3a5a" stroke-width="1.5"/>
</svg>`;
}
