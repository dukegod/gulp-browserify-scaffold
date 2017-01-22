## gulp-es6-sass-browserify

主要验证es6与css3在实际开发中支持度

目录说明：

- dist 作为开发目录
- src  源文件目录
- cdn  编译压缩上线目录


### javascript

使用es6书写代码

eslint 检测代码质量

### css

使用normalize初始化样式表.

使用以node-sass为班底的gulp-sass模块管理sass，以保证跨平台也能很好的支持

sass编写css，更好的处理继承

autoprefixer作为后期css处理

pages文件作为输出文件夹，按需求加载样式

### browserify

加载zepto

```
$ = require('zepto-browserify').$
Zepto = require('zepto-browserify').Zepto
```
SS

### Browsersync

作为静态服务器，并且实现各个端口的自动同步加载功能。

### gulp-sass

[gulp-sass](https://www.npmjs.com/package/gulp-sass)

### gulp-clean-css

处理css的压缩

### gulp-sourcemaps

给js css 添加sourcemaps支持

```
  va r sourcemaps = require('gulp-sourcemaps');
  gulp.task('sass', function () {
   return gulp.src('./sass/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./css'));
  });
```

### gulp-rev

文件名称修改

### pump  gulp-uglify

uglify 用来压缩js
pump用来收集error信息，并处理。




