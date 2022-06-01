import {Howl} from 'howler';

let timerIntervalId;
let timerEndId;

export default function (form, action, resultBox) {

  function play() {
    const sound = new Howl({
      src: ['assets/sound.wav']
    });
    return sound.play();
  }

  switch (action) {
    case 'start':
      resultBox.innerHTML = '';
      let formData = new FormData(form);
      let time = +formData.get('time');
      timerIntervalId = setInterval(() => {
        resultBox.innerHTML = `${time}`;
        time -= 1;
      }, 1000);
      timerEndId = setTimeout(()=> {
        play();
        clearInterval(timerIntervalId);
      }, time*1000+1000);
      break;
    case 'stop':
      clearInterval(timerIntervalId);
      clearTimeout(timerEndId);
      resultBox.innerHTML = 'Stopped by user';
      break;
    default:
      break;
  }
}