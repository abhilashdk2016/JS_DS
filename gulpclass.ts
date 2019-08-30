import { Gulpclass, Task, SequenceTask } from 'gulpclass/Decorators';
import { SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS } from 'constants';
import { watch } from 'fs';
let del = require('del');
let browserify = require('browserify');
let browserSync = require('browser-sync');
let concat = require('gulp-concat');
let buffer = require('vinyl-buffer');
let gulp = require('gulp');
let imageop = require('gulp-image-optimization');
// const jasmineBrowser = require('gulp-jasmine-browser');
let karma = require('gulp-karma');
let transform = require('vinyl-transform');
let uglify = require('gulp-uglify');
let sourcemaps = require('gulp-sourcemaps');
let ts = require('gulp-typescript');
//let tslint = require('gulp-tslint');
let tsify = require('tsify');
let sass = require('gulp-sass');
let source = require('vinyl-source-stream');
let tsProject: any;
const server = browserSync.create();
const PATHS = {
    bundleJSMainFile: './temp/src/js/index.js',
    bundleTestMainFile: ['./temp/test/js/main.test.js'],
    tsFiles: './src/**/*.ts',
    expressTsFiles: './src/ts/express_ts/**/*.ts',
    expressTsRoutes: './src/ts/express_ts/routes/*.ts',
    tsTestFiles: './test/**/*.test.ts',
    bundleJSOutDir: './dist/src/',
    bundleTestOutDir: './dist/test/',
    tsTempDir:'./temp/src/js',
    expressTsDistDir: './dist/src/expressJs',
    tsTempTestDir:'./temp/test/js',
    cssFiles: './css/css/*.css',
    cssTempFiles: './temp/css/*.css',
    scssFiles: './css/scss/*.scss',
    bootStrapSCSS: './node_modules/bootstrap/scss/bootstrap.scss',
    imageFiles: './images/*.{jpg,png,gif,JPG,PNG,GIF}',
    cssTempDir: './temp/css',
    stylesOutDir: './dist/css/',
    imageOutDir: './dist/img/',
    sharedSrcDir: './src/shared/**/*',
    sharedDestDir: './dist/shared'
}

@Gulpclass()
export class GulpFile {
    

    @Task('clean-dist')
    clearInterval(cb: Function) {
        return del(["./dist/**"], cb);
    }

    @Task('images')
    images(cb: Function) {
        return gulp.src(PATHS.imageFiles)
               /*.pipe(imageop({
                optimizationLevel: 5,
                progressive: true,
                interlaced: true
               }))*/
               .pipe(gulp.dest(PATHS.imageOutDir));
    }

    // Process Plain CSS
    @Task('css')
    css(cb : Function) {
        return gulp.src(PATHS.cssFiles)
           .pipe(gulp.dest(PATHS.cssTempDir));
    }

    // Process SCSS Files
    @Task('sass')
    sass(cb: Function) {
        return gulp.src([PATHS.bootStrapSCSS,PATHS.scssFiles])
           .pipe(sass())
           .pipe(gulp.dest(PATHS.cssTempDir));
    }

    // Bundle CSS
    @Task('bundle:css')
    bundlecss(cb: Function) {
        return gulp.src(PATHS.cssTempFiles)
               .pipe(concat('app.css'))
               .pipe(gulp.dest(PATHS.stylesOutDir));
    }

    // Process Typescript Files
    @Task('ts')
    ts(cb: Function) {
        if(!tsProject) {
            tsProject = ts.createProject('tsconfig.json');
        }
        return gulp.src(PATHS.tsFiles)
                .pipe(tsProject())
                .js.pipe(gulp.dest(PATHS.tsTempDir));
    }

    @Task('ts:express')
    tsExpress(cb: Function) {
        return gulp.src(PATHS.expressTsFiles)
                .pipe(tsProject())
                .js.pipe(gulp.dest(PATHS.expressTsDistDir));
    }

    @Task('ts:tests')
    tsTests(cb: Function) {
        return gulp.src(PATHS.tsTestFiles)
                .pipe(tsProject())
                .js.pipe(gulp.dest(PATHS.tsTempTestDir));
    }

    //Bundle JS
    @Task('bundle:js')
    bundleJs(cb: Function) {
        var b = browserify({ entries: PATHS.bundleJSMainFile, debug: true });
  
        return b.bundle()
               .pipe(source('DataStructureAlgorithms.js'))
               .pipe(buffer())
               .pipe(sourcemaps.init({loadMaps:true}))
               .pipe(uglify())
               .pipe(sourcemaps.write('./'))
               .pipe(gulp.dest(PATHS.bundleJSOutDir));
    }

    @Task('bundle:tests')
    bundleTests(cb: Function) {
        var b = browserify({ entries: PATHS.bundleTestMainFile, debug: true });
        return b.bundle()
            .pipe(source('bundle.test.js'))
            .pipe(buffer())
            .pipe(sourcemaps.init({loadMaps:true}))
            .pipe(uglify())
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest(PATHS.bundleTestOutDir));
    }

    // Watch Files
    @Task('watch:ts')
    watchTs(cb: Function) {
        return gulp.watch([PATHS.tsFiles, PATHS.expressTsFiles], gulp.series('ts','ts:tests', 'bundle:js', 'reload'));
        // gulp.watch(PATHS.tsTestFiles, gulp.series('ts:tests','bundle:test', browserSync.reload));
    }

    @Task('watch:css')
    watchCSS(cb: Function) {
        return gulp.watch(PATHS.scssFiles, gulp.series('sass','bundle:css', 'reload'));
        
    }

    @Task('watch:scss')
    watchSCSS(cb: Function) {
        return gulp.watch(PATHS.cssFiles, gulp.series('css','bundle:css', 'reload'));
    }

    @Task('watch:images')
    watchImages(cb: Function) {
        return gulp.watch(PATHS.imageFiles,gulp.series('images', 'reload'));
    }

    @Task('browser-sync')
    browserSync(cb: Function) {
        server.init({
            server: {
                baseDir: "./dist"
            }
        });
        cb();
    }

    @Task('reload')
    reload(cb: Function) {
        server.reload();
        cb();
      }

    @Task('copy:html')
    copyHtml(cb: Function) {
        return gulp.src("./*html")
        .pipe(gulp.dest("dist"));
    }

    @Task('watch:html')
    watchHtml(cb: Function) {
        return gulp.watch(['*.html'], gulp.series('copy:html', 'reload'));
    }

    @Task('watch:shared')
    watchShared(cb: Function) {
        return gulp.watch([PATHS.sharedSrcDir], gulp.series('copy:shared', 'reload'));
    }

    @Task('copy:shared') 
    copyShared(cb: Function) {
        return gulp.src(PATHS.sharedSrcDir)
        .pipe(gulp.dest(PATHS.sharedDestDir));
    }

    @SequenceTask()
    default() {
        return ['clean-dist', [
                ['images','css','sass'],
                ['ts','ts:tests'],
                ['bundle:css','bundle:js'],
                ['copy:html','copy:shared'],
                ['browser-sync'],
                gulp.parallel('watch:images','watch:css','watch:scss','watch:ts','watch:html','watch:shared')
            ]
        ];
    }
}