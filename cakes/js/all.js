'use strict';

(function () {
  var links = Array.from(document.querySelectorAll('.internal-link'));

  var addClickListener = function(link) {  // Вешает обработчик клика по ссылке (плавный скролл)
    link.addEventListener('click', function (evt) {
      evt.preventDefault();
      var id = '#' + this.href.split('#')[1];
      var element = document.querySelector(id);
      element.scrollIntoView({block: "start", behavior: "smooth"});
    });
  }

  var addListenersForLinks = function (array) {  // Навешивает обработчик клика на все ссылки в массиве
    for (var i = 0; i < array.length; i++) {
      addClickListener(array[i]);
    };
  };

  addListenersForLinks(links);
})();

'use strict';

(function () {
  window.stuffingData = {
    images: [
      'img/content/staffing-shoco-mobile@1x.jpg',
      'img/content/staffing-rainbow-mobile@1x.jpg',
      'img/content/staffing-banana-mobile@1x.jpg',
      'img/content/staffing-red-mobile@1x.jpg',
      'img/content/staffing-caramel-mobile@1x.jpg',
      'img/content/staffing-shoco-berries-mobile@1x.jpg',
      'img/content/staffing-honey-mobile@1x.jpg'
    ],
    alt: [
      'Изображение шоколадного бисквита с шоколадным кремом',
      'Изображение бисквита «Радуга»',
      'Изображение шоколадно-бананового бисквита',
      'Изображение бисквита «Красный бархат»',
      'Изображение бисквита с начинкой карамель со сгущенкой',
      'Изображение шоколадно-ягодного бисквита',
      'Изображение бисквита «Медовик»'
    ],
    headings: [
      'Шоколадный ганаш',
      '«Радуга»',
      'Шоколадно - банановый',
      '«Красный бархат»',
      'Карамель со сгущенкой',
      'Шоколадно - ягодный',
      '«Медовик»'
    ],
    texts: [
      'Ароматный шоколадный бисквит, густой шоколадный крем – самый шоколадный из всех возможных десертов!',
      'Не только очень вкусная, но и необыкновенно яркая начинка! Тор с такой начинкой сделает Ваш праздник таким же красочным!',
      'Замечательно украсит любой праздник! Приятно удивит своим нежным, банановым вкусом! Не оставит равнодушным никого!',
      'Невероятной красоты начинка! Идеально подойдет на любой женский праздник!',
      'Замечательный вкус карамели со сгущёнкой и нежный бисквит поднимут Ваше настроение!',
      'Если любите контраст - это ваш выбор. Замечательное сочетание кислого в сладком!',
      'Классический, давно всеми любимый, сладкий вкус! Понравится абсолютно всем на вашем празднике!'
    ],
    prices: [
      '1000 руб/кг',
      '1100 руб/кг',
      '900 руб/кг',
      '1400 руб/кг',
      '1300 руб/кг',
      '1500 руб/кг',
      '950 руб/кг'
    ],
    inputsValues: [
      'shocolade-cream',
      'rainbow',
      'shoco-banana',
      'red-velvet',
      'caramel',
      'shoco-berries',
      'honey'
    ]
  };
})();

'use strict';

(function () {
  var sliderElement = document.querySelector('.stuffing-list'),
      template = document.querySelector('#template');

  var createSlide = function (data, index) {  // Создает новый слайд
    var tempSlide = template.querySelector('.stuffing-item').cloneNode(true);
    tempSlide.querySelector('.stuffing-item__heading').textContent = data.headings[index];
    tempSlide.querySelector('.stuffing-item__description').textContent = data.texts[index];
    tempSlide.querySelector('.stuffing-item__price').textContent = data.prices[index];
    tempSlide.querySelector('img').setAttribute('src', data.images[index]);
    tempSlide.querySelector('img').setAttribute('alt', data.alt[index]);
    tempSlide.querySelector('input').value = data.inputsValues[index];
    tempSlide.querySelectorAll('source')[0].setAttribute('srcset', data.images[index].replace(/mobile/gi, 'desktop').replace(/jpg/gi, 'webp'));
    tempSlide.querySelectorAll('source')[1].setAttribute('srcset', data.images[index].replace(/mobile/gi, 'tablet').replace(/jpg/gi, 'webp'));
    tempSlide.querySelectorAll('source')[2].setAttribute('srcset', data.images[index].replace(/jpg/gi, 'webp'));
    tempSlide.querySelectorAll('source')[3].setAttribute('srcset', data.images[index].replace(/mobile/gi, 'desktop'));
    tempSlide.querySelectorAll('source')[4].setAttribute('srcset', data.images[index].replace(/mobile/gi, 'tablet'));
    return tempSlide;
  }

  var createSlidesFragment = function (data) {  // Создает фрагмент со слайдами
    var slidesNumber = data.headings.length;
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < slidesNumber; i++) {
      fragment.appendChild(createSlide(data, i));
    };
    fragment.querySelector('.stuffing-item').classList.add('stuffing-item--current');
    return fragment;
  };

  sliderElement.appendChild(createSlidesFragment(window.stuffingData));
})();

'use strict';

