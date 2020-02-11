'use strict';

window.utils = {
  scrollTop: function scrollTop() {
    // Функция прокручивает страницу в начало
    var top = Math.max(document.body.scrollTop, document.documentElement.scrollTop);

    if (top > 0) {
      window.scrollBy(0, (top + 10) / -20);
      var t = setTimeout('utils.scrollTop()', 10);
    } else clearTimeout(t);

    return false;
  },
  switchBlock: function switchBlock(blocksClass, activateBlockNumber) {
    var blocks = Array.from(document.querySelectorAll(blocksClass));
    var activeBlock = blocks.find(function (block) {
      return block.classList.contains(blocksClass.replace('.', '') + '--active');
    });
    activeBlock.classList.remove(blocksClass.replace('.', '') + '--active');
    blocks[activateBlockNumber - 1].classList.add(blocksClass.replace('.', '') + '--active');
  }
};
'use strict';

var Menu = function Menu(menuButtonOpen, menuButtonClose, menu) {
  var MENU_ACTIVE_CLASS = menu.replace('.', '') + '--active';
  var menuElement = document.querySelector(menu);
  var menuButtonOpenElement = document.querySelector(menuButtonOpen);
  var menuButtonCloseElement = document.querySelector(menuButtonClose);

  var toggleMenu = function toggleMenu() {
    menuElement.classList.toggle(MENU_ACTIVE_CLASS);
  };

  var onMenuButtonClick = function onMenuButtonClick(evt) {
    evt.preventDefault();
    toggleMenu();
  };

  this.toggle = toggleMenu;
  menuButtonOpenElement.addEventListener('click', onMenuButtonClick);
  menuButtonCloseElement.addEventListener('click', onMenuButtonClick);
};

if (document.querySelector('.mobile-menu')) {
  var mobileMenu = new Menu('.page-header__menu-button', '.mobile-menu__close-button', '.mobile-menu');
}
'use strict';

(function () {
  var MENU_ACTIVE_CLASS = 'page-header__search-form-wrapper--active';
  var searchElement = document.querySelector('.page-header__search-form-wrapper');
  var searchButtonOpenElement = document.querySelector('.page-header__search-button');

  var initSearch = function initSearch(searchButtonOpenElement, searchElement) {
    var toggleSearch = function toggleSearch() {
      searchElement.classList.toggle(MENU_ACTIVE_CLASS);
    };

    var onSearchButtonOpenClick = function onSearchButtonOpenClick(evt) {
      evt.preventDefault();
      toggleSearch();
    };

    searchButtonOpenElement.addEventListener('click', onSearchButtonOpenClick);
  };

  if (searchButtonOpenElement) {
    initSearch(searchButtonOpenElement, searchElement);
  }
})();
'use strict';

(function () {
  var initHidingBlock = function initHidingBlock(block, button, limitSymbols) {
    var BUTTON_HIDE_TEXT = 'Hide'; // Текск кнопки, что бы спрятать текст

    var isHiddenText = false; // Флаг спрятан или показан текст

    var blockText; // Полный текст блока

    var button; // Кнопка скрытия/показа текста

    var buttonText; // Первоначальный текст кнопки

    var hideText = function hideText() {
      // Прячет текст
      var limitedText = block.innerHTML.substring(0, limitSymbols) + '...';
      block.innerHTML = limitedText;
      button.textContent = buttonText;
      isHiddenText = true;
    };

    var showAllText = function showAllText() {
      // Показывает текст
      block.innerHTML = blockText;
      button.textContent = BUTTON_HIDE_TEXT;
      isHiddenText = false;
    };

    var initButton = function initButton() {
      // Инициализирует кнопку
      button.addEventListener('click', function (evt) {
        evt.preventDefault();

        if (isHiddenText) {
          showAllText();
        } else {
          hideText();
        }
      });
    };

    var initTextHiding = function initTextHiding() {
      // Инициализирует весь функционал
      buttonText = button.textContent;
      blockText = block.innerHTML;
      initButton();
      hideText();
    };

    initTextHiding();
  }; // ============== Initialization ================
  // About Course


  if (document.querySelector('.about-course__text')) {
    initHidingBlock(document.querySelector('.about-course__text'), document.querySelector('.about-course__button'), 381);
  }
})();
'use strict';

(function () {
  var initTabs = function initTabs(buttonsClass, blocksClass) {
    var DEFAULT_ACTIVE_TAB_NUMBER = 0;
    var buttons = Array.from(document.querySelectorAll('.' + buttonsClass));
    var blocks = Array.from(document.querySelectorAll('.' + blocksClass));
    var activeButtonClass = buttonsClass + '--active';
    var activeBlockClass = blocksClass + '--active';
    var hiddenBlockClass = blocksClass + '--hidden';
    var activeTabNumber;

    var setActiveTabDefault = function setActiveTabDefault(number) {
      buttons[number].classList.add(activeButtonClass);
      blocks[number].classList.add(activeBlockClass);
      blocks.forEach(function (block) {
        if (!block.classList.contains(activeBlockClass)) {
          block.classList.add(hiddenBlockClass);
        }
      });
    };

    var initActiveTabNumber = function initActiveTabNumber() {
      activeTabNumber = buttons.findIndex(function (button) {
        if (button.classList.contains(activeButtonClass)) {
          return button;
        } else {
          return false;
        }
      });
    };

    var disableOldTab = function disableOldTab() {
      try {
        buttons[activeTabNumber].classList.remove(activeButtonClass);
        blocks[activeTabNumber].classList.remove(activeBlockClass);
        blocks[activeTabNumber].classList.add(hiddenBlockClass);
      } catch (err) {}

      ;
    };

    var enableNewTab = function enableNewTab(clickedButton) {
      try {
        clickedButton.classList.add(activeButtonClass);
        initActiveTabNumber();
        blocks[activeTabNumber].classList.remove(hiddenBlockClass);
        blocks[activeTabNumber].classList.add(activeBlockClass);
      } catch (err) {}

      ;
    };

    var onButtonClick = function onButtonClick(evt) {
      evt.preventDefault();
      disableOldTab();
      enableNewTab(evt.currentTarget);
    };

    var initButtons = function initButtons() {
      if (buttons) {
        buttons.forEach(function (button) {
          button.addEventListener('click', onButtonClick);
        });
      }
    };

    setActiveTabDefault(DEFAULT_ACTIVE_TAB_NUMBER);
    initActiveTabNumber();
    initButtons();
  };

  if (document.querySelector('.button--tab')) {
    initTabs('button--tab', 'info__item');
  }

  if (document.querySelector('.faq__navigation-button')) {
    initTabs('faq__navigation-button', 'faq__item');
  }

  if (document.querySelector('.modal__tab-navigation-button')) {
    initTabs('modal__tab-navigation-button', 'modal__tabs-item');
  }
})();
'use strict';

