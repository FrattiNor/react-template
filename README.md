# Ant Design Pro

This project is created by 朱晨皓 at Thu Apr 02 2020 10:31:16 GMT+0800 (中国标准时间)

## Environment Prepare

Install `node_modules`:

```bash
yarn
```

## Provided Scripts

Ant Design Pro provides some useful script to help you quick start and build with web project, code style check and test.

Scripts provided in `package.json`. It's safe to modify or add additional script:

### Start project

```bash
yarn start
```

### Build project

```bash
yarn build
```

### Check code style

```bash
yarn lint
```

You can also use script to auto fix some lint error:

```bash
yarn lint:fix
```

### Test code

```bash
yarn test
```

### 使用方法

#### /config/config.ts

routes 路径 （需配置）

#### /config/defaultSettings.ts

默认设置（包括 title 项目名、primaryColor 默认按钮背景等颜色）

#### /config/proxy.ts

代理（本地代理到服务器，已跨域）

#### /mock/\*.ts

模拟接口（只能前端本地访问）

#### /src/assets/

资源（图片、svg 文件）

#### /src/components/

组件库（自定义组件，不允许放第三方）

-   GlobalHeader 头部页面

-   HeaderDropdown 头部页面下拉部分

-   SelectLang 头部页面选择语言

-   RoleButton 带权限按钮（用法如下）

```javascript
import Button from '@/components/RoleButton';
render() {
  return (
    <Button role="company.user.update">修改</Button>
  )
}
```

#### /src/layouts/UserLayouts.tsx

登录页面

#### /src/layouts/BasicLayout.tsx

界面外壳（路由、权限、用户信息获取位置）

#### /src/locales/

国际化（现只支持 en-US 美国、zh-CN 中国）

#### /src/modals/

模块（获取接口数据、储存数据、修改数据位置）

#### /src/pages/

基本页面

#### /src/services/

接口请求位置

#### /src/styles/

样式储存位置

#### /src/utils/

公共函数

#### /src/global.less

全局样式（antd 修改的样式也在里面写）

#### /src/typings.d.ts

typescript 公共声明文件

# css 代码规范

**选择器**

-   选择器命名
    1. 使用统一的命名规则，小驼峰命名，例如 myLIttleTitle
    2. 命名注意缩写，避免与 id 重名
    3. 严禁使用直接样式效果，比如.red,.fontBold
    4. 严禁使用 1 2 3 等序号命名
-   选择器选择原则基本的选择器中，尽量使用类选择器；复杂选择器中，尽量少使用层次、属性的相关选择器
-   样式重用样式重复可以一定程度的避免，用类样式来提炼公共样式，建议多用样式的预处理，比如 less。基本使用类选择器实现重用最简单实用
-   合理的避免 id 的使用原因：
    1. 一个是 id 修饰权重比较高，不容易被 class 修改重定义
    2. id 一般被用来定义特定模块的。如果该模块是可重用的，或者不具有特殊意义的不建议使用
-   非主流选择器主要包括：伪类选择器，结构选择器，伪元素，属性选择器，语言选择器等。基于兼容性考虑，建议慎用。
-   选择器层级 层级关系确定在 3 层以内，去除不必要的层级关系，简化 dom 结构或者样式组件结构。 **样式分类**
-   全局样式顾名思义，没有任何限制条件的样式，可以任何位置使用并达到其显示效果。如果可能有样式代码冲突的，建议写在样式组合中最后。定义全局样式的时候，注意样式污染的问题。一般建议用.c 来区分。
-   布局样式一般用于页面布局，我们经常会把页面布局和模块混合起来，或者根本就不区分。这实际是因为我们对样式理解不够深刻。实际。从视图分析，很多模块在宽高以及整体布局上都是基于整体布局的。而一些整体布局又是可以重用的，所以这部分建议单独分出来，提高开发效率。一般建议用.g 来区分。
-   模块样式以模块的思维去写样式代码，按照层级关系依次展开样式，保证模块清晰同时使得一些样式名称可复用，比如 title,price 等。其中模块样式顶级也可以理解为命名空间，模块子样式可以追加模块样式前缀，比如 headerNav。模块样式是样式代码中占据比例最多的部分，针对具体样式，希望既能做到针对业务，又能提炼出可复用、耦合度低的优质模块。一般建议用.m 来区分。
-   组件样式页面中总有一部分常规组件是我们经常用的，定义好他们对我们开发工作有事半功倍的效果。这些组件常见的有，按钮，单选框，多选框，下拉框，时间选择控件等。一般建议用.u 来区分。
-   功能样式（交互样式）有些页面中的元素是有额外的含义的，涉及到这类样式时，有时有特定的交互，或者功能，或者内容，我们针对这部分定义为功能样式，比如删除，查看详情，增加，搜索，这些在涉及具体功能时追加的效果，我们会写在功能样式中。一般建议用.f 来区分。
-   皮肤样式 任何一个网站或者页面都有其布局思想，在这个整体的布局当中，颜色自然是不可缺少的，针对主色，交互色，响应颜色，配色等，我们都会把这一类归到皮肤样式中。一般建议用.s 来区分。 **样式优化**
-   合理利用继承和默认
    1. 可继承的样式如果是正确的，不用重写；如果是不对的，纠正；
    2. 任何样式都有默认值。或者是继承来的默认值，针对默认值要清楚，决定是否调整
