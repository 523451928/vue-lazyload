# vue-lazyload
一款轻量的基于vue.js的图片懒加载vue插件
## 使用方法 
* 1、直接页面引用vue-lazyload.js(注意我自己使用的vue-cli,所以在js文件里面最后导出了Lazyload),页面引用需要删除export default Lazyload
* 2、用脚手架import js文件


html 部分：
```
<img :imgsrc="url"/>
```
JS 部分：

```
//vue-cli
import Lazyload from 'vue-lazyload.js'
Vue.use(Lazyload)

//页面直接引用
Vue.use(Lazyload)

this.$lazyload({
    elm:document.querySelector(),   //需要懒加载的图片集合 (默认所有图片)
    src:"imgsrc",	                //给img标签加的属性为图片的地址 (默认imgsrc)
    threshold:100,	                //提前加载距离  （默认100px）
    opa:0.3,		                //图片初始透明度 (默认0.3)
    duration:1.5,	                //过渡时间
    loadImg:''                      //加载之前显示的load图片的路径
})
```
#### 效果演示
[![demo](https://qr.api.cli.im/qr?data=http%253A%252F%252Fmp.hks360.com%253A13001%252Findex.html&level=H&transparent=false&bgcolor=%23ffffff&forecolor=%23000000&blockpixel=12&marginblock=1&logourl=&size=280&kid=cliim&key=f758b25a6761c1ebc049f9f652a01d8c)](http://mp.hks360.com:13001/app)

在PC上请使用Chrome浏览器请在设备模拟器下查看
## 注意事项
页面加载慢时获取不到dom元素 需要通过延时执行,代码如下,延时时间不限
```
mounted(){
  setTimeout(()=>{
    this.$lazyload({
      elm:document.getElementById('img-load').getElementsByTagName('img'),
      loadImg:""
    })
  },500)
}
```
