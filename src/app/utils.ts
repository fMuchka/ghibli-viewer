// Multi purpose functions, that can be used inside multiple different scripts

export function convertToStarValue( score : number ) : number {
    return Math.round(score * 10) / 100 / 2
}