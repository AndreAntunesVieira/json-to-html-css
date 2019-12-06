const { src, dest, series, parallel } = require('gulp')
const ts = require('gulp-typescript')
const fs = require('fs')
const tsconfig = require('./tsconfig')
const packageJson = require('./package.json')
const uglify = require('gulp-uglify-es').default

const delay = (time) => new Promise(resolve => setTimeout(resolve, time))

async function typescript(){
  return src(['src/*.ts', 'src/.*.ts'])
    .pipe(ts(tsconfig.compilerOptions))
    .pipe(dest('dist'))
}

async function pack(cb){
  delete(packageJson.devDependencies)
  delete(packageJson.scripts)
  return fs.writeFile('./dist/package.json', JSON.stringify(packageJson), cb)
}

async function minify(){
  await delay(1000)
  return src(['dist/**/*.js', 'dist/**/.*.js'])
    .pipe(uglify())
    .pipe(dest('dist'))
}




exports.minify = minify
exports.default = series(parallel(typescript, pack), minify)
