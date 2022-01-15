const timer = {};

timer.days = 0;
timer.hours = 0;
timer.minutes = 0;
timer.seconds = 0;
timer.countSec = 0;
timer.countMin = 0;
timer.countHr = 0;
timer.countdown = 0;

timer.leadingZero = (num) => {
  return num < 10 ? "0" + num : num;
}

timer.setToZeros = () => {

  timer.days = 0;
  timer.hours = 0;
  timer.minutes = 0;
  timer.seconds = 0;

}

timer.setTime = (d,h,m,s) => {

  timer.days = d;
  timer.hours = h;
  timer.minutes = m;
  timer.seconds = s;

}

timer.getTimeUntil = (t) => {

    const time = Date.parse(t) - Date.parse(new Date());
    
    if (time < 0) {
      
      timer.setToZeros();

    } else {
      
      const seconds = Math.floor((time / 1000) % 60);
      const minutes = Math.floor((time / 1000 / 60) % 60);
      const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
      const days = Math.floor(time / (1000 * 60 * 60 * 24));

      timer.setTime(days, hours, minutes, seconds);

    }

}

timer.initTime = (time, dur) => {

  setInterval(() => {
    timer.getTimeUntil(time);
  }, dur);

}

timer.setCountdown = (m,s) => {

  timer.countSec = timer.leadingZero(s);
  timer.countMin = timer.leadingZero(m);

}

timer.initCountdown = (time, dur) => {

  let timerObj = time, mins, secs;

  setInterval(() => {

      mins = parseInt(timerObj / 60, 10);
      secs = parseInt(timerObj % 60, 10);

      if(--timerObj < 0){
        timerObj = time;
      }

      timer.setCountdown(mins, secs);

  }, dur);

  return <> <span style={{fontSize: `14px`}}>{ timer.countMin }</span>
  <span style={{fontSize: `14px`}}>:</span>
  <span style={{fontSize: `14px`}}>{ timer.countMin }</span> </>

}

export default timer;