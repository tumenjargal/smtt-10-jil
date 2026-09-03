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
const siteHeader = document.querySelector(".site-header");

navToggle?.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
  navToggle.querySelector(".material-symbols-outlined").textContent = isOpen ? "close" : "menu";
  // задарсан цэс нь толгой хэсэгт зангуутай тул нуугдсан байж болохгүй
  siteHeader?.classList.remove("is-hidden");
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
  // урилгын модал дараагийн удаа хайлтын алхмаасаа эхэлнэ
  if (overlay.id === "inviteModal") {
    document.getElementById("inviteForm")?.reset();
    resetInviteView();
  }
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

// ============ toast ============
const toast = document.getElementById("toast");

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("is-visible");
  setTimeout(() => toast.classList.remove("is-visible"), 3200);
}

// ============ урилга харах (регистрийн дугаараар) ============
// ЖИЧ: одоогоор энэ бол урд талын жишиг өгөгдөл. Backend холбогдох үед
// INVITES-ийг серверийн хайлтаар (жишээ нь POST /api/invite) солино.
// Регистрийн дугаар бол хувийн мэдээлэл тул хаашаа ч илгээхгүй, зөвхөн
// хөтөч дотор шалгаж байна.
const INVITES = {
  УБ98765432: { name: "Батболдын Отгонбаяр" },
  УН12345678: { name: "Доржийн Сарантуяа" },
  ХА11223344: { name: "Пүрэвийн Ганбаатар" },
};

const inviteForm = document.getElementById("inviteForm");
const inviteRegnum = document.getElementById("inviteRegnum");
const inviteError = document.getElementById("inviteError");
const inviteLookup = document.getElementById("inviteLookup");
const inviteCard = document.getElementById("inviteCard");

function showInviteError(message) {
  if (!inviteError) return;
  inviteError.textContent = message;
  inviteError.hidden = false;
}

function resetInviteView() {
  if (inviteError) inviteError.hidden = true;
  if (inviteCard) inviteCard.hidden = true;
  if (inviteLookup) inviteLookup.hidden = false;
}

function openInvite(invite) {
  document.getElementById("inviteName").textContent = invite.name;
  inviteLookup.hidden = true;
  inviteCard.hidden = false;
  // хуваалцах зургийг урьдчилан бэлдэнэ — товч дархад шууд бэлэн байна
  // (Safari-д хэрэглэгчийн товшилтоос хол зөрвөл navigator.share хаагддаг)
  prepareShareImage(invite.name);
}

// ============ урилгыг зураг болгож хуваалцах ============
// Instagram-д вэбээс шууд нийтлэх нийтийн API байхгүй тул зөв зам нь:
// урилгыг зураг болгож navigator.share-ээр төхөөрөмжийн хуваалцах цонхонд
// дамжуулах (тэндээс Facebook / Instagram-аа сонгоно). Дэмжигдэхгүй бол
// зургийг татаж өгнө.
const SHARE_W = 1080;
const SHARE_H = 1350; // 4:5 — Instagram болон Facebook-т тохиромжтой

let sharePromise = null;
const inviteShareNote = document.getElementById("inviteShareNote");

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("зураг ачаалагдсангүй: " + src));
    img.src = src;
  });
}

