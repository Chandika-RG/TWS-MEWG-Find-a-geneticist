const sheetURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSqUNyAiN6LQNXDOEKyzLECwPs1GUCFDUJlOopC6Fed3qBpir9MTctGOq9boRKIndSSxBrMvWtY4TK2/gviz/tq?tqx=out:json';

fetch(sheetURL)
  .then(res => res.text())
  .then(text => {
    const json = JSON.parse(text.substring(47).slice(0, -2));
    const rows = json.table.rows;
    const container = document.getElementById('geneticists');
    container.innerHTML = '';

    rows.forEach(row => {
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
  })
  .catch(err => console.error('Error loading data', err));

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
