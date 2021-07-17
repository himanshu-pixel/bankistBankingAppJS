'use strict';

// BANKIST APP

// ----------------------------------------------------Data-----------------------------------------------
const account1 = {
  owner: 'Himanshu kushwaha',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %

  pin: 1111,
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-07-26T17:01:17.194Z',
    '2020-07-28T23:36:17.929Z',
    '2020-08-01T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT',
};

const account2 = {
  owner: 'Abhishek Pandey',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account3 = {
  owner: 'Rishab Joshi',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-07-26T17:01:17.194Z',
    '2020-07-28T23:36:17.929Z',
    '2020-08-01T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT',
};

const account4 = {
  owner: 'Harshit Kumar Rai',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2, account3, account4];

// -------------------------------------------------Elements----------------------------------------------
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');
//-----------------------------------displayng movements or  the statemnet--------------------------------
const displayMovement = function (accounts, sort = false) {
  containerMovements.innerHTML = '';
  const movs = sort
    ? accounts.movements.slice().sort((a, b) => a - b)
    : accounts.movements;

  // containerMovements.textContent = 0;
  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
     <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      <div class="movements__value">${mov.toFixed(2)} INR</div>
    </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

//----------------------------------------displaying balance----------------------------------------------
const caclDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, cur) => acc + cur, 0);
  labelBalance.textContent = `${acc.balance.toFixed(2)} INR`;
};

//--------------------------Calculating summary of balance withdraw and intrest--------------------------
const calcDisplaySummary = function (account) {
  const income = account.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov);
  labelSumIn.textContent = `${income.toFixed(2)}INR`;

  const out = movements.filter(mov => mov < 0).reduce((acc, mov) => acc + mov);
  labelSumOut.textContent = `${Math.abs(out).toFixed(2)}INR`;

  const interest = account.movements
    .filter(mov => mov > 0)
    .map(deposits => (deposits * account.interestRate) / 100)
    .filter(int => int >= 1)
    .reduce((acc, int) => acc + int);
  labelSumInterest.textContent = `${interest.toFixed(2)}INR`;
};

//-----------------------------------------creating usrname-----------------------------------------
const createUsernames = accs => {
  accs.forEach(acc => {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(mov => mov[0])
      .join('');
  });
};

createUsernames(accounts);
let currentAccount;
// ---------------------------------------------Updating UI ----------------------------------------------
const updateUI = function (currentAccount) {
  containerApp.style.opacity = 100;
  //displaying the movements
  displayMovement(currentAccount);
  //displaying the balance
  caclDisplayBalance(currentAccount);
  //displaying the summary
  calcDisplaySummary(currentAccount);
};

//fake login always
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;

// const now = new Date();
// const day = `${now.getDate()}`.padStart(2, 0);
// const month = `${now.getMonth() + 1}`.padStart(2, 0);
// const hours = now.getHours();
// const min = now.getMinutes();

// const year = now.getFullYear();
// labelDate.textContent = `${day}/${month}/${year},${hour}:${min}`;
//----------------------------------------Implementing Login--------------------------------------------

btnLogin.addEventListener('click', function (e) {
  e.preventDefault(); //prevents the page from reloading
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  // console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //displaying UI and message
    labelWelcome.textContent = `Welcome back , ${
      currentAccount.owner.split(' ')[0]
    }`;
    //clearimg the fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    //updating UI
    updateUI(currentAccount);
  } else {
    alert('Invalid Id or Pin');
    inputLoginUsername.value = inputLoginPin.value = '';
  }
});
//--------------------------------------Implementing the transfers--------------------------------------
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAccount = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferTo.value = inputTransferAmount.value = '';

  if (
    amount > 0 &&
    receiverAccount &&
    receiverAccount?.username !== currentAccount.username &&
    amount <= currentAccount.balance
  ) {
    console.log('Transfer Valid');
    currentAccount.movements.push(-amount);
    receiverAccount.movements.push(amount);
    alert(
      `${receiverAccount.owner} has received the amount ${amount} INR ,sent by you`
    );
    //updating UI
    updateUI(currentAccount);
  }
});
// ---------------------------------Granting Loan-----------------------------------------------
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    //add movement
    currentAccount.movements.push(amount);
    //updatng UI
    updateUI(currentAccount);
    //alert
    alert(
      `Loan of amount ${amount}INR has been sanctioned to ${currentAccount.owner}`
    );
  }
  inputLoanAmount.value = '';
});

// ---------------------------------Implementing Account Closure---------------------------------
btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  console.log('Closure begins');

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    //conforming the account to be closed
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    inputCloseUsername.value = inputClosePin.value = '';
    // console.log(index);
    console.log('Valid Closure');
    //deleting account
    accounts.splice(index, 1);
    containerApp.style.opacity = 0;

    labelWelcome.textContent = 'Log in to get started';
    alert(`${currentAccount.owner}'s account has been deleted`);
  }
});
// -------------------------------------------Sort Button------------------------------------------------
let sorted = false;

btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovement(currentAccount, !sorted);
  sorted = !sorted;
});

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
