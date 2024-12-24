
document.addEventListener("DOMContentLoaded", function () {
  const tracks = document.querySelectorAll(".books-track");

  tracks.forEach((track) => {
    const items = track.querySelectorAll(".book-item");

    const itemsToClone = Math.min(items.length, 11);
    const clonedItems = Array.from(items)
      .slice(0, itemsToClone)
      .map((item) => item.cloneNode(true));

    clonedItems.forEach((item) => track.appendChild(item));

    let currentIndex = 0;
    const moveStep = 1;
    const transitionTime = 500;

    function moveNext() {
      currentIndex += moveStep;
      track.style.transition = `transform ${transitionTime}ms linear`;
      track.style.transform = `translateX(-${currentIndex * items[0].offsetWidth}px)`;

      if (currentIndex >= items.length) {
        setTimeout(() => {
          track.style.transition = "none";
          currentIndex = 0;
          track.style.transform = "translateX(0)";
        }, transitionTime);
      }
    }

    let isHovered = false;
    track.addEventListener("mouseenter", () => (isHovered = true));
    track.addEventListener("mouseleave", () => (isHovered = false));

    setInterval(() => {
      if (!isHovered) {
        moveNext();
      }
    }, 2000);
  });
});
const style = document.createElement("style");
style.textContent = `
    .books-track {
      display: flex;
      transition: transform 0.5s linear;
    }
  `;
document.head.appendChild(style);

document.addEventListener("DOMContentLoaded", function () {
  const rocket = document.getElementById("backToTop");
  const firstScreen = document.querySelector(".container.position-relative");
  const journeySection = document.querySelector(".journey-section");

  window.addEventListener("scroll", function () {
    const firstScreenRect = firstScreen.getBoundingClientRect();

    if (firstScreenRect.bottom <= 0) {
      rocket.classList.add("visible");
    } else {
      rocket.classList.remove("visible");
    }
  });

  rocket.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const bgMusic = document.getElementById("bgMusic");
  const musicControl = document.getElementById("musicControl");
  let isPlaying = false;
  document.addEventListener(
    "click",
    function initAudio() {
      if (!isPlaying) {
        bgMusic
          .play()
          .then(() => {
            isPlaying = true;
            musicControl.classList.add("playing");
          })
          .catch((error) => {
            console.log("播放失败:", error);
          });
        document.removeEventListener("click", initAudio);
      }
    },
    { once: true }
  );
  musicControl.addEventListener("click", function (e) {
    e.stopPropagation();
    if (isPlaying) {
      bgMusic.pause();
      musicControl.classList.remove("playing");
    } else {
      bgMusic.play();
      musicControl.classList.add("playing");
    }
    isPlaying = !isPlaying;
  });
});
