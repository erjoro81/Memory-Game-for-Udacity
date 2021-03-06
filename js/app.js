let card = document.getElementsByClassName("card");

let cards = [...card]

const deck = document.getElementById("card-deck");

let moves = 0;

let counter = document.querySelector(".moves");

const stars = document.querySelectorAll(".fa-star");

let matchedCard = document.getElementsByClassName("match");

let starsList = document.querySelectorAll(".stars li");

let closeicon = document.querySelector(".close");

let modal = document.getElementById("popup1");

let openedCards = [];

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
};

//starts a new game and resets stats
document.body.onload = startGame();

function startGame(){
  cards = shuffle(cards);
  for (var i = 0; i < cards.length; i++){
    deck.innerHTML = "";
    [].forEach.call(cards, function(item){
      deck.appendChild(item);
    });
    cards[i].classList.remove("show", "open", "match", "disabled");
  }
  moves = 0;
  counter.innerHTML = moves;
  for (var i = 0; i < stars.length; i++){
    stars[i].style.color = "#28d106";
    stars[i].style.visibility = "visible";
  }
  second = 0;
  minute = 0;
  hour = 0;
  var timer = document.querySelector(".timer");
  timer.innerHTML = "0 mins 0 secs ";
  clearInterval(interval);
};

// toggles classes to display cards
var displayCard = function(){
  this.classList.toggle("open");
  this.classList.toggle("show");
  this.classList.toggle("disabled");
};

//check ro see if cards are a match
function cardOpen(){
  openedCards.push(this);
  var len = openedCards.length;
  if(len === 2){
    moveCounter();
    if (openedCards[0].type === openedCards[1].type){
      matched();
    }else{
      unmatched();
    }
  }
};

//what to do with a match cards
function matched(){
  openedCards[0].classList.add("match", "disabled");
  openedCards[1].classList.add("match", "disabled");
  openedCards[0].classList.remove("show", "open", "no-event");
  openedCards[1].classList.remove("show", "open", "no-event");
  openedCards = [];
};

//what to do with cards that do not match
function unmatched(){
  openedCards[0].classList.add("unmatched");
  openedCards[1].classList.add("unmatched");
  disable();
  setTimeout(function(){
    openedCards[0].classList.remove("show", "open", "no-event", "unmatched");
    openedCards[1].classList.remove("show", "open", "no-event", "unmatched");
    enable();
    openedCards = [];
  },1100);
};

//enable and disable cards.
function disable(){
  Array.prototype.filter.call(cards, function(card){
    card.classList.add("disabled");
  });
};

function enable(){
  Array.prototype.filter.call(cards, function(card){
    card.classList.remove("disabled");
    for(var i = 0; i < matchedCard.length; i++){
      matchedCard[i].classList.add("disabled");
    }
  });
};

// reflects star rating
function moveCounter(){
  moves++;
  counter.innerHTML = moves;
  if (moves == 1){
    second = 0;
    minute = 0;
    hour = 0;
    startTimer();
  }
  if (moves > 8 && moves < 16){
    for (i = 0; i < 3; i++){
      if(i > 1){
        stars[i].style.visibility = "collapse";
      }
    }
  }
  else if (moves > 16){
    for (i = 0; i < 3; i++){
      if(i > 0){
        stars[i].style.visibility = "collapse";
      }
    }
  }
};

//timer for the game
var second = 0, minute = 0; hour = 0;

var timer = document.querySelector(".timer");

var interval;

function startTimer(){
  interval = setInterval(function(){
    timer.innerHTML = minute + " mins "+second + " secs ";
    second++;
    if (second == 60){
      minute++;
      second = 0;
    }
    if (minute == 60){
      hour++;
      minute = 60;
    }
  },1000);
};

//popup display card for winning
function congratulations(){
  if (matchedCard.length == 16){
    clearInterval(interval);
    finalTime = timer.innerHTML;
    modal.classList.add("show");
    var starRating = document.querySelector(".stars").innerHTML;
    document.getElementById("finalMove").innerHTML = moves;
    document.getElementById("starRating").innerHTML = starRating;
    document.getElementById("totalTime").innerHTML = finalTime;
    closeModal();
  };
};

//close icon for modal
function closeModal(){
  closeicon.addEventListener("click", function(e){
    modal.classList.remove("show");
    startGame();
  });
};

//gives modal the option to play again
function playAgain(){
  modal.classList.remove("show");
  startGame();
};

//adds event listeners to the cards
for (var i = 0; i < cards.length; i++){
  card = cards[i];
  card.addEventListener("click", displayCard);
  card.addEventListener("click", cardOpen);
  card.addEventListener("click", congratulations);
};
