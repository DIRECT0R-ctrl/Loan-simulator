function getEls() {
  return {
    amountEl: document.getElementById('disabledTextInput'),
    durationEl: document.getElementById('disabledTextInput2'),
    durationUnit: document.getElementById('disabledSelect'),
    calculationBtn: document.getElementById('btnCalculation'),
    monthlyPaymentEl: document.getElementById('monthly-payment'),
    warningEl: document.getElementById('myimg'),
    salaryEl: document.getElementById('slaryInput'),
  };
}

const els = getEls();
//console.log(els);


els.calculationBtn.addEventListener('click', function() {
  
  const amount = els.amountEl.value;
  const duration = els.durationEl.value;
  const unit = els.durationUnit.value;

  console.log(amount, duration, unit);

  let durationInMonths;

  if (unit === "Years") {
    durationInMonths = Number(duration * 12);
  } else if (unit === "months") {
    durationInMonths = Number(duration);
  } else if (unit === 'Days'){
    durationInMonths = Number(duration / 30);
  }


  const monthlyPayment = Number(amount) / durationInMonths;

 
  els.monthlyPaymentEl.textContent = "$" + monthlyPayment.toFixed(2);
  // const text = node.textContent;

  const salary = Number(els.salaryEl.value);



  const ratio = (monthlyPayment / salary) * 100;

  if (ratio > 40) 
  {
    els.warningEl.style.display = "flex";
  } else {
    els.warningEl.style.display = 'none';
  }
});