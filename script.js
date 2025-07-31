// Use your actual published Google Sheet tab's GID if needed
const sheetURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSqUNyAiN6LQNXDOEKyzLECwPs1GUCFDUJlOopC6Fed3qBpir9MTctGOq9boRKIndSSxBrMvWtY4TK2/gviz/tq?gid=174092188&tqx=out:json';

async function fetchData() {
  try {
    const res = await fetch(sheetURL);
    const text = await res.text();

    // Strip the Google wrapper to get pure JSON
    const json = JSON.parse(text.substring(47).slice(0, -2));
    const rows = json.table.rows;

    renderCards(rows);
  } catch (err) {
    console.error('Error loading or parsing Google Sheet data:', err);
    document.getElementById('geneticists').innerHTML =
      '<p>Error loading data. Please check the sheet URL and CORS settings.</p>';
  }
}

function renderCards(rows) {
  const container = document.getElementById('geneticists');
  container.innerHTML = '';

  if (!rows || rows.length === 0) {
    container.innerHTML = '<p>No members found. Please add entries in the Google Sheet.</p>';
    return;
  }

  rows.forEach((row) => {
    const cells = row.c || [];
    const name        = cells[0]?.v || 'No Name';
    const email       = cells[1]?.v || '—';
    const role        = cells[2]?.v || '—';
    const institution = cells[3]?.v || '—';
    const location    = cells[4]?.v || '—';

    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <h3>${name}</h3>
      <p><strong>Role:</strong> ${role}</p>
      <p><strong>Institution:</strong> ${institution}</p>
      <p><strong>Location:</strong> ${location}</p>
      <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
    `;
    container.appendChild(card);
  });
}

// Kick off data load on page ready
document.addEventListener('DOMContentLoaded', fetchData);

fetchData();
