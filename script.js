let idAnimationFrame;

const cheese = document.getElementById("cheese");
let isPressed = false;

const rat = document.getElementById("rat");

// Get positions
const ratPos = {
    left: rat.getBoundingClientRect().left,
    top: rat.getBoundingClientRect().top
};
const cheesePos = {
    left: cheese.getBoundingClientRect().left,
    top: cheese.getBoundingClientRect().top
};

cheese.addEventListener("mousedown", (ev) => {
    isPressed = true;
});

cheese.addEventListener("mouseup", (ev) => {
    isPressed = false;
});

document.addEventListener("mousemove", drag);

function drag(ev) {
    // Move cheese when it's pressed.
    if (isPressed) {
        cheese.style.top = ev.clientY + "px";
        cheese.style.left = ev.clientX + "px";
    }
}

// Get updated rat and cheese positions.
function updatePositions() {
    ratPos.left = rat.getBoundingClientRect().left;
    ratPos.top = rat.getBoundingClientRect().top;

    cheesePos.left = cheese.getBoundingClientRect().left;
    cheesePos.top = cheese.getBoundingClientRect().top;
}

/* 
    Move rat to the encounter of the cheese.

    axis: left or top, the axis to move.
*/
function moveRat(rat, axis) {
    // Movement speed
    const speed = 1.5;
    
    // Strategy to know if I should sum or subtract the speed.
    let sign = (cheesePos[axis] - ratPos[axis]);
    sign = sign / Math.abs(sign);

    // Round position
    if (sign > 0) {
        ratPos[axis] = Math.min(ratPos[axis] + (sign * speed), cheesePos[axis]);
    }
    else if (sign < 0) {
        ratPos[axis] = Math.max(ratPos[axis] + (sign * speed), cheesePos[axis]);
    }

    rat.style[axis] = ratPos[axis] + "px";
}

function draw() {
    idAnimationFrame = requestAnimationFrame(draw);
    let shouldRender = false;

    updatePositions();

    // Update X coordinate
    if (ratPos.left !== cheesePos.left) {
        moveRat(rat, "left");
        shouldRender = true;
    }
    // Update Y coordinate
    if (ratPos.top !== cheesePos.top) {
        moveRat(rat, "top");
        shouldRender = true;
    }

    if (!shouldRender) {
        cancelAnimationFrame(idAnimationFrame);
    }
}

idAnimationFrame = requestAnimationFrame(draw);