import Ship from "./ship";
import { arrIncludesObj } from "./auxiliaryFucntions";

export const Board_Width  = 10;
export const Board_Height = 10;

export default class GameBoard {
    constructor() {
        this.unoccupiedCells = this.setInitialCellsAsEmpty();
    }

    setInitialCellsAsEmpty() {
        return (
            new Array(Board_Width * Board_Height)
            .fill(0)
            .map((_unusedParam, index) => ({
                x: Math.floor(index / Board_Width),
                y: index % Board_Width,
            }))
        );
    }

    ships = [];
    missedShots = [];

    getCondition() {
        return {
            ships: this.ships,
            missedShots: this.missedShots,
            unoccupiedCells: [...this.unoccupiedCells],
        }
    }

    placeShip(coordinates) {
        const emptyCoordinates = coordinates.filter((coords) => {
            return arrIncludesObj(this.unoccupiedCells, coords);
        });

        if(emptyCoordinates.length !== coordinates.length) {
            throw new Error("Coordinates invalid");
        }

        const ship = new Ship(coordinates.length);
        ship.coordinates = coordinates;
        this.ships.push(ship);

        coordinates.forEach(coords => {
            const coordinatesIndex = this.unoccupiedCells.findIndex(
                (cell) => cell.x === coords.x && cell.y === coords.y
            );
            this.unoccupiedCells.splice(coordinatesIndex, 1);
        });
    }

    receiveAttack(coordinates) {
        for (const ship of this.ships) {
            if(this.arrIncludesObj(ship.coordinates, coordinates)) {
                if(this.arrIncludesObj(ship.hitsTaken, coordinates)) return false;

                ship.hit(coordinates);
                return true;
            }
        } 

        if(arrIncludesObj(this.missedShots, coordinates)) {
            return false;
        }

        this.missedShots.push(coordinates);
        return true;
    }

    allShipsDestroyed() {
        let sunkShips = 0; //initially
        this.ships.forEach(ship => {
            if(ship.isSunk()) sunkShips++;
        });
        return  sunkShips === this.ships.length;
    }
    
}