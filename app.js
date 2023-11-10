const url =
  'https://en.wikipedia.org/w/api.php?action=query&list=search&srlimit=20&format=json&origin=*&srsearch=searchValue';

const form = document.querySelector('.form');
const input = document.querySelector('.form-input');
const results = document.querySelector('.results');

const fetchPages = async (data) => {
  console.log(data);
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
