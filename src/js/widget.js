import { isValidCard } from "./validators";
import { choosePaymentSystem } from "./validators";
import amec from "../img/amec.png";
import mastercard from "../img/mc.png";
import mir from "../img/mir.png";
import visa from "../img/visa.png";
import discover from "../img/discover.png";
import diners from "../img/diners.png";

export class CardFormWidget {
  constructor(parentEl) {
    this.parentEl = parentEl;
    this.cards = [];
    this.onSubmit = (e) => this._onSubmit(e);
    this.showHint = () => this._showHint();
    this.showActiveCard = (value) => this._showActiveCard(value);
    this.resetCardStyles = (value) => this._resetCardStyles(value);
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
    const cardIcons = [amec, mastercard, mir, visa, discover, diners];
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
    this.cards.forEach((el) => {
      el.style.filter = `grayscale(${value}%)`;
    });
  }
}
