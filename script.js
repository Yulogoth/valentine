const config = {
    image: "photo.jpg",
    mainText: "💖будешь моей валентинкой?💖",

    yesRedirect: "https://youtu.be/r5RlOnjoHf0?si=fSv7kztiw4QFfr5Q",
    noRedirect: "https://службапоконтракту.рф",

    yesButtonTexts: [
        "да🥰",
        "точно да😍",
        "конечно да💕",
        "ДА-ДА❤️",
        "ну конечно да😘",
        "я согласна💖",
        "без вариантов ДА💍"
    ],

    noButtonTexts: [
        "нет🙈",
        "ты уверена?😢",
        "подумай ещё🥺",
        "ну пожалуйста😭",
        "последний шанс😅",
        "ты убьёшь меня💔",
        "ладно.. всё равно люблю тебя❤️"
    ]
};

let noClickCount = 0;
const maxClicks = 7;

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const mainText = document.getElementById("mainText");
const mainImage = document.getElementById("mainImage");

const heartsContainer = document.createElement("div");
heartsContainer.classList.add("hearts-container");
document.body.appendChild(heartsContainer);

mainImage.src = config.image;
mainText.textContent = config.mainText;
yesBtn.textContent = config.yesButtonTexts[0];
noBtn.textContent = config.noButtonTexts[0];

yesBtn.addEventListener("click", () => {

    yesBtn.disabled = true;
    noBtn.disabled = true;

    const heartInterval = setInterval(() => {
        for (let i = 0; i < 6; i++) {
            createHeart();
        }
    }, 120);


    setTimeout(() => {
        clearInterval(heartInterval);
        window.location.href = config.yesRedirect;
    }, 2500);
});

noBtn.addEventListener("click", () => {
    if (noClickCount < maxClicks - 1) {
        noClickCount++;

        yesBtn.textContent = config.yesButtonTexts[noClickCount];
        noBtn.textContent = config.noButtonTexts[noClickCount];

        yesBtn.style.transform = `scale(${1 + noClickCount * 0.4})`;
        noBtn.style.transform = `scale(${1 - noClickCount * 0.1})`;
    } else {
        window.location.href = config.noRedirect;
    }
});

function createHeart() {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.innerHTML = "❤️";

    const fromLeft = Math.random() > 0.5;

    heart.style.top = Math.random() * 100 + "vh";
    heart.style.left = fromLeft ? "-30px" : "100vw";

    const xMove = fromLeft
        ? Math.random() * 300 + 200 + "px"
        : -(Math.random() * 300 + 200) + "px";

    const yMove = (Math.random() * -200 - 100) + "px";

    heart.style.setProperty("--x-move", xMove);
    heart.style.setProperty("--y-move", yMove);

    heart.style.fontSize = Math.random() * 25 + 20 + "px";

    heartsContainer.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 2500);
}