(function () {
  //
  // First top slider on the index-page
  //
  if (document.querySelector('.top__list-wrapper--vendor')) {
    var topSlider = new Swiper('.top__list-wrapper--vendor', {
      slidesPerView: 'auto',
      scrollbar: {
        el: '.top__slider-pagination--vendor'
      },
      navigation: {
        nextEl: '.top__vendor-slider-button--next',
        prevEl: '.top__vendor-slider-button--previous'
      }
    });
  } //
  // Second top slider on the index-page
  //


  if (document.querySelector('.top__list-wrapper--certifications')) {
    var topSlider2 = new Swiper('.top__list-wrapper--certifications', {
      slidesPerView: 'auto',
      scrollbar: {
        el: '.top__slider-pagination--certifications'
      },
      navigation: {
        nextEl: '.top__certifications-slider-button--next',
        prevEl: '.top__certifications-slider-button--previous'
      }
    });
  } //
  // Featured slider on the index-page
  //
  // Function of adaptive initialization of a slider of top products


  var initFeaturedSlider = function initFeaturedSlider(sliderContainerClass, sideOverlayClass) {
    var isFeaturedSliderActivated = false; // Activation slaider flag

    var featuredSlider; // Object of slider

    var leftOverlay = document.querySelector(sliderContainerClass).querySelector(sideOverlayClass + '--left');
    var rightOverlay = document.querySelector(sliderContainerClass).querySelector(sideOverlayClass + '--right');

    var activateSlider = function activateSlider() {
      // Activation slider function
      featuredSlider = new Swiper(sliderContainerClass, {
        slidesPerView: 'auto',
        scrollbar: {
          el: '.top__slider-pagination--featured'
        },
        navigation: {
          nextEl: '.top__featured-slider-button--next',
          prevEl: '.top__featured-slider-button--previous'
        },
        on: {
          reachBeginning: function reachBeginning() {
            if (leftOverlay) {
              leftOverlay.classList.add(sideOverlayClass.replace('.', '') + '--hidden');
            }
          },
          reachEnd: function reachEnd() {
            if (rightOverlay) {
              rightOverlay.classList.add(sideOverlayClass.replace('.', '') + '--hidden');
            }
          },
          fromEdge: function fromEdge() {
            if (rightOverlay && leftOverlay) {
              rightOverlay.classList.remove(sideOverlayClass.replace('.', '') + '--hidden');
              leftOverlay.classList.remove(sideOverlayClass.replace('.', '') + '--hidden');
            }
          }
        }
      });
      isFeaturedSliderActivated = true;
    };

    var deactivateSlider = function deactivateSlider() {
      // Deactivation slider function
      featuredSlider.destroy();
      isFeaturedSliderActivated = false;
    };

    window.addEventListener('resize', function () {
      if (innerWidth > 480 && isFeaturedSliderActivated === false) {
        activateSlider();
      } else if (innerWidth <= 480 && isFeaturedSliderActivated === true) {
        deactivateSlider();
      }
    });

    if (innerWidth >= 480) {
      activateSlider();
    }
  };

  if (document.querySelector('.top__list-wrapper--featured')) {
    initFeaturedSlider('.top__list-wrapper--featured');
  } //
  // Gallery slider on the post-page
  //


  if (document.querySelector('.post__gallery')) {
    var gallerySlider = new Swiper('.post__gallery', {
      pagination: {
        el: '.gallery__pagination',
        type: 'fraction'
      },
      navigation: {
        nextEl: '.gallery__button--next',
        prevEl: '.gallery__button--previous'
      }
    });
  } //
  // Related posts slider on the post-page
  //


  if (document.querySelector('.related__list-wrapper')) {
    var topSlider = new Swiper('.related__list-wrapper', {
      slidesPerView: 'auto',
      scrollbar: {
        el: '.related__slider-pagination'
      },
      navigation: {
        nextEl: '.related__slider-button--next',
        prevEl: '.related__slider-button--previous'
      },
      touchReleaseOnEdges: true
    });
  } //
  // Screenshots slider on the certification-page
  //


  if (document.querySelector('.screenshots__list-wrapper')) {
    var screenshotsSlider = new Swiper('.screenshots__list-wrapper', {
      slidesPerView: 4,
      spaceBetween: 5,
      navigation: {
        nextEl: '.screenshots__button--next',
        prevEl: '.screenshots__button--previous'
      }
    });
  } //
  // Results slider on the certification-page
  //


  var initResultsSlider = function initResultsSlider(sliderContainerClass) {
    var isResultsSliderActivated = false; // Activation slaider flag

    var resultsSlider; // Object of slider

    var activateSlider = function activateSlider() {
      // Activation slider function
      resultsSlider = new Swiper(sliderContainerClass, {
        slidesPerView: 1,
        navigation: {
          nextEl: '.results__slider-button--next',
          prevEl: '.results__slider-button--previous'
        }
      });
      isResultsSliderActivated = true;
    };

    var deactivateSlider = function deactivateSlider() {
      // Deactivation slider function
      resultsSlider.destroy();
      isResultsSliderActivated = false;
    };

    window.addEventListener('resize', function () {
      if (innerWidth <= 768 && isResultsSliderActivated === false) {
        activateSlider();
      } else if (innerWidth > 768 && isResultsSliderActivated === true) {
        deactivateSlider();
      }
    });

    if (innerWidth <= 768) {
      activateSlider();
    }
  };

  if (document.querySelector('.results__list-wrapper')) {
    initResultsSlider('.results__list-wrapper');
  } //
  // Purchase slider on the certification-page
  //


  var initPurchaseSlider = function initPurchaseSlider(sliderContainerClass) {
    var isPurchaseSliderActivated = false; // Activation slaider flag

    var purchaseSlider; // Object of slider

    var activateSlider = function activateSlider() {
      // Activation slider function
      purchaseSlider = new Swiper(sliderContainerClass, {
        slidesPerView: 1,
        navigation: {
          nextEl: '.purchase__slider-button--next',
          prevEl: '.purchase__slider-button--previous'
        }
      });
      isPurchaseSliderActivated = true;
    };

    var deactivateSlider = function deactivateSlider() {
      // Deactivation slider function
      purchaseSlider.destroy();
      isPurchaseSliderActivated = false;
    };

    window.addEventListener('resize', function () {
      if (innerWidth <= 992 && isPurchaseSliderActivated === false) {
        activateSlider();
      } else if (innerWidth > 992 && isPurchaseSliderActivated === true) {
        deactivateSlider();
      }
    });

    if (innerWidth <= 992) {
      activateSlider();
    }
  };

  if (document.querySelector('.purchase__list-wrapper')) {
    initPurchaseSlider('.purchase__list-wrapper');
  } //
  // Tab labels slider on the certification-page
  //


  if (document.querySelector('.info__tab-list-wrapper')) {
    var tabLabelsSlider = new Swiper('.info__tab-list-wrapper', {
      slidesPerView: 'auto',
      scrollbar: {
        el: '.info__slider-pagination',
        hide: true
      },
      touchReleaseOnEdges: true
    });
  } //
  // One product Screenshots slider
  //


  if (document.querySelector('.info__screenshots-wrapper')) {
    var oneProductScreenshotsSlider = new Swiper('.info__screenshots-wrapper', {
      loop: true,
      slidesPerView: 'auto',
      centeredSlides: true,
      pagination: {
        el: '.info__swiper-pagination',
        clickable: true
      },
      navigation: {
        nextEl: '.info__slider-button--next',
        prevEl: '.info__slider-button--previous'
      }
    });
  } //
  // Curriculum slider on the videocourse-page
  //


  if (document.querySelector('.top__list-wrapper--curriculum')) {
    initFeaturedSlider('.top__list-wrapper--curriculum', '.curriculum__overlay');
  } //
  // Videotutorials sliders (multiinitializations)
  //


  if (document.querySelector('.videotutorials__list-wrapper')) {
    var videotutorialsSliders = Array.from(document.querySelectorAll('.videotutorials__list-wrapper'));
    var paginationClass = 'videotutorials__slider-pagination-';
    var buttonNextClass = 'videotutorials__slider-button--next-';
    var buttonPreviousClass = 'videotutorials__slider-button--previous-';
    videotutorialsSliders.forEach(function (slider, index) {
      slider.parentNode.querySelector('.videotutorials__slider-pagination').classList.add(paginationClass + index);
      slider.parentNode.querySelector('.videotutorials__slider-button--next').classList.add(buttonNextClass + index);
      slider.parentNode.querySelector('.videotutorials__slider-button--previous').classList.add(buttonPreviousClass + index);
      var videotutorialSlider = new Swiper(slider, {
        slidesPerView: 'auto',
        scrollbar: {
          el: '.videotutorials__slider-pagination-' + index
        },
        navigation: {
          nextEl: '.videotutorials__slider-button--next-' + index,
          prevEl: '.videotutorials__slider-button--previous-' + index
        }
      });
    });
  }

  ;
})();
'use strict';

