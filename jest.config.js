/** @type {import('jest').Config} */
const config = {
    verbose: true,
    transform: {
        "^.+\\.jsx?$": "babel-jest"
    },
    transformIgnorePatterns: ["/node_modules/(?!nanoid)"]
};

module.exports = config;