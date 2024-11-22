const gameBoardOutput = document.querySelector(".gameBoard") as HTMLElement;
const clickedResultElement = document.querySelector(".clickedResult") as HTMLElement;
const guessedResultElement = document.querySelector(".guessedResult") as HTMLElement;
const main = document.querySelector(".main") as HTMLElement;
const emoji:string[] = ["🐘", "🐘", "🐼", "🐼", "🦁", "🦁", "🐰", "🐰", "🐱","🐱", "🐵","🐵", "🐑","🐑", "🐝", "🐝", "🐶", "🐶", "🐙", "🐙", "🦍", "🦍", "🐁", "🐁"];
let firstCard:HTMLElement | null;
let secondCard:HTMLElement | null;
let gameBoardBlock = false;
let pairsClicked = 0; 
let pairsGuessed= 0;
const totalPairs = emoji.length / 2;

function zufaelligSortieren(emojiArray: string[]): string[] {
    const sortiertesArray = [...emojiArray];
    for (let i = sortiertesArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [sortiertesArray[i], sortiertesArray[j]] = [sortiertesArray[j], sortiertesArray[i]];
    }
    return sortiertesArray;
}

const sortRandomArr = zufaelligSortieren(emoji);
console.log(sortRandomArr);

const renderCards = (arr: string[]) => {
    gameBoardOutput.innerHTML = "";

    arr.forEach((emoji: string) => {
        const gameCardDiv = document.createElement("div");
        gameCardDiv.className = "gameCard";
        gameCardDiv.innerHTML = `
        <div class="gameCard-inner">
            <div class="gameCard-front"></div>
            <div class="gameCard-back">
                <div class="gameEmoji">${emoji}</div>
            </div>
        </div>`;
        gameBoardOutput.append(gameCardDiv);
        gameCardDiv.addEventListener("click", handleCardClick);
    });
}

const handleCardClick = (e: Event) => {
  const currentTarget = e.currentTarget as HTMLElement
    if(currentTarget.classList.contains("flipped")) return;
    flippedCard(currentTarget);
}

const flippedCard = (target:HTMLElement) => {
    console.log(target);
    if(gameBoardBlock) return;
    if(target === firstCard) return;

    if(!firstCard) {
        target.classList.add("flipped");
        firstCard = target;
        return;
    }

    secondCard = target;
    target.classList.add("flipped");
    gameBoardBlock = true;
    pairsClicked++;
    updatePairsClicked();
    checkToWin();
}

const checkToWin = () => {
    if(firstCard?.querySelector('.gameEmoji')?.textContent === secondCard?.querySelector('.gameEmoji')?.textContent) {
        pairsGuessed++;
        updatePairsGuessed();
        firstCard = null;
        secondCard = null;
        gameBoardBlock = false;

        if(pairsGuessed === totalPairs) {
            setTimeout(() => {
                showGameOverMessage();
            }, 500);
        }
    } else {
        setTimeout(() => {
            firstCard?.classList.remove("flipped");
            secondCard?.classList.remove("flipped");
            firstCard = null;
            secondCard = null;
            gameBoardBlock = false;
        }, 1000);
    }
}

const updatePairsClicked = () => {
    clickedResultElement.textContent = pairsClicked.toString();
}

const updatePairsGuessed = () => {
    guessedResultElement.textContent = pairsGuessed.toString();
}

const showGameOverMessage = () => {
    const existingMessage = document.querySelector(".gameOverMessage");
    if (existingMessage) {
        existingMessage.remove();
    }

    const gameOverMessageDiv = document.createElement("div");
    gameOverMessageDiv.className = "gameOverMessage";
  
    const modalDiv = document.createElement("div");
    modalDiv.className = "modal";
    modalDiv.innerHTML = `Gratulation! Du hast alle ${totalPairs} Paare in ${pairsClicked} Versuchen gefunden!`;
  
    gameOverMessageDiv.appendChild(modalDiv);
    main.appendChild(gameOverMessageDiv);
};

renderCards(sortRandomArr);
