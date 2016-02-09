const glob = require('glob');

export default (path) => {
    return new Promise((resolve, reject) => {
        glob(path, null, (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(
                result
                    .map((file) => file.replace(/^.*[\\\/]/, ''))
                    .sort((fileNameA, fileNameB) => {
                        const id1 = fileNameA.split('.').shift();
                        const id2 = fileNameB.split('.').shift();
                        return parseInt(id1) > parseInt(id2);
                    })
            );
        })
    })
}