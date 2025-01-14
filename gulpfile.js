const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const obfuscate = require('gulp-obfuscate');
const imagemin = require('gulp-imagemin');

// Função para minificar JavaScript
function comprimeJS() {
    return gulp.src('./source/scripts/*.js')
        .pipe(uglify())
        .pipe(obfuscate())
        .pipe(gulp.dest('./build/scripts'));
}

// Função para compilar arquivos SCSS para CSS
function compilaSass() {
    return gulp.src('./source/styles/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./build/styles'));
}

// Função para otimizar imagens
function comprimeImagens() {
    return gulp.src('./source/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./build/images'));
}

exports.styles = compilaSass;

// Tarefa padrão que observa mudanças nos arquivos SCSS, imagens e scripts
exports.default = function() {
    gulp.watch('./source/styles/*.scss', gulp.series(compilaSass));
    gulp.watch('./source/scripts/*.js', gulp.series(comprimeJS));
    gulp.watch('./source/images/*', gulp.series(comprimeImagens));
};