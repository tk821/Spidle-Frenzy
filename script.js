const game = {
    webs: {

    }


};


let fliesCounter = 0;
let webStrands = 0;
let webs = 0;
const flies = document.getElementById("flies");
const catchButton = document.getElementById("catch");


catchButton.addEventListener("click", () => {
    fliesCounter++;
    flies.textContent = "Flies: " + fliesCounter;
});

