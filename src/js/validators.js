export function isValidCard(input) {
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

export function choosePaymentSystem(cardNumber) {
  const cleanedNumber = cardNumber.replace(/\D/g, "");
  if (/^4/.test(cleanedNumber) && cleanedNumber.length === 16) {
    return "Visa";
  } else if (/^5[1-5]/.test(cleanedNumber) && cleanedNumber.length === 16) {
    return "MasterCard";
  } else if (/^2/.test(cleanedNumber) && cleanedNumber.length === 16) {
    return "Мир";
  } else if (/^3[47]/.test(cleanedNumber) && cleanedNumber.length === 15) {
    return "American Express";
  } else if (
    (/^6011/.test(cleanedNumber) || /^65/.test(cleanedNumber)) &&
    cleanedNumber.length === 16
  ) {
    return "Discover";
  } else if (
    (/^30[0-5]/.test(cleanedNumber) ||
      /^36/.test(cleanedNumber) ||
      /^38|39/.test(cleanedNumber)) &&
    (cleanedNumber.length === 14 || cleanedNumber.length === 16)
  ) {
    return "Diners Club";
  } else {
    return "Unknown";
  }
}
