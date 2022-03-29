const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');
let cnt = 0;
let centre = 150;

let time = { startTime: null, sec: null, min: null, hr: null, sec_l: 120, min_l: 140, hr_l: 80 }

function init() {
    time.startTime = new Date;
    startTime = time.startTime;
    time.sec = startTime.getSeconds();
    time.min = startTime.getMinutes();
    time.hr = startTime.getHours();
}

function advTime() {
    time.sec++;
    if (time.sec >= 60) {
        time.sec %= 60;
        time.min++;
    }
    if (time.min >= 60) {
        time.min %= 60;
        time.hr++;
    }
    if (time.hr >= 12) {
        time.hr %= 12;
    }
}

function deg2rad(n) {
    return n * Math.PI / 180;
}

function calcPos(t, l) {
    return [centre + l * Math.cos(deg2rad(t - 90)), centre + l * Math.sin(deg2rad(t - 90))];
}


function drawClock() {
    if (cnt === 60) {
        init();
    }
    let xy = null;

    // 背景
    ctx.fillStyle = 'green';
    ctx.fillRect(0, 0, 300, 300);

    // 外枠の円を描く
    ctx.beginPath();
    ctx.arc(centre, centre, 150, 0, 2 * Math.PI);
    ctx.stroke();

    // 針(hr)
    ctx.beginPath();
    ctx.moveTo(centre, centre);
    xy = calcPos(time.hr * 30 + time.min / 240, time.hr_l);
    ctx.lineTo(xy[0], xy[1]);
    ctx.stroke();

    // 針(min)
    ctx.beginPath();
    ctx.moveTo(centre, centre);
    xy = calcPos(time.min * 6 + time.sec / 20, time.min_l);
    ctx.lineTo(xy[0], xy[1]);
    ctx.stroke();

    // 針(sec)
    ctx.beginPath();
    ctx.moveTo(centre, centre);
    xy = calcPos(time.sec * 6, time.sec_l);
    ctx.lineTo(xy[0], xy[1]);
    ctx.stroke();


    // 時間を進める
    advTime();
}

function main() {
    init();
    drawClock();
    setInterval(() => drawClock(), 1000);
}
main();