// Generate falling hearts and roses
const container = document.querySelector('.falling-container');
const symbols = ['💖','🌹','❤️','💘','😭'];

function createFallingElement() {
  const el = document.createElement('div');
  el.classList.add('falling');
  el.innerText = symbols[Math.floor(Math.random() * symbols.length)];
  el.style.left = Math.random() * 100 + 'vw';
  el.style.animationDuration = 3 + Math.random() * 2 + 's';
  el.style.fontSize = (20 + Math.random() * 15) + 'px';
  container.appendChild(el);

  setTimeout(() => {
    el.remove();
  }, 5000);
}

setInterval(createFallingElement, 300);

// Play/Pause button logic
window.addEventListener('DOMContentLoaded', function() {
  const audio = document.getElementById('myAudio');
  const playBtn = document.getElementById('playButton');
  if (audio && playBtn) {
    // Hide default controls
    audio.removeAttribute('controls');
    // Set initial state
    playBtn.classList.remove('paused');
    let isPlaying = false;

    function updateButton() {
      if (audio.paused) {
        playBtn.classList.remove('paused');
        playBtn.classList.remove('heart-pulse');
      } else {
        playBtn.classList.add('paused');
        playBtn.classList.add('heart-pulse');
      }
    }

    playBtn.addEventListener('click', function() {
      if (audio.paused) {
        audio.play();
      } else {
        audio.pause();
      }
    });

    audio.addEventListener('play', updateButton);
    audio.addEventListener('pause', updateButton);
    updateButton();
  }
});

// Rotate profile image border
window.addEventListener('DOMContentLoaded', function() {
  const audio = document.getElementById('myAudio');
  const photoWrapper = document.querySelector('.her-photo-wrapper');
  if (audio && photoWrapper) {
    function updateRotation() {
      if (!audio.paused) {
        photoWrapper.classList.add('rotating');
      } else {
        photoWrapper.classList.remove('rotating');
      }
    }
    audio.addEventListener('play', updateRotation);
    audio.addEventListener('pause', updateRotation);
    audio.addEventListener('ended', updateRotation);
    updateRotation();
  }
});

// Typing Animation
window.addEventListener('DOMContentLoaded', function() {
  const typingElements = document.querySelectorAll('.typing-text');
  let isTyping = false;
  let typingAnimationPromise = null;

  function typeText(element, text, speed = 50) {
    return new Promise((resolve) => {
      let charIndex = 0;
      element.textContent = '';
      element.classList.add('typing');
      
      function typeChar() {
        if (charIndex < text.length) {
          element.textContent += text[charIndex];
          charIndex++;
          setTimeout(typeChar, speed);
        } else {
          element.classList.remove('typing');
          element.classList.add('typed');
          resolve();
        }
      }
      
      typeChar();
    });
  }

  async function startTypingAnimation() {
    if (isTyping) return;
    isTyping = true;

    for (let i = 0; i < typingElements.length; i++) {
      const element = typingElements[i];
      const text = element.getAttribute('data-original-text');
      element.textContent = '';
      
      // Wait a bit before starting each paragraph
      if (i > 0) {
        await new Promise(resolve => setTimeout(resolve, 500));
      }
      
      await typeText(element, text, 120); // 120ms delay between characters
      
      // Pause between paragraphs
      if (i < typingElements.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 800));
      }
    }
    
    isTyping = false;
  }

  function resetTypingAnimation() {
    isTyping = false;
    typingElements.forEach(el => {
      el.classList.remove('typed', 'typing');
      el.textContent = '';
    });
  }

  // Store original text for reset functionality
  typingElements.forEach(element => {
    element.setAttribute('data-original-text', element.textContent);
    element.textContent = '';
  });

  // Start typing animation only when audio plays
  const audio = document.getElementById('myAudio');
  if (audio) {
    audio.addEventListener('play', function() {
      resetTypingAnimation();
      setTimeout(() => {
        startTypingAnimation();
      }, 300); // small delay for smoothness
    });
    audio.addEventListener('pause', function() {
      resetTypingAnimation();
    });
    audio.addEventListener('ended', function() {
      resetTypingAnimation();
    });
  }

  // Optional: Restart typing animation on scroll to letter section (disabled for now)
  // const letterSection = document.querySelector('.letter-section');
  // if (letterSection) {
  //   const observer = new IntersectionObserver((entries) => {
  //     entries.forEach(entry => {
  //       if (entry.isIntersecting && !isTyping) {
  //         // Reset all elements
  //         typingElements.forEach(el => {
  //           el.classList.remove('typed', 'typing');
  //           el.textContent = el.getAttribute('data-original-text') || el.textContent;
  //         });
  //         // Start animation after a short delay
  //         setTimeout(() => {
  //           startTypingAnimation();
  //         }, 500);
  //       }
  //     });
  //   }, { threshold: 0.3 });
  //   observer.observe(letterSection);
  // }
});