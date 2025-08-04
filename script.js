// ✅ URL to the published Google Sheet (must be 'Published to Web' with correct gid)
const sheetURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSqUNyAiN6LQNXDOEKyzLECwPs1GUCFDUJlOopC6Fed3qBpir9MTctGOq9boRKIndSSxBrMvWtY4TK2/gviz/tq?gid=332580297&tqx=out:json';

/**
 * 🔄 Fetch data from the published Google Sheet
 */
function fetchData() {
  fetch(sheetURL)
    .then(res => res.text()) // Get raw response as text
    .then(text => {
      console.log("Raw sheet response:", text); // Debug: log raw response

      // ✅ Google Sheets wraps JSON in a JS function, so we trim it
      const json = JSON.parse(text.substring(47).slice(0, -2));
      console.log("Parsed JSON object:", json); // Debug: parsed result

      // Extract column headers and row data
      const headers = json.table.cols.map(col => col.label);
      const rows = json.table.rows;

      // Render the data into a table
      renderTable(headers, rows);
    })
    .catch(err => {
      // ❌ If something fails (bad URL or not published), show an error message
      console.error("Error loading data", err);
      document.getElementById('geneticists').innerHTML = "<p>Error loading data.</p>";
    });
}

/**
 * 🧱 Render the table in the HTML container
 * @param {string[]} headers - column names
 * @param {object[]} rows - sheet data rows
 */
function renderTable(headers, rows) {
  const container = document.getElementById('geneticists');
  const table = document.createElement('table');
  table.className = 'data-table';

  // 🔹 Create table header row
  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');

  headers.forEach(header => {
    const th = document.createElement('th');
    th.textContent = header;
    headerRow.appendChild(th);
  });

  thead.appendChild(headerRow);
  table.appendChild(thead);

  // 🔸 Create table body
  const tbody = document.createElement('tbody');

  rows.forEach(row => {
    const tr = document.createElement('tr');

    row.c.forEach(cell => {
      const td = document.createElement('td');
      td.textContent = cell?.v || ''; // Handle empty cells
      tr.appendChild(td);
    });

    tbody.appendChild(tr);
  });

  table.appendChild(tbody);

  // Clear loading message and display table
  container.innerHTML = '';
  container.appendChild(table);
}

// 🚀 Run the fetch function on page load
fetchData();
