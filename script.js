const cards = [...document.querySelectorAll('.project-card')];
const filters = [...document.querySelectorAll('[data-filter]')];
const search = document.querySelector('#project-search');
let category = 'all';
function applyFilters() {
  const query = search.value.trim().toLocaleLowerCase();
  let count = 0;
  for (const card of cards) {
    const visible =
      (category === 'all' || card.dataset.category === category) &&
      `${card.dataset.keywords} ${card.textContent}`.toLocaleLowerCase().includes(query);
    card.hidden = !visible;
    if (visible) count++;
  }
  document.querySelector('#no-results').hidden = count !== 0;
  document.querySelector('#filter-status').textContent =
    `${count} project${count === 1 ? '' : 's'} shown.`;
}
for (const button of filters)
  button.addEventListener('click', () => {
    category = button.dataset.filter;
    for (const f of filters) f.setAttribute('aria-pressed', String(f === button));
    applyFilters();
  });
search.addEventListener('input', applyFilters);
document.querySelector('#year').textContent = String(new Date().getFullYear());
