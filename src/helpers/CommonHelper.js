const getTheValues = (array) => {
    for (const key in array) {
        if (array.hasOwnProperty(key)) {
            // Check if the length of the value is less than or equal to 2
            if (array[key].length <= 2) {
                return false; 
            }
        }
    }
    return true; 
}

export { getTheValues }