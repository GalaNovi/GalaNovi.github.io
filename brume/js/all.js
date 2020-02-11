$('.present__slider').slick({
  dots: true,
  arrows: false,
  infinite: true,
  speed: 1000,
  fade: true,
  cssEase: 'linear',
  autoplay: true,
  autoplaySpeed: 5000,
  responsive: [
    {
      breakpoint: 961,
      settings: {
        dots: false
      }
    }
  ]
});

$('.portfolio__slider').slick({
  slidesToShow: 4,
  slidesToScroll: 4,
  infinite: false,
  responsive: [
    {
      breakpoint: 961,
      settings: {
        initialSlide: 1,
        infinite: false,
        arrows: false,
        centerMode: true,
        centerPadding: '59px',
        slidesToShow: 1,
        slidesToScroll: 1,
        variableWidth: false
      }
    },
    {
      breakpoint: 769,
      settings: {
        initialSlide: 1,
        infinite: false,
        arrows: false,
        centerMode: true,
        centerPadding: '22px',
        slidesToShow: 1,
        slidesToScroll: 1,
        variableWidth: false
      }
    }
  ]
});

$('.reviews__slider').slick({
  initialSlide: 1,
  arrows: false,
  infinite: true,
  speed: 1000,
  fade: true,
  dots: true,
  dotsClass: 'reviews__slider-dots',
  adaptiveHeight: true,
  autoplay: true
});

'use-strict';

(function () {
  var DESKTOP_WIDTH = 960;
  var TABLET_WIDTH = 768;
  var PADDING_CONTAINER = 15;
  var TABLET_PADDING_CONTAINER = 37;
  var SLIDES_TO_SHOW = 4;
  var WIDTH_HOVERED_SLIDE = 33.5;     // Процентов от ширины контейнера
  var WIDTH_UNHOVERED_SLIDE = 22.16;  // за вычетом паддингов
  var slidesElements = document.querySelectorAll('.portfolio__item');
  var containerElement = document.querySelector('.container');
  var paddingsSum = 0;

  var onSlideHover = function (evt) {
    window.innerWidth > DESKTOP_WIDTH || window.innerWidth <= TABLET_WIDTH ? paddingsSum = (PADDING_CONTAINER * 2) : paddingsSum = (TABLET_PADDING_CONTAINER * 2);
    var currentWidth = containerElement.offsetWidth - paddingsSum;
    var slidesActiveElements = document.querySelector('.portfolio__slider').querySelectorAll('div.slick-active');

    for (var i = 0; i < slidesActiveElements.length; i++) {
      if (slidesActiveElements[i] !== evt.target) {
        slidesActiveElements[i].style.width = currentWidth * (WIDTH_UNHOVERED_SLIDE / 100) + 'px';
      }
      evt.currentTarget.style.width = currentWidth * (WIDTH_HOVERED_SLIDE / 100) + 'px';
    }
  };

  var onSlideOut = function () {
    window.innerWidth > DESKTOP_WIDTH || window.innerWidth <= TABLET_WIDTH ? paddingsSum = (PADDING_CONTAINER * 2) : paddingsSum = (TABLET_PADDING_CONTAINER * 2);
    var currentWidth = containerElement.offsetWidth - paddingsSum;
    var slidesActiveElements = document.querySelector('.portfolio__slider').querySelectorAll('div.slick-slide');

    for (var i = 0; i < slidesActiveElements.length; i++) {
      slidesActiveElements[i].style.width = currentWidth / SLIDES_TO_SHOW + 'px';
    }
  };

  var addSlidesListeners = function (slides) {
    for (var i = 0; i < slides.length; i++) {
      slides[i].addEventListener('mouseover', onSlideHover);
      slides[i].addEventListener('mouseout', onSlideOut);
    }
  };

  var removeSlidesListeners = function (slides) {
    for (var i = 0; i < slides.length; i++) {
      slides[i].removeEventListener('mouseover', onSlideHover);
      slides[i].removeEventListener('mouseout', onSlideOut);
    }
  };

  var addRemoveSlidesListeners = function (slides) {
    window.innerWidth >= DESKTOP_WIDTH ? addSlidesListeners(slides) : removeSlidesListeners(slides);
  };

  var setWidthSlides = function (slides) {
    window.innerWidth > DESKTOP_WIDTH || window.innerWidth <= TABLET_WIDTH ? paddingsSum = (PADDING_CONTAINER * 2) : paddingsSum = (TABLET_PADDING_CONTAINER * 2);
    var currentWidth = containerElement.offsetWidth - paddingsSum;
    if (window.innerWidth > DESKTOP_WIDTH) {
      for (var i = 0; i < slides.length; i++) {
        slides[i].style.width = currentWidth / SLIDES_TO_SHOW + 'px';
      }
    }
    else {
      for (var i = 0; i < slides.length; i++) {
        slides[i].style.width = 'none';
      }
    }
  };

  window.addEventListener('resize', function() {
    setWidthSlides(slidesElements);
    addRemoveSlidesListeners(slidesElements);
  })

  addRemoveSlidesListeners(slidesElements);
  setWidthSlides(slidesElements);
})();

'use strict';

