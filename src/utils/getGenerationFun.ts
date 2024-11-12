import functionNodes from './generList'
const map = new Map(Object.entries(functionNodes))

export const getGeneraFunNode = (key) => {
    return map.get(key)
}