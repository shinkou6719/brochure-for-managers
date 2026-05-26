/* ===== STATE ===== */
let activeFilters = {
  purpose: 'Все',
  lineup: 'Все',
  subtype: 'Все',
  search: '',
  onlyPriced: false
};

let currentProduct = null;

/* ===== INIT ===== */
document.addEventListener('DOMContentLoaded', () => {
  renderProducts(applyFilters());
  bindFilters();
  bindSearch();
  bindSidebar();
  bindBack();
});

/* ===== FILTER LOGIC ===== */
function applyFilters() {
  return products.filter(p => {
    if (activeFilters.purpose !== 'Все' && p.purpose !== activeFilters.purpose) return false;
    if (activeFilters.lineup !== 'Все' && p.lineup !== activeFilters.lineup) return false;
    if (activeFilters.subtype !== 'Все' && p.subtype !== activeFilters.subtype) return false;
    if (activeFilters.onlyPriced && !p.price) return false;
    if (activeFilters.search) {
      const q = activeFilters.search.toLowerCase();
      const haystack = [p.name, p.size, p.lineup, p.subtype, p.purpose].join(' ').toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });
}

function bindFilters() {
  // Purpose buttons
  document.querySelectorAll('#purposeFilters .filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      setActive('#purposeFilters', btn);
      activeFilters.purpose = btn.dataset.purpose;
      refresh();
    });
  });

  // Lineup buttons
  document.querySelectorAll('#lineupFilters .filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      setActive('#lineupFilters', btn);
      activeFilters.lineup = btn.dataset.lineup;
      refresh();
    });
  });

  // Subtype buttons
  document.querySelectorAll('#subtypeFilters .filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      setActive('#subtypeFilters', btn);
      activeFilters.subtype = btn.dataset.subtype;
      refresh();
    });
  });

  // Only priced toggle
  document.getElementById('onlyPriced').addEventListener('change', e => {
    activeFilters.onlyPriced = e.target.checked;
    refresh();
  });
}

function setActive(groupSelector, activeBtn) {
  document.querySelectorAll(`${groupSelector} .filter-btn`).forEach(b => b.classList.remove('active'));
  activeBtn.classList.add('active');
}

function bindSearch() {
  document.getElementById('searchInput').addEventListener('input', e => {
    activeFilters.search = e.target.value.trim();
    refresh();
  });
}

function refresh() {
  const filtered = applyFilters();
  renderProducts(filtered);
}

