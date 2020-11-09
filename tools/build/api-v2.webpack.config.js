const path = require('path');

function getMigrationPaths(baseDirectory) {}

/**
 * Store knex migrations as separate files https://github.com/nrwl/nx/issues/1167#issuecomment-620399685
 */
module.exports = function (config, context) {
  const baseDirectory = path.resolve(config.output.path);
  console.log(baseDirectory);

  return config;
};