(function () {
  // Initializes "show password" buttons
  var initPasswordButtons = function initPasswordButtons(passwordButtonsClass) {
    var buttons = Array.from(document.querySelectorAll('.' + passwordButtonsClass));

    var changeButtonMode = function changeButtonMode(button) {
      button.classList.toggle(passwordButtonsClass + '--active');
    };

    var changeInputType = function changeInputType(input) {
      var inputType = input.type;

      if (inputType === 'password') {
        input.type = 'text';
      } else {
        input.type = 'password';
      }
    };

    var onPasswordButtonClick = function onPasswordButtonClick(evt) {
      evt.preventDefault();
      var input = evt.target.previousElementSibling;
      changeButtonMode(evt.target);
      changeInputType(input);
    };

    buttons.forEach(function (button) {
      button.addEventListener('click', onPasswordButtonClick);
    });
  };

  initPasswordButtons('form__password-eye-button');
})();
'use strict';

(function () {
  var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;

  var stickFooter = function stickFooter() {
    var FOOTER = document.querySelector('.page-footer');
    var MAIN = document.querySelector('.page-main');
    var BODY = document.querySelector('body');
    var footerHeight = FOOTER.offsetHeight;
    BODY.style.position = 'relative';
    MAIN.style.marginBottom = footerHeight + 'px';
    FOOTER.style.position = 'absolute';
    FOOTER.style.bottom = '0';
    FOOTER.style.left = '0';
    FOOTER.style.width = '100%';
  };

  if (isIE11) {
    stickFooter();
    window.addEventListener('resize', stickFooter);
  }
})();
"use strict";

$(function () {
  $('select').selectric({
    maxHeight: 310
  });
});
'use strict';

