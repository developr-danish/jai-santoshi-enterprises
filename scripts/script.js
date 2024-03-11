// main page slider


{
    const sliders = document.querySelectorAll(".slider");
    // interval between switching images
    // can't be less than your animation duration in css!
    const interval = 2800;
    // if you don't want to first animation last longer than other animations  
    // set animDuration (in miliseconds) to your value of animation duration in css
    const animDuration = 600;
  
    for (let i = 0; i < sliders.length; ++i) {
      const slider = sliders[i];
      const dots = slider.querySelector(".dots");
      const sliderImgs = slider.querySelectorAll(".img");
  
      let currImg = 0;
      let prevImg = sliderImgs.length - 1;
      let intrvl;
      let timeout;
  
      // Creates dots and add listeners to them
      for (let i = 0; i < sliderImgs.length; ++i) {
        const dot = document.createElement("div");
        dot.classList.add("dot");
        dots.appendChild(dot);
        dot.addEventListener("click", dotClick.bind(null, i), false);
      }
  
      const allDots = dots.querySelectorAll(".dot");
      allDots[0].classList.add("active-dot");
  
      sliderImgs[0].style.left = "0";
      timeout = setTimeout(() => {
        animateSlider();
        sliderImgs[0].style.left = "";
        intrvl = setInterval(animateSlider, interval);
      }, interval - animDuration);   
  
      /**
       * Animates images
       * @param {number} [nextImg] - index of next image to show
       * @param {boolean} [right = false] - animate to right
       */
      function animateSlider(nextImg, right) {
        if (!nextImg)
          nextImg = currImg + 1 < sliderImgs.length ? currImg + 2 : 1;
  
        --nextImg;
        sliderImgs[prevImg].style.animationName = "";
  
        if (!right) {
          sliderImgs[nextImg].style.animationName = "leftNext";
          sliderImgs[currImg].style.animationName = "leftCurr";
        } 
        else {
          sliderImgs[nextImg].style.animationName = "rightNext";
          sliderImgs[currImg].style.animationName = "rightCurr";
        }
  
        prevImg = currImg;
        currImg = nextImg;
  
        currDot = allDots[currImg];
        currDot.classList.add("active-dot");
        prevDot = allDots[prevImg];
        prevDot.classList.remove("active-dot");
      }
  
      /**
       * Decides if animate to left or right and highlights clicked dot
       * @param {number} num - index of clicked dot
       */
      function dotClick(num) {
        if (num == currImg)
          return false;
  
        clearTimeout(timeout);
        clearInterval(intrvl);
  
        if (num > currImg)
          animateSlider(num + 1);
        else
          animateSlider(num + 1, true);
  
        intrvl = setInterval(animateSlider, interval);
      }
    }
  }

  // main page slider



  // window navbar scrolling

  
var sticky = document.querySelector('.navbar');

window.onscroll = function(){
if(window.scrollY > 0) {
    sticky.style.height = '132.4px';
    sticky.style.backgroundColor = "#c3b5a5";
    sticky.style.transition = "0.3s";
    sticky.style.position = "sticky";
    
  }else {
    sticky.style.height = '132.4px';
    sticky.style.backgroundColor = "#1c1b1b21";
}
}


  // window navbar scrolling


  // shop carousel part

  $(document).ready(function() {
    $("#news-slider").owlCarousel({
        items : 3,
        itemsDesktop:[1199,3],
        itemsDesktopSmall:[980,2],
        itemsMobile : [600,1],
        navigation:true,
        navigationText:["",""],
        pagination:true,
        autoPlay:true,
        loop:true
    });
});

  // shop carousel part


  // product
  const carousel = document.querySelector(".carousel-container");
  const slide = document.querySelector(".carousel-slide");

  function handleCarouselMove(positive = true) {
  const slideWidth = slide.clientWidth;
  carousel.scrollLeft = positive ? carousel.scrollLeft + slideWidth : carousel.scrollLeft - slideWidth;
}
  // product


  // collection part

  $(document).ready(function () {
    var itemsMainDiv = ('.MultiCarousel');
    var itemsDiv = ('.MultiCarousel-inner');
    var itemWidth = "";

    $('.leftLst, .rightLst').click(function () {
        var condition = $(this).hasClass("leftLst");
        if (condition)
            click(0, this);
        else
            click(1, this)
    });

   ResCarouselSize();




    $(window).resize(function () {
        ResCarouselSize();
    });

    //this function define the size of the items
    function ResCarouselSize() {
        var incno = 0;
        var dataItems = ("data-items");
        var itemClass = ('.item');
        var id = 0;
        var btnParentSb = '';
        var itemsSplit = '';
        var sampwidth = $(itemsMainDiv).width();
        var bodyWidth = $('body').width();
        $(itemsDiv).each(function () {
            id = id + 1;
            var itemNumbers = $(this).find(itemClass).length;
            btnParentSb = $(this).parent().attr(dataItems);
            itemsSplit = btnParentSb.split(',');
            $(this).parent().attr("id", "MultiCarousel" + id);


            if (bodyWidth >= 1200) {
                incno = itemsSplit[1];
                itemWidth = sampwidth / incno;
            }
            else if (bodyWidth >= 992) {
                incno = itemsSplit[2];
                itemWidth = sampwidth / incno;
            }
            else if (bodyWidth >= 768) {
                incno = itemsSplit[1];
                itemWidth = sampwidth / incno;
            }
            else {
                incno = itemsSplit[0];
                itemWidth = sampwidth / incno;
            }
            $(this).css({ 'transform': 'translateX(0px)', 'width': itemWidth * itemNumbers });
            $(this).find(itemClass).each(function () {
                $(this).outerWidth(itemWidth);
            });

            $(".leftLst").addClass("over");
            $(".rightLst").removeClass("over");

        });
    }


    //this function used to move the items
    function ResCarousel(e, el, s) {
        var leftBtn = ('.leftLst');
        var rightBtn = ('.rightLst');
        var translateXval = '';
        var divStyle = $(el + ' ' + itemsDiv).css('transform');
        var values = divStyle.match(/-?[\d\.]+/g);
        var xds = Math.abs(values[4]);
        if (e == 0) {
            translateXval = parseInt(xds) - parseInt(itemWidth * s);
            $(el + ' ' + rightBtn).removeClass("over");

            if (translateXval <= itemWidth / 2) {
                translateXval = 0;
                $(el + ' ' + leftBtn).addClass("over");
            }
        }
        else if (e == 1) {
            var itemsCondition = $(el).find(itemsDiv).width() - $(el).width();
            translateXval = parseInt(xds) + parseInt(itemWidth * s);
            $(el + ' ' + leftBtn).removeClass("over");

            if (translateXval >= itemsCondition - itemWidth / 2) {
                translateXval = itemsCondition;
                $(el + ' ' + rightBtn).addClass("over");
            }
        }
        $(el + ' ' + itemsDiv).css('transform', 'translateX(' + -translateXval + 'px)');
    }

    //It is used to get some elements from btn
    function click(ell, ee) {
        var Parent = "#" + $(ee).parent().attr("id");
        var slide = $(Parent).attr("data-slide");
        ResCarousel(ell, Parent, slide);
    }

});

  // collection part