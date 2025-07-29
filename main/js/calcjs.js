const display = document.getElementById('display');

function appendNumber(num) {
    display.innerText += num;
}

function clearDisplay() {
    display.innerText = '';
}

function deleteLast() {
    display.innerText = display.innerText.slice(0, -1);
}

function calculateResult() {
    try {
        display.innerText = eval(display.innerText);
    } catch {
        display.innerText = "Error";
    }
}

function calculatePercent() {
    try {
        display.innerText = eval(display.innerText) / 100;
    } catch {
        display.innerText = "Error";
    }
}

function calculateSqrt() {
    try {
        display.innerText = Math.sqrt(eval(display.innerText));
    } catch {
        display.innerText = "Error";
    }
}

function toggleSign() {
    try {
        let value = eval(display.innerText);
        display.innerText = value * -1;
    } catch {
        display.innerText = "Error";
    }
}

// دعم لوحة المفاتيح
document.addEventListener('keydown', function (event) {
    const key = event.key;
    if (!isNaN(key) || "+-*/.".includes(key)) {
        appendNumber(key);
    } else if (key === "Enter") {
        event.preventDefault();
        calculateResult();
    } else if (key === "Backspace") {
        deleteLast();
    } else if (key === "Escape") {
        clearDisplay();
    }
});
