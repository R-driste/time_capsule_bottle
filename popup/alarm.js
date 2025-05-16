function startTimer(duration) {
    const timerElement = document.getElementById('timer');
    const bottles = document.querySelectorAll('.rocking-bottle');
    const initialHeight = 200;
    const alarmSound = document.getElementById('alarmSound'); // Get the audio element
    clearInterval(timerInterval);

    timerInterval = setInterval(function () {
        const minutes = Math.floor(duration / 60);
        const seconds = duration % 60;

        // Update the timer display
        timerElement.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

        // Adjust the height of the bottles proportionally
        const remainingRatio = duration / (parseInt(document.getElementById('durationInput').value, 10) * 60);
        bottles.forEach(bottle => {
            bottle.style.height = `${initialHeight * remainingRatio}px`;
        });

        // Stop the timer when it reaches 0
        if (duration <= 0) {
            clearInterval(timerInterval);
            timerElement.textContent = "Time's Up!";

            // Reset the bottles' height
            bottles.forEach(bottle => {
                bottle.style.height = `${initialHeight}px`;
            });

            // Stop the animation
            stopAnimation();

            // Play the alarm sound
            alarmSound.play();
        }

        duration--;
    }, 1000);
}