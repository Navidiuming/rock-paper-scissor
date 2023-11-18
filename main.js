const btn_act = document.querySelectorAll(".playerside .possibleAct");
const img_act = document.querySelectorAll(".playerside .gameField .act");
const img_rival_act = document.querySelectorAll(".rivalSide .gameField .act");
const player_gameField = document.querySelector(".playerside .gameField");
const p_playerGuide = document.querySelector(".playerside .gameField p");
const p_gameResult = document.querySelector(".gameResult");
const img_playerHeart = document.querySelectorAll(".playerside .healthBar ul li img");
const img_rivalHeart = document.querySelectorAll(".rivalSide .healthBar ul li img");
let isClickedAllowed = true;
let isGamefinished = false;
let playerMove;
let rivalMove;
let round = 2;
function clicked() {
    if (isClickedAllowed) {
        let name = this.getAttribute('src');
        clearGameField(img_act);
        clearGameField(img_rival_act);
        playerAct(img_act, name);
        // rivalAct();
        setTimeout(() => {
            rivalAct();
            findWinner(playerMove, rivalMove);
        }, 1000);

        setTimeout(() => {
            startNewRound();
        }, 3000);
    }
}

for (i = 0; i < btn_act.length; i++) {
    btn_act[i].addEventListener('click', clicked);
}

function rivalAct() {
    let randnumber;
    randnumber = Math.random() * 2;
    randnumber = randnumber.toFixed();
    img_rival_act[randnumber].style.width = '25vmin';
    rivalMove = img_rival_act[randnumber].getAttribute("src");
    console.log(img_rival_act);
    p_gameResult.style.opacity = "1";
}

function playerAct(arr, name) {
    p_playerGuide.innerHTML = "";
    for (i = 0; i < arr.length; i++) {
        if (name == arr[i].getAttribute("src")) {
            arr[i].style.width = "25vmin";
            playerMove = arr[i].getAttribute("src");
            break;
        }
    }
    isClickedAllowed = false;
}

function clearGameField(arr) {
    for (i = 0; i < arr.length; i++) {
        arr[i].style.width = "0vmin";
    }
}

function findWinner(player, rival) {
    if (player == rival) {
        p_gameResult.innerHTML = "draw";
    } else if (player.includes("paper")) {
        if (rival.includes("rock")) {
            p_gameResult.innerHTML = "player win";
            reduceHeart(img_rivalHeart);
        } else if (rival.includes("sciccor")) {
            p_gameResult.innerHTML = "rival win";
            reduceHeart(img_playerHeart);
        }
    } else if (player.includes("rock")) {
        if (rival.includes("sciccor")) {
            p_gameResult.innerHTML = "player win";
            reduceHeart(img_rivalHeart);
        } else if (rival.includes("paper")) {
            p_gameResult.innerHTML = "rival win";
            reduceHeart(img_playerHeart);
        }
    } else if (player.includes("sciccor")) {
        if (rival.includes("paper")) {
            p_gameResult.innerHTML = "player win";
            reduceHeart(img_rivalHeart);
        } else if (rival.includes("rock")) {
            p_gameResult.innerHTML = "rival win";
            reduceHeart(img_playerHeart);
        }
    }
}

function reduceHeart(hearts) {
    for (let i = 0; i < hearts.length; i++) {
        if (hearts[i].getAttribute('src').includes("full")) {
            hearts[i].src = "./images/empty.png";
            break;
        }
    }
}

function fillHearts(hearts) {
    for (let i = 0; i < hearts.length; i++) {
        hearts[i].src = "./images/fullRedHeart.png"
    }
}

function remainHearts(hearts) {
    let fullHeartNumber = 0;
    for (let i = 0; i < hearts.length; i++) {
        if (hearts[i].getAttribute('src').includes("full")) {
            fullHeartNumber++;
        }
    }
    return fullHeartNumber;
}

function startNewRound() {
    let playerRemainHeart = remainHearts(img_playerHeart);
    let rivalRemainHeart = remainHearts(img_rivalHeart);
    p_gameResult.style.opacity = "0";
    console.log(playerRemainHeart);
    console.log(rivalRemainHeart);
    if (playerRemainHeart == 0) {
        console.log("rival win");
        round = "rivalWon";
    } else if (rivalRemainHeart == 0) {
        console.log("player win");
        round = "playerWon";
    }
    clearGameField(img_act);
    clearGameField(img_rival_act);
    setTimeout(() => {
        switch (round) {
            case 2:
                p_playerGuide.innerHTML = "2nd round";
                break;
            case 3:
                p_playerGuide.innerHTML = "3rd round";
                break;
            default:
                p_playerGuide.innerHTML = `${round}th round`;
                break;
            case "playerWon":
                p_playerGuide.innerHTML = `congratulations , you managed to beat your opponent in a breathtaking game.
                            Good luck!
                            The next match will start in a few seconds...`;
                isGamefinished = true;
                break;
            case "rivalWon":
                p_playerGuide.innerHTML = `You are just a big loser
                If you want to prove that it is not like this
                The next hand will start in a few seconds...`;
                isGamefinished = true;
                break;



        }
        round++;
        if( isGamefinished == false ){
            isClickedAllowed = true;
        }else {
            setTimeout(() => {
                startnewGame();

            }, 10000);
        }

    }, 2000);
}

function startnewGame() {
    p_playerGuide.innerHTML = "1st Round<br> READY FOR FIGHT !!! <br>PAPER ,SCISSOR OR ROCK ";
    round = 2;
    fillHearts(img_playerHeart);
    fillHearts(img_rivalHeart);
    isClickedAllowed = true;
    isGamefinished = false;
}