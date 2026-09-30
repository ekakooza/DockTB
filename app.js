const toast = document.getElementById('toast');
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
}

const facilityDirectory = [
  { region: 'Lango', district: 'Alebtong District', facility: 'Alanyi Health Centre IV' },
  { region: 'Lango', district: 'Alebtong District', facility: 'Aloi Mission Health Centre III' },
  { region: 'Lango', district: 'Amolatar District', facility: 'Namasale Health Centre III' },
  { region: 'Lango', district: 'Dokolo District', facility: 'Bata Health Centre III' },
  { region: 'Lango', district: 'Dokolo District', facility: 'Kangai Health Centre III' },
  { region: 'Lango', district: 'Kwania District', facility: 'Nambieso Health Centre III' },
  { region: 'Lango', district: 'Lira City', facility: 'Ayago Health Centre III' },
  { region: 'Lango', district: 'Lira District', facility: 'Barr Health Centre III' },
  { region: 'Lango', district: 'Otuke District', facility: 'Aliwang Health Centre III' },
  { region: 'Lango', district: 'Otuke District', facility: 'Barjobi Health Centre III' },
  { region: 'Lango', district: 'Otuke District', facility: 'Okwang Health Centre III' },
  { region: 'Lango', district: 'Otuke District', facility: 'Okwongo Health Centre III' },
  { region: 'Lango', district: 'Oyam District', facility: 'Minakulu Health Centre III' },
  { region: 'Lango', district: 'Oyam District', facility: 'Otwal Health Centre III' },
  { region: 'North Buganda', district: 'Luwero District', facility: 'Zirobwe Health Centre III' },
  { region: 'South Buganda', district: 'Kalungu District', facility: 'Kyamulibwa Health Centre III' },
  { region: 'South Buganda', district: 'Sembabule District', facility: 'Ntuusi Health Centre IV' },
  { region: 'South Buganda', district: 'Wakiso District', facility: 'Nabweru Health Centre III' },
  { region: 'West Nile', district: 'Adjumani District', facility: 'Adjumani Mission Health Centre III' },
  { region: 'West Nile', district: 'Adjumani District', facility: 'Ukusijoni Health Centre III' },
  { region: 'West Nile', district: 'Arua City', facility: 'Adumi Health Centre IV' },
  { region: 'West Nile', district: 'Arua District', facility: 'Vurra Health Centre III' },
  { region: 'West Nile', district: 'Madi-Okollo District', facility: 'Ewanga Health Centre III' },
  { region: 'West Nile', district: 'Madi-Okollo District', facility: 'Oduobu Health Centre II' },
  { region: 'West Nile', district: 'Madi-Okollo District', facility: 'Okollo Health Centre III' },
  { region: 'West Nile', district: 'Maracha District', facility: 'Eliofe Health Centre III' },
  { region: 'West Nile', district: 'Nebbi District', facility: 'Kucwiny Health Centre III' },
  { region: 'West Nile', district: 'Nebbi District', facility: 'Nyaravur Health Centre III' },
  { region: 'West Nile', district: 'Obongi District', facility: 'Belle Health Centre III' },
  { region: 'West Nile', district: 'Obongi District', facility: 'Idiwa Health Centre III' },
  { region: 'West Nile', district: 'Pakwach District', facility: 'Panyimur Health Centre III' },
  { region: 'West Nile', district: 'Terego District', facility: 'Widi (Omugo Extention) Health Centre III' },
  { region: 'West Nile', district: 'Yumbe District', facility: 'Ariwa Health Centre III' },
  { region: 'West Nile', district: 'Yumbe District', facility: 'Barakala Health Centre III' },
  { region: 'West Nile', district: 'Yumbe District', facility: 'Bolomoni Health Centre III' },
  { region: 'West Nile', district: 'Yumbe District', facility: 'Dramba Health Centre III' },
  { region: 'West Nile', district: 'Yumbe District', facility: 'Kei Health Centre III' },
  { region: 'West Nile', district: 'Yumbe District', facility: 'Kerwa Health Centre III' },
  { region: 'West Nile', district: 'Yumbe District', facility: 'Lodonga Health Centre IV' },
  { region: 'West Nile', district: 'Zombo District', facility: 'Zumbo Health Centre III' }
];

