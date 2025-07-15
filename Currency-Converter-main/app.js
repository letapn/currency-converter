const API_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const selectors = document.querySelectorAll(".select-country select");
const btn = document.querySelector("button");
const fromCurr = document.querySelector("#from select");
const toCurr = document.querySelector("#to select");
const finalResult = document.querySelector(".result");

for (let select of selectors) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
    autoConvert();
  });
}

const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let newFlag = element.parentElement.querySelector("img");
  newFlag.src = newSrc;
};

const convertCurrency = async () => {
  let amt = document.querySelector(".amount input");
  let amount = parseFloat(amt.value);
  if (isNaN(amount) || amount <= 0) {
    finalResult.innerText = "Please enter a valid amount.";
    return;
  }
  const URL = `${API_URL}/${fromCurr.value.toLowerCase()}.json`;
  try {
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    let result = amount * rate;
    finalResult.innerText = `${amount} ${fromCurr.value} = ${result.toFixed(2)} ${toCurr.value}`;
  } catch (error) {
    finalResult.innerText = "Error fetching exchange rate.";
  }
};

const autoConvert = () => {
  let amt = document.querySelector(".amount input");
  if (amt.value !== "") {
    convertCurrency();
  }
};

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  convertCurrency();
});

// Swap currencies
const arrow = document.querySelector("#arrow");
arrow.addEventListener("click", () => {
  const temp = fromCurr.value;
  fromCurr.value = toCurr.value;
  toCurr.value = temp;
  updateFlag(fromCurr);
  updateFlag(toCurr);
  autoConvert();
});
