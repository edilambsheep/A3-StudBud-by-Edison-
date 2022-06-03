

function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }









  

/* This code is not my own. It is sourced from Raj Gupta and included in ReadMe file references. This section performs the Pomdoro Timer and button interactions */
var pomodoro = {
  started : false,
  minutes : 0,
  seconds : 0,
  interval : null,
  minutesDom : null,
  secondsDom : null,
  init : function(){
    var self = this;
    this.minutesDom = document.querySelector('#minutes');
    this.secondsDom = document.querySelector('#seconds');
    this.interval = setInterval(function(){
      self.intervalCallback.apply(self);
    }, 1000);
    document.querySelector('#work').onclick = function(){
      self.startWork.apply(self);
    };
    document.querySelector('#shortBreak').onclick = function(){
      self.startShortBreak.apply(self);
    };
    document.querySelector('#longBreak').onclick = function(){
      self.startLongBreak.apply(self);
    };
    document.querySelector('#stop').onclick = function(){
      self.stopTimer.apply(self);
    };
  },


  resetVariables : function(mins, secs, started){
    this.minutes = mins;
    this.seconds = secs;
    this.started = started;
  },

  startWork: function() {
    this.resetVariables(25, 0, true);
  },

  startShortBreak : function(){
    this.resetVariables(5, 0, true);
  },

  startLongBreak : function(){
    this.resetVariables(15, 0, true);
  },

  stopTimer : function(){
    this.resetVariables(25, 0, false);
    this.updateDom();
  },

  toDoubleDigit : function(num){
    if(num < 10) {
      return "0" + parseInt(num, 10);
    }
    return num;
  },

  updateDom : function(){
    this.minutesDom.innerHTML = this.toDoubleDigit(this.minutes);
    this.secondsDom.innerHTML = this.toDoubleDigit(this.seconds);
  },

  intervalCallback : function(){
    if(!this.started) return false;
    if(this.seconds == 0) {
      if(this.minutes == 0) {
        this.timerComplete();
        return;
      }
      this.seconds = 59;
      this.minutes--;
    } else {
      this.seconds--;
    }
    this.updateDom();
  },
  timerComplete : function(){
    this.started = false;
    this.fillerHeight = 0;
  }
};
window.onload = function(){
pomodoro.init();
};




/*This code is not own. This is sourced from yogeshwara and included in the ReadMe file references. This performs the dictionary functionalities */

const txtBox = document.querySelector(".txtBox");
const form = document.querySelector(".searchForm");
const searchWord = document.querySelector(".search-word");
const description = document.querySelector(".description");
const dictionaryJson =
  "https://raw.githubusercontent.com/adambom/dictionary/master/dictionary.json";

function searchDict(e) {
  e.preventDefault();
  fetch(dictionaryJson)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      e.preventDefault;
      let word = txtBox.value;
      console.log(txtBox.value);
      let searchKeyword = word.toUpperCase();
      Object.keys(data).forEach(function(key) {
        if (key === searchKeyword) {
          searchWord.innerHTML = searchKeyword;
          if(searchKeyword === data[key]){
            description.innerHTML = "Not found";
          }
          else{
             description.innerHTML = data[key];
          }
          
          console.log(data[key]);
        }
      });
    });
}

form.addEventListener("submit", searchDict);

