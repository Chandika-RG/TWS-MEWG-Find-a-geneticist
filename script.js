const sheetURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSqUNyAiN6LQNXDOEKyzLECwPs1GUCFDUJlOopC6Fed3qBpir9MTctGOq9boRKIndSSxBrMvWtY4TK2/gviz/tq?tqx=out:json';

fetch(sheetURL)
  .then(res => res.text())
  .then(text => {
    const json = JSON.parse(text.substring(47, text.length - 2));
    const rows = json.table.rows;
    const container = document.getElementById('geneticists');
    container.innerHTML = '';

    rows.forEach((row, index) => {
      if (index === 0) return; // skip header row
      const c = row.c;

      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <h3>${c[0]?.v || 'No Name'}</h3>
        <p><strong>Email:</strong> ${c[1]?.v || ''}</p>
        <p><strong>Phone:</strong> ${c[2]?.v || ''}</p>
        <p><strong>Affiliation:</strong> ${c[3]?.v || ''}</p>
        <p><strong>Title:</strong> ${c[4]?.v || ''}</p>
        <p><strong>Website:</strong> ${c[5]?.v ? `<a href="${c[5].v}" target="_blank">${c[5].v}</a>` : ''}</p>
        <p><strong>Taxon Expertise:</strong> ${c[6]?.v || ''}</p>
        <p><strong>Subject Matter:</strong> ${c[7]?.v || ''}</p>
        <p><strong>Data & Analytics Expertise:</strong> ${c[8]?.v || ''}</p>
      `;
      container.appendChild(card);
    });
  })
  .catch(error => console.error('Error fetching or parsing data:', error));
