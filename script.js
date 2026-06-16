const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
const langToggle = document.getElementById("langToggle");
const terminalText = document.getElementById("terminalText");

let currentLang = localStorage.getItem("qv_workshop_lang") || "en";

function applyLanguage(lang) {
  document.documentElement.lang = lang;

  document.querySelectorAll("[data-en][data-vi]").forEach((el) => {
    el.textContent = el.getAttribute(`data-${lang}`);
  });

  if (langToggle) {
    langToggle.textContent = lang === "en" ? "🇻🇳 VN" : "🇬🇧 EN";
  }

  localStorage.setItem("qv_workshop_lang", lang);
}

if (menuBtn) {
  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });
}

document.querySelectorAll("nav a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
  });
});

if (langToggle) {
  langToggle.addEventListener("click", () => {
    currentLang = currentLang === "en" ? "vi" : "en";
    applyLanguage(currentLang);
  });
}

const terminalMessages = {
  en: [
`root@quanverse:~# start_workshop
[01] AI Basics loaded
[02] Prompting basics loaded
[03] Cybersecurity awareness active
[04] Codex builder mode enabled
[05] AI security risks detected

mission: learn_ai_safely`,

`root@quanverse:~# cyber_ai --explain
AI can help students learn faster.
AI can help builders create faster.
AI can also help attackers scale phishing.

rule: learn_ai_with_security_mindset`,

`root@quanverse:~# workshop_goal
attract_learners: true
show_ai_power: true
show_ai_risks: true
guide_to_full_course: true`
  ],
  vi: [
`root@quanverse:~# start_workshop
[01] AI cơ bản đã tải
[02] Prompting cơ bản đã tải
[03] Nhận thức cybersecurity đang bật
[04] Codex builder mode đã bật
[05] Rủi ro AI security đã phát hiện

mission: học_ai_an_toàn`,

`root@quanverse:~# cyber_ai --explain
AI giúp học viên học nhanh hơn.
AI giúp builder tạo nhanh hơn.
AI cũng có thể giúp attacker scale phishing.

rule: học_ai_với_tư_duy_bảo_mật`,

`root@quanverse:~# workshop_goal
thu_hút_học_viên: true
cho_thấy_sức_mạnh_ai: true
cho_thấy_rủi_ro_ai: true
dẫn_tới_khóa_học_đầy_đủ: true`
  ]
};

let terminalIndex = 0;

setInterval(() => {
  if (!terminalText) return;
  const list = terminalMessages[currentLang] || terminalMessages.en;
  terminalIndex = (terminalIndex + 1) % list.length;
  terminalText.innerHTML = `<code>${list[terminalIndex]}</code>`;
}, 3400);

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

applyLanguage(currentLang);
