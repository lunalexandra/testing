/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "";
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/js/validators.js
function isValidCard(input) {
  if (!input || input == 0 || /^\s*$/.test(input)) {
    return false;
  }
  const number = input.toString();
  const digits = number.replace(/\D/g, "").split("").map(Number);
  let sum = 0;
  let isSecond = false;
  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = digits[i];
    if (isSecond) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    sum += digit;
    isSecond = !isSecond;
  }
  return sum % 10 === 0;
}
function choosePaymentSystem(cardNumber) {
  const cleanedNumber = cardNumber.replace(/\D/g, "");
  if (/^4/.test(cleanedNumber) && cleanedNumber.length === 16) {
    return "Visa";
  } else if (/^5[1-5]/.test(cleanedNumber) && cleanedNumber.length === 16) {
    return "MasterCard";
  } else if (/^2/.test(cleanedNumber) && cleanedNumber.length === 16) {
    return "Мир";
  } else if (/^3[47]/.test(cleanedNumber) && cleanedNumber.length === 15) {
    return "American Express";
  } else if ((/^6011/.test(cleanedNumber) || /^65/.test(cleanedNumber)) && cleanedNumber.length === 16) {
    return "Discover";
  } else if ((/^30[0-5]/.test(cleanedNumber) || /^36/.test(cleanedNumber) || /^38|39/.test(cleanedNumber)) && (cleanedNumber.length === 14 || cleanedNumber.length === 16)) {
    return "Diners Club";
  } else {
    return "Unknown";
  }
}
;// CONCATENATED MODULE: ./src/img/amec.png
const amec_namespaceObject = __webpack_require__.p + "2451b6cd4d517419f29c.png";
;// CONCATENATED MODULE: ./src/img/mc.png
const mc_namespaceObject = __webpack_require__.p + "c7ccc1f2304f04c13a06.png";
;// CONCATENATED MODULE: ./src/img/mir.png
const mir_namespaceObject = __webpack_require__.p + "47acb29421a267d1fc87.png";
;// CONCATENATED MODULE: ./src/img/visa.png
const visa_namespaceObject = __webpack_require__.p + "7dbe2d69fab5a1a3e043.png";
;// CONCATENATED MODULE: ./src/img/discover.png
const discover_namespaceObject = __webpack_require__.p + "11ea1d8c65079dd5f029.png";
;// CONCATENATED MODULE: ./src/img/diners.png
const diners_namespaceObject = __webpack_require__.p + "b0343e510f759c955dae.png";
;// CONCATENATED MODULE: ./src/js/widget.js








class CardFormWidget {
  constructor(parentEl) {
    this.parentEl = parentEl;
    this.cards = [];
    this.onSubmit = e => this._onSubmit(e);
    this.showHint = () => this._showHint();
    this.showActiveCard = value => this._showActiveCard(value);
    this.resetCardStyles = value => this._resetCardStyles(value);
  }
  static get markup() {
    return `
        <div class="card-menu">
          <div class="card-item"></div>
          <div class="card-item"></div>
          <div class="card-item"></div>
          <div class="card-item"></div>
          <div class="card-item"></div>
          <div class="card-item"></div>
        </div>
        <form class="card-form-widget">
            <div class="control">
                <label for="card-input"></label>
                <input type="text" id="card-input" class="input">
                <button class="submit">Click to Validate</button>
            </div>
        </form>
        `;
  }
  static get submitSelector() {
    return ".submit";
  }
  static get inputSelector() {
    return ".input";
  }
  static get selector() {
    return ".card-form-widget";
  }
  bindToDOM() {
    this.parentEl.innerHTML = CardFormWidget.markup;
    this.element = this.parentEl.querySelector(CardFormWidget.selector);
    this.submit = this.element.querySelector(CardFormWidget.submitSelector);
    this.input = this.element.querySelector(CardFormWidget.inputSelector);
    this.element.addEventListener("submit", this.onSubmit);
  }
  _onSubmit(e) {
    e.preventDefault();
    this.resetCardStyles(100);
    let value = this.input.value;
    if (isValidCard(value)) {
      this.input.classList.add("valid");
      this.input.classList.remove("invalid");
      this.showActiveCard(value);
    } else {
      this.input.classList.add("invalid");
      this.input.classList.remove("valid");
      this.showHint();
      this.element.reset();
      this.resetCardStyles(0);
    }
  }
  _showHint() {
    const hintOld = document.querySelector(".hint");
    if (hintOld) {
      hintOld.remove();
    }
    let hint = document.createElement("div");
    hint.classList.add("hint");
    hint.textContent = "Invalid card number";
    this.element.insertAdjacentElement("afterbegin", hint);
    setTimeout(() => {
      hint.remove();
    }, 1000);
  }
  drowCards() {
    const cardIcons = [amec_namespaceObject, mc_namespaceObject, mir_namespaceObject, visa_namespaceObject, discover_namespaceObject, diners_namespaceObject];
    this.cards = document.querySelectorAll(".card-item");
    this.cards.forEach((el, index) => {
      const icon = document.createElement("img");
      el.insertAdjacentElement("afterbegin", icon);
      icon.src = cardIcons[index];
      icon.className = "card-item-picture";
    });
  }
  _showActiveCard(value) {
    const activeCard = choosePaymentSystem(value);
    switch (activeCard) {
      case "Visa":
        this.cards[3].style.filter = "grayscale(0%)"; // Элемент карты Visa
        break;
      case "MasterCard":
        this.cards[1].style.filter = "grayscale(0%)"; // Элемент карты MasterCard
        break;
      case "Мир":
        this.cards[2].style.filter = "grayscale(0%)"; // Элемент карты Мир
        break;
      case "American Express":
        this.cards[0].style.filter = "grayscale(0%)"; // Элемент карты American Express
        break;
      case "Discover":
        this.cards[4].style.filter = "grayscale(0%)"; // Элемент карты Discover
        break;
      case "Diners Club":
        this.cards[5].style.filter = "grayscale(0%)"; // Элемент карты Diners Club
        break;
      default:
        this.resetCardStyles(100);
    }
  }
  _resetCardStyles(value) {
    this.cards.forEach(el => {
      el.style.filter = `grayscale(${value}%)`;
    });
  }
}
;// CONCATENATED MODULE: ./src/js/app.js

const container = document.querySelector(".container");
const app_form = new CardFormWidget(container);
app_form.bindToDOM();
app_form.drowCards();
;// CONCATENATED MODULE: ./src/index.js





// TODO: write your code in app.js
/******/ })()
;