(function () {
  var sliderElement = document.querySelector('.stuffing-list'),
      slidesElements = Array.from(sliderElement.querySelectorAll('.stuffing-item')),
      sliderPreviousButtonElement = document.querySelector('.slider__navigation--stuffing-previous'),
      sliderNextButtonElement = document.querySelector('.slider__navigation--stuffing-next'),
      sliderCounterElement = document.querySelector('.form__stuffing-slider-counter'),
      currentSlideClass = 'stuffing-item--current',
      showedSlidesNumber = 1,
      currentSlideIndex,
      isFirstSlide,
      isLastSlide,
      SWIPE_LENGTH = 50,
      TIME_SLIDE_BROWSING = 300; // В милисекундах

  var sliderCounterUpdate = function () { // Обновляет счетчик слайдов
      sliderCounterElement.textContent = (currentSlideIndex + 1) + '/' + slidesElements.length;
  };

  var findCurrentSlide = function (element) { // Возвращает true, если слайд активный
    if (element.classList.contains(currentSlideClass)) {
      return true;
    }
    return false;
  };

  var updateCurrentSlideIndex = function () { // Определяет индекс активного слайда, проверяет не крайний ли он
    currentSlideIndex = slidesElements.findIndex(findCurrentSlide);
    isFirstSlide = currentSlideIndex === 0;
    isLastSlide = currentSlideIndex === slidesElements.length - 1;
  };

  var animateBrowsingNextSlide = function (currentSlide, nextSlide) { // Анимация перелистывания вперед
    if (window.innerWidth < 768) {
      currentSlide.style.cssText = 'animation: hideStuffingSlideToLeftMobile ' + (TIME_SLIDE_BROWSING / 1000) + 's;';
    } else if (window.innerWidth < 1366) {
      currentSlide.style.cssText = 'animation: hideStuffingSlideToLeftTablet ' + (TIME_SLIDE_BROWSING / 1000) + 's;';
    } else {
      currentSlide.style.cssText = 'animation: hideStuffingSlideToLeftDesktop ' + (TIME_SLIDE_BROWSING / 1000) + 's;';
    }
    setTimeout(function () {
      currentSlide.style.cssText = '';
      nextSlide.style.cssText = '';
    }, TIME_SLIDE_BROWSING);
  };

  var animateBrowsingPreviousSlide = function (currentSlide, previousSlide) { // Анимация перелистывания назад
    if (window.innerWidth < 768) {
      previousSlide.style.cssText = 'animation: showPreviousStuffingSlideMobile ' + TIME_SLIDE_BROWSING / 1000 + 's;';
    } else if (window.innerWidth < 1366) {
      previousSlide.style.cssText = 'animation: showPreviousStuffingSlideTablet ' + TIME_SLIDE_BROWSING / 1000 + 's;';
    } else {
      previousSlide.style.cssText = 'animation: showPreviousStuffingSlideDesktop ' + TIME_SLIDE_BROWSING / 1000 + 's;';
    }
    setTimeout(function () {
      currentSlide.style.cssText = null;
      previousSlide.style.cssText = null;
    }, TIME_SLIDE_BROWSING);
  };

  var showNextSlide = function (currentSlide, nextSlide) { // Показывает следующий слайд
    nextSlide.classList.add(currentSlideClass);
    animateBrowsingNextSlide(currentSlide, nextSlide);
    setTimeout(function () {
      currentSlide.classList.remove(currentSlideClass);
    }, TIME_SLIDE_BROWSING);
  };

  var showPreviousSlide = function (currentSlide, previousSlide) { // Показывает предыдущий слайд
    previousSlide.classList.add(currentSlideClass);
      animateBrowsingPreviousSlide(currentSlide, previousSlide);
      setTimeout(function () {
        currentSlide.classList.remove(currentSlideClass);
      }, TIME_SLIDE_BROWSING);
  };

  var changeSlide = function (direction) { // Меняет слвйд в зависимости от направления свайпа
    if (direction === 'left' && !isLastSlide) {
      var currentSlide = slidesElements[currentSlideIndex];
      var nextSlide = slidesElements[currentSlideIndex + showedSlidesNumber];
      showNextSlide(currentSlide, nextSlide);
    } else if (direction === 'right' && !isFirstSlide) {
      var currentSlide = slidesElements[currentSlideIndex];
      var previousSlide = slidesElements[currentSlideIndex - showedSlidesNumber];
      showPreviousSlide(currentSlide, previousSlide);
    }
    setTimeout(function () {
      updateCurrentSlideIndex();
      window.stuffingSliderIndicator.update(slidesElements, currentSlideIndex);
      navigationButtonsUpdate();
      sliderCounterUpdate();
    }, TIME_SLIDE_BROWSING);
  };

  var addSwipeListener = function (element) { // Добавляет обработчик свайпа на элемент
    var startSwipeX = null;
    var endSwipeX = null;
    var swipeDirection = null;

    element.addEventListener('touchstart', function (evt) { // При косании экрана запоминает координаты
      startSwipeX = evt.changedTouches[0].screenX;
    });

    element.addEventListener('touchend', function (evt) { // По окончании свайпа запоминает координаты и если длина свайпа не меньше заданной,
      endSwipeX = evt.changedTouches[0].screenX;          // определяет направление свайпа и запускает функцию с этим аргументом
      if (Math.abs(startSwipeX - endSwipeX) >= SWIPE_LENGTH) {
        if (startSwipeX - endSwipeX < 0) {
          swipeDirection = 'right';
        } else {
          swipeDirection = 'left';
        }
        changeSlide(swipeDirection);
      }
    });
  };

  var addNavigationButtonsListeners = function () { // Обработчики кнопок навигации слайдера
    sliderPreviousButtonElement.addEventListener('click', function (evt) {
      evt.preventDefault();
      changeSlide('right');
    });
    sliderNextButtonElement.addEventListener('click', function (evt) {
      evt.preventDefault();
      changeSlide('left');
    });
  };

  var navigationButtonsUpdate = function () {
    sliderPreviousButtonElement.classList.remove('slider__navigation--disabled');
    sliderNextButtonElement.classList.remove('slider__navigation--disabled');
    if (isFirstSlide) {
      sliderPreviousButtonElement.classList.add('slider__navigation--disabled');
    } else if (isLastSlide) {
      sliderNextButtonElement.classList.add('slider__navigation--disabled');
    }
  };

  window.stuffingSlider = {
    add: function() {
      addSwipeListener(sliderElement);
      addNavigationButtonsListeners();
      updateCurrentSlideIndex();
      navigationButtonsUpdate();
      sliderCounterUpdate();
      window.stuffingSliderIndicator.set(slidesElements);
      window.stuffingSliderIndicator.update(slidesElements, currentSlideIndex);
    }
  };
})();

'use strict';

(function () {
  var indicatorElement = document.querySelector('.slider__indicator--stuffing'),
      indicatorElements = [],
      INDICATOR_ELEMENT_CLASS = 'slider__indicator-element',
      INDICATOR_CURRENT_ELEMENT_CLASS = 'slider__indicator-element--current',
      INDICATOR_EXTREME_ELEMENT_CLASS = 'slider__indicator-element--extreme',
      INDICATOR_ELEMENTS_NUMBER = 5;


  var createIndicatorElement = function () {  // Создает элемент индикатора
    var newIndicatorElement = document.createElement('div');
    newIndicatorElement.classList.add(INDICATOR_ELEMENT_CLASS);
    return newIndicatorElement;
  };

  var insertElement = function () {  // Добавляет элемент в индикатор
    indicatorElement.appendChild(createIndicatorElement());
  };

  var insertElements = function (slides) {  // Добавляет в индикатор нужное количество элементов
    if (slides.length === 1) {
      insertElement();
    } else if (slides.length > INDICATOR_ELEMENTS_NUMBER) {
      for (var i = 0; i < INDICATOR_ELEMENTS_NUMBER; i++) {
        insertElement();
      };
    } else {
      for (var i = 0; i < slides.length; i++) {
        insertElement();
      };
    }
    indicatorElements = Array.from(indicatorElement.querySelectorAll('.' + INDICATOR_ELEMENT_CLASS));
  };

  var updateSliderIndicator = function (slides, currentSlideIndex) {  // Обновляет индикатор слайдера
    var firstElement = indicatorElements[0];
    var lastElement = indicatorElements[INDICATOR_ELEMENTS_NUMBER - 1]
    var secondFromEndElement = indicatorElements[INDICATOR_ELEMENTS_NUMBER - 2]
    var thirdFromEndElement = indicatorElements[INDICATOR_ELEMENTS_NUMBER - 3]

    indicatorElements.forEach(function (element) {
      element.classList.remove(INDICATOR_CURRENT_ELEMENT_CLASS);
      element.classList.remove(INDICATOR_EXTREME_ELEMENT_CLASS);
    });

    if (slides.length <= INDICATOR_ELEMENTS_NUMBER) {
      indicatorElements[currentSlideIndex].classList.add(INDICATOR_CURRENT_ELEMENT_CLASS);
    } else if (slides.length > INDICATOR_ELEMENTS_NUMBER) {
      if (currentSlideIndex < 3) {
        indicatorElements[currentSlideIndex].classList.add(INDICATOR_CURRENT_ELEMENT_CLASS);
        lastElement.classList.add(INDICATOR_EXTREME_ELEMENT_CLASS);
      } else if (currentSlideIndex === slides.length -1) {
        lastElement.classList.add(INDICATOR_CURRENT_ELEMENT_CLASS);
        firstElement.classList.add(INDICATOR_EXTREME_ELEMENT_CLASS);
      } else if (currentSlideIndex === slides.length -2) {
        secondFromEndElement.classList.add(INDICATOR_CURRENT_ELEMENT_CLASS);
        firstElement.classList.add(INDICATOR_EXTREME_ELEMENT_CLASS);
      } else if (currentSlideIndex === slides.length -3) {
        thirdFromEndElement.classList.add(INDICATOR_CURRENT_ELEMENT_CLASS);
        firstElement.classList.add(INDICATOR_EXTREME_ELEMENT_CLASS);
      } else if (currentSlideIndex > 2 && currentSlideIndex < slides.length -3) {
        thirdFromEndElement.classList.add(INDICATOR_CURRENT_ELEMENT_CLASS);
        lastElement.classList.add(INDICATOR_EXTREME_ELEMENT_CLASS);
        firstElement.classList.add(INDICATOR_EXTREME_ELEMENT_CLASS);
      }
    }
  };

  window.stuffingSliderIndicator = {
    set: insertElements,
    update: updateSliderIndicator
  };
})();

