// script.js

const startBtn = document.getElementById("startBtn");
const codeInput = document.getElementById("codeInput");
const countEl = document.getElementById("count");
const symbolEl = document.getElementById("symbol");
const resultEl = document.getElementById("result");

const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:'\",.<>?/";

startBtn.addEventListener("click", () => {
    const password = codeInput.value;
    if (!password) return alert("Enter a password to crack!");

    let tryCount = 0;
    let cracked = "";
    resultEl.innerText = "";

    const crack = (index = 0) => {
        if (index >= password.length) {
            resultEl.innerHTML = `<span class='success'>✅ Password Cracked: ${cracked}</span>`;
            return;
        }

        let i = 0;
        const tryChar = () => {
            const char = characters[i];
            symbolEl.innerText = cracked + char;
            tryCount++;
            countEl.innerText = tryCount;
            if (char === password[index]) {
                cracked += char;
                setTimeout(() => crack(index + 1), 200);
            } else {
                i++;
                if (i < characters.length) {
                    setTimeout(tryChar, 20);
                }
            }
        };
        tryChar();
    };

    crack();
});
