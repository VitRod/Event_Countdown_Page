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




















