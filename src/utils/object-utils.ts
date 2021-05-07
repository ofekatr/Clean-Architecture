const checkIfObjectHasFalseyValues =
    ((obj: object) => [...Object.values(obj)].some((val) => !val));

const ObjectUtils = {
    checkIfObjectHasFalseyValues,
}

export {
    checkIfObjectHasFalseyValues,
};

export default ObjectUtils;