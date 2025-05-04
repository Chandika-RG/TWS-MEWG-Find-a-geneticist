const sheetURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSqUNyAiN6LQNXDOEKyzLECwPs1GUCFDUJlOopC6Fed3qBpir9MTctGOq9boRKIndSSxBrMvWtY4TK2/gviz/tq?tqx=out:json';

let dataRows = [];

function fetchData() {
  fetch(sheetURL)
    .then(res => res.text())
    .then(data => {
      const json = JSON.parse(data.substr(47).slice(0, -2));
      dataRows = json.table.rows;
      renderCards(dataRows);
      initializeMap(dataRows);
    });
}

function renderCards(rows) {
  const container = document.getElementById('geneticists');
  container.innerHTML = '';
  rows.forEach(row => {
    const cells = row.c;
    const name = cells[0]?.v || 'N/A';
    const email = cells[1]?.v || 'N/A';
    const institution = cells[2]?.v || 'N/A';
    const expertise = cells[3]?.v || 'N/A';
    const location = cells[4]?.v || '';

    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <h3>${name}</h3>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Institution:</strong> ${institution}</p>
      <p><strong>Expertise:</strong> ${expertise}</p>
      <p><strong>Location:</strong> ${location}</p>
    `;
    container.appendChild(card);
  });
}

function initializeMap(rows) {
  const map = L.map('map').setView([39.8283, -98.5795], 4); // Center of the US

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  rows.forEach(row => {
    const cells = row.c;
    const name = cells[0]?.v || 'N/A';
    const location = cells[4]?.v || '';

    if (location) {
      // Simple geocoding using Nominatim
      fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`)
        .then(res => res.json())
        .then(data => {
          if (data && data.length > 0) {
            const lat = data[0].lat;
            const lon = data[0].lon;
            L.marker([lat, lon]).addTo(map)
              .bindPopup(`<strong>${name}</strong><br>${location}`);
          }
        });
    }
  });
}

document.getElementById('search').addEventListener('input', function() {
  const query = this.value.toLowerCase();
  const filtered = dataRows.filter(row => {
    return row.c.some(cell => cell?.v?.toString().toLowerCase().includes(query));
  });
  renderCards(filtered);
});

document.getElementById('sort').addEventListener('change', function() {
  const colIndex = parseInt(this.value);
  if (!isNaN(colIndex)) {
    dataRows.sort((a, b) => {
      const valA = a.c[colIndex]?.v?.toLowerCase() || '';
      const valB = b.c[colIndex]?.v?.toLowerCase() || '';
      return valA.localeCompare(valB);
    });
    renderCards(dataRows);
  }
});

fetchData();
