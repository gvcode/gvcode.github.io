// teste


/*

///// Animation Chart ///////////////////////////
var speed = 3;

function animateChart() {
    requestId = window.requestAnimationFrame(animateChart);
    frames += speed; //console.log(frames)
    ctx.clearRect(60, 0, cw, ch - 60);

    for (var i = 0; i < oFlat.length; i++) {
        if (oFlat[i].y > oDots[i].y) {
            oFlat[i].y -= speed;
        }
    }
    drawCurve(oFlat);
    for (var i = 0; i < oFlat.length; i++) {
        ctx.fillText(oDots[i].val, oFlat[i].x, oFlat[i].y - 25);
        ctx.beginPath();
        ctx.arc(oFlat[i].x, oFlat[i].y, 3, 0, 2 * Math.PI);
        ctx.fill();
    }

    if (frames >= Max * verticalUnit) {
        window.cancelAnimationFrame(requestId);

    }
}
requestId = window.requestAnimationFrame(animateChart);

/////// EVENTS //////////////////////
c.addEventListener("mousemove", function(e) {
    label.innerHTML = "";
    label.style.display = "none";
    this.style.cursor = "default";

    var m = oMousePos(this, e);
    for (var i = 0; i < oDots.length; i++) {

        output(m, i);
    }

}, false);

function output(m, i) {
    ctx.beginPath();
    ctx.arc(oDots[i].x, oDots[i].y, 20, 0, 2 * Math.PI);
    if (ctx.isPointInPath(m.x, m.y)) {
        //console.log(i);
        label.style.display = "block";
        label.style.top = (m.y + 10) + "px";
        label.style.left = (m.x + 10) + "px";
        label.innerHTML = "<strong>" + propsRy[i] + "</strong>: " + valuesRy[i] + "%";
        c.style.cursor = "pointer";
    }
}

// CURVATURE
function controlPoints(p) {
    // given the points array p calculate the control points
    var pc = [];
    for (var i = 1; i < p.length - 1; i++) {
        var dx = p[i - 1].x - p[i + 1].x; // difference x
        var dy = p[i - 1].y - p[i + 1].y; // difference y
        // the first control point
        var x1 = p[i].x - dx * t;
        var y1 = p[i].y - dy * t;
        var o1 = {
            x: x1,
            y: y1
        };

        // the second control point
        var x2 = p[i].x + dx * t;
        var y2 = p[i].y + dy * t;
        var o2 = {
            x: x2,
            y: y2
        };

        // building the control points array
        pc[i] = [];
        pc[i].push(o1);
        pc[i].push(o2);
    }
    return pc;
}

function drawCurve(p) {

    var pc = controlPoints(p); // the control points array

    ctx.beginPath();
    //ctx.moveTo(p[0].x, B.y- 25);
    ctx.lineTo(p[0].x, p[0].y);
    // the first & the last curve are quadratic Bezier
    // because I'm using push(), pc[i][1] comes before pc[i][0]
    ctx.quadraticCurveTo(pc[1][1].x, pc[1][1].y, p[1].x, p[1].y);

    if (p.length > 2) {
        // central curves are cubic Bezier
        for (var i = 1; i < p.length - 2; i++) {
            ctx.bezierCurveTo(pc[i][0].x, pc[i][0].y, pc[i + 1][1].x, pc[i + 1][1].y, p[i + 1].x, p[i + 1].y);
        }
        // the first & the last curve are quadratic Bezier
        var n = p.length - 1;
        ctx.quadraticCurveTo(pc[n - 1][0].x, pc[n - 1][0].y, p[n].x, p[n].y);
    }

    //ctx.lineTo(p[p.length-1].x, B.y- 25);
    ctx.stroke();
    ctx.save();
    ctx.fillStyle = grd;
    ctx.fill();
    ctx.restore();
}

function arrayMax(array) {
    return Math.max.apply(Math, array);
};

function arrayMin(array) {
    return Math.min.apply(Math, array);
};

function oMousePos(canvas, evt) {
    var ClientRect = canvas.getBoundingClientRect();
    return { //objeto
        x: Math.round(evt.clientX - ClientRect.left),
        y: Math.round(evt.clientY - ClientRect.top)
    }
}







// back to top button - docs
$(function () {
  if ($('.docs-top').length) {
    _backToTopButton()
    $(window).on('scroll', _backToTopButton)
    function _backToTopButton () {
      if ($(window).scrollTop() > $(window).height()) {
        $('.docs-top').fadeIn()
      } else {
        $('.docs-top').fadeOut()
      }
    }
  }

  // doc nav js
  var $toc = $('#markdown-toc')
  var $window = $(window)

  if ($toc[0]) {
    $('#markdown-toc li').addClass('nav-item')
    $('#markdown-toc li > a').addClass('nav-link')

    maybeActivateDocNavigation()
    $window.on('resize', maybeActivateDocNavigation)

    function maybeActivateDocNavigation () {
      if ($window.width() > 768) {
        activateDocNavigation()
      } else {
        deactivateDocNavigation()
      }
    }

    function deactivateDocNavigation() {
      $window.off('resize.theme.nav')
      $window.off('scroll.theme.nav')
      $toc.css({
        position: '',
        left: '',
        top: ''
      })
    }

    function activateDocNavigation() {

      var cache = {}

      function updateCache() {
        cache.containerTop   = $('.docs-content').offset().top
        cache.containerRight = $('.docs-content').offset().left + $('.docs-content').width() + 40
        measure()
      }

      function measure() {
        var scrollTop = $window.scrollTop()
        var distance =  Math.max(scrollTop - cache.containerTop, 0)

        if (!distance) {
          $($toc.find('li a')[1]).addClass('active')
          return $toc.css({
            position: '',
            left: '',
            top: ''
          })
        }

        $toc.css({
          position: 'fixed',
          left: cache.containerRight,
          top: 0
        })
      }

      updateCache()

      $(window)
        .on('resize.theme.nav', updateCache)
        .on('scroll.theme.nav', measure)

      $('body').scrollspy({
        target: '#markdown-toc',
        children: 'li > a'
      })

      setTimeout(function () {
        $('body').scrollspy('refresh')
      }, 1000)
    }
  }
})
