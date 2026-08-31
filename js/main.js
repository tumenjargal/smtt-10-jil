// ============ always load at the top of the page ============
// overrides browser scroll-position restoration and any URL hash so a fresh
// page load never lands mid-page — the browser applies its own hash-scroll
// after this script runs, so we force it again on window "load" too
if ("scrollRestoration" in history) history.scrollRestoration = "manual";
window.scrollTo(0, 0);
window.addEventListener("load", () => window.scrollTo(0, 0));

// ============ "Нүүр" / logo / back-to-top links (#top) ============
// #top targets the sticky <header>. A position:sticky element's rect always
// reports top:0 once stuck, so native anchor scrolling / scrollIntoView()
// thinks it's "already visible" and refuses to scroll at all. Handle it manually.
document.querySelectorAll('a[href="#top"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

// ============ mobile nav toggle ============
const navToggle = document.getElementById("navToggle");
const nav = document.getElementById("nav");

navToggle?.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
  navToggle.querySelector(".material-symbols-outlined").textContent = isOpen ? "close" : "menu";
});

nav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("is-open");
    navToggle?.setAttribute("aria-expanded", "false");
    const icon = navToggle?.querySelector(".material-symbols-outlined");
    if (icon) icon.textContent = "menu";
  });
});

// ============ modals ============
const modalOverlays = document.querySelectorAll(".modal-overlay");

function openModal(id) {
  const overlay = document.getElementById(id);
  if (!overlay) return;
  overlay.classList.add("is-open");
  overlay.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}
function closeModal(overlay) {
  overlay.classList.remove("is-open");
  overlay.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

document.querySelectorAll("[data-modal-open]").forEach((btn) => {
  btn.addEventListener("click", () => openModal(btn.dataset.modalOpen));
});
modalOverlays.forEach((overlay) => {
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeModal(overlay);
  });
  overlay.querySelectorAll("[data-modal-close]").forEach((btn) => {
    btn.addEventListener("click", () => closeModal(overlay));
  });
});
document.addEventListener("keydown", (e) => {
  if (e.key !== "Escape") return;
  modalOverlays.forEach((overlay) => {
    if (overlay.classList.contains("is-open")) closeModal(overlay);
  });
});

// ============ history timeline data ============
// системийн нэвтрүүлэлтийн жагсаалт — эх сурвалж: байгууллагын системийн он дараалсан timeline (2014-2024)
const TIMELINE = [
  { year: "2016", photo: "assets/history/ebarimt.png", items: [
     "Нэмэгдсэн өртгийн албан татварын урамшууллын систем",
      { name: "Аж ахуйн нэгжийн цахим төлбөрийн баримтын систем", photo: "assets/history/invoice.jpg" },
      "ЦТБ нэвтрүүлсэн",
      "ГТСМТТ УТҮГ байгуулагдсан",
  ] },
  { year: "2017", photo: "assets/history/ebarimt.png", items: [
    "ТУНС, ETAX төсөл хөгжүүлэлт, туршилт",
  ] },
  { year: "2018", photo: "assets/history/ebarimt.png", items: [
    "Татвар төлөгчийн цахим бүртгэлийн систем",
    "ТАХ ТҮБ АПП",
    "Эрүүл мэндийн даатгалын цахим систем",
  ] },
  { year: "2019", photo: "assets/history/ebarimt.png", items: [
    "Төрийн албан хаагчийн цалингийн нэгдсэн систем",
    "Хөрөнгө оруулагчдын цахим бүртгэлийн систем",
    "Нэвтрэлтийн нэгдсэн систем",
  ] },
  { year: "2020", photo: "assets/history/ebarimt.png", items: [
    "ХХААХҮЯ-ны урамшуулын систем",
    "Чат бот",
    "Төрийн үйлчилгээний төлбөрийн нэгдсэн систем",
    "Эрхийн бүртгэлийн сан",
    "Төрийн сангийн гүйлгээний нэгдсэн систем",
    "1072 / Хувьцаа/",
    "Хяналт шинжилгээ үнэлгээний систем",
    "Халамжийн нэгдсэн систем",
    "Хүнсний эрхийн бичгийн систем",
    "Тусгай зөвшөөрлийн цахим систем",
  ] },
  { year: "2021", photo: "assets/history/ebarimt.png", items: [
    "QRBARIMT",
    "Лабораторийн мэдээллийн удирдлагын систем",
    "Ухаалаг гарц",
    "Эрдэс баялаг мэргэжлийн зөвлөлийн систем",
    "Вакцины нэгдсэн систем",
    "Валютын гүйлгээний нэгдсэн систем",
    "Гадаад валют арилжааны хяналтын систем",
    "Замын хураамжийн систем /ebarimt/",
    "Санхүүгийн нэгдсэн мэдээллийн систем /Dashboard/",
    "Цахим санхүүгийн тайлангийн систем /И-Баланс/",
  ] },
  { year: "2022", photo: "assets/history/ebarimt.png", items: [
    "Битүүмжлэгдсэн тээврийн хэрэгслийн систем",
    "Лавлагаа систем",
  ] },
  { year: "2023", photo: "assets/history/ebarimt.png", items: [
    "Төрийн сангийн нэгдсэн портал систем",
    "Нэхэмжлэхийн систем",
  ] },
  { year: "2024", photo: "assets/history/ebarimt.png", items: [
    "Их өгэгдлийн сан",
    "Гадаад жуулчны НӨАТ-ын буцаан олголтын систем",
    "Их өгэгдэлд суурилсан шийдвэр гаргалт, нэгдсэн мэдээлэл хяналтын систем",
    "Санхүүгийн болон төсвийн гүйцэтгэлийн тайлан систем",
    "Татварын удирдлагын нэгдсэн систем - IMS",
    "Татварын удирдлагын нэгдсэн систем - ACTIVITI",
  ] },
  { year: "2025", photo: "assets/history/ebarimt.png", items: [] },
  { year: "2026", photo: "assets/history/ebarimt.png", items: ["Байгуулагдсаны 10 жилийн ойгоо тэмдэглэв"] },
];

