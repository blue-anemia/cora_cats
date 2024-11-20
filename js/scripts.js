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
document.addEventListener("DOMContentLoaded", function () {
  const copyButtons = document.querySelectorAll(".copy-number");

  copyButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Находим элемент, содержащий текст номера карты, исключая текст кнопки
      const cardNumberNode = button.parentNode.childNodes[0];
      let cardNumber = cardNumberNode.textContent.trim();

      // Убираем значок карты
      cardNumber = cardNumber.replace("💳", "").trim();

      navigator.clipboard
        .writeText(cardNumber)
        .then(() => {
          button.classList.add("copied");
          setTimeout(() => {
            button.classList.remove("copied");
          }, 2000); // 2 секунды
        })
        .catch((err) => {
          console.error("Не удалось скопировать текст: ", err);
        });
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