(function () {
  var formHintClassNmae = '.form__hint';
  var selectWrapperClass = '.form__select-wrapper';

  var createHint = function createHint(message) {
    var hint = document.createElement('p');
    hint.className = formHintClassNmae.replace('.', '');
    hint.textContent = message;
    return hint;
  };

  var showHint = function showHint(fieldWrapper, message) {
    if (!fieldWrapper.querySelector(formHintClassNmae)) {
      var hint = createHint(message);
      fieldWrapper.appendChild(hint);
    }

    ;
  };

  var initSelectWrapper = function initSelectWrapper(field) {
    var container = field.parentNode;

    while (!container.classList.contains(selectWrapperClass.replace('.', ''))) {
      container = container.parentNode;
    }

    return container;
  };

  var onFieldInput = function onFieldInput(evt) {
    var hint = evt.target.parentNode.querySelector(formHintClassNmae);

    if (hint) {
      evt.target.parentNode.removeChild(hint);
    }

    ;
  };

  var onSelectChange = function onSelectChange(evt) {
    var selectWrapper = initSelectWrapper(evt.target);
    var hint = selectWrapper.querySelector(formHintClassNmae);

    if (hint) {
      selectWrapper.removeChild(hint);
    }
  };

  var onSelectricClick = function onSelectricClick(evt) {
    var selectWrapper = initSelectWrapper(evt.currentTarget);
    var hint = selectWrapper.querySelector(formHintClassNmae);

    if (hint) {
      selectWrapper.removeChild(hint);
    }
  };

  var validateEmail = function validateEmail(string) {
    var regular = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regular.test(string);
  };

  var addFieldsListeners = function addFieldsListeners(fields) {
    fields.forEach(function (field) {
      if (field.tagName === 'SELECT') {
        var wrapper = initSelectWrapper(field);
        var selectricOptions = Array.from(wrapper.querySelectorAll('li'));
        field.addEventListener('change', onSelectChange);
        selectricOptions.forEach(function (element) {
          element.addEventListener('click', onSelectricClick);
        });
      } else {
        field.addEventListener('input', onFieldInput);
      }

      ;
    });
  };

  var checkValueFields = function checkValueFields(fields) {
    for (var i = 0; i < fields.length; i++) {
      if (!fields[i].value) {
        return false;
      }

      ;
    }

    ;
    return true;
  };

  var checkFields = function checkFields(fields) {
    var invalidFields = [];
    var isEmailValid = true;
    var password = '';
    var isPasswordsSame = true;
    fields.forEach(function (field) {
      if (field.tagName === 'SELECT' && field.value === '') {
        var selectWrapper = initSelectWrapper(field);
        showHint(selectWrapper, 'Please select one of the options');
        invalidFields.push(field);
      } else if (field.type === 'email' && field.value === '') {
        showHint(field.parentNode, 'Please enter your email');
        isEmailValid = false;
        invalidFields.push(field);
      } else if (field.type === 'email' && !validateEmail(field.value)) {
        showHint(field.parentNode, 'Please enter correct email');
        isEmailValid = false;
        invalidFields.push(field);
      } else if (field.type === 'email' && validateEmail(field.value)) {
        isEmailValid = true;
      } else if (field.type === 'password' && !field.value) {
        showHint(field.parentNode, 'Please enter password');
      } else if (field.type === 'password' && field.value) {
        if (password && password !== field.value) {
          isPasswordsSame = false;
          showHint(field.parentNode, 'Passwords should match');
        } else if (!password) {
          password = field.value;
        }

        ;
      } else if (field.value === '') {
        showHint(field.parentNode, 'Please fill in this field');
        invalidFields.push(field);
      }

      ;
    });

    if (invalidFields[0]) {
      invalidFields[0].focus();
    }

    ;
    return checkValueFields(fields) && isEmailValid && isPasswordsSame ? true : false;
  };

  var validateFields = function validateFields(block) {
    var fields = Array.from(block.querySelectorAll('input[required]')).concat(Array.from(block.querySelectorAll('select[required]'))).concat(Array.from(block.querySelectorAll('textarea[required]')));
    addFieldsListeners(fields);
    return checkFields(fields);
  };

  var initForm = function initForm(form) {
    var submitButton = form.querySelector('button[type="submit"]');
    submitButton.addEventListener('click', function (evt) {
      evt.preventDefault();

      if (validateFields(form)) {
        form.submit();
      }

      ;
    });
  };

  window.form = {
    validate: validateFields,
    checkValueFields: checkValueFields,
    init: initForm
  };
})(); // Animation of recapcha button


(function () {
  var buttonRacapchaClass = '.form__recapcha-refresh';
  var button = document.querySelector(buttonRacapchaClass);

  if (button) {
    button.addEventListener('click', function (evt) {
      evt.preventDefault();
      button.classList.add(buttonRacapchaClass.replace('.', '') + '--active');
      setTimeout(function () {
        button.classList.remove(buttonRacapchaClass.replace('.', '') + '--active');
      }, 500);
    });
  }
})();
"use strict";

var FormParts = function FormParts(options) {
  var parts = Array.from(document.querySelectorAll(options.partsClass));
  var activePart = document.querySelector(options.partsClass + '--active');
  var progressBar = document.querySelector(options.progressBar.containerClass);
  var activePartNumber = parts.indexOf(activePart);

  var updateActivePartNumber = function updateActivePartNumber() {
    activePartNumber = parts.indexOf(activePart);
  };

  var setNextStepBar = function setNextStepBar() {
    if (progressBar.classList.contains(options.progressBar.containerClass.replace('.', '') + '--first-step')) {
      progressBar.classList.remove(options.progressBar.containerClass.replace('.', '') + '--first-step');
      progressBar.classList.add(options.progressBar.containerClass.replace('.', '') + '--second-step');
      return;
    } else if (progressBar.classList.contains(options.progressBar.containerClass.replace('.', '') + '--second-step')) {
      progressBar.classList.remove(options.progressBar.containerClass.replace('.', '') + '--second-step');
      progressBar.classList.add(options.progressBar.containerClass.replace('.', '') + '--last-step');
      return;
    } else {
      return;
    }

    ;
  };

  var setPreviousStepBar = function setPreviousStepBar() {
    if (progressBar.classList.contains(options.progressBar.containerClass.replace('.', '') + '--last-step')) {
      progressBar.classList.remove(options.progressBar.containerClass.replace('.', '') + '--last-step');
      progressBar.classList.add(options.progressBar.containerClass.replace('.', '') + '--second-step');
      return;
    } else if (progressBar.classList.contains(options.progressBar.containerClass.replace('.', '') + '--second-step')) {
      progressBar.classList.remove(options.progressBar.containerClass.replace('.', '') + '--second-step');
      progressBar.classList.add(options.progressBar.containerClass.replace('.', '') + '--first-step');
      return;
    } else {
      return;
    }

    ;
  };

  var setNextPart = function setNextPart() {
    parts[activePartNumber].classList.remove(options.partsClass.replace('.', '') + '--active');
    parts[activePartNumber + 1].classList.add(options.partsClass.replace('.', '') + '--active');
    activePart = parts[activePartNumber + 1];
    updateActivePartNumber();

    if (progressBar) {
      setNextStepBar();
    }

    ;
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  };

  var setPreviousPart = function setPreviousPart() {
    parts[activePartNumber].classList.remove(options.partsClass.replace('.', '') + '--active');
    parts[activePartNumber - 1].classList.add(options.partsClass.replace('.', '') + '--active');
    activePart = parts[activePartNumber - 1];
    updateActivePartNumber();

    if (progressBar) {
      setPreviousStepBar();
    }

    ;
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  };

  var initPreviousButtons = function initPreviousButtons() {
    var buttons = Array.from(document.querySelectorAll(options.previousButtonsClass));
    buttons.forEach(function (button) {
      button.addEventListener('click', setPreviousPart);
    });
  }; // First part


  var initFirstPart = function initFirstPart() {
    var buttonNext = parts[0].querySelector(options.firstPartNextButtonClass);

    var onButtonNextClick = function onButtonNextClick(evt) {
      evt.preventDefault();
      setNextPart();
    };

    buttonNext.addEventListener('click', onButtonNextClick);
  }; // Second Part


  var initSecondPart = function initSecondPart() {
    var buttonNext = parts[1].querySelector(options.otherPartNextButtonClass);

    var onButtonNextClick = function onButtonNextClick(evt) {
      evt.preventDefault();

      if (window.form.validate(parts[1])) {
        setNextPart();
      }

      ;
    };

    var addFieldsListeners = function addFieldsListeners(block) {
      var fields = Array.from(block.querySelectorAll('input[required]')).concat(Array.from(block.querySelectorAll('select[required]')));
      fields.forEach(function (field) {
        if (field.tagName === 'SELECT') {
          field.addEventListener('change', function (evt) {
            if (window.form.checkValueFields(fields)) {
              buttonNext.removeAttribute('disabled');
            }

            ;
          });
        } else {
          field.addEventListener('input', function (evt) {
            if (window.form.checkValueFields(fields)) {
              buttonNext.removeAttribute('disabled');
            }

            ;
          });
        }

        ;
      });
    };

    addFieldsListeners(parts[1]);
    buttonNext.addEventListener('click', onButtonNextClick);
  }; // Last Part


  var initLastPart = function initLastPart() {
    var form = document.querySelector(options.formClass);
    var buttonSubmit = parts[2].querySelector(options.submitButtonClass);

    var onButtonSubmitClick = function onButtonSubmitClick(evt) {
      evt.preventDefault();

      if (window.form.validate(form)) {
        form.submit();
      }

      ;
    };

    buttonSubmit.addEventListener('click', onButtonSubmitClick);
  };

  initPreviousButtons();
  initFirstPart();
  initSecondPart();
  initLastPart();
};

