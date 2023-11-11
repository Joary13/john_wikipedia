const url =
  'https://en.wikipedia.org/w/api.php?action=query&list=search&srlimit=20&format=json&origin=*&srsearch=';

const form = document.querySelector('.form');
const input = document.querySelector('.form-input');
const results = document.querySelector('.results');

const renderResults = (data) => {
  const html = data
    .map(({ snippet, title, pageid }) => {
      return `<a href="http://en.wikipedia.org/?curid=${pageid}" target="_blank">
            <h4>${title}</h4>
            <p>
              ${snippet}
            </p>
          </a>`;
    })
    .join('');
  results.innerHTML = `<div class="articles">${html}</div>`;
};

const fetchPages = async (value) => {
  results.innerHTML = "<div class='loading'></div>";
  try {
    const urlcomplete = `${url}${value}`;
    console.log(urlcomplete);
    const response = await fetch(urlcomplete);
    if (response.ok === false) throw new Error('url problem');
    const data = await response.json();
    const results = data.query.search;
    if (results.length < 1) {
      results.innerHTML = `<div class='error'>No matching result please try again</div>`;
      return;
    }
    renderResults(results);
  } catch (err) {
    results.innerHTML = `<div class='error'>il y a une erreur: ${err}</div>`;
  }
};
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const value = input.value;
  if (value === '') {
    results.innerHTML =
      "<div class='error'>erreur le champ n'est pas rempli</div>";
    return;
  }
  fetchPages(value);
});
