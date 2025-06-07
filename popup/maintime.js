let timerInterval;
const bottle = document.querySelector('.rocking-bottle');
const timerElement = document.getElementById('timer');
const water_pool = document.getElementById('water');
const ice_blocks = document.getElementById('ice')
const initialHeight = 200;

//main js listener searches for when start/stop are pressed
document.addEventListener('DOMContentLoaded', function () {
    //page 2
    document.getElementById('goToPomodoro').addEventListener('click', function () {
        click.play()
        homeAudio.pause();
        document.getElementById('page_1').style.display = 'none';
        document.getElementById('page_2').style.display = 'block';
    });

    document.getElementById('startButton').addEventListener('click', function () {
        click.play()
        const inputElement = document.getElementById('durationInput');
        let duration = parseInt(inputElement.value, 10) * 60;
        if (isNaN(duration) || duration <= 0) {
            alert('Please enter a valid number of minutes.'); //must be a time value
            return;
        }
        beginSound.play();
        startTimer(duration);
    });
    
    document.getElementById('stopButton').addEventListener('click', function () {
        click.play()
        stopSound.play();
        stopTimer();
    });

    //page 3
    document.getElementById('goToGoals').addEventListener('click', function () {
        click.play()
        homeAudio.pause();
        document.getElementById('page_1').style.display = 'none';
        document.getElementById('page_3').style.display = 'block';
        displayGoals();
    });

    document.getElementById('saveButton').addEventListener('click', goalsToDownload);

    document.getElementById('refreshButton').addEventListener('click', () => {
        if (confirm("Are you sure you want to clear your log?\nThis will not erase your minutes but your goal list will be gone.")) {
            trash.play()
            clearGoals();
        }
    });

    //page 4
    document.getElementById('goToItems').addEventListener('click', function () {
        let total = Number(localStorage.getItem('total')) || 0;
        click.play()
        homeAudio.pause();
        document.getElementById('page_1').style.display = 'none';
        document.getElementById('page_4').style.display = 'block';
        fillItems(total);
        displayItems();
    });

    document.getElementById('itemSelect').addEventListener('change', function () {
        const newItem = this.value;
        if (newItem) {
            selectSound.play();
            localStorage.setItem('item_current', newItem);
            item_current = newItem;
        }
    });

    //nav to home page
    document.getElementById('backHome').addEventListener('click', returnHome);
    document.getElementById('backHome2').addEventListener('click', returnHome);
    document.getElementById('backHome3').addEventListener('click', returnHome);
});

function returnHome(){
    click.play();
    document.getElementById('page_1').style.display = 'block';
    document.getElementById('page_2').style.display = 'none';
    document.getElementById('page_3').style.display = 'none';
    document.getElementById('page_4').style.display = 'none';
}

//if start button gets pressed
function startTimer(duration) {
    const original = duration/60;
    let increment = 2.0/duration;
    let percentage_water = 0;
    let percentage_ice = 1;

    clearInterval(timerInterval);
    if (bottle) startRocking();

    timerInterval = setInterval(function () {
        duration--;
        const minutes = Math.floor(duration / 60);
        const seconds = duration % 60;
        percentage_water = percentage_water + increment;
        percentage_ice = percentage_ice - increment/2;

        //update time text incrementally
        timerElement.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

        //raise water height incrementally
        if (water_pool) {
            const scale = Math.min(2.5, percentage_water);
            water_pool.style.transform = `scaleY(${scale})`;
        }

        if (ice_blocks) {
            const scale = Math.max(0, percentage_ice);
            ice_blocks.style.transform = `scaleY(${scale})`;
        }

        //when timer gets over
        if (duration <= 0) {
            clearInterval(timerInterval);
            timerElement.textContent = 'Done!';
            saveGoalToHistory(original);
            if (bottle) stopRocking();
            alarmSound.play();
            alarmSound.play();
            alarmSound.play();
        }

    }, 1000);
}

//if stop button gets pressed
function stopTimer() {
    const timerElement = document.getElementById('timer');
    const bottle = document.querySelector('.rocking-bottle');
    clearInterval(timerInterval);

    if (bottle) stopRocking();
    if (water_pool) water_pool.style.transform = 'scaleY(0)';
    if (ice_blocks) ice_blocks.style.transform = 'scaleY(1)';

    timerElement.textContent = '---';
}

//anim start
function startRocking() {
    bottle.classList.remove('animate');
    void bottle.offsetWidth;
    bottle.classList.add('animate');
}

//anim stop
function stopRocking() {
    bottle.classList.remove('animate');
}