// ============ history: year-by-year scroll browser ============
const historyYearTabs = document.getElementById("historyYearTabs");
const historyList = document.getElementById("historyList");
let activeYearIndex = 0;

// years with more than this many systems switch to the compact grid
// so a dense year (e.g. 10 systems) never forces the page to scroll
const HISTORY_COMPACT_THRESHOLD = 2;

// items are either a plain string or { name, photo } when a system has its own image
function historyItemName(item) {
  return typeof item === "string" ? item : item.name;
}
function historyItemPhoto(item, fallbackPhoto) {
  return typeof item === "string" ? fallbackPhoto : item.photo || fallbackPhoto;
}

function renderHistoryDetail(yearIndex, { instant = false, direction = 0 } = {}) {
  if (!historyList) return;
  const entry = TIMELINE[yearIndex];
  const revealAttr = instant ? "" : "data-reveal";
  const isCompact = entry.items.length > HISTORY_COMPACT_THRESHOLD;
  const slideClass = direction > 0 ? " history-row--enter-right" : direction < 0 ? " history-row--enter-left" : "";

  let content;
  if (!entry.items.length) {
    content = `<p class="history-row-text history-row-text--empty">Дэлгэрэнгүй мэдээлэл тун удахгүй нэмэгдэнэ</p>`;
  } else if (isCompact) {
    content = `<ul class="history-row-grid">${entry.items.map((item) => `
      <li data-photo="${historyItemPhoto(item, entry.photo)}">${historyItemName(item)}</li>
    `).join("")}</ul>`;
  } else {
    content = entry.items.map((item) => `
      <p class="history-row-text" data-photo="${historyItemPhoto(item, entry.photo)}">${historyItemName(item)}</p>
    `).join("");
  }

  historyList.innerHTML = `
    <div class="history-row${isCompact ? " history-row--compact" : ""}${slideClass}" ${revealAttr} data-default-photo="${entry.photo}">
      <div class="history-row-year"><h3>${entry.year}</h3></div>
      <div class="history-row-body">${content}</div>
      <div class="img-slot history-row-photo">
        <img src="${entry.photo}" alt="${entry.year} он"
          onerror="this.style.opacity='0'; this.parentElement.classList.add('img-slot--empty')"
          onload="this.style.opacity='1'; this.parentElement.classList.remove('img-slot--empty')" />
        <span class="img-slot-fallback"><span class="material-symbols-outlined">image</span></span>
      </div>
    </div>
  `;
}

// hovering a system name crossfades the row's photo to that system's own image (falls back to the year's photo)
function swapHistoryPhoto(photoBox, src) {
  const img = photoBox?.querySelector("img");
  if (!img || img.dataset.targetSrc === src) return;
  img.dataset.targetSrc = src;
  img.style.opacity = "0";
  setTimeout(() => {
    if (img.dataset.targetSrc !== src) return; // a newer hover already took over
    photoBox.classList.remove("img-slot--empty");
    img.src = src;
  }, 160);
}

historyList?.addEventListener("mouseover", (e) => {
  const target = e.target.closest("[data-photo]");
  if (!target) return;
  const row = target.closest(".history-row");
  const photoBox = row?.querySelector(".history-row-photo");
  photoBox?.classList.add("is-active");
  swapHistoryPhoto(photoBox, target.dataset.photo);
});
historyList?.addEventListener("mouseout", (e) => {
  const target = e.target.closest("[data-photo]");
  if (!target || target.contains(e.relatedTarget)) return;
  const row = target.closest(".history-row");
  const photoBox = row?.querySelector(".history-row-photo");
  photoBox?.classList.remove("is-active");
  const defaultPhoto = row?.dataset.defaultPhoto;
  if (defaultPhoto) swapHistoryPhoto(photoBox, defaultPhoto);
});

