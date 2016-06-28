(function(){
  var LoadingAnimation = {
    initialized : false,
    wrap:null,
    wrapOuter:null,
    wrapInner:null,
    line:null,
    bgLeft:null,
    bgRight:null,
    circleBoy:null,
    circleGirl:null,
    circleMix:null,
    text:null,
    texts:[],
    cross:null,
    progress:0,
    init : function(){
      if(this.initialized)return;
      this.initialized = true;
      var _this = this;
      this.wrap = $('.loading-wrap');
      this.wrapOuter = $('.loading-outer');
      this.wrapInner = $('.loading-inner');
      this.bgLeft = this.wrap.find('.wrap-half-left');
      this.bgRight = this.wrap.find('.wrap-half-right');
      this.lineLeft  = this.bgLeft.find('.line');
      this.lineRight = this.bgRight.find('.line');
      this.circleBoy = this.wrap.find('.circle-boy');
      this.circleGirl = this.wrap.find('.circle-girl');
      this.circleMix = this.wrap.find('.circle-mix');
      this.cross = this.wrap.find('.cross');
      this.text = this.wrap.find('.txt');
      // TweenLite.set(this.text,{x:'100%'});q
      this.cross.hide();
      var _this = this;
      this.text.find('span').each(function(i){
        var span = $(this);
        _this.texts[i] = span;
        var y = (i%2==0?100:-100)+'0%';
        span.oldY = y;
        TweenLite.set(span,{y:y});
      });

      TweenLite.set(this.circleBoy,{scale:0});
      TweenLite.set(this.circleGirl,{scale:0});
      // TweenLite.set(this.wrapOuter,{transformOrigin:'50% 50%'});
      for(var i=0; i<this.texts.length; i++){
        var l = this.texts[i];
        // TweenLite.to(l,0.5,{delay:i*0.05,opacity:1,ease:Power4.easeInOut});
      }
    },
    start : function(callBack){
      TweenLite.set(this.wrapInner,{opacity:1});
      TweenLite.to(this.circleBoy,1.5,{delay:0.3,scale:1,ease:Elastic.easeOut});
      TweenLite.to(this.circleGirl,1.5,{delay:0.3,scale:1,ease:Elastic.easeOut,onComplete:function(){
        callBack();
      }});
    },
    loading : function(p){
      this.progress = Math.floor(p*100);
      TweenLite.set(this.circleBoy,{left:100*p*p+'%',x:-50*p+'%'});
      TweenLite.set(this.circleGirl,{right:100*p*p+'%',x:50*p+'%'});
      this.circleBoy.find('.progress').text(this.progress);
      this.circleGirl.find('.progress').text(this.progress);
    },
    loaded : function(callBack){
      TweenLite.to(this.circleBoy.find('.progress'),1,{ease:Power4.easeInOut});
      TweenLite.to(this.circleGirl.find('.progress'),1,{ease:Power4.easeInOut});
      TweenLite.to(this.circleMix,1,{opacity:1,ease:Power4.easeInOut});

      for(var i=0; i<this.texts.length; i++){
        var w = this.texts[i];
        TweenLite.to(w,1,{delay:i*0.1,y:'0%',ease:Power4.easeInOut});
      }

      for(var i=0; i<this.texts.length; i++){
        var w = this.texts[i],
            delay = i*0.1+2;
        TweenLite.to(w,1,{delay:delay,y:w.oldY,ease:Power4.easeInOut});
      }

      var _this = this;

      TweenLite.to(this.circleBoy,1,{delay:delay-1.05,x:'100%',ease:Power4.easeInOut});
      TweenLite.to(this.circleGirl,1,{delay:delay-1.05,x:'-100%',ease:Power4.easeInOut});
      TweenLite.to(this.lineLeft,1,{delay:delay-1,x:'50%',ease:Expo.easeInOut});
      TweenLite.to(this.lineRight,1,{delay:delay-1,x:'-50%',ease:Expo.easeInOut});
      TweenLite.to(this.bgLeft,1,{delay:delay+0.2,x:'-100%',opacity:1,ease:Power4.easeInOut});
      TweenLite.to(this.bgRight,1,{delay:delay+0.2,x:'100%',opacity:1,ease:Power4.easeInOut,onComplete:function(){
        _this.wrap.remove();
        callBack();
      }});
    }
  };
  module.exports = LoadingAnimation;
}).call(this);