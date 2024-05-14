import { CardFormWidget } from "./widget";

const container = document.querySelector(".container");
const form = new CardFormWidget(container);

form.bindToDOM();
form.drowCards();
