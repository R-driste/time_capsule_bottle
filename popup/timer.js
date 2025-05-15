let timerInterval;

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('startButton').addEventListener('click', function () {
        const inputElement = document.getElementById('durationInput');
        if (!inputElement) {
            console.error('durationInput element not found!');
            return;
        }

        let duration = parseInt(inputElement.value, 10) * 60;
        if (isNaN(duration) || duration <= 0) {
            alert('Please enter a valid number of minutes.');
            return;
        }
        startTimer(duration);
    });
});

function startTimer(duration) {
    const timerElement = document.getElementById('timer');
    clearInterval(timerInterval);
    timerInterval = setInterval(function () {
        const minutes = Math.floor(duration / 60);
        const seconds = duration % 60;

        timerElement.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

        if (duration <= 0) {
            clearInterval(timerInterval);
            timerElement.textContent = "Time's Up!";
            stopAnimation();
        }
        duration--;
    }, 1000);
}

document.getElementById('startButton').addEventListener('click', function () {
    const bottles = document.querySelectorAll('.rocking-bottle');
    bottles.forEach(bottle => {
        bottle.classList.add('animate');
    });
  });
  
  
  function stopAnimation() {
    const bottles = document.querySelectorAll('.rocking-bottle');
    bottles.forEach(bottle => {
        bottle.classList.remove('animate'); // Remove the animation class
    });
  }