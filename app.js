//boxes
const cardNumberBox = document.querySelector(".card_number_box");
const cardOwnerName = document.querySelector("span.owner");
const monthBox = document.querySelector(".month");
const yearBox = document.querySelector(".year");

//inputs
const cardNumberInputs = document.querySelectorAll(".input_box input");
const nameInput = document.querySelector(".name_input");
const monthInput = document.querySelector(".month_input");
const yearInput = document.querySelector(".year_input");

const getBack = input => {
  input.previousElementSibling.focus();
};

nameInput.addEventListener("input", function () {
  cardOwnerName.innerHTML = nameInput.value;
});

cardNumberInputs.forEach((input, index) => {
  input.addEventListener("input", () => {
    //for firefox doesn't support input type number
    input.value = input.value.replace(/[^0-9]/g, "");

    //insert input value to specified span
    cardNumberBox.children[index].innerHTML = input.value;
    if (input.value.length === 4 && index !== 3) {
      input.nextElementSibling.focus();
    }

    if (input.value.length === 0 && index !== 0) {
      getBack(input);
    }
    if (input.value.length === 0) {
      cardNumberBox.children[index].innerHTML = "0000";
    }

    let allInputLength = 0;
    cardNumberInputs.forEach(input => {
      allInputLength += input.value.length;
    });

    //focus to month element
    if (allInputLength === 16 && index === 3) {
      monthInput.focus();
    }
  });

  //keydown for backspace
  input.addEventListener("keydown", function (event) {
    if (event.key === "Backspace" && this.value.length === 0) {
      getBack(this);
    }
  });
});

monthInput.addEventListener("input", () => {
  let pattern = /^(0[1-9]|1[0-2])$/;

  //for firefox browser(doesn't detect input type number)
  if (isNaN(parseInt(monthInput.value))) {
    monthInput.value = "";
  }

  let isCorrectValue = pattern.test(monthInput.value);

  if (monthInput.value.length === 2 && isCorrectValue) {
    monthBox.innerHTML = monthInput.value;
    monthInput.nextElementSibling.focus();
  } else {
    monthBox.innerHTML = "";
  }

  if (monthInput.value.length > 2) {
    //prevent to write more than 2 numbers
    monthInput.value = monthInput.value.slice(0, 2);
  }
});

//year input

yearInput.addEventListener("input", () => {
  let pattern = /^^(2[5-9])$/;

  //for firefox browser(doesn't detect input type number)
  if (isNaN(parseInt(yearInput.value))) {
    yearInput.value = "";
  }

  let isCorrectValue = pattern.test(yearInput.value);

  if (yearInput.value.length > 2) {
    //prevent to write more than 2 numbers
    yearInput.value = yearInput.value.slice(0, 2);
    isCorrectValue = pattern.test(yearInput.value);
  }
  if (yearInput.value.length === 2 && isCorrectValue) {
    yearBox.innerHTML = yearInput.value;
  } else {
    yearBox.innerHTML = "";
  }
});
