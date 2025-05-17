const sheetURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSqUNyAiN6LQNXDOEKyzLECwPs1GUCFDUJlOopC6Fed3qBpir9MTctGOq9boRKIndSSxBrMvWtY4TK2/gviz/tq?tqx=out:json';

fetch(sheetURL)
  .then(res => res.text())
  .then(text => {
    const json = JSON.parse(text.substring(47, text.length - 2));
    const rows = json.table.rows;
    const container = document.getElementById('geneticists');
    container.innerHTML = '';

    rows.forEach(row => {
      const c = row.c;

      // Only display columns B (1) to J (9)
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <p><strong>Name:</strong> ${c[1]?.v || ''}</p>
        <p><strong>Email:</strong> ${c[2]?.v || ''}</p>
        <p><strong>Institution:</strong> ${c[3]?.v || ''}</p>
        <p><strong>Position:</strong> ${c[4]?.v || ''}</p>
        <p><strong>Country:</strong> ${c[5]?.v || ''}</p>
        <p><strong>State/Province:</strong> ${c[6]?.v || ''}</p>
        <p><strong>Research Focus:</strong> ${c[7]?.v || ''}</p>
        <p><strong>Application Area:</strong> ${c[8]?.v || ''}</p>
        <p><strong>Website:</strong> ${c[9]?.v ? `<a href="${c[9].v}" target="_blank">${c[9].v}</a>` : ''}</p>
      `;
      container.appendChild(card);
    });
  })
  .catch(error => console.error('Error fetching or parsing data:', error));