if (document.querySelector('.form__checkout-part')) {
  var checkoutForm = new FormParts({
    formClass: '.data__form',
    partsClass: '.form__checkout-part',
    firstPartNextButtonClass: '.order__next-button',
    previousButtonsClass: '.data__navigation-button--previous',
    otherPartNextButtonClass: '.data__navigation-button--next',
    submitButtonClass: '.data__form-submit-button',
    inputWrapperClass: '.form__field-wrapper',
    selectWrapperClass: '.form__select-wrapper',
    formHintClass: '.form__hint',
    progressBar: {
      containerClass: '.checkout-bar__list',
      pointClass: '.checkout-bar__item'
    }
  });
}

;
'use strict'; // Main function of initialization

var Modal = function Modal(options) {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var MODAL_CALL_BUTTON = document.querySelector('.' + options.callButtonClass);
  var OVERLAY = document.querySelector('.' + options.overlayClass);
  var MODAL = OVERLAY.querySelector('.' + options.modalClass);
  var CLOSE_BUTTON = MODAL.querySelector('.' + options.closeButtonClass);
  var DOCUMENT_BODY = document.querySelector('body');
  var shutDownPopup = new CustomEvent('shutDownPopup'); // Blocks the body

  var blockBody = function blockBody() {
    DOCUMENT_BODY.style.overflow = 'hidden';
  }; // Unblocks the body


  var unblockBody = function unblockBody() {
    DOCUMENT_BODY.style.overflow = '';
  }; // By clicking on the popup closes


  var onCloseButtonClick = function onCloseButtonClick(evt) {
    evt.preventDefault();
    closeModal();
  }; // By press Enter on the cross popup closes


  var onCloseButtonKeydown = function onCloseButtonKeydown(evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      evt.preventDefault();
      closeModal();
    }
  }; // By press Esc popup closes


  var onWindowKeydown = function onWindowKeydown(evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      evt.preventDefault();
      closeModal();
    }
  }; // By clicking on the overlay popup closes


  var onOverlayClick = function onOverlayClick(evt) {
    if (evt.target === OVERLAY) {
      closeModal();
    }
  }; // Show overlay


  var showOverlay = function showOverlay() {
    OVERLAY.style.display = 'flex';
    setTimeout(function () {
      OVERLAY.classList.add(options.overlayClass + '--active');
    }, 10);
  }; // Hide overlay


  var hideOverlay = function hideOverlay() {
    OVERLAY.classList.remove(options.overlayClass + '--active');
    setTimeout(function () {
      OVERLAY.style.display = '';
    }, 300);
  }; // Show modal


  var showModal = function showModal() {
    MODAL.style.display = 'block';
    setTimeout(function () {
      MODAL.classList.add('modal--active');
    }, 10);
  }; // Hide modal


  var hideModal = function hideModal() {
    MODAL.classList.remove('modal--active');
    setTimeout(function () {
      MODAL.style.display = '';
    }, 300);
  }; // Opens the popup and adds eventListeners


  var openModal = function openModal() {
    blockBody();
    showOverlay();
    showModal();
    CLOSE_BUTTON.addEventListener('click', onCloseButtonClick);
    CLOSE_BUTTON.addEventListener('keydown', onCloseButtonKeydown);
    window.addEventListener('keydown', onWindowKeydown);
    OVERLAY.addEventListener('mousedown', onOverlayClick);
  }; // Closes the popup and removes eventListeners


  var closeModal = function closeModal() {
    unblockBody();
    hideModal();
    hideOverlay();
    CLOSE_BUTTON.removeEventListener('click', onCloseButtonClick);
    CLOSE_BUTTON.removeEventListener('keydown', onCloseButtonKeydown);
    window.removeEventListener('keydown', onWindowKeydown);
    OVERLAY.removeEventListener('mousedown', onOverlayClick);
    MODAL.dispatchEvent(shutDownPopup);
  }; // By clicking on the button openes popup


  var onButtonClick = function onButtonClick(evt) {
    evt.preventDefault();
    openModal();
  };

  this.open = openModal;
  this.close = closeModal;
  this.closeButton = CLOSE_BUTTON;
  this.popup = MODAL;

  if (MODAL_CALL_BUTTON) {
    MODAL_CALL_BUTTON.addEventListener('click', onButtonClick);
  }

  ;
};
'use strict';