function renderYearTabs() {
  if (!historyYearTabs) return;
  historyYearTabs.innerHTML = TIMELINE.map((entry, i) => `
    <button type="button" class="history-year-tab${i === activeYearIndex ? " is-active" : ""}" data-year-index="${i}">
      ${entry.year}
    </button>
  `).join("");
  // scroll only the horizontal tab strip into view — scrollIntoView would also scroll the whole page vertically
  const activeTab = historyYearTabs.querySelector(".is-active");
  if (activeTab) {
    const target = activeTab.offsetLeft - (historyYearTabs.clientWidth - activeTab.clientWidth) / 2;
    historyYearTabs.scrollTo({ left: target, behavior: "smooth" });
  }
}

function setActiveYear(index) {
  const previousIndex = activeYearIndex;
  activeYearIndex = (index + TIMELINE.length) % TIMELINE.length;
  if (activeYearIndex === previousIndex) return;
  const direction = activeYearIndex > previousIndex ? 1 : -1;
  renderYearTabs();
  renderHistoryDetail(activeYearIndex, { instant: true, direction });
}

// hovering a year tab switches to it directly; click still works for touch/keyboard users
historyYearTabs?.addEventListener("mouseover", (e) => {
  const tab = e.target.closest(".history-year-tab");
  if (!tab) return;
  setActiveYear(Number(tab.dataset.yearIndex));
});
historyYearTabs?.addEventListener("click", (e) => {
  const tab = e.target.closest(".history-year-tab");
  if (!tab) return;
  setActiveYear(Number(tab.dataset.yearIndex));
});

document.querySelectorAll("[data-year-nav]").forEach((btn) => {
  btn.addEventListener("click", () => setActiveYear(activeYearIndex + Number(btn.dataset.yearNav)));
});

renderYearTabs();
renderHistoryDetail(activeYearIndex);

// ============ sponsor marquee (example partner logos) ============
// TODO: батлагдсан ивээн тэтгэгчдийн жинхэнэ жагсаалт ирмэгц энд солих (одоогоор жишээ өгөгдөл)
const SPONSORS = [
  { name: "Од Групп", file: "assets/sponsors/partner-1.svg" },
  { name: "Тэнгэр Холдинг", file: "assets/sponsors/partner-2.svg" },
  { name: "Алтан Говь", file: "assets/sponsors/partner-3.svg" },
  { name: "Их Нуур ХХК", file: "assets/sponsors/partner-4.svg" },
  { name: "Шинэ Зуун", file: "assets/sponsors/partner-5.svg" },
  { name: "Нэгдсэн Хөрөнгө", file: "assets/sponsors/partner-6.svg" },
  { name: "Цахим Холбоо", file: "assets/sponsors/partner-7.svg" },
  { name: "Мөнх Үйлдвэр", file: "assets/sponsors/partner-8.svg" },
  { name: "Соёмбо Инвест", file: "assets/sponsors/partner-9.svg" },
  { name: "Гүрван Гол ХХК", file: "assets/sponsors/partner-10.svg" },
  { name: "Алтай Финанс", file: "assets/sponsors/partner-11.svg" },
  { name: "Номин Трейд", file: "assets/sponsors/partner-12.svg" },
  { name: "Дархан Метал", file: "assets/sponsors/partner-13.svg" },
  { name: "Тэрэлж Пропертиз", file: "assets/sponsors/partner-14.svg" },
  { name: "Ундрах Энержи", file: "assets/sponsors/partner-15.svg" },
  { name: "Билэг Даатгал", file: "assets/sponsors/partner-16.svg" },
];

const sponsorTrack = document.getElementById("sponsorTrack");
if (sponsorTrack) {
  sponsorTrack.innerHTML = SPONSORS.map(
    (s) => `<div class="sponsor-logo-card"><img src="${s.file}" alt="${s.name}" loading="lazy" /></div>`
  ).join("");
}

// ============ reveal on scroll ============
const revealEls = document.querySelectorAll("[data-reveal]");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);
revealEls.forEach((el) => observer.observe(el));

// ============ demo forms (register) ============
const registerForm = document.getElementById("registerForm");
const toast = document.getElementById("toast");

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("is-visible");
  setTimeout(() => toast.classList.remove("is-visible"), 3200);
}

registerForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  showToast("Демо маягт — жинхэнэ бүртгэл backend холбогдсоны дараа идэвхжинэ.");
  registerForm.reset();
  closeModal(document.getElementById("registerModal"));
});

// ============ count-up stat animation ============
function animateCountUp(el, target, duration = 1400) {
  const start = performance.now();
  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target);
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
document.querySelectorAll(".stat-num[data-target]").forEach((el) => {
  animateCountUp(el, Number(el.dataset.target));
});

// ============ back to top ============
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  backToTop?.classList.toggle("is-visible", window.scrollY > 480);
});

backToTop?.addEventListener("click", (e) => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: "smooth" });
});