'use strict';

(function () {
  var sliderElement = document.querySelector('.stuffing-list'),
      submitButtonElement = document.querySelector('.form__item-button--stuffing'),
      totalDesignElement = document.querySelector('#stuffing');

  var onSubmitButtonClick = function () { // Записывает текущее значение в итоговое окно
    var currentDesign = sliderElement.querySelector('.stuffing-item--current').querySelector('.stuffing-item__heading').textContent;
    sliderElement.querySelector('.stuffing-item--current').querySelector('.stuffing-item__radio').checked = true;
    totalDesignElement.textContent = currentDesign;
  };

  submitButtonElement.addEventListener('click', onSubmitButtonClick); // Навешивает обработчик

  window.stuffingSlider.add();
})();

'use strict';

(function () {
  var sliderElement = document.querySelector('.size-list'),
      slidesElements = Array.from(document.querySelectorAll('.size-item')),
      currentSlideClass = 'size-item--current',
      currentSlideIndex = 0,
      isLastSlide,
      isFirstSlide,
      swipeDirection = null,
      startSwipeX = 0,
      endSwipeX = 0,
      SWIPE_LENGTH = 50,
      TIME_SLIDE_BROWSING = 200; // В милисекундах

  var findCurrentSlide = function (element) {  // Возвращает true, если слайд активный
    if (element.classList.contains('size-item--current')) {
      return true;
    }
    return false;
  };

  var updateCurrentSlideIndex = function () {  // Определяет индекс активного слайда, проверяет не крайний ли он
    currentSlideIndex = slidesElements.findIndex(findCurrentSlide);
    isFirstSlide = currentSlideIndex === 0;
    isLastSlide = currentSlideIndex === slidesElements.length - 1;
  };

  var animateBrowsingNextSlide = function (currentSlide, nextSlide) { // Анимация перелистывания вперед
    currentSlide.style.cssText = 'animation: hideSlideToLeftMobile ' + (TIME_SLIDE_BROWSING / 1000) + 's;';
    setTimeout(function () {
      currentSlide.style.cssText = '';
      nextSlide.style.cssText = '';
    }, TIME_SLIDE_BROWSING);
  };

  var animateBrowsingPreviousSlide = function (currentSlide, previousSlide) { // Анимация перелистывания назад
    previousSlide.style.cssText = 'animation: showPreviousSlideMobile ' + TIME_SLIDE_BROWSING / 1000 + 's;';
    setTimeout(function () {
      currentSlide.style.cssText = null;
      previousSlide.style.cssText = null;
    }, TIME_SLIDE_BROWSING);
  };

  var showNextSlide = function (currentSlide, nextSlide) { // Показывает следующий слайд
    nextSlide.classList.add(currentSlideClass);
    animateBrowsingNextSlide(currentSlide, nextSlide);
    setTimeout(function () {
      currentSlide.classList.remove(currentSlideClass);
    }, TIME_SLIDE_BROWSING);
  };

  var showPreviousSlide = function (currentSlide, previousSlide) { // Показывает предыдущий слайд
    previousSlide.classList.add(currentSlideClass);
      animateBrowsingPreviousSlide(currentSlide, previousSlide);
      setTimeout(function () {
        currentSlide.classList.remove(currentSlideClass);
      }, TIME_SLIDE_BROWSING);
  };

  var changeSlide = function (direction) { // Смена слайда
    if (direction === 'left' && !isLastSlide) {
      var currentSlide = slidesElements[currentSlideIndex];
      var nextSlide = slidesElements[currentSlideIndex + 1];
      showNextSlide(currentSlide, nextSlide);
    } else if (direction === 'right' && !isFirstSlide) {
      var currentSlide = slidesElements[currentSlideIndex];
      var previousSlide = slidesElements[currentSlideIndex - 1];
      showPreviousSlide(currentSlide, previousSlide);
    }
    setTimeout(function () {
      updateCurrentSlideIndex();
      window.sizeSliderIndicator.update(currentSlideIndex);
    }, TIME_SLIDE_BROWSING);
  };

  var onSliderTouchStart = function (evt) {  // Запоминает координаты нажатия тапа
    startSwipeX = evt.changedTouches[0].screenX;
  };

  var onSliderTouchEnd = function (evt) {
    endSwipeX = evt.changedTouches[0].screenX;
    if (Math.abs(startSwipeX - endSwipeX) >= SWIPE_LENGTH) {
      if (startSwipeX - endSwipeX < 0) {
        swipeDirection = 'right';
      } else {
        swipeDirection = 'left';
      }
      changeSlide(swipeDirection);
    }
  };

  window.sizeSlider = {
    addSlider: function () { // Добавляет обработчик свайпа
      sliderElement.addEventListener('touchstart', onSliderTouchStart, false);
      sliderElement.addEventListener('touchend', onSliderTouchEnd, false);
      window.sizeSliderIndicator.update(currentSlideIndex);
    },

    removeSlider: function () {  // Удаляет обработчик свайпа
      sliderElement.removeEventListener('touchstart', onSliderTouchStart);
      sliderElement.removeEventListener('touchend', onSliderTouchEnd);
    }
  };
})();

'use strict';

(function () {
  var indicatorElement = document.querySelector('.slider__indicator--size'),
      slidesElements = Array.from(document.querySelectorAll('.size-item')),
      indicatorElements = [],
      INDICATOR_ELEMENT_CLASS = 'slider__indicator-element',
      INDICATOR_CURRENT_ELEMENT_CLASS = 'slider__indicator-element--current';


  var createIndicatorElement = function () {  // Создает элемент индикатора
    var newIndicatorElement = document.createElement('div');
    newIndicatorElement.classList.add(INDICATOR_ELEMENT_CLASS);
    return newIndicatorElement;
  };

  var insertElement = function () {  // Добавляет элемент в индикатор
    indicatorElement.appendChild(createIndicatorElement());
  };

  var insertElements = function (slides) {  // Добавляет в индикатор нужное количество элементов
    for (var i = 0; i < slides.length; i++) {
      insertElement();
    };
    indicatorElements = Array.from(indicatorElement.querySelectorAll('.' + INDICATOR_ELEMENT_CLASS));
  };

  var updateSliderIndicator = function (currentSlideIndex) {  // Обновляет индикатор слайдера
    indicatorElements.forEach(function (element) {
      element.classList.remove(INDICATOR_CURRENT_ELEMENT_CLASS);
    });
    indicatorElements[currentSlideIndex].classList.add(INDICATOR_CURRENT_ELEMENT_CLASS);
  };

  insertElements(slidesElements);

  window.sizeSliderIndicator = {
    update: updateSliderIndicator
  };
})();

'use strict';

