var Lazyload = {};
Lazyload.install = function (Vue, options) {
    var opt = {
      elm:document.getElementsByTagName("img"),
      src:"imgsrc",	//给img标签加的属性为图片的地址
      threshold:100,	//提前加载距离
      opa:0.3,		    //图片初始透明度
      duration:1.5,	//过渡时间
      loadImg:''
    };
    for(var property in options){
        opt[property] = options[property];
    }
    Vue.prototype.$lazyload = function(options){
      new LazyLoad(options)
    };

    var LazyLoad=function(options){
      for(var property in options){
        opt[property] = options[property];
      }
      this.init();
    };
    LazyLoad.prototype= {
      init: function () {
        var self = this;
        self.lazyLoadImg();
        window.onscroll=function(){
          self.scrollTrigger(self.lazyLoadImg,self);
        }
      },
      lazyLoadImg: function () {
        var imgs= opt.elm;
        for (var i = 0; i < imgs.length; i++) {
          if (imgs[i].getAttribute(opt.src)) {
            imgs[i].style.opacity = opt.opa;
            imgs[i].style.filter = "alpha(opacity = " + opt.opa*100 + ")";
            if(opt.loadImg){
              imgs[i].src = opt.loadImg;
            }
            if ( this.getImgTop(imgs[i]) ) {
              imgs[i].src = imgs[i].getAttribute(opt.src);
              imgs[i].removeAttribute(opt.src);
              imgs[i].style.webkitTransition = 'opacity '+opt.duration+'s';
              imgs[i].style.opacity = 1;
              imgs[i].style.filter = "alpha(opacity = " + 100 + ")";
            }
          }
        }
      },
      getImgTop : function(img) {
        var offsetTop = img.getBoundingClientRect().top;
        //var offsetTop = img.offsetTop;
        var winHeight = document.documentElement.clientHeight || document.body.clientHeight;
        if (offsetTop < winHeight+opt.threshold) {
          return true;
        }
      },
      scrollTrigger: function (method, context) {
        var self = this;
        clearTimeout(method.timer);
        method.timer = setTimeout(function () {
          method.call(context);
        }, 100);
      }
    }
};
export default Lazyload
