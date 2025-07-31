// JSONP loader to avoid CORS errors
const sheetBaseURL = 
  'https://docs.google.com/spreadsheets/d/e/'
  + '2PACX-1vSqUNyAiN6LQNXDOEKyzLECwPs1GUCFDUJlOopC6Fed3qBpir9MTctGOq9boRKIndSSxBrMvWtY4TK2/'
  + 'gviz/tq?gid=174092188';

function fetchData() {
  const callbackName = 'handleSheetData';

  // Define the global callback
  window[callbackName] = function(resp) {
    try {
      const rows = resp.table.rows || [];
      if (!rows.length) {
        document.getElementById('geneticists').innerHTML =
          '<p>No members found. Please check your Sheet.</p>';
      } else {
        renderCards(rows);
      }
    } catch (err) {
      console.error('Error parsing JSONP:', err);
      document.getElementById('geneticists').innerHTML =
        '<p>Error parsing data. Check console for details.</p>';
    }
  };

  // Insert the JSONP `<script>` tag
  const script = document.createElement('script');
  script.src = `${sheetBaseURL}&tqx=out:json&callback=${callbackName}`;
  script.onerror = () => {
    document.getElementById('geneticists').innerHTML =
      '<p>Error loading data. Please verify the sheet URL.</p>';
  };
  document.body.appendChild(script);
}

function renderCards(rows) {
  const container = document.getElementById('geneticists');
  container.innerHTML = '';

  rows.forEach(row => {
    const cells = row.c || [];
    const name        = cells[0]?.v || 'No Name';
    const email       = cells[1]?.v || '';
    const institution = cells[2]?.v || '';
    const expertise   = cells[3]?.v || '';
    const location    = cells[4]?.v || '';

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

// Kick things off once DOM is ready
document.addEventListener('DOMContentLoaded', fetchData);
