document.addEventListener('DOMContentLoaded', () => {
    const sound = document.getElementById('soundSwitch');
    let soundLabel = document.getElementById('soundLabel');

    sound.addEventListener('change', () => {
        if (sound.checked) {
            soundLabel.innerHTML = 'sound on';
            //console.log('on');
        } else if (!sound.checked) {
            soundLabel.innerHTML = 'sound off';
            //console.log('off');
        }
    });
});