(function () {
  var sizeListElement = document.querySelector('.size-list'),
      sizeElements = Array.from(sizeListElement.querySelectorAll('.size-item__label')),
      sizeItems = Array.from(sizeListElement.querySelectorAll('.size-item')),
      sizeTotal = document.querySelector('#size'),
      sizeButton = document.querySelector('.form__item-button--size');

  var updateSizeValue = function (evt) {
    sizeTotal.textContent = evt.target.textContent;
  };

  var onSizeElementClick = function (evt) {  // При клике на элемент, его значение записывается в итоговое поле.
    updateSizeValue(evt);
  };

  var onSizeElementPressEsc = function (evt) {  // При клике на элемент, его значение записывается в итоговое поле.
    if (evt.keyCode === 32) {
      sizeTotal.textContent = evt.currentTarget.querySelector('.size-item__label').textContent;
    }
  };

  var addSizeElementsListeners = function () {  // Вешает обработчики на все элементы
    for (var i = 0; i < sizeElements.length; i++) {
      sizeElements[i].addEventListener('click', onSizeElementClick);
      sizeItems[i].addEventListener('keydown', onSizeElementPressEsc);
    };
  };

  var removeSizeElementsListeners = function () {  // Удаляет обработчики с элементов
    for (var i = 0; i < sizeElements.length; i++) {
      sizeElements[i].removeEventListener('click', onSizeElementClick);
      sizeItems[i].removeEventListener('keydown', onSizeElementPressEsc);
    };
  };

  var findCurrentElement = function (element) {  // Возвращает true, если элемент активный
    if (element.classList.contains('size-item--current')) {
      return true;
    }
    return false;
  };

  var onSizeButtonClick = function () {  // При клике на кнопку, его значение записывается в итоговое поле.
    var currentSizeElementIndex = sizeItems.findIndex(findCurrentElement);
    sizeTotal.textContent = sizeItems[currentSizeElementIndex].querySelector('label').textContent;
  };

  window.addEventListener('resize', function () {
    // Обработчик изменения ширины экрана.
    if (screen.width >= 768) {
      window.sizeSlider.removeSlider();
      addSizeElementsListeners();
      sizeButton.removeEventListener('click', onSizeButtonClick);
    } else if (screen.width < 768) {
      window.sizeSlider.addSlider();
      removeSizeElementsListeners();
      sizeButton.addEventListener('click', onSizeButtonClick);
    }
  });

  if (screen.width >= 768) {
    window.sizeSlider.removeSlider();
    addSizeElementsListeners();
  }
  if (screen.width < 768) {
    window.sizeSlider.addSlider();
    sizeButton.addEventListener('click', onSizeButtonClick);
  }
})();

'use strict';

(function () {
  window.designData = {
    images: [
      'img/content/berries-mobile@1x.jpg',
      'img/content/marshmallow-mobile@1x.jpg',
      'img/content/berries2-mobile@1x.jpg',
      'img/content/berries3-mobile@1x.jpg',
      'img/content/birch-mobile@1x.jpg',
      'img/content/flowers2-mobile@1x.jpg',
      'img/content/flowers3-mobile@1x.jpg',
      'img/content/flowers-mobile@1x.jpg',
      'img/content/kids-mobile@1x.jpg',
      'img/content/offer-mobile@1x.jpg',
      'img/content/pink-mobile@1x.jpg',
      'img/content/romantic-mobile@1x.jpg',
      'img/content/shoco-berry-mobile@1x.jpg',
      'img/content/transformer-mobile@1x.jpg',
      'img/content/wedding2-mobile@1x.jpg'
    ],
    alt: [
      'Изображение оформления «Ягодное ассорти»',
      'Изображение оформления «Маршмэллоу»',
      'Изображение оформления «Ягодный без мастики»',
      'Изображение оформления «Рустик»',
      'Изображение оформления «Берёзка»',
      'Изображение оформления «Цветочная композиция»',
      'Изображение оформления «Цветочный без мастики»',
      'Изображение оформления «Розы с вишнями»',
      'Изображение оформления «Детское рождество»',
      'Изображение оформления «Предложение»',
      'Изображение оформления «Розовая принцесса»',
      'Изображение оформления «Романтика»',
      'Изображение оформления «Клубника в шоколаде»',
      'Изображение оформления «Бамблби»',
      'Изображение оформления «Свадебная классика»'
    ],
    headings: [
      'Ягодное ассорти',
      '«Маршмэллоу»',
      'Ягодный без мастики',
      '«Рустик»',
      '«Берёзка»',
      '«Цветочная композиция»',
      'Цветочный без мастики',
      'Розы с вишнями',
      '«Детское рождество»',
      '«Предложение»',
      '«Розовая принцесса»',
      '«Романтика»',
      'Клубника в шоколаде',
      '«Бамблби»',
      '«Свадебная классика»'
    ],
    prices: [
      '700 руб/кг',
      '600 руб/кг',
      '550 руб/кг',
      '650 руб/кг',
      '800 руб/кг',
      '750 руб/кг',
      '700 руб/кг',
      '800 руб/кг',
      '900 руб/кг',
      '650 руб/кг',
      '750 руб/кг',
      '1050 руб/кг',
      '950 руб/кг',
      '900 руб/кг',
      '950 руб/кг'
    ],
    inputsValues: [
      'berry-allsorts',
      'marshmallow',
      'berries-no-mastic',
      'rustic',
      'birch',
      'flower-bed',
      'flowers-no-mastic',
      'cherry-rose',
      'kids-christmas',
      'offer',
      'opink-princess',
      'romantic',
      'shoko-strawberry',
      'bumblebee',
      'wedding-classic'
    ]
  };
})();

'use strict';

(function () {
  var sliderElement = document.querySelector('.design-list'),
      template = document.querySelector('#template'),
      windowWidth = window.innerWidth,
      DEFAULT_SLIDE_NUMBER = 1;

  var createSlide = function (data, index) { // Создает новый слайд
    var tempSlide = template.querySelector('.design-item').cloneNode(true);
    tempSlide.querySelector('.design-item__heading').textContent = data.headings[index];
    tempSlide.querySelector('.design-item__price').textContent = data.prices[index];
    tempSlide.querySelector('img').setAttribute('src', data.images[index]);
    tempSlide.querySelector('img').setAttribute('alt', data.alt[index]);
    tempSlide.querySelector('input').value = data.inputsValues[index];
    tempSlide.querySelectorAll('source')[0].setAttribute('srcset', data.images[index].replace(/mobile/gi, 'desktop').replace(/jpg/gi, 'webp'));
    tempSlide.querySelectorAll('source')[1].setAttribute('srcset', data.images[index].replace(/mobile/gi, 'tablet').replace(/jpg/gi, 'webp'));
    tempSlide.querySelectorAll('source')[2].setAttribute('srcset', data.images[index].replace(/jpg/gi, 'webp'));
    tempSlide.querySelectorAll('source')[3].setAttribute('srcset', data.images[index].replace(/mobile/gi, 'desktop'));
    tempSlide.querySelectorAll('source')[4].setAttribute('srcset', data.images[index].replace(/mobile/gi, 'tablet'));
    return tempSlide;
  }

  var createSlidesFragment = function (data) {  // Создает фрагмент со слайдами
    var slidesNumber = data.headings.length;
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < slidesNumber; i++) {
      fragment.appendChild(createSlide(data, i));
    };
    fragment.querySelectorAll('.design-item')[DEFAULT_SLIDE_NUMBER - 1].classList.add('design-item--current');
    if (windowWidth > 767) {  // Начиная с планшетной версии показывается 2 слайда одновременно
      fragment.querySelectorAll('.design-item')[DEFAULT_SLIDE_NUMBER].classList.add('design-item--current');
    }
    return fragment;
  };

  sliderElement.appendChild(createSlidesFragment(window.designData));
})();

'use strict';

