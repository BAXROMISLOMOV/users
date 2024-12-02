const API_URL = 'https://restcountries.com/v3.1';
const countryDetailsContainer = document.getElementById('countryDetailsContainer');
const countryName = document.getElementById('countryName');
const backBtn = document.getElementById('backBtn');

const countryCode = localStorage.getItem('countryCode');

async function fetchCountryDetails() {
  const response = await fetch(`${API_URL}/alpha/${countryCode}`);
  const [country] = await response.json();

  const neighbors = country.borders ? country.borders.map(border => `
    <button class="neighbor" data-country="${border}">${border}</button>
  `).join('') : 'No neighboring countries';

  countryDetailsContainer.innerHTML = `
    <h2>${country.name.common}</h2>
    <img src="${country.flags.png}" alt="${country.name.common} Flag">
    <p><strong>Region:</strong> ${country.region}</p>
    <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
    <p><strong>Capital:</strong> ${country.capital}</p>
    <h3>Neighboring Countries:</h3>
    ${neighbors}
  `;

  document.querySelectorAll('.neighbor').forEach(btn => {
    btn.addEventListener('click', (e) => {
      localStorage.setItem('countryCode', e.target.dataset.country);
      window.location.href = 'COUNTRYDATA.html';
    });
  });

  countryName.textContent = country.name.common;
}

backBtn.addEventListener('click', () => {
  window.location.href = 'index.html';
});

fetchCountryDetails();
