const game = {
    clickPower: 1,

    webs: [
        {
            webStrands : 0,
            modifiers : []
        }
    ],
    
    flies: {
        counter : 0,
        perSecond : 0,
    }
};


const flies = document.getElementById("flies");
const catchButton = document.getElementById("catch");


function tick() {
    const ticksPerSecond = 20;
    game.flies.counter += game.flies.perSecond / ticksPerSecond;
    updateUI();
}


function updateUI() {
    flies.textContent = "Flies: " + Math.floor(game.flies.counter);
}


catchButton.addEventListener("click", () => {
    game.flies.counter += game.clickPower;
    flies.textContent = "Flies: " + game.flies.counter;
});

setInterval(tick, 50);