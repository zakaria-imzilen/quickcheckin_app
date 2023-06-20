export const isNumericString = (inputString) => {
    return !isNaN(inputString) && !isNaN(parseFloat(inputString));
};
