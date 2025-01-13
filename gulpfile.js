const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const imagemin = require('gulp-imagemin');
const sourcemaps = require('gulp-sourcemaps');

// Função para compilar arquivos SCSS para CSS
function compilaSass() {
    return gulp.src('./source/styles/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./build/styles'));
}

// Função para otimizar imagens
function otimizaImagens() {
    return gulp.src('source/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('build/images'));
}

// Exporta as tarefas para que possam ser chamadas pelo Gulp
exports.sass = compilaSass;
exports.imagemin = otimizaImagens;
exports.comprimeImagens = comprimeImagens;

// Tarefa padrão que observa mudanças nos arquivos SCSS e imagens
exports.default = function() {
    gulp.watch('./source/styles/*.scss', { ignoreInitial: false }, gulp.series(compilaSass));
    gulp.watch('./source/images/*', { ignoreInitial: false }, gulp.series(otimizaImagens));
    gulp.watch('./source/images/*', { ignoreInitial: false }, gulp.series(comprimeImagens));
    console.log('Gulp está observando seus arquivos!');
};