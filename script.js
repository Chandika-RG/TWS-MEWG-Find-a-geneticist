const sheetURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSqUNyAiN6LQNXDOEKyzLECwPs1GUCFDUJlOopC6Fed3qBpir9MTctGOq9boRKIndSSxBrMvWtY4TK2/gviz/tq?tqx=out:json';

fetch(sheetURL)
  .then(res => res.text())
  .then(data => {
    const json = JSON.parse(data.substr(47).slice(0, -2));
    const rows = json.table.rows;
    const container = document.getElementById('geneticists');

    rows.forEach(row => {
      const cells = row.c;
      const name = cells[0]?.v || 'N/A';
      const email = cells[1]?.v || 'N/A';
      const institution = cells[2]?.v || 'N/A';
      const expertise = cells[3]?.v || 'N/A';

      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <h3>${name}</h3>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Institution:</strong> ${institution}</p>
        <p><strong>Expertise:</strong> ${expertise}</p>
      `;
      container.appendChild(card);
    });
  });
