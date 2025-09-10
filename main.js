let game = document.querySelector(".main-game");
let horizon = document.querySelector(".horizon img");
let horizonDiv = document.querySelector(".horizon");
let t_rex = document.querySelector(".t-rex");
let cactues = document.querySelectorAll(".cactues img");
let cloud = document.querySelector(".cl1");
let bird = document.querySelector(".bird");
let cactuesArr = Array.from(cactues);
let GameOver = document.querySelector(".game-over");
let position = 0;
let poss = 4;
let isGameOver = false;
let isBegain = false; 
let counter = 0;
let counterP = document.querySelector(".score .sc");
let HI = localStorage.getItem("HI");
let HISpan = document.querySelector(".HI span");
let score = document.querySelector(".score");
const mediaQuery = window.matchMedia("(max-width: 600px)");

function moveHorizon() {
    position -= poss; 
    if (position <= -(horizon.width - 1200)) {
        position = 0;
    }
    if ( !isGameOver )
        horizon.style.transform = `translateX(${position}px)`;
    requestAnimationFrame(moveHorizon);
}

setInterval(() => {
    if ( !isGameOver && isBegain) {
        counter ++;
        counterP.innerHTML = counter;
        HISpan.innerHTML = HI;
        game.append(counterP);
        if ( counter > HI)
            localStorage.setItem("HI", counter);
        }
}, 100)

setInterval(() => {
    if (!isGameOver) poss += 0.2;
}, 15000);

window.addEventListener("DOMContentLoaded", () => {
    document.addEventListener("keydown", (e) => MainFun(e));
    // Works for both mouse clicks & touch taps
    document.addEventListener("pointerdown", (e) => MainFun(e), { passive: false });
});

function MainFun(e) {
    // Only react to Space when using keyboard
    if (e.type === "keydown" && e.code !== "Space") return;

    if (!isGameOver) {
        if (e.cancelable) e.preventDefault();

        score.style.cssText = "display: block;";
        isBegain = true;

        if (!t_rex.classList.contains("active")) {
            t_rex.classList.add("active");
            t_rex.classList.add("jump");
            setTimeout(() => t_rex.classList.remove("jump"), 800);

            if (!horizonDiv.classList.contains("full-hoirzon")) {
                horizonDiv.classList.add("full-hoirzon");
            }

            moveHorizon();
            cloud.classList.add("cl");
            setTimeout(spawnCactus, 5000);
            setTimeout(spawnBird, 20000);
        } else {
            t_rex.classList.add("jump");
            setTimeout(() => t_rex.classList.remove("jump"), 800);
        }
    } else {
        location.reload();
    }
}



function spawnCactus() {
    if ( !isGameOver) {
        let CacIndex = Math.floor(Math.random() * cactuesArr.length);
        let cactus = cactuesArr[CacIndex];
    
        cactus.style.right = "-80px";
        let pos = -80;

        function move() {
        pos += poss;

        cactus.style.right = pos + "px";

        if (pos < 5000)
            requestAnimationFrame(move);
        }

        requestAnimationFrame(move);

        let nextTime = Math.random() * 2000 + 1200;
        setTimeout(spawnCactus, nextTime);
    }
}

function spawnBird() {    
    if (!isGameOver) {
        bird.style.right = "250px";
    
        let pos = -50;

        function move() {
            pos += poss - 1;
            bird.style.right = pos + "px"

            if (pos < 8000)
                requestAnimationFrame(move);
            }

        requestAnimationFrame(move);

        let nextTime = Math.random() * 2000 + 7000;
        setTimeout(spawnBird, nextTime);
    }
}

setInterval(() => {
    const dinoRect = t_rex.getBoundingClientRect();
    const birdRect = bird.getBoundingClientRect();

    if (
        dinoRect.right > birdRect.left - 20 &&
        dinoRect.left < birdRect.right + 20 &&
        dinoRect.top < birdRect.bottom - 20 &&
        dinoRect.bottom > birdRect.top + 20
        ) {
            EndGame();
        }

        for (let cactus of cactuesArr) {
        const cactusRect = cactus.getBoundingClientRect();

        if (
            dinoRect.right > cactusRect.left + 20 &&
            dinoRect.left < cactusRect.right + 20 &&
            dinoRect.bottom > cactusRect.top + 20
        ) {
            EndGame();
        }
    }
}, 10);   

function EndGame() {
    isGameOver = true;
            cloud.classList.remove("cl");
            GameOver.style.cssText = "display: block;";
            t_rex.classList.remove("active");
            t_rex.style.cssText = "background-image: url(\"Image/Y-Rex\\(6\\).png\");"

}