// Текстийг өгөгдсөн өргөнд багтаан мөр болгож хуваана
function wrapLines(ctx, text, maxWidth) {
  const words = text.split(" ");
  const lines = [];
  let line = "";
  for (const word of words) {
    const next = line ? line + " " + word : word;
    if (ctx.measureText(next).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  }
  if (line) lines.push(line);
  return lines;
}

async function renderInviteImage(name) {
  const canvas = document.createElement("canvas");
  canvas.width = SHARE_W;
  canvas.height = SHARE_H;
  const ctx = canvas.getContext("2d");
  const cx = SHARE_W / 2;

  // шөнийн тэнгэр
  const sky = ctx.createLinearGradient(0, 0, 0, SHARE_H);
  sky.addColorStop(0, "#3b4767");
  sky.addColorStop(0.55, "#27314b");
  sky.addColorStop(1, "#151c2e");
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, SHARE_W, SHARE_H);

  // алтан оч
  const sparks = [
    [-40, 250, 320, -0.62], [700, 120, 380, -0.6], [120, 980, 300, -0.66],
    [760, 1120, 340, -0.58], [-60, 700, 260, 0.55], [820, 620, 300, 0.52],
    [380, 60, 240, 0.5], [260, 1240, 260, -0.6],
  ];
  for (const [x, y, len, rot] of sparks) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rot);
    const g = ctx.createLinearGradient(0, 0, len, 0);
    g.addColorStop(0, "rgba(224,187,78,0)");
    g.addColorStop(0.6, "rgba(224,187,78,0.55)");
    g.addColorStop(0.92, "rgba(255,241,194,0.9)");
    g.addColorStop(1, "rgba(255,241,194,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, len, 2);
    ctx.restore();
  }

  // лого
  try {
    const logo = await loadImage("assets/logo-10jil.png");
    const w = 430;
    const h = (logo.height / logo.width) * w;
    ctx.drawImage(logo, cx - w / 2, 130, w, h);
  } catch (e) {
    /* лого ачаалагдаагүй ч үлдсэн хэсгийг зурна */
  }

  ctx.textAlign = "center";
  const sans = 'ui-sans-serif, system-ui, "Segoe UI", sans-serif';

  // "ХҮНДЭТГЭЛИЙН УРИЛГА"
  ctx.fillStyle = "#e0bb4e";
  ctx.font = "600 26px " + sans;
  if ("letterSpacing" in ctx) ctx.letterSpacing = "7px";
  ctx.fillText("ХҮНДЭТГЭЛИЙН УРИЛГА", cx, 700);
  if ("letterSpacing" in ctx) ctx.letterSpacing = "0px";

  // нэр
  ctx.fillStyle = "#ffffff";
  ctx.font = "600 62px " + sans;
  ctx.fillText(name, cx, 782);

  // алтан ромбо заагч
  ctx.save();
  ctx.translate(cx, 838);
  ctx.rotate(Math.PI / 4);
  ctx.fillStyle = "#e9c400";
  ctx.fillRect(-7, -7, 14, 14);
  ctx.restore();
  const rule = ctx.createLinearGradient(cx - 330, 0, cx + 330, 0);
  rule.addColorStop(0, "rgba(233,196,0,0)");
  rule.addColorStop(0.5, "rgba(233,196,0,0.5)");
  rule.addColorStop(1, "rgba(233,196,0,0)");
  ctx.fillStyle = rule;
  ctx.fillRect(cx - 330, 837, 240, 1);
  ctx.fillRect(cx + 90, 837, 240, 1);

  // урилгын өгүүлбэр
  ctx.fillStyle = "#e5e2e1";
  ctx.font = "400 31px " + sans;
  const lead =
    "“Санхүүгийн мэдээллийн технологийн төв” УТҮГ байгуулагдсаны " +
    "10 жилийн ойн ёслолын арга хэмжээнд Таныг хүндэтгэн урьж байна.";
  let y = 895;
  for (const line of wrapLines(ctx, lead, 820)) {
    ctx.fillText(line, cx, y);
    y += 46;
  }

  // Хэзээ / Хаана
  y += 34;
  const rows = [
    ["ХЭЗЭЭ", "2026 оны 11 дүгээр сарын 06-ны өдөр, 10:00 цаг"],
    ["ХААНА", "Сүхбаатарын талбай, Төрийн ордны гол танхим"],
  ];
  for (const [label, value] of rows) {
    ctx.fillStyle = "rgba(255,255,255,0.55)";
    ctx.font = "600 21px " + sans;
    if ("letterSpacing" in ctx) ctx.letterSpacing = "3px";
    ctx.fillText(label, cx, y);
    if ("letterSpacing" in ctx) ctx.letterSpacing = "0px";

    ctx.fillStyle = "#ffffff";
    ctx.font = "400 31px " + sans;
    y += 42;
    for (const line of wrapLines(ctx, value, 820)) {
      ctx.fillText(line, cx, y);
      y += 42;
    }
    y += 18;
  }

  // хөл
  ctx.fillStyle = "rgba(224,187,78,0.85)";
  ctx.font = "500 24px " + sans;
  if ("letterSpacing" in ctx) ctx.letterSpacing = "4px";
  ctx.fillText("СМТТ · 10 ЖИЛ", cx, SHARE_H - 58);

  return new Promise((resolve, reject) => {
    try {
      canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error("blob үүсээгүй"))), "image/png");
    } catch (e) {
      // file:// дээр зураг зурсан canvas "tainted" болж экспорт хаагддаг
      reject(e);
    }
  });
}

function prepareShareImage(name) {
  if (inviteShareNote) inviteShareNote.hidden = true;
  sharePromise = renderInviteImage(name).catch((e) => {
    console.warn("урилгын зураг бэлдэж чадсангүй:", e);
    return null;
  });
}

function downloadInvite(blob, name) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
}

function showShareNote(message) {
  if (!inviteShareNote) return;
  inviteShareNote.textContent = message;
  inviteShareNote.hidden = false;
}

