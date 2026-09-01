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
     {
       name: "Нэмэгдсэн өртгийн албан татварын урамшууллын систем",
       desc: "Монгол улс эдийн засгийн өсөлтийг татварын бодлогоор дэмжих, тэгш шударга байх зарчмыг хангах, олон улсын жишигт нийцүүлэх чиглэлээр үе шаттай арга хэмжээ авч хэрэгжүүлсний нэг нь Нэмэгдсэн өртгийн албан татварын урамшууллын систем юм. Засгийн газрын 2014 оны 285 дугаар тогтоолоор Нэмэгдсэн өртгийн албан татварын урамшууллын системийг хөгжүүлэх төслийн нэгжийг байгуулж иргэдийн оролцоонд тулгуурлан далд эдийн засгийг бууруулах, татварын бааз суурийг нэмэгдүүлэхэд төр, хувийн хэвшил хамтран амжилттай хэрэгжүүлсэн жишиг төсөл болсон билээ.",
     },
      {
        name: "Аж ахуйн нэгжийн цахим төлбөрийн баримтын систем",
        photo: "assets/history/invoice.jpg",
        desc: "Цахим төлбөрийн баримтын системд татвар төлөгч аж ахуйн нэгжийн авах үйлчилгээг хялбаршуулсан.",
      },
      {
        name: "Цахим төлбөрийн баримтын систем - EBARIMT",
        photo: "assets/history/ebarimt.png",
        desc: "Монгол Улсын Засгийн газраас татвар төлөгч иргэдийн худалдаа, үйлчилгээний төлбөрт багтсан НӨАТ-аас тодорхой хувийг буцаан авах, төлбөрийн баримтаараа бэлэн мөнгөний хонжвор бүхий сугалаанд оролцох боломжийг олгох замаар иргэдийг урамшуулах, иргэдийн татварын мэдлэг, соёлыг төлөвшүүлэх НӨАТ-ын урамшууллын системийг 2016 оноос хөгжүүлж эхэлсэн.",
      },
      {
        name: "ГТСМТТ УТҮГ байгуулагдсан",
        desc: "Санхүүгийн мэдээллийн технологийн төв нь санхүү, татвар, гаалийн байгууллагын үйл ажиллагааг цахимжуулах чиг үүрэгтэй Улсын төсөвт үйлдвэрийн газар юм. Мэдээллийн системүүдийг хөгжүүлэх, нэвтрүүлэх, системийн тасралтгүй үйл ажиллагааг хангах, санхүүгийн мэдээллийн технологийн чиглэлээр мэргэжил, арга зүйн зөвлөгөө өгөх, санхүүгийн мэдээллийн нэгдсэн санг бий болгох үйл ажиллагааг хэрэгжүүлдэг. Мөн Засгийн газрын харьяа төрийн захиргааны байгууллагуудын мэдээллийн технологийн уялдаа холбоог сайжруулахад дэмжлэг үзүүлэн ажиллаж байна.",
      },
  ] },
  { year: "2017", photo: "assets/history/ebarimt.png", items: [
    {
      name: "ТУНС, ETAX төсөл хөгжүүлэлт, туршилт",
      desc: "ТУНС Татварын ерөнхий газартай байгуулсан “Татварын удирдлагын нэгдсэн системийн хөгжүүлэлт, хамтран ажиллах гэрээ” 2021 оны 12 дугаар сарын 06-ны 2021/263; ТЕГ 01/25 тоот гэрээний дагуу татварын албаны бүх үйл ажиллагааг цахим системээр дамжуулан бүртгэх, тооцоолох, хяналт хийх, төлөвлөгөө, тайлан гаргах гэх мэт татварын удирдлагын үйл ажиллагааг удирдах зорилготой систем. Татвар төлөгч татварын албадаар үйлчлүүлэх ажлыг бүрэн цахимжуулж, орон цай, цаг хугацаанаас үл хамааран татварын тайлан тушаах, татвар төлөх боломжуудыг татварын албаны зүгээс олгож байгаа бөгөөд татварын албан хаагчид өдөр тутмын үйл ажиллагаандаа Монгол улсын аль ч өнцгөөс “Татварын удирдлагын нэгдсэн систем”-д хандан татвар төлөгчдөд үйлчилгээ үзүүлэх, татварын хууль тогтоомжийн хэрэгжилтийг хангуулах, өөрийн ажлын үр дүнг үнэн зөв дүгнүүлэх, мэдээллийн сангийн ашиглалтыг дээшлүүлэх боломжийг бүрдүүлсэн.",
    },
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
    {
      name: "Эрхийн бүртгэлийн сан",
      desc: "Төрийн сан болон төсөвт байгууллагын хэрэглэгчийн эрхийн бүртгэлийн мэдээллийн нэгдсэн сан үүсгэх, хяналт тавих уг системийг Сангийн яам болон ГТСМТТ УҮГ-ын 2021 оны 12 дугаар сарын 28-нд байгуулсан ажил гүйцэтгэх №290/2021/270 тоот гэрээний дагуу хэрэгжүүлсэн. Төрийн сангийн мэргэжилтэн болон төсөвт байгууллагын эрх бүхий албан тушаалтны мэдээллийн сан үүсгэх, Төсөвт байгууллагын төлбөр тооцооны баримтыг нэг удаагийн түлхүүр үгийн тусламжтайгаар цахимаар баталгаажуулах, Төрийн сангийн дансны баталгаажуулалт, баримтын түүх архивлан мэдээллийн сан үүсгэн хадгалах зорилготой систем юм.",
    },
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
    {
      name: "Цахим санхүүгийн тайлангийн систем /И-Баланс/",
      desc: "Улсын хэмжээнд үйл ажиллагаа эрхлэгч хуулийн этгээдийн мэдээллийг Улсын бүртгэлийн ерөнхий газрын “ХУР” систем болон Нэгдсэн нэвтрэлтийн системд холбон санхүүгийн үйл ажиллагааны тайлан хүлээн авах, хянах уг системийг Сангийн яамны Төрийн нарийн бичгийн даргын ТНБД А/142 тоот тушаал, 2021 оны 12 дугаар сарын 28-ны 290/2021/270 тоот гэрээгээр хөгжүүлж нэвтрүүлсэн.",
    },
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
  { year: "2026", photo: "assets/history/ebarimt.png", items: [{ name: "Байгуулагдсаны 10 жилийн ойгоо тэмдэглэв", desc: "" }] },
];

// ============ history: year-by-year scroll browser ============
const historyYearTabs = document.getElementById("historyYearTabs");
const historyList = document.getElementById("historyList");
let activeYearIndex = 0;

// items are either a plain string or { name, photo, desc } when a system has its own image/description
function historyItemName(item) {
  return typeof item === "string" ? item : item.name;
}
// no per-system descriptions are sourced yet, so fall back to a plain factual line
// rather than inventing functional details for real government systems.
// an item with desc explicitly set to "" opts out of that fallback entirely.
function historyItemDesc(item, fallbackYear) {
  if (typeof item !== "string" && item.desc !== undefined) return item.desc;
  return `${fallbackYear} онд нэвтэрсэн систем`;
}

function renderHistoryDetail(yearIndex, { instant = false, direction = 0 } = {}) {
  if (!historyList) return;
  const entry = TIMELINE[yearIndex];
  const revealAttr = instant ? "" : "data-reveal";
  const slideClass = direction > 0 ? " history-row--enter-right" : direction < 0 ? " history-row--enter-left" : "";
  const hasContent = entry.items.length > 0;

  const systemList = hasContent
    ? `<ol class="history-system-list">${entry.items.map((item, i) => `
        <li class="history-system-item${i === 0 ? " is-active" : ""}" data-index="${i}"
          data-name="${historyItemName(item)}"
          data-desc="${historyItemDesc(item, entry.year)}">
          ${historyItemName(item)}
        </li>
      `).join("")}</ol>`
    : `<p class="history-row-desc history-row-desc--empty">Дэлгэрэнгүй мэдээлэл тун удахгүй нэмэгдэнэ.</p>`;

  const firstItem = hasContent ? entry.items[0] : null;

  historyList.innerHTML = `
    <div class="history-row${slideClass}" ${revealAttr}>
      <div class="history-row-left">
        ${systemList}
      </div>
      <div class="history-detail-panel">
        ${firstItem ? `
          <h4 class="history-selected-name">${historyItemName(firstItem)}</h4>
          <p class="history-selected-desc">${historyItemDesc(firstItem, entry.year)}</p>
        ` : `<p class="history-selected-desc history-row-desc--empty">Дэлгэрэнгүй мэдээлэл тун удахгүй нэмэгдэнэ.</p>`}
      </div>
    </div>
  `;
}

// hovering/clicking a system name selects it: highlights the item and updates the title/description panel
function selectHistorySystem(item) {
  const row = item.closest(".history-row");
  if (!row) return;
  row.querySelectorAll(".history-system-item").forEach((li) => li.classList.toggle("is-active", li === item));

  const nameEl = row.querySelector(".history-selected-name");
  const descEl = row.querySelector(".history-selected-desc");
  if (nameEl) nameEl.textContent = item.dataset.name;
  if (descEl) descEl.textContent = item.dataset.desc;
}

historyList?.addEventListener("mouseover", (e) => {
  const item = e.target.closest(".history-system-item");
  if (item) selectHistorySystem(item);
});
historyList?.addEventListener("click", (e) => {
  const item = e.target.closest(".history-system-item");
  if (item) selectHistorySystem(item);
});

function renderYearTabs() {
  if (!historyYearTabs) return;
  historyYearTabs.innerHTML = TIMELINE.map((entry, i) => `
    <button type="button" class="history-dot${i === activeYearIndex ? " is-active" : ""}" data-year-index="${i}">
      <span class="history-dot-year">${entry.year}</span>
      <span class="history-dot-marker"></span>
    </button>
  `).join("");
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
  const tab = e.target.closest(".history-dot");
  if (!tab) return;
  setActiveYear(Number(tab.dataset.yearIndex));
});
historyYearTabs?.addEventListener("click", (e) => {
  const tab = e.target.closest(".history-dot");
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

