function getEls() {
  return {
    amountEl: document.getElementById('disabledTextInput'),
    durationEl: document.getElementById('disabledTextInput2'),
    durationUnit: document.getElementById('disabledSelect'),
    calculationBtn: document.getElementById('btnCalculation'),
    monthlyPaymentEl: document.getElementById('monthly-payment'),
    warningEl: document.getElementById('myimg'),
    salaryEl: document.getElementById('slaryInput'),
    totalToPayEl: document.getElementById('total-to-pay'),
    totalInterestEl: document.getElementById('total-interest'),
  };
}

const els = getEls();
//console.log(els);


const interestRates = {
  house: 4.5,
  apartement: 4.5,
  business: 6.5,
  personal: 12,
  project: 8
};


let selectedLoanType = 'personal';


const loanButtons = document.querySelectorAll('.loan-type-btn');


loanButtons.forEach(function(button) {
  button.addEventListener('click', function() {
    
    loanButtons.forEach(function(btn) {
      btn.classList.remove('bg-blue-500', 'text-white');
      btn.classList.add('bg-gray-200', 'text-gray-700');
    });
    
    
    this.classList.remove('bg-gray-200', 'text-gray-700');
    this.classList.add('bg-blue-500', 'text-white');
    
    
    selectedLoanType = this.dataset.loanType;
    console.log('Selected loan type:', selectedLoanType);
  });
});


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


  
  const annualRate = interestRates[selectedLoanType];
  const monthlyRate = annualRate / 12 / 100;

  
  let monthlyPayment;
  if (monthlyRate === 0) {
    monthlyPayment = Number(amount) / durationInMonths;
  } else {
    const power = Math.pow(1 + monthlyRate, durationInMonths);
    monthlyPayment = (Number(amount) * monthlyRate * power) / (power - 1);
  }

 
  els.monthlyPaymentEl.textContent =  monthlyPayment.toFixed(2) + " MAD";
  
  
  const totalToPay = monthlyPayment * durationInMonths;
  const totalInterest = totalToPay - Number(amount);
  
  
  els.totalInterestEl.textContent = totalInterest.toFixed(2) + ' MAD';
  els.totalToPayEl.textContent = totalToPay.toFixed(2) + ' MAD';

  const salary = Number(els.salaryEl.value);



  const ratio = (monthlyPayment / salary) * 100;

  if (ratio > 40) 
  {
    els.warningEl.style.display = "flex";
  } else {
    els.warningEl.style.display = 'none';
  }
});
