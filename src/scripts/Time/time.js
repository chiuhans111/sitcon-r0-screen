window.timeOffset = 0;

function now() {
  let now = new Date();
  return now.getTime() + window.timeOffset;
}

export default now;