var SimpleTabs = function SimpleTabs(buttonsClass, blocksClass) {
  var buttons = Array.from(document.querySelectorAll(buttonsClass));
  var blocks = Array.from(document.querySelectorAll(blocksClass));
  var activeButton;
  var activeBlock;
  var isButtonsLinked = false;

  var onButtonClick = function onButtonClick(evt) {
    evt.preventDefault();

    if (activeButton) {
      activeButton.classList.remove(buttonsClass.replace('.', '') + '--active');
    }

    ;
    evt.currentTarget.classList.add(buttonsClass.replace('.', '') + '--active');
    activeButton = evt.currentTarget;
    var buttonNumber = buttons.indexOf(evt.currentTarget);

    if (activeBlock) {
      activeBlock.style.display = '';
    }

    ;

    try {
      blocks[buttonNumber].style.display = 'block';
      activeBlock = blocks[buttonNumber];
    } catch (err) {}

    ;
  };

  var onButtonClickToScroll = function onButtonClickToScroll(evt) {
    evt.preventDefault();
    var page = $('html, body');
    page.animate({
      scrollTop: $('#video').offset().top
    }, 400);
  };

  buttons.forEach(function (button) {
    button.addEventListener('click', onButtonClick);
  });

  if (innerWidth < 480) {
    buttons.forEach(function (button) {
      button.addEventListener('click', onButtonClickToScroll);
    });
    isButtonsLinked = true;
  }

  ;
  window.addEventListener('resize', function () {
    if (innerWidth < 480 && !isButtonsLinked) {
      buttons.forEach(function (button) {
        button.addEventListener('click', onButtonClickToScroll);
      });
      isButtonsLinked = true;
    } else if (innerWidth >= 480 && isButtonsLinked) {
      buttons.forEach(function (button) {
        button.removeEventListener('click', onButtonClickToScroll);
      });
      isButtonsLinked = false;
    }

    ;
  });
}; // VideoTabs on the videocourse page


if (document.querySelector('.top__link--curriculum')) {
  var videoTabs = new SimpleTabs('.top__link--curriculum', '.video__item');
}

;
"use strict";

(function ($, window, document, undefined) {
  var pluginName = 'accordion',
      defaults = {
    transitionSpeed: 300,
    transitionEasing: 'ease',
    controlElement: '[data-control]',
    contentElement: '[data-content]',
    groupElement: '[data-accordion-group]',
    singleOpen: true
  };

  function Accordion(element, options) {
    this.element = element;
    this.options = $.extend({}, defaults, options);
    this._defaults = defaults;
    this._name = pluginName;
    this.init();
  }

  Accordion.prototype.init = function () {
    var self = this,
        opts = self.options;
    var $accordion = $(self.element),
        $controls = $accordion.find('> ' + opts.controlElement),
        $content = $accordion.find('> ' + opts.contentElement);
    var accordionParentsQty = $accordion.parents('[data-accordion]').length,
        accordionHasParent = accordionParentsQty > 0;
    var closedCSS = {
      'max-height': 0,
      'overflow': 'hidden'
    };
    var CSStransitions = supportsTransitions();

    function debounce(func, threshold, execAsap) {
      var timeout;
      return function debounced() {
        var obj = this,
            args = arguments;

        function delayed() {
          if (!execAsap) func.apply(obj, args);
          timeout = null;
        }

        ;
        if (timeout) clearTimeout(timeout);else if (execAsap) func.apply(obj, args);
        timeout = setTimeout(delayed, threshold || 100);
      };
    }

    function supportsTransitions() {
      var b = document.body || document.documentElement,
          s = b.style,
          p = 'transition';

      if (typeof s[p] == 'string') {
        return true;
      }

      var v = ['Moz', 'webkit', 'Webkit', 'Khtml', 'O', 'ms'];
      p = 'Transition';

      for (var i = 0; i < v.length; i++) {
        if (typeof s[v[i] + p] == 'string') {
          return true;
        }
      }

      return false;
    }

    function requestAnimFrame(cb) {
      if (window.requestAnimationFrame) {
        requestAnimationFrame(cb);
      } else if (window.webkitRequestAnimationFrame) {
        webkitRequestAnimationFrame(cb);
      } else if (window.mozRequestAnimationFrame) {
        mozRequestAnimationFrame(cb);
      } else {
        setTimeout(cb, 1000 / 60);
      }
    }

    function toggleTransition($el, remove) {
      if (!remove) {
        $content.css({
          '-webkit-transition': 'max-height ' + opts.transitionSpeed + 'ms ' + opts.transitionEasing,
          'transition': 'max-height ' + opts.transitionSpeed + 'ms ' + opts.transitionEasing
        });
      } else {
        $content.css({
          '-webkit-transition': '',
          'transition': ''
        });
      }
    }

    function calculateHeight($el) {
      var height = 0;
      $el.children().each(function () {
        height = height + $(this).outerHeight(true);
      });
      $el.data('oHeight', height);
    }

    function updateParentHeight($parentAccordion, $currentAccordion, qty, operation) {
      var $content = $parentAccordion.filter('.open').find('> [data-content]'),
          $childs = $content.find('[data-accordion].open > [data-content]'),
          $matched;

      if (!opts.singleOpen) {
        $childs = $childs.not($currentAccordion.siblings('[data-accordion].open').find('> [data-content]'));
      }

      $matched = $content.add($childs);

      if ($parentAccordion.hasClass('open')) {
        $matched.each(function () {
          var currentHeight = $(this).data('oHeight');

          switch (operation) {
            case '+':
              $(this).data('oHeight', currentHeight + qty);
              break;

            case '-':
              $(this).data('oHeight', currentHeight - qty);
              break;

            default:
              throw 'updateParentHeight method needs an operation';
          }

          $(this).css('max-height', $(this).data('oHeight'));
        });
      }
    }

    function refreshHeight($accordion) {
      if ($accordion.hasClass('open')) {
        var $content = $accordion.find('> [data-content]'),
            $childs = $content.find('[data-accordion].open > [data-content]'),
            $matched = $content.add($childs);
        calculateHeight($matched);
        $matched.css('max-height', $matched.data('oHeight'));
      }
    }

    function closePrimaryAccordion($accordion, $content) {
      $accordion.trigger('accordion.close');

      if (CSStransitions) {
        if (accordionHasParent) {
          var $parentAccordions = $accordion.parents('[data-accordion]');
          updateParentHeight($parentAccordions, $accordion, $content.data('oHeight'), '-');
        }

        $content.css(closedCSS);
        $accordion.removeClass('open');
      } else {
        $content.css('max-height', $content.data('oHeight'));
        $content.animate(closedCSS, opts.transitionSpeed);
        $accordion.removeClass('open');
      }
    }

    function openPrimaryAccordion($accordion, $content) {
      $accordion.trigger('accordion.open');

      if (CSStransitions) {
        toggleTransition($content);

        if (accordionHasParent) {
          var $parentAccordions = $accordion.parents('[data-accordion]');
          updateParentHeight($parentAccordions, $accordion, $content.data('oHeight'), '+');
        }

        requestAnimFrame(function () {
          $content.css('max-height', $content.data('oHeight'));
        });
        $accordion.addClass('open');
      } else {
        $content.animate({
          'max-height': $content.data('oHeight')
        }, opts.transitionSpeed, function () {
          $content.css({
            'max-height': 'none'
          });
        });
        $accordion.addClass('open');
      }
    }

    function closeSiblingAccordions($accordion) {
      var $accordionGroup = $accordion.closest(opts.groupElement);
      var $siblings = $accordion.siblings('[data-accordion]').filter('.open'),
          $siblingsChildren = $siblings.find('[data-accordion]').filter('.open');
      var $otherAccordions = $siblings.add($siblingsChildren);
      $otherAccordions.each(function () {
        var $accordion = $(this),
            $content = $accordion.find(opts.contentElement);
        closePrimaryAccordion($accordion, $content);
      });
      $otherAccordions.removeClass('open');
    }

    function toggleAccordion() {
      var isAccordionGroup = opts.singleOpen ? $accordion.parents(opts.groupElement).length > 0 : false;
      calculateHeight($content);

      if (isAccordionGroup) {
        closeSiblingAccordions($accordion);
      }

      if ($accordion.hasClass('open')) {
        closePrimaryAccordion($accordion, $content);
      } else {
        openPrimaryAccordion($accordion, $content);
      }
    }

    function addEventListeners() {
      $controls.on('click', toggleAccordion);
      $controls.on('accordion.toggle', function () {
        if (opts.singleOpen && $controls.length > 1) {
          return false;
        }

        toggleAccordion();
      });
      $controls.on('accordion.refresh', function () {
        refreshHeight($accordion);
      });
      $(window).on('resize', debounce(function () {
        refreshHeight($accordion);
      }));
    }

    function setup() {
      $content.each(function () {
        var $curr = $(this);

        if ($curr.css('max-height') != 0) {
          if (!$curr.closest('[data-accordion]').hasClass('open')) {
            $curr.css({
              'max-height': 0,
              'overflow': 'hidden'
            });
          } else {
            toggleTransition($curr);
            calculateHeight($curr);
            $curr.css('max-height', $curr.data('oHeight'));
          }
        }
      });

      if (!$accordion.attr('data-accordion')) {
        $accordion.attr('data-accordion', '');
        $accordion.find(opts.controlElement).attr('data-control', '');
        $accordion.find(opts.contentElement).attr('data-content', '');
      }
    }

    setup();
    addEventListeners();
  };

  $.fn[pluginName] = function (options) {
    return this.each(function () {
      if (!$.data(this, 'plugin_' + pluginName)) {
        $.data(this, 'plugin_' + pluginName, new Accordion(this, options));
      }
    });
  };
})(jQuery, window, document);

