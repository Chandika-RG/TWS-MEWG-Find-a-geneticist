const sheetURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSqUNyAiN6LQNXDOEKyzLECwPs1GUCFDUJlOopC6Fed3qBpir9MTctGOq9boRKIndSSxBrMvWtY4TK2/gviz/tq?gid=174092188&tqx=out:json';

let dataRows = [];

function fetchData() {
  fetch(sheetURL)
    .then(res => res.text())
    .then(text => {
      const json = JSON.parse(text.substring(47).slice(0, -2)); // strip Google Sheets JSON wrapper
      dataRows = json.table.rows;
      renderCards(dataRows);
    })
    .catch(err => {
      console.error("Error fetching data:", err);
    });
}

function renderCards(rows) {
  const container = document.getElementById('geneticists');
  container.innerHTML = '';

  if (!rows || rows.length === 0) {
    container.innerHTML = '<p>No data available. Please check the Google Sheet.</p>';
    return;
  }

  rows.forEach((row) => {
    const cells = row.c;
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <h3>${cells[0]?.v || 'No Name'}</h3>
      <p><strong>Email:</strong> ${cells[1]?.v || ''}</p>
      <p><strong>Institution:</strong> ${cells[2]?.v || ''}</p>
      <p><strong>Expertise:</strong> ${cells[3]?.v || ''}</p>
      <p><strong>Location:</strong> ${cells[4]?.v || ''}</p>
    `;
    container.appendChild(card);
  });
}

fetchData();
