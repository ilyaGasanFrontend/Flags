$(document).ready(function (e) {
  const Statuses = Object.freeze({
    CreatingElements: 1,
    EditingElements: 2,
    DeletingElements: 3
  });
  var script_src = document.getElementsByTagName('script')[3].src
  console.log(script_src)
  var prevobjects = $('.dropdown-menu')
  var canvas = $('.canvas')
  var form = $('.hidden-form')

  var statusElements = $('.action-el')
  var status = Statuses.CreatingElements

  var hot_update = false, hot_update_id, on_object = false, hot_update_d_X = 0, hot_update_d_Y = 0

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
    console.log(img.width * scale, parseInt($('#text').css('width')))
  }
  if (scale == 1) {
    while (
      img.height * scale < parseInt($('#text').css('height')) && img.width * scale < parseInt($('#text').css('width'))
    ) {
      scale += 0.05

      // console.log(scale)
    }
    min_scale = 1
  }


  // $(canvas).css('left', parseFloat($(text).css('width')) / 2 - parseFloat($('.img__current').css('width')) / 2)

  $(canvas).css('transform', 'scale(' + scale + ')')
  console.log((parseFloat($(canvas).css('width')) - parseFloat($(text).css('width')) * scale) / 2)
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
  // console.log(radio_checked_id, radio_checked_color)

  $("input[type='radio']").click(function () {
    radio_checked_id = $("input[name='radio_category']:checked").val()
    radio_checked_color = $('#span_' + radio_checked_id).css('color')
    // console.log(radio_checked_id, radio_checked_color)
    // console.log(categories_arr)
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

  // $(document).on('RecordCreated', function (e) {
  //   alert('record')
  // })
  
  $(canvas).on('mousedown', function (e) {
    if (hot_update) {
      let testobjects = $('.canvas').children('.square')
      let number = hot_update_id


      if (!on_object) {
        $(testobjects[number]).toggleClass('point__events')
        $(testobjects[number]).toggleClass('active__square__el__obj__edititng')
        // status = Statuses.CreatingElements
        let object_X = parseInt($(testobjects[number]).css('left')),
          object_Y = parseInt($(testobjects[number]).css('top')),
          object_width = parseInt($(testobjects[number]).css('width')),
          object_height = parseInt($(testobjects[number]).css('height'))

          Livewire.emit('create',
              parseInt(curenid.substr(7, curenid.length)) + 1,
              parseInt(radio_checked_id),
              object_X + hot_update_d_X,
              object_Y + hot_update_d_Y,
              object_width,
              object_height)
        hot_update_d_X = 0
        hot_update_d_Y = 0 
        console.log(parseInt(object_X + hot_update_d_X))
        hot_update = false
      }
      
    }
    else {
      status = Statuses.CreatingElements
      // alert(status)
      console.log(status)
    }
    switch (status) {
      case (Statuses.CreatingElements):
        // startcoordX = (e.originalEvent.layerX - pointX) / scale
        // startcoordY = (e.originalEvent.layerY - pointY) / scale

        startcoordX = e.originalEvent.layerX / scale
        startcoordY = e.originalEvent.layerY / scale

        console.log(startcoordX, $(canvas).css('transform'), pointX)
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

        flag = true

        is_out = false

        // startcoordX = e.clientX
        // startcoordY = e.clientY

        $(".canvas").attr('wire:click.prevent', '')
        break
    }
  
  });

  $(canvas).on('mouseleave', function (e) {
    if (flag) {
      flag = false
      is_out = true
      let objects = (canvas).children()
      $(objects[objects.length - 1]).remove()
      // console.log('exit')
    }


  })
  $(canvas).on('mousemove', function (e) {
    switch (status) {
      case (Statuses.CreatingElements):
        if (flag) {
          // var endcoordX = (e.originalEvent.layerX - pointX) / scale
          // var endcoordY = (e.originalEvent.layerY - pointY) / scale

          var endcoordX = e.originalEvent.layerX / scale
          var endcoordY = e.originalEvent.layerY / scale

          var width_current = endcoordX - startcoordX
          var height_current = endcoordY - startcoordY
          // console.log(e.originalEvent.layerX
          // var width_current = (e.originalEvent.clientX - startcoordX) / scale
          // var height_current = (e.originalEvent.clientY - startcoordY) / scale
          console.log(width_current, pointX)

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
        flag = false;
        if (parseInt($(curenid).css('width')) < 20 && parseInt($(curenid).css('height')) < 20) {
          $(curenid).css('width', 20)
          $(curenid).css('height', 20)

          $(curenid).css('border-radius', "50%")
          $(curenid).css('top', parseInt($(curenid).css('top')) - parseInt($(curenid).css('height')) / 2)
          $(curenid).css('left', parseInt($(curenid).css('left')) - parseInt($(curenid).css('width')) / 2)

        }
        console.log(img.height)
        $(id).css('width', (e.clientX - startcoordX) / scale)
        $(id).css('height', (e.clientY - startcoordY) / scale)



        console.log(radio_checked_id)

        hot_update = true
        status = Statuses.EditingElements
        let number = $('.canvas').children('.square').length - 1
        hot_update_id = number
        console.log(number)
        let testobjects = $('.canvas').children('.square')
        // let number = ($(this).attr('id')).substring(editingButtonId.length)
        console.log(number, '1111111111111111111')
        let objects = $('.obj-table').children('.table-row').children('.table-action')
        // $(this).html('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="green" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check align-middle"><polyline points="20 6 9 17 4 12"></polyline></svg>')
        $(testobjects[number]).toggleClass('point__events')
        $(testobjects[number]).toggleClass('active__square__el__obj__edititng')

        var d_x, d_y, d_top, d_left, d_width, d_height
        d_x = ($(`#square${number}`).css('data-x') || 0)
        d_y = ($(`#square${number}`).css('data-y') || 0)
        d_left = parseFloat($(`#square${number}`).css('left'))
        d_top = parseFloat($(`#square${number}`).css('top'))
        d_width = parseFloat($(`#square${number}`).css('width'))
        d_height = parseFloat($(`#square${number}`).css('height'))

        if (hot_update) {
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

                target.setAttribute('data-x', x)
                target.setAttribute('data-y', y)

                d_x = x
                d_y = y
                hot_update_d_X = x
                hot_update_d_Y = y
                d_left = parseFloat($(`#square${number}`).css('left'))
                console.log(x)
                d_top = parseFloat($(`#square${number}`).css('top'))
                d_width = parseFloat($(`#square${number}`).css('width'))
                d_height = parseFloat($(`#square${number}`).css('height'))

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

            // update the posiion attributes
            target.setAttribute('data-x', x)
            target.setAttribute('data-y', y)

            d_x = x
            d_y = y
            hot_update_d_X = x
            hot_update_d_Y = y
            d_left = parseFloat($(`#square${number}`).css('left'))
            d_top = parseFloat($(`#square${number}`).css('top'))
            d_width = parseFloat($(`#square${number}`).css('width'))
            d_height = parseFloat($(`#square${number}`).css('height'))

            $(objects[number]).children('.button__editing').attr('wire:click.prevent', `update(true, ${parseInt(number) + 1}, ${d_left + x}, ${d_top + y}, ${d_width}, ${d_height}, ${radio_checked_id})`)
          }
          // console.log( $(testobjects[number]).css('x'))
          window.dragMoveListener = dragMoveListener
        }
        // $('.canvas').on('mousedown', function (e) {
        //   let object_X = parseInt($(testobjects[number]).css('left')),
        //     object_Y = parseInt($(testobjects[number]).css('top')),
        //     object_width = parseInt($(testobjects[number]).css('width')),
        //     object_height = parseInt($(testobjects[number]).css('height'))

        //   if (!on_object) {

        //     // status = Statuses.CreatingElements
        //     $(testobjects[number]).toggleClass('point__events')
        //     $(testobjects[number]).toggleClass('active__square__el__obj__edititng')
        //     hot_update = false
        //     status = Statuses.CreatingElements
        //     // alert(hot_update)
        //     Livewire.emit('create',
        //       parseInt(curenid.substr(7, curenid.length)) + 1,
        //       parseInt(radio_checked_id),
        //       object_X + d_x,
        //       object_Y + d_y,
        //       object_width,
        //       object_height)

        //     console.log(123, number)
        //     number = 0
        //   }
        //   // alert([object_X, object_Y, object_width, object_height])
        // })

        // var on_object = false;
        $(testobjects[number]).on('mouseover', function (e) {
          on_object = true;
        })

        $(testobjects[number]).on('mouseleave', function (e) {
          on_object = false;
        })

        // if (!is_out) {
        //   // $("#text").attr('wire:ignore', '')
        //   $(".canvas").attr('wire:click.prevent', `create(${parseInt(curenid.substr(7, curenid.length)) + 1}, ${radio_checked_id}, ${parseFloat($(id).css('left'))}, ${parseFloat($(id).css('top'))}, ${parseFloat($(id).css('width'))}, ${parseFloat($(id).css('height'))})`)
        //   // $("#text").removeAttr('wire:ignore')
        // }
        // status = Statuses.CreatingElements
        break
    }

  });


  ///////

  $('.obj-table').on('mouseenter', '.button__editing', function (e) {

    let number = ($(this).attr('id')).substring(editingButtonId.length)
    console.log(number)
    let testobjects = $('.canvas').children('.square')
    $(testobjects[number]).toggleClass('active__square__el__obj__edititng')
    console.log('over')
  })


  //new mouseleave edit
  $('.obj-table').on('mouseleave', '.button__editing', function (e) {
    let number = ($(this).attr('id')).substring(editingButtonId.length)
    let testobjects = $('.canvas').children('.square')
    $(testobjects[number]).toggleClass('active__square__el__obj__edititng')
  })

  //new click edit
  $('.obj-table').on('click', '.button__editing', function (e) {
    // console.log('click', $('.obj-table').children('.table-row').children('.table-action'))
    if (status != Statuses.EditingElements) {

      status = Statuses.EditingElements
      console.log(status)
      $('#flag').val('EditingInProgress')
      $(".canvas").attr('wire:click.prevent', '')
      let categories = $('.categories').children()
      let number = ($(this).attr('id')).substring(editingButtonId.length)
      let active_category_id = $('#hidden-category-' + number).val()

      for (let i = 0; i < categories.length; i++) {
        console.log($(categories[i]).children('.form-check-input').attr('id').substr('radio_'.length), radio_checked_id)
        if ($(categories[i]).children('.form-check-input').attr('id').substr('radio_'.length) == active_category_id) {
          $(categories[i]).children('.form-check-input').prop('checked', true)
          radio_checked_id = active_category_id
          radio_checked_color = $('#span_' + radio_checked_id).css('color');
        }
      }

      let testobjects = $('.canvas').children('.square')
      // let number = ($(this).attr('id')).substring(editingButtonId.length)
      console.log(number, '1111111111111111111')
      let objects = $('.obj-table').children('.table-row').children('.table-action')
      $(this).html('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="green" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check align-middle"><polyline points="20 6 9 17 4 12"></polyline></svg>')
      $(testobjects[number]).toggleClass('point__events')


      $(objects[number]).children('.button__deletting').toggleClass('button__deletting__disabled')

      $("input[type='radio']").toggleClass('categories-editing')
      $("input[type='radio']").toggleClass('categories-default')

      //смена класса необходимой строке
      $($('.obj-table').children('.table-row')[number]).toggleClass('table-row-editing')

      //смена класса области с текстом
      $($('.obj-table').children('.table-row').children('.desmetr')[number]).toggleClass('desmetr-editing')

      for (let i = 0; i < testobjects.length; i++) {
        // console.log(i, $(objects[number]).children())
        if (i != parseInt(number)) {
          $(testobjects[i]).toggleClass('hidden__squares')
          $(objects[i]).toggleClass('hidden__tools')
        }
      }

      // console.log($($('.obj-table').children('.table-row')[number]).children('.button__editing').attr('wire:click', 'dododo(123)'))

      $('.categories-editing').click(function () {
        //получение новых id и цвета у чекбокса
        radio_checked_id = $("input[name='radio_category']:checked").val()
        radio_checked_color = $('#span_' + radio_checked_id).css('color')

        //смена цвета выделенному квадрату
        $('.active__square__el__obj__edititng').css('color', radio_checked_color)
        console.log($('#span_' + radio_checked_id).text())

        //смена описания
        $('.desmetr-editing').text($('#span_' + radio_checked_id).text())

        //смена цвета фона
        $('.table-row-editing').css('background', radio_checked_color.substring(0, radio_checked_color.length - 1) + ', 0.25)')

        let edit_button_attr = $(objects[number]).children('.button__editing').attr('wire:click.prevent')
        edit_button_attr = edit_button_attr.substr(0, edit_button_attr.length - 2) + radio_checked_id + ')'
        console.log(edit_button_attr)
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

            target.setAttribute('data-x', x)
            target.setAttribute('data-y', y)

            d_left = parseFloat($(`#square${number}`).css('left'))
            d_top = parseFloat($(`#square${number}`).css('top'))
            d_width = parseFloat($(`#square${number}`).css('width'))
            d_height = parseFloat($(`#square${number}`).css('height'))

            $(objects[number]).children('.button__editing').attr('wire:click.prevent', `update(true, ${parseInt(number) + 1}, ${d_left + x}, ${d_top + y}, ${event.rect.width * (1 / scale)}, ${event.rect.height * (1 / scale)}, ${radio_checked_id})`)
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

        // update the posiion attributes
        target.setAttribute('data-x', x)
        target.setAttribute('data-y', y)

        d_left = parseFloat($(`#square${number}`).css('left'))
        d_top = parseFloat($(`#square${number}`).css('top'))
        d_width = parseFloat($(`#square${number}`).css('width'))
        d_height = parseFloat($(`#square${number}`).css('height'))

        $(objects[number]).children('.button__editing').attr('wire:click.prevent', `update(true, ${parseInt(number) + 1}, ${d_left + x}, ${d_top + y}, ${d_width}, ${d_height}, ${radio_checked_id})`)
      }
      // console.log( $(testobjects[number]).css('x'))
      window.dragMoveListener = dragMoveListener

      console.log(number)
      // $(objects[number]).children('.button__editing').attr('wire:click', `update(${parseInt(number)+1}, 100, 100, 100, 100, ${radio_checked_id})`)
      $(objects[number]).children('.button__editing').attr('wire:click.prevent', `update(true, ${parseInt(number) + 1}, ${d_left}, ${d_top}, ${d_width}, ${d_height}, ${radio_checked_id})`)
    }
    else {
      // alert(status)


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
    console.log($('.canvas').children('.square').length)

    testobjects = $('.canvas').children('.square')
    objects = $('.obj-table').children('.table-row')
    console.log(objects, '!!!!!!!!!!!!!!!!!!!', number)

    for (let i = 0; i < testobjects.length; i++) {
      console.log($(testobjects[i]).attr('id'))
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


  $('.canvas').on('mouseenter', '.square', function (e) {

    switch (status) {
      case (Statuses.EditingElements):
        $(this).toggleClass('active__square__el__obj__changing')

        let number = ($(this).attr('id')).substring(square.length)

        let objects = $('.dropdown-menu-obj').children()
        $(objects[number]).toggleClass('active__menu__el__obj__changing')

        break


      case (Statuses.DeletingElements):
        $(this).toggleClass('active__square__el__obj__deletting')

        let numberD = ($(this).attr('id')).substring(square.length)

        let objectsD = $('.dropdown-menu-obj').children()
        $(objectsD[numberD]).toggleClass('active__menu__el__obj__deletting')

        break
    }
  })

  $('.canvas').on('mouseleave', '.square', function (e) {
    switch (status) {
      case (Statuses.EditingElements):
        $(this).toggleClass('active__square__el__obj__changing')

        let number = ($(this).attr('id')).substring(square.length)

        let objects = $('.dropdown-menu-obj').children()
        $(objects[number]).toggleClass('active__menu__el__obj__changing')

        break
      case (Statuses.DeletingElements):
        $(this).toggleClass('active__square__el__obj__deletting')

        let numberD = ($(this).attr('id')).substring(square.length)

        let objectsD = $('.dropdown-menu-obj').children()
        $(objectsD[numberD]).toggleClass('active__menu__el__obj__deletting')
        break
    }
  })

  $('#toggle_grid').on('click', function (e) {
    // console.log($('#canvas').css('transform'))
    $('.canvas').toggleClass('grid')
    // $('#image').attr('scr', '/storage/photos/levHiM5VCWB4NLqNlEBeYQRg7SMOIdMvKDcnsy9V.jpg')

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
      // console.log(img.width, img.width * scale, outer_width)

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
      // console.log(document.querySelector('#text').scrollHeight, img.height * (scale - 0.05))
      // console.log(document.querySelector('#text').scrollHeight, document.querySelector('#text').scroll)

      // document.querySelector('#text').scrollTo({
      //   top: e.layerY,
      //   left: 0,
      //   behavior: "smooth",
      // })


    }

    if (scale < min_scale)
      scale = min_scale

    console.log(e.clientY)
    pointX = e.layerX - xs * scale
    pointY = e.layerY - ys * scale

    // $('.canvas').css('transform', "translate(" + -document.querySelector('#text').scrollLeft * scale + "px, " + -document.querySelector('#text').scrollTop * scale + "px) scale(" + scale + ")")
    // $('.canvas').css('transform-origin', parseInt(document.querySelector('#text').scrollLeft) + 'px ' + parseInt(document.querySelector('#text').scrollTop) + 'px')

    $(zoom).css('transform', "scale(" + scale + ") ")
    e.preventDefault();
  });

  //////////////////////////////////////////////////////////////

  $(document).on('nextPageClicked', function (e) {
    scale = 1
    img = new Image();
    img.src = $(".img__current").attr('src');
    console.log(img.height)
    img.onload = function () {

    }
    $(canvas).css("width", img.width);
    $(canvas).css("height", img.height);


    while (
      img.height * scale > parseInt($('#text').css('height')) || img.width * scale > parseInt($('#text').css('width'))
    ) {
      scale -= 0.05
      min_scale = scale
      console.log(img.width * scale, parseInt($('#text').css('width')))
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

  $(document).on('prevPageClicked', function (e) {
    scale = 1
    img = new Image();
    img.src = $(".img__current").attr('src');
    console.log(img.height)
    img.onload = function () {

    }
    $(canvas).css("width", img.width);
    $(canvas).css("height", img.height);


    while (
      img.height * scale > parseInt($('#text').css('height')) || img.width * scale > parseInt($('#text').css('width'))
    ) {
      scale -= 0.05
      min_scale = scale
      console.log(img.width * scale, parseInt($('#text').css('width')))
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
