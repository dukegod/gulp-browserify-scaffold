## gulp-es6-sass-browserify

主要验证es6与css3在实际开发中支持度

目录说明：

- dist 作为开发目录
- src  源文件目录
- cdn  编译压缩上线目录


## javascript

使用es6书写代码

jshint 检测代码质量

## css

使用normalize初始化样式表.

sass 编写css，更好的处理继承

autoprefixer作为后期css处理

pages文件作为输出文件夹，按需求加载样式

## browserify

加载zepto

1;

```
$ = require('zepto-browserify').$
Zepto = require('zepto-browserify').Zepto
```

2;

直接把zeptojs放在lib下
