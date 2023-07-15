export function arrIncludesObj(coordsArray, searchCoordinates) {
    return coordsArray.some(
        (coord) => coord.x === searchCoordinates.x && coord.y === searchCoordinates.y
    );
}