document.querySelector(".invite-share-btns")?.addEventListener("click", async (e) => {
  const btn = e.target.closest("[data-share]");
  if (!btn) return;
  const target = btn.dataset.share;

  const blob = sharePromise ? await sharePromise : null;
  if (!blob) {
    showShareNote("Урилгын зургийг бэлтгэх боломжгүй байна. Хуудсыг сервер дээрээс нээж дахин оролдоно уу.");
    return;
  }

  const fileName = "smtt-10-jil-urilga.png";
  const file = new File([blob], fileName, { type: "image/png" });

  // Утсан дээр төхөөрөмжийн хуваалцах цонх нээгдэж, тэндээсээ
  // Facebook / Instagram-аа сонгоно. Энэ бол Instagram руу зураг
  // илгээх цорын ганц зам — вэбээс шууд нийтлэх API байхгүй.
  if (navigator.canShare?.({ files: [file] })) {
    try {
      await navigator.share({ files: [file], title: "СМТТ — 10 жилийн ойн ёслолын урилга" });
      return;
    } catch (err) {
      if (err.name === "AbortError") return; // хэрэглэгч өөрөө болив
    }
  }

  // Компьютер дээр: зургийг татаад, Facebook бол холбоос хуваалцах цонхыг нээнэ
  downloadInvite(blob, fileName);
  if (target === "facebook") {
    window.open(
      "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(location.href),
      "_blank",
      "width=640,height=560"
    );
    showShareNote("Урилгын зураг татагдлаа. Нээгдсэн Facebook цонхонд хавсаргана уу.");
  } else {
    showShareNote("Урилгын зураг татагдлаа. Instagram нь вэб хуудаснаас нийтлэх боломжгүй тул гар утасны аппликэйшнээр байршуулна уу.");
  }
});

inviteForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  const regnum = inviteRegnum.value.trim().toUpperCase();

  const invite = INVITES[regnum];
  if (!invite) {
    showInviteError("Энэ дугаараар бүртгэгдсэн урилга олдсонгүй. Тодруулга авахыг хүсвэл зохион байгуулагчидтай холбогдоно уу.");
    return;
  }

  inviteError.hidden = true;
  openInvite(invite);
});

inviteRegnum?.addEventListener("input", () => {
  if (inviteError) inviteError.hidden = true;
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

// ============ сэдэв солих (ivory ↔ харанхуй) ============
// Анхдагч нь ivory. Сонголтыг localStorage-д хадгалж, дараагийн
// айлчлалд сэргээнэ (<head> доторх скрипт анивчихаас сэргийлнэ).
const themeToggle = document.getElementById("themeToggle");

function applyTheme(theme) {
  const dark = theme === "dark";
  document.documentElement.dataset.theme = dark ? "dark" : "light";
  if (!themeToggle) return;
  themeToggle.setAttribute("aria-pressed", String(dark));
  themeToggle.setAttribute("aria-label", dark ? "Цайвар сэдэв рүү шилжих" : "Харанхуй сэдэв рүү шилжих");
  themeToggle.querySelector(".material-symbols-outlined").textContent = dark ? "light_mode" : "dark_mode";
}

// үндсэн нь харанхуй; зөвхөн хэрэглэгч цайварыг сонгосон бол л цайвар
applyTheme(document.documentElement.dataset.theme === "light" ? "light" : "dark");

themeToggle?.addEventListener("click", () => {
  const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  applyTheme(next);
  try {
    localStorage.setItem("smtt-theme", next);
  } catch (e) {
    /* хадгалж чадахгүй бол сэдэв энэ хуудсанд л үйлчилнэ */
  }
});

// ============ back to top + баннер дээрх тунгалаг header ============
const backToTop = document.getElementById("backToTop");

// Толгой хэсэг: доош гүйлгэхэд нуугдаж, дээш гүйлгэхэд буцаж гарна
// (Anthropic-ийн hideOnScroll). Цэс нээлттэй үед болон хуудасны эхэнд
// хэзээ ч нуугдахгүй.
const HEADER_HIDE_AFTER = 240; // энэ хүртэл гүйлгэтэл толгой хэсэг үргэлж харагдана
let lastScrollY = window.scrollY;

window.addEventListener("scroll", () => {
  const y = window.scrollY;
  backToTop?.classList.toggle("is-visible", y > 480);
  siteHeader?.classList.toggle("is-scrolled", y > 24);

  if (siteHeader && !nav?.classList.contains("is-open")) {
    const goingDown = y > lastScrollY;
    siteHeader.classList.toggle("is-hidden", goingDown && y > HEADER_HIDE_AFTER);
  }
  lastScrollY = y;
});

backToTop?.addEventListener("click", (e) => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: "smooth" });
});