/* ===== RENDER LIST ===== */
function renderProducts(list) {
  const container = document.getElementById('productsContainer');
  container.innerHTML = '';

  const total = products.length;
  const priced = list.filter(p => p.price).length;
  document.getElementById('statsBar').textContent =
    `Показано: ${list.length} из ${total} проектов` +
    (list.length > 0 ? ` · ${priced} с ценой` : '');

  if (list.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="emoji">🔍</div>
        <h3>Ничего не найдено</h3>
        <p>Попробуйте изменить фильтры или поисковый запрос</p>
      </div>`;
    return;
  }

  list.forEach((product, i) => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.style.animationDelay = `${Math.min(i * 0.04, 0.3)}s`;

    const badges = buildBadges(product);
    const priceHtml = product.price
      ? `<div class="card-price">${formatPrice(product.price)} ₽</div>`
      : `<div class="card-price-none">Цена по запросу</div>`;

    card.innerHTML = `
      <div class="card-badges">${badges}</div>
      <div class="card-name">${escHtml(product.name)}</div>
      <div class="card-meta">
        <div class="card-meta-row">
          <span class="meta-label">Размер</span>
          <span class="meta-value">${escHtml(product.size)} м</span>
        </div>
        <div class="card-meta-row">
          <span class="meta-label">Линейка</span>
          <span class="meta-value">${escHtml(product.lineup)}</span>
        </div>
        ${product.subtype ? `<div class="card-meta-row">
          <span class="meta-label">Вариант</span>
          <span class="meta-value">${escHtml(product.subtype)}</span>
        </div>` : ''}
      </div>
      <div class="card-footer">
        ${priceHtml}
        <div class="card-arrow">
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M8 5l7 5-7 5"/>
          </svg>
        </div>
      </div>`;

    card.addEventListener('click', () => openDetail(product));
    container.appendChild(card);
  });
}

/* ===== RENDER DETAIL ===== */
function openDetail(product) {
  currentProduct = product;
  window.scrollTo({ top: 0, behavior: 'smooth' });

  document.getElementById('listView').classList.add('hidden');
  const detailView = document.getElementById('detailView');
  detailView.classList.remove('hidden');

  const kit = kits[product.kitType] || {};
  const kitRows = Object.entries(kit).map(([k, v]) =>
    `<div class="kit-row">
      <div class="kit-row-label">${escHtml(k)}</div>
      <div class="kit-row-value">${escHtml(v)}</div>
    </div>`
  ).join('');

  const optionsHtml = options.map(opt =>
    `<label class="option-item" onclick="toggleOption(this, ${product.price || 0})">
      <input type="checkbox" value="${opt.price}">
      <div class="option-check">
        <svg viewBox="0 0 12 12" fill="none" stroke="currentColor">
          <path d="M2 6l3 3 5-5"/>
        </svg>
      </div>
      <span class="option-name">${escHtml(opt.name)}</span>
      <span class="option-price">+${formatPrice(opt.price)} ₽</span>
    </label>`
  ).join('');

  const priceSection = product.price
    ? `<div class="price-block">
        <div>
          <div class="price-block-label">Итоговая стоимость</div>
          <div>
            <span class="price-total" id="finalPrice">${formatPrice(product.price)}</span>
            <span class="price-currency"> ₽</span>
          </div>
          <div class="price-note">Базовая цена + выбранные опции</div>
        </div>
        <div class="price-cta">
          <button class="btn-primary" onclick="copyPrice()">Скопировать стоимость</button>
          <button class="btn-secondary" onclick="window.print()">Печать</button>
        </div>
      </div>`
    : `<div class="price-block">
        <div>
          <div class="price-block-label">Стоимость</div>
          <div style="font-size:20px; color: var(--text-mid); font-style: italic; margin-top:4px;">Цена уточняется — свяжитесь с нами</div>
        </div>
      </div>`;

  document.getElementById('detailContent').innerHTML = `
    <div class="detail-header">
      <div class="detail-badges">${buildBadges(product)}</div>
      <div class="detail-title">${escHtml(product.name)}</div>
      <div class="detail-grid">
        ${product.price ? `<div class="detail-stat">
          <div class="detail-stat-label">Цена от</div>
          <div class="detail-stat-value big">${formatPrice(product.price)} ₽</div>
        </div>` : ''}
        <div class="detail-stat">
          <div class="detail-stat-label">Размер</div>
          <div class="detail-stat-value">${escHtml(product.size)} м</div>
        </div>
        <div class="detail-stat">
          <div class="detail-stat-label">Назначение</div>
          <div class="detail-stat-value">${escHtml(product.purpose)}</div>
        </div>
        <div class="detail-stat">
          <div class="detail-stat-label">Линейка</div>
          <div class="detail-stat-value">${escHtml(product.lineup)}</div>
        </div>
        ${product.subtype ? `<div class="detail-stat">
          <div class="detail-stat-label">Комплектация</div>
          <div class="detail-stat-value">${escHtml(product.subtype)}</div>
        </div>` : ''}
      </div>
    </div>

    <div class="detail-sections">
      ${Object.keys(kit).length > 0 ? `
      <div class="detail-section">
        <div class="section-head">
          <span class="section-icon">🪵</span>
          <span class="section-title">Комплектация — ${escHtml(product.kitType || '')}</span>
        </div>
        <div class="section-body">
          <div class="kit-table">${kitRows}</div>
        </div>
      </div>` : ''}

      <div class="detail-section">
        <div class="section-head">
          <span class="section-icon">✨</span>
          <span class="section-title">Дополнительные опции</span>
        </div>
        <div class="section-body">
          <div class="options-list">${optionsHtml}</div>
        </div>
      </div>
    </div>

    ${priceSection}
  `;
}

function bindBack() {
  document.getElementById('backBtn').addEventListener('click', () => {
    document.getElementById('detailView').classList.add('hidden');
    document.getElementById('listView').classList.remove('hidden');
    currentProduct = null;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ===== OPTIONS CALC ===== */
function toggleOption(label, basePrice) {
  label.classList.toggle('checked');
  if (!basePrice) return;
  const checkboxes = document.querySelectorAll('.option-item input[type="checkbox"]');
  let total = basePrice;
  checkboxes.forEach(cb => { if (cb.closest('.option-item').classList.contains('checked')) total += Number(cb.value); });
  const el = document.getElementById('finalPrice');
  if (el) el.textContent = formatPrice(total);
}

function copyPrice() {
  const el = document.getElementById('finalPrice');
  if (!el || !currentProduct) return;
  const text = `${currentProduct.name} — ${el.textContent} ₽`;
  navigator.clipboard.writeText(text).then(() => {
    const btn = document.querySelector('.btn-primary');
    const orig = btn.textContent;
    btn.textContent = '✓ Скопировано!';
    setTimeout(() => { btn.textContent = orig; }, 2000);
  });
}

/* ===== SIDEBAR MOBILE ===== */
function bindSidebar() {
  const toggle = document.getElementById('sidebarToggle');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('overlay');

  toggle.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    overlay.classList.toggle('visible');
  });

  overlay.addEventListener('click', () => {
    sidebar.classList.remove('open');
    overlay.classList.remove('visible');
  });
}

/* ===== HELPERS ===== */
function formatPrice(n) {
  return Number(n).toLocaleString('ru-RU');
}

function escHtml(str) {
  if (!str) return '';
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function buildBadges(product) {
  let html = '';
  html += `<span class="badge badge-purpose">${escHtml(product.purpose)}</span>`;
  if (product.condition) {
    if (product.condition.includes('до июня') || product.condition.includes('цена')) {
      html += `<span class="badge badge-promo">🔥 ${escHtml(product.condition)}</span>`;
    } else if (product.condition.includes('подарок')) {
      html += `<span class="badge badge-gift">🎁 ${escHtml(product.condition)}</span>`;
    } else if (product.condition.includes('Новый')) {
      html += `<span class="badge badge-new">★ ${escHtml(product.condition)}</span>`;
    } else {
      html += `<span class="badge badge-promo">${escHtml(product.condition)}</span>`;
    }
  }
  return html;
}