(function () {
  "use strict";

  const header = document.getElementById("header");
  const menuBtn = document.getElementById("menuBtn");
  const nav = document.getElementById("nav");
  const contactForm = document.getElementById("contactForm");
  const formNote = document.getElementById("formNote");

  /* Cole seu número com DDI, só dígitos. Ex.: 5551999990000 */
  const WHATSAPP = "";

  function handleScroll() {
    if (!header) return;
    header.classList.toggle("header--scrolled", window.scrollY > 40);
  }

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();

  if (menuBtn && nav) {
    menuBtn.addEventListener("click", function () {
      const isOpen = nav.classList.toggle("header__nav--open");
      menuBtn.setAttribute("aria-expanded", isOpen);
      document.body.style.overflow = isOpen ? "hidden" : "";
    });

    nav.querySelectorAll(".header__nav-link").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("header__nav--open");
        menuBtn.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (!targetId || targetId === "#") return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--header-height"), 10) || 76;
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - offset, behavior: "smooth" });
    });
  });

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const nome = document.getElementById("nome").value.trim();
      const contato = document.getElementById("contatoCampo").value.trim();
      const mensagem = document.getElementById("mensagem").value.trim();
      const consentimento = document.getElementById("consentimento").checked;

      if (!nome || !contato || !mensagem || !consentimento) {
        formNote.textContent = "Preencha todos os campos e aceite a política de privacidade.";
        formNote.className = "form-note form-note--error";
        return;
      }

      const text =
        "Olá, meu nome é " + nome + ".\n" +
        "Contato: " + contato + "\n\n" +
        mensagem;

      if (WHATSAPP) {
        window.open("https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(text), "_blank");
        formNote.textContent = "Abrindo o WhatsApp...";
      } else {
        formNote.textContent = "Mensagem montada. Coloque seu WhatsApp em js/main.js para abrir a conversa direto.";
      }
      formNote.className = "form-note form-note--success";
    });
  }

  document.querySelectorAll(".faq__item").forEach(function (item) {
    item.addEventListener("toggle", function () {
      if (!this.open) return;
      document.querySelectorAll(".faq__item").forEach(function (other) {
        if (other !== item) other.open = false;
      });
    });
  });
})();
