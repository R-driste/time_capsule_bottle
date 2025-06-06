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
    requirement: 600,
  },
  {
    name: "Ruler",
    image: "📏",
    rarity: "super rare",
    requirement: 50000000,
  }
];

const item_current = localStorage.getItem('item_current') || 'Water Glass';


//item displays
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
  });
}
