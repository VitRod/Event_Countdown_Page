const countdownForm = document.getElementById('countdownForm');
const inputContainer = document.getElementById('input-container');
const dateEl = document.getElementById('date-picker');

const countdownEl = document.getElementById('countdown');
const countdownElTitle = document.getElementById('countdown-title');
const countdownBtn = document.getElementById('countdown-button');
const timeElements = document.querySelectorAll('span');

const completeEl = document.getElementById('complete');
const completeElInfo = document.getElementById('complete-info');
const completeBtn = document.getElementById('complete-button');
// const addBtn = document.getElementById('add-button');
const container = document.getElementById('container');

const modal = document.getElementById('modal');
const modalShow = document.getElementById('show-modal');
const modalClose = document.getElementById('close-modal');

const suggestedListNodeList = document.getElementsByClassName('suggested-list-li');
for (let i = 0; i < suggestedListNodeList.length; i++) {
  suggestedListNodeList[i].addEventListener('click', (e) => {
    modal.classList.remove('show-modal');
    let value = e.target.innerHTML;
    localStorage.removeItem('countdown');
    countdownTitle = '';
    countdownDate = '';
    updateCountdown(value, suggestedList[value]);
  });
}

const suggestedList = {
  'Presidential Election': 1604361600000,
  Christmas: 1608854400000,
  Hanukkah: 1607558400000,
  Thanksgiving: 1606348800000,
  'Yom Kippur': 1601164800000,
  "Valentine's Day": 1613260800000,
  Halloween: 1604102400000,
  'Friday the 13th': 1605225600000,
  'Black Friday': 1606435200000,
  "New Year's Eve": 1609372800000,
};

// Show Modal, Focus on Input
function showModal() {
  modal.classList.add('show-modal');
}

// Modal Event Listeners
modalShow.addEventListener('click', showModal);
modalClose.addEventListener('click', () => modal.classList.remove('show-modal'));
window.addEventListener('click', (e) => (e.target === modal ? modal.classList.remove('show-modal') : false));

let countdownTitle = '';
let countdownDate = '';
let countdownValue = Date;
let countdownActive;
let savedCountdown;
let savedCountdownArr = [];

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

// Set Date Input Min & Value with Today's Date
const timeHere = new Date();
const timeHereISO = new Date().toISOString().split('2020');
const today = new Date().toISOString().split('T')[0];
console.log('today is', today);
dateEl.setAttribute('min', today);

// Populate Countdown / Complete UI
const updateDOM = () => {
  countdownActive = setInterval(() => {
    const now = new Date().getTime();
    const distance = countdownValue - now;
    const days = Math.floor(distance / day);
    const hours = Math.floor((distance % day) / hour);
    const minutes = Math.floor((distance % hour) / minute);
    const seconds = Math.floor((distance % minute) / second);
    // Hide Input
    inputContainer.hidden = true;
    // If the countdown has ended, show final state
    if (distance < 0) {
      countdownEl.hidden = true;
      clearInterval(countdownActive);
      completeElInfo.textContent = `${countdownTitle} finished on ${countdownDate}`;
      completeEl.hidden = false;
    } else {
      // else, show the countdown in progress
      countdownElTitle.textContent = `${countdownTitle}`;
      timeElements[0].textContent = `${days}`;
      timeElements[1].textContent = `${hours}`;
      timeElements[2].textContent = `${minutes}`;
      timeElements[3].textContent = `${seconds}`;
      completeEl.hidden = true;
      countdownEl.hidden = false;
    }
  }, second);
};

const updateCountdown = (e = undefined, suggestedTitle, suggestedValue) => {
  if (typeof e === 'object') {
    e.preventDefault();
    countdownTitle = e.srcElement[0].value;
    countdownDate = e.srcElement[1].value;
  } else {
    // Set title and date, save to localStorage
    countdownTitle = e;
    countdownDate = suggestedTitle;
  }
  savedCountdown = {
    title: countdownTitle,
    date: countdownDate,
  };

  localStorage.setItem('countdown', JSON.stringify(savedCountdown));
  // Check if no date entered
  if (countdownDate === '') {
    alert('Please select a date for the countdown.');
  } else {
    // Get number version of current Date, updateDOM
    countdownValue = new Date(countdownDate).getTime();
    updateDOM();
  }
};

const reset = () => {
  console.log(savedCountdown, countdownValue, countdownTitle, countdown);
  countdownEl.hidden = true;
  completeEl.hidden = true;
  inputContainer.hidden = false;
  clearInterval(countdownActive);
  countdownTitle = '';
  countdownDate = '';
  countdownValue = '';
  savedCountdown = '';
  countdown = '';
  console.log(savedCountdown, countdownValue, countdownTitle, countdown);
  localStorage.removeItem('countdown');
};

const restorePreviousCountdown = () => {
  // Get countdown from localStorage if available
  if (localStorage.getItem('countdown')) {
    countdown = JSON.parse(localStorage.getItem('countdown'));
    inputContainer.hidden = true;
    const { title, date } = countdown;
    countdownTitle = title;
    countdownDate = date;
    countdownValue = new Date(countdownDate).getTime();
    updateDOM();
  }
};
const displayCountdown = (countdownTitle, countdownDate, countdownValue) => {
  const countdownElement = document.createElement('div');
  countdownElement.classList.add('countdown');
  countdownFormElement.insertAdjacentHTML(
    'beforeend',
    `<div class="countdown" id="countdown" hidden >
    <h1 id="countdown-title">${countdownTitle}</h1>
    <ul>
        <li><span></span>Days</li>
        <li><span></span>Hours</li>
        <li><span></span>Minutes</li>
        <li><span></span>Seconds</li>
    </ul>
    <button id="countdown-button">RESET</button>
</div>`
  );
};

const addCountdown = () => {
  const countdownFormElement = document.createElement('div');
  countdownFormElement.classList.add('single-container');
  countdownFormElement.classList.add('input-containerr');
  container.appendChild(countdownFormElement);
  countdownFormElement.insertAdjacentHTML(
    'beforeend',
    `  <div class="input-container" id="input-container">
        <h1>Create a Custom Countdown!</h1>       
        <form class="form" id="countdownForm" >
          <label for="title">Title</label>
          <input type="text" id="title" placeholder="What are you counting down to?">
          <label for="date-picker">Select a Date</label>
          <input type="date" id="date-picker">
          <button type="submit">Submit</button>
        </form>
      </div>`
  );
};

// Event Listeners
countdownForm.addEventListener('submit', updateCountdown);
countdownBtn.addEventListener('click', reset);
completeBtn.addEventListener('click', reset);
// addBtn.addEventListener('click', addCountdown);

// On Load, check localStorage
restorePreviousCountdown();