(function () {
  var sliderElement = document.querySelector('.design-list'),
      slidesElements = Array.from(sliderElement.querySelectorAll('.design-item')),
      sliderCounterElement = document.querySelector('.form__design-slider-counter'),
      sliderPreviousButtonElement = document.querySelector('.slider__navigation--design-previous'),
      sliderNextButtonElement = document.querySelector('.slider__navigation--design-next'),
      currentSlideClass = 'design-item--current',
      showedSlidesNumberMobile = 1,
      showedSlidesNumberTablet = 2,
      currentSlideIndex,
      isFirstSlide,
      isLastSlide,
      SWIPE_LENGTH = 50,
      TIME_SLIDE_BROWSING = 300; // В милисекундах

  var sliderCounterUpdate = function () { // Обновляет счетчик слайдов
    if (window.innerWidth < 768) {
      sliderCounterElement.textContent = (currentSlideIndex + 1) + '/' + slidesElements.length;
    } else {
      sliderCounterElement.textContent = (currentSlideIndex + 2) + '/' + slidesElements.length;
    }
  };

  var findCurrentSlide = function (element) { // Возвращает true, если слайд активный
    if (element.classList.contains(currentSlideClass)) {
      return true;
    }
    return false;
  };

  var updateCurrentSlideIndex = function () { // Определяет индекс активного слайда, проверяет не крайний ли он
    currentSlideIndex = slidesElements.findIndex(findCurrentSlide);
    isFirstSlide = currentSlideIndex === 0;
    if (window.innerWidth < 768) {
      isLastSlide = currentSlideIndex === slidesElements.length - 1;
    } else {
      isLastSlide = currentSlideIndex === slidesElements.length - 2;
    }
  };

  var animateBrowsingNextSlide = function (currentSlide, nextSlide) { // Анимация перелистывания вперед
    if (window.innerWidth < 768) {
      currentSlide.style.cssText = 'animation: hideSlideToLeftMobile ' + (TIME_SLIDE_BROWSING / 1000) + 's;';
    } else if (window.innerWidth < 1366) {
      currentSlide.style.cssText = 'animation: hideSlideToLeftTablet ' + (TIME_SLIDE_BROWSING / 1000) + 's;';
    } else {
      currentSlide.style.cssText = 'animation: hideSlideToLeftDesktop ' + (TIME_SLIDE_BROWSING / 1000) + 's;';
    }
    setTimeout(function () {
      currentSlide.style.cssText = '';
      nextSlide.style.cssText = '';
    }, TIME_SLIDE_BROWSING);
  };

  var animateBrowsingPreviousSlide = function (currentSlide, previousSlide) { // Анимация перелистывания назад
    if (window.innerWidth < 768) {
      previousSlide.style.cssText = 'animation: showPreviousSlideMobile ' + TIME_SLIDE_BROWSING / 1000 + 's;';
    } else if (window.innerWidth < 1366) {
      previousSlide.style.cssText = 'animation: showPreviousSlideTablet ' + TIME_SLIDE_BROWSING / 1000 + 's;';
    } else {
      previousSlide.style.cssText = 'animation: showPreviousSlideDesktop ' + TIME_SLIDE_BROWSING / 1000 + 's;';
    }
    setTimeout(function () {
      currentSlide.style.cssText = null;
      previousSlide.style.cssText = null;
    }, TIME_SLIDE_BROWSING);
  };

  var showNextSlide = function (currentSlide, nextSlide) { // Показывает следующий слайд
    nextSlide.classList.add(currentSlideClass);
    animateBrowsingNextSlide(currentSlide, nextSlide);
    setTimeout(function () {
      currentSlide.classList.remove(currentSlideClass);
    }, TIME_SLIDE_BROWSING);
  };

  var showPreviousSlide = function (currentSlide, previousSlide) { // Показывает предыдущий слайд
    previousSlide.classList.add(currentSlideClass);
      animateBrowsingPreviousSlide(currentSlide, previousSlide);
      setTimeout(function () {
        currentSlide.classList.remove(currentSlideClass);
      }, TIME_SLIDE_BROWSING);
  };

  var changeSlide = function (direction) { // Меняет слвйд в зависимости от направления свайпа
    if (direction === 'left' && !isLastSlide) {
      var currentSlide = slidesElements[currentSlideIndex];
      if (window.innerWidth < 768) {
        var nextSlide = slidesElements[currentSlideIndex + showedSlidesNumberMobile];
      } else {
        var nextSlide = slidesElements[currentSlideIndex + showedSlidesNumberTablet];
      }
      showNextSlide(currentSlide, nextSlide);
    } else if (direction === 'right' && !isFirstSlide) {
      if (window.innerWidth < 768) {
        var currentSlide = slidesElements[currentSlideIndex];
        var previousSlide = slidesElements[currentSlideIndex - showedSlidesNumberMobile];
      } else {
        var currentSlide = slidesElements[currentSlideIndex + 1];
        var previousSlide = slidesElements[currentSlideIndex - 1];
      }
      showPreviousSlide(currentSlide, previousSlide);
    }
    setTimeout(function () {
      updateCurrentSlideIndex();
      window.designSliderIndicator.update(slidesElements, currentSlideIndex);
      sliderCounterUpdate();
      navigationButtonsUpdate();
    }, TIME_SLIDE_BROWSING);
  };

  var addSwipeListener = function (element) { // Добавляет обработчик свайпа на элемент
    var startSwipeX = null;
    var endSwipeX = null;
    var swipeDirection = null;

    element.addEventListener('touchstart', function (evt) { // При косании экрана запоминает координаты
      startSwipeX = evt.changedTouches[0].screenX;
    });

    element.addEventListener('touchend', function (evt) { // По окончании свайпа запоминает координаты и если длина свайпа не меньше заданной,
      endSwipeX = evt.changedTouches[0].screenX;          // определяет направление свайпа и запускает функцию с этим аргументом
      if (Math.abs(startSwipeX - endSwipeX) >= SWIPE_LENGTH) {
        if (startSwipeX - endSwipeX < 0) {
          swipeDirection = 'right';
        } else {
          swipeDirection = 'left';
        }
        changeSlide(swipeDirection);
      }
    });
  };

  var addNavigationButtonsListeners = function () { // Обработчики кнопок навигации слайдера
    sliderPreviousButtonElement.addEventListener('click', function (evt) {
      evt.preventDefault();
      changeSlide('right');
    });
    sliderNextButtonElement.addEventListener('click', function (evt) {
      evt.preventDefault();
      changeSlide('left');
    });
  };

  var navigationButtonsUpdate = function () {
    sliderPreviousButtonElement.classList.remove('slider__navigation--disabled');
    sliderNextButtonElement.classList.remove('slider__navigation--disabled');
    if (isFirstSlide) {
      sliderPreviousButtonElement.classList.add('slider__navigation--disabled');
    } else if (isLastSlide) {
      sliderNextButtonElement.classList.add('slider__navigation--disabled');
    }
  };

  window.designSlider = {
    add: function() {
      addSwipeListener(sliderElement);
      addNavigationButtonsListeners();
      updateCurrentSlideIndex();
      navigationButtonsUpdate();
      window.designSliderIndicator.set(slidesElements);
      window.designSliderIndicator.update(slidesElements, currentSlideIndex);
      sliderCounterUpdate();
    }
  };
})();

'use strict';

