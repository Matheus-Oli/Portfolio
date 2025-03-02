
const typed = new Typed(".typed-text", {
    strings: ["Matheus"],
    typeSpeed: 100,
    backSpeed: 50,
    backDelay: 2000,
    loop: true,
  })
  const themeToggle = document.querySelector(".theme-toggle")
  const htmlElement = document.documentElement
  
  themeToggle.addEventListener("click", () => {
    htmlElement.classList.toggle("dark")
    localStorage.setItem("theme", htmlElement.classList.contains("dark") ? "dark" : "light")
  })
  const savedTheme = localStorage.getItem("theme") || "light"
  if (savedTheme === "dark") {
    htmlElement.classList.add("dark")
  }
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  }
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible")
      }
    })
  }, observerOptions)
  document.querySelectorAll(".fade-in, .slide-in-left, .slide-in-right, .slide-in-up").forEach((element) => {
    observer.observe(element)
  })
  const mobileMenu = document.getElementById("mobile-menu")
  const navMenu = document.querySelector(".nav-menu")
  
  if (mobileMenu) {
    mobileMenu.addEventListener("click", () => {
      mobileMenu.classList.toggle("active")
      navMenu.classList.toggle("active")
    })
  }
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("active")
      navMenu.classList.remove("active")
    })
  })
  const sections = document.querySelectorAll("section")
  const navLinks = document.querySelectorAll(".nav-link")
  
  window.addEventListener("scroll", () => {
    let current = ""
  
    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.clientHeight
  
      if (pageYOffset >= sectionTop - sectionHeight / 3) {
        current = section.getAttribute("id")
      }
    })
  
    navLinks.forEach((link) => {
      link.classList.remove("active")
      if (link.getAttribute("href").substring(1) === current) {
        link.classList.add("active")
      }
    })
  })
  const backToTopButton = document.querySelector(".back-to-top")
  
  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      backToTopButton.classList.add("active")
    } else {
      backToTopButton.classList.remove("active")
    }
  })
  const contactForm = document.getElementById("contactForm")
  
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const name = document.getElementById("name").value
      const email = document.getElementById("email").value
      const subject = document.getElementById("subject").value
      const message = document.getElementById("message").value

      console.log("Form submitted:", { name, email, subject, message })

      alert("Mensagem enviada com sucesso! Entraremos em contato em breve.")

      contactForm.reset()
    })
  }
  
  