const list = document.getElementById("currencyList");
const result = document.getElementById("result");
const search = document.getElementById("searchCurrency");

const baseText = document.getElementById("baseText");
const targetText = document.getElementById("targetText");

const fromBox = document.getElementById("fromBox");
const toBox = document.getElementById("toBox");

let currencies = {};
let showPopular = false;

let baseCurrency = "USD";
let targetCurrency = "INR";
let activeSelection = "from";

const popular = ["USD", "INR", "EUR", "GBP", "JPY"];
// this is the async function to fetch data 
async function loadCurrencies() {
  const res = await fetch("https://open.er-api.com/v6/latest/USD");
  const data = await res.json();

  currencies = data.rates;

  renderCurrencies();
}

loadCurrencies();


function renderCurrencies() {
  let entries = Object.entries(currencies);


  entries = entries.filter(([code]) =>
    code.toLowerCase().includes(search.value.toLowerCase())
  );


  if (showPopular) {
    entries = entries.filter(([code]) => popular.includes(code));
  }

  list.innerHTML = "";

  entries.map(([code]) => {
    const li = document.createElement("li");
    li.textContent = code;

    li.addEventListener("click", () => {
      if (activeSelection === "from") {
        baseCurrency = code;
        baseText.textContent = code;
      } else {
        targetCurrency = code;
        targetText.textContent = code;
      }
    });

    list.appendChild(li);
  });
}


search.addEventListener("input", renderCurrencies);


document.getElementById("filterBtn").addEventListener("click", () => {
  showPopular = !showPopular;

  document.getElementById("filterBtn").textContent =
    showPopular ? "Showing Popular" : "Show Popular";

  renderCurrencies();
});


fromBox.addEventListener("click", () => {
  activeSelection = "from";
  fromBox.classList.add("active");
  toBox.classList.remove("active");
});

toBox.addEventListener("click", () => {
  activeSelection = "to";
  toBox.classList.add("active");
  fromBox.classList.remove("active");
});


document.getElementById("themeBtn").addEventListener("click", function () {
  document.body.classList.toggle("dark");

  this.textContent =
    document.body.classList.contains("dark") ? "☀️" : "🌙";
});


document.getElementById("convertBtn").addEventListener("click", async () => {
  const amount = document.getElementById("amount").value;

  const res = await fetch(
    `https://open.er-api.com/v6/latest/${baseCurrency}`
  );

  const data = await res.json();

  const rate = data.rates[targetCurrency];

  result.textContent =
    `${amount} ${baseCurrency} = ${(amount * rate).toFixed(2)} ${targetCurrency}`;
});