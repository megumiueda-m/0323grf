// ハンバーガーメニュー
const button = document.querySelector('.hamburger');
const nav = document.querySelector('.hamburger_nav');
const anchors = document.querySelectorAll('.hamburger_nav a');

if (button && nav) {
  button.addEventListener('click', () => {
    button.classList.toggle('open');
    nav.classList.toggle('open');
  });

  anchors.forEach(anchor => {
    anchor.addEventListener('click', () => {
      button.classList.remove('open');
      nav.classList.remove('open');
    });
  });
}

//-------------------フェードイン----------------------
document.addEventListener("DOMContentLoaded", () => {
  const fadeElements = document.querySelectorAll(".fade-in,.fade-in-bg");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        // 一度だけフェードインさせたい場合
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.3 // 10%見えたら発火
  });

  fadeElements.forEach((el) => observer.observe(el));
});




//-------------------エントリーボックス-------------------
const entryTarget = document.querySelector('.entry-box-wrapper');

const entryObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entryTarget.classList.add('is-show');
    }
  });
}, {
  threshold: 0.3
});

entryObserver.observe(entryTarget);


//-------------------テキストムーブイン-------------------
const texts = document.querySelectorAll('.text-animation');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {

    if (entry.isIntersecting) {
      const text = entry.target;
      const lines = text.innerHTML.split('<br>');
      text.innerHTML = '';

      lines.forEach((line, lineIndex) => {
        const lineWrapper = document.createElement('div');

        line.split('').forEach((char, charIndex) => {
          const span = document.createElement('span');

          span.textContent = char;
          span.style.animationDelay = `${(lineIndex * 10 + charIndex) * 0.05}s`;

          lineWrapper.appendChild(span);
        });

        text.appendChild(lineWrapper);
      });

      observer.unobserve(text); // ←1回だけ発火
    }
  });
}, {
  threshold: 0.2 // 20%見えたら
});

texts.forEach(text => observer.observe(text));


