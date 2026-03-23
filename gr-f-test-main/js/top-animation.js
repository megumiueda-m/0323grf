/*-------------------タブ切り替え-------------------*/
const tabBtns = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");

tabBtns.forEach(btn => {

  btn.addEventListener("click", () => {

    tabBtns.forEach(b => b.classList.remove("active"));
    tabContents.forEach(c => c.classList.remove("active"));

    btn.classList.add("active");

    const target = document.getElementById(btn.dataset.tab);
    target.classList.add("active");

  });

});


/*-------------------アコーディオン-------------------*/
const jobs = document.querySelectorAll(".job-header");

jobs.forEach(job => {
  job.addEventListener("click", () => {

    const parent = job.parentElement;
    const body = parent.querySelector(".job-body");

    if (parent.classList.contains("open")) {
      body.style.maxHeight = null;
      parent.classList.remove("open");
    } else {
      body.style.maxHeight = body.scrollHeight + "px";
      parent.classList.add("open");
    }
  });

});

//-------------------Works画像切り替え-------------------
const items = document.querySelectorAll(".work-more li");
const images = document.querySelectorAll(".work-img-link");

items.forEach((item, index) => {
  item.addEventListener("mouseenter", () => {
    images.forEach(img => img.classList.remove("active"));
    images[index].classList.add("active");
  });
});


//-------------------トップ・personのスライダー-------------------
const slider = document.querySelector('.work-parson-inner');
const slides = document.querySelectorAll('.work-child');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let current = 0;
const BREAKPOINT = 768; // ←tbに合わせる

function updateSlide() {
  // モバイル時だけ動かす
  if (window.innerWidth <= BREAKPOINT) {
    slider.style.transform = `translateX(-${current * 100}%)`;
  }
}

nextBtn.addEventListener('click', () => {
  if (window.innerWidth > BREAKPOINT) return; // ←PC時は無効

  if (current < slides.length - 1) {
    current++;
    updateSlide();
  }
});

prevBtn.addEventListener('click', () => {
  if (window.innerWidth > BREAKPOINT) return; // ←PC時は無効

  if (current > 0) {
    current--;
    updateSlide();
  }
});

function handleResize() {
  if (window.innerWidth > BREAKPOINT) {
    // PCに戻ったら完全リセット
    slider.style.transform = '';
    current = 0;
  } else {
    updateSlide();
  }
}
/* resize軽量化 */
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(handleResize, 150);
});


//-------------------PCモーション-------------------
const workItems = document.querySelectorAll('.work-child');
const WORK_BREAKPOINT = 768;

const workObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && window.innerWidth > WORK_BREAKPOINT) {
      entry.target.classList.add('is-show');
    }
  });
}, {
  threshold: 0.2
});

workItems.forEach(item => workObserver.observe(item));

workItems.forEach((item, index) => {
  item.style.transitionDelay = `${index * 0.30}s`;
});