const unique = (values) => Array.from(new Set(values));
const top5Metrics = [
  { facility: 'Lodonga Health Centre IV', region: 'West Nile', district: 'Yumbe District', enrolled: 136, positivity: 24 },
  { facility: 'Adumi Health Centre IV', region: 'West Nile', district: 'Arua City', enrolled: 121, positivity: 21 },
  { facility: 'Namasale Health Centre III', region: 'Lango', district: 'Amolatar District', enrolled: 109, positivity: 18 },
  { facility: 'Nabweru Health Centre III', region: 'South Buganda', district: 'Wakiso District', enrolled: 96, positivity: 17 },
  { facility: 'Alanyi Health Centre IV', region: 'Lango', district: 'Alebtong District', enrolled: 88, positivity: 15 }
];
const regionFilter = document.getElementById('regionFilter');
const districtFilter = document.getElementById('districtFilter');
const centreFilter = document.getElementById('centreFilter');
const dateFilter = document.getElementById('dateFilter');

function fillSelect(select, placeholder, values) {
  select.innerHTML = '';
  select.append(new Option(placeholder, placeholder));
  values.forEach((value) => select.append(new Option(value, value)));
}

function selectedScope() {
  return {
    region: regionFilter.value,
    district: districtFilter.value,
    facility: centreFilter.value
  };
}

function refreshDistricts() {
  const region = regionFilter.value;
  const districts = facilityDirectory
    .filter((row) => region === 'All regions' || row.region === region)
    .map((row) => row.district);
  fillSelect(districtFilter, 'All districts', unique(districts));
}

function refreshFacilities() {
  const { region, district } = selectedScope();
  const facilities = facilityDirectory
    .filter((row) => (region === 'All regions' || row.region === region) && (district === 'All districts' || row.district === district))
    .map((row) => row.facility);
  fillSelect(centreFilter, 'All facilities', facilities);
}

function scopeLabel() {
  const { region, district, facility } = selectedScope();
  if (facility !== 'All facilities') return facility;
  if (district !== 'All districts') return district;
  if (region !== 'All regions') return region;
  return 'All Uganda';
}

function renderTopFive() {
  const list = document.querySelector('.top5-list');
  const { region, district, facility } = selectedScope();
  const visible = getFilteredStats().sort((a, b) => b.enrolled - a.enrolled).slice(0, 5);
  if (!visible.length) {
    list.innerHTML = '<div class="comparison-empty">No facility records match the selected filters.</div>';
    return;
  }
  const max = Math.max(...visible.map((row) => row.enrolled));
  list.innerHTML = visible.map((row, index) => `
    <div class="top5-row"><span class="rank-badge ${index === 0 ? 'first' : ''}">${String(index + 1).padStart(2, '0')}</span><div class="top5-copy"><strong>${row.facility}</strong><span>${row.region} · ${row.district}</span><div class="top5-track"><i style="width:${Math.round((row.enrolled / max) * 100)}%"></i></div></div><div class="top5-metric"><strong>${row.enrolled.toLocaleString()}</strong><span>${row.positivity}% pos.</span></div></div>
  `).join('');
}

/* The dashboard uses a normalized in-browser data model so every visible metric is derived
   from the same records. Replace this seed with the API response when the backend is connected. */
const monthlySeed = [
  { month: 'Jan', enrolled: 102, positive: 17, treated: 15 }, { month: 'Feb', enrolled: 118, positive: 20, treated: 18 },
  { month: 'Mar', enrolled: 136, positive: 23, treated: 21 }, { month: 'Apr', enrolled: 145, positive: 25, treated: 23 },
  { month: 'May', enrolled: 153, positive: 27, treated: 25 }, { month: 'Jun', enrolled: 174, positive: 31, treated: 28 },
  { month: 'Jul', enrolled: 186, positive: 34, treated: 31 }, { month: 'Aug', enrolled: 203, positive: 36, treated: 33 },
  { month: 'Sep', enrolled: 129, positive: 23, treated: 21 }, { month: 'Oct', enrolled: 102, positive: 18, treated: 17 }
];

const facilityStats = facilityDirectory.map((row, index) => {
  const enrolled = 18 + ((index * 17) % 47);
  const positive = Math.max(3, Math.round(enrolled * (0.12 + (index % 5) * 0.025)));
  const treated = Math.max(positive - (index % 3), Math.round(positive * 0.88));
  return { ...row, enrolled, tested: Math.round(enrolled * 0.81), positive, treated, positivity: Math.round((positive / enrolled) * 100) };
});

function getDateStart() {
  return ({ '01 Apr — present': 3, '01 Jul — present': 6, '01 Sep — present': 8, '01 Jan — present': 0 })[dateFilter.value] ?? 0;
}

function getFilteredStats() {
  const { region, district, facility } = selectedScope();
  return facilityStats.filter((row) =>
    (region === 'All regions' || row.region === region) &&
    (district === 'All districts' || row.district === district) &&
    (facility === 'All facilities' || row.facility === facility)
  );
}

