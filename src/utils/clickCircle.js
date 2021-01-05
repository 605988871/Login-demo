/* 鼠标特效 */
var a_idx = 0
var tid = ''
$('body').on('click', function(e) {
  for (var i = 0; i < 20; i++) {
    var $i = $('<div class="i"></div>')
    var x = e.pageX,
      y = e.pageY
    var ball = 15 * Math.random()
    $i.css({
      'z-index': 999,
      top: y - 20,
      left: x,
      position: 'absolute',
      width: 0,
      height: 0,
      'border-radius': '50%',
      'background-color':
        'rgb(' +
        ~~(255 * Math.random()) +
        ',' +
        ~~(255 * Math.random()) +
        ',' +
        ~~(255 * Math.random()) +
        ')'
    })
    $('body').append($i)

    var randomValueX = Math.random()
    var randomValueY = Math.random()
    var lengthX =
      randomValueX > 0.3 ? ~~(120 * randomValueX) : -~~(120 * randomValueX)
    var lengthY =
      randomValueY > 0.3 ? ~~(120 * randomValueY) : -~~(120 * randomValueY)
    var y1 = y - lengthX
    var x1 = x - lengthY
    $i.animate(
      {
        top: y1,
        left: x1,
        opacity: 0,
        width: ball,
        height: ball
      },
      1000,
      'swing',
      function() {
        $i.remove()
        $('.i').remove()
      }
    )
  }
})
