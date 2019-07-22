'use strict';

window.utils = {
  scrollTop: function () { // Функция прокручивает страницу в начало
    var top = Math.max(document.body.scrollTop,document.documentElement.scrollTop);
    if(top > 0) {
      window.scrollBy(0,((top+10)/-20));
      var t = setTimeout('utils.scrollTop()',10);
    } else clearTimeout(t);
    return false;
  }
};

'use strict';
var Menu = function (menuButtonOpen, menuButtonClose, menu) {
  var MENU_ACTIVE_CLASS = menu.replace('.', '') + '--active';
  var menuElement = document.querySelector(menu);
  var menuButtonOpenElement = document.querySelector(menuButtonOpen);
  var menuButtonCloseElement = document.querySelector(menuButtonClose);

  var toggleMenu = function () {
    menuElement.classList.toggle(MENU_ACTIVE_CLASS);
  };

  var onMenuButtonClick = function (evt) {
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

  var initSearch = function (searchButtonOpenElement, searchElement) {
    var toggleSearch = function () {
      searchElement.classList.toggle(MENU_ACTIVE_CLASS);
    };

    var onSearchButtonOpenClick = function (evt) {
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
        prevEl: '.top__vendor-slider-button--previous',
      },
    });
  }
  
  //
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
        prevEl: '.top__certifications-slider-button--previous',
      },
    });
  }

  //
  // Featured slider on the index-page
  //
  // Function of adaptive initialization of a slider of top products
  var initFeaturedSlider = function (sliderContainerClass) {
    var isFeaturedSliderActivated = false; // Activation slaider flag
    var featuredSlider; // Object of slider
  
    var activateSlider = function () { // Activation slider function
      featuredSlider = new Swiper(sliderContainerClass, {
        slidesPerView: 'auto',
        scrollbar: {
          el: '.top__slider-pagination--featured',
        },
        navigation: {
          nextEl: '.top__featured-slider-button--next',
          prevEl: '.top__featured-slider-button--previous',
        },
      });
      isFeaturedSliderActivated = true;
    };

    var deactivateSlider = function () { // Deactivation slider function
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
  }
  
  //
  // Gallery slider on the post-page
  //
  if (document.querySelector('.post__gallery')) {
    var gallerySlider = new Swiper('.post__gallery', {
      pagination: {
        el: '.gallery__pagination',
        type: 'fraction',
      },
      navigation: {
        nextEl: '.gallery__button--next',
        prevEl: '.gallery__button--previous',
      },
    });
  }

  //
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
        prevEl: '.related__slider-button--previous',
      },
      touchReleaseOnEdges: true,
    });
  }

  //
  // Screenshots slider on the certification-page
  //
  if (document.querySelector('.screenshots__list-wrapper')) {
    var screenshotsSlider = new Swiper('.screenshots__list-wrapper', {
      slidesPerView: 4,
      spaceBetween: 5,
      navigation: {
        nextEl: '.screenshots__button--next',
        prevEl: '.screenshots__button--previous',
      },
    });
  }

  //
  // Results slider on the certification-page
  //
  var initResultsSlider = function (sliderContainerClass) {
    var isResultsSliderActivated = false; // Activation slaider flag
    var resultsSlider; // Object of slider

    var activateSlider = function () { // Activation slider function
      resultsSlider = new Swiper(sliderContainerClass, {
        slidesPerView: 1,
        navigation: {
          nextEl: '.results__slider-button--next',
          prevEl: '.results__slider-button--previous',
        },
      });
      isResultsSliderActivated = true;
    };

    var deactivateSlider = function () { // Deactivation slider function
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
  }

  //
  // Purchase slider on the certification-page
  //
  var initPurchaseSlider = function (sliderContainerClass) {
    var isPurchaseSliderActivated = false; // Activation slaider flag
    var purchaseSlider; // Object of slider

    var activateSlider = function () { // Activation slider function
      purchaseSlider = new Swiper(sliderContainerClass, {
        slidesPerView: 1,
        navigation: {
          nextEl: '.purchase__slider-button--next',
          prevEl: '.purchase__slider-button--previous',
        },
      });
      isPurchaseSliderActivated = true;
    };

    var deactivateSlider = function () { // Deactivation slider function
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
  }

  //
  // Tab labels slider on the certification-page
  //
  if (document.querySelector('.info__tab-list-wrapper')) {
    var tabLabelsSlider = new Swiper('.info__tab-list-wrapper', {
      slidesPerView: 'auto',
      scrollbar: {
        el: '.info__slider-pagination',
        hide: true,
      },
      touchReleaseOnEdges: true,
    });
  }
})();

'use strict';

(function () {

  var initHidingBlock = function (block, limitSymbols) {
    var MOBILE_WIDTH = 768;
    var BUTTON_HIDE_TEXT = 'Hide'; // Текск кнопки, что бы спрятать текст
    var isHiddenText = true; // Флаг спрятан или показан текст
    var blockText;  // Полный текст блока
    var button; // Кнопка скрытия/показа текста
    var buttonText; // Первоначальный текст кнопки

    var hideText = function () { // Прячет текст
      var limitedText = block.innerHTML.substring(0, limitSymbols) + '... ';
      block.innerHTML = limitedText;
      button.textContent = buttonText;
      block.appendChild(button);
      isHiddenText = true;
    };

    var showAllText = function () { // Показывает текст
      block.innerHTML = blockText + ' ';
      button.textContent = BUTTON_HIDE_TEXT;
      block.appendChild(button);
      isHiddenText = false;
    };

    var initButton = function () { // Инициализирует кнопку
      button.addEventListener('click', function (evt) {
        evt.preventDefault();
        if (isHiddenText) {
          showAllText(block, button);
        } else {
          hideText(block, button);
        }
      });
    };

    var initTextHiding = function () { // Инициализирует весь функционал
      button = block.querySelector('button');
      buttonText = button.textContent;
      button.parentNode.removeChild(button);
      blockText = block.innerHTML;
      initButton();
    };

    initTextHiding();

    window.addEventListener('resize', function () {
      if (innerWidth <= MOBILE_WIDTH) {
        hideText();
      } else {
        showAllText();
      }
    });

    if (innerWidth <= MOBILE_WIDTH) {
      hideText();
    }
  };

  // ============== Initialization ================

  // Megapack
  if (document.querySelector('.mega-pack__text')) {
    initHidingBlock(document.querySelector('.mega-pack__text'), 183);
  }

  // Microsoft
  if (document.querySelector('.product__presentation-descripton-text')) {
    initHidingBlock(document.querySelector('.product__presentation-descripton-text'), 183);
  }

  // Guarantee
  if (document.querySelector('.about-guarantee__text')) {
    initHidingBlock(document.querySelector('.about-guarantee__text'), 525);
  }
})();

'use strict';

