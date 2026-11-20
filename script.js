const hover_Seffect = new Audio("/prizza/public/Effects/tick.mp3");
const click_Seffect = new Audio("/prizza/public/Effects/click.mp3");

const backgroundMusic = new Audio("/prizza/lofi.mp3");
backgroundMusic.loop = true;
backgroundMusic.volume = 0;

// ========================================
// BACKGROUND MUSIC INTRO
// ========================================

const soundIntro = document.getElementById("soundIntro");
const soundButtons = document.getElementById("soundButtons");
const introLoading = document.getElementById("introLoading");

const unmuteBtn = document.getElementById("unmuteBtn");
const muteBtn = document.getElementById("muteBtn");

let introStarted = false;
document.body.classList.add("intro-active");

function enterWebsite(playMusic) {
  if (introStarted) return;

  introStarted = true;

  // Hide buttons and show loading animation
  soundButtons.style.display = "none";
  introLoading.classList.add("active");

  if (playMusic) {
    // Start playback directly from the button interaction
    backgroundMusic.volume = 0;

    backgroundMusic
      .play()
      .then(() => {
        // Gradually increase music volume
        let volume = 0;

        const fadeInterval = setInterval(() => {
          volume += 0.05;

          if (volume >= 0.35) {
            volume = 0.35;
            clearInterval(fadeInterval);
          }

          backgroundMusic.volume = volume;
        }, 100);
      })
      .catch((error) => {
        console.warn("Background music could not play:", error);
      });
  }

  // One-second loading transition
  setTimeout(() => {
    soundIntro.classList.add("hidden");
    document.body.classList.remove("intro-active");
  }, 1000);
}

unmuteBtn.addEventListener("click", () => {
  enterWebsite(true);
});

muteBtn.addEventListener("click", () => {
  enterWebsite(false);
});

// ========================================
// SOUND EFFECTS
// ========================================

function playHoverSound() {
  const viewportWidth = window.innerWidth;

  if (viewportWidth < 834) {
    hover_Seffect.muted = true;
    click_Seffect.muted = true;
    hover_Seffect.volume = 0;
    click_Seffect.volume = 0;
  }
}

playHoverSound();

// ========================================
// PROJECT CARDS
// ========================================

document.querySelectorAll(".card").forEach((el) => {
  const title = el.getAttribute("data-title");
  const tech = el.getAttribute("data-tech");

  el.innerHTML = `
    <div style="width: 100%; height: 16px; display: flex; justify-content: flex-end;">
      <img src="/prizza/public/link.svg" alt="link" />
    </div>

    <div class="title-bar">
      <h4>${title}</h4>
    </div>

    <div class="thumbnail">
      <p>${tech}</p>
    </div>
  `;

  el.addEventListener("mouseenter", () => {
    click_Seffect.currentTime = 0;
    click_Seffect.play().catch(() => {});
  });

  el.addEventListener("click", () => {
    hover_Seffect.currentTime = 0;
    hover_Seffect.play().catch(() => {});

    openLink(title);
  });
});

// ========================================
// DOWNLOAD BUTTON
// ========================================

const dl_btn = document.querySelector(".dl_button");

if (dl_btn) {
  dl_btn.addEventListener("click", () => {
    hover_Seffect.currentTime = 0;
    hover_Seffect.play().catch(() => {});
  });

  dl_btn.addEventListener("mouseenter", () => {
    click_Seffect.currentTime = 0;
    click_Seffect.play().catch(() => {});
  });
}

// ========================================
// PROJECT LINKS
// ========================================

function openLink(title) {
  if (title === "Anonmsg") {
    window.open("https://jeffersonyabut.github.io/Anonmsg/", "_blank");
  }

  if (title === "POS + Inventory") {
    alert("Project is On Development");
  }

  if (title === "Multiplaycation") {
    window.open("https://jeffersonyabut.github.io/multiplaycation/", "_blank");
  }

  if (title === "Portfolio") {
    window.open("https://jeffersonyabut.github.io/prizza/", "_blank");
  }

  if (title === "Filmstack") {
    window.open("https://jeffersonyabut.github.io/Filmstack/", "_blank");
  }

  if (title === "Prizzabooth") {
    alert("Project is On Development");
  }

  if (title === "AI Agent") {
    window.open(
      "https://www.facebook.com/profile.php?id=61581264338267",
      "_blank",
    );
  }
}
