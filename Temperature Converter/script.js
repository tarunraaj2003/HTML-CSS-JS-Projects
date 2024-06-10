const scaleOne = document.getElementById("scale-one");
const valueOne = document.getElementById("value-one");
const scaleTwo = document.getElementById("scale-two");
const valueTwo = document.getElementById("value-two");
const conversionResult = document.getElementById("conversion-result");
const swapButton = document.getElementById("swap-button");

const conversions = {
  Celsius: {
    Fahrenheit: (C) => (C * 9) / 5 + 32,
    Kelvin: (C) => C + 273.15,
    Rankine: (C) => (C + 273.15) * 9 / 5,
    Delisle: (C) => (100 - C) * 3 / 2,
    Newton: (C) => C * 33 / 100,
    Réaumur: (C) => C * 4 / 5,
    Rømer: (C) => C * 21 / 40 + 7.5,
    Leiden: (C) => C + 274.15,
    "Gas Mark": (C) => C * 0.203333,
  },
  Fahrenheit: {
    Celsius: (F) => (F - 32) * 5 / 9,
    Kelvin: (F) => (F - 32) * 5 / 9 + 273.15,
    Rankine: (F) => F + 459.67,
    Delisle: (F) => (212 - F) * 5 / 6,
    Newton: (F) => (F - 32) * 11 / 60,
    Réaumur: (F) => (F - 32) * 4 / 9,
    Rømer: (F) => (F - 32) * 7 / 24 + 7.5,
    Leiden: (F) => (F + 459.67) * 5 / 9,
    "Gas Mark": (F) => (F - 32) * 0.113333,
  },
  Kelvin: {
    Celsius: (K) => K - 273.15,
    Fahrenheit: (K) => (K - 273.15) * 9 / 5 + 32,
    Rankine: (K) => K * 9 / 5,
    Delisle: (K) => (373.15 - K) * 3 / 2,
    Newton: (K) => (K - 273.15) * 33 / 100,
    Réaumur: (K) => (K - 273.15) * 4 / 5,
    Rømer: (K) => (K - 273.15) * 21 / 40 + 7.5,
    Leiden: (K) => K - 1,
    "Gas Mark": (K) => (K - 273.15) * 0.203333,
  },
  Rankine: {
    Celsius: (R) => (R - 491.67) * 5 / 9,
    Fahrenheit: (R) => R - 459.67,
    Kelvin: (R) => R * 5 / 9,
    Delisle: (R) => (671.67 - R) * 5 / 6,
    Newton: (R) => (R - 491.67) * 11 / 60,
    Réaumur: (R) => (R - 491.67) * 4 / 9,
    Rømer: (R) => (R - 491.67) * 7 / 24 + 7.5,
    Leiden: (R) => R * 5 / 9 - 1,
    "Gas Mark": (R) => (R - 491.67) * 0.113333,
  },
  Delisle: {
    Celsius: (D) => 100 - D * 2 / 3,
    Fahrenheit: (D) => 212 - D * 6 / 5,
    Kelvin: (D) => 373.15 - D * 2 / 3,
    Rankine: (D) => 671.67 - D * 6 / 5,
    Newton: (D) => 33 - D * 22 / 100,
    Réaumur: (D) => 80 - D * 8 / 15,
    Rømer: (D) => 60 - D * 7 / 20,
    Leiden: (D) => 373.15 - D * 2 / 3 - 1,
    "Gas Mark": (D) => 7 - D * 0.136667,
  },
  Newton: {
    Celsius: (N) => N * 100 / 33,
    Fahrenheit: (N) => N * 60 / 11 + 32,
    Kelvin: (N) => N * 100 / 33 + 273.15,
    Rankine: (N) => N * 60 / 11 + 491.67,
    Delisle: (N) => (33 - N) * 50 / 11,
    Réaumur: (N) => N * 80 / 33,
    Rømer: (N) => N * 35 / 22 + 7.5,
    Leiden: (N) => N * 100 / 33 + 272.15,
    "Gas Mark": (N) => N * 0.613333,
  },
  Réaumur: {
    Celsius: (Re) => Re * 5 / 4,
    Fahrenheit: (Re) => Re * 9 / 4 + 32,
    Kelvin: (Re) => Re * 5 / 4 + 273.15,
    Rankine: (Re) => Re * 9 / 4 + 491.67,
    Delisle: (Re) => (80 - Re) * 15 / 8,
    Newton: (Re) => Re * 33 / 80,
    Rømer: (Re) => Re * 21 / 32 + 7.5,
    Leiden: (Re) => Re * 5 / 4 + 272.15,
    "Gas Mark": (Re) => Re * 0.226667,
  },
  Rømer: {
    Celsius: (Ro) => (Ro - 7.5) * 40 / 21,
    Fahrenheit: (Ro) => (Ro - 7.5) * 24 / 7 + 32,
    Kelvin: (Ro) => (Ro - 7.5) * 40 / 21 + 273.15,
    Rankine: (Ro) => (Ro - 7.5) * 24 / 7 + 491.67,
    Delisle: (Ro) => (60 - Ro) * 20 / 7,
    Newton: (Ro) => (Ro - 7.5) * 22 / 35,
    Réaumur: (Ro) => (Ro - 7.5) * 32 / 21,
    Leiden: (Ro) => (Ro - 7.5) * 40 / 21 + 272.15,
    "Gas Mark": (Ro) => (Ro - 7.5) * 0.135,
  },
  Leiden: {
    Celsius: (L) => L - 274.15,
    Fahrenheit: (L) => (L - 274.15) * 9 / 5 + 32,
    Kelvin: (L) => L + 1,
    Rankine: (L) => (L + 1) * 9 / 5,
    Delisle: (L) => (373.15 - (L + 1)) * 3 / 2,
    Newton: (L) => (L - 274.15) * 33 / 100,
    Réaumur: (L) => (L - 274.15) * 4 / 5,
    Rømer: (L) => (L - 274.15) * 21 / 40 + 7.5,
    "Gas Mark": (L) => (L - 274.15) * 0.203333,
  },
  "Gas Mark": {
    Celsius: (GM) => GM * 150 + 100,
    Fahrenheit: (GM) => GM * 302 + 32,
    Kelvin: (GM) => GM * 150 + 373.15,
    Rankine: (GM) => GM * 302 + 491.67,
    Delisle: (GM) => (373.15 - GM * 150) * 3 / 2,
    Newton: (GM) => GM * 30 / 150,
    Réaumur: (GM) => GM * 4 / 5 * 150,
    Rømer: (GM) => GM * 21 / 40 * 150 + 7.5,
    Leiden: (GM) => GM * 150 + 372.15,
  }
};

function convertTemperature() {
  const scale_one = scaleOne.value;
  const scale_two = scaleTwo.value;
  const inputValue = parseFloat(valueOne.value);
  
  if (isNaN(inputValue)) {
    valueTwo.value = "";
    conversionResult.innerText = "Please enter a valid number.";
    return;
  }
  
  if (scale_one === scale_two) {
    valueTwo.value = inputValue;
    conversionResult.innerText = "";
    return;
  }
  
  const convert = conversions[scale_one][scale_two];
  const result = convert(inputValue);
  
  valueTwo.value = result.toFixed(2);
  conversionResult.innerText = `1 ${scale_one} = ${convert(1).toFixed(2)} ${scale_two}`;
}

scaleOne.addEventListener("change", convertTemperature);
valueOne.addEventListener("input", convertTemperature);
scaleTwo.addEventListener("change", convertTemperature);
valueTwo.addEventListener("input", convertTemperature);

swapButton.addEventListener("click", () => {
  const temp = scaleOne.value;
  scaleOne.value = scaleTwo.value;
  scaleTwo.value = temp;
  convertTemperature();
});

convertTemperature();
