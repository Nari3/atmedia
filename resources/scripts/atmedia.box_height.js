/**
 * atmedia.js plugin box_height
 * [version] 1.0.0
 */
;(function(window, document, $, undefined) {

  var _export = $.atmedia._export;

  var conf = {
    className: 'box_height',
    partsClassName: 'box_height-parts',
    headClassName: 'box_height-head',
    dataResizeName: 'data-box_height-resize',
    dataAllName: 'data-box_height',
    dataLargeName: 'data-box_height-large',
    dataMediumName: 'data-box_height-medium',
    dataSmallName: 'data-box_height-small'
  };

  _export.helper.include({
    boxHeight: function (args) {
      args = args || {};

      var render = function($el, num) {
        if (!$el) return;
        $el.css('height', 'auto');
        if (num > 1) {
          var max = 0;
          $el.each(function (index) {
            if (index % num == 0) {
              max = 0;
              for (var i = 0; i < num; i++) {
                if ($el.eq(index + i).height() > max) max = $el.eq(index + i).height();
              }
              for (var i = 0; i < num; i++) {
                $el.eq(index + i).height(max);
              }
            }
          });
        }
      }

      _export.onready(function () {

        var $context = args.$context || $('.' + conf.className);

        $context.each(function () {
          var $this = $(this);
          var resize = args.resize || $this.attr(conf.dataResizeName),
              allRow = args.all || $this.attr(conf.dataAllName),
              largeRow = args.large || $this.attr(conf.dataLargeName) || allRow,
              mediumRow = args.medium || $this.attr(conf.dataMediumName) || largeRow,
              smallRow = args.small || $this.attr(conf.dataSmallName) || largeRow;

          var $parts = args.$parts || $('.' + conf.partsClassName, $this),
              $head = args.$head || $('.' + conf.headClassName, $this);

          _export.onchange({
            onLarge: function () {
              render($parts, largeRow, $context);
              render($head, largeRow, $context);
            },
            onMedium: function () {
              render($parts, mediumRow, $context);
              render($head, mediumRow, $context);
            },
            onMediumResize: function () {
              if (resize != -1) {
                render($parts, mediumRow, $context);
                render($head, mediumRow, $context);
              }
            },
            onSmall: function () {
              render($parts, smallRow, $context);
              render($head, smallRow, $context);
            },
            onSmallResize: function () {
              if (resize != -1) {
                render($parts, smallRow, $context);
                render($head, smallRow, $context);
              }
            }
          });

        });

      });

    }
  });

  _export.helper.boxHeight();

})(window, document, jQuery);
