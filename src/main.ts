const gameBoardOutput = document.querySelector(".gameBoard") as HTMLElement;

const emoji:string[] = ["🐘", "🐘", "🐼", "🐼", "🦁", "🦁", "🐰", "🐰", "🐱","🐱", "🐵","🐵", "🐑","🐑", "🐝", "🐝", "🐶", "🐶", "🐙", "🐙", "🦍", "🦍", "🐁", "🐁"]
let firstCard:HTMLElement | null
let secondCard:HTMLElement | null;
let gameBoardBlock = false;
function zufaelligSortieren(emojiArray: string[]): string[] {
    const sortiertesArray = [...emojiArray];
    for (let i = sortiertesArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [sortiertesArray[i], sortiertesArray[j]] = [sortiertesArray[j], sortiertesArray[i]];
    }

    return sortiertesArray;
}

const sortRandomArr = zufaelligSortieren(emoji);

const renderCards = (arr: string[]) => {
    gameBoardOutput.innerHTML = "";

    arr.forEach((emoji: string) => {
        const gameCardDiv = document.createElement("div");
        gameCardDiv.className = "gameCard";
        gameCardDiv.innerHTML = `
        <div class="gameCard-inner">
            <div class="gameCard-front">

            </div>
            <div class="gameCard-back">
              <div class="gameEmoji">
                ${emoji}
              </div>
            </div>
          </div>
        `
        gameBoardOutput.append(gameCardDiv);
        gameCardDiv.addEventListener("click", (e) => {
            const currentTarget = e.currentTarget as HTMLElement;
            flippedCard(currentTarget)
        })
    })
}

const flippedCard = (target:HTMLElement) => {
    if(gameBoardBlock) return
    if(target === firstCard) return

    if(!firstCard) {
        target.classList.add("flipped");
        firstCard = target;
        return
    }

    secondCard = target;
    target.classList.add("flipped");
    checkToWin();
    gameBoardBlock = true;
}

const checkToWin = () => {
    if(firstCard?.textContent === secondCard?.textContent) {
      firstCard?.removeEventListener("click",() => flippedCard)
      secondCard?.removeEventListener("click", () => flippedCard)
    } else {
        setTimeout(() => {
            firstCard?.classList.remove("flipped");
            secondCard?.classList.remove("flipped");
            firstCard = null ;
            secondCard = null;
            gameBoardBlock = false;
        }, 2000)

    }
 }

renderCards(sortRandomArr)