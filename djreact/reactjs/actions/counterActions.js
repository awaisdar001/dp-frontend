export const INCREASE = "INCREASE"
export const SUBTRACT = "ADD"
export const MUL = "MUL"

export function increaseCounter() {
    return {type: INCREASE}
}

export function subtractCounter() {
    return {type: SUBTRACT}
}