import moment from 'moment';

export function setSliderToToday() {
  const slider = document.getElementsByName('date')[0];
  slider.value = 366;
  setSliderOutput();
}

export function setSliderOutput() {
  const slider = document.getElementsByName('date')[0];
  const output = document.getElementById('dateOutput');
  setOutputPosition(slider, output);

  const dates = getDates(moment().subtract(1, 'years'), moment());
  const currentValue = parseInt(slider.value, 10);
  output.innerText = dates[currentValue - 1];
}

function getDates(startDate, stopDate) {
  const dateArray = [];
  let currentDate = moment(startDate);
  stopDate = moment(stopDate);
  while (currentDate <= stopDate) {
    dateArray.push( moment(currentDate).format('L') );
    currentDate = moment(currentDate).add(1, 'days');
  }

  return dateArray;
}

function setOutputPosition(slider, output) {
  const sliderPos = slider.value / slider.max;
  const pixelPostion = slider.clientWidth * sliderPos;
  output.style.left = `${ pixelPostion - 30 }px`;
}
