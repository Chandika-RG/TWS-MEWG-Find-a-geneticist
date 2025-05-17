
const sheetId = '1vGElZaDBcZy3kBKndMYlgBOrVYmd7L0aeWg4GMWKz4k'; // Replace with your sheet ID
const apiKey = 'AIzaSyD9HOzUVatQCaelAj-7oPpI72JxLLbBmTo'; // Replace with your API key
const sheetName = 'Form Responses 1'; // Replace with your sheet name
const sheetURL = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}?key=${apiKey}`;


fetch(sheetURL)
  .then(res => res.json())
  .then(json => {
    const rows = json.values;
    const container = document.getElementById('geneticists');
    container.innerHTML = '';

    rows.forEach((row, index) => {
      if (index === 0) return; // skip header row
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <h3>${row[0] || 'No Name'}</h3>
        <p><strong>Email:</strong> ${row[1] || ''}</p>
        <p><strong>Phone:</strong> ${row[2] || ''}</p>
        <p><strong>Affiliation:</strong> ${row[3] || ''}</p>
        <p><strong>Title:</strong> ${row[4] || ''}</p>
        <p><strong>Website:</strong> ${row[5] ? `<a href="${row[5]}" target="_blank">${row[5]}</a>` : ''}</p>
        <p><strong>Taxon Expertise:</strong> ${row[6] || ''}</string></p>
        <p><strong>Subject Matter:</strong> ${row[7] || ''}</p>
        <p><strong>Data & Analytics Expertise:</strong> ${row[8] || ''}</p>
      `;
      container.appendChild(card);
    });
  })
  .catch(error => console.error('Error fetching or parsing data:', error));
