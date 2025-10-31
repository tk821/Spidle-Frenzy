const game = {
    costMultiplier : 1.1,

    currentWeb: 0,

    clickPower: 1,
    upgradePower : 1,
    maxWebSegments : 15,

    catchProgress : 0,

    webs: [
        {
            segments : {
                cost : 10,
                counter : 1,
                basePerMinute : 5, //how much each strand gives per minute
                baseCapacity : 5
            },

            catchesPerMinute : 5, //how much web catches per minute
            uncollectedFlies : 0,
            capacity : 5,
            modifiers : [],
        }
    ],
    
    flies: {
        counter : 0,
        perSecond : 0,
    }
};


const fliesCounter = document.querySelector(".flies.counter");
const huntButton = document.querySelector(".flies.button.hunt");
const spinSegmentButton = document.querySelector(".segment.button");
const segmentCounter = document.querySelector(".segment.counter");
const segmentCost = document.querySelector(".segment.cost");
const fps = document.getElementById("fps");
const fliesinWeb = document.getElementById("flies-in-web");
const catchesPerMinuteCounter = document.querySelector(".web.cpm");
const webCapacity = document.getElementById("max-flies");
const harvestButton = document.querySelector(".button.harvest")


function tick() {
    const ticksPerSecond = 20;
    game.flies.counter += game.flies.perSecond / ticksPerSecond;
    game.catchProgress += game.webs[game.currentWeb].catchesPerMinute / ticksPerSecond / 60;
    if (game.catchProgress >= 1) {
        let temp = Math.floor(game.catchProgress);
        if (game.webs[game.currentWeb].capacity > game.webs[game.currentWeb].uncollectedFlies + temp) {
            game.webs[game.currentWeb].uncollectedFlies += temp;
            game.catchProgress -= temp;
        }
        else {
            game.webs[game.currentWeb].uncollectedFlies = game.webs[game.currentWeb].capacity;
            game.catchProgress = 0;
        }
    }
    updateUI();
}

function calculatePerSecond() {
    let fliesPerSecond = 0;
    fliesPerSecond += (game.webs.map(web => web.segments.counter * web.segments.basePerSecond)).reduce((acc, val) => acc + val, 0);
    game.flies.perSecond = fliesPerSecond;
}

function getTotalCost(baseCost, count) {
    return Math.ceil(baseCost * (Math.pow(game.costMultiplier, count) - 1) / (game.costMultiplier - 1));
}

function spinSegment() {
    const segment = game.webs[game.currentWeb].segments;
    const totalCost = getTotalCost(segment.cost, game.upgradePower);

    if (totalCost > game.flies.counter) return;

    segment.counter += game.upgradePower;
    game.flies.counter -= totalCost;
    segment.cost = Math.ceil(segment.cost * Math.pow(1.1, game.upgradePower));

    game.webs[game.currentWeb].capacity = game.webs[game.currentWeb].segments.baseCapacity * game.webs[game.currentWeb].segments.counter;
    webCapacity.textContent = game.webs[game.currentWeb].capacity;

    segmentCounter.textContent = segment.counter;
    segmentCost.textContent = segment.cost;

    updateCPM();
    updateUI();
}

function harvest() {
    game.flies.counter += game.webs[game.currentWeb].uncollectedFlies;
    game.webs[game.currentWeb].uncollectedFlies = 0;
}

function updateFPS() {
    fps.textContent = Math.floor(game.flies.perSecond * 10)/10;
}

function updateCPM() {
    const web = game.webs[game.currentWeb];
    web.catchesPerMinute = web.segments.counter * web.segments.basePerMinute;
    catchesPerMinuteCounter.textContent = web.catchesPerMinute;
}


function updateUI() {
    fliesCounter.textContent = Math.floor(game.flies.counter);
    fliesinWeb.textContent = game.webs[game.currentWeb].uncollectedFlies;
}


huntButton.addEventListener("click", () => {
    game.flies.counter += game.clickPower;
    updateUI();
});

harvestButton.addEventListener("click", () => {
    harvest();
    updateUI();
})

spinSegmentButton.addEventListener("click", () => {
    spinSegment(game.webs[game.currentWeb].segments, segmentCounter, segmentCost);
});

setInterval(tick, 50);