module.exports = {
    awaiter: delay => {
        return new Promise(function (resolve) {
            setTimeout(resolve, delay);
        });
    },
};
