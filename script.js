document.addEventListener("DOMContentLoaded", function () {
    const binanceRatesUSD = {
        USDT: 1,
        LTC: 85,
        XLM: 0.11
    };

    const nairaRatePerDollar = 1450;

    const buyRates = {
        USDT: 1450,  // Customer buys from you (you sell high)
        LTC: 19000,
        XLM: 60
    };
    
    const sellRates = {
        USDT: 1400,  // Customer sells to you (you buy low)
        LTC: 18500,
        XLM: 55
    };

    function updateRate() {
        const coin = document.getElementById('coin').value;
        const action = document.getElementById('action').value;
        let rate;
    
        if (action === "buy") {
            rate = buyRates[coin];
        } else if (action === "sell") {
            rate = sellRates[coin];
        } else {
            rate = 0;
        }
    
        if (rate > 0) {
            document.getElementById("rate").textContent = `1 ${coin} = ₦${rate}`;
        } else {
            document.getElementById("rate").textContent = "Select action and coin";
        }
    }

    document.getElementById('action').addEventListener('change', updateRate);
document.getElementById('coin').addEventListener('change', updateRate);

    
    

    const form = document.getElementById("orderForm");
    const coinSelect = document.getElementById("coin");
    const amountInput = document.getElementById("amount");
    const usdAmount = document.getElementById("usdAmount");
    const nairaAmount = document.getElementById("nairaAmount");

    function updateConversion() {
        const coin = coinSelect.value;
        const amount = parseFloat(amountInput.value);

        if (!coin || isNaN(amount)) {
            usdAmount.textContent = "0";
            nairaAmount.textContent = "0";
            return;
        }

        const usd = binanceRatesUSD[coin] * amount;
        const naira = usd * nairaRatePerDollar;

        usdAmount.textContent = usd.toFixed(2);
        nairaAmount.textContent = naira.toFixed(2);
    }

    amountInput.addEventListener("input", updateConversion);
    coinSelect.addEventListener("change", updateConversion);

    window.submitOrder = function (e) {
        e.preventDefault();

        const action = document.getElementById("action").value;
        const coin = coinSelect.value;
        const amount = amountInput.value;
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;

        const usd = (binanceRatesUSD[coin] * amount).toFixed(2);
        const naira = (usd * nairaRatePerDollar).toFixed(2);

        const message = `Hello, I want to ${action} ${amount} ${coin}.
USD Value: $${usd}
Naira Value: ₦${naira}
Name: ${name}
Email: ${email}`;

        const whatsappNumber = "2348166606974";
        const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

        const scriptURL = "https://script.google.com/macros/s/AKfycbwejLYYtLmyf29aJfas0E9EM20W_cUgAdVnFVZQhBX-dqUeCBUoTtQ0RozIke3DnCSZ/exec";
        const formData = new FormData();
        formData.append("action", action);
        formData.append("coin", coin);
        formData.append("amount", amount);
        formData.append("name", name);
        formData.append("email", email);

        fetch(scriptURL, { method: "POST", body: formData })
            .then(() => window.location.href = whatsappLink)
            .catch(() => window.location.href = whatsappLink);
    };
});