(function () {
  var indicatorElement = document.querySelector('.slider__indicator--design'),
      indicatorElements = [],
      INDICATOR_ELEMENT_CLASS = 'slider__indicator-element',
      INDICATOR_CURRENT_ELEMENT_CLASS = 'slider__indicator-element--current',
      INDICATOR_EXTREME_ELEMENT_CLASS = 'slider__indicator-element--extreme',
      INDICATOR_ELEMENTS_NUMBER = 5;

  var createIndicatorElement = function () { // Создает элемент индикатора
    var newIndicatorElement = document.createElement('div');
    newIndicatorElement.classList.add(INDICATOR_ELEMENT_CLASS);
    return newIndicatorElement;
  };

  var insertElement = function () { // Добавляет элемент в индикатор
    indicatorElement.appendChild(createIndicatorElement());
  };

  var insertElements = function (slides) { // Добавляет в индикатор нужное количество элементов
    if (slides.length === 1) {
      insertElement();
    } else if (slides.length > INDICATOR_ELEMENTS_NUMBER) {
      for (var i = 0; i < INDICATOR_ELEMENTS_NUMBER; i++) {
        insertElement();
      };
    } else {
      for (var i = 0; i < slides.length; i++) {
        insertElement();
      };
    }
    indicatorElements = Array.from(indicatorElement.querySelectorAll('.' + INDICATOR_ELEMENT_CLASS));
  };

  var updateSliderIndicator = function (slides, currentSlideIndex) { // Обновляет индикатор слайдера
    var firstElement = indicatorElements[0];
    var lastElement = indicatorElements[INDICATOR_ELEMENTS_NUMBER - 1]
    var secondFromEndElement = indicatorElements[INDICATOR_ELEMENTS_NUMBER - 2]
    var thirdFromEndElement = indicatorElements[INDICATOR_ELEMENTS_NUMBER - 3]

    indicatorElements.forEach(function (element) {
      element.classList.remove(INDICATOR_CURRENT_ELEMENT_CLASS);
      element.classList.remove(INDICATOR_EXTREME_ELEMENT_CLASS);
    });

    if (slides.length <= INDICATOR_ELEMENTS_NUMBER) {
      indicatorElements[currentSlideIndex].classList.add(INDICATOR_CURRENT_ELEMENT_CLASS);
    } else if (slides.length > INDICATOR_ELEMENTS_NUMBER) {
      if (currentSlideIndex < 3) {
        indicatorElements[currentSlideIndex].classList.add(INDICATOR_CURRENT_ELEMENT_CLASS);
        lastElement.classList.add(INDICATOR_EXTREME_ELEMENT_CLASS);
      } else if (currentSlideIndex === slides.length -1) {
        lastElement.classList.add(INDICATOR_CURRENT_ELEMENT_CLASS);
        firstElement.classList.add(INDICATOR_EXTREME_ELEMENT_CLASS);
      } else if (currentSlideIndex === slides.length -2) {
        secondFromEndElement.classList.add(INDICATOR_CURRENT_ELEMENT_CLASS);
        firstElement.classList.add(INDICATOR_EXTREME_ELEMENT_CLASS);
      } else if (currentSlideIndex === slides.length -3) {
        thirdFromEndElement.classList.add(INDICATOR_CURRENT_ELEMENT_CLASS);
        firstElement.classList.add(INDICATOR_EXTREME_ELEMENT_CLASS);
      } else if (currentSlideIndex > 2 && currentSlideIndex < slides.length -3) {
        thirdFromEndElement.classList.add(INDICATOR_CURRENT_ELEMENT_CLASS);
        lastElement.classList.add(INDICATOR_EXTREME_ELEMENT_CLASS);
        firstElement.classList.add(INDICATOR_EXTREME_ELEMENT_CLASS);
      }
    }
  };

  window.designSliderIndicator = {
    set: insertElements,
    update: updateSliderIndicator
  };
})();

'use strict';

(function () {
  var sliderElement = document.querySelector('.design-list'),
      slidesElements = Array.from(document.querySelectorAll('.design-item')),
      submitButtonElement = document.querySelector('.form__item-button--design'),
      totalDesignElement = document.querySelector('#design'),
      windowWidth = window.innerWidth;

  var onSubmitButtonClick = function () {  // Записывает значение текущего слайда в итоговое окно
    var currentDesign = sliderElement.querySelector('.design-item--current').querySelector('.design-item__heading').textContent;
    totalDesignElement.textContent = currentDesign;
    sliderElement.querySelector('.design-item--current').querySelector('.design-item__radio').checked = true;
  };

  var addSlideClickListener = function (evt) { // Записывает значение слайда по которому был клик в итоговое окно
    totalDesignElement.textContent = evt.currentTarget.querySelector('.design-item__heading').textContent;
    evt.currentTarget.querySelector('.design-item__radio').checked = true;
  };

  var addAllSlidesClickListeners = function (slides) { // Добавляет обработчик клика всем слайдам
    for (var i = 0; i < slides.length; i++) {
      slides[i].addEventListener('click', addSlideClickListener);
    };
  }

  var removeAllSlidesClickListeners = function (slides) { // Удаляет обработчик клика всем слайдам
    for (var i = 0; i < slides.length; i++) {
      slides[i].removeEventListener('click', addSlideClickListener);
    };
  }

  var addOrDeleteSlidesListeners = function (slides) { // В зависимости от ширины окна добавляет
    if (windowWidth < 768) {                           // или удаляет обработчики клика по слайдам
      removeAllSlidesClickListeners(slides);
    } else {
      addAllSlidesClickListeners(slides);
    }
  };

  var updateWindowWidth = function () { // Отслеживает ширину окна
    windowWidth = window.innerWidth;
    addOrDeleteSlidesListeners(slidesElements);
  };

  window.addEventListener('resize', updateWindowWidth)
  window.designSlider.add(); // Импортирует настройки для слайдера
  submitButtonElement.addEventListener('click', onSubmitButtonClick);  // Навешивает обработчик на кнопку
  addOrDeleteSlidesListeners(slidesElements);
})();

'use strict';

(function () {
  var totalStuffing = document.querySelector('#stuffing'),
      totalSize = document.querySelector('#size'),
      totalDesign = document.querySelector('#design'),
      stuffingValue = document.querySelector('.stuffing-item--current').querySelector('.stuffing-item__heading').textContent,
      sizeValue = document.querySelector('.size-item--current').querySelector('.size-item__label').textContent,
      designValue = document.querySelector('.design-item--current').querySelector('.design-item__heading').textContent;

  var setDefaultValue = function () { // Записывает дефолтные значения
    totalStuffing.textContent = stuffingValue;
    totalSize.textContent = sizeValue;
    totalDesign.textContent = designValue;
  };

  setDefaultValue();
})();

'use strict';

(function () {
  window.reviewsData = {
    names: [
      'Мария',
      'Александр',
      'Мирослава',
      'Константин'
    ],
    info: [
      'юрист, 33 года',
      'врач, 36 лет',
      'дизайнер, 27 лет',
      'риэлтор, 28 лет'
    ],
    texts: [
      'Заказывала торт брауни на юбилей мужа. Гости были в восторге! Отдельное спасибо за своевременную доставку! Теперь будем заказывать торты только у вас для наших семейных праздников:)',
      'Заказывали торт на свадьбу. Все моменты были оговорены заранее: начинки, цвета, фрукты, украшения. Кондитер всё учёл, торт доставлен в срок, без опазданий, цена не изменилась. За умереную плату из мастики слепили фигурки по нашему эскизу, причем заранее согласовали их внешний вид. Приятным бонусом послужил бесплатный пробник тортика, который нам любезно предоставили при заказе. Мне торт показался суховатым, но это мнение не совпало с большинством гостей, с кем удалось пообщаться на второй день. Все довольны финальным лакомством. так что свои слова по поводу сухости прошу близко к сердцу не принимать. И самый главный момент - цена!!! она ниже среднего ценника или на среднем уровне. Я бы заказал здесь торт еще раз. Советуем и рекомендуем! Дмитрий и Мария. Тортик в стиле «Рустик»',
      'Хотела бы выразить огромную благодарность Кондитеру. Заказывали "голый" торт на свадьбу 25.06.18. И, хотя само обсуждение его внешнего вида и вкуса заняло минут 5, когда торт приехал (вовремя, кстати) - я просто обомлела. Я даже не ожидала, что он окажется настолько красивым! Все пожелания, даже не озвученные, были угаданы учтены - торт как будто сошел с картинки. А каким же вкусным он оказался! Прекрасное сочетание ингредиентов: шоколадного бисквита, крема из маскарпоне и ягод, фруктов. "Легкий", красивый, вкусный! Умяли все до последнего кусочка! Спасибо за прекрасную работу и за то, что помогли нам так красиво и вкусно завершить наш радостный праздник! Успехов вам!',
      'Обожаю ваши тортики! Очень удобно делать заказ через сайт. Спасибо что вы есть)'
    ],
    photos: [
      'img/content/review-photo1-mobile@1x.png',
      'img/content/review-photo2-mobile@1x.png',
      'img/content/review-photo3-mobile@1x.png',
      'img/content/review-photo4-mobile@1x.png'
    ]
  };
})();

