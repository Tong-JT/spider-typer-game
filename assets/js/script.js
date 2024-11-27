async function generateQuote() {
    const url = "https://api.gameofthronesquotes.xyz/v1/random";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const json = await response.json();

      return `"${json.sentence}" ${json.character.name}.`
    } catch (error) {
      console.error(error.message);
    }
}

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

let textArea = document.getElementById('text-printing');
let currentQuote = "";
// 
async function newQuote() {
    inputField.value="";
    textArea.textContent = null;
    currentQuote = await generateQuote();
    currentQuote.split('').forEach(char => {
        const charSpan = document.createElement('span')
        charSpan.innerText = char
        textArea.appendChild(charSpan)
    })
}


let charIndex = 0;
let inputField = document.getElementById("input-field");
inputField.addEventListener('input', listenForInput)

function listenForInput() {
    let typedText = inputField.value;
    let curr_input_array = typedText.split("");
    let quoteSpanArray = textArea.querySelectorAll('span');

    quoteSpanArray.forEach((char, index) => {
        let typedChar = curr_input_array[index]

        // character not currently typed
        if (typedChar == null) {
        char.classList.remove('correct');
        char.classList.remove('incorrect');

        // correct character
        } else if (typedChar === char.innerText) {
        char.classList.add('correct');
        char.classList.remove('incorrect');

        // incorrect character
        } else {
        char.classList.add('incorrect');
        char.classList.remove('correct');

        }
    });

    if (typedText.length == currentQuote.length) {
        newQuote();
    }
}

function setUpScreen() {
    startMiniSpiderEvent();
    startMiniSpiderEvent();
    startMiniSpiderEvent();
    startMiniSpiderEvent();
    newQuote();
}

setUpScreen();