/* ==========================================
   LOADER
========================================== */

window.addEventListener("load", () => {
    const loader = document.getElementById("loader");

    setTimeout(() => {
        loader.style.opacity = "0";

        loader.style.visibility = "hidden";
    }, 1000);
});

/* ==========================================
   COUNTDOWN
========================================== */

const weddingDate = new Date("July 26, 2026 19:00:00").getTime();

const countdown = () => {
    const now = new Date().getTime();

    const distance = weddingDate - now;

    if (distance <= 0) {
        document.getElementById("countdown").innerHTML =
            "<h2>💍 Today is Our Wedding Day! 💍</h2>";

        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));

    const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );

    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").textContent = days;

    document.getElementById("hours").textContent = hours;

    document.getElementById("minutes").textContent = minutes;

    document.getElementById("seconds").textContent = seconds;
};

countdown();

setInterval(countdown, 1000);

/* ==========================================
   MUSIC
========================================== */

const music = document.getElementById("bgMusic");

const musicBtn = document.getElementById("musicBtn");

let playing = false;

musicBtn.addEventListener("click", () => {
    if (!playing) {
        music.play();

        playing = true;

        musicBtn.innerHTML = "❚❚";
    } else {
        music.pause();

        playing = false;

        musicBtn.innerHTML = "♫";
    }
});

/* ==========================================
   SCROLL REVEAL
========================================== */

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";

                entry.target.style.transform = "translateY(0)";
            }
        });
    },
    {
        threshold: 0.01,
    },
);

document.querySelectorAll("section").forEach((section) => {
    section.style.opacity = "0";

    section.style.transform = "translateY(60px)";

    section.style.transition = "all 1s ease";

    observer.observe(section);
});

/* ==========================================
   FLOATING FLOWERS
========================================== */

const flowerContainer = document.getElementById("flowers");

function createFlower() {
    const flower = document.createElement("div");

    flower.className = "flower";

    flower.innerHTML = "❀";

    flower.style.left = Math.random() * window.innerWidth + "px";

    flower.style.fontSize = 15 + Math.random() * 25 + "px";

    flower.style.animationDuration = 8 + Math.random() * 8 + "s";

    flowerContainer.appendChild(flower);

    setTimeout(() => {
        flower.remove();
    }, 16000);
}

setInterval(createFlower, 500);

/* ==========================================
   IMAGE LIGHTBOX
========================================== */

const images = document.querySelectorAll(
    ".story-image img, .invitation-card img",
);

const lightbox = document.createElement("div");

lightbox.style.position = "fixed";
lightbox.style.top = "0";
lightbox.style.left = "0";
lightbox.style.width = "100%";
lightbox.style.height = "100%";
lightbox.style.background = "rgba(0,0,0,.92)";
lightbox.style.display = "none";
lightbox.style.justifyContent = "center";
lightbox.style.alignItems = "center";
lightbox.style.zIndex = "99999";
lightbox.style.cursor = "zoom-out";

const lightboxImage = document.createElement("img");

lightboxImage.style.maxWidth = "90%";
lightboxImage.style.maxHeight = "90%";
lightboxImage.style.borderRadius = "15px";
lightboxImage.style.boxShadow = "0 15px 40px rgba(0,0,0,.5)";

lightbox.appendChild(lightboxImage);

document.body.appendChild(lightbox);

images.forEach((image) => {
    image.addEventListener("click", () => {
        lightbox.style.display = "flex";

        lightboxImage.src = image.src;
    });
});

lightbox.addEventListener("click", () => {
    lightbox.style.display = "none";
});

/* ==========================================
   RSVP
========================================== */

const form = document.querySelector(".rsvp form");

const modal = document.getElementById("thankYouModal");

const modalMessage = document.getElementById("modalMessage");

const modalClose = document.getElementById("modalClose");

modalClose.addEventListener("click", () => {
    modal.classList.remove("active");
});

modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.classList.remove("active");
});

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = form.querySelector("input").value;

    const attending = form.querySelector("select").value;

    const message = form.querySelector("textarea").value;

    const formUrl =
        "https://docs.google.com/forms/d/e/1FAIpQLScQX6-x699mQxlfECO0W7weUWpRKfyLjxVXfIqYds8D5tO6ZA/formResponse";

    const data = new FormData();

    data.append("entry.610443421", name);

    data.append("entry.1052894339", attending);

    data.append("entry.1434385732", message);

    fetch(formUrl, { method: "POST", body: data, mode: "no-cors" }).catch(
        () => {},
    );

    modalMessage.innerHTML =
        attending === "yes"
            ? `We're so happy you'll be joining us, <strong>${name}</strong>! 🎉<br>We can't wait to celebrate with you!`
            : `Thank you for letting us know, <strong>${name}</strong>.<br>You'll be missed, but we're grateful for your love and wishes! ❤️`;

    modal.classList.add("active");

    form.reset();
});

/* ==========================================
   PARALLAX HERO
========================================== */

window.addEventListener("scroll", () => {
    const hero = document.querySelector(".hero");

    hero.style.backgroundPositionY = window.pageYOffset * 0.2 + "px";
});

/* ==========================================
   SMOOTH BUTTON HOVER
========================================== */

document.querySelectorAll(".btn").forEach((btn) => {
    btn.addEventListener("mouseenter", () => {
        btn.style.transform = "translateY(-5px) scale(1.03)";
    });

    btn.addEventListener("mouseleave", () => {
        btn.style.transform = "translateY(0) scale(1)";
    });
});

/* ==========================================
   AUTO PLAY MUSIC
   (starts after first user interaction)
========================================== */

document.addEventListener("click", function startMusic() {
    if (!playing) {
        music
            .play()
            .then(() => {
                playing = true;

                musicBtn.innerHTML = "❚❚";
            })
            .catch(() => {});
    }

    document.removeEventListener("click", startMusic);
});

/* ==========================================
   END
========================================== */
