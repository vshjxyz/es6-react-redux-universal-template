const glob = require('glob');

export default (path) => {
    return new Promise((resolve, reject) => {
        glob(path, null, (err, result) => {
            if (err) {
                return reject(err);
            }

            resolve(
                result.map((file) => file.replace(/^.*[\\\/]/, ''))
            );
        })
    })
}