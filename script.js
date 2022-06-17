'use strict';

const localMainArray = localStorage.getItem('cars') ? JSON.parse(localStorage.getItem('cars')) : [];
const mainArray = [];
const selectNew = document.getElementById('new');
const newCarsBlock = document.querySelector('.new-cars');
const oldCarsBlock = document.querySelector('.old-cars');
const btnSave = document.querySelector('.btn');
const inputBrand = document.getElementById('brand');
const inputModel = document.getElementById('model');
const inputBody = document.getElementById('body');
const inputAutoBox = document.getElementById('auto-box');
const inputEngineVolume = document.getElementById('engine-volume');
const inputColor = document.getElementById('color');
const warrantyYears = document.getElementById('warranty-years');
const officialDealer = document.getElementById('official-dealer');
const productYear = document.getElementById('product-year');
const carMileage = document.getElementById('car-mileage');
const accidents = document.getElementById('accidents');
const amountOwners = document.getElementById('amount-owners');
const tBody = document.querySelector('tbody');
const headTable = tBody.innerHTML;

class Auto {
  constructor(newOrOld, brand, model, body, autoBox, engineVolume, color) {
    this.newOrOld = newOrOld;
    this.brand = brand;
    this.model = model;
    this.body = body;
    this.autoBox = autoBox;
    this.engineVolume = engineVolume;
    this.color = color;
  }
  start(index) {
    this.show(index);
    this.clear();
    this.deleteTr(index);

    if (mainArray.length > 0) {
      localStorage.setItem('cars', JSON.stringify(mainArray));
    }
  }
  show(index) {
    tBody.insertAdjacentHTML('beforeend', `<tr><td>${this.newOrOld}</td><td>${this.brand}</td><td>${this.model}</td><td>${this.body}</td><td>${this.autoBox ? `&#10004;` : '&#10006;'}</td><td>${this.engineVolume}</td><td>${this.color}</td><td>${this.warrantyYears ? this.warrantyYears : ''}</td><td>${this.officialDealer ? this.officialDealer : ''}</td><td>${this.productYear ? this.productYear : ''}</td><td>${this.carMileage ? this.carMileage : ''}</td><td>${this.accidents ? `&#10004;` : this.newOrOld === '2' ? '&#10006;' : ''}</td><td>${this.amountOwners ? this.amountOwners : ''}</td><td><button class="btnDel" id="${index}">Удалить</button></td></tr>`);
  }
  deleteTr(index) {
    tBody.querySelectorAll('.btnDel')[index].addEventListener('click', (e) => {
      mainArray.splice(e.target.id, 1);

      if (mainArray.length === 0) {
        localStorage.clear();
      }

      mainArrayIteration();
    });
  }
  clear() {
    selectNew.value = '';
    inputBrand.value = '';
    inputModel.value = '';
    inputBody.value = '';
    inputAutoBox.checked = false;
    inputEngineVolume.value = '';
    inputColor.value = '';
  }
}

class NewCar extends Auto {
  constructor(newOrOld, brand, model, body, autoBox, engineVolume, color, warrantyYears, officialDealer) {
    super(newOrOld, brand, model, body, autoBox, engineVolume, color);
    this.warrantyYears = warrantyYears;
    this.officialDealer = officialDealer;
  }
  clear() {
    super.clear();
    warrantyYears.value = '';
    officialDealer.value = '';
  }
}

class OldCar extends Auto {
  constructor(newOrOld, brand, model, body, autoBox, engineVolume, color, productYear, carMileage, accidents, amountOwners) {
    super(newOrOld, brand, model, body, autoBox, engineVolume, color);
    this.productYear = productYear;
    this.carMileage = carMileage;
    this.accidents = accidents;
    this.amountOwners = amountOwners;
  }
  clear() {
    super.clear();
    productYear.value = '';
    carMileage.value = '';
    accidents.checked = false;
    amountOwners.value = '';
  }
}

const mainArrayIteration = () => {
  tBody.innerHTML = headTable;

  mainArray.forEach((item, index) => {
    index = index.toString();
    item.start(index);
  });
};

if (localMainArray.length > 0) {
  localMainArray.forEach((item) => {

    if (item.newOrOld === '1') {
      const { newOrOld, brand, model, body, autoBox, engineVolume, color, warrantyYears, officialDealer } = item;

      mainArray.push(new NewCar(newOrOld, brand, model, body, autoBox, engineVolume, color, warrantyYears, officialDealer));
    }

    if (item.newOrOld === '2') {
      const { newOrOld, brand, model, body, autoBox, engineVolume, color, productYear, carMileage, accidents, amountOwners } = item;

      mainArray.push(new OldCar(newOrOld, brand, model, body, autoBox, engineVolume, color, productYear, carMileage, accidents, amountOwners));
    }
  });

  mainArrayIteration();
}

btnSave.addEventListener('click', (e) => {
  e.preventDefault();

  if (selectNew.value === '1') {
    if ((inputBrand.value !== '' && inputModel.value !== '' && inputBody.value !== '' && inputEngineVolume.value !== '' && inputColor.value !== '' && warrantyYears.value !== '' && officialDealer.value !== '')) {
      if ((!isNaN(parseFloat(inputEngineVolume.value)) && isFinite(inputEngineVolume.value)) && (!isNaN(parseFloat(warrantyYears.value)) && isFinite(warrantyYears.value))) {
        mainArray.push(new NewCar(selectNew.value, inputBrand.value, inputModel.value, inputBody.value, inputAutoBox.checked, inputEngineVolume.value, inputColor.value, warrantyYears.value, officialDealer.value));

        mainArrayIteration();
      } else {
        alert('В полях: "Объем двигателя" и "Гарантия" должны быть только числа');
      }
    } else {
      alert('Заполните все поля');
    }
  }

  if (selectNew.value === '2') {
    if ((selectNew.value !== '' && inputBrand.value !== '' && inputModel.value !== '' && inputBody.value !== '' && inputEngineVolume.value !== '' && inputColor.value !== '' && productYear.value !== '' && carMileage.value !== '' && amountOwners.value)) {
      if ((!isNaN(parseFloat(inputEngineVolume.value)) && isFinite(inputEngineVolume.value)) && (!isNaN(parseFloat(productYear.value)) && isFinite(productYear.value)) && (!isNaN(parseFloat(carMileage.value)) && isFinite(carMileage.value)) && (!isNaN(parseFloat(amountOwners.value)) && isFinite(amountOwners.value))) {
        mainArray.push(new OldCar(selectNew.value, inputBrand.value, inputModel.value, inputBody.value, inputAutoBox.checked, inputEngineVolume.value, inputColor.value, productYear.value, carMileage.value, accidents.checked, amountOwners.value));

        mainArrayIteration();
      } else {
        alert('В полях: "Объем двигателя" и "Год производства" "Пробег" "Количество владельцев" должны быть только числа');
      }
    } else {
      alert('Заполните все поля');
    }
  }
});

selectNew.addEventListener('change', () => {
  switch (selectNew.value) {
    case '1':
      oldCarsBlock.style.display = 'none';
      newCarsBlock.style.display = 'flex';
      break;
    case '2':
      newCarsBlock.style.display = 'none';
      oldCarsBlock.style.display = 'flex';
      break;
    case '':
      newCarsBlock.style.display = 'none';
      oldCarsBlock.style.display = 'none';
      break;
  }
});
