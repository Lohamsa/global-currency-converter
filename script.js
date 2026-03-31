
const amountInput = document.getElementById('amount');
const fromSelect = document.getElementById('baseCurrency');    // fixed ID
const toSelect = document.getElementById('targetCurrency');   // fixed ID
const convertBtn = document.getElementById('convertBtn');
const resultDiv = document.getElementById('convertedValue');  // fixed ID

// Load currencies into dropdowns
async function loadCurrencies() {
  try {
    const res = await fetch('https://api.frankfurter.app/currencies');
    const data = await res.json();

    for (let code in data) {
      fromSelect.add(new Option(`${code} - ${data[code]}`, code));
      toSelect.add(new Option(`${code} - ${data[code]}`, code));
    }

    fromSelect.value = 'USD';
    toSelect.value = 'INR';
  } catch (err) {
    console.error('Error loading currencies', err);
  }
}

// Call function to populate dropdowns
loadCurrencies();

// Convert currency on button click
convertBtn.addEventListener('click', async () => {
  const amount = amountInput.value;
  const from = fromSelect.value;
  const to = toSelect.value;

  if (!amount) {
    alert('Please enter an amount!');
    return;
  }

  try {
    const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`);
    const data = await res.json();
    resultDiv.textContent = `${amount} ${from} = ${data.rates[to]} ${to}`;

    // Add animation class
    resultDiv.classList.remove('hide');
    resultDiv.classList.add('show');
  } catch (err) {
    resultDiv.textContent = 'Error fetching conversion';
    console.error(err);
  }
});