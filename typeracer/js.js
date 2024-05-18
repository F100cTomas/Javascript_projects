let sentence = "A spectre is haunting Europe - the spectre of communism. All the powers of old Europe have entered into a holy alliance to exorcise this spectre: Pope and Tsar, Metternich and Guizot, French Radicals and German police-spies.";
let space = '<span class = "invisible">X</span>';
let left = sentence;
let done = "";
let is_timer_running = false;
let time = 0;
let timerx;

window.addEventListener('load', () => {
    document.getElementById("left").innerHTML = left.replace(" ", space);
});

function keydown(typebox) {
    add_text(typebox);
}

function keyup(typebox) {
    add_text(typebox);
}

function add_text(typebox) {
    if (!is_timer_running) {
        is_timer_running = true;
        timerx = setInterval(timer, 1000);
    }
    typed = typebox.value;
    typebox.value = "";
    Array.from(typed).forEach(element => {
        if (element == left[0]) {
            if (element == " ") {
                done += space;
            }else {
                done += element;
            }
            left = left.substring(1);
        }
    });
    document.getElementById("left").innerHTML = left.replace(" ", space);
    document.getElementById("done").innerHTML = done;
    document.getElementById("typed").innerHTML = done;

    if (left.length == 0) {
        clearInterval(timerx)
    }
}

function timer() {
    time += 1;
    document.getElementById("time").innerHTML = time;
}