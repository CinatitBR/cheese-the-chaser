let idAnimationFrame;
const SPEED = 1; // Movement speed

const cheese = document.getElementById("cheese");
let isPressed = false;

const rat = document.getElementById("rat");
const ant = document.querySelector(".ant");

// Get positions
const ratPos = {
    left: rat.getBoundingClientRect().left,
    top: rat.getBoundingClientRect().top
};
const cheesePos = {
    left: cheese.getBoundingClientRect().left,
    top: cheese.getBoundingClientRect().top
};
const antPos = {
    left: ant.getBoundingClientRect().left,
    top: ant.getBoundingClientRect().top
};

rat.position = ratPos;
ant.position = antPos;
cheese.position = cheesePos;

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
    // Strategy to know if I should sum or subtract the speed.
    let sign = (cheesePos[axis] - ratPos[axis]);
    sign = sign / Math.abs(sign);

    // Round position
    if (sign > 0) {
        ratPos[axis] = Math.min(ratPos[axis] + (sign * SPEED), cheesePos[axis]);
    }
    else if (sign < 0) {
        ratPos[axis] = Math.max(ratPos[axis] + (sign * SPEED), cheesePos[axis]);
    }

    rat.style[axis] = ratPos[axis] + "px";
}


/*
    Makes ob1 go in the direction of obj2.

    axis: left or top, the axis to move.
*/
function chase(obj1, obj2, axis) {
    const speed = 0.8;

    // Strategy to know if I should sum or subtract the speed.
    let sign = (obj2.position[axis] - obj1.position[axis]);
    sign = sign / Math.abs(sign);

    // Round position
    if (sign > 0) {
        obj1.position[axis] = Math.min(
            obj1.position[axis] + (sign * speed), 
            obj2.position[axis]
        );
    }
    else if (sign < 0) {
        obj1.position[axis] = Math.max(
            obj1.position[axis] + (sign * speed), 
            obj2.position[axis]
        );
    }

    obj1.style[axis] = obj1.position[axis] + "px";
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

    // Update X coordinate
    if (antPos.left !== ratPos.left) {
        chase(ant, rat, "left");
        shouldRender = true;
    }
    // Update Y coordinate
    if (antPos.top !== ratPos.top) {
        chase(ant, rat, "top");
        shouldRender = true;
    }

    console.log(ant.position);

    if (!shouldRender) {
        cancelAnimationFrame(idAnimationFrame);
    }
}

idAnimationFrame = requestAnimationFrame(draw);