const path = require('path');
const fs = require('fs');
const ROOT = path.resolve(__dirname, '..');
const EVENT = process.env.npm_lifecycle_event || '';

let root = path.join.bind(path, ROOT);
exports.root = root;

const METADATA = {
  AOT: process.env.AOT || false,
  isProd: process.env.ENV === 'production' || false,
  tsConfigPath: process.env.TS_CONFIG || 'tsconfig.json'
};

/**
 * Getting env file
 * @param suffix
 * @returns {*}
 */
function getEnvFile(suffix) {
  if (suffix && suffix[0] !== '.') {
    suffix = '.' + suffix;
  }

  if (suffix === null) {
    return;
  }

  let fileName = root(`src/environments/environment${suffix}.ts`);
  if (fs.existsSync(fileName)) {
    return fileName;
  } else if (fs.existsSync(fileName = root('src/environments/environment.ts'))) {
    console.warn(`Could not find environment file with suffix ${suffix}, loading default environment file`);
    return fileName;
  } else {
    throw new Error('Environment file not found.')
  }
}

/**
 * Checking process flag exists
 * @param flag
 * @returns {boolean}
 */
function hasProcessFlag(flag) {
  return process.argv.join('').indexOf(flag) > -1;
}

/**
 * Checking npm flag exists
 * @param flag
 * @returns {boolean}
 */
function hasNpmFlag(flag) {
  return EVENT.includes(flag);
}

/**
 * Generate uglify options
 * @param supportES2015
 * @returns {{ecma: number, warnings: boolean, ie8: boolean, mangle: boolean, compress: {pure_getters: boolean, passes: number}, output: {ascii_only: boolean, comments: boolean}}}
 */
function getUglifyOptions (supportES2015) {
  const uglifyCompressOptions = {
    pure_getters: true, /* buildOptimizer */
    // PURE comments work best with 3 passes.
    // See https://github.com/webpack/webpack/issues/2899#issuecomment-317425926.
    passes: 3         /* buildOptimizer */
  };

  return {
    ecma: supportES2015 ? 6 : 5,
    warnings: false,    // TODO verbose based on option?
    ie8: false,
    mangle: true,
    compress: uglifyCompressOptions,
    output: {
      ascii_only: true,
      comments: false
    }
  };
}

/**
 * Generate ngc config
 * @param prod
 * @param aot
 * @returns {{loaders: [null,null], plugin: {skipCodeGeneration: boolean, sourceMap: boolean}}}
 */
function ngcWebpackSetup(prod, aot) {
  const buildOptimizer = prod;
  const sourceMap = true; // TODO: apply based on tsconfig value?
  const ngcWebpackPluginOptions = {
    skipCodeGeneration: !aot,
    sourceMap
  };

  const environment = getEnvFile('prod');
  console.log(environment);
  if (environment) {
    console.log(root('src/environments/environment.ts'));
    ngcWebpackPluginOptions.hostReplacementPaths = {
      [root('src/environments/environment.ts')]: environment
    }
  }

  if (!prod) {
    // Force commonjs module format for TS on dev watch builds.
    ngcWebpackPluginOptions.compilerOptions = {
      module: 'commonjs'
    };
  }

  const buildOptimizerLoader = {
    loader: '@angular-devkit/build-optimizer/webpack-loader',
    options: {
      sourceMap
    }
  };

  const loaders = [
    {
      test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
      use: aot && buildOptimizer ? [ '@ngtools/webpack' ] : [ '@ngtools/webpack' ]
    },
    ...buildOptimizer
      ? [ { test: /\.js$/, use: [ buildOptimizerLoader ] } ]
      : []
  ];

  return {
    loaders,
    plugin: ngcWebpackPluginOptions
  };
}

exports.METADATA = METADATA;
exports.hasProcessFlag = hasProcessFlag;
exports.hasNpmFlag = hasNpmFlag;
exports.getUglifyOptions = getUglifyOptions;
exports.ngcWebpackSetup = ngcWebpackSetup;