function sum(rows, key) { return rows.reduce((total, row) => total + row[key], 0); }
function formatNumber(value) { return Math.round(value).toLocaleString(); }
function pct(value, denominator) { return denominator ? `${((value / denominator) * 100).toFixed(1)}%` : '0.0%'; }

function renderLineChart(months) {
  const svg = document.getElementById('trendChart');
  const width = 720; const baseY = 230; const left = 54; const right = 700; const top = 22;
  const max = Math.max(...months.map((row) => row.enrolled), 1);
  const x = (index) => left + ((right - left) * index / Math.max(months.length - 1, 1));
  const y = (value) => baseY - ((baseY - top) * value / max);
  const points = months.map((row, index) => `${x(index)},${y(row.enrolled)}`).join(' ');
  const area = `${left},${baseY} ${points} ${right},${baseY}`;
  const grid = [0, .25, .5, .75, 1].map((ratio) => `<line x1="${left}" y1="${y(max * ratio)}" x2="${right}" y2="${y(max * ratio)}"/>`).join('');
  const dots = months.map((row, index) => `<circle cx="${x(index)}" cy="${y(row.enrolled)}" r="4"/>`).join('');
  const labels = months.map((row, index) => `<text x="${x(index) - 8}" y="248">${row.month}</text>`).join('');
  svg.innerHTML = `<g class="chart-grid-lines">${grid}</g><g class="chart-y-labels"><text x="14" y="26">${formatNumber(max)}</text><text x="20" y="78">${formatNumber(max * .75)}</text><text x="20" y="130">${formatNumber(max * .5)}</text><text x="27" y="182">${formatNumber(max * .25)}</text><text x="31" y="234">0</text></g><polygon class="area-path" points="${area}"/><polyline class="line-path" points="${points}"/><g class="chart-dots">${dots}</g><g class="chart-x-labels">${labels}</g>`;
  svg.setAttribute('aria-label', `Dynamic line chart showing ${formatNumber(sum(months, 'enrolled'))} registrations by month`);
}

function renderMonthlyChart(months) {
  const max = Math.max(...months.flatMap((row) => [row.enrolled, row.positive, row.treated]), 1);
  const columns = document.getElementById('monthlyColumns');
  columns.innerHTML = months.map((row) => `<div class="month-column"><div class="month-bars"><i class="monthly-bar enrolled" style="height:${(row.enrolled / max) * 100}%"></i><i class="monthly-bar positive" style="height:${(row.positive / max) * 100}%"></i><i class="monthly-bar treated" style="height:${(row.treated / max) * 100}%"></i></div><span>${row.month}</span></div>`).join('');
}

function renderActivity(rows) {
  const tableBody = document.querySelector('.activity-panel tbody');
  const visible = rows.slice().sort((a, b) => b.enrolled - a.enrolled).slice(0, 4);
  tableBody.innerHTML = visible.map((row, index) => `<tr><td><strong>DTB-${String(1048 - index).padStart(4, '0')}</strong></td><td><span class="facility"><span class="facility-avatar">${row.facility.split(' ').map((word) => word[0]).slice(0, 2).join('')}</span>${row.facility}</span></td><td><span class="register-pill ${index % 2 ? 'treatment' : 'lab'}">${index % 2 ? 'Treatment 009' : 'Lab 010'}</span></td><td>${index % 2 ? 'Treatment started' : 'Diagnostic result added'}</td><td>${8 + index * 8} min ago</td><td><span class="status-pill ${index === 2 ? 'review-pill' : 'success-pill'}"><i></i>${index === 2 ? 'Review' : 'Complete'}</span></td></tr>`).join('');
}

