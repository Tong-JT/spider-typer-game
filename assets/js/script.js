// Generates a random quote from Game of Thrones using an API
async function generateQuote() {
    const url = "https://api.gameofthronesquotes.xyz/v1/random";
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        return `"${json.sentence}" ${json.character.name}.`;
    } catch (error) {
        console.error(error.message);
    }
}

// Generates a random word using an API
async function generateWord() {
    const url = "https://random-word-api.vercel.app/api?words=1";
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        return json[0];
    } catch (error) {
        console.error(error.message);
    }
}

let textArea = document.getElementById('text-printing');
let inputField = document.getElementById("input-field");
let currentQuote = "";

async function newQuote() {
    charIndex = 0;
    inputField.value = "";
    textArea.textContent = null;
    currentQuote = await generateQuote();
    currentQuote.split('').forEach(char => {
        const charSpan = document.createElement('span');
        charSpan.innerText = char;
        charSpan.style.display = "inline-block";
        textArea.appendChild(charSpan);
    });
}

let charIndex = 0;
let gameStart = false;
let errorCount = 0;
let typedCharacterCount = 0;
let startDistance = 200;

function startRun() {
    let timer = setInterval(backgroundTime, 1000);
}

let timePassed = 0;
let minutes = 0;
let seconds = 0;

function backgroundTime() {
    updateTimer();
    updateWPM();
    updateSpiderSpeed();
    updateDistance();
}

function updateTimer() {
    timePassed++;
    minutes = Math.floor(timePassed / 60);
    seconds = timePassed % 60;
    let mins = document.getElementById("minutes");
    let secs = document.getElementById("seconds");
    mins.innerText = String(minutes).padStart(2, '0');
    secs.innerText = String(seconds).padStart(2, '0');
}

function updateWPM() {
    let charactersTyped = typedCharacterCount;
    let elapsedMinutes = timePassed / 60;

    if (elapsedMinutes > 0) {
        let wpm = Math.round(charactersTyped / 5 / elapsedMinutes);
        let wpmDisplays = document.querySelectorAll(".WPM");
        wpmDisplays.forEach(function(wpmDisplay) {
            wpmDisplay.textContent = wpm;
        });
    }
}

function updateSpiderSpeed() {
    let spiderSpeed = document.getElementById("spider-speed");
    let spiderSpeedNum = parseInt(spiderSpeed.innerText);
    if (timePassed % 10==0) {
        spiderSpeedNum += 5;
    }
    spiderSpeed.innerText = spiderSpeedNum;
}

let maxDistance = 200;
let minDistance = 30;

function updateDistance() {
    let distance = document.getElementById("distance-num");
    let distanceNum = parseInt(distance.innerText);

    let playerSpeed = parseInt(document.getElementById("character-speed").innerText);
    let spiderSpeed = parseInt(document.getElementById("spider-speed").innerText);
    
    let movement = spiderSpeed - playerSpeed;
    distanceNum -= movement;

    distance.innerText = Math.max(distanceNum, 0);

    let characterDistance = (distanceNum / startDistance) * (maxDistance - minDistance) + minDistance;
    let spiderDistance = maxDistance - characterDistance;

    if (characterDistance>800) {
        document.getElementById("main-character").style.transform = `translateX(800px)`;
    }
    else {
        document.getElementById("main-character").style.transform = `translateX(${characterDistance}px)`;
    }
    if (spiderDistance<-80) {
        document.getElementById("giant-spider").style.transform = `translateX(-80px)`;
    }
    else {
        document.getElementById("giant-spider").style.transform = `translateX(${spiderDistance}px)`;
    }

    if (distanceNum <= 0) {
        stopGame();
    }
}


function stopGame() {
    clearInterval(timer);
    inputField.disabled = true;
    alert("Game Over! Distance has reached 0.");
}


function listenForInput() {
    let typedText = inputField.value;
    typedCharacterCount++;

    if (typedText.length < charIndex) {
        charIndex--;
        typedCharacterCount-=2;
        let previousQuoteSpan = textArea.querySelectorAll('span')[charIndex];
        previousQuoteSpan.classList.remove('correct');
        previousQuoteSpan.classList.remove('incorrect');
        return;
    }

    if (charIndex < currentQuote.length) {
        let typedChar = typedText[charIndex];
        let quoteSpan = textArea.querySelectorAll('span')[charIndex];

        if (typedChar === currentQuote[charIndex]) {
            quoteSpan.classList.add('correct');
            quoteSpan.classList.remove('incorrect');
        } else {
            quoteSpan.classList.add('incorrect');
            quoteSpan.classList.remove('correct');
            errorCount++;
        }

        charIndex++;
    }

    let errors = document.getElementById("errors");
    errors.textContent = errorCount;
    console.log(typedCharacterCount)

    if (charIndex === currentQuote.length) {
        newQuote();
    }
}

// Mini spider event - Spider image animation, spider type box generation
async function startMiniSpiderEvent() {
    let sidebar = document.getElementById('mini-spider-sidebar');
    let miniSpiderTypeBox = document.createElement('div');
    const word = await generateWord();

    miniSpiderTypeBox.className = 'mini-spider-type-box';
    miniSpiderTypeBox.innerHTML = `
        <p class="mini-word">${word}</p>
    `;
    sidebar.appendChild(miniSpiderTypeBox);
}

function setUpScreen() {
    newQuote();
    document.getElementById("main-character").style.transform = `translateX(210px)`;
    let distance = document.getElementById("distance-num");
    distance.innerText = startDistance;
    inputField.addEventListener('input', function() {
        if (!gameStart) {
            gameStart = true;
            startMiniSpiderEvent();
            startMiniSpiderEvent();
            startMiniSpiderEvent();
            startMiniSpiderEvent();
            startRun();
        }
        listenForInput();
    });;
}

setUpScreen();