'use strict';

(function () {
  var sliderElement = document.querySelector('.reviews__list'),
      template = document.querySelector('#template'),
      SHOWN_WORDS_NUMBERS = 26;

  var insertReviewText = function (slide, text, maxWordsNumbers) {  // Если в тексте больше максимального количества
    var words = text.split(' ');                                    // слов - делит его на части и вставляет в слайд.
    if (words.length > maxWordsNumbers) {                           // Еслине больше - вставляет текст и прячет кнопку
      var shownText = words.slice(0, maxWordsNumbers - 1).join(' ');// "Развернуть".
      var hiddenText = words.slice(maxWordsNumbers - 1).join(' ');
      slide.querySelector('.reviews__item-text').textContent = shownText;
      slide.querySelector('.reviews__item-text-hidden').textContent = hiddenText;
    } else {
      slide.querySelector('.reviews__item-text').textContent = text;
      slide.querySelector('.reviews__item-full-text--show').style.display = 'none';
    }
  };

  var addShowFullReviewLinkListener = function (slide) { // Обработчик для ссылки "Развернуть"
    var showFullReviewLink = slide.querySelector('.reviews__item-full-text--show');
    showFullReviewLink.addEventListener('click', function (evt) {
      evt.preventDefault();
      slide.querySelector('.reviews__item-text-hidden').style.display = 'inline';
      slide.querySelector('.reviews__item-full-text--show').style.display = 'none';
      slide.querySelector('.reviews__item-full-text--hide').style.display = 'inline';
    });
  };

  var addHideFullReviewLinkListener = function (slide) { // Обработчик для ссылки "Развернуть"
    var hideFullReviewLink = slide.querySelector('.reviews__item-full-text--hide');
    hideFullReviewLink.addEventListener('click', function (evt) {
      evt.preventDefault();
      slide.querySelector('.reviews__item-text-hidden').style.display = 'none';
      slide.querySelector('.reviews__item-full-text--show').style.display = 'inline';
      slide.querySelector('.reviews__item-full-text--hide').style.display = 'none';
    });
  };

  var createSlide = function (data, index) {  // Создает новый слайд
    var tempSlide = template.querySelector('.reviews__item').cloneNode(true);
    tempSlide.querySelector('.reviews__item-name').textContent = data.names[index];
    tempSlide.querySelector('.reviews__item-info').textContent = data.info[index];
    insertReviewText(tempSlide, data.texts[index], SHOWN_WORDS_NUMBERS);
    addShowFullReviewLinkListener(tempSlide);
    addHideFullReviewLinkListener(tempSlide);
    tempSlide.querySelector('img').setAttribute('src', data.photos[index]);
    tempSlide.querySelectorAll('source')[0].setAttribute('srcset', data.photos[index].replace(/mobile/gi, 'desktop').replace(/png/gi, 'webp'));
    tempSlide.querySelectorAll('source')[1].setAttribute('srcset', data.photos[index].replace(/mobile/gi, 'tablet').replace(/png/gi, 'webp'));
    tempSlide.querySelectorAll('source')[2].setAttribute('srcset', data.photos[index].replace(/png/gi, 'webp'));
    tempSlide.querySelectorAll('source')[3].setAttribute('srcset', data.photos[index].replace(/mobile/gi, 'desktop'));
    tempSlide.querySelectorAll('source')[4].setAttribute('srcset', data.photos[index].replace(/mobile/gi, 'tablet'));
    return tempSlide;
  }

  var createSlidesFragment = function (data) {  // Создает фрагмент со слайдами
    var slidesNumber = data.names.length;
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < slidesNumber; i++) {
      fragment.appendChild(createSlide(data, i));
    };
    fragment.querySelector('.reviews__item').classList.add('reviews__item--current');
    return fragment;
  };

  sliderElement.appendChild(createSlidesFragment(window.reviewsData));
})();

'use strict';

