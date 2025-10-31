const game = {
    costMultiplier : 1.1,

    currentWeb: 0,

    clickPower: 1,
    upgradePower : 1,

    webs: [
        {
            strands : {
                cost : 10,
                counter : 1,
                perMinute : 1 //how much each strand gives per minute (base)
            },

            modifiers : [],
        }
    ],
    
    flies: {
        counter : 0,
        perSecond : 0,
    }
};


const fliesCounter = document.querySelector(".flies.counter");
const hunt = document.querySelector(".flies.button.hunt");
const spinStrandButton = document.querySelector(".strand.button");
const strandCounter = document.querySelector(".strand.counter");
const strandCost = document.querySelector(".strand.cost");
const fps = document.getElementById("fps");


function tick() {
    const ticksPerSecond = 20;
    game.flies.counter += game.flies.perSecond / ticksPerSecond;
    
    updateUI();
}

function calculatePerSecond() {
    let fliesPerSecond = 0;
    fliesPerSecond += (game.webs.map(web => web.strands.counter * web.strands.perSecond)).reduce((acc, val) => acc + val, 0);
    game.flies.perSecond = fliesPerSecond;
}

function getTotalCost(baseCost, count) {
    return Math.ceil(baseCost * (Math.pow(game.costMultiplier, count) - 1) / (game.costMultiplier - 1));
}

function upgrade(type, counterUI, costUI) {
    const totalCost = getTotalCost(type.cost, game.upgradePower);

    if (totalCost > game.flies.counter) return;

    type.counter += game.upgradePower;
    game.flies.counter -= totalCost;
    type.cost = Math.ceil(type.cost * Math.pow(1.1, game.upgradePower));

    counterUI.textContent = type.counter;
    costUI.textContent = Math.ceil(type.cost);
    calculatePerSecond();
    updateFPS();
    updateUI();
}

function updateFPS() {
    fps.textContent = Math.floor(game.flies.perSecond * 10)/10;
}


function updateUI() {
    fliesCounter.textContent = Math.floor(game.flies.counter);
}


hunt.addEventListener("click", () => {
    game.flies.counter += game.clickPower;
    updateUI();
});

spinStrandButton.addEventListener("click", () => {
    upgrade(game.webs[game.currentWeb].strands, strandCounter, strandCost);
});

setInterval(tick, 50);