utility = {};

utility.getAllIndexes = (arr, val) => {
    let indexes = [], i;
    for (i = 0; i < arr.length; i++)
        if (arr[i] === val)
            indexes.push(i);
    return indexes;
};

utility.includes = (query, word) => {
    const before = query.indexOf(word) - 1;
    const after = query.indexOf(word) + word.length;
    return (before === -1 || query[before] === " ") && (after === query.length + 1 || query[after] === " ");
};

module.exports = utility;