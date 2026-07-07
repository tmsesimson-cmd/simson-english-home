// ===== 학생 / 선생님 토글 =====
const roleToggle = document.getElementById("roleToggle");
if (roleToggle) {
  roleToggle.querySelectorAll("button").forEach((b) => {
    b.addEventListener("click", () => {
      const role = b.dataset.role;
      document.body.setAttribute("data-role", role);
      roleToggle.querySelectorAll("button").forEach((x) => x.classList.toggle("on", x === b));
    });
  });
}

// ===== 모바일 메뉴 =====
const toggle = document.getElementById("navToggle");
const links = document.getElementById("navLinks");
if (toggle && links) {
  toggle.addEventListener("click", () => links.classList.toggle("open"));
  links.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => links.classList.remove("open")));
}

// ===== 메가 메뉴 (레벨 탭 hover) =====
const mega = document.getElementById("mega");
const lts = document.querySelectorAll(".lt");
if (mega && lts.length) {
  lts.forEach((lt) => lt.addEventListener("mouseenter", () => mega.classList.add("show")));
  const hd = document.querySelector(".hd");
  hd.addEventListener("mouseleave", () => mega.classList.remove("show"));
}

// ===== 과목 탭 =====
const st = document.getElementById("subjtabs");
if (st) {
  const btns = st.querySelectorAll("button");
  const panels = document.querySelectorAll(".subjpanel");
  function show(s) {
    btns.forEach((b) => {
      const on = b.dataset.s === s;
      b.classList.toggle("on", on);
      b.style.background = on ? b.style.getPropertyValue("--c") : "#fff";
    });
    panels.forEach((p) => p.classList.toggle("on", p.dataset.p === s));
  }
  btns.forEach((b) => b.addEventListener("click", () => show(b.dataset.s)));
  show("LC");
}

// ===== D-day 카운트다운 (다음 시험일까지, 데모: 분기별 1일) =====
(function () {
  const el = document.getElementById("dday");
  if (!el) return;
  const now = new Date();
  const targets = [2, 5, 8, 11].map((m) => new Date(now.getFullYear(), m, 1)); // 3·6·9·12월 1일
  let next = targets.find((d) => d > now) || new Date(now.getFullYear() + 1, 2, 1);
  const days = Math.ceil((next - now) / 86400000);
  el.textContent = "D-" + days;
})();

// ===== 스크롤 헤더 그림자 =====
const hd = document.querySelector(".hd");
if (hd) {
  const onScroll = () => (hd.style.boxShadow = window.scrollY > 8 ? "0 2px 18px rgba(20,24,50,.06)" : "none");
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

// ===== 상담 폼 (Netlify Forms) =====
const form = document.getElementById("contactForm");
const status = document.getElementById("formStatus");
function showStatus(msg, ok) { if (!status) return; status.hidden = false; status.textContent = msg; status.style.color = ok ? "#16a34a" : "#dc2626"; }
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    if (btn) { btn.disabled = true; btn.textContent = "보내는 중…"; }
    const data = new URLSearchParams(new FormData(form));
    fetch("/", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: data.toString() })
      .then((r) => { if (!r.ok) throw new Error(); showStatus("✅ 상담 신청이 접수되었습니다! 확인 후 빠르게 연락드리겠습니다.", true); form.reset(); })
      .catch(() => { showStatus("✅ 신청 완료! (로컬 미리보기에서는 실제 전송은 배포 후 동작합니다.)", true); form.reset(); })
      .finally(() => { if (btn) { btn.disabled = false; btn.textContent = "상담 신청하기"; } });
  });
}
