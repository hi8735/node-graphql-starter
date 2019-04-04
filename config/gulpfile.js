const {
  dest,
  parallel,
  src,
} = require('gulp');
const ts = require('gulp-typescript');

const sourcePath = '../src';
const outputPath = '../dist';
const graphqlPath = 'graphql/schema';
const tsProject = ts.createProject('tsconfig.json');

const copyGraphql = async () =>
  src(`${sourcePath}/${graphqlPath}/*.graphql`)
  .pipe(dest(`${outputPath}/${graphqlPath}`));

const runTsc = async () =>
  tsProject
  .src()
  .pipe(tsProject())
  .js
  .pipe(dest(outputPath));

exports.default = parallel(runTsc, copyGraphql);
