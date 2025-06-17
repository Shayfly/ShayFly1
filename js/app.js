const API_TOKEN = '8349af28ce9d95c3ee1635cc7729cc09'; // המפתח שלך

document.getElementById('search-form').addEventListener('submit', async function(e) {
  e.preventDefault();
  const from = document.getElementById('from').value.trim().toUpperCase();
  const to = document.getElementById('to').value.trim().toUpperCase();
  const departDate = document.getElementById('depart-date').value;
  const returnDate = document.getElementById('return-date').value;

  if (!from || !to || !departDate) {
    alert('אנא מלא את כל השדות הדרושים');
    return;
  }

  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = 'טוען...';

  try {
    const url = `https://api.travelpayouts.com/v2/prices/month-matrix?currency=ILS&origin=${from}&destination=${to}&year=${new Date(departDate).getFullYear()}&month=${new Date(departDate).getMonth() + 1}&token=${API_TOKEN}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.success) {
      const prices = data.data;
      let html = `<h3>מחירי טיסות מחודש ${new Date(departDate).toLocaleString('he-IL', { month: 'long', year: 'numeric' })}</h3>`;
      html += '<ul>';
      for (const day in prices) {
        html += `<li>${day}: ₪${prices[day]}</li>`;
      }
      html += '</ul>';
      resultsDiv.innerHTML = html;
    } else {
      resultsDiv.innerHTML = 'אין תוצאות מתאימות או שהייתה שגיאה.';
    }
  } catch (error) {
    resultsDiv.innerHTML = 'אירעה שגיאה בטעינת הנתונים.';
    console.error(error);
  }
});