function renderDashboard() {
  const rows = getFilteredStats();
  const start = getDateStart();
  const months = monthlySeed.slice(start);
  const enrolled = sum(rows, 'enrolled');
  const presumptive = Math.round(enrolled * .865);
  const tested = sum(rows, 'tested');
  const positive = sum(rows, 'positive');
  const treated = sum(rows, 'treated');
  document.getElementById('kpiEnrolled').textContent = formatNumber(enrolled);
  document.getElementById('kpiPresumptive').textContent = formatNumber(presumptive);
  document.getElementById('kpiPositive').textContent = formatNumber(positive);
  document.getElementById('kpiTreated').textContent = formatNumber(treated);
  document.getElementById('kpiPositivity').textContent = `positivity ${pct(positive, presumptive)}`;
  document.getElementById('kpiConversion').textContent = `${pct(treated, positive)} conversion`;
  document.getElementById('cascadePresumptive').textContent = formatNumber(presumptive);
  document.getElementById('cascadePresumptivePct').textContent = '100%';
  document.getElementById('cascadeTested').textContent = formatNumber(tested);
  document.getElementById('cascadeTestedPct').textContent = pct(tested, presumptive);
  document.getElementById('cascadePositive').textContent = formatNumber(positive);
  document.getElementById('cascadePositivePct').textContent = pct(positive, presumptive);
  document.getElementById('cascadeTreated').textContent = formatNumber(treated);
  document.getElementById('cascadeTreatedPct').textContent = pct(treated, presumptive);
  document.getElementById('cascadeTestedRate').textContent = pct(tested, presumptive);
  document.getElementById('cascadePositiveRate').textContent = pct(positive, tested);
  document.getElementById('cascadeTreatmentRate').textContent = pct(treated, positive);
  document.getElementById('trendTotal').textContent = formatNumber(sum(months, 'enrolled'));
  document.getElementById('monthlyEnrolled').textContent = formatNumber(sum(months, 'enrolled'));
  document.getElementById('monthlyPositive').textContent = formatNumber(sum(months, 'positive'));
  document.getElementById('monthlyTreated').textContent = formatNumber(sum(months, 'treated'));
  renderLineChart(months);
  renderMonthlyChart(months);
  renderTopFive();
  renderActivity(rows);
}

fillSelect(regionFilter, 'All regions', unique(facilityDirectory.map((row) => row.region)));
refreshDistricts();
refreshFacilities();
renderDashboard();

const navItems = document.querySelectorAll('.nav-item');
navItems.forEach((item) => {
  item.addEventListener('click', () => {
    navItems.forEach((nav) => nav.classList.remove('active'));
    item.classList.add('active');
    const label = item.dataset.nav;
    if (label !== 'Overview') showToast(`${label} view is ready for the next release.`);
  });
});

const tabButtons = document.querySelectorAll('.tab-button');
const sectionTitle = document.querySelector('.section-header h2');
const sectionHelper = document.querySelector('.section-header p');
const tabCopy = {
  registration: {
    title: 'From presumptive to treatment',
    helper: 'Track cohort movement across the four core register milestones.'
  },
  diagnostics: {
    title: 'How the cohort is being confirmed',
    helper: 'Compare diagnostic yield across conventional and NPOC modalities.'
  },
  treatment: {
    title: 'Treatment initiation at a glance',
    helper: 'Monitor confirmed cases moving into the treatment register.'
  }
};
tabButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const tab = button.dataset.tab;
    tabButtons.forEach((tabButton) => {
      const active = tabButton === button;
      tabButton.classList.toggle('active', active);
      tabButton.setAttribute('aria-selected', String(active));
    });
    sectionTitle.textContent = tabCopy[tab].title;
    sectionHelper.textContent = tabCopy[tab].helper;
    showToast(`${button.textContent.trim()} selected`);
  });
});

regionFilter.addEventListener('change', () => {
  refreshDistricts();
  refreshFacilities();
  renderDashboard();
  showToast(`Dashboard filtered to ${scopeLabel()}`);
});

districtFilter.addEventListener('change', () => {
  refreshFacilities();
  renderDashboard();
  showToast(`Dashboard filtered to ${scopeLabel()}`);
});

centreFilter.addEventListener('change', () => {
  renderDashboard();
  showToast(`Dashboard filtered to ${scopeLabel()}`);
});
dateFilter.addEventListener('change', () => {
  renderDashboard();
  showToast(`Date range updated: ${dateFilter.value}`);
});

document.getElementById('exportButton').addEventListener('click', () => {
  const { region, district, facility } = selectedScope();
  const filteredFacilities = facilityDirectory.filter((row) =>
    (region === 'All regions' || row.region === region) &&
    (district === 'All districts' || row.district === district) &&
    (facility === 'All facilities' || row.facility === facility)
  );
  const rows = [
    ['Region', 'District', 'Health facility', 'Date range'],
    ...filteredFacilities.map((row) => [row.region, row.district, row.facility, dateFilter.value])
  ];
  const csv = rows.map((row) => row.map((cell) => `"${cell.replaceAll('"', '""')}"`).join(',')).join('\n');
  const link = document.createElement('a');
  link.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
  link.download = 'dock-tb-uganda-filtered-facilities.csv';
  link.click();
  URL.revokeObjectURL(link.href);
  showToast(`${filteredFacilities.length} filtered facilities exported as CSV`);
});

document.getElementById('viewAllButton').addEventListener('click', () => {
  document.querySelector('.activity-panel').scrollIntoView({ behavior: 'smooth', block: 'start' });
  showToast('Showing the latest activity records');
});

document.getElementById('qualityButton').addEventListener('click', () => {
  document.getElementById('quality').scrollIntoView({ behavior: 'smooth', block: 'center' });
  showToast('Quality centre opened');
});
