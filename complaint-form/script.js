const fullName = document.querySelector("#full-name");
const email = document.querySelector("#email");
const orderNo = document.querySelector("#order-no");
const productCode = document.querySelector("#product-code");
const quantity = document.querySelector("#quantity");
const complaintsGroup = document.querySelector("#complaints-group");
const complaintDescription = document.querySelector("#complaint-description");
const solutionsGroup = document.querySelector("#solutions-group");
const solutionDescription = document.querySelector("#solution-description");
const otherComplaint = document.querySelector("#other-complaint");
const otherSolution = document.querySelector("#other-solution");

const emailRegex = /\w+@\w+\.[a-zA-Z]+/i;
const orderNoRegex = /^2024\d{6}$/i;
const productCodeRegex = /^[a-zA-Z]{2}\d{2}-[a-zA-Z]\d{3}-[a-zA-Z]{2}\d$/i;
const quantityRegex = /^[1-9][0-9]*$/;

function validateForm() {
  return {
    "full-name": fullName.value !== "",
    "email": emailRegex.test(email.value),
    "order-no": orderNoRegex.test(orderNo.value),
    "product-code": productCodeRegex.test(productCode.value),
    "quantity": quantityRegex.test(quantity.value),
    "complaints-group": Array.from(document.querySelectorAll('input[name="complaint"]')).some(ch => ch.checked),
    "complaint-description": otherComplaint.checked ? complaintDescription.value.length >= 20 : true,
    "solutions-group": Array.from(document.querySelectorAll('input[name="solutions"]')).some(ch => ch.checked),
    "solution-description": otherSolution.checked ? solutionDescription.value.length >= 20 : true
  };
}

function isValid(obj) {
  return Object.values(obj).every(value => value);
}

document.querySelector("#form").addEventListener("submit", (e) => {
  e.preventDefault();
  const results = validateForm();
  if (!isValid(results)) {
    Object.keys(results).forEach(key => {
      if (results[key] === false) {
        let el = document.querySelector(`#${key}`);
        el.style.borderColor = "red";
      }
    });
  }
});

function setBorderColor(el, isValid) {
  el.style.borderColor = isValid ? "green" : "red";
}

fullName.addEventListener("change", () => {
  setBorderColor(fullName, validateForm()["full-name"]);
});

email.addEventListener("change", () => {
  setBorderColor(email, validateForm()["email"]);
});

orderNo.addEventListener("change", () => {
  setBorderColor(orderNo, validateForm()["order-no"]);
});

productCode.addEventListener("change", () => {
  setBorderColor(productCode, validateForm()["product-code"]);
});

quantity.addEventListener("change", () => {
  setBorderColor(quantity, validateForm()["quantity"]);
});

complaintsGroup.addEventListener("change", () => {
  setBorderColor(complaintsGroup, validateForm()["complaints-group"]);
});

complaintDescription.addEventListener("change", () => {
  setBorderColor(complaintDescription, validateForm()["complaint-description"]);
});

solutionsGroup.addEventListener("change", () => {
  setBorderColor(solutionsGroup, validateForm()["solutions-group"]);
});

solutionDescription.addEventListener("change", () => {
  setBorderColor(solutionDescription, validateForm()["solution-description"]);
});