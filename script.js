const sheetURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSqUNyAiN6LQNXDOEKyzLECwPs1GUCFDUJlOopC6Fed3qBpir9MTctGOq9boRKIndSSxBrMvWtY4TK2/gviz/tq?gid=332580297&tqx=out:json';

function fetchData() {
  fetch(sheetURL)
    .then(res => res.text())
    .then(text => {
      const json = JSON.parse(text.substring(47).slice(0, -2));
      const rows = json.table.rows;
      const headers = json.table.cols.map(col => col.label);
      renderTable(headers, rows);
    })
    .catch(err => {
      console.error("Error loading data", err);
      document.getElementById('geneticists').innerHTML = "<p>Error loading data.</p>";
    });
}

function renderTable(headers, rows) {
  const container = document.getElementById('geneticists');
  const table = document.createElement('table');
  table.className = 'data-table';

  // Table header
  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');
  headers.forEach(header => {
    const th = document.createElement('th');
    th.textContent = header;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);

  // Table body
  const tbody = document.createElement('tbody');
  rows.forEach(row => {
    const tr = document.createElement('tr');
    row.c.forEach(cell => {
      const td = document.createElement('td');
      td.textContent = cell?.v || '';
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });

  table.appendChild(tbody);
  container.innerHTML = '';
  container.appendChild(table);
}

fetchData();
