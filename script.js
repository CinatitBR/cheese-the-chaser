let idAnimationFrame;

const cheese = document.getElementById("cheese");
let isPressed = false;

const mouse = document.getElementById("mouse");
mousePos = { left: 0, top: 0 };

cheese.addEventListener("mousedown", (ev) => {
    isPressed = true;
});

cheese.addEventListener("mouseup", (ev) => {
    isPressed = false;
});

document.addEventListener('mousemove', (ev) => {
    if (isPressed) {
        // Move cheese when it's pressed.
        cheese.style.top = ev.clientY + "px";
        cheese.style.left = ev.clientX + "px";
    }
});

function draw() {
    idAnimationFrame = requestAnimationFrame(draw);
    let shouldRender = false;
    const speed = 2;

    const mousePos = {
        left: mouse.getBoundingClientRect().left,
        top: mouse.getBoundingClientRect().top
    };
    const cheesePos = {
        left: cheese.getBoundingClientRect().left,
        top: cheese.getBoundingClientRect().top
    };

    // Update x coordinate
    if (mousePos.left !== cheesePos.left) {
        // Strategy to know if I should sum or subtract the speed.
        let sign = (cheesePos.left - mousePos.left);
        sign = sign / Math.abs(sign);

        mousePos.left += sign * speed;
        mouse.style.left = mousePos.left + "px";

        shouldRender = true;
    }
    // Update Y coordinate
    if (mousePos.top !== cheesePos.top) {
        // Strategy to know if I should sum or subtract the speed.
        let sign = (cheesePos.top - mousePos.top);
        sign = sign / Math.abs(sign);

        mousePos.top += sign * speed;
        mouse.style.top = mousePos.top + "px";

        shouldRender = true;
    }

    if (!shouldRender) {
        cancelAnimationFrame(idAnimationFrame);
    }
}

idAnimationFrame = requestAnimationFrame(draw);