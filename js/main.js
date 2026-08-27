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
const TIMELINE = [
  { year: "2014", photo: "assets/history/2014.jpg", items: ["НӨАТУС төсөл үүсгэн байгуулагдсан"] },
  { year: "2015", photo: "assets/history/2015.jpg", items: ["НӨАТУС төсөл хөгжүүлэлт, туршилт"] },
  { year: "2016", photo: "assets/history/2016.jpg", items: ["ЦТБ нэвтрүүлсэн", "ГТСМТТ УТҮГ байгуулагдсан"] },
  { year: "2017", photo: "assets/history/2017.jpg", items: ["ТУНС, ETAX төсөл хөгжүүлэлт, туршилт"] },
  { year: "2018", photo: "assets/history/2018.jpg", items: ["ТУНС, ETAX системийг нэвтрүүлсэн"] },
  { year: "2019", photo: "assets/history/2019.jpg", items: [] },
  { year: "2020", photo: "assets/history/2020.jpg", items: [] },
  { year: "2021", photo: "assets/history/2021.jpg", items: [] },
  { year: "2022", photo: "assets/history/2022.jpg", items: [] },
  { year: "2023", photo: "assets/history/2023.jpg", items: [] },
  { year: "2024", photo: "assets/history/2024.jpg", items: [] },
  { year: "2025", photo: "assets/history/2025.jpg", items: [] },
  { year: "2026", photo: "assets/history/2026.jpg", items: ["Байгуулагдсаны 10 жилийн ойгоо тэмдэглэв"] },
];

const timelineEl = document.getElementById("timeline");
if (timelineEl) {
  timelineEl.innerHTML = TIMELINE.map((entry, i) => {
    const hasContent = entry.items.length > 0;
    const side = i % 2 === 0 ? "left" : "right";
    const body = hasContent
      ? entry.items.map((t) => `<p>${t}</p>`).join("")
      : `<p>Дэлгэрэнгүй мэдээлэл тун удахгүй нэмэгдэнэ</p>`;
    return `
      <div class="timeline-row timeline-row--${side}${hasContent ? "" : " timeline-item--empty"}" data-reveal>
        <div class="timeline-card">
          <h3 class="timeline-year">${entry.year}</h3>
          <div class="timeline-body">
            <div class="img-slot timeline-thumb">
              <img src="${entry.photo}" alt="${entry.year} он"
                onerror="this.parentElement.classList.add('img-slot--empty'); this.remove()" />
              <span class="img-slot-fallback"><span class="material-symbols-outlined">image</span></span>
            </div>
            <div class="timeline-text">${body}</div>
          </div>
        </div>
        <div class="timeline-node"><span class="timeline-node-dot"></span></div>
      </div>
    `;
  }).join("");
}

// ============ sponsor marquee (example partner logos) ============
const SPONSORS = [
  { name: "Од Групп", file: "assets/sponsors/partner-1.svg" },
  { name: "Тэнгэр Холдинг", file: "assets/sponsors/partner-2.svg" },
  { name: "Алтан Говь", file: "assets/sponsors/partner-3.svg" },
  { name: "Их Нуур ХХК", file: "assets/sponsors/partner-4.svg" },
  { name: "Шинэ Зуун", file: "assets/sponsors/partner-5.svg" },
  { name: "Нэгдсэн Хөрөнгө", file: "assets/sponsors/partner-6.svg" },
  { name: "Цахим Холбоо", file: "assets/sponsors/partner-7.svg" },
  { name: "Мөнх Үйлдвэр", file: "assets/sponsors/partner-8.svg" },
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

// ============ demo forms (register + sponsor) ============
const registerForm = document.getElementById("registerForm");
const sponsorForm = document.getElementById("sponsorForm");
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

sponsorForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  showToast("Хүсэлт хүлээн авлаа — жинхэнэ илгээлт backend холбогдсоны дараа идэвхжинэ.");
  sponsorForm.reset();
  closeModal(document.getElementById("sponsorModal"));
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

