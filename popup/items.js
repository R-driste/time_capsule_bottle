//hardcoded unlockable items lol
const unlockableItems = [
  {
    name: "Water Glass",
    image: "🥃🧊",
    rarity: "default",
    requirement: 0,
  },
  {
    name: "Candle",
    image: "🕯️",
    rarity: "uncommon",
    requirement: 10,
  },
  {
    name: "Ruler",
    image: "📏",
    rarity: "super rare",
    requirement: 50000000,
  }
];

let item_current = localStorage.getItem('item_current') || 'Water Glass';

//item display in the list of attributes
function displayItems() {
  const totalDiv = document.getElementById('totalTime');
  const container = document.getElementById('itemList');
  const total = Number(localStorage.getItem('total')) || 0;

  //total time first
  container.innerHTML = '';
  totalDiv.innerHTML = `<strong>Total Time Studied:</strong> ${total} minutes`;

  if (history.length === 0) {
    container.textContent = 'Not working.';
    return;
  }

  //formatting for each goal
  unlockableItems.forEach(itemEntry => {
    const itemDiv = document.createElement('div');
    itemDiv.style.marginBottom = '15px';
    itemDiv.style.padding = '10px';
    itemDiv.style.borderBottom = '1px solid #ddd';
    itemDiv.innerHTML = `
      <strong>Name: ${itemEntry.name}<br>
      <strong>Icon: </strong> ${itemEntry.image}<br>
      <strong>Rarity: </strong> ${itemEntry.rarity}<br>
      <strong>Requirement: </strong> ${itemEntry.requirement} minutes<br>
    `;
    container.appendChild(itemDiv);
    fillItems(total);
  });
}

//item options for the form
function fillItems(min) {
  const select = document.getElementById('itemSelect');
  select.innerHTML = '';
  
  //find the current item and show as default
  unlockableItems
    .filter(item => item.requirement <= min)
    .sort((a, b) => {
      if (a.name === item_current) return -1;
      if (b.name === item_current) return 1;
      return a.requirement - b.requirement;
    })
    //display each item as an option
    .forEach(item => {
      const option = document.createElement('option');
      option.value = item.name;
      option.textContent = `${item.image} ${item.name} (${item.rarity})`;
      if (item.name === item_current) {
        option.selected = true;
      }
      select.appendChild(option);
    });
}

//change to item selected in 4th screen
function updateItemDisplay() {
  const waterDiv = document.getElementById('waterDiv');
  const candleDiv = document.getElementById('candleDiv');

  waterDiv.classList.remove('visible');
  candleDiv.classList.remove('visible');

  if (item_current === 'Water Glass') {
    waterDiv.classList.add('visible');
  } else if (item_current === 'Candle') {
    candleDiv.classList.add('visible');
  }
}