import { isValidCard, choosePaymentSystem } from "../validators";

test.each([
  [" ", false],
  ["4111111111111111", true],
  ["2125522", false],
  ["", false],
])("checking card number", (number, expected) => {
  expect(isValidCard(number)).toBe(expected);
});

test.each([
  ["371449635398431", "American Express"],
  ["4111111111111111", "Visa"],
  ["30569309025904", "Diners Club"],
  ["6011111111111117", "Discover"],
  ["5555555555554444", "MasterCard"],
  ["2200 0000 0000 0053", "Мир"],
  ["0800 0000 0000 0053", "Unknown"],
])("checking PaymentSystem", (number, expected) => {
  expect(choosePaymentSystem(number)).toBe(expected);
});
