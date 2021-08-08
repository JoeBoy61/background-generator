// firework website for reference
// https://www.cssscript.com/firework-animation-canvas/
const fireworksContainer = document.querySelector('.fireworks-container');
const button = document.querySelector('.start-button');
const dotsContainer = document.querySelector('.dots-container');
const dots = document.querySelectorAll('.dots');
const group1 = document.querySelectorAll('.group1');
const group2 = document.querySelectorAll('.group2');
const group3 = document.querySelectorAll('.group3');
const intro = document.querySelectorAll('.intro');
const song = document.getElementById('bowie');
const fireworks = new Fireworks(fireworksContainer, {
    rocketsPoint: 50,
    hue: { min: 0, max: 360 },
    delay: { min: 15, max: 30 },
    speed: 3,
    acceleration: 1.05,
    friction: 0.95,
    gravity: 1.5,
    particles: 50,
    trace: 3,
    explosion: 10,
    autoresize: true,
    brightness: { 
      min: 50, 
      max: 80,
      decay: { min: 0.015, max: 0.03 }
    },
    boundaries: { 
        x: 50, 
        y: 50, 
        width: fireworksContainer.clientWidth, 
        height: fireworksContainer.clientHeight 
    }
});

let groupOneInterval;
let groupTwoInterval;
let groupThreeInterval;

let count = 0;

let colorArrayOne = ['#A993BD', '#8890CE', '#7CABC5', '#7BCAB0', '#EBF6AE', '#FFECAC'];
let colorArrayTwo = ['#FDABAD', '#D08DB0', '#3D1B9D', '#1C379B', '#135E93', '#6CCE0F'];
let colorArrayThree = ['#434F58', '#6CCE0F', '#3C404F', '#B5A1FA', '#98A6FE'];

let arr1 = ['position1', 'position6', 'position9', 'position12', 'position15', 'position18', 'position19'];
let arr2 = ['position2', 'position5', 'position8', 'position11', 'position14', 'position17', 'position20'];
let arr3 = ['position3', 'position4', 'position7', 'position10', 'position13', 'position16',];

// Reset setInterval, reset dots
function reset() {
    count = 0;
    song.pause();
    song.load();
    clearInterval(groupOneInterval, groupTwoInterval, groupThreeInterval);
    dotsContainer.classList.remove('darkTheme');
    intro.forEach(item => {
        item.classList.remove('hidden');
    });
    dotsContainer.classList.add('hidden');
    dots.forEach(dot => {
        dot.classList.add('hidden');
        dot.style.color = 'black';
    });
    fireworksContainer.classList.add('hidden');
    fireworks.stop();
};


// Shuffle Array Function
function shuffle(array) {
    var currentIndex = array.length,  randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
  }

function groupThreeDotMovement(){
    shuffle(arr3);
    group3.forEach((dot, index) => {
        dot.classList = '';
        dot.classList.add('dots');
        dot.classList.add('group3');
        dot.classList.add('fas');
        dot.classList.add('fa-rocket');
        dot.classList.add(arr3[index]);
    });
}

function groupTwoDotMovement() {
    shuffle(arr2);
    group2.forEach((dot, index) => {
        dot.classList = '';
        dot.classList.add('dots');
        dot.classList.add('group2');
        dot.classList.add('fas');
        dot.classList.add('fa-rocket');
        dot.classList.add(arr2[index]);
    });
}

function groupOneDotMovement(){
    shuffle(arr1);
    shuffle(colorArrayOne);
    shuffle(colorArrayTwo);
    shuffle(colorArrayThree);
    count++;
    group1.forEach((dot, index) => {
        dot.classList = '';
        dot.classList.add('dots');
        dot.classList.add('group1');
        dot.classList.add('fas');
        dot.classList.add('fa-rocket');
        dot.classList.add(arr1[index]);
    });
    // Fade To Black Background
    if (count >= 43){
        dotsContainer.classList.add('darkTheme');
    }
    // Begin Color changing for Rockets
    if(count >= 49){
        group1.forEach((dot, index) => {
            dot.style.color = colorArrayOne[index];
        });
        group2.forEach((dot, index) => {
            dot.style.color = colorArrayTwo[index];
        });
        group3.forEach((dot, index) => {
            dot.style.color = colorArrayThree[index];
        });

    };  
};

// Play Fireworks
function playFireworks(){
    fireworks.start();
}

// Start Rocket Movement, song , and initialize intervals
function startDots(){
    groupOneInterval = setInterval(groupOneDotMovement, 1800);
    groupTwoInterval = setInterval(groupTwoDotMovement, 2700);
    groupThreeInterval = setInterval(groupThreeDotMovement, 2000);
    groupOneDotMovement();
    groupTwoDotMovement();
    groupThreeDotMovement();
    setTimeout(groupOneDotMovement, 200);
    setTimeout(groupTwoDotMovement, 300);
    setTimeout(groupThreeDotMovement, 400);
    setTimeout(playFireworks, 86000);
    song.play();
    fireworks.setSize({ height: fireworksContainer.clientHeight, width: fireworksContainer.clientWidth });
};

// On Button Click, Show Rockets Container, Start Rocket Movement
function showDotsContainer(){
    intro.forEach((item) => {
        item.classList.add('hidden');
    });
    dotsContainer.classList.remove('hidden');
    dots.forEach((dot) => {
        dot.classList.remove('hidden');
    });
    fireworksContainer.classList.remove('hidden');
    startDots();

};

// Event Listeners
button.addEventListener('click', showDotsContainer);
fireworksContainer.addEventListener('click', reset);