let timerInterval = null;
let targetDate = 0;

self.onmessage = (event) => {
  if (event.data.type === 'START_TIMER') {
    targetDate = event.data.targetDate;
    startTimer();
  }
};

function startTimer() {
  if (timerInterval) clearInterval(timerInterval);

  timerInterval = setInterval(() => {
    const currentTime = new Date().getTime();
    const timeLeft = targetDate - currentTime;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      postMessage({ type: 'TIMER_EXPIRED' });
    } else {
      postMessage({ type: 'TIMER_UPDATE', timeLeft });
    }
  }, 1000);
}