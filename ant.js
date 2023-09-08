export class Ant {
    // HTML node related to this object.
    node;

    constructor() {
        // Create and append html node
        this.node = document.createElement("div");
        this.node.classList.add("ant");

        document.body.appendChild(this.node);
    }

    // Return DOMRect top and left positions.
    getPosition() {
        const left = this.node.getBoundingClientRect().left;
        const top = this.node.getBoundingClientRect().top;

        return { left, top }
    }
}
