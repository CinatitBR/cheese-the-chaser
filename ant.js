export class Ant {
    // HTML node related to this object.
    node;

    constructor(left, top) {
        // Create and append html node
        this.node = document.createElement("div");
        this.node.classList.add("ant");

        document.body.appendChild(this.node);
        this.setPosition(left, top);
    }

    // Return DOMRect top and left positions.
    getPosition() {
        const left = this.node.getBoundingClientRect().left;
        const top = this.node.getBoundingClientRect().top;

        return { left, top }
    }

    setPosition(left, top) {
        this.node.style.left = left + "px";
        this.node.style.top = top + "px";
    }
}