(function () {
  var sliderElement = document.querySelector('.reviews__list'),
      slidesElements = Array.from(sliderElement.querySelectorAll('.reviews__item')),
      sliderPreviousButtonElement = document.querySelector('.slider__navigation--reviews-previous'),
      sliderNextButtonElement = document.querySelector('.slider__navigation--reviews-next'),
      sliderCounterElement = document.querySelector('.reviews__slider-counter'),
      currentSlideClass = 'reviews__item--current',
      showedSlidesNumber = 1,
      currentSlideIndex,
      isFirstSlide,
      isLastSlide,
      SWIPE_LENGTH = 50,
      TIME_SLIDE_BROWSING = 300; // В милисекундах

  var sliderCounterUpdate = function () { // Обновляет счетчик слайдов
      sliderCounterElement.textContent = (currentSlideIndex + 1) + '/' + slidesElements.length;
  };

  var findCurrentSlide = function (element) { // Возвращает true, если слайд активный
    if (element.classList.contains(currentSlideClass)) {
      return true;
    }
    return false;
  };

  var updateCurrentSlideIndex = function () { // Определяет индекс активного слайда, проверяет не крайний ли он
    currentSlideIndex = slidesElements.findIndex(findCurrentSlide);
    isFirstSlide = currentSlideIndex === 0;
    isLastSlide = currentSlideIndex === slidesElements.length - 1;
  };

  var animateBrowsingNextSlide = function (currentSlide, nextSlide) { // Анимация перелистывания вперед
    if (window.innerWidth < 768) {
      currentSlide.style.cssText = 'animation: hideReviewsSlideToLeftMobile ' + (TIME_SLIDE_BROWSING / 1000) + 's;';
    } else if (window.innerWidth < 1366) {
      currentSlide.style.cssText = 'animation: hideReviewsSlideToLeftTablet ' + (TIME_SLIDE_BROWSING / 1000) + 's;';
    } else {
      currentSlide.style.cssText = 'animation: hideReviewsSlideToLeftDesktop ' + (TIME_SLIDE_BROWSING / 1000) + 's;';
    }
    setTimeout(function () {
      currentSlide.style.cssText = '';
      nextSlide.style.cssText = '';
    }, TIME_SLIDE_BROWSING);
  };

  var animateBrowsingPreviousSlide = function (currentSlide, previousSlide) { // Анимация перелистывания назад
    if (window.innerWidth < 768) {
      previousSlide.style.cssText = 'animation: showPreviousReviewsSlideMobile ' + TIME_SLIDE_BROWSING / 1000 + 's;';
    } else if (window.innerWidth < 1366) {
      previousSlide.style.cssText = 'animation: showPreviousReviewsSlideTablet ' + TIME_SLIDE_BROWSING / 1000 + 's;';
    } else {
      previousSlide.style.cssText = 'animation: showPreviousReviewsSlideDesktop ' + TIME_SLIDE_BROWSING / 1000 + 's;';
    }
    setTimeout(function () {
      currentSlide.style.cssText = null;
      previousSlide.style.cssText = null;
    }, TIME_SLIDE_BROWSING);
  };

  var showNextSlide = function (currentSlide, nextSlide) { // Показывает следующий слайд
    nextSlide.classList.add(currentSlideClass);
    animateBrowsingNextSlide(currentSlide, nextSlide);
    setTimeout(function () {
      currentSlide.classList.remove(currentSlideClass);
    }, TIME_SLIDE_BROWSING);
  };

  var showPreviousSlide = function (currentSlide, previousSlide) { // Показывает предыдущий слайд
    previousSlide.classList.add(currentSlideClass);
      animateBrowsingPreviousSlide(currentSlide, previousSlide);
      setTimeout(function () {
        currentSlide.classList.remove(currentSlideClass);
      }, TIME_SLIDE_BROWSING);
  };

  var changeSlide = function (direction) { // Меняет слвйд в зависимости от направления свайпа
    if (direction === 'left' && !isLastSlide) {
      var currentSlide = slidesElements[currentSlideIndex];
      var nextSlide = slidesElements[currentSlideIndex + showedSlidesNumber];
      showNextSlide(currentSlide, nextSlide);
    } else if (direction === 'right' && !isFirstSlide) {
      var currentSlide = slidesElements[currentSlideIndex];
      var previousSlide = slidesElements[currentSlideIndex - showedSlidesNumber];
      showPreviousSlide(currentSlide, previousSlide);
    }
    setTimeout(function () {
      updateCurrentSlideIndex();
      window.reviewsSliderIndicator.update(slidesElements, currentSlideIndex);
      navigationButtonsUpdate();
      sliderCounterUpdate();
    }, TIME_SLIDE_BROWSING);
  };

  var addSwipeListener = function (element) { // Добавляет обработчик свайпа на элемент
    var startSwipeX = null;
    var endSwipeX = null;
    var swipeDirection = null;

    element.addEventListener('touchstart', function (evt) { // При косании экрана запоминает координаты
      startSwipeX = evt.changedTouches[0].screenX;
    });

    element.addEventListener('touchend', function (evt) { // По окончании свайпа запоминает координаты и если длина свайпа не меньше заданной,
      endSwipeX = evt.changedTouches[0].screenX;          // определяет направление свайпа и запускает функцию с этим аргументом
      if (Math.abs(startSwipeX - endSwipeX) >= SWIPE_LENGTH) {
        if (startSwipeX - endSwipeX < 0) {
          swipeDirection = 'right';
        } else {
          swipeDirection = 'left';
        }
        changeSlide(swipeDirection);
      }
    });
  };

  var addNavigationButtonsListeners = function () { // Обработчики кнопок навигации слайдера
    sliderPreviousButtonElement.addEventListener('click', function (evt) {
      evt.preventDefault();
      changeSlide('right');
    });
    sliderNextButtonElement.addEventListener('click', function (evt) {
      evt.preventDefault();
      changeSlide('left');
    });
  };

  var navigationButtonsUpdate = function () {
    sliderPreviousButtonElement.classList.remove('slider__navigation--disabled');
    sliderNextButtonElement.classList.remove('slider__navigation--disabled');
    if (isFirstSlide) {
      sliderPreviousButtonElement.classList.add('slider__navigation--disabled');
    } else if (isLastSlide) {
      sliderNextButtonElement.classList.add('slider__navigation--disabled');
    }
  };

  window.reviewsSlider = {
    add: function() {
      addSwipeListener(sliderElement);
      addNavigationButtonsListeners();
      updateCurrentSlideIndex();
      navigationButtonsUpdate();
      sliderCounterUpdate();
      window.reviewsSliderIndicator.set(slidesElements);
      window.reviewsSliderIndicator.update(slidesElements, currentSlideIndex);
    }
  };
})();

'use strict';

(function () {
  var indicatorElement = document.querySelector('.slider__indicator--reviews'),
      indicatorElements = [],
      INDICATOR_ELEMENT_CLASS = 'slider__indicator-element',
      INDICATOR_ELEMENT_CLASS_MOD = 'slider__indicator-element--reviews',
      INDICATOR_CURRENT_ELEMENT_CLASS = 'slider__indicator-element--current',
      INDICATOR_EXTREME_ELEMENT_CLASS = 'slider__indicator-element--extreme',
      INDICATOR_ELEMENTS_NUMBER = 5;


  var createIndicatorElement = function () {  // Создает элемент индикатора
    var newIndicatorElement = document.createElement('div');
    newIndicatorElement.classList.add(INDICATOR_ELEMENT_CLASS, INDICATOR_ELEMENT_CLASS_MOD);
    return newIndicatorElement;
  };

  var insertElement = function () {  // Добавляет элемент в индикатор
    indicatorElement.appendChild(createIndicatorElement());
  };

  var insertElements = function (slides) {  // Добавляет в индикатор нужное количество элементов
    if (slides.length === 1) {
      insertElement();
    } else if (slides.length > INDICATOR_ELEMENTS_NUMBER) {
      for (var i = 0; i < INDICATOR_ELEMENTS_NUMBER; i++) {
        insertElement();
      };
    } else {
      for (var i = 0; i < slides.length; i++) {
        insertElement();
      };
    }
    indicatorElements = Array.from(indicatorElement.querySelectorAll('.' + INDICATOR_ELEMENT_CLASS));
  };

  var updateSliderIndicator = function (slides, currentSlideIndex) {  // Обновляет индикатор слайдера
    var firstElement = indicatorElements[0];
    var lastElement = indicatorElements[INDICATOR_ELEMENTS_NUMBER - 1]
    var secondFromEndElement = indicatorElements[INDICATOR_ELEMENTS_NUMBER - 2]
    var thirdFromEndElement = indicatorElements[INDICATOR_ELEMENTS_NUMBER - 3]

    indicatorElements.forEach(function (element) {
      element.classList.remove(INDICATOR_CURRENT_ELEMENT_CLASS);
      element.classList.remove(INDICATOR_EXTREME_ELEMENT_CLASS);
    });

    if (slides.length <= INDICATOR_ELEMENTS_NUMBER) {
      indicatorElements[currentSlideIndex].classList.add(INDICATOR_CURRENT_ELEMENT_CLASS);
    } else if (slides.length > INDICATOR_ELEMENTS_NUMBER) {
      if (currentSlideIndex < 3) {
        indicatorElements[currentSlideIndex].classList.add(INDICATOR_CURRENT_ELEMENT_CLASS);
        lastElement.classList.add(INDICATOR_EXTREME_ELEMENT_CLASS);
      } else if (currentSlideIndex === slides.length -1) {
        lastElement.classList.add(INDICATOR_CURRENT_ELEMENT_CLASS);
        firstElement.classList.add(INDICATOR_EXTREME_ELEMENT_CLASS);
      } else if (currentSlideIndex === slides.length -2) {
        secondFromEndElement.classList.add(INDICATOR_CURRENT_ELEMENT_CLASS);
        firstElement.classList.add(INDICATOR_EXTREME_ELEMENT_CLASS);
      } else if (currentSlideIndex === slides.length -3) {
        thirdFromEndElement.classList.add(INDICATOR_CURRENT_ELEMENT_CLASS);
        firstElement.classList.add(INDICATOR_EXTREME_ELEMENT_CLASS);
      } else if (currentSlideIndex > 2 && currentSlideIndex < slides.length -3) {
        thirdFromEndElement.classList.add(INDICATOR_CURRENT_ELEMENT_CLASS);
        lastElement.classList.add(INDICATOR_EXTREME_ELEMENT_CLASS);
        firstElement.classList.add(INDICATOR_EXTREME_ELEMENT_CLASS);
      }
    }
  };

  window.reviewsSliderIndicator = {
    set: insertElements,
    update: updateSliderIndicator
  };
})();

'use strict';

(function () {
  window.reviewsSlider.add(); // Импортирует настройки для слайдера
})();
