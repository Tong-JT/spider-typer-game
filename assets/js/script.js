async function generateQuote() {
    const url = "https://api.gameofthronesquotes.xyz/v1/random";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const json = await response.json();
      console.log("Quote:", json.sentence);
      console.log("Character:", json.character.name);
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

startMiniSpiderEvent();
startMiniSpiderEvent();
startMiniSpiderEvent();
startMiniSpiderEvent();
startMiniSpiderEvent();
startMiniSpiderEvent();