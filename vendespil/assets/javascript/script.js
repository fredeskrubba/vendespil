const card1 = document.querySelector(".flip-card-1");
const card2 = document.querySelector(".flip-card-2");
const card3 = document.querySelector(".flip-card-3");

//Object to keep track of the guesses

const guesses =  {
    guess1: "",
    guess2: 0,
    match: false,
    score: 0,
}

let removeCards = [];
// Make an array with each card
const cardArray = Array.from(document.querySelectorAll(".flip-card"));
console.log(cardArray);

// for each loop that switches the card click to the backside
cardArray.forEach( card =>{
    card.addEventListener("click", ()=> {
        card.style.transform = "rotateY(180deg)";
        removeCards.push(card);
        if (guesses.guess1 === ""){
            guesses.guess1 = card.className;
        } else if (guesses.guess1 !== ""){
            guesses.guess2 = card.className;
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
                element.style.display = "none";
            };
        } else if (guesses.match === false && guesses.guess1 !== "" && guesses.guess2 !== 0){
            for (element of removeCards){
                element.style.transform = "rotateY(360deg)";
                removeCards = [];
                guesses.guess1 = "";
                guesses.guess2 = 0;
            };
        }
        guesses.match = false;
    });
});
// function that hides the two cards if they're a match
function checkMatch(){
    if (guesses.guess1 === guesses.guess2){
        alert("It's a match");
        guesses.match = true
        guesses.guess1 = "";
        guesses.guess2 = 0;
        guesses.score += 1;
    }
    // if all cards are guessed, alert that the user wins and reload the page
    if (guesses.score === 3){
        alert("You win!")
        // reset the score so the statement moves on from spamming you win
        guesses.score = 0;
        location.reload();
    }
};