(function () {
  var initTabs = function (buttonsClass, blocksClass) {
    var DEFAULT_ACTIVE_TAB_NUMBER = 0;
    var buttons = Array.from(document.querySelectorAll('.' + buttonsClass));
    var blocks = Array.from(document.querySelectorAll('.' + blocksClass));
    var activeButtonClass = buttonsClass + '--active';
    var activeBlockClass = blocksClass + '--active';
    var activeTabNumber;

    var setActiveTabDefault = function (number) {
      buttons[number].classList.add(activeButtonClass);
      blocks[number].classList.add(activeBlockClass);
    };
    
    var initActiveTabNumber = function () {
      activeTabNumber = buttons.findIndex(function (button) {
        if (button.classList.contains(activeButtonClass)) {
          return button;
        } else {
          return false;
        }
      });
    };

    var disableOldTab = function () {
      buttons[activeTabNumber].classList.remove(activeButtonClass);
      blocks[activeTabNumber].classList.remove(activeBlockClass);
    };

    var enableNewTab = function (clickedButton) {
      clickedButton.classList.add(activeButtonClass);
      initActiveTabNumber();
      blocks[activeTabNumber].classList.add(activeBlockClass);
    };

    var onButtonClick = function (evt) {
      evt.preventDefault();
      disableOldTab();
      enableNewTab(evt.currentTarget);
    };

    var initButtons = function () {
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
})();

'use strict';

(function () {
  // Initializes "show password" buttons
  var initPasswordButtons = function (passwordButtonsClass) {
    var buttons = Array.from(document.querySelectorAll('.' + passwordButtonsClass));

    var changeButtonMode = function (button) {
      button.classList.toggle(passwordButtonsClass + '--active');
    };

    var changeInputType = function (input) {
      var inputType = input.type;
      if (inputType === 'password') {
        input.type = 'text';
      } else {
        input.type = 'password';
      }
    };

    var onPasswordButtonClick = function (evt) {
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

// Main function of initialization
let Modal = function (options) {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var MODAL_CALL_BUTTON = document.querySelector('.' + options.callButtonClass);
  var OVERLAY = document.querySelector('.' + options.overlayClass);
  var MODAL = OVERLAY.querySelector('.' + options.modalClass);
  var CLOSE_BUTTON = MODAL.querySelector('.' + options.closeButtonClass);
  var DOCUMENT_BODY = document.querySelector('body');
  var shutDownPopup = new CustomEvent('shutDownPopup');

  // Blocks the body
  var blockBody = function () {
    DOCUMENT_BODY.style.overflow = 'hidden';
  };

  // Unblocks the body
  var unblockBody = function () {
    DOCUMENT_BODY.style.overflow = '';
  };

  // By clicking on the popup closes
  var onCloseButtonClick = function (evt) {
    evt.preventDefault();
    closeModal();
  };

  // By press Enter on the cross popup closes
  var onCloseButtonKeydown = function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      evt.preventDefault();
      closeModal();
    }
  };

  // By press Esc popup closes
  var onWindowKeydown = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      evt.preventDefault();
      closeModal();
    }
  };

  // By clicking on the overlay popup closes
  var onOverlayClick = function (evt) {
    if (evt.target === OVERLAY) {
      closeModal();
    }
  };

  // Show overlay
  var showOverlay = function () {
    OVERLAY.style.display = 'block';
    setTimeout(function () {
      OVERLAY.classList.add(options.overlayClass + '--active');
    }, 10);
  };

  // Hide overlay
  var hideOverlay = function () {
    OVERLAY.classList.remove(options.overlayClass + '--active');
    setTimeout(function () {
      OVERLAY.style.display = '';
    }, 300);
  };

  // Show modal
  var showModal = function () {
    MODAL.classList.add('modal--active');
  };

  // Hide modal
  var hideModal = function () {
    MODAL.classList.remove('modal--active');
  };

  // Opens the popup and adds eventListeners
  var openModal = function () {
    blockBody();
    showOverlay();
    showModal();
    CLOSE_BUTTON.addEventListener('click', onCloseButtonClick);
    CLOSE_BUTTON.addEventListener('keydown', onCloseButtonKeydown);
    window.addEventListener('keydown', onWindowKeydown);
    OVERLAY.addEventListener('click', onOverlayClick);
  };

  // Closes the popup and removes eventListeners
  var closeModal = function () {
    unblockBody();
    hideModal();
    hideOverlay();
    CLOSE_BUTTON.removeEventListener('click', onCloseButtonClick);
    CLOSE_BUTTON.removeEventListener('keydown', onCloseButtonKeydown);
    window.removeEventListener('keydown', onWindowKeydown);
    OVERLAY.removeEventListener('click', onOverlayClick);
    MODAL.dispatchEvent(shutDownPopup);
  };

  // By clicking on the button openes popup
  var onButtonClick = function (evt) {
    evt.preventDefault();
    openModal();
  };

  this.open = openModal;
  this.close = closeModal;
  this.closeButton = CLOSE_BUTTON;
  this.popup = MODAL;

  if (MODAL_CALL_BUTTON) {
    MODAL_CALL_BUTTON.addEventListener('click', onButtonClick);
  };
};

// Modal Discount 30%
if (document.querySelector('.modal--discount')) {
  var discountModal = new Modal({
    modalClass: 'modal--discount',
    overlayClass: 'overlay',
    closeButtonClass: 'modal__close',
    callButtonClass: 'info__demo-button'
  });
};

'use strict';

(function () {
  var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;

  var stickFooter = function () {
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

$(function() {
  $('select').selectric({
    maxHeight: 300
  });
});
let FormParts = function (options) {
  let parts = Array.from(document.querySelectorAll(options.partsClass));
  let activePart = document.querySelector(options.partsClass + '--active')
  let progressBar = document.querySelector(options.progressBar.containerClass);
  let activePartNumber = parts.indexOf(activePart);

  let updateActivePartNumber = function () {
    activePartNumber = parts.indexOf(activePart);
  };

  let setNextStepBar = function () {
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
    };
  };

  let setPreviousStepBar = function () {
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
    };
  };

  let setNextPart = function () {
    parts[activePartNumber].classList.remove(options.partsClass.replace('.', '') + '--active');
    parts[activePartNumber + 1].classList.add(options.partsClass.replace('.', '') + '--active');
    activePart = parts[activePartNumber + 1];
    updateActivePartNumber();
    if (progressBar) {
      setNextStepBar();
    };
  };

  let setPreviousPart = function () {
    parts[activePartNumber].classList.remove(options.partsClass.replace('.', '') + '--active');
    parts[activePartNumber - 1].classList.add(options.partsClass.replace('.', '') + '--active');
    activePart = parts[activePartNumber - 1];
    updateActivePartNumber();
    if (progressBar) {
      setPreviousStepBar();
    };
  };

  let initPreviousButtons = function () {
    let buttons = Array.from(document.querySelectorAll(options.previousButtonsClass));

    buttons.forEach(function (button) {
      button.addEventListener('click', setPreviousPart);
    });
  };

  let createHint = function (message) {
    let hint = document.createElement('p');
    hint.className = options.formHintClass.replace('.', '');
    hint.textContent = message;
    return hint;
  };

  let initSelectWrapper = function (field) {
    let container = field.parentNode;
    while (!container.classList.contains(options.selectWrapperClass.replace('.', ''))) {
      container = container.parentNode;
    }
    return container;
  };

  let validateEmail = function (string) {
    let regular = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regular.test(string);
  };

  let onFieldInput = function (evt) {
    let hint = evt.target.parentNode.querySelector(options.formHintClass);
    if (hint) {
      evt.target.parentNode.removeChild(hint);
    };
  };

  let onSelectChange = function (evt) {
    let selectWrapper = initSelectWrapper(evt.target);
    let hint = selectWrapper.querySelector(options.formHintClass);
    if (hint) {
      selectWrapper.removeChild(hint);
    };
  };

  let showHint = function (fieldWrapper, message) {
    if (!fieldWrapper.querySelector(options.formHintClass)) {
      let hint = createHint(message);
      fieldWrapper.appendChild(hint);
    };
  };

  let checkValueFields = function (fields) {
    for (let i = 0; i < fields.length; i++) {
      if (!fields[i].value) {
        return false;
      };
    };
    return true;
  };

  let checkFields = function (fields) {
    let invalidFields = [];
    let isEmailValid = false;
    
    fields.forEach(function (field) {
      if (field.tagName === 'SELECT' && field.value === '') {
        let selectWrapper = initSelectWrapper(field);
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
      } else if (field.value === '') {
        showHint(field.parentNode, 'Please fill in this field');
        invalidFields.push(field);
      };
    });
    if (invalidFields[0]) {
      invalidFields[0].focus();
    };
    return checkValueFields(fields) && isEmailValid;
  };

  // First part
  let initFirstPart = function () {
    let buttonNext = parts[0].querySelector(options.firstPartNextButtonClass);

    let onButtonNextClick = function (evt) {
      evt.preventDefault();
      setNextPart();
    };

    buttonNext.addEventListener('click', onButtonNextClick);
  };

  // Second Part
  let initSecondPart = function () {
    let buttonNext = parts[1].querySelector(options.otherPartNextButtonClass);
    let fields = Array.from(parts[1].querySelectorAll('input')).concat(Array.from(parts[1].querySelectorAll('select')));

    let onButtonNextClick = function (evt) {
      evt.preventDefault();
      if (checkFields(fields)) {
        setNextPart();
      };
    };

    let addFieldsListeners = function () {
      fields.forEach(function (field) {
        if (field.tagName === 'SELECT') {
          field.addEventListener('change', function (evt) {
            onSelectChange(evt);
            if (checkValueFields(fields)) {
              buttonNext.removeAttribute('disabled');
            };
          });
        } else {
          field.addEventListener('input', function (evt) {
            onFieldInput(evt);
            if (checkValueFields(fields)) {
              buttonNext.removeAttribute('disabled');
            };
          });
        };
      });
    };

    addFieldsListeners();
    buttonNext.addEventListener('click', onButtonNextClick);
  };

  // Last Part
  let initLastPart = function () {
    let form = document.querySelector(options.formClass);
    let buttonSubmit = parts[2].querySelector(options.submitButtonClass);
    let fields = Array.from(form.querySelectorAll('input')).concat(Array.from(form.querySelectorAll('select')));

    let onButtonSubmitClick = function (evt) {
      evt.preventDefault();
      if (checkFields(fields)) {
        form.submit();
      };
    };

    let addFieldsListeners = function () {
      fields.forEach(function (field) {
        if (field.tagName === 'SELECT') {
          field.addEventListener('change', onSelectChange);
        } else {
          field.addEventListener('input', onFieldInput);
        };
      });
    };

    addFieldsListeners();
    buttonSubmit.addEventListener('click', onButtonSubmitClick);
  };

  initPreviousButtons();
  initFirstPart();
  initSecondPart();
  initLastPart();
};

if (document.querySelector('.form__checkout-part')) {
  let checkoutForm = new FormParts({
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
    },
  });
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWxzLmpzIiwibWVudS5qcyIsIm1vYmlsZS1zZWFyY2guanMiLCJzbGlkZXJzLmpzIiwidGV4dC1oaWRpbmcuanMiLCJ0YWJzLmpzIiwiZm9ybS1wYXNzd29yZC5qcyIsIm1vZGFsLmpzIiwiZm9vdGVyLmpzIiwic2VsZWN0LmpzIiwiZm9ybS1jaGVja291dC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM1TkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM5RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM1REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzlIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFsbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcclxuXHJcbndpbmRvdy51dGlscyA9IHtcclxuICBzY3JvbGxUb3A6IGZ1bmN0aW9uICgpIHsgLy8g0KTRg9C90LrRhtC40Y8g0L/RgNC+0LrRgNGD0YfQuNCy0LDQtdGCINGB0YLRgNCw0L3QuNGG0YMg0LIg0L3QsNGH0LDQu9C+XHJcbiAgICB2YXIgdG9wID0gTWF0aC5tYXgoZG9jdW1lbnQuYm9keS5zY3JvbGxUb3AsZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCk7XHJcbiAgICBpZih0b3AgPiAwKSB7XHJcbiAgICAgIHdpbmRvdy5zY3JvbGxCeSgwLCgodG9wKzEwKS8tMjApKTtcclxuICAgICAgdmFyIHQgPSBzZXRUaW1lb3V0KCd1dGlscy5zY3JvbGxUb3AoKScsMTApO1xyXG4gICAgfSBlbHNlIGNsZWFyVGltZW91dCh0KTtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcbn07XHJcbiIsIid1c2Ugc3RyaWN0JztcclxudmFyIE1lbnUgPSBmdW5jdGlvbiAobWVudUJ1dHRvbk9wZW4sIG1lbnVCdXR0b25DbG9zZSwgbWVudSkge1xyXG4gIHZhciBNRU5VX0FDVElWRV9DTEFTUyA9IG1lbnUucmVwbGFjZSgnLicsICcnKSArICctLWFjdGl2ZSc7XHJcbiAgdmFyIG1lbnVFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihtZW51KTtcclxuICB2YXIgbWVudUJ1dHRvbk9wZW5FbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihtZW51QnV0dG9uT3Blbik7XHJcbiAgdmFyIG1lbnVCdXR0b25DbG9zZUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKG1lbnVCdXR0b25DbG9zZSk7XHJcblxyXG4gIHZhciB0b2dnbGVNZW51ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgbWVudUVsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZShNRU5VX0FDVElWRV9DTEFTUyk7XHJcbiAgfTtcclxuXHJcbiAgdmFyIG9uTWVudUJ1dHRvbkNsaWNrID0gZnVuY3Rpb24gKGV2dCkge1xyXG4gICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB0b2dnbGVNZW51KCk7XHJcbiAgfTtcclxuICB0aGlzLnRvZ2dsZSA9IHRvZ2dsZU1lbnU7XHJcblxyXG4gIG1lbnVCdXR0b25PcGVuRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG9uTWVudUJ1dHRvbkNsaWNrKTtcclxuICBtZW51QnV0dG9uQ2xvc2VFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb25NZW51QnV0dG9uQ2xpY2spO1xyXG59O1xyXG5cclxuaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2JpbGUtbWVudScpKSB7XHJcbiAgdmFyIG1vYmlsZU1lbnUgPSBuZXcgTWVudSgnLnBhZ2UtaGVhZGVyX19tZW51LWJ1dHRvbicsICcubW9iaWxlLW1lbnVfX2Nsb3NlLWJ1dHRvbicsICcubW9iaWxlLW1lbnUnKTtcclxufVxyXG4iLCIndXNlIHN0cmljdCc7XHJcblxyXG4oZnVuY3Rpb24gKCkge1xyXG4gIHZhciBNRU5VX0FDVElWRV9DTEFTUyA9ICdwYWdlLWhlYWRlcl9fc2VhcmNoLWZvcm0td3JhcHBlci0tYWN0aXZlJztcclxuICB2YXIgc2VhcmNoRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wYWdlLWhlYWRlcl9fc2VhcmNoLWZvcm0td3JhcHBlcicpO1xyXG4gIHZhciBzZWFyY2hCdXR0b25PcGVuRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wYWdlLWhlYWRlcl9fc2VhcmNoLWJ1dHRvbicpO1xyXG5cclxuICB2YXIgaW5pdFNlYXJjaCA9IGZ1bmN0aW9uIChzZWFyY2hCdXR0b25PcGVuRWxlbWVudCwgc2VhcmNoRWxlbWVudCkge1xyXG4gICAgdmFyIHRvZ2dsZVNlYXJjaCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgc2VhcmNoRWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKE1FTlVfQUNUSVZFX0NMQVNTKTtcclxuICAgIH07XHJcblxyXG4gICAgdmFyIG9uU2VhcmNoQnV0dG9uT3BlbkNsaWNrID0gZnVuY3Rpb24gKGV2dCkge1xyXG4gICAgICBldnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgdG9nZ2xlU2VhcmNoKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHNlYXJjaEJ1dHRvbk9wZW5FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb25TZWFyY2hCdXR0b25PcGVuQ2xpY2spO1xyXG4gIH07XHJcblxyXG4gIGlmIChzZWFyY2hCdXR0b25PcGVuRWxlbWVudCkge1xyXG4gICAgaW5pdFNlYXJjaChzZWFyY2hCdXR0b25PcGVuRWxlbWVudCwgc2VhcmNoRWxlbWVudCk7XHJcbiAgfVxyXG59KSgpO1xyXG4iLCIndXNlIHN0cmljdCc7XHJcblxyXG4oZnVuY3Rpb24gKCkge1xyXG4gIC8vXHJcbiAgLy8gRmlyc3QgdG9wIHNsaWRlciBvbiB0aGUgaW5kZXgtcGFnZVxyXG4gIC8vXHJcbiAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50b3BfX2xpc3Qtd3JhcHBlci0tdmVuZG9yJykpIHtcclxuICAgIHZhciB0b3BTbGlkZXIgPSBuZXcgU3dpcGVyKCcudG9wX19saXN0LXdyYXBwZXItLXZlbmRvcicsIHtcclxuICAgICAgc2xpZGVzUGVyVmlldzogJ2F1dG8nLFxyXG4gICAgICBzY3JvbGxiYXI6IHtcclxuICAgICAgICBlbDogJy50b3BfX3NsaWRlci1wYWdpbmF0aW9uLS12ZW5kb3InXHJcbiAgICAgIH0sXHJcbiAgICAgIG5hdmlnYXRpb246IHtcclxuICAgICAgICBuZXh0RWw6ICcudG9wX192ZW5kb3Itc2xpZGVyLWJ1dHRvbi0tbmV4dCcsXHJcbiAgICAgICAgcHJldkVsOiAnLnRvcF9fdmVuZG9yLXNsaWRlci1idXR0b24tLXByZXZpb3VzJyxcclxuICAgICAgfSxcclxuICAgIH0pO1xyXG4gIH1cclxuICBcclxuICAvL1xyXG4gIC8vIFNlY29uZCB0b3Agc2xpZGVyIG9uIHRoZSBpbmRleC1wYWdlXHJcbiAgLy9cclxuICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvcF9fbGlzdC13cmFwcGVyLS1jZXJ0aWZpY2F0aW9ucycpKSB7XHJcbiAgICB2YXIgdG9wU2xpZGVyMiA9IG5ldyBTd2lwZXIoJy50b3BfX2xpc3Qtd3JhcHBlci0tY2VydGlmaWNhdGlvbnMnLCB7XHJcbiAgICAgIHNsaWRlc1BlclZpZXc6ICdhdXRvJyxcclxuICAgICAgc2Nyb2xsYmFyOiB7XHJcbiAgICAgICAgZWw6ICcudG9wX19zbGlkZXItcGFnaW5hdGlvbi0tY2VydGlmaWNhdGlvbnMnXHJcbiAgICAgIH0sXHJcbiAgICAgIG5hdmlnYXRpb246IHtcclxuICAgICAgICBuZXh0RWw6ICcudG9wX19jZXJ0aWZpY2F0aW9ucy1zbGlkZXItYnV0dG9uLS1uZXh0JyxcclxuICAgICAgICBwcmV2RWw6ICcudG9wX19jZXJ0aWZpY2F0aW9ucy1zbGlkZXItYnV0dG9uLS1wcmV2aW91cycsXHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8vXHJcbiAgLy8gRmVhdHVyZWQgc2xpZGVyIG9uIHRoZSBpbmRleC1wYWdlXHJcbiAgLy9cclxuICAvLyBGdW5jdGlvbiBvZiBhZGFwdGl2ZSBpbml0aWFsaXphdGlvbiBvZiBhIHNsaWRlciBvZiB0b3AgcHJvZHVjdHNcclxuICB2YXIgaW5pdEZlYXR1cmVkU2xpZGVyID0gZnVuY3Rpb24gKHNsaWRlckNvbnRhaW5lckNsYXNzKSB7XHJcbiAgICB2YXIgaXNGZWF0dXJlZFNsaWRlckFjdGl2YXRlZCA9IGZhbHNlOyAvLyBBY3RpdmF0aW9uIHNsYWlkZXIgZmxhZ1xyXG4gICAgdmFyIGZlYXR1cmVkU2xpZGVyOyAvLyBPYmplY3Qgb2Ygc2xpZGVyXHJcbiAgXHJcbiAgICB2YXIgYWN0aXZhdGVTbGlkZXIgPSBmdW5jdGlvbiAoKSB7IC8vIEFjdGl2YXRpb24gc2xpZGVyIGZ1bmN0aW9uXHJcbiAgICAgIGZlYXR1cmVkU2xpZGVyID0gbmV3IFN3aXBlcihzbGlkZXJDb250YWluZXJDbGFzcywge1xyXG4gICAgICAgIHNsaWRlc1BlclZpZXc6ICdhdXRvJyxcclxuICAgICAgICBzY3JvbGxiYXI6IHtcclxuICAgICAgICAgIGVsOiAnLnRvcF9fc2xpZGVyLXBhZ2luYXRpb24tLWZlYXR1cmVkJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIG5hdmlnYXRpb246IHtcclxuICAgICAgICAgIG5leHRFbDogJy50b3BfX2ZlYXR1cmVkLXNsaWRlci1idXR0b24tLW5leHQnLFxyXG4gICAgICAgICAgcHJldkVsOiAnLnRvcF9fZmVhdHVyZWQtc2xpZGVyLWJ1dHRvbi0tcHJldmlvdXMnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0pO1xyXG4gICAgICBpc0ZlYXR1cmVkU2xpZGVyQWN0aXZhdGVkID0gdHJ1ZTtcclxuICAgIH07XHJcblxyXG4gICAgdmFyIGRlYWN0aXZhdGVTbGlkZXIgPSBmdW5jdGlvbiAoKSB7IC8vIERlYWN0aXZhdGlvbiBzbGlkZXIgZnVuY3Rpb25cclxuICAgICAgZmVhdHVyZWRTbGlkZXIuZGVzdHJveSgpO1xyXG4gICAgICBpc0ZlYXR1cmVkU2xpZGVyQWN0aXZhdGVkID0gZmFsc2U7XHJcbiAgICB9O1xyXG5cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGlmIChpbm5lcldpZHRoID4gNDgwICYmIGlzRmVhdHVyZWRTbGlkZXJBY3RpdmF0ZWQgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgYWN0aXZhdGVTbGlkZXIoKTtcclxuICAgICAgfSBlbHNlIGlmIChpbm5lcldpZHRoIDw9IDQ4MCAmJiBpc0ZlYXR1cmVkU2xpZGVyQWN0aXZhdGVkID09PSB0cnVlKSB7XHJcbiAgICAgICAgZGVhY3RpdmF0ZVNsaWRlcigpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAoaW5uZXJXaWR0aCA+PSA0ODApIHtcclxuICAgICAgYWN0aXZhdGVTbGlkZXIoKTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvcF9fbGlzdC13cmFwcGVyLS1mZWF0dXJlZCcpKSB7XHJcbiAgICBpbml0RmVhdHVyZWRTbGlkZXIoJy50b3BfX2xpc3Qtd3JhcHBlci0tZmVhdHVyZWQnKTtcclxuICB9XHJcbiAgXHJcbiAgLy9cclxuICAvLyBHYWxsZXJ5IHNsaWRlciBvbiB0aGUgcG9zdC1wYWdlXHJcbiAgLy9cclxuICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvc3RfX2dhbGxlcnknKSkge1xyXG4gICAgdmFyIGdhbGxlcnlTbGlkZXIgPSBuZXcgU3dpcGVyKCcucG9zdF9fZ2FsbGVyeScsIHtcclxuICAgICAgcGFnaW5hdGlvbjoge1xyXG4gICAgICAgIGVsOiAnLmdhbGxlcnlfX3BhZ2luYXRpb24nLFxyXG4gICAgICAgIHR5cGU6ICdmcmFjdGlvbicsXHJcbiAgICAgIH0sXHJcbiAgICAgIG5hdmlnYXRpb246IHtcclxuICAgICAgICBuZXh0RWw6ICcuZ2FsbGVyeV9fYnV0dG9uLS1uZXh0JyxcclxuICAgICAgICBwcmV2RWw6ICcuZ2FsbGVyeV9fYnV0dG9uLS1wcmV2aW91cycsXHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8vXHJcbiAgLy8gUmVsYXRlZCBwb3N0cyBzbGlkZXIgb24gdGhlIHBvc3QtcGFnZVxyXG4gIC8vXHJcbiAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yZWxhdGVkX19saXN0LXdyYXBwZXInKSkge1xyXG4gICAgdmFyIHRvcFNsaWRlciA9IG5ldyBTd2lwZXIoJy5yZWxhdGVkX19saXN0LXdyYXBwZXInLCB7XHJcbiAgICAgIHNsaWRlc1BlclZpZXc6ICdhdXRvJyxcclxuICAgICAgc2Nyb2xsYmFyOiB7XHJcbiAgICAgICAgZWw6ICcucmVsYXRlZF9fc2xpZGVyLXBhZ2luYXRpb24nXHJcbiAgICAgIH0sXHJcbiAgICAgIG5hdmlnYXRpb246IHtcclxuICAgICAgICBuZXh0RWw6ICcucmVsYXRlZF9fc2xpZGVyLWJ1dHRvbi0tbmV4dCcsXHJcbiAgICAgICAgcHJldkVsOiAnLnJlbGF0ZWRfX3NsaWRlci1idXR0b24tLXByZXZpb3VzJyxcclxuICAgICAgfSxcclxuICAgICAgdG91Y2hSZWxlYXNlT25FZGdlczogdHJ1ZSxcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLy9cclxuICAvLyBTY3JlZW5zaG90cyBzbGlkZXIgb24gdGhlIGNlcnRpZmljYXRpb24tcGFnZVxyXG4gIC8vXHJcbiAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zY3JlZW5zaG90c19fbGlzdC13cmFwcGVyJykpIHtcclxuICAgIHZhciBzY3JlZW5zaG90c1NsaWRlciA9IG5ldyBTd2lwZXIoJy5zY3JlZW5zaG90c19fbGlzdC13cmFwcGVyJywge1xyXG4gICAgICBzbGlkZXNQZXJWaWV3OiA0LFxyXG4gICAgICBzcGFjZUJldHdlZW46IDUsXHJcbiAgICAgIG5hdmlnYXRpb246IHtcclxuICAgICAgICBuZXh0RWw6ICcuc2NyZWVuc2hvdHNfX2J1dHRvbi0tbmV4dCcsXHJcbiAgICAgICAgcHJldkVsOiAnLnNjcmVlbnNob3RzX19idXR0b24tLXByZXZpb3VzJyxcclxuICAgICAgfSxcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLy9cclxuICAvLyBSZXN1bHRzIHNsaWRlciBvbiB0aGUgY2VydGlmaWNhdGlvbi1wYWdlXHJcbiAgLy9cclxuICB2YXIgaW5pdFJlc3VsdHNTbGlkZXIgPSBmdW5jdGlvbiAoc2xpZGVyQ29udGFpbmVyQ2xhc3MpIHtcclxuICAgIHZhciBpc1Jlc3VsdHNTbGlkZXJBY3RpdmF0ZWQgPSBmYWxzZTsgLy8gQWN0aXZhdGlvbiBzbGFpZGVyIGZsYWdcclxuICAgIHZhciByZXN1bHRzU2xpZGVyOyAvLyBPYmplY3Qgb2Ygc2xpZGVyXHJcblxyXG4gICAgdmFyIGFjdGl2YXRlU2xpZGVyID0gZnVuY3Rpb24gKCkgeyAvLyBBY3RpdmF0aW9uIHNsaWRlciBmdW5jdGlvblxyXG4gICAgICByZXN1bHRzU2xpZGVyID0gbmV3IFN3aXBlcihzbGlkZXJDb250YWluZXJDbGFzcywge1xyXG4gICAgICAgIHNsaWRlc1BlclZpZXc6IDEsXHJcbiAgICAgICAgbmF2aWdhdGlvbjoge1xyXG4gICAgICAgICAgbmV4dEVsOiAnLnJlc3VsdHNfX3NsaWRlci1idXR0b24tLW5leHQnLFxyXG4gICAgICAgICAgcHJldkVsOiAnLnJlc3VsdHNfX3NsaWRlci1idXR0b24tLXByZXZpb3VzJyxcclxuICAgICAgICB9LFxyXG4gICAgICB9KTtcclxuICAgICAgaXNSZXN1bHRzU2xpZGVyQWN0aXZhdGVkID0gdHJ1ZTtcclxuICAgIH07XHJcblxyXG4gICAgdmFyIGRlYWN0aXZhdGVTbGlkZXIgPSBmdW5jdGlvbiAoKSB7IC8vIERlYWN0aXZhdGlvbiBzbGlkZXIgZnVuY3Rpb25cclxuICAgICAgcmVzdWx0c1NsaWRlci5kZXN0cm95KCk7XHJcbiAgICAgIGlzUmVzdWx0c1NsaWRlckFjdGl2YXRlZCA9IGZhbHNlO1xyXG4gICAgfTtcclxuXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICBpZiAoaW5uZXJXaWR0aCA8PSA3NjggJiYgaXNSZXN1bHRzU2xpZGVyQWN0aXZhdGVkID09PSBmYWxzZSkge1xyXG4gICAgICAgIGFjdGl2YXRlU2xpZGVyKCk7XHJcbiAgICAgIH0gZWxzZSBpZiAoaW5uZXJXaWR0aCA+IDc2OCAmJiBpc1Jlc3VsdHNTbGlkZXJBY3RpdmF0ZWQgPT09IHRydWUpIHtcclxuICAgICAgICBkZWFjdGl2YXRlU2xpZGVyKCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGlmIChpbm5lcldpZHRoIDw9IDc2OCkge1xyXG4gICAgICBhY3RpdmF0ZVNsaWRlcigpO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmVzdWx0c19fbGlzdC13cmFwcGVyJykpIHtcclxuICAgIGluaXRSZXN1bHRzU2xpZGVyKCcucmVzdWx0c19fbGlzdC13cmFwcGVyJyk7XHJcbiAgfVxyXG5cclxuICAvL1xyXG4gIC8vIFB1cmNoYXNlIHNsaWRlciBvbiB0aGUgY2VydGlmaWNhdGlvbi1wYWdlXHJcbiAgLy9cclxuICB2YXIgaW5pdFB1cmNoYXNlU2xpZGVyID0gZnVuY3Rpb24gKHNsaWRlckNvbnRhaW5lckNsYXNzKSB7XHJcbiAgICB2YXIgaXNQdXJjaGFzZVNsaWRlckFjdGl2YXRlZCA9IGZhbHNlOyAvLyBBY3RpdmF0aW9uIHNsYWlkZXIgZmxhZ1xyXG4gICAgdmFyIHB1cmNoYXNlU2xpZGVyOyAvLyBPYmplY3Qgb2Ygc2xpZGVyXHJcblxyXG4gICAgdmFyIGFjdGl2YXRlU2xpZGVyID0gZnVuY3Rpb24gKCkgeyAvLyBBY3RpdmF0aW9uIHNsaWRlciBmdW5jdGlvblxyXG4gICAgICBwdXJjaGFzZVNsaWRlciA9IG5ldyBTd2lwZXIoc2xpZGVyQ29udGFpbmVyQ2xhc3MsIHtcclxuICAgICAgICBzbGlkZXNQZXJWaWV3OiAxLFxyXG4gICAgICAgIG5hdmlnYXRpb246IHtcclxuICAgICAgICAgIG5leHRFbDogJy5wdXJjaGFzZV9fc2xpZGVyLWJ1dHRvbi0tbmV4dCcsXHJcbiAgICAgICAgICBwcmV2RWw6ICcucHVyY2hhc2VfX3NsaWRlci1idXR0b24tLXByZXZpb3VzJyxcclxuICAgICAgICB9LFxyXG4gICAgICB9KTtcclxuICAgICAgaXNQdXJjaGFzZVNsaWRlckFjdGl2YXRlZCA9IHRydWU7XHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBkZWFjdGl2YXRlU2xpZGVyID0gZnVuY3Rpb24gKCkgeyAvLyBEZWFjdGl2YXRpb24gc2xpZGVyIGZ1bmN0aW9uXHJcbiAgICAgIHB1cmNoYXNlU2xpZGVyLmRlc3Ryb3koKTtcclxuICAgICAgaXNQdXJjaGFzZVNsaWRlckFjdGl2YXRlZCA9IGZhbHNlO1xyXG4gICAgfTtcclxuXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICBpZiAoaW5uZXJXaWR0aCA8PSA5OTIgJiYgaXNQdXJjaGFzZVNsaWRlckFjdGl2YXRlZCA9PT0gZmFsc2UpIHtcclxuICAgICAgICBhY3RpdmF0ZVNsaWRlcigpO1xyXG4gICAgICB9IGVsc2UgaWYgKGlubmVyV2lkdGggPiA5OTIgJiYgaXNQdXJjaGFzZVNsaWRlckFjdGl2YXRlZCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgIGRlYWN0aXZhdGVTbGlkZXIoKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKGlubmVyV2lkdGggPD0gOTkyKSB7XHJcbiAgICAgIGFjdGl2YXRlU2xpZGVyKCk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wdXJjaGFzZV9fbGlzdC13cmFwcGVyJykpIHtcclxuICAgIGluaXRQdXJjaGFzZVNsaWRlcignLnB1cmNoYXNlX19saXN0LXdyYXBwZXInKTtcclxuICB9XHJcblxyXG4gIC8vXHJcbiAgLy8gVGFiIGxhYmVscyBzbGlkZXIgb24gdGhlIGNlcnRpZmljYXRpb24tcGFnZVxyXG4gIC8vXHJcbiAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbmZvX190YWItbGlzdC13cmFwcGVyJykpIHtcclxuICAgIHZhciB0YWJMYWJlbHNTbGlkZXIgPSBuZXcgU3dpcGVyKCcuaW5mb19fdGFiLWxpc3Qtd3JhcHBlcicsIHtcclxuICAgICAgc2xpZGVzUGVyVmlldzogJ2F1dG8nLFxyXG4gICAgICBzY3JvbGxiYXI6IHtcclxuICAgICAgICBlbDogJy5pbmZvX19zbGlkZXItcGFnaW5hdGlvbicsXHJcbiAgICAgICAgaGlkZTogdHJ1ZSxcclxuICAgICAgfSxcclxuICAgICAgdG91Y2hSZWxlYXNlT25FZGdlczogdHJ1ZSxcclxuICAgIH0pO1xyXG4gIH1cclxufSkoKTtcclxuIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgdmFyIGluaXRIaWRpbmdCbG9jayA9IGZ1bmN0aW9uIChibG9jaywgbGltaXRTeW1ib2xzKSB7XHJcbiAgICB2YXIgTU9CSUxFX1dJRFRIID0gNzY4O1xyXG4gICAgdmFyIEJVVFRPTl9ISURFX1RFWFQgPSAnSGlkZSc7IC8vINCi0LXQutGB0Log0LrQvdC+0L/QutC4LCDRh9GC0L4g0LHRiyDRgdC/0YDRj9GC0LDRgtGMINGC0LXQutGB0YJcclxuICAgIHZhciBpc0hpZGRlblRleHQgPSB0cnVlOyAvLyDQpNC70LDQsyDRgdC/0YDRj9GC0LDQvSDQuNC70Lgg0L/QvtC60LDQt9Cw0L0g0YLQtdC60YHRglxyXG4gICAgdmFyIGJsb2NrVGV4dDsgIC8vINCf0L7Qu9C90YvQuSDRgtC10LrRgdGCINCx0LvQvtC60LBcclxuICAgIHZhciBidXR0b247IC8vINCa0L3QvtC/0LrQsCDRgdC60YDRi9GC0LjRjy/Qv9C+0LrQsNC30LAg0YLQtdC60YHRgtCwXHJcbiAgICB2YXIgYnV0dG9uVGV4dDsgLy8g0J/QtdGA0LLQvtC90LDRh9Cw0LvRjNC90YvQuSDRgtC10LrRgdGCINC60L3QvtC/0LrQuFxyXG5cclxuICAgIHZhciBoaWRlVGV4dCA9IGZ1bmN0aW9uICgpIHsgLy8g0J/RgNGP0YfQtdGCINGC0LXQutGB0YJcclxuICAgICAgdmFyIGxpbWl0ZWRUZXh0ID0gYmxvY2suaW5uZXJIVE1MLnN1YnN0cmluZygwLCBsaW1pdFN5bWJvbHMpICsgJy4uLiAnO1xyXG4gICAgICBibG9jay5pbm5lckhUTUwgPSBsaW1pdGVkVGV4dDtcclxuICAgICAgYnV0dG9uLnRleHRDb250ZW50ID0gYnV0dG9uVGV4dDtcclxuICAgICAgYmxvY2suYXBwZW5kQ2hpbGQoYnV0dG9uKTtcclxuICAgICAgaXNIaWRkZW5UZXh0ID0gdHJ1ZTtcclxuICAgIH07XHJcblxyXG4gICAgdmFyIHNob3dBbGxUZXh0ID0gZnVuY3Rpb24gKCkgeyAvLyDQn9C+0LrQsNC30YvQstCw0LXRgiDRgtC10LrRgdGCXHJcbiAgICAgIGJsb2NrLmlubmVySFRNTCA9IGJsb2NrVGV4dCArICcgJztcclxuICAgICAgYnV0dG9uLnRleHRDb250ZW50ID0gQlVUVE9OX0hJREVfVEVYVDtcclxuICAgICAgYmxvY2suYXBwZW5kQ2hpbGQoYnV0dG9uKTtcclxuICAgICAgaXNIaWRkZW5UZXh0ID0gZmFsc2U7XHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBpbml0QnV0dG9uID0gZnVuY3Rpb24gKCkgeyAvLyDQmNC90LjRhtC40LDQu9C40LfQuNGA0YPQtdGCINC60L3QvtC/0LrRg1xyXG4gICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZXZ0KSB7XHJcbiAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgaWYgKGlzSGlkZGVuVGV4dCkge1xyXG4gICAgICAgICAgc2hvd0FsbFRleHQoYmxvY2ssIGJ1dHRvbik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGhpZGVUZXh0KGJsb2NrLCBidXR0b24pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBpbml0VGV4dEhpZGluZyA9IGZ1bmN0aW9uICgpIHsgLy8g0JjQvdC40YbQuNCw0LvQuNC30LjRgNGD0LXRgiDQstC10YHRjCDRhNGD0L3QutGG0LjQvtC90LDQu1xyXG4gICAgICBidXR0b24gPSBibG9jay5xdWVyeVNlbGVjdG9yKCdidXR0b24nKTtcclxuICAgICAgYnV0dG9uVGV4dCA9IGJ1dHRvbi50ZXh0Q29udGVudDtcclxuICAgICAgYnV0dG9uLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoYnV0dG9uKTtcclxuICAgICAgYmxvY2tUZXh0ID0gYmxvY2suaW5uZXJIVE1MO1xyXG4gICAgICBpbml0QnV0dG9uKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIGluaXRUZXh0SGlkaW5nKCk7XHJcblxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgaWYgKGlubmVyV2lkdGggPD0gTU9CSUxFX1dJRFRIKSB7XHJcbiAgICAgICAgaGlkZVRleHQoKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBzaG93QWxsVGV4dCgpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAoaW5uZXJXaWR0aCA8PSBNT0JJTEVfV0lEVEgpIHtcclxuICAgICAgaGlkZVRleHQoKTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICAvLyA9PT09PT09PT09PT09PSBJbml0aWFsaXphdGlvbiA9PT09PT09PT09PT09PT09XHJcblxyXG4gIC8vIE1lZ2FwYWNrXHJcbiAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZWdhLXBhY2tfX3RleHQnKSkge1xyXG4gICAgaW5pdEhpZGluZ0Jsb2NrKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZWdhLXBhY2tfX3RleHQnKSwgMTgzKTtcclxuICB9XHJcblxyXG4gIC8vIE1pY3Jvc29mdFxyXG4gIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvZHVjdF9fcHJlc2VudGF0aW9uLWRlc2NyaXB0b24tdGV4dCcpKSB7XHJcbiAgICBpbml0SGlkaW5nQmxvY2soZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2R1Y3RfX3ByZXNlbnRhdGlvbi1kZXNjcmlwdG9uLXRleHQnKSwgMTgzKTtcclxuICB9XHJcblxyXG4gIC8vIEd1YXJhbnRlZVxyXG4gIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWJvdXQtZ3VhcmFudGVlX190ZXh0JykpIHtcclxuICAgIGluaXRIaWRpbmdCbG9jayhkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWJvdXQtZ3VhcmFudGVlX190ZXh0JyksIDUyNSk7XHJcbiAgfVxyXG59KSgpO1xyXG4iLCIndXNlIHN0cmljdCc7XHJcblxyXG4oZnVuY3Rpb24gKCkge1xyXG4gIHZhciBpbml0VGFicyA9IGZ1bmN0aW9uIChidXR0b25zQ2xhc3MsIGJsb2Nrc0NsYXNzKSB7XHJcbiAgICB2YXIgREVGQVVMVF9BQ1RJVkVfVEFCX05VTUJFUiA9IDA7XHJcbiAgICB2YXIgYnV0dG9ucyA9IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLicgKyBidXR0b25zQ2xhc3MpKTtcclxuICAgIHZhciBibG9ja3MgPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy4nICsgYmxvY2tzQ2xhc3MpKTtcclxuICAgIHZhciBhY3RpdmVCdXR0b25DbGFzcyA9IGJ1dHRvbnNDbGFzcyArICctLWFjdGl2ZSc7XHJcbiAgICB2YXIgYWN0aXZlQmxvY2tDbGFzcyA9IGJsb2Nrc0NsYXNzICsgJy0tYWN0aXZlJztcclxuICAgIHZhciBhY3RpdmVUYWJOdW1iZXI7XHJcblxyXG4gICAgdmFyIHNldEFjdGl2ZVRhYkRlZmF1bHQgPSBmdW5jdGlvbiAobnVtYmVyKSB7XHJcbiAgICAgIGJ1dHRvbnNbbnVtYmVyXS5jbGFzc0xpc3QuYWRkKGFjdGl2ZUJ1dHRvbkNsYXNzKTtcclxuICAgICAgYmxvY2tzW251bWJlcl0uY2xhc3NMaXN0LmFkZChhY3RpdmVCbG9ja0NsYXNzKTtcclxuICAgIH07XHJcbiAgICBcclxuICAgIHZhciBpbml0QWN0aXZlVGFiTnVtYmVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICBhY3RpdmVUYWJOdW1iZXIgPSBidXR0b25zLmZpbmRJbmRleChmdW5jdGlvbiAoYnV0dG9uKSB7XHJcbiAgICAgICAgaWYgKGJ1dHRvbi5jbGFzc0xpc3QuY29udGFpbnMoYWN0aXZlQnV0dG9uQ2xhc3MpKSB7XHJcbiAgICAgICAgICByZXR1cm4gYnV0dG9uO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgdmFyIGRpc2FibGVPbGRUYWIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGJ1dHRvbnNbYWN0aXZlVGFiTnVtYmVyXS5jbGFzc0xpc3QucmVtb3ZlKGFjdGl2ZUJ1dHRvbkNsYXNzKTtcclxuICAgICAgYmxvY2tzW2FjdGl2ZVRhYk51bWJlcl0uY2xhc3NMaXN0LnJlbW92ZShhY3RpdmVCbG9ja0NsYXNzKTtcclxuICAgIH07XHJcblxyXG4gICAgdmFyIGVuYWJsZU5ld1RhYiA9IGZ1bmN0aW9uIChjbGlja2VkQnV0dG9uKSB7XHJcbiAgICAgIGNsaWNrZWRCdXR0b24uY2xhc3NMaXN0LmFkZChhY3RpdmVCdXR0b25DbGFzcyk7XHJcbiAgICAgIGluaXRBY3RpdmVUYWJOdW1iZXIoKTtcclxuICAgICAgYmxvY2tzW2FjdGl2ZVRhYk51bWJlcl0uY2xhc3NMaXN0LmFkZChhY3RpdmVCbG9ja0NsYXNzKTtcclxuICAgIH07XHJcblxyXG4gICAgdmFyIG9uQnV0dG9uQ2xpY2sgPSBmdW5jdGlvbiAoZXZ0KSB7XHJcbiAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICBkaXNhYmxlT2xkVGFiKCk7XHJcbiAgICAgIGVuYWJsZU5ld1RhYihldnQuY3VycmVudFRhcmdldCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBpbml0QnV0dG9ucyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgaWYgKGJ1dHRvbnMpIHtcclxuICAgICAgICBidXR0b25zLmZvckVhY2goZnVuY3Rpb24gKGJ1dHRvbikge1xyXG4gICAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb25CdXR0b25DbGljayk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgc2V0QWN0aXZlVGFiRGVmYXVsdChERUZBVUxUX0FDVElWRV9UQUJfTlVNQkVSKTtcclxuICAgIGluaXRBY3RpdmVUYWJOdW1iZXIoKTtcclxuICAgIGluaXRCdXR0b25zKCk7XHJcbiAgfTtcclxuXHJcbiAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5idXR0b24tLXRhYicpKSB7XHJcbiAgICBpbml0VGFicygnYnV0dG9uLS10YWInLCAnaW5mb19faXRlbScpO1xyXG4gIH1cclxufSkoKTtcclxuIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuKGZ1bmN0aW9uICgpIHtcclxuICAvLyBJbml0aWFsaXplcyBcInNob3cgcGFzc3dvcmRcIiBidXR0b25zXHJcbiAgdmFyIGluaXRQYXNzd29yZEJ1dHRvbnMgPSBmdW5jdGlvbiAocGFzc3dvcmRCdXR0b25zQ2xhc3MpIHtcclxuICAgIHZhciBidXR0b25zID0gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuJyArIHBhc3N3b3JkQnV0dG9uc0NsYXNzKSk7XHJcblxyXG4gICAgdmFyIGNoYW5nZUJ1dHRvbk1vZGUgPSBmdW5jdGlvbiAoYnV0dG9uKSB7XHJcbiAgICAgIGJ1dHRvbi5jbGFzc0xpc3QudG9nZ2xlKHBhc3N3b3JkQnV0dG9uc0NsYXNzICsgJy0tYWN0aXZlJyk7XHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBjaGFuZ2VJbnB1dFR5cGUgPSBmdW5jdGlvbiAoaW5wdXQpIHtcclxuICAgICAgdmFyIGlucHV0VHlwZSA9IGlucHV0LnR5cGU7XHJcbiAgICAgIGlmIChpbnB1dFR5cGUgPT09ICdwYXNzd29yZCcpIHtcclxuICAgICAgICBpbnB1dC50eXBlID0gJ3RleHQnO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlucHV0LnR5cGUgPSAncGFzc3dvcmQnO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBvblBhc3N3b3JkQnV0dG9uQ2xpY2sgPSBmdW5jdGlvbiAoZXZ0KSB7XHJcbiAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICB2YXIgaW5wdXQgPSBldnQudGFyZ2V0LnByZXZpb3VzRWxlbWVudFNpYmxpbmc7XHJcbiAgICAgIGNoYW5nZUJ1dHRvbk1vZGUoZXZ0LnRhcmdldCk7XHJcbiAgICAgIGNoYW5nZUlucHV0VHlwZShpbnB1dCk7XHJcbiAgICB9O1xyXG5cclxuICAgIGJ1dHRvbnMuZm9yRWFjaChmdW5jdGlvbiAoYnV0dG9uKSB7XHJcbiAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG9uUGFzc3dvcmRCdXR0b25DbGljayk7XHJcbiAgICB9KTtcclxuICB9O1xyXG5cclxuICBpbml0UGFzc3dvcmRCdXR0b25zKCdmb3JtX19wYXNzd29yZC1leWUtYnV0dG9uJyk7XHJcbn0pKCk7XHJcbiIsIid1c2Ugc3RyaWN0JztcclxuXHJcbi8vIE1haW4gZnVuY3Rpb24gb2YgaW5pdGlhbGl6YXRpb25cclxubGV0IE1vZGFsID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcclxuICB2YXIgRVNDX0tFWUNPREUgPSAyNztcclxuICB2YXIgRU5URVJfS0VZQ09ERSA9IDEzO1xyXG4gIHZhciBNT0RBTF9DQUxMX0JVVFRPTiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy4nICsgb3B0aW9ucy5jYWxsQnV0dG9uQ2xhc3MpO1xyXG4gIHZhciBPVkVSTEFZID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLicgKyBvcHRpb25zLm92ZXJsYXlDbGFzcyk7XHJcbiAgdmFyIE1PREFMID0gT1ZFUkxBWS5xdWVyeVNlbGVjdG9yKCcuJyArIG9wdGlvbnMubW9kYWxDbGFzcyk7XHJcbiAgdmFyIENMT1NFX0JVVFRPTiA9IE1PREFMLnF1ZXJ5U2VsZWN0b3IoJy4nICsgb3B0aW9ucy5jbG9zZUJ1dHRvbkNsYXNzKTtcclxuICB2YXIgRE9DVU1FTlRfQk9EWSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKTtcclxuICB2YXIgc2h1dERvd25Qb3B1cCA9IG5ldyBDdXN0b21FdmVudCgnc2h1dERvd25Qb3B1cCcpO1xyXG5cclxuICAvLyBCbG9ja3MgdGhlIGJvZHlcclxuICB2YXIgYmxvY2tCb2R5ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgRE9DVU1FTlRfQk9EWS5zdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nO1xyXG4gIH07XHJcblxyXG4gIC8vIFVuYmxvY2tzIHRoZSBib2R5XHJcbiAgdmFyIHVuYmxvY2tCb2R5ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgRE9DVU1FTlRfQk9EWS5zdHlsZS5vdmVyZmxvdyA9ICcnO1xyXG4gIH07XHJcblxyXG4gIC8vIEJ5IGNsaWNraW5nIG9uIHRoZSBwb3B1cCBjbG9zZXNcclxuICB2YXIgb25DbG9zZUJ1dHRvbkNsaWNrID0gZnVuY3Rpb24gKGV2dCkge1xyXG4gICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBjbG9zZU1vZGFsKCk7XHJcbiAgfTtcclxuXHJcbiAgLy8gQnkgcHJlc3MgRW50ZXIgb24gdGhlIGNyb3NzIHBvcHVwIGNsb3Nlc1xyXG4gIHZhciBvbkNsb3NlQnV0dG9uS2V5ZG93biA9IGZ1bmN0aW9uIChldnQpIHtcclxuICAgIGlmIChldnQua2V5Q29kZSA9PT0gRU5URVJfS0VZQ09ERSkge1xyXG4gICAgICBldnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgY2xvc2VNb2RhbCgpO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIC8vIEJ5IHByZXNzIEVzYyBwb3B1cCBjbG9zZXNcclxuICB2YXIgb25XaW5kb3dLZXlkb3duID0gZnVuY3Rpb24gKGV2dCkge1xyXG4gICAgaWYgKGV2dC5rZXlDb2RlID09PSBFU0NfS0VZQ09ERSkge1xyXG4gICAgICBldnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgY2xvc2VNb2RhbCgpO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIC8vIEJ5IGNsaWNraW5nIG9uIHRoZSBvdmVybGF5IHBvcHVwIGNsb3Nlc1xyXG4gIHZhciBvbk92ZXJsYXlDbGljayA9IGZ1bmN0aW9uIChldnQpIHtcclxuICAgIGlmIChldnQudGFyZ2V0ID09PSBPVkVSTEFZKSB7XHJcbiAgICAgIGNsb3NlTW9kYWwoKTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICAvLyBTaG93IG92ZXJsYXlcclxuICB2YXIgc2hvd092ZXJsYXkgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBPVkVSTEFZLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgIE9WRVJMQVkuY2xhc3NMaXN0LmFkZChvcHRpb25zLm92ZXJsYXlDbGFzcyArICctLWFjdGl2ZScpO1xyXG4gICAgfSwgMTApO1xyXG4gIH07XHJcblxyXG4gIC8vIEhpZGUgb3ZlcmxheVxyXG4gIHZhciBoaWRlT3ZlcmxheSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIE9WRVJMQVkuY2xhc3NMaXN0LnJlbW92ZShvcHRpb25zLm92ZXJsYXlDbGFzcyArICctLWFjdGl2ZScpO1xyXG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgIE9WRVJMQVkuc3R5bGUuZGlzcGxheSA9ICcnO1xyXG4gICAgfSwgMzAwKTtcclxuICB9O1xyXG5cclxuICAvLyBTaG93IG1vZGFsXHJcbiAgdmFyIHNob3dNb2RhbCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIE1PREFMLmNsYXNzTGlzdC5hZGQoJ21vZGFsLS1hY3RpdmUnKTtcclxuICB9O1xyXG5cclxuICAvLyBIaWRlIG1vZGFsXHJcbiAgdmFyIGhpZGVNb2RhbCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIE1PREFMLmNsYXNzTGlzdC5yZW1vdmUoJ21vZGFsLS1hY3RpdmUnKTtcclxuICB9O1xyXG5cclxuICAvLyBPcGVucyB0aGUgcG9wdXAgYW5kIGFkZHMgZXZlbnRMaXN0ZW5lcnNcclxuICB2YXIgb3Blbk1vZGFsID0gZnVuY3Rpb24gKCkge1xyXG4gICAgYmxvY2tCb2R5KCk7XHJcbiAgICBzaG93T3ZlcmxheSgpO1xyXG4gICAgc2hvd01vZGFsKCk7XHJcbiAgICBDTE9TRV9CVVRUT04uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvbkNsb3NlQnV0dG9uQ2xpY2spO1xyXG4gICAgQ0xPU0VfQlVUVE9OLmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBvbkNsb3NlQnV0dG9uS2V5ZG93bik7XHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIG9uV2luZG93S2V5ZG93bik7XHJcbiAgICBPVkVSTEFZLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb25PdmVybGF5Q2xpY2spO1xyXG4gIH07XHJcblxyXG4gIC8vIENsb3NlcyB0aGUgcG9wdXAgYW5kIHJlbW92ZXMgZXZlbnRMaXN0ZW5lcnNcclxuICB2YXIgY2xvc2VNb2RhbCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHVuYmxvY2tCb2R5KCk7XHJcbiAgICBoaWRlTW9kYWwoKTtcclxuICAgIGhpZGVPdmVybGF5KCk7XHJcbiAgICBDTE9TRV9CVVRUT04ucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvbkNsb3NlQnV0dG9uQ2xpY2spO1xyXG4gICAgQ0xPU0VfQlVUVE9OLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBvbkNsb3NlQnV0dG9uS2V5ZG93bik7XHJcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIG9uV2luZG93S2V5ZG93bik7XHJcbiAgICBPVkVSTEFZLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb25PdmVybGF5Q2xpY2spO1xyXG4gICAgTU9EQUwuZGlzcGF0Y2hFdmVudChzaHV0RG93blBvcHVwKTtcclxuICB9O1xyXG5cclxuICAvLyBCeSBjbGlja2luZyBvbiB0aGUgYnV0dG9uIG9wZW5lcyBwb3B1cFxyXG4gIHZhciBvbkJ1dHRvbkNsaWNrID0gZnVuY3Rpb24gKGV2dCkge1xyXG4gICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBvcGVuTW9kYWwoKTtcclxuICB9O1xyXG5cclxuICB0aGlzLm9wZW4gPSBvcGVuTW9kYWw7XHJcbiAgdGhpcy5jbG9zZSA9IGNsb3NlTW9kYWw7XHJcbiAgdGhpcy5jbG9zZUJ1dHRvbiA9IENMT1NFX0JVVFRPTjtcclxuICB0aGlzLnBvcHVwID0gTU9EQUw7XHJcblxyXG4gIGlmIChNT0RBTF9DQUxMX0JVVFRPTikge1xyXG4gICAgTU9EQUxfQ0FMTF9CVVRUT04uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvbkJ1dHRvbkNsaWNrKTtcclxuICB9O1xyXG59O1xyXG5cclxuLy8gTW9kYWwgRGlzY291bnQgMzAlXHJcbmlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kYWwtLWRpc2NvdW50JykpIHtcclxuICB2YXIgZGlzY291bnRNb2RhbCA9IG5ldyBNb2RhbCh7XHJcbiAgICBtb2RhbENsYXNzOiAnbW9kYWwtLWRpc2NvdW50JyxcclxuICAgIG92ZXJsYXlDbGFzczogJ292ZXJsYXknLFxyXG4gICAgY2xvc2VCdXR0b25DbGFzczogJ21vZGFsX19jbG9zZScsXHJcbiAgICBjYWxsQnV0dG9uQ2xhc3M6ICdpbmZvX19kZW1vLWJ1dHRvbidcclxuICB9KTtcclxufTtcclxuIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuKGZ1bmN0aW9uICgpIHtcclxuICB2YXIgaXNJRTExID0gISF3aW5kb3cuTVNJbnB1dE1ldGhvZENvbnRleHQgJiYgISFkb2N1bWVudC5kb2N1bWVudE1vZGU7XHJcblxyXG4gIHZhciBzdGlja0Zvb3RlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBGT09URVIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGFnZS1mb290ZXInKTtcclxuICAgIHZhciBNQUlOID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBhZ2UtbWFpbicpO1xyXG4gICAgdmFyIEJPRFkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XHJcbiAgICB2YXIgZm9vdGVySGVpZ2h0ID0gRk9PVEVSLm9mZnNldEhlaWdodDtcclxuXHJcbiAgICBCT0RZLnN0eWxlLnBvc2l0aW9uID0gJ3JlbGF0aXZlJztcclxuICAgIE1BSU4uc3R5bGUubWFyZ2luQm90dG9tID0gZm9vdGVySGVpZ2h0ICsgJ3B4JztcclxuICAgIEZPT1RFUi5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XHJcbiAgICBGT09URVIuc3R5bGUuYm90dG9tID0gJzAnO1xyXG4gICAgRk9PVEVSLnN0eWxlLmxlZnQgPSAnMCc7XHJcbiAgICBGT09URVIuc3R5bGUud2lkdGggPSAnMTAwJSc7XHJcbiAgfTtcclxuXHJcbiAgaWYgKGlzSUUxMSkge1xyXG4gICAgc3RpY2tGb290ZXIoKTtcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBzdGlja0Zvb3Rlcik7XHJcbiAgfVxyXG59KSgpO1xyXG4iLCIkKGZ1bmN0aW9uKCkge1xyXG4gICQoJ3NlbGVjdCcpLnNlbGVjdHJpYyh7XHJcbiAgICBtYXhIZWlnaHQ6IDMwMFxyXG4gIH0pO1xyXG59KTsiLCJsZXQgRm9ybVBhcnRzID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcclxuICBsZXQgcGFydHMgPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwob3B0aW9ucy5wYXJ0c0NsYXNzKSk7XHJcbiAgbGV0IGFjdGl2ZVBhcnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKG9wdGlvbnMucGFydHNDbGFzcyArICctLWFjdGl2ZScpXHJcbiAgbGV0IHByb2dyZXNzQmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihvcHRpb25zLnByb2dyZXNzQmFyLmNvbnRhaW5lckNsYXNzKTtcclxuICBsZXQgYWN0aXZlUGFydE51bWJlciA9IHBhcnRzLmluZGV4T2YoYWN0aXZlUGFydCk7XHJcblxyXG4gIGxldCB1cGRhdGVBY3RpdmVQYXJ0TnVtYmVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgYWN0aXZlUGFydE51bWJlciA9IHBhcnRzLmluZGV4T2YoYWN0aXZlUGFydCk7XHJcbiAgfTtcclxuXHJcbiAgbGV0IHNldE5leHRTdGVwQmFyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKHByb2dyZXNzQmFyLmNsYXNzTGlzdC5jb250YWlucyhvcHRpb25zLnByb2dyZXNzQmFyLmNvbnRhaW5lckNsYXNzLnJlcGxhY2UoJy4nLCAnJykgKyAnLS1maXJzdC1zdGVwJykpIHtcclxuICAgICAgcHJvZ3Jlc3NCYXIuY2xhc3NMaXN0LnJlbW92ZShvcHRpb25zLnByb2dyZXNzQmFyLmNvbnRhaW5lckNsYXNzLnJlcGxhY2UoJy4nLCAnJykgKyAnLS1maXJzdC1zdGVwJyk7XHJcbiAgICAgIHByb2dyZXNzQmFyLmNsYXNzTGlzdC5hZGQob3B0aW9ucy5wcm9ncmVzc0Jhci5jb250YWluZXJDbGFzcy5yZXBsYWNlKCcuJywgJycpICsgJy0tc2Vjb25kLXN0ZXAnKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfSBlbHNlIGlmIChwcm9ncmVzc0Jhci5jbGFzc0xpc3QuY29udGFpbnMob3B0aW9ucy5wcm9ncmVzc0Jhci5jb250YWluZXJDbGFzcy5yZXBsYWNlKCcuJywgJycpICsgJy0tc2Vjb25kLXN0ZXAnKSkge1xyXG4gICAgICBwcm9ncmVzc0Jhci5jbGFzc0xpc3QucmVtb3ZlKG9wdGlvbnMucHJvZ3Jlc3NCYXIuY29udGFpbmVyQ2xhc3MucmVwbGFjZSgnLicsICcnKSArICctLXNlY29uZC1zdGVwJyk7XHJcbiAgICAgIHByb2dyZXNzQmFyLmNsYXNzTGlzdC5hZGQob3B0aW9ucy5wcm9ncmVzc0Jhci5jb250YWluZXJDbGFzcy5yZXBsYWNlKCcuJywgJycpICsgJy0tbGFzdC1zdGVwJyk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH07XHJcbiAgfTtcclxuXHJcbiAgbGV0IHNldFByZXZpb3VzU3RlcEJhciA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGlmIChwcm9ncmVzc0Jhci5jbGFzc0xpc3QuY29udGFpbnMob3B0aW9ucy5wcm9ncmVzc0Jhci5jb250YWluZXJDbGFzcy5yZXBsYWNlKCcuJywgJycpICsgJy0tbGFzdC1zdGVwJykpIHtcclxuICAgICAgcHJvZ3Jlc3NCYXIuY2xhc3NMaXN0LnJlbW92ZShvcHRpb25zLnByb2dyZXNzQmFyLmNvbnRhaW5lckNsYXNzLnJlcGxhY2UoJy4nLCAnJykgKyAnLS1sYXN0LXN0ZXAnKTtcclxuICAgICAgcHJvZ3Jlc3NCYXIuY2xhc3NMaXN0LmFkZChvcHRpb25zLnByb2dyZXNzQmFyLmNvbnRhaW5lckNsYXNzLnJlcGxhY2UoJy4nLCAnJykgKyAnLS1zZWNvbmQtc3RlcCcpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9IGVsc2UgaWYgKHByb2dyZXNzQmFyLmNsYXNzTGlzdC5jb250YWlucyhvcHRpb25zLnByb2dyZXNzQmFyLmNvbnRhaW5lckNsYXNzLnJlcGxhY2UoJy4nLCAnJykgKyAnLS1zZWNvbmQtc3RlcCcpKSB7XHJcbiAgICAgIHByb2dyZXNzQmFyLmNsYXNzTGlzdC5yZW1vdmUob3B0aW9ucy5wcm9ncmVzc0Jhci5jb250YWluZXJDbGFzcy5yZXBsYWNlKCcuJywgJycpICsgJy0tc2Vjb25kLXN0ZXAnKTtcclxuICAgICAgcHJvZ3Jlc3NCYXIuY2xhc3NMaXN0LmFkZChvcHRpb25zLnByb2dyZXNzQmFyLmNvbnRhaW5lckNsYXNzLnJlcGxhY2UoJy4nLCAnJykgKyAnLS1maXJzdC1zdGVwJyk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH07XHJcbiAgfTtcclxuXHJcbiAgbGV0IHNldE5leHRQYXJ0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgcGFydHNbYWN0aXZlUGFydE51bWJlcl0uY2xhc3NMaXN0LnJlbW92ZShvcHRpb25zLnBhcnRzQ2xhc3MucmVwbGFjZSgnLicsICcnKSArICctLWFjdGl2ZScpO1xyXG4gICAgcGFydHNbYWN0aXZlUGFydE51bWJlciArIDFdLmNsYXNzTGlzdC5hZGQob3B0aW9ucy5wYXJ0c0NsYXNzLnJlcGxhY2UoJy4nLCAnJykgKyAnLS1hY3RpdmUnKTtcclxuICAgIGFjdGl2ZVBhcnQgPSBwYXJ0c1thY3RpdmVQYXJ0TnVtYmVyICsgMV07XHJcbiAgICB1cGRhdGVBY3RpdmVQYXJ0TnVtYmVyKCk7XHJcbiAgICBpZiAocHJvZ3Jlc3NCYXIpIHtcclxuICAgICAgc2V0TmV4dFN0ZXBCYXIoKTtcclxuICAgIH07XHJcbiAgfTtcclxuXHJcbiAgbGV0IHNldFByZXZpb3VzUGFydCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHBhcnRzW2FjdGl2ZVBhcnROdW1iZXJdLmNsYXNzTGlzdC5yZW1vdmUob3B0aW9ucy5wYXJ0c0NsYXNzLnJlcGxhY2UoJy4nLCAnJykgKyAnLS1hY3RpdmUnKTtcclxuICAgIHBhcnRzW2FjdGl2ZVBhcnROdW1iZXIgLSAxXS5jbGFzc0xpc3QuYWRkKG9wdGlvbnMucGFydHNDbGFzcy5yZXBsYWNlKCcuJywgJycpICsgJy0tYWN0aXZlJyk7XHJcbiAgICBhY3RpdmVQYXJ0ID0gcGFydHNbYWN0aXZlUGFydE51bWJlciAtIDFdO1xyXG4gICAgdXBkYXRlQWN0aXZlUGFydE51bWJlcigpO1xyXG4gICAgaWYgKHByb2dyZXNzQmFyKSB7XHJcbiAgICAgIHNldFByZXZpb3VzU3RlcEJhcigpO1xyXG4gICAgfTtcclxuICB9O1xyXG5cclxuICBsZXQgaW5pdFByZXZpb3VzQnV0dG9ucyA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGxldCBidXR0b25zID0gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKG9wdGlvbnMucHJldmlvdXNCdXR0b25zQ2xhc3MpKTtcclxuXHJcbiAgICBidXR0b25zLmZvckVhY2goZnVuY3Rpb24gKGJ1dHRvbikge1xyXG4gICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzZXRQcmV2aW91c1BhcnQpO1xyXG4gICAgfSk7XHJcbiAgfTtcclxuXHJcbiAgbGV0IGNyZWF0ZUhpbnQgPSBmdW5jdGlvbiAobWVzc2FnZSkge1xyXG4gICAgbGV0IGhpbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XHJcbiAgICBoaW50LmNsYXNzTmFtZSA9IG9wdGlvbnMuZm9ybUhpbnRDbGFzcy5yZXBsYWNlKCcuJywgJycpO1xyXG4gICAgaGludC50ZXh0Q29udGVudCA9IG1lc3NhZ2U7XHJcbiAgICByZXR1cm4gaGludDtcclxuICB9O1xyXG5cclxuICBsZXQgaW5pdFNlbGVjdFdyYXBwZXIgPSBmdW5jdGlvbiAoZmllbGQpIHtcclxuICAgIGxldCBjb250YWluZXIgPSBmaWVsZC5wYXJlbnROb2RlO1xyXG4gICAgd2hpbGUgKCFjb250YWluZXIuY2xhc3NMaXN0LmNvbnRhaW5zKG9wdGlvbnMuc2VsZWN0V3JhcHBlckNsYXNzLnJlcGxhY2UoJy4nLCAnJykpKSB7XHJcbiAgICAgIGNvbnRhaW5lciA9IGNvbnRhaW5lci5wYXJlbnROb2RlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGNvbnRhaW5lcjtcclxuICB9O1xyXG5cclxuICBsZXQgdmFsaWRhdGVFbWFpbCA9IGZ1bmN0aW9uIChzdHJpbmcpIHtcclxuICAgIGxldCByZWd1bGFyID0gL14oKFtePD4oKVtcXF1cXFxcLiw7Olxcc0BcXFwiXSsoXFwuW148PigpW1xcXVxcXFwuLDs6XFxzQFxcXCJdKykqKXwoXFxcIi4rXFxcIikpQCgoXFxbWzAtOV17MSwzfVxcLlswLTldezEsM31cXC5bMC05XXsxLDN9XFwuWzAtOV17MSwzfVxcXSl8KChbYS16QS1aXFwtMC05XStcXC4pK1thLXpBLVpdezIsfSkpJC87XHJcbiAgICByZXR1cm4gcmVndWxhci50ZXN0KHN0cmluZyk7XHJcbiAgfTtcclxuXHJcbiAgbGV0IG9uRmllbGRJbnB1dCA9IGZ1bmN0aW9uIChldnQpIHtcclxuICAgIGxldCBoaW50ID0gZXZ0LnRhcmdldC5wYXJlbnROb2RlLnF1ZXJ5U2VsZWN0b3Iob3B0aW9ucy5mb3JtSGludENsYXNzKTtcclxuICAgIGlmIChoaW50KSB7XHJcbiAgICAgIGV2dC50YXJnZXQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChoaW50KTtcclxuICAgIH07XHJcbiAgfTtcclxuXHJcbiAgbGV0IG9uU2VsZWN0Q2hhbmdlID0gZnVuY3Rpb24gKGV2dCkge1xyXG4gICAgbGV0IHNlbGVjdFdyYXBwZXIgPSBpbml0U2VsZWN0V3JhcHBlcihldnQudGFyZ2V0KTtcclxuICAgIGxldCBoaW50ID0gc2VsZWN0V3JhcHBlci5xdWVyeVNlbGVjdG9yKG9wdGlvbnMuZm9ybUhpbnRDbGFzcyk7XHJcbiAgICBpZiAoaGludCkge1xyXG4gICAgICBzZWxlY3RXcmFwcGVyLnJlbW92ZUNoaWxkKGhpbnQpO1xyXG4gICAgfTtcclxuICB9O1xyXG5cclxuICBsZXQgc2hvd0hpbnQgPSBmdW5jdGlvbiAoZmllbGRXcmFwcGVyLCBtZXNzYWdlKSB7XHJcbiAgICBpZiAoIWZpZWxkV3JhcHBlci5xdWVyeVNlbGVjdG9yKG9wdGlvbnMuZm9ybUhpbnRDbGFzcykpIHtcclxuICAgICAgbGV0IGhpbnQgPSBjcmVhdGVIaW50KG1lc3NhZ2UpO1xyXG4gICAgICBmaWVsZFdyYXBwZXIuYXBwZW5kQ2hpbGQoaGludCk7XHJcbiAgICB9O1xyXG4gIH07XHJcblxyXG4gIGxldCBjaGVja1ZhbHVlRmllbGRzID0gZnVuY3Rpb24gKGZpZWxkcykge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmaWVsZHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgaWYgKCFmaWVsZHNbaV0udmFsdWUpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH07XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfTtcclxuXHJcbiAgbGV0IGNoZWNrRmllbGRzID0gZnVuY3Rpb24gKGZpZWxkcykge1xyXG4gICAgbGV0IGludmFsaWRGaWVsZHMgPSBbXTtcclxuICAgIGxldCBpc0VtYWlsVmFsaWQgPSBmYWxzZTtcclxuICAgIFxyXG4gICAgZmllbGRzLmZvckVhY2goZnVuY3Rpb24gKGZpZWxkKSB7XHJcbiAgICAgIGlmIChmaWVsZC50YWdOYW1lID09PSAnU0VMRUNUJyAmJiBmaWVsZC52YWx1ZSA9PT0gJycpIHtcclxuICAgICAgICBsZXQgc2VsZWN0V3JhcHBlciA9IGluaXRTZWxlY3RXcmFwcGVyKGZpZWxkKTtcclxuICAgICAgICBzaG93SGludChzZWxlY3RXcmFwcGVyLCAnUGxlYXNlIHNlbGVjdCBvbmUgb2YgdGhlIG9wdGlvbnMnKTtcclxuICAgICAgICBpbnZhbGlkRmllbGRzLnB1c2goZmllbGQpO1xyXG4gICAgICB9IGVsc2UgaWYgKGZpZWxkLnR5cGUgPT09ICdlbWFpbCcgJiYgZmllbGQudmFsdWUgPT09ICcnKSB7XHJcbiAgICAgICAgc2hvd0hpbnQoZmllbGQucGFyZW50Tm9kZSwgJ1BsZWFzZSBlbnRlciB5b3VyIGVtYWlsJyk7XHJcbiAgICAgICAgaXNFbWFpbFZhbGlkID0gZmFsc2U7XHJcbiAgICAgICAgaW52YWxpZEZpZWxkcy5wdXNoKGZpZWxkKTtcclxuICAgICAgfSBlbHNlIGlmIChmaWVsZC50eXBlID09PSAnZW1haWwnICYmICF2YWxpZGF0ZUVtYWlsKGZpZWxkLnZhbHVlKSkge1xyXG4gICAgICAgIHNob3dIaW50KGZpZWxkLnBhcmVudE5vZGUsICdQbGVhc2UgZW50ZXIgY29ycmVjdCBlbWFpbCcpO1xyXG4gICAgICAgIGlzRW1haWxWYWxpZCA9IGZhbHNlO1xyXG4gICAgICAgIGludmFsaWRGaWVsZHMucHVzaChmaWVsZCk7XHJcbiAgICAgIH0gZWxzZSBpZiAoZmllbGQudHlwZSA9PT0gJ2VtYWlsJyAmJiB2YWxpZGF0ZUVtYWlsKGZpZWxkLnZhbHVlKSkge1xyXG4gICAgICAgIGlzRW1haWxWYWxpZCA9IHRydWU7XHJcbiAgICAgIH0gZWxzZSBpZiAoZmllbGQudmFsdWUgPT09ICcnKSB7XHJcbiAgICAgICAgc2hvd0hpbnQoZmllbGQucGFyZW50Tm9kZSwgJ1BsZWFzZSBmaWxsIGluIHRoaXMgZmllbGQnKTtcclxuICAgICAgICBpbnZhbGlkRmllbGRzLnB1c2goZmllbGQpO1xyXG4gICAgICB9O1xyXG4gICAgfSk7XHJcbiAgICBpZiAoaW52YWxpZEZpZWxkc1swXSkge1xyXG4gICAgICBpbnZhbGlkRmllbGRzWzBdLmZvY3VzKCk7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIGNoZWNrVmFsdWVGaWVsZHMoZmllbGRzKSAmJiBpc0VtYWlsVmFsaWQ7XHJcbiAgfTtcclxuXHJcbiAgLy8gRmlyc3QgcGFydFxyXG4gIGxldCBpbml0Rmlyc3RQYXJ0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgbGV0IGJ1dHRvbk5leHQgPSBwYXJ0c1swXS5xdWVyeVNlbGVjdG9yKG9wdGlvbnMuZmlyc3RQYXJ0TmV4dEJ1dHRvbkNsYXNzKTtcclxuXHJcbiAgICBsZXQgb25CdXR0b25OZXh0Q2xpY2sgPSBmdW5jdGlvbiAoZXZ0KSB7XHJcbiAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICBzZXROZXh0UGFydCgpO1xyXG4gICAgfTtcclxuXHJcbiAgICBidXR0b25OZXh0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb25CdXR0b25OZXh0Q2xpY2spO1xyXG4gIH07XHJcblxyXG4gIC8vIFNlY29uZCBQYXJ0XHJcbiAgbGV0IGluaXRTZWNvbmRQYXJ0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgbGV0IGJ1dHRvbk5leHQgPSBwYXJ0c1sxXS5xdWVyeVNlbGVjdG9yKG9wdGlvbnMub3RoZXJQYXJ0TmV4dEJ1dHRvbkNsYXNzKTtcclxuICAgIGxldCBmaWVsZHMgPSBBcnJheS5mcm9tKHBhcnRzWzFdLnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0JykpLmNvbmNhdChBcnJheS5mcm9tKHBhcnRzWzFdLnF1ZXJ5U2VsZWN0b3JBbGwoJ3NlbGVjdCcpKSk7XHJcblxyXG4gICAgbGV0IG9uQnV0dG9uTmV4dENsaWNrID0gZnVuY3Rpb24gKGV2dCkge1xyXG4gICAgICBldnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgaWYgKGNoZWNrRmllbGRzKGZpZWxkcykpIHtcclxuICAgICAgICBzZXROZXh0UGFydCgpO1xyXG4gICAgICB9O1xyXG4gICAgfTtcclxuXHJcbiAgICBsZXQgYWRkRmllbGRzTGlzdGVuZXJzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICBmaWVsZHMuZm9yRWFjaChmdW5jdGlvbiAoZmllbGQpIHtcclxuICAgICAgICBpZiAoZmllbGQudGFnTmFtZSA9PT0gJ1NFTEVDVCcpIHtcclxuICAgICAgICAgIGZpZWxkLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGZ1bmN0aW9uIChldnQpIHtcclxuICAgICAgICAgICAgb25TZWxlY3RDaGFuZ2UoZXZ0KTtcclxuICAgICAgICAgICAgaWYgKGNoZWNrVmFsdWVGaWVsZHMoZmllbGRzKSkge1xyXG4gICAgICAgICAgICAgIGJ1dHRvbk5leHQucmVtb3ZlQXR0cmlidXRlKCdkaXNhYmxlZCcpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGZpZWxkLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgZnVuY3Rpb24gKGV2dCkge1xyXG4gICAgICAgICAgICBvbkZpZWxkSW5wdXQoZXZ0KTtcclxuICAgICAgICAgICAgaWYgKGNoZWNrVmFsdWVGaWVsZHMoZmllbGRzKSkge1xyXG4gICAgICAgICAgICAgIGJ1dHRvbk5leHQucmVtb3ZlQXR0cmlidXRlKCdkaXNhYmxlZCcpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGFkZEZpZWxkc0xpc3RlbmVycygpO1xyXG4gICAgYnV0dG9uTmV4dC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG9uQnV0dG9uTmV4dENsaWNrKTtcclxuICB9O1xyXG5cclxuICAvLyBMYXN0IFBhcnRcclxuICBsZXQgaW5pdExhc3RQYXJ0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgbGV0IGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKG9wdGlvbnMuZm9ybUNsYXNzKTtcclxuICAgIGxldCBidXR0b25TdWJtaXQgPSBwYXJ0c1syXS5xdWVyeVNlbGVjdG9yKG9wdGlvbnMuc3VibWl0QnV0dG9uQ2xhc3MpO1xyXG4gICAgbGV0IGZpZWxkcyA9IEFycmF5LmZyb20oZm9ybS5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dCcpKS5jb25jYXQoQXJyYXkuZnJvbShmb3JtLnF1ZXJ5U2VsZWN0b3JBbGwoJ3NlbGVjdCcpKSk7XHJcblxyXG4gICAgbGV0IG9uQnV0dG9uU3VibWl0Q2xpY2sgPSBmdW5jdGlvbiAoZXZ0KSB7XHJcbiAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICBpZiAoY2hlY2tGaWVsZHMoZmllbGRzKSkge1xyXG4gICAgICAgIGZvcm0uc3VibWl0KCk7XHJcbiAgICAgIH07XHJcbiAgICB9O1xyXG5cclxuICAgIGxldCBhZGRGaWVsZHNMaXN0ZW5lcnMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGZpZWxkcy5mb3JFYWNoKGZ1bmN0aW9uIChmaWVsZCkge1xyXG4gICAgICAgIGlmIChmaWVsZC50YWdOYW1lID09PSAnU0VMRUNUJykge1xyXG4gICAgICAgICAgZmllbGQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgb25TZWxlY3RDaGFuZ2UpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBmaWVsZC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIG9uRmllbGRJbnB1dCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGFkZEZpZWxkc0xpc3RlbmVycygpO1xyXG4gICAgYnV0dG9uU3VibWl0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb25CdXR0b25TdWJtaXRDbGljayk7XHJcbiAgfTtcclxuXHJcbiAgaW5pdFByZXZpb3VzQnV0dG9ucygpO1xyXG4gIGluaXRGaXJzdFBhcnQoKTtcclxuICBpbml0U2Vjb25kUGFydCgpO1xyXG4gIGluaXRMYXN0UGFydCgpO1xyXG59O1xyXG5cclxuaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb3JtX19jaGVja291dC1wYXJ0JykpIHtcclxuICBsZXQgY2hlY2tvdXRGb3JtID0gbmV3IEZvcm1QYXJ0cyh7XHJcbiAgICBmb3JtQ2xhc3M6ICcuZGF0YV9fZm9ybScsXHJcbiAgICBwYXJ0c0NsYXNzOiAnLmZvcm1fX2NoZWNrb3V0LXBhcnQnLFxyXG4gICAgZmlyc3RQYXJ0TmV4dEJ1dHRvbkNsYXNzOiAnLm9yZGVyX19uZXh0LWJ1dHRvbicsXHJcbiAgICBwcmV2aW91c0J1dHRvbnNDbGFzczogJy5kYXRhX19uYXZpZ2F0aW9uLWJ1dHRvbi0tcHJldmlvdXMnLFxyXG4gICAgb3RoZXJQYXJ0TmV4dEJ1dHRvbkNsYXNzOiAnLmRhdGFfX25hdmlnYXRpb24tYnV0dG9uLS1uZXh0JyxcclxuICAgIHN1Ym1pdEJ1dHRvbkNsYXNzOiAnLmRhdGFfX2Zvcm0tc3VibWl0LWJ1dHRvbicsXHJcbiAgICBpbnB1dFdyYXBwZXJDbGFzczogJy5mb3JtX19maWVsZC13cmFwcGVyJyxcclxuICAgIHNlbGVjdFdyYXBwZXJDbGFzczogJy5mb3JtX19zZWxlY3Qtd3JhcHBlcicsXHJcbiAgICBmb3JtSGludENsYXNzOiAnLmZvcm1fX2hpbnQnLFxyXG4gICAgcHJvZ3Jlc3NCYXI6IHtcclxuICAgICAgY29udGFpbmVyQ2xhc3M6ICcuY2hlY2tvdXQtYmFyX19saXN0JyxcclxuICAgICAgcG9pbnRDbGFzczogJy5jaGVja291dC1iYXJfX2l0ZW0nXHJcbiAgICB9LFxyXG4gIH0pO1xyXG59O1xyXG4iXX0=
