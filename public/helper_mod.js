export const writeInRoman = (x, numString = '') => {
    let romanNum = numString
    if (x > 9) {
        romanNum += 'X'
        return writeInRoman(x - 10, romanNum)
    } else if (x > 8) {
        romanNum += 'IX'
        return writeInRoman(x - 9, romanNum)
    } else if (x > 4) {
        romanNum += 'V'
        return writeInRoman(x - 5, romanNum)
    } else if (x > 3) {
        romanNum += 'IV'
        return writeInRoman(x - 4, romanNum)
    } else if (x > 0) {
        romanNum += 'I'
        return writeInRoman(x - 1, romanNum)
    }
    return romanNum
}