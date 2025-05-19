function startTimer(duration) {
    const timerElement = document.getElementById('timer');
    const water_pool = document.getElementById('water');
    const initialHeight = 200;
    let trackHeight = initialHeight
    const alarmSound = document.getElementById('alarmSound'); // Get the audio element
    const increment = 100 / duration
    clearInterval(timerInterval);

    timerInterval = setInterval(function () {
        const minutes = Math.floor(duration / 60);
        const seconds = duration % 60;

        timerElement.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

        trackHeight = trackHeight + increment
        water_pool.style.height = `${trackHeight}px`;

        //stop timer
        if (duration <= 0) {
            clearInterval(timerInterval);
            timerElement.textContent = "Time's Up!";
            water_pool.style.height = `${initialHeight}px`;
            stopAnimation();
            alarmSound.play();
        }
        duration--;
    }, 1000);
}