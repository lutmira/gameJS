window.onload = function () {
    DOM.renderContent();
    DOM.renderStartButton();
}
let numberCollection = [];
let selectedNumbers = []; //array qe ruan nr e selektuar nga user
let randomGeneratedNr = 0; //shuma random e gjeneruar
function content() {
}
const REFERENCE = {
    getContent: function content() {
        return document.querySelector(".content");
    }
};
function renderRandomSum() {
    let arrayForSum = [1, 2, 3, 4, 5, 6];
    return arrayForSum[Math.floor(Math.random() * arrayForSum.length)];
}
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}
function renderTable() {
    let tHeader = '<table border="2px solid bold">\n';
    let tbody = '';
    let randomNumberInCells = function (min = 10, max = 20) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    for (let i = 0; i < 2; i++) {
        tbody += '<tr>';
        for (let j = 0; j < 3; j++) {
            const number = randomNumberInCells(10, 20);
            const id = `cell${i}${j}`;
            tbody += '<td id="cell' + i + j + '" onClick="(updateSelectedNumber(this.id))">';
            tbody += ' ' + number;
            tbody += '</td>'
            numberCollection.push(id);
        }
        tbody += '</tr>\n';
    }
    let tFooter = '</table>';
    const tableContent = document.createElement("div");
    tableContent.id = "table-content";
    tableContent.innerHTML = tHeader + tbody + tFooter;
    REFERENCE.getContent().appendChild(tableContent);
}
function addSum() {
    let numberToAdd = renderRandomSum();
    let allCells = document.querySelectorAll("td"); //tabela me 6 nr qe na shfaqet
    let allNumbers = []
    allCells.forEach(i => allNumbers.push(parseInt(i.innerText))); //ben push tek array allNumbers numrat qe mban tabela qe i shfaqet perdoruesit
    shuffleArray(allNumbers); //i bejme shuffle
    let sum = 0;
    for (let k = 0; k < numberToAdd; k++) {
        sum += allNumbers[k];
    } // tani nuk merren me psh 4 el e pare nga tabela fillestare por 4 el e pare pasi jane perzirer
    const randomSum = document.createElement("p");
    randomSum.id = "random-sum";
    randomSum.innerHTML = sum;
    randomGeneratedNr = sum;
    REFERENCE.getContent().appendChild(randomSum);
}
function renderGameContent() {
    renderRandomSum();
    renderTable();
    renderCheckButton()
    let button = document.getElementById("start_button");
    button.remove();
}
function renderStartButton() {
    const button = document.createElement("button");
    button.id = "start_button";
    button.innerHTML = "Start The Game!";
    REFERENCE.getContent().appendChild(button);
    button.addEventListener("click", () => {
        renderGameContent();
        addSum();
    });
}
function renderCheckButton() {
    const checkAnswerButton = document.createElement("button");
    checkAnswerButton.id = "check-answer";
    checkAnswerButton.innerHTML = "Check Answer!"
    checkAnswerButton.addEventListener("click", checkUserAnswer)
    REFERENCE.getContent().appendChild(checkAnswerButton);
}
function checkUserAnswer() {
    let sum = 0;
    selectedNumbers.forEach(element => {
        const value = document.getElementById(element).innerText;
        sum += parseInt(value,10);
    });
    showMessage(sum);
}
function showMessage(sum) {
    let result = document.createElement("div");
    result.id = "show-message";
    const won = sum === randomGeneratedNr;
    result.style.width = "100%";
    result.style.marginTop="4px"
    result.style.padding = "10px";
    result.style.fontSize = "28px";
    result.style.textAlign = "center";
    if (won) {
        result.innerText = 'WINNER'
        result.style.backgroundColor = "#1ac467";
        result.style.color =  '#237804';
    } else {
        result.innerText = 'LOOSER'
        result.style.backgroundColor = "#d90609";
        result.style.color =  '#580316';
    }
    document.body.append(result);
    const checkButton = document.getElementById("check-answer");
    document.getElementById("table-content").style.pointerEvents = "none";
    checkButton.innerHTML = '';
    checkButton.innerText = "Play Again";
    checkButton.onclick = () => {
        window.location.reload();
    }
}
function renderContent() {
    const content = document.createElement("section");
    content.className = "content";
    document.body.appendChild(content);
}
function updateSelectedNumber(currentId) {
    if (selectedNumbers.includes(currentId))
        selectedNumbers = selectedNumbers.filter(id => id !== currentId);
    else
        selectedNumbers.push(currentId);
    numberCollection.forEach(id => {
        const active = selectedNumbers.includes(id);
        DOM.changeCellColor(id, active)
    })
}
function changeCellColor(id, active) {
    const reference = document.getElementById(id);
    if (active) {
        reference.style.backgroundColor = "green";
    } else {
        reference.style.backgroundColor = "antiquewhite";
    }
}
const DOM = {
    renderContent: renderContent,
    renderStartButton: renderStartButton,
    changeCellColor: changeCellColor
};