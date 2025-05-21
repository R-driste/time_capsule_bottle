document.getElementById('goToPomodoro').addEventListener('click', function () {
    const click = document.getElementById('click')
    click.play()
    document.getElementById('page_1').style.display = 'none';
    document.getElementById('page_2').style.display = 'block';
});