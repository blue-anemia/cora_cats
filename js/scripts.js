// Показываем/скрываем кнопку "наверх" при прокрутке
window.addEventListener("scroll", function () {
  var scrollToTopBtn = document.querySelector(".scroll-to-top");
  if (window.scrollY > 300) {
    // Порог прокрутки, при котором появляется кнопка
    scrollToTopBtn.style.display = "block";
  } else {
    scrollToTopBtn.style.display = "none";
  }
});

// Делаем плавный скролл при клике на кнопку "наверх"
document
  .querySelector(".scroll-to-top")
  .addEventListener("click", function (e) {
    e.preventDefault(); // Отменяем стандартное поведение ссылки
    var scrollDuration = 500; // Продолжительность анимации в миллисекундах
    var scrollStep = -window.scrollY / (scrollDuration / 15);
    var scrollInterval = setInterval(function () {
      if (window.scrollY > 0) {
        window.scrollBy(0, scrollStep);
      } else {
        clearInterval(scrollInterval);
      }
    }, 15);
  });

// Скрипт на копирование номера карты в буфер обмена
document.addEventListener("DOMContentLoaded", () => {
  document
    .querySelector(".donation-cards")
    .addEventListener("click", (event) => {
      const button = event.target.closest(".copy-number");
      if (!button) return;

      const cardNumberElement = button
        .closest(".donation-card")
        ?.querySelector("p");
      if (!cardNumberElement) {
        console.error("Номер карты не найден.");
        return;
      }

      const cardNumber = cardNumberElement.textContent.replace("💳", "").trim();
      navigator.clipboard
        .writeText(cardNumber)
        .then(() => {
          button.classList.add("copied");
          setTimeout(() => button.classList.remove("copied"), 2000);
        })
        .catch((error) => {
          console.error("Ошибка при копировании в буфер обмена: ", error);
        });
    });
});

/* скрипт для активации бургер меню*/
document.addEventListener("DOMContentLoaded", () => {
  const burgerMenu = document.querySelector(".burger-menu");
  const siteNavigation = document.querySelector(".site-navigation");

  burgerMenu.addEventListener("click", () => {
    burgerMenu.classList.toggle("active"); // Анимация бургер-меню
    siteNavigation.classList.toggle("open"); // Показ/скрытие меню
    document.body.classList.toggle("lock-scroll"); // Блокировка прокрутки
  });
});

// Скрипт для карусели "Мои коты"

document.addEventListener("DOMContentLoaded", function () {
  // Находим все карусели на странице
  const carousels = document.querySelectorAll(".my-cats-carousel");

  carousels.forEach((carouselElement) => {
    const carousel = carouselElement.querySelector(".carousel-images");
    const images = carousel.querySelectorAll("img");
    const prevButton = carouselElement.querySelector(".carousel-button.prev");
    const nextButton = carouselElement.querySelector(".carousel-button.next");

    let currentIndex = 0;

    function updateCarousel() {
      const offset = -currentIndex * 100;
      carousel.style.transform = `translateX(${offset}%)`;
    }

    function showNext() {
      currentIndex = (currentIndex + 1) % images.length; // Цикличность
      updateCarousel();
    }

    function showPrev() {
      currentIndex = (currentIndex - 1 + images.length) % images.length; // Цикличность
      updateCarousel();
    }

    nextButton.addEventListener("click", showNext);
    prevButton.addEventListener("click", showPrev);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const detailsElements = document.querySelectorAll(".button-more");

  // Управление текстом о котах Проверяем ширину экрана
  const updateDetails = () => {
    const isMobile = window.innerWidth <= 768;

    detailsElements.forEach((details) => {
      if (isMobile) {
        details.removeAttribute("open"); // Закрываем на мобильных
      } else {
        details.setAttribute("open", ""); // Открываем на десктопе
      }
    });
  };

  // Обновляем при загрузке и изменении размера окна
  updateDetails();
  window.addEventListener("resize", updateDetails);
});

// Функция для открытия модального окна
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.style.display = "block";
  document.body.classList.add("no-scroll"); // Запрещаем скроллинг сайта

  // Проверка количества слайдов
  const slides = modal.querySelectorAll(".slide");
  const hasMultipleSlides = slides.length > 1;
  const slider = modal.querySelector(".slider");

  // Устанавливаем атрибут для слайдера в зависимости от количества слайдов
  slider.setAttribute("data-has-multiple", hasMultipleSlides);

  // Скрытие или показ кнопок листания в зависимости от количества слайдов
  const prevButton = modal.querySelector(".prev");
  const nextButton = modal.querySelector(".next");
  if (hasMultipleSlides) {
    prevButton.style.display = "block";
    nextButton.style.display = "block";
  } else {
    prevButton.style.display = "none";
    nextButton.style.display = "none";
  }

  // Устанавливаем первый слайд активным
  slides.forEach((slide, index) => {
    slide.classList.remove("active");
    if (index === 0) slide.classList.add("active");
  });

  // Инициализация текущего индекса слайда
  slider.setAttribute("data-current-slide", "0");
}

// Функция для закрытия модального окна
function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.style.display = "none";
  document.body.classList.remove("no-scroll"); // Разрешаем скроллинг сайта
}

// Функция для переключения слайдов
function plusSlides(modalId, n) {
  const modal = document.getElementById(modalId);
  const slides = modal.querySelectorAll(".slide");
  const slider = modal.querySelector(".slider");

  let currentSlideIndex = parseInt(slider.getAttribute("data-current-slide"));
  const totalSlides = slides.length;

  // Вычисляем следующий индекс с зацикливанием
  currentSlideIndex = (currentSlideIndex + n + totalSlides) % totalSlides;

  // Обновляем активные слайды
  slides.forEach((slide, index) => {
    slide.classList.remove("active");
    if (index === currentSlideIndex) slide.classList.add("active");
  });

  // Обновляем текущий индекс в slider
  slider.setAttribute("data-current-slide", currentSlideIndex.toString());
}

// Закрытие модального окна при клике на затемнённую область
document.addEventListener("click", function (event) {
  const modals = document.querySelectorAll(".modal");
  modals.forEach((modal) => {
    if (
      event.target === modal && // Проверяем, что клик был именно на модальный контейнер
      modal.style.display === "block"
    ) {
      closeModal(modal.id);
    }
  });
});

//Переключение вкладок в котошмоте
function showCategory(category) {
  document.querySelectorAll(".tab-content").forEach((content) => {
    content.classList.remove("active");
  });
  document.querySelectorAll(".tab-button").forEach((button) => {
    button.classList.remove("active");
  });
  document.getElementById(category).classList.add("active");
  event.target.classList.add("active");
}
