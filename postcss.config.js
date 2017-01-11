const autoprefixer = require('autoprefixer');
const flexbugsFixes = require('postcss-flexbugs-fixes');

module.exports = {
    plugins: [
        autoprefixer,
        flexbugsFixes,
    ],
};