-   抽离公共样式
    1. 代码中有超过 2 个类超过 3 行以上公用代码，建议抽离公共样式到公共区或者提炼公共样式
-   复合属性缩写比如 font,border,margin,padding,background 等
-   减少层级关系层级关系越多，代码量越大，同时访问越慢
-   使用高效能的选择器多使用 class 选择器，css 的查询顺序为从右向左，所以最后一个选择器基本决定了你第一次匹配得到的整体数量。
-   重绘与重排 影响标签显示样式的叫重绘；影响标签大小-盒模型，位置关系的称为重排。尽量减少这两种，如果有需要，优先选择用重绘代替重排。 **书写规范** 参考 global.less

1. 规则完成一组之后换行，
2. 选择器开始语法之前大括号前面加空格。
3. 括号单独放一行，每行样式一行，每一行添加分号，最后一行也加。
4. 每个样式属性值前添加空格而属性名之后不加空格。
5. 数值为 0 的不用加单位，数值小于 1 的前面的 0 可以省略。
6. 没有边框的时候写 border:none
7. 减少使用低性能的选择器，比如标签，\*，多层
8. 除了颜色以及字体外，所有的代码小写，如果有引号使用单引号
9. 字体名称请映射成对应的英文名
10. 背景图片请合理使用 csssprites，按照模块、业务、页面来划分均可
11. css 背景图片的文件类型，请按照以下原则来保存:如果背景图片有动画，则保存成 gif,如果没有动画，也没有半透明效果，则保存成 png-8,如果有半透明效果，则保存成 png-24
12. 清除浮动采用样式，不使用增加空标签的方式
13. 避免过小的背景图片平铺
14. 减少使用 important
15. 小驼峰命名，例如 myLIttleTitle **编写顺序**
16. 显示属性 display/list-style/position/float/clear
17. 盒子模型 width/height/margin/padding/border
18. 背景 background
19. 行高 文本属性其他 line-height,color/font/text-decoration/text-align/, text-indent/vertical-align/white-space/content, cursor/z-index/zoom
20. css3 属性 transform/transition/animation/box-shadow/border-radius
21. 链接的样式请严格按照如下顺序添加 a:link -> a:visited -> a:hover -> a:active 注释规范注释长度要求：注释中的每一行长度不超过 40 个汉字，或者 80 个英文字符

-   文件顶部注释 /\*

*   @description: xxxxx 中文说明
*   @author: zhifu.wang
*   @update: zhifu.wang (2012-10-17 18:32) \*/

-   模块注释，模块注释必须单独写在一行 /_ module: module1 by zhifu.wang _/
-   单行注释，单行注释可以写在单独一行，也可以写在行尾 /_ this is a short comment _/
-   多行注释 :多行注释必须写在单独行内 /\*

*   this is comment line 1.
*   this is comment line 2. \*/

-   特殊注释 :用于标注修改、待办等信息 /_ TODO: xxxx by zhifu.wang 2012-10-18 18:32 _/ /_ BUGFIX: xxxx by zhifu.wang 2012-10-18 18:32 _/ 浏览器 hack
-   浏览器的 hack ：能少用就少用 hack ,浏览器的 hack 如下，注意按照一定的顺序书写： -webkit-,-moz-,-o-,-ms-
