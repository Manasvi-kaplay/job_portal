jQuery(function() {
   //Automatic slide delay. Set to 0 to disable.
   var autoSlideDelay = 4;
   
   var num = jQuery('.slider .scroller .slide').length;
   var scroller = jQuery('.slider .scroller');
   var slideWidth = jQuery('.slider .slide').width();
   scroller.css('width', num*slideWidth);
   var sliderHolder = jQuery('.slider-bar-inner');
   sliderHolder.append('<a href="javascript:void(null)" class="slider-handle"></a>');
   var holderWidth = sliderHolder.width();
   var handle = jQuery(sliderHolder).find('.slider-handle');
   var handleWidth = handle.width();
   var cSlide = 0;
   var intId = null;

   for(var i=0; i<num; i++)
   {
        var tick = jQuery('<span class="slider-tick"></span>');
        var offset = i/(num-1);
        offset = offset*(holderWidth-i*2-handleWidth) + handleWidth/2
        tick.css("left", offset+"px");
        tick.appendTo(sliderHolder);
   }
   sliderHolder.find(".slider-tick").css({
       "position":"relative",
       "display":"block",
       "float":"left"
   })

   handle.draggable({
        addClasses:false,
        axis:"x",
        containment:"parent",
        stop:function()
        {
            pos = Number(handle.css('left').replace('px', ''));
            pos = pos/(holderWidth-handleWidth);
            pos = Math.round(pos*(num-1));

            cSlide = pos;
            resetAuto();
            slide(pos);
            slideHandle(pos);
        }
   });

   function slideHandle(val)
   {
       var offset = val/(num-1)*(holderWidth-handleWidth);
       handle.stop();
       handle.animate({'left':offset+'px'}, 'normal');
   }

   function slide(val)
   {
       var offset = val*slideWidth;
       scroller.stop();
       scroller.animate({'left':-offset+'px'}, 'normal');
   }

   function moveSlide()
   {
       if(cSlide < num-1) cSlide++;
       else cSlide = 0;
       
       slide(cSlide);
       slideHandle(cSlide);
   }

   function initAuto()
   {
       if(autoSlideDelay > 0)
       {
            intId = window.setInterval(moveSlide, 1000*autoSlideDelay);
       }
   }
   initAuto();

   function resetAuto()
   {
       if(intId)
       {
           window.clearInterval(intId);
           initAuto();
       }
   }
});