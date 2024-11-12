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
document.addEventListener("DOMContentLoaded", function () {
  const burgerMenu = document.querySelector(".burger-menu");
  const siteNavigation = document.querySelector(".site-navigation");

  burgerMenu.addEventListener("click", function () {
    burgerMenu.classList.toggle("active");
    siteNavigation.classList.toggle("active");
  });
});
