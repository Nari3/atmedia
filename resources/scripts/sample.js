
/************** setup for using $.atmedia **************/
window.mynamespace = $.atmedia({
  deviceStyle: {
    id: '_device',
    style: {
      large: {
        prop: 'position',
        val: 'static'
      },
      medium: {
        prop: 'position',
        val: 'relative'
      },
      small: {
        prop: 'position',
        val: 'absolute'
      }
    }
  }
});


/************** root event **************/
mynamespace.onready(function() {
  renderStatus('ready');

}).onload(function() {
  console.log('load');

}).onresize(function(w,h) {
  console.log('resize', 'windowWidth:' + w + 'px', 'windowHeight:' + h + 'px');

}).onscroll(function(t, l) {
  console.log('scroll', 'scrollTop:' + t + 'px', 'scrollLeft:' + l + 'px');

});


/************** original event **************/
mynamespace.onchange(function(args) {
  console.log('change');

}).onchange({
  onLarge: function() {
    renderStatus('onLarge');
    $('body').css('background', '#41ab6b');
  },
  offLarge: function() {
    renderStatus('offLarge');
  },
  onLargeResize: function() {
    renderStatus('onLargeResize');
  },  
  onMedium: function() {
    renderStatus('onMedium');
    $('body').css('background', '#0e83cd');
  },
  offMedium: function() {
    renderStatus('offMedium');
  },
  onMediumResize: function() {
    renderStatus('onMediumResize');
  },
  onSmall: function() {
    renderStatus('onSmall');
    $('body').css('background', '#d54f30');
  },
  offSmall: function() {
    renderStatus('offSmall');
  },
  onSmallResize: function() {
    renderStatus('onSmallResize');
  }
});

// $(window).on('load',function() {
//   mynamespace.onready(function() {
//     console.log('ready:after');

//   }).onload(function() {
//     console.log('load:after');

//   }).onresize(function(w,h) {
//     console.log('resize:after', 'windowWidth:' + w + 'px', 'windowHeight:' + h + 'px');

//   }).onscroll(function(t, l) {
//     console.log('scroll:after', 'scrollTop:' + t + 'px', 'scrollLeft:' + l + 'px');

//   });

//   mynamespace.onchange(function() {
//     console.log('change:after');

//   }).onchange({
//     onLarge: function() {
//       console.log('onLarge:after');
//     },
//     offLarge: function() {
//       console.log('offLarge:after');
//     },
//     onLargeResize: function() {
//       console.log('onLargeResize:after');
//     },  
//     onMedium: function() {
//       console.log('onMedium:after');
//     },
//     offMedium: function() {
//       console.log('offMedium:after');
//     },
//     onMediumResize: function() {
//       console.log('onMediumResize:after');
//     },
//     onSmall: function() {
//       console.log('onSmall:after');
//     },
//     offSmall: function() {
//       console.log('offSmall:after');
//     },
//     onSmallResize: function() {
//       console.log('onSmallResize:after');
//     }
//   });
// });


/************** sapmle extend / include **************/
mynamespace.extend({
  extendSample: function() {
    console.log('extendSample');
  }
});
mynamespace.extendSample();

mynamespace.include({
  includeSample: function() {
    console.log('includeSample');
  }
});
mynamespace.includeSample();


/************** define custom event **************/
$(function() {
  var slope = mynamespace.defineElement({
    id: '_slope',
    style: {
      portrait: {
        prop: 'position',
        val: 'absolute'
      },
      landscape: {
        prop: 'position',
        val: 'relative'
      }
    }
  });
  var defineOrientationchange = function() {
    if (this.el.matchStatus('portrait')) {
      this.publish('portrait');
    } else if (this.el.matchStatus('landscape')) {
      this.publish('landscape');
    }
  }
  mynamespace.defineEvent({
    name: 'portrait landscape',
    parent: 'orientationchange',
    el: slope,
    define: defineOrientationchange
  });
  mynamespace.defineEvent({
    name: 'portrait landscape',
    parent: 'ready',
    el: slope,
    define: defineOrientationchange
  });
  mynamespace.include({
    onPortrait: function(fn) {
      mynamespace.subscribe('ready/portrait', fn);
      mynamespace.subscribe('orientationchange/portrait', fn);
      return this;
    },
    onLandscape: function(fn) {
      mynamespace.subscribe('ready/landscape', fn);
      mynamespace.subscribe('orientationchange/landscape', fn);
      return this;
    }
  });
  mynamespace.onPortrait(function() {
    console.log('onPortrait');
  }).onLandscape(function() {
    console.log('onLandscape');
  });
});

    // for addebug
    if (!window.console){
      window.console = {};
      window.console.log = function(c){ return c; }
      window.console.dir = function(c){ return c; }
    }
    mynamespace.onready(function() {
      var $status = $('#status');
      window.renderStatus = function() {
        var arr = Array.prototype.slice.call(arguments);
        var str = arr.join(' ');
        if ($status) $status.text(str);
        console.log(arr);
      }
    }, {sort: 'first'});