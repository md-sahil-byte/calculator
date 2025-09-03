console.log("initializing calculator module");


// ----------------------------calculator area-----------------------------------------------------------------
const display = document.getElementById('display');
        function append(val) {
            if(val === 'pi') val = Math.PI;
            if(val === 'e') val = Math.E;
            display.value += val;
        }
        function clearDisplay() {
            display.value = '';
        }
        function backspace() {
            display.value = display.value.slice(0, -1);
        }
        function calculate() {
            let expr = display.value
                .replace(/÷/g, '/')
                .replace(/×/g, '*')
                .replace(/−/g, '-')
                .replace(/sqrt\(/g, 'Math.sqrt(')
                .replace(/log\(/g, 'Math.log10(')
                .replace(/\^/g, '**');
            try {
                display.value = eval(expr);
            } catch {
                display.value = 'Error';
            }
        }

        document.addEventListener('keydown', function(event) {
            const key = event.key;
            if (!isNaN(key)) {
                append(key);
            } else if (key === '.') {
                append('.');
            } else if (key === '+' || key === '-' || key === '*' || key === '/' ) {
                append(key);
            } else if (key === 'Enter' || key === '=') {
                event.preventDefault();
                calculate();
            } else if (key === 'Backspace') {
                backspace();
            } else if (key === 'Escape' || key === 'c' || key === 'C') {
                clearDisplay();
            } else if (key === '^') {
                append('^');
            } else if (key === '(' || key === ')') {
                append(key);
            }
        });


        // ------------------------------------------------calculator history area---------------------------------------------------

        const historyContainer = document.querySelector('.calculator-history-content');
        let history = [];

        function addToHistory(expression, result) {
            history.unshift({ expression, result });
            renderHistory();
        }

        function renderHistory() {
            if (!historyContainer) return;
            historyContainer.innerHTML = history
                .map(item => `<div class="history-item"><span>${item.expression} = ${item.result}</span></div>`)
                .join('');
        }

        // Modify calculate() to add to history
        const originalCalculate = calculate;
        calculate = function() {
            let expr = display.value
                .replace(/÷/g, '/')
                .replace(/×/g, '*')
                .replace(/−/g, '-')
                .replace(/sqrt\(/g, 'Math.sqrt(')
                .replace(/log\(/g, 'Math.log10(')
                .replace(/\^/g, '**');
            try {
                const result = eval(expr);
                addToHistory(display.value, result);
                display.value = result;
            } catch {
                display.value = 'Error';
            }
        };


        // presssing recent button to show history and vice-versa
const recentButton = document.querySelector('.recent');
const calculatorContainer = document.querySelector('.calculator-container');
const calculatorHistory = document.querySelector('.calculator-history');
const calculatorInputButton = document.querySelector('.calculator-input-button');

let historyVisible = false;

recentButton.addEventListener('click', function() {
    historyVisible = !historyVisible;
    if (historyVisible) {
        if (calculatorContainer) calculatorContainer.style.display = 'none';
        if (calculatorHistory) calculatorHistory.style.display = 'flex';
        if (calculatorInputButton) calculatorInputButton.style.display = '';
    } else {
        if (calculatorHistory) calculatorHistory.style.display = 'none';
        if (calculatorContainer) calculatorContainer.style.display = '';
        if (calculatorInputButton) calculatorInputButton.style.removeProperty('display');
    }
});

const style = document.createElement('style');
style.textContent = `
.calculator-history-content {
    white-space: normal !important;
    word-break: break-all;
}
`;
document.head.appendChild(style);