$(document).ready(function () {
  $('.course--accordion [data-accordion]').accordion();
  $('.page-main__right-sidebar [data-accordion]').accordion();
});
'use strict';

var LoadMore = function LoadMore(buttonClass, itemsClass) {
  var showItemsNumber = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 4;
  var button = document.querySelector(buttonClass);
  var items = Array.from(document.querySelectorAll(itemsClass));
  var isInited = false;

  var init = function init() {
    items.forEach(function (item, index) {
      if (index >= showItemsNumber) {
        item.style.display = 'none';
      }

      ;
    });
  };

  var destroy = function destroy() {
    items.forEach(function (item) {
      item.style.display = '';
    });
  };

  var showItems = function showItems(items) {
    items.forEach(function (item) {
      return item.style.display = '';
    });
  };

  var onButtonClick = function onButtonClick(evt) {
    evt.preventDefault();
    var hidedItems = items.filter(function (item) {
      return item.style.display === 'none';
    });
    var nextPartHidedItems = hidedItems.slice(0, showItemsNumber);

    if (hidedItems.length > showItemsNumber) {
      showItems(nextPartHidedItems);
    } else if (hidedItems.length > 0 && hidedItems.length <= showItemsNumber) {
      showItems(nextPartHidedItems);
      button.style.display = 'none';
    }

    ;
  };

  button.addEventListener('click', onButtonClick);

  if (innerWidth <= 480) {
    init();
    isInited = true;
  }

  ;
  window.addEventListener('resize', function () {
    if (innerWidth <= 480 && isInited === false) {
      init();
      isInited = true;
    } else if (innerWidth > 480 && isInited === true) {
      destroy();
      isInited = false;
    }

    ;
  });
};

try {
  var featuredLoadMore = new LoadMore('.top__load-button', '.top__item--featured');
  var curriculumLoadMore = new LoadMore('.top__load-button', '.top__item--curriculum');
} catch (err) {}

;
'use strict';

var FormSections = function FormSections(classes) {
  var loginButtonElement = document.querySelector(classes.loginButton);
  var registrationButtonElement = document.querySelector(classes.registrationButton);
  var sections = Array.from(document.querySelectorAll(classes.section));

  var hideSection = function hideSection(section) {
    section.style.opacity = '0';
    setTimeout(function () {
      section.style.display = 'none';
    }, 300);
  };

  var showSection = function showSection(section) {
    setTimeout(function () {
      section.style.opacity = '0';
      section.style.display = '';
    }, 300);
    setTimeout(function () {
      section.style.opacity = '1';
    }, 320);
  };

  var onButtonClick = function onButtonClick(evt) {
    evt.preventDefault();
    var visibleSection = evt.target.closest('.login__part-js');
    var hiddenSection = sections.find(function (el) {
      return el !== visibleSection;
    });
    hideSection(visibleSection);
    showSection(hiddenSection);
  };

  loginButtonElement.addEventListener('click', onButtonClick);
  registrationButtonElement.addEventListener('click', onButtonClick);
};
"use strict";

/////////////////////////////////////////////////////////////////////////////// Lightbox initialization
if ($('.screenshots__list').length) {
  var lightbox = $('.screenshots__list a').simpleLightbox();
}

if ($('.info__screenshots-list').length) {
  var lightbox2 = $('.info__screenshots-list a').simpleLightbox();
} /////////////////////////////////////////////////////////////////////////////// Object-fit polyfill initialization


objectFitImages(); /////////////////////////////////////////////////////////////////////////////// Initialization form on the License page

if (document.querySelector('.requirements__form')) {
  window.form.init(document.querySelector('.requirements__form'));
}

; /////////////////////////////////////////////////////////////////////////////// Initialization form on the Login page

if (document.querySelector('.login__form')) {
  window.form.init(document.querySelector('.login__form'));
}

; /////////////////////////////////////////////////////////////////////////////// Initialization form on the Registration page

