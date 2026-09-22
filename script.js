const amountInput = document.getElementById("amount");
const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const convertButton = document.getElementById("convertButton");
const swapButton = document.getElementById("swapButton");
const result = document.getElementById("result");

convertButton.addEventListener("click", convertCurrency);

async function convertCurrency() {

    const amount = Number(amountInput.value);
    const from = fromCurrency.value;
    const to = toCurrency.value;

    if (!amount || amount <= 0) {
        result.textContent = "Please enter a valid amount.";
        return;
    }

    if (from === to) {
        result.textContent = `${amount} ${from} = ${amount} ${to}`;
        return;
    }

    result.textContent = "Loading...";

    try {

        const response = await fetch(
            `https://api.frankfurter.dev/v2/rate/${from}/${to}`
        );

        const data = await response.json();

        const convertedAmount = amount * data.rate;

        result.innerHTML = `
            ${amount} ${from} = ${convertedAmount.toFixed(2)} ${to}
            <br>
            <small> 1 ${from} = ${data.rate} ${to}</small>
        `;

    } catch (error) {

        result.textContent = "Unable to get exchange rate. Please try again.";

    }
}

swapButton.addEventListener("click", function () {

    const oldFrom = fromCurrency.value;

    fromCurrency.value = toCurrency.value;
    toCurrency.value = oldFrom;

});
