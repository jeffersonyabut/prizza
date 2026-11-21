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

  soundButtons.style.display = "none";
  introLoading.classList.add("active");

  if (playMusic) {
    backgroundMusic.volume = 0;

    backgroundMusic
      .play()
      .then(() => {
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

  setTimeout(() => {
    soundIntro.classList.add("hidden");
    document.body.classList.remove("intro-active");
  }, 1000);
}

unmuteBtn.addEventListener("click", () => enterWebsite(true));
muteBtn.addEventListener("click", () => enterWebsite(false));

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

const previewAccents = {
  "Maternity Management System": "#79b8e8",
  Portfolio: "#9bb8ff",
  Multiplaycation: "#8ac9c2",
  Filmstack: "#a6a8ff",
  Anonmsg: "#83c7e5",
  "AI Agent": "#83b7d7",
};

// Project destinations
const projectLinks = {
  "Maternity Management System": {
    repo: "https://github.com/jeffersonyabut/MaternityManagementSystem",
  },

  Portfolio: {
    demo: "https://jeffersonyabut.github.io/prizza/",
    repo: "https://github.com/jeffersonyabut/prizza",
  },

  Multiplaycation: {
    demo: "https://jeffersonyabut.github.io/multiplaycation/",
    repo: "https://github.com/jeffersonyabut/multiplaycation",
  },

  Filmstack: {
    demo: "https://jeffersonyabut.github.io/Filmstack/",
    repo: "https://github.com/jeffersonyabut/Filmstack",
  },

  Anonmsg: {
    demo: "https://jeffersonyabut.github.io/Anonmsg/",
    repo: "https://github.com/jeffersonyabut/Anonmsg",
  },

  "AI Agent": {
    repo: "https://github.com/jeffersonyabut/n8n-db-backup",
  },
};

const projectCards = document.querySelectorAll(".card");

projectCards.forEach((el, index) => {
  const title = el.getAttribute("data-title") || "Untitled project";

  const tech = (el.getAttribute("data-tech") || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  const project = projectLinks[title] || {};
  const accent = previewAccents[title] || "#72bbff";
  const projectNumber = String(index + 1).padStart(2, "0");

  const techMarkup = tech
    .map((item) => `<span class="tech-tag">${item}</span>`)
    .join("");

  el.style.setProperty("--preview-accent", accent);

  el.setAttribute("role", "group");
  el.setAttribute("tabindex", "0");
  el.setAttribute("aria-label", `${title} project`);

  el.innerHTML = `
    <div class="card-heading">
      <span class="project-index">${projectNumber} / SELECTED WORK</span>

      ${
        project.repo
          ? `
            <a
              class="project-link"
              href="${project.repo}"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View ${title} source code on GitHub"
              title="View source code"
            >
              <img src="/prizza/public/link.svg" alt="" />
            </a>
          `
          : ""
      }
    </div>

    <div class="thumbnail" aria-hidden="true">
      <div class="preview-window">
        <div class="preview-toolbar">
          <span class="preview-dot"></span>
          <span class="preview-dot"></span>
          <span class="preview-dot"></span>
          <span class="preview-toolbar-line"></span>
        </div>

        <div class="preview-layout">
          <div class="preview-sidebar">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>

          <div class="preview-main">
            <span class="preview-heading"></span>

            <div class="preview-metrics">
              <span class="preview-metric"></span>
              <span class="preview-metric"></span>
              <span class="preview-metric"></span>
            </div>

            <div class="preview-chart"></div>
          </div>
        </div>
      </div>

      <span class="preview-float"></span>
    </div>

    <div class="card-footer">
      <div class="project-copy">
        <h4>${title}</h4>
      </div>

      <span class="project-arrow" aria-hidden="true">↗</span>
    </div>

    <div class="tech-list">
      ${techMarkup}
    </div>
  `;

  // Prevent GitHub link clicks from triggering the card click
  const repoLink = el.querySelector(".project-link");

  if (repoLink) {
    repoLink.addEventListener("click", (event) => {
      event.stopPropagation();

      click_Seffect.currentTime = 0;
      click_Seffect.play().catch(() => {});
    });
  }

  // Hover sound
  el.addEventListener("mouseenter", () => {
    click_Seffect.currentTime = 0;
    click_Seffect.play().catch(() => {});
  });

  // Main card click
  el.addEventListener("click", () => {
    hover_Seffect.currentTime = 0;
    hover_Seffect.play().catch(() => {});

    openProject(title);
  });

  // Keyboard accessibility
  el.addEventListener("keydown", (event) => {
    if (event.target !== el) return;

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openProject(title);
    }
  });
});

// ========================================
// PROJECT LINKS
// ========================================

function openProject(title) {
  const project = projectLinks[title];

  if (!project) return;

  const destination = project.demo || project.repo;

  if (destination) {
    window.open(destination, "_blank", "noopener,noreferrer");
  }
}

// ========================================
// DOWNLOAD BUTTON
// ========================================

// const dl_btn = document.querySelector(".dl_button");

// if (dl_btn) {
//   dl_btn.addEventListener("click", () => {
//     hover_Seffect.currentTime = 0;
//     hover_Seffect.play().catch(() => {});
//   });

//   dl_btn.addEventListener("mouseenter", () => {
//     click_Seffect.currentTime = 0;
//     click_Seffect.play().catch(() => {});
//   });
// }

// // ========================================
// // PROJECT LINKS
// // ========================================

// function openLink(title) {
//   if (title === "Anonmsg") {
//     window.open("https://jeffersonyabut.github.io/Anonmsg/", "_blank");
//   }

//   if (title === "POS + Inventory") {
//     alert("Project is On Development");
//   }

//   if (title === "Multiplaycation") {
//     window.open("https://jeffersonyabut.github.io/multiplaycation/", "_blank");
//   }

//   if (title === "Portfolio") {
//     window.open("https://jeffersonyabut.github.io/prizza/", "_blank");
//   }

//   if (title === "Filmstack") {
//     window.open("https://jeffersonyabut.github.io/Filmstack/", "_blank");
//   }

//   if (title === "Prizzabooth") {
//     alert("Project is On Development");
//   }

//   if (title === "AI Agent") {
//     window.open(
//       "https://www.facebook.com/profile.php?id=61581264338267",
//       "_blank",
//     );
//   }
// }
