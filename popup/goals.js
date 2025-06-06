const textarea = document.getElementById('expandingText');
let saved = localStorage.getItem('savedGoal')
const total = localStorage.getItem('total')

//load text from last session
if (saved) textarea.value = saved;

//keep text updated and box moving
textarea.addEventListener('input', () => {
  textarea.style.height = 'auto';
  textarea.style.height = textarea.scrollHeight + 'px';
  localStorage.setItem('savedGoal', textarea.value); //update goal
});

textarea.dispatchEvent(new Event('input'));

//save to log of goals
function saveGoalToHistory(session_time){
  const timestamp = new Date().toLocaleString();
  saved = textarea.value;
  const entry = {
    goal:saved,
    completed:timestamp,
    length:session_time,
  }
  const existing = JSON.parse(localStorage.getItem('goalHistory') || '[]');
  existing.push(entry);
  localStorage.setItem('goalHistory', JSON.stringify(existing,null,2)) //updated history
  
  let beforetime = Number(localStorage.getItem('total'));
  let updatedTotal = beforetime + session_time; // Add new duration
  localStorage.setItem('total', updatedTotal); //
}

//download log of goals
function goalsToDownload() {
  //formatting (I used AI to assist me here)
  download.play()
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const total = localStorage.getItem('total') || '0';
  const savedGoal = localStorage.getItem('savedGoal') || '';
  const history = JSON.parse(localStorage.getItem('goalHistory') || '[]');
  history.sort((a, b) => new Date(b.completed) - new Date(a.completed));

  let textContent = `Total Time Studied: ${total} minutes\n\n`;
  textContent += `Current Goal:\n${savedGoal}\n\n`;
  textContent += 'Goal History:\n';

  if (history.length === 0) {
    textContent += 'No saved goals yet.\n';
  } else {
    history.forEach((entry, i) => {
      textContent += `${i + 1}. Goal: ${entry.goal}\n`;
      textContent += `   Completed: ${entry.completed}\n`;
      textContent += `   Duration: ${entry.length} minutes\n\n`;
    });
  }

  const blob = new Blob([textContent], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);

  //create link and click to download
  const a = document.createElement('a');
  a.href = url;
  a.download = `study_goal_log_${timestamp}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  URL.revokeObjectURL(url);
}

//remove all goals
function clearGoals(){
  localStorage.removeItem('goalHistory');
  trash.play()
}

//show all successful sessions on visit goals page
function displayGoals() {
  const totalDiv = document.getElementById('totalTime');
  const container = document.getElementById('goalList');
  const history = JSON.parse(localStorage.getItem('goalHistory') || '[]');
  const total = Number(localStorage.getItem('total')) || 0;

  //total time first
  container.innerHTML = '';
  totalDiv.innerHTML = `<strong>Total Time Studied:</strong> ${total} minutes`;

  if (history.length === 0) {
    container.textContent = 'No saved goals yet.';
    return;
  }

  //formatting for each goal
  history.sort((a, b) => new Date(b.completed) - new Date(a.completed));
  history.forEach(goalEntry => {
    const goalDiv = document.createElement('div');
    goalDiv.style.marginBottom = '15px';
    goalDiv.style.padding = '10px';
    goalDiv.style.borderBottom = '1px solid #ddd';

    goalDiv.innerHTML = `
      <strong>Goal:</strong> ${goalEntry.goal}<br>
      <strong>Completed:</strong> ${goalEntry.completed}<br>
      <strong>Duration:</strong> ${goalEntry.length} minutes
    `;
    container.appendChild(goalDiv);
  });
}
