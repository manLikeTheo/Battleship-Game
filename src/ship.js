export default class Ship {
    constructor(length) {
        if(length === undefined) throw new Error("Argument missing!");

        if(typeof length !== "number || length < 1") {
            throw new Error("Enter valid argument")
        }

        this.length = length;
    }

    coordinates = null;
    hitsTaken = [];

    hit(coordinates) {
        this.hitsTaken.push(coordinates);
    }

    isSunk() {
        return this.hitsTaken.length === this.length;
    }
}