(function () {
  var menuItemsElements = document.querySelectorAll('.service__menu-item');
  var itemsElements = document.querySelectorAll('.service__item');
  var currentMenuItemElement = document.querySelector('.service__menu-item--active');
  var currentItemElement = document.querySelector('.service__item--active');

  menuItemsElements.forEach(function (element, index) {
    element.addEventListener('click', function () {
      currentMenuItemElement.classList.remove('service__menu-item--active');
      currentItemElement.classList.remove('service__item--active');

      element.classList.toggle('service__menu-item--active');
      itemsElements[index].classList.toggle('service__item--active');

      currentMenuItemElement = element;
      currentItemElement = itemsElements[index];
    })
  });
})();

'use strict';

(function () {
  window.hoverSwipe = function (className, options) {
    var elements = document.querySelectorAll(className);
    var delay = 0;
    var smoothness = 100;
    var paintingSpeed = 20;

    options.smoothness ? smoothness = options.smoothness : smoothness = smoothness;
    options.paintingSpeed ? paintingSpeed = options.paintingSpeed : paintingSpeed = paintingSpeed;

    var getSmoothness = function (option) {
      switch (typeof option) {
        case 'string':
          smoothness = option + 'ms';
          break;
        case 'number':
          smoothness = option.toString() + 'ms';
          break;
        default:
          break;
      }
    };

    var parseElement = function (element) {
      var elementLetters = element.textContent.split('');
      element.textContent = '';
      for (var i = 0; i < elementLetters.length; i++) {
        var tempElement = document.createElement('span');
        tempElement.textContent = elementLetters[i];
        tempElement.style.transition = smoothness;
        element.appendChild(tempElement);
      }
    };

    var parseAllElements = function (elementsArray) {
      getSmoothness(smoothness);
      for (var i = 0; i < elementsArray.length; i++) {
        parseElement(elementsArray[i]);
      }
    };

    var onElementMouseEnter = function (evt) {
      var lettersElements = evt.currentTarget.querySelectorAll('span');
      if (options.direction === 'toLeft') {
        for (var i = lettersElements.length - 1; i >= 0 ; i--) {
          lettersElements[i].style.transitionDelay = delay + 'ms';
          i === 0 ? delay = 0 : delay += paintingSpeed;
        }
      } else {
        for (var i = 0; i < lettersElements.length; i++) {
          lettersElements[i].style.transitionDelay = delay + 'ms';
          i === lettersElements.length - 1 ? delay = 0 : delay += paintingSpeed;
        }
      }
    };

    var onElementMouseLeave = function (evt) {
      var lettersElements = evt.currentTarget.querySelectorAll('span');
      if (options.direction === 'toLeft') {
        for (var i = 0; i < lettersElements.length; i++) {
          lettersElements[i].style.transitionDelay = delay + 'ms';
          i === lettersElements.length - 1 ? delay = 0 : delay += paintingSpeed;
        }
      } else {
        for (var i = lettersElements.length - 1; i >= 0 ; i--) {
          lettersElements[i].style.transitionDelay = delay + 'ms';
          i === 0 ? delay = 0 : delay += paintingSpeed;
        }
      }
    };

    parseAllElements(elements);

    elements.forEach(function (element) {
      element.addEventListener('mouseenter', onElementMouseEnter);
      element.addEventListener('mouseleave', onElementMouseLeave);
    });
  }
})();

var paintSwipe = window.hoverSwipe;

paintSwipe('.header-menu__list a', {
  paintingSpeed: 25,
  smoothness: 300
});

var $page = $('html, body');
$('a[href*="#"]').click(function() {
    $page.animate({
        scrollTop: $($.attr(this, 'href')).offset().top
    }, 400);
    return false;
});

'use strict';

(function () {
  var sectionElement = document.querySelector('.portfolio');
  var buttonAll = sectionElement.querySelector('.portfolio__navigation-button--all');
  var buttonDesign = sectionElement.querySelector('.portfolio__navigation-button--design');
  var buttonWorks = sectionElement.querySelector('.portfolio__navigation-button--works');

  var changeActiveButton = function(clickedButton) {
    var activeButtonElement = sectionElement.querySelector('.portfolio__navigation-button--active');
    activeButtonElement.classList.remove('portfolio__navigation-button--active');
    clickedButton.classList.add('portfolio__navigation-button--active');
  };

  var addButtonListener = function (button, itemClass) {
    button.addEventListener('click', function (evt) {
      evt.preventDefault();
      changeActiveButton(evt.target);
      $('.portfolio__slider').slick('slickUnfilter');
      if (itemClass) {
        $('.portfolio__slider').slick('slickFilter', itemClass);
      }
    });
  };

  addButtonListener(buttonAll);
  addButtonListener(buttonDesign, '.portfolio__item--design');
  addButtonListener(buttonWorks, '.portfolio__item--works');
})();

'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var playButtonElement = document.querySelector('.about-us__button');
  var closeButtonElement = document.querySelector('.ubout-us__video-close');
  var videoBlockElement = document.querySelector('.about-us__video-overlay');

  var closeVideo = function () {
    videoBlockElement.classList.add('about-us__video-overlay--hidden');
    closeButtonElement.removeEventListener('click', onCloseButtonClick);
    window.removeEventListener('keydown', onVideoBlockPressEsc);
  };

  var onCloseButtonClick = function () {
    closeVideo();
  };

  var onVideoBlockPressEsc = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closeVideo();
    }
  };

  playButtonElement.addEventListener('click', function (evt) {
    evt.preventDefault();
    videoBlockElement.classList.remove('about-us__video-overlay--hidden');
    closeButtonElement.addEventListener('click', onCloseButtonClick);
    window.addEventListener('keydown', onVideoBlockPressEsc);
  });
})();
