const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.config.js');

const _UGLIFY_OPTIONS = {
  compress: {
    arrows: false,
    booleans: false,
    collapse_vars: false,
    comparisons: false,
    computed_props: false,
    hoist_funs: false,
    hoist_props: false,
    hoist_vars: false,
    if_return: false,
    inline: false,
    join_vars: false,
    keep_infinity: true,
    loops: false,
    negate_iife: false,
    properties: false,
    reduce_funcs: false,
    reduce_vars: false,
    sequences: false,
    side_effects: false,
    switches: false,
    top_retain: false,
    toplevel: false,
    typeofs: false,
    unused: false,

    // Switch off all types of compression except those needed to convince
    // react-devtools that we're using a production build
    conditionals: true,
    dead_code: true,
    evaluate: true,
  },
  mangle: true,
};

const _PRODUCTION_PLUGINS = [
  new UglifyJsPlugin({
    sourceMap: false,
    uglifyOptions: _UGLIFY_OPTIONS
  })
];

module.exports = merge(common, {
  mode: 'production',
  devtool: 'eval',
  plugins: _PRODUCTION_PLUGINS
});