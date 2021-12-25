const endScreen = document.querySelector(".end-screen");
const restartButton = document.querySelector(".restart-button");
const timeLine = document.querySelector(".time-line");
const scoreLine = document.querySelector(".score-line");
const endTimer = document.querySelector(".end-timer");
//Object to keep track of the guesses

const guesses =  {
    guess1: "",
    guess2: 0,
    match: false,
    score: 0,
    timer: 0,
    gameActive: false,
    timerStarted: false,
};

let interval = null;
// array for storing the 2 cards the user picks, so they can be moved around
let matchCards = [];
let removeCards = [];
// Make an array with each card
const cardArray = Array.from(document.querySelectorAll(".flip-card"));

const timeDisplay = document.querySelector(".time-display");
// for each loop that switches the card click to the backside
cardArray.forEach( card =>{
    card.addEventListener("click", ()=> {
        if (guesses.gameActive === false){
            guesses.gameActive = true;
        };
        // Set interval to increase the timer by 1 each second
        if (guesses.gameActive === true && guesses.timerStarted === false){
            // timerStarted is used for making sure the timer only goes up by 1
            // if it isn't used the timer goes up by one more each time a card is picked
            guesses.timerStarted = true
            interval = setInterval(()=>{
                timeLine.textContent = `Tid: ${guesses.timer}`;
                guesses.timer++
            }, 1000);
        };
        card.style.transform = "rotateY(180deg)";
        removeCards.push(card);
        if (guesses.guess1 === "" && card.style.color != "red"){
            guesses.guess1 = card.className;
            card.style.color = "red";
        } else if (guesses.guess1 !== "" && card.style.color != "red"){
            guesses.guess2 = card.className;
            card.style.color = "red";
        }
    });
});

// mouseout eventlistener, so the the second chosen card can finish its animation before the cards
cardArray.forEach( card =>{
    addEventListener("mouseout", ()=> {
        checkMatch();
        // hvis der er et match, kig i remove cards arrayet og skjul de matchende kort
        if (guesses.match === true){
            for (element of removeCards){
                matchCards.push(element);
            };
        } else if (guesses.match === false && guesses.guess1 !== "" && guesses.guess2 !== 0){
            for (element of removeCards){
                if (!matchCards.includes(element)){
                    element.style.transform = "rotateY(360deg)";
                    element.style.color = "black";
                    removeCards = [];
                    guesses.guess1 = "";
                    guesses.guess2 = 0;
                };
            };
        };
        guesses.match = false;
    });
});
// function that hides the two cards if they're a match
function checkMatch(){
    if (guesses.guess1 === guesses.guess2){
        guesses.match = true;
        guesses.guess1 = "";
        guesses.guess2 = 0;
        guesses.score += 1;
        scoreLine.textContent = `Score: ${guesses.score}`;
    }
    // if all cards are guessed, alert that the user wins and reload the page
    if (guesses.score === 6){
        endScreen.style.display = "flex";
        endTimer.textContent = `Din tid: ${guesses.timer} sekunder!`;
        clearInterval(interval);
        endTimer.style.color = "blue";
        // reset the score so the statement moves on from spamming you win
        guesses.score = 0;
    }
};
restartButton.addEventListener("click", ()=>{
    location.reload();
});
const grid = document.querySelector(".card-grid");

const gridTemplateArray = [
    "flip-card-1", 
    "flip-card-2",
    "flip-card-3",
    "flip-card-4",
    "flip-card-5",
    "flip-card-6",
    "flip-card-7",
    "flip-card-8",
    "flip-card-9",
    "flip-card-10",
    "flip-card-11",
    "flip-card-12",
    ]
    
const newGridTemplateArray = [];
    
 function shuffle(){
    for (let i = 0; i < 12; i++){
        let arrayNum = gridTemplateArray[Math.floor(Math.random()*gridTemplateArray.length)];
        newGridTemplateArray.push(arrayNum);
        let arrayNumIndex = gridTemplateArray.indexOf(arrayNum);
        gridTemplateArray.splice(arrayNumIndex, 1);
    }
}
    
shuffle();
grid.style.gridTemplateAreas = `
"${newGridTemplateArray[0]} ${newGridTemplateArray[1]} ${newGridTemplateArray[2]} ${newGridTemplateArray[3]} ${newGridTemplateArray[4]} ${newGridTemplateArray[5]}"
"${newGridTemplateArray[6]} ${newGridTemplateArray[7]} ${newGridTemplateArray[8]} ${newGridTemplateArray[9]} ${newGridTemplateArray[10]} ${newGridTemplateArray[11]}"
`;