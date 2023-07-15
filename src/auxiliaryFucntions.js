// export function arrIncludesObj(coordsArray, searchCoordinates) {
//     return coordsArray.some(
//         (coord) => coord.x === searchCoordinates.x && coord.y === searchCoordinates.y
//     );
// }

function InRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}