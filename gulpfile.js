const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const imagemin = require('gulp-imagemin');
const sourcemaps = require('gulp-sourcemaps');
const newer = require('gulp-newer');
const uglify = require('gulp-uglify');
const plumber = require('gulp-plumber'); // Adicionado para tratamento de erros

// Função para compilar arquivos SCSS para CSS
function compilaSass() {
    return gulp.src('./source/styles/*.scss')
        .pipe(plumber()) // Adicionado para tratamento de erros
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./build/styles/*.css'));
}

// Função para otimizar imagens
function otimizaImagens() {
    return gulp.src('./source/images/*')
        .pipe(plumber()) // Adicionado para tratamento de erros
        .pipe(newer('./build/images')) // Verifica se há arquivos novos ou modificados
        .pipe(imagemin())
        .pipe(gulp.dest('./build/images'));
}

// Função para minificar JavaScript
function minificaJS() {
    return gulp.src('./source/scripts/*.js')
        .pipe(plumber()) // Adicionado para tratamento de erros
        .pipe(uglify())
        .pipe(gulp.dest('./build/scripts'));
}

// Exporta as tarefas para que possam ser chamadas pelo Gulp
exports.sass = compilaSass;
exports.imagemin = otimizaImagens;
exports.minifyjs = minificaJS;

// Tarefa padrão que observa mudanças nos arquivos SCSS, imagens e scripts
exports.default = function() {
    gulp.watch('./source/styles/*.scss', gulp.series(compilaSass));
    gulp.watch('./source/images/*', gulp.series(otimizaImagens));
    gulp.watch('./source/scripts/*.js', gulp.series(minificaJS));
};