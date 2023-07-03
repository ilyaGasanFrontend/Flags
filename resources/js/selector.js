$(document).ready(function (e) {
  const Statuses = Object.freeze({
    CreatingElements: 1,
    EditingElements: 2,
    DeletingElements: 3
  });

  var isOverToolbar = false

  var script_src = document.getElementsByTagName('script')[3].src
  // //console.log(script_src)
  var prevobjects = $('.dropdown-menu')
  var canvas = $('.canvas')
  var form = $('.hidden-form')

  var statusElements = $('.action-el')
  var status = Statuses.CreatingElements

  var scale = 1;
  var pointX = 0
  var pointY = 0

  var img = new Image();

  img.src = $(".img__current").attr('src');
  img.onload = function () {

  }
  $(canvas).css("width", img.width);
  $(canvas).css("height", img.height);

  var min_scale = 1
  while (
    img.height * scale > parseInt($('#text').css('height')) || img.width * scale > parseInt($('#text').css('width'))
  ) {
    scale -= 0.05
    min_scale = scale
    // //console.log(img.width * scale, parseInt($('#text').css('width')))
  }
  if (scale == 1) {
    while (
      img.height * scale < parseInt($('#text').css('height')) && img.width * scale < parseInt($('#text').css('width'))
    ) {
      scale += 0.05

      // // //console.log(scale)
    }
    min_scale = 1
  }


  // $(canvas).css('left', parseFloat($(text).css('width')) / 2 - parseFloat($('.img__current').css('width')) / 2)

  $(canvas).css('transform', 'scale(' + scale + ')')
  // //console.log((parseFloat($(canvas).css('width')) - parseFloat($(text).css('width')) * scale) / 2)
  // alert($(text).css('width'))

  const square = 'square'
  const prev__elemnt__objects = 'prev__elemnt__objects'

  var startcoordX = 0
  var startcoordY = 0

  var distX = 0
  var distY = 0
  var flag = false
  var is_out = false

  var id = ''
  var curenid

  var newstartX;
  var newstartY;

  var delettingButtonId = 'deletting__button'
  var editingButtonId = 'editing__button'

  // var radio_checked = $("input[name='radio_category']:checked").val()
  var radio_checked_id = $("input[name='radio_category']:checked").val();
  var radio_checked_color = $('#span_' + radio_checked_id).css('color');
  // // //console.log(radio_checked_id, radio_checked_color)

  $("input[type='radio']").click(function () {
    radio_checked_id = $("input[name='radio_category']:checked").val()
    radio_checked_color = $('#span_' + radio_checked_id).css('color')
    // // //console.log(radio_checked_id, radio_checked_color)
    // // //console.log(categories_arr)
  })


  ///////////////////////////////////////




  ////////////////////////////////////////////////////
  $(canvas).on('click', '.square', function (e) {
    switch (status) {
      case (Statuses.EditingElements):

        break
      case (Statuses.DeletingElements):
        $(this).toggleClass('active__square__el__obj__changing')
        let number = ($(this).attr('id')).substring(square.length)
        let testobjects = $('.canvas').children('.square')
        let objects = $('.dropdown-menu-obj').children()

        $(objects[number]).remove()

        $(testobjects[number]).remove()

        testobjects = $('.canvas').children('.square')
        objects = $('.dropdown-menu-obj').children()

        for (let i = 0; i < testobjects.length; i++) {
          $(testobjects[i]).attr('id', square + i)
          $(objects[i]).attr('id', prev__elemnt__objects + i)
          $(objects[i]).children('.number').html(i + 1)
        }


        break
    }


  })


  $(canvas).on('mousedown', function (e) {
    switch (status) {
      case (Statuses.CreatingElements):
        if (isOverToolbar) {

        }
        else {

          var rect = e.target.getBoundingClientRect();
          var x = e.clientX - canvas.left; //x position within the element.
          var y = e.clientY - canvas.top;  //y position within the element.

          // // //console.log("Left? : " + x + " ; Top? : " + y + ".");
          // startcoordX = (e.originalEvent.layerX - pointX) / scale
          // startcoordY = (e.originalEvent.layerY - pointY) / scale

          startcoordX = e.originalEvent.layerX / scale
          startcoordY = e.originalEvent.layerY / scale
          //console.log(startcoordX, startcoordY, x, y)
          // //console.log(startcoordX, $(canvas).css('transform'), pointX)
          var object = $('<div>', {
            'class': 'square point__events',
          })
          id = '#' + square + $('.canvas').children('.square').length
          curenid = id
          // startcoordX = parseInt($(canvas).css("width")) / 2 + startcoordX;
          // startcoordX = startcoordX;
          // startcoordY = parseInt($(canvas).css("height")) / 2 + startcoordY;
          // startcoordY = startcoordY;
          newstartX = startcoordX;
          newstartY = startcoordY;


          $(object).attr('id', 'square' + $('.canvas').children('.square').length)
          $(canvas).append(object)
          $(id).css('top', startcoordY)
          $(id).css('left', startcoordX)
          $(id).css('width', 0)
          $(id).css('height', 0)
          $(id).css('color', radio_checked_color)
          // $(id).css('background', radio_checked_color.substring(0, radio_checked_color.length-1) + ', 0.25)')

          $('.toolbar').toggleClass('hidden')

          flag = true

          is_out = false

          // startcoordX = e.clientX
          // startcoordY = e.clientY

          $(".canvas").attr('wire:click.prevent', '')
          break
        }
    }
  });

  $('.content').on('mouseup', function (e) {
    switch (status) {
      case (Statuses.CreatingElements):
        if (flag) {
          flag = false
          Livewire.emit(
            'create',
            parseInt(curenid.substr(7, curenid.length)) + 1,
            radio_checked_id,
            parseFloat($(id).css('left')),
            parseFloat($(id).css('top')),
            parseFloat($(id).css('width')),
            parseFloat($(id).css('height'))
          )
          break
        }
    }
  })

  $(canvas).on('mouseleave', function (e) {
    let canvas_x1 = $(canvas).offset().left
    let canvas_y1 = $(canvas).offset().top

    $('.content').on('mousemove', function (e) {
      if (flag) {
        let canvas_x2 = $(canvas).offset().left + parseFloat($(canvas).css('width')) * scale
        let canvas_y2 = $(canvas).offset().top + parseFloat($(canvas).css('height')) * scale

        // console.log('Канвас Х1', canvas_x1)
        // console.log('Канвас Y1', canvas_y1)
        // console.log('Канвас Х2', canvas_x2)
        // console.log('Канвас Y2', canvas_y2)
        // console.log('Позиция мыши', e.originalEvent.pageX, e.originalEvent.pageY)

        if (e.originalEvent.pageY > canvas_y2) {
          if (e.originalEvent.pageX < canvas_x1) {
            $(id).css('width', startcoordX)
            $(id).css('height', img.height - startcoordY)
            // console.log('bottom left')
          }
          else if (e.originalEvent.pageX > canvas_x2) {
            $(id).css('width', img.width - startcoordX)
            $(id).css('height', img.height - startcoordY)
            // console.log('bottom right')
          }
          else {
            var endcoordX = (e.originalEvent.pageX - canvas_x1) / scale
            var width_current = endcoordX - startcoordX

            if (width_current >= 0) {
              $(id).css('width', width_current)
            }
            else {
              $(id).css('left', parseInt(endcoordX))
              $(id).css('width', parseInt(Math.abs(width_current)))
            }

            $(id).css('height', img.height - startcoordY)
            // console.log('bottom', startcoordX, (e.originalEvent.pageX - canvas_x1) / scale, canvas_x1)
          }
        }
        if (e.originalEvent.pageY < canvas_y1) {
          if (e.originalEvent.pageX < canvas_x1) {
            $(id).css('width', startcoordX)
            $(id).css('height', startcoordY)
            // console.log('top left')
          }
          else if (e.originalEvent.pageX > canvas_x2) {
            $(id).css('width', img.width - startcoordX)
            $(id).css('height', startcoordY)
            // console.log('top right')
          }
          else {
            var endcoordX = (e.originalEvent.pageX - canvas_x1) / scale
            var width_current = endcoordX - startcoordX

            if (width_current >= 0) {
              $(id).css('width', width_current)
            }
            else {
              $(id).css('left', parseInt(endcoordX))
              $(id).css('width', parseInt(Math.abs(width_current)))
            }

            $(id).css('height', startcoordY)
            // console.log('top')       
          }
        }
        if (e.originalEvent.pageY > canvas_y1 && e.originalEvent.pageY < canvas_y2) {
          if (e.originalEvent.pageX < canvas_x1) {
            var endcoordY = (e.originalEvent.pageY - canvas_y1) / scale
            var height_current = endcoordY - startcoordY

            if (height_current >= 0) {
              $(id).css('height', height_current)
            }
            else {
              $(id).css('top', parseInt(endcoordY))
              $(id).css('height', parseInt(Math.abs(height_current)))
            }
            $(id).css('width', startcoordX)
            // console.log('left')
          }
          else if (e.originalEvent.pageX > canvas_x2) {
            var endcoordY = (e.originalEvent.pageY - canvas_y1) / scale
            var height_current = endcoordY - startcoordY

            if (height_current >= 0) {
              $(id).css('height', height_current)
            }
            else {
              $(id).css('top', parseInt(endcoordY))
              $(id).css('height', parseInt(Math.abs(height_current)))
            }
            $(id).css('width', img.width - startcoordX)
            // console.log('right')
          }
        }
      }
    })

    // flag = false
    // is_out = true
    // let objects = (canvas).children()
    // $(objects[objects.length - 1]).remove()
    // // //console.log('exit')


  })

  var wrappercanvas = $('#text')

  function scrollRight(elementId, distance) {
    var currentScrollLeft = $("#" + elementId).scrollLeft();
    $("#" + elementId).animate({ scrollLeft: currentScrollLeft + distance }, 0.00001);

  }

  function scrollTop(elementId, distance) {
    var currentScrollLeft = $("#" + elementId).scrollTop();
    $("#" + elementId).animate({ scrollTop: currentScrollLeft + distance }, 0.00001);
  }

  // Пример использования
  var smesh = 0

  function getScrollLeft(elementId) {
    var scrollLeft = $("#" + elementId).scrollLeft();
    // console.log("Текущее положение скроллбара по горизонтали: " + scrollLeft);
    return scrollLeft;
  }

  function getScrollTop(elementId) {
    var scrollTop = $("#" + elementId).scrollTop();
    // console.log("Текущее положение скроллбара по вертикали: " + scrollTop);
    return scrollTop;
  }

  $(canvas).on('mousemove', function (e) {
    // console.log(e.originalEvent.layerX - getScrollLeft('text'), parseFloat($(wrappercanvas).css('width')))
    // console.log(parseFloat($(wrappercanvas).css('height')) - e.originalEvent.layerY + getScrollTop('text') < 50/scale)
    switch (status) {
      case (Statuses.CreatingElements):
        if (flag) {
          // //console.log(e.originalEvent.layerX / scale, parseFloat($(wrappercanvas).css('width'))/scale)
          // console.log(parseFloat($(canvas).css('width'))*scale , parseFloat($(wrappercanvas).css('width')))

          var endcoordX = e.originalEvent.layerX / scale
          var endcoordY = e.originalEvent.layerY / scale

          if (parseFloat($(canvas).css('width')) * scale > parseFloat($(wrappercanvas).css('width'))) {
            var scrolhor = getScrollLeft('text')
            // console.log(parseFloat($(canvas).css('height'))/scale -e.originalEvent.layerY - getScrollTop('text')  )
            if (parseFloat($(wrappercanvas).css('width')) - e.originalEvent.layerX + getScrollLeft('text') < 50 / scale) {
              scrollRight('text', 10)
            }
            if (e.originalEvent.layerX - scrolhor < 50 / scale) {
              scrollRight('text', -10)
            }
            if (e.originalEvent.layerY - getScrollTop('text') < 50 / scale) {
              scrollTop('text', -10)
            }

            if (parseFloat($(wrappercanvas).css('height')) - e.originalEvent.layerY + getScrollTop('text') < 50 / scale) {
              scrollTop('text', 10)
            }
          }
          var width_current = endcoordX - startcoordX
          var height_current = endcoordY - startcoordY
          // // //console.log(e.originalEvent.layerX
          // var width_current = (e.originalEvent.clientX - startcoordX) / scale
          // var height_current = (e.originalEvent.clientY - startcoordY) / scale
          // //console.log(width_current, pointX)

          if (width_current >= 0 && height_current >= 0) {
            $(id).css('left', newstartX)
            $(id).css('top', newstartY)
            $(id).css('width', (width_current))
            $(id).css('height', (height_current))
          }
          else {
            if (width_current < 0 && height_current < 0) {
              $(id).css('left', parseInt(endcoordX))
              $(id).css('top', parseInt(endcoordY))
              $(id).css('width', parseInt(Math.abs(width_current)))
              $(id).css('height', parseInt(Math.abs(height_current)))
            }
            if (width_current < 0 && height_current > 0) {
              $(id).css('left', parseInt(endcoordX))
              $(id).css('top', parseInt(startcoordY))
              $(id).css('width', parseInt(Math.abs(width_current)))
              $(id).css('height', parseInt(Math.abs(height_current)))
            }
            if (width_current > 0 && height_current < 0) {
              $(id).css('left', parseInt(startcoordX))
              $(id).css('top', parseInt(endcoordY))
              $(id).css('width', parseInt(Math.abs(width_current)))
              $(id).css('height', parseInt(Math.abs(height_current)))
            }
          }

        }
        break

    }

  })

  $('.canvas').on('mouseup', function () {
    switch (status) {
      case (Statuses.CreatingElements):
        if (flag) {

          flag = false;
          if (parseInt($(curenid).css('width')) < 20 && parseInt($(curenid).css('height')) < 20) {
            $(curenid).css('width', 20)
            $(curenid).css('height', 20)

            $(curenid).css('border-radius', "50%")
            $(curenid).css('top', parseInt($(curenid).css('top')) - parseInt($(curenid).css('height')) / 2)
            $(curenid).css('left', parseInt($(curenid).css('left')) - parseInt($(curenid).css('width')) / 2)

          }
          // //console.log(img.height)
          $(id).css('width', (e.clientX - startcoordX) / scale)
          $(id).css('height', (e.clientY - startcoordY) / scale)

          if (!is_out) {
            Livewire.emit('create', parseInt(curenid.substr(7, curenid.length)) + 1, radio_checked_id, parseFloat($(id).css('left')), parseFloat($(id).css('top')), parseFloat($(id).css('width')), parseFloat($(id).css('height')))
          }
          // var pensil = $('<a>',{
          //   'class': 'correcting'
          // })
          // var object = $(id)
          // $(id).append('')
          // console.log(object)
          // $(pensil).append('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="blue" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit-2 align-middle"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>')
          // $('#text').append(pensil)
          $('.toolbar').toggleClass('hidden')
          break
        }
    }

  });

  ///////

  $('#next').on('mousedown', function () {
    $("#text").removeAttr('wire:ignore')
  })

  $('#next').on('mouseclick', function () {
    $("#text").attr('wire:ignore', '')
    // // //console.log($('script[src=/resources/js/selector.js]'))
    location.reload()

  })

  $('.obj-table').on('mouseenter', '.button__editing', function (e) {

    let number = ($(this).attr('id')).substring(editingButtonId.length)
    // //console.log(number)
    let testobjects = $('.canvas').children('.square')
    $(testobjects[number]).toggleClass('active__square__el__obj__edititng')
    // //console.log('over')
  })


  //new mouseleave edit
  $('.obj-table').on('mouseleave', '.button__editing', function (e) {
    let number = ($(this).attr('id')).substring(editingButtonId.length)
    let testobjects = $('.canvas').children('.square')
    $(testobjects[number]).toggleClass('active__square__el__obj__edititng')
  })

  //new click edit
  $('.obj-table').on('click', '.button__editing', function (e) {
    // // //console.log('click', $('.obj-table').children('.table-row').children('.table-action'))
    if (status != Statuses.EditingElements) {

      status = Statuses.EditingElements
      // //console.log(status)
      $('#flag').val('EditingInProgress')
      $(".canvas").attr('wire:click.prevent', '')
      let categories = $('.categories').children()
      let number = ($(this).attr('id')).substring(editingButtonId.length)
      let active_category_id = $('#hidden-category-' + number).val()

      for (let i = 0; i < categories.length; i++) {
        // //console.log($(categories[i]).children('.form-check-input').attr('id').substr('radio_'.length), radio_checked_id)
        if ($(categories[i]).children('.form-check-input').attr('id').substr('radio_'.length) == active_category_id) {
          $(categories[i]).children('.form-check-input').prop('checked', true)
          radio_checked_id = active_category_id
          radio_checked_color = $('#span_' + radio_checked_id).css('color');
        }
      }

      let testobjects = $('.canvas').children('.square')
      // let number = ($(this).attr('id')).substring(editingButtonId.length)
      // //console.log(number, '1111111111111111111')
      let objects = $('.obj-table').children('.table-row').children('.table-action')
      $(this).html('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="green" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check align-middle"><polyline points="20 6 9 17 4 12"></polyline></svg>')
      $('#toolbar__editing__button' + number).html('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="green" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check align-middle"><polyline points="20 6 9 17 4 12"></polyline></svg>')
      $(testobjects[number]).toggleClass('point__events')


      $(objects[number]).children('.button__deletting').toggleClass('button__deletting__disabled')

      $("input[type='radio']").toggleClass('categories-editing')
      $("input[type='radio']").toggleClass('categories-default')

      //смена класса необходимой строке
      $($('.obj-table').children('.table-row')[number]).toggleClass('table-row-editing')

      //смена класса области с текстом
      $($('.obj-table').children('.table-row').children('.desmetr')[number]).toggleClass('desmetr-editing')

      for (let i = 0; i < testobjects.length; i++) {
        // // //console.log(i, $(objects[number]).children())
        if (i != parseInt(number)) {
          $(testobjects[i]).toggleClass('hidden__squares')
          $(objects[i]).toggleClass('hidden__tools')
        }
      }

      // // //console.log($($('.obj-table').children('.table-row')[number]).children('.button__editing').attr('wire:click', 'dododo(123)'))


      let toolbars = $('.toolbar')
      for (let i = 0; i < testobjects.length; i++) {
        if (i != parseInt(number)) {
          $(toolbars[i]).toggleClass('hidden')
        }
      }

      $('.categories-editing').click(function () {
        //получение новых id и цвета у чекбокса
        radio_checked_id = $("input[name='radio_category']:checked").val()
        radio_checked_color = $('#span_' + radio_checked_id).css('color')

        //смена цвета выделенному квадрату
        $('.active__square__el__obj__edititng').css('color', radio_checked_color)
        // //console.log($('#span_' + radio_checked_id).text())

        //смена описания
        $('.desmetr-editing').text($('#span_' + radio_checked_id).text())

        //смена цвета фона
        $('.table-row-editing').css('background', radio_checked_color.substring(0, radio_checked_color.length - 1) + ', 0.25)')

        let edit_button_attr = $(objects[number]).children('.button__editing').attr('wire:click.prevent')
        edit_button_attr = edit_button_attr.substr(0, edit_button_attr.length - 2) + radio_checked_id + ')'
        // //console.log(edit_button_attr)
        $(objects[number]).children('.button__editing').attr('wire:click.prevent', edit_button_attr)
      })

      var d_x, d_y, d_top, d_left, d_width, d_height
      d_left = parseFloat($(`#square${number}`).css('left'))
      d_top = parseFloat($(`#square${number}`).css('top'))
      d_width = parseFloat($(`#square${number}`).css('width'))
      d_height = parseFloat($(`#square${number}`).css('height'))

      interact(testobjects[number]).resizable({
        // resize from all edges and corners
        edges: { left: true, right: true, bottom: true, top: true },

        listeners: {
          move(event) {
            var target = event.target
            var x = (parseFloat(target.getAttribute('data-x')) || 0)
            var y = (parseFloat(target.getAttribute('data-y')) || 0)

            // update the element's style
            target.style.width = event.rect.width * (1 / scale) + 'px'
            target.style.height = event.rect.height * (1 / scale) + 'px'

            // translate when resizing from top or left edges
            x += event.deltaRect.left * (1 / scale)
            y += event.deltaRect.top * (1 / scale)

            target.style.transform = 'translate(' + x + 'px,' + y + 'px)'

            $('#square_toolbar_' + number).css('left', parseFloat(target.style.left) + x + parseFloat(target.style.width))
            $('#square_toolbar_' + number).css('top', parseFloat(target.style.top) + y)

            target.setAttribute('data-x', x)
            target.setAttribute('data-y', y)

            d_left = parseFloat($(`#square${number}`).css('left'))
            d_top = parseFloat($(`#square${number}`).css('top'))
            d_width = parseFloat($(`#square${number}`).css('width'))
            d_height = parseFloat($(`#square${number}`).css('height'))

            $(objects[number]).children('.button__editing').attr('wire:click.prevent', `update(${parseInt(number) + 1}, ${d_left + x}, ${d_top + y}, ${event.rect.width * (1 / scale)}, ${event.rect.height * (1 / scale)}, ${radio_checked_id})`)
          }
        },
        modifiers: [
          // keep the edges inside the parent
          interact.modifiers.restrictEdges({
            outer: 'parent'
          }),

          // minimum size
          interact.modifiers.restrictSize({
            min: { width: 10, height: 10 }
          })
        ],

        inertia: true
      })

      interact(testobjects[number]).draggable({
        // enable inertial throwing
        inertia: true,
        // keep the element within the area of it's parent
        modifiers: [
          interact.modifiers.restrictRect({
            restriction: 'parent',
            endOnly: true
          })
        ],
        // enable autoScroll
        autoScroll: true,

        listeners: {
          // call this function on every dragmove event
          move: dragMoveListener,

          // call this function on every dragend event
          end(event) {
            var textEl = event.target.querySelector('p')

            textEl && (textEl.textContent =
              'moved a distance of ' +
              (Math.sqrt(Math.pow(event.pageX - event.x0, 2) +
                Math.pow(event.pageY - event.y0, 2) | 0))
                .toFixed(2) + 'px')
          }
        }
      })

      function dragMoveListener(event) {
        var target = event.target
        // keep the dragged position in the data-x/data-y attributes
        var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx / scale
        var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy / scale

        // translate the element
        target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'

        $('#square_toolbar_' + number).css('left', parseFloat(target.style.left) + x + parseFloat(target.style.width))
        $('#square_toolbar_' + number).css('top', parseFloat(target.style.top) + y)

        // update the posiion attributes
        target.setAttribute('data-x', x)
        target.setAttribute('data-y', y)

        d_left = parseFloat($(`#square${number}`).css('left'))
        d_top = parseFloat($(`#square${number}`).css('top'))
        d_width = parseFloat($(`#square${number}`).css('width'))
        d_height = parseFloat($(`#square${number}`).css('height'))

        $(objects[number]).children('.button__editing').attr('wire:click.prevent', `update(${parseInt(number) + 1}, ${d_left + x}, ${d_top + y}, ${d_width}, ${d_height}, ${radio_checked_id})`)
      }
      // // //console.log( $(testobjects[number]).css('x'))
      window.dragMoveListener = dragMoveListener

      // //console.log(number)
      // $(objects[number]).children('.button__editing').attr('wire:click', `update(${parseInt(number)+1}, 100, 100, 100, 100, ${radio_checked_id})`)
      $(objects[number]).children('.button__editing').attr('wire:click.prevent', `update(${parseInt(number) + 1}, ${d_left}, ${d_top}, ${d_width}, ${d_height}, ${radio_checked_id})`)
    }
    else {



      status = Statuses.CreatingElements
      let testobjects = $('.canvas').children('.square')
      let number = ($(this).attr('id')).substring(editingButtonId.length)
      let objects = $('.obj-table').children('.table-row').children('.table-action')
      $(this).html('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="blue" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit-2 align-middle"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>')
      $(testobjects[number]).toggleClass('point__events')
      $("input[type='radio']").toggleClass('categories-editing')
      $("input[type='radio']").toggleClass('categories-default')
      $($('.obj-table').children('.table-row')[number]).toggleClass('table-row-editing')
      $($('.obj-table').children('.table-row').children('.desmetr')[number]).toggleClass('desmetr-editing')

      for (let i = 0; i < testobjects.length; i++) {

        if (i != parseInt(number)) {
          $(testobjects[i]).toggleClass('hidden__squares')
          $(objects[i]).toggleClass('hidden__tools')
        }
      }
      $(objects[number]).children('.button__deletting').toggleClass('button__deletting__disabled')
      // $('#hiddenX').val().split(',')[number] = $(testobjects[number]).css('x')
      $(objects[number]).children('.button__editing').attr('wire:click.prevent', '')
    }

  })
  ///////

  //new mouseenter delete
  $('.obj-table').on('mouseenter', '.button__deletting', function (e) {
    let number = ($(this).attr('id')).substring(delettingButtonId.length)
    let testobjects = $('.canvas').children('.square')
    $(testobjects[number]).toggleClass('active__square__el__obj__deletting')
  })

  //new mouseleave delete
  $('.obj-table').on('mouseleave', '.button__deletting', function (e) {
    let number = ($(this).attr('id')).substring(delettingButtonId.length)
    let testobjects = $('.canvas').children('.square')
    $(testobjects[number]).toggleClass('active__square__el__obj__deletting')
  })

  //new click delete
  $('.obj-table').on('click', '.button__deletting', function (e) {

    let number = ($(this).attr('id')).substring(delettingButtonId.length)
    let testobjects = $('.canvas').children('.square')
    let objects = $('.obj-table').children('.table-row')

    $(objects[number]).remove()

    $(testobjects[number]).remove()
    // //console.log($('.canvas').children('.square').length)

    testobjects = $('.canvas').children('.square')
    objects = $('.obj-table').children('.table-row')
    // //console.log(objects, '!!!!!!!!!!!!!!!!!!!', number)

    for (let i = 0; i < testobjects.length; i++) {
      // //console.log($(testobjects[i]).attr('id'))
      $(testobjects[i]).attr('id', square + i)
      $(objects[i]).attr('id', 'table_row_' + i)
      $(objects[i]).children('.button__deletting').attr('wire:click.prevent', `delete(${i})`)
      $(objects[i]).children('.number').html(i + 1)

      $($(objects[i]).children()[2]).attr('id', 'hidden-category-' + i)
      $(objects[i]).children('.table-action').children('.button__deletting').attr('id', delettingButtonId + i)
      $(objects[i]).children('.table-action').children('.button__editing').attr('id', editingButtonId + i)

    }
    // //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  })

  $(canvas).on('mouseenter', '.toolbar', function (e) {
    if ($(this).hasClass('disabled')) {
      isOverToolbar = true
      $(this).toggleClass('disabled')
    }
  })

  $(canvas).on('mouseleave', '.toolbar', function (e) {
    if (!$(this).hasClass('disabled')) {
      isOverToolbar = false
      $(this).toggleClass('disabled')
    }
  })

  $(canvas).on('mouseenter', '.button__editing', function (e) {
    // console.log(123)
    let number = ($(this).attr('id')).substring('toolbar__editing__button'.length)
    let testobjects = $('.canvas').children('.square')
    $(testobjects[number]).toggleClass('active__square__el__obj__edititng')
    // console.log($(testobjects[0]))
  })

  $(canvas).on('mouseleave', '.button__editing', function (e) {
    let number = ($(this).attr('id')).substring('toolbar__editing__button'.length)
    let testobjects = $('.canvas').children('.square')
    $(testobjects[number]).toggleClass('active__square__el__obj__edititng')
  })

  $(canvas).on('click', '.button__editing', function (e) {
    // // //console.log('click', $('.obj-table').children('.table-row').children('.table-action'))
    if (status != Statuses.EditingElements) {

      status = Statuses.EditingElements
      // //console.log(status)
      $('#flag').val('EditingInProgress')
      // $(".canvas").attr('wire:click.prevent', '')
      let categories = $('.categories').children()
      let number = ($(this).attr('id')).substring('toolbar__editing__button'.length)
      let active_category_id = $('#hidden-category-' + number).val()

      for (let i = 0; i < categories.length; i++) {
        // //console.log($(categories[i]).children('.form-check-input').attr('id').substr('radio_'.length), radio_checked_id)
        if ($(categories[i]).children('.form-check-input').attr('id').substr('radio_'.length) == active_category_id) {
          $(categories[i]).children('.form-check-input').prop('checked', true)
          radio_checked_id = active_category_id
          radio_checked_color = $('#span_' + radio_checked_id).css('color');
        }
      }

      let testobjects = $('.canvas').children('.square')
      let objects = $('.obj-table').children('.table-row').children('.table-action')

      $(this).html('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="green" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check align-middle"><polyline points="20 6 9 17 4 12"></polyline></svg>')
      $('#editing__button' + number).html('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="green" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check align-middle"><polyline points="20 6 9 17 4 12"></polyline></svg>')
      $(testobjects[number]).toggleClass('point__events')


      $(objects[number]).children('.button__deletting').toggleClass('button__deletting__disabled')

      $("input[type='radio']").toggleClass('categories-editing')
      $("input[type='radio']").toggleClass('categories-default')

      //смена класса необходимой строке
      $($('.obj-table').children('.table-row')[number]).toggleClass('table-row-editing')

      //смена класса области с текстом
      $($('.obj-table').children('.table-row').children('.desmetr')[number]).toggleClass('desmetr-editing')

      for (let i = 0; i < testobjects.length; i++) {
        // // //console.log(i, $(objects[number]).children())
        if (i != parseInt(number)) {
          $(testobjects[i]).toggleClass('hidden__squares')
          $(objects[i]).toggleClass('hidden__tools')
        }
      }

      let toolbars = $('.toolbar')
      for (let i = 0; i < testobjects.length; i++) {
        if (i != parseInt(number)) {
          $(toolbars[i]).toggleClass('hidden')
        }
      }

      $('.categories-editing').click(function () {
        //получение новых id и цвета у чекбокса
        radio_checked_id = $("input[name='radio_category']:checked").val()
        radio_checked_color = $('#span_' + radio_checked_id).css('color')

        //смена цвета выделенному квадрату
        $('.active__square__el__obj__edititng').css('color', radio_checked_color)
        // //console.log($('#span_' + radio_checked_id).text())

        //смена описания
        $('.desmetr-editing').text($('#span_' + radio_checked_id).text())

        //смена цвета фона
        $('.table-row-editing').css('background', radio_checked_color.substring(0, radio_checked_color.length - 1) + ', 0.25)')

        let edit_button_attr = $(objects[number]).children('.button__editing').attr('wire:click.prevent')
        edit_button_attr = edit_button_attr.substr(0, edit_button_attr.length - 2) + radio_checked_id + ')'
        // //console.log(edit_button_attr)
        $(objects[number]).children('.button__editing').attr('wire:click.prevent', edit_button_attr)
      })

      var d_x, d_y, d_top, d_left, d_width, d_height
      d_left = parseFloat($(`#square${number}`).css('left'))
      d_top = parseFloat($(`#square${number}`).css('top'))
      d_width = parseFloat($(`#square${number}`).css('width'))
      d_height = parseFloat($(`#square${number}`).css('height'))

      interact(testobjects[number]).resizable({
        // resize from all edges and corners
        edges: { left: true, right: true, bottom: true, top: true },

        listeners: {
          move(event) {
            var target = event.target
            var x = (parseFloat(target.getAttribute('data-x')) || 0)
            var y = (parseFloat(target.getAttribute('data-y')) || 0)

            // update the element's style
            target.style.width = event.rect.width * (1 / scale) + 'px'
            target.style.height = event.rect.height * (1 / scale) + 'px'
            // translate when resizing from top or left edges
            x += event.deltaRect.left * (1 / scale)
            y += event.deltaRect.top * (1 / scale)
            console.log(target.style.width, x, target.style.left)

            target.style.transform = 'translate(' + x + 'px,' + y + 'px)'

            $('#square_toolbar_' + number).css('left', parseFloat(target.style.left) + x + parseFloat(target.style.width))
            $('#square_toolbar_' + number).css('top', parseFloat(target.style.top) + y)

            target.setAttribute('data-x', x)
            target.setAttribute('data-y', y)

            d_left = parseFloat($(`#square${number}`).css('left'))
            d_top = parseFloat($(`#square${number}`).css('top'))
            d_width = parseFloat($(`#square${number}`).css('width'))
            d_height = parseFloat($(`#square${number}`).css('height'))
            // alert(123)
            // $(objects[number]).children('.button__editing').attr('wire:click.prevent', `update(true, ${parseInt(number) + 1}, ${d_left + x}, ${d_top + y}, ${event.rect.width * (1 / scale)}, ${event.rect.height * (1 / scale)}, ${radio_checked_id})`)
          }
        },
        modifiers: [
          // keep the edges inside the parent
          interact.modifiers.restrictEdges({
            outer: 'parent'
          }),

          // minimum size
          interact.modifiers.restrictSize({
            min: { width: 10, height: 10 }
          })
        ],

        inertia: true
      })

      interact(testobjects[number]).draggable({
        // enable inertial throwing
        inertia: true,
        // keep the element within the area of it's parent
        modifiers: [
          interact.modifiers.restrictRect({
            restriction: 'parent',
            endOnly: true
          })
        ],
        // enable autoScroll
        autoScroll: true,

        listeners: {
          // call this function on every dragmove event
          move: dragMoveListener,

          // call this function on every dragend event
          end(event) {
            var textEl = event.target.querySelector('p')

            textEl && (textEl.textContent =
              'moved a distance of ' +
              (Math.sqrt(Math.pow(event.pageX - event.x0, 2) +
                Math.pow(event.pageY - event.y0, 2) | 0))
                .toFixed(2) + 'px')
          }
        }
      })

      function dragMoveListener(event) {
        var target = event.target
        // keep the dragged position in the data-x/data-y attributes
        var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx / scale
        var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy / scale

        // translate the element
        target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'
        $('#square_toolbar_' + number).css('left', parseFloat(target.style.left) + x + parseFloat(target.style.width))
        $('#square_toolbar_' + number).css('top', parseFloat(target.style.top) + y)


        // update the posiion attributes
        target.setAttribute('data-x', x)
        target.setAttribute('data-y', y)

        d_left = parseFloat($(`#square${number}`).css('left'))
        d_top = parseFloat($(`#square${number}`).css('top'))
        d_width = parseFloat($(`#square${number}`).css('width'))
        d_height = parseFloat($(`#square${number}`).css('height'))

        // $(objects[number]).children('.button__editing').attr('wire:click.prevent', `update(true, ${parseInt(number) + 1}, ${d_left + x}, ${d_top + y}, ${d_width}, ${d_height}, ${radio_checked_id})`)
      }
      // // //console.log( $(testobjects[number]).css('x'))
      window.dragMoveListener = dragMoveListener

      // //console.log(number)
      // $(objects[number]).children('.button__editing').attr('wire:click', `update(${parseInt(number)+1}, 100, 100, 100, 100, ${radio_checked_id})`)
      // $(objects[number]).children('.button__editing').attr('wire:click.prevent', `update(true, ${parseInt(number) + 1}, ${d_left}, ${d_top}, ${d_width}, ${d_height}, ${radio_checked_id})`)
    }
    else {
      status = Statuses.CreatingElements
      let testobjects = $('.canvas').children('.square')
      let number = ($(this).attr('id')).substring('toolbar__editing__button'.length)
      let objects = $('.obj-table').children('.table-row').children('.table-action')
      // $(this).html('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="blue" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit-2 align-middle"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>')
      $(testobjects[number]).toggleClass('point__events')
      $("input[type='radio']").toggleClass('categories-editing')
      $("input[type='radio']").toggleClass('categories-default')
      $($('.obj-table').children('.table-row')[number]).toggleClass('table-row-editing')
      $($('.obj-table').children('.table-row').children('.desmetr')[number]).toggleClass('desmetr-editing')

      // for (let i = 0; i < testobjects.length; i++) {

      //   if (i != parseInt(number)) {
      //     $(testobjects[i]).toggleClass('hidden__squares')
      //     $(objects[i]).toggleClass('hidden__tools')
      //   }
      // }
      $(objects[number]).children('.button__deletting').toggleClass('button__deletting__disabled')
      // $('#hiddenX').val().split(',')[number] = $(testobjects[number]).css('x')
      $(objects[number]).children('.button__editing').attr('wire:click.prevent', '')

      let object = $('#square' + number)
      let dx = $(object).attr('data-x') == null ? 0 : parseFloat($(object).attr('data-x'))
      let dy = $(object).attr('data-y') == null ? 0 : parseFloat($(object).attr('data-y'))

      Livewire.emit(
        'update',
        parseInt(number) + 1,
        parseFloat($(object).css('left')) + dx,
        parseFloat($(object).css('top')) + dy,
        parseFloat($(object).css('width')),
        parseFloat($(object).css('height')),
        radio_checked_id
      )


      // alert(123)
    }

  })

  $(canvas).on('mouseenter', '.button__deletting', function (e) {
    let number = ($(this).attr('id')).substring(delettingButtonId.length)
    let testobjects = $('.canvas').children('.square')
    $(testobjects[number]).toggleClass('active__square__el__obj__deletting')
  })

  //new mouseleave delete
  $(canvas).on('mouseleave', '.button__deletting', function (e) {
    if (isOverToolbar) {
      let number = ($(this).attr('id')).substring(delettingButtonId.length)
      let testobjects = $('.canvas').children('.square')
      $(testobjects[number]).toggleClass('active__square__el__obj__deletting')
    }
  })

  //new click delete
  $(canvas).on('click', '.button__deletting', function (e) {
    isOverToolbar = false
  })
  // $('#toggle_grid').on('mouseenter', function (e) {
  //   $('#text').removeAttr('wire:ignore')
  //   $('script[src="' + script_src + '"]').remove();
  //   // //console.log($('script[src="' + script_src + '"]'))
  //   // alert(123)
  //     // $('<script>').attr('src', script_src).appendTo('head');
  // })

  // $('#toggle_grid').on('mouseleave', function (e) {
  //   $('#text').attr('wire:ignore', '')
  //   // window.location.href = 12519
  // })

  $('#toggle_grid').on('click', function (e) {
    $('.canvas').toggleClass('grid')
  })

  function addOnWheel(elem, handler) {
    if (elem.addEventListener) {
      if ('onwheel' in document) {
        // IE9+, FF17+
        elem.addEventListener("wheel", handler);
      } else if ('onmousewheel' in document) {
        // устаревший вариант события
        elem.addEventListener("mousewheel", handler);
      } else {
        // 3.5 <= Firefox < 17, более старое событие DOMMouseScroll пропустим
        elem.addEventListener("MozMousePixelScroll", handler);
      }
    } else { // IE8-
      text.attachEvent("onmousewheel", handler);
    }
  }



  var zoom = $('.canvas')

  addOnWheel(text, function (e) {
    var delta = e.deltaY || e.detail || e.wheelDelta;

    var xs = (e.layerX - pointX) / scale,
      ys = (e.layerY - pointY) / scale

    var outer_width = document.getElementById('text').offsetWidth
    var outer_height = document.getElementById('text').offsetHeight
    var old_center_X = parseInt(((img.width * scale - outer_width)) / 2)


    // $('#edit_toolbar_0').css('width', 24 / scale)
    // $('#edit_toolbar_0').css('height', 24 / scale)

    if (delta > 0) {
      scale -= 0.05
      document.querySelector('#text').scrollTop = document.querySelector('#text').scrollTop
      document.querySelector('#text').scrollLeft = document.querySelector('#text').scrollLeft
      // document.querySelector('#text').scrollLeft = ((img.width * scale - outer_width)) / 2 //просто к центру
      // document.querySelector('#text').scrollTop = ((img.height * scale - outer_height)) / 2
    }

    else {
      scale += 0.05
      var center_X = parseInt(((img.width * (scale) - outer_width)) / 2)
      // // //console.log(img.width, img.width * scale, outer_width)

      // if (document.querySelector('#text').scrollLeft == 0)
      // {
      // $('#text').scrollLeft( ((img.width * scale - outer_width)) / 2 )
      // }
      // else {
      //   document.querySelector('#text').scrollLeft = ((img.width * scale - outer_width)) / 2 + (document.querySelector('#text').scrollLeft - (((img.width * (scale-0.05) - outer_width)) / 2) ) 
      // }

      // if (document.querySelector('#text').scrollTop == 0)
      // {
      // document.querySelector('#text').scrollTop = ((img.height * scale - outer_height)) / 2
      // }
      // else
      // {
      //   document.querySelector('#text').scrollTop = ((img.height * scale - outer_height)) / 2 + (document.querySelector('#text').scrollTop - (((img.height * (scale - 0.05) - outer_height)) / 2))
      // }
      document.querySelector('#text').scrollTop = document.querySelector('#text').scrollTop / (scale - 0.05) * scale
      document.querySelector('#text').scrollLeft = document.querySelector('#text').scrollLeft / (scale - 0.05) * scale
      // // //console.log(document.querySelector('#text').scrollHeight, img.height * (scale - 0.05))
      // // //console.log(document.querySelector('#text').scrollHeight, document.querySelector('#text').scroll)

      // document.querySelector('#text').scrollTo({
      //   top: e.layerY,
      //   left: 0,
      //   behavior: "smooth",
      // })


    }

    if (scale < min_scale)
      scale = min_scale

    // //console.log(e.clientY)
    pointX = e.layerX - xs * scale
    pointY = e.layerY - ys * scale

    // $('.canvas').css('transform', "translate(" + -document.querySelector('#text').scrollLeft * scale + "px, " + -document.querySelector('#text').scrollTop * scale + "px) scale(" + scale + ")")
    // $('.canvas').css('transform-origin', parseInt(document.querySelector('#text').scrollLeft) + 'px ' + parseInt(document.querySelector('#text').scrollTop) + 'px')

    $(zoom).css('transform', "scale(" + scale + ") ")
    e.preventDefault();
  });

  //////////////////////////////////////////////////////////////

  $(document).on('goToPageClicked', function (e) {
    scale = 1
    img = new Image();
    img.src = $(".img__current").attr('src');
    // //console.log(img.height)
    img.onload = function () {

    }
    $(canvas).css("width", img.width);
    $(canvas).css("height", img.height);


    while (
      img.height * scale > parseInt($('#text').css('height')) || img.width * scale > parseInt($('#text').css('width'))
    ) {
      scale -= 0.05
      min_scale = scale
      // //console.log(img.width * scale, parseInt($('#text').css('width')))
    }
    if (scale == 1) {
      while (
        img.height * scale < parseInt($('#text').css('height')) && img.width * scale < parseInt($('#text').css('width'))
      ) {
        scale += 0.05
      }
      min_scale = 1
    }


    $(canvas).css('transform', 'scale(' + scale + ')')

  })

})