if (document.querySelector('.registration__form')) {
  window.form.init(document.querySelector('.registration__form'));
}

; /////////////////////////////////////////////////////////////////////////////// Initialization form of comments

if (document.querySelector('.comments__form')) {
  window.form.init(document.querySelector('.comments__form'));
}

; /////////////////////////////////////////////////////////////////////////////// Initialization form on the contact-us page

if (document.querySelector('.contact-us__form')) {
  window.form.init(document.querySelector('.contact-us__form'));
}

; /////////////////////////////////////////////////////////////////////////////// Initialization form on the search page

if (document.querySelector('.not-available__form')) {
  window.form.init(document.querySelector('.not-available__form'));
}

; /////////////////////////////////////////////////////////////////////////////// Initialization Phone Codes and Flags

if (document.querySelector('input[type="tel"]')) {
  window.intlTelInput(document.querySelector('input[type="tel"]'), {
    initialCountry: "auto",
    nationalMode: false,
    preferredCountries: [],
    geoIpLookup: function geoIpLookup(success, failure) {
      $.get("https://ipinfo.io", function () {}, "jsonp").always(function (resp) {
        var countryCode = resp && resp.country ? resp.country : "";
        success(countryCode);
      });
    },
    utilsScript: "design/js/plugins/utils.js"
  });
} /////////////////////////////////////////////////////////////////////////////// Initialization Smooth scroll bar


(function () {
  var isSmoothScrollActive = false;
  var Scrollbar = window.Scrollbar;
  Scrollbar.use(window.OverscrollPlugin);
  var bodyScroll;
  var codePhoneScroll;
  var modalTabContainerScroll;
  var tableScrolls = [];
  var selectScrolls = [];

  var activateSmoothScroll = function activateSmoothScroll() {
    bodyScroll = Scrollbar.init(document.querySelector('.scroll'), {
      plugins: {
        overscroll: {
          effect: 'glow',
          glowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    });

    window.onload = function () {
      // Scroll on selectric selects
      if (document.querySelector('.selectric-scroll')) {
        var selects = Array.from(document.querySelectorAll('.selectric-scroll'));
        selects.forEach(function (select, index) {
          var selectScroll = Scrollbar.init(select, {
            plugins: {
              overscroll: {
                effect: 'glow',
                glowColor: 'rgba(91, 124, 196, 0.6)'
              }
            }
          });
          selectScrolls[index] = selectScroll;
        });
      }
    }; // Scroll of tables with limit height


    if (document.querySelector('.video__table-body')) {
      var tables = Array.from(document.querySelectorAll('.video__table-body'));
      tables.forEach(function (table, index) {
        var tableScroll = Scrollbar.init(table, {
          plugins: {
            overscroll: false
          }
        });
        tableScrolls[index] = tableScroll;
      });
    }

    ; // Scroll in the phone field

    if (document.querySelector('.iti__country-list')) {
      codePhoneScroll = Scrollbar.init(document.querySelector('.iti__country-list'), {
        plugins: {
          overscroll: {
            effect: 'glow',
            glowColor: 'rgba(91, 124, 196, 0.6)'
          }
        }
      });
    } // Initialization smooth scroll for anchor links


    var initAnchorLinks = function initAnchorLinks() {
      var links = Array.from(document.querySelectorAll('a[href*="#"]'));

      var onAnchorLinkClick = function onAnchorLinkClick(evt) {
        var linkId = '#' + evt.currentTarget.href.split('#')[1];

        if (linkId !== '#') {
          var blockTarget = document.querySelector(linkId);
        }

        ;

        if (blockTarget) {
          bodyScroll.scrollIntoView(blockTarget);
        }

        ;
      };

      if (links) {
        links.forEach(function (link) {
          link.addEventListener('click', onAnchorLinkClick);
        });
      }

      ;
    }; // Scroll on modal tabs


    if (document.querySelector('.modal__right-content')) {
      modalTabContainerScroll = Scrollbar.init(document.querySelector('.modal__right-content'), {
        plugins: {
          overscroll: {
            effect: 'glow',
            glowColor: 'rgba(91, 124, 196, 0.6)'
          }
        }
      });
      Array.from(document.querySelectorAll('.modal__tab-navigation-button')).forEach(function (button) {
        button.addEventListener('click', function () {
          modalTabContainerScroll.update();
        });
      });
    }

    initAnchorLinks();
    isSmoothScrollActive = true;
  };

  var deactivateSmoothScroll = function deactivateSmoothScroll() {
    selectScrolls.forEach(function (selectScroll) {
      selectScroll.destroy();
    });
    tableScrolls.forEach(function (tableScroll) {
      tableScroll.destroy();
    });
    bodyScroll.destroy();
    codePhoneScroll && codePhoneScroll.destroy();
    modalTabContainerScroll && modalTabContainerScroll.destroy();
    isSmoothScrollActive = false;
  };

  if (innerWidth >= 1024) {
    activateSmoothScroll();
  }

  ;
  window.addEventListener('resize', function () {
    if (innerWidth >= 1024 && !isSmoothScrollActive) {
      activateSmoothScroll();
    } else if (innerWidth < 1024 && isSmoothScrollActive) {
      deactivateSmoothScroll();
    }

    ;
  }); // Initialization smooth scroll for anchor links (starting fron tablet version)

  var page = $('html, body');
  $('a[href*="#"]').click(function (evt) {
    if (evt.currentTarget.href.split('#')[1]) {
      page.animate({
        scrollTop: $($.attr(this, 'href')).offset().top
      }, 400);
      return false;
    }

    ;
  });
})(); /////////////////////////////////////////////////////////////////////////////// Initialization Login/Registration page


if (document.querySelector('.login__button')) {
  var loginRegistartion = new FormSections({
    loginButton: '.login__button',
    registrationButton: '.registration__button',
    section: '.login__part-js'
  });
}

; //////////////////////////////////////////////////////////////////////////////////////////// Modal windows
// Modal Discount 30%

if (document.querySelector('.modal--discount')) {
  var discountModal = new Modal({
    modalClass: 'modal--discount',
    overlayClass: 'overlay',
    closeButtonClass: 'modal__close'
  });
}

; // Modal Purchase Help

if (document.querySelector('.modal--purchase-help')) {
  var purchaseHelpModal = new Modal({
    modalClass: 'modal--purchase-help',
    overlayClass: 'overlay',
    closeButtonClass: 'modal__close',
    callButtonClass: 'order__link'
  });
}

;