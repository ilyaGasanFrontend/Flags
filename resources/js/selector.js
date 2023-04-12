function createRadioElement(name, checked) {
  var radioHtml = '<input type="radio" name="' + name + '"';
  if (checked) {
    radioHtml += ' checked="checked"';
  }
  radioHtml += '/>';
  var radioFragment = document.createElement('div');
  radioFragment.innerHTML = radioHtml;
  return radioFragment.firstChild;
}


$(document).ready(function (e) {
  console.log($('div.container').css('height'))
  console.log($('div.container').css('width'))



  //  console.log($(document).css('pointer-event'))
  if ($('#hiddenX').val() == '') {
    var x_arr = []
    var y_arr = []
    var width_arr = []
    var height_arr = []
    var categories_arr = []
  }
  else {

    var x_arr = $('#hiddenX').val().split(',')
    var y_arr = $('#hiddenY').val().split(',')
    var width_arr = $('#hiddenWidth').val().split(',')
    var height_arr = $('#hiddenHeight').val().split(',')
    var categories_arr = $('#hiddenCategory').val().split(',')
  }

  var delete_arr = []

  console.log($('#hiddenX').val().split(','))
  // var x_arr = $('#hiddenX').val().split(',')
  // var x_arr = []
  // var y_arr = []
  // var width_arr = []
  // var height_arr = []

  const Statuses = Object.freeze({
    CreatingElements: 1,
    EditingElements: 2,
    DeletingElements: 3
  });
  var prevobjects = $('.dropdown-menu')
  var canvas = $('.canvas')
  var form = $('.hidden-form')

  var statusElements = $('.action-el')
  var status = Statuses.CreatingElements

  var scale = 1;

  const img = new Image();

  img.src = $(".img__current").attr('src');
  img.onload = function () {

  }
  $(canvas).css("width", img.width);
  $(canvas).css("height", img.height);

  while (
    img.height * scale > parseInt($('div.container').css('height')) || img.width * scale > parseInt($('div.container').css('width'))
  ) {
    scale -= 0.05
    console.log(scale)
  }
  text.style.transform = text.style.WebkitTransform = text.style.MsTransform = 'scale(' + scale + ')';
  var min_scale = scale
  const square = 'square'
  const prev__elemnt__objects = 'prev__elemnt__objects'

  var startcoordX = 0
  var startcoordY = 0

  var distX = 0
  var distY = 0
  var flag = false
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

  function getRandomColor() {
    var radios = $('input[name=color_selector]:checked').val();
    return radios;
  }

  // //////////////////////////////////////////////////////
  // $('#create-elements').on('click', e => {
  //   // for (let i = 0; i < arraBase64OBj.length; i++) {
  //   //   $(arraBase64OBj[i]).toggleClass('point__events')
  //   // }

  //   status = Statuses.CreatingElements
  // })
  // $('#change-size').on('click', e => {
  //   status = Statuses.EditingElements

  //   // for (let i = 0; i < arraBase64OBj.length; i++) {
  //   //   $(arraBase64OBj[i]).toggleClass('point__events')
  //   // }

  // })
  // $('#delete-elements').on('click', e => {
  //   status = Statuses.DeletingElements
  //   // for (let i = 0; i < arraBase64OBj.length; i++) {
  //   //   $(arraBase64OBj[i]).toggleClass('point__events')
  //   // }
  // })





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
        startcoordX = e.originalEvent.layerX / scale
        startcoordY = e.originalEvent.layerY / scale

        var object = $('<div>', {
          'class': 'square point__events',
        })
        id = '#' + square + $('.canvas').children('.square').length
        curenid = id
        startcoordX = parseInt($(canvas).css("width")) / 2 + startcoordX;
        startcoordY = parseInt($(canvas).css("height")) / 2 + startcoordY;
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
        startcoordX = e.clientX
        startcoordY = e.clientY


        break
      case (Statuses.EditingElements):

        break
    }
  });
  $(canvas).on('mouseleave', function (e) {
    if (flag) {
      flag = false
      let objects = (canvas).children()
      $(objects[objects.length - 1]).remove()
      // console.log('exit')
    }


  })
  $(canvas).on('mousemove', function (e) {
    switch (status) {
      case (Statuses.CreatingElements):
        if (flag) {

          var width_current = (e.originalEvent.clientX - startcoordX) / scale;
          var height_current = (e.originalEvent.clientY - startcoordY) / scale;


          if (width_current >= 0 && height_current >= 0) {
            $(id).css('left', newstartX)
            $(id).css('top', newstartY)
            $(id).css('width', (width_current))
            $(id).css('height', (height_current))
          }
          else {
            if (width_current < 0 && height_current < 0) {
              var a = parseInt($(canvas).css("width")) / 2 + e.originalEvent.layerX / scale
              var b = parseInt($(canvas).css("height")) / 2 + e.originalEvent.layerY / scale

              $(id).css('left', parseInt(a))
              $(id).css('top', parseInt(b))
              $(id).css('width', parseInt(Math.abs(width_current)))
              $(id).css('height', parseInt(Math.abs(height_current)))
            }
            if (width_current < 0 && height_current > 0) {
              var a = parseInt($(canvas).css("width")) / 2 + e.originalEvent.layerX / scale
              var b = newstartY;

              $(id).css('left', parseInt(a))
              $(id).css('top', parseInt(b))
              $(id).css('width', parseInt(Math.abs(width_current)))
              $(id).css('height', parseInt(Math.abs(height_current)))
            }
            if (width_current > 0 && height_current < 0) {
              var a = newstartX
              var b = parseInt($(canvas).css("height")) / 2 + e.originalEvent.layerY / scale

              $(id).css('left', parseInt(a))
              $(id).css('top', parseInt(b))
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

        x_arr.push($(id).css('left'))
        y_arr.push($(id).css('top'))
        width_arr.push($(id).css('width'))
        height_arr.push($(id).css('height'))
        categories_arr.push($("input[name='radio_category']:checked").val())

        $('#hiddenX').val(x_arr)
        $('#hiddenY').val(y_arr)
        $('#hiddenWidth').val(width_arr)
        $('#hiddenHeight').val(height_arr)
        $('#hiddenCategory').val(categories_arr)

        let number = $('.canvas').children('.square').length - 1
        var obj = $('.obj-table')
        console.log(radio_checked_color.substring(0, radio_checked_color.length - 1) + ', 0.4)')
        var table_row = $('<tr>', {
          'id': 'table_row_' + number,
          'class': 'table-row',
          'style': 'background-color: ' + radio_checked_color.substring(0, radio_checked_color.length - 1) + ', 0.25)',

        })

        var td_number = $('<td>', {
          'class': 'number',
        })

        var td_desmetr = $('<td>', {
          'class': 'desmetr',
        })

        var td_table_action = $('<td>', {
          'class': 'table-action',
        })

        var edit_button = $('<a>', {
          'class': 'button__editing',
          'id': `${editingButtonId}${$('.canvas').children('.square').length - 1}`,
          // 'style': 'text-decoration: none'

        })
        var delete_button = $('<a>', {
          'class': 'button__deletting',
          'id': `${delettingButtonId}${$('.canvas').children('.square').length - 1}`,
          'wire:click.prevent': `delete(${number})`
          // 'style': 'text-decoration: none'

        })

        console.log($(id).css('left'))
        console.log(x_arr)
        // console.log(startcoordX)





        $(obj).append(table_row)
        // $(obj).append('<tr id="table_row_0" class="table-row" style="background-color: #00000040;"><td class="number">1</td><td class="desmetr">Категория1</td><td class="table-action"><a class="button__editing" id="editing__button0" style="text-decoration: none"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="blue" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit-2 align-middle"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg></a><a class="button__deletting" id="deletting__button0" style="text-decoration: none"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="red" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2 align-middle me-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg></a></td></tr>')
        console.log($('#span_' + radio_checked_id).text())
        $(td_number).html($('.canvas').children('.square').length)
        $(table_row).append(td_number)
        $(td_desmetr).html($('#span_' + radio_checked_id).text())
        $(table_row).append(td_desmetr)

        var svg_edit = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="blue" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit-2 align-middle me-1"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>'
        var svg_delete = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="red" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2 align-middle me-2"> <polyline points="3 6 5 6 21 6"></polyline> <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"> </path> <line x1="10" y1="11" x2="10" y2="17"> </line> <line x1="14" y1="11" x2="14" y2="17"> </line> </svg>'

        $(edit_button).append(svg_edit)
        $(td_table_action).append(edit_button)
        $(delete_button).append(svg_delete)
        $(td_table_action).append(delete_button)
        $(table_row).append(td_table_action)
        // // $(object).append(form)


        ///////////////////////////////////////////////////////////////////////
        // $(object).append(hidden_x)
        // $(object).append(hidden_y)
        // $(object).append(hidden_width)
        // $(object).append(hidden_height)


        // $(object).append(textbox)
        // $(object).append('<label for="testtext">123</label>')
        console.log(radio_checked_id)
        $(".canvas").attr('wire:click.prevent', `create(${parseInt(curenid.substr(7, curenid.length)) + 1}, ${radio_checked_id}, ${parseFloat($(id).css('left'))}, ${parseFloat($(id).css('top'))}, ${parseFloat($(id).css('width'))}, ${parseFloat($(id).css('height'))})`)
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

      $('#flag').val('EditingInProgress')

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

            $(objects[number]).children('.button__editing').attr('wire:click.prevent', `update(true, ${number + 1}, ${d_left + x}, ${d_top + y}, ${event.rect.width * (1 / scale)}, ${event.rect.height * (1 / scale)}, ${radio_checked_id})`)
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

        $(objects[number]).children('.button__editing').attr('wire:click.prevent', `update(true, ${number + 1}, ${d_left + x}, ${d_top + y}, ${d_width}, ${d_height}, ${radio_checked_id})`)
      }
      // console.log( $(testobjects[number]).css('x'))
      window.dragMoveListener = dragMoveListener

      console.log(number)
      // $(objects[number]).children('.button__editing').attr('wire:click', `update(${parseInt(number)+1}, 100, 100, 100, 100, ${radio_checked_id})`)
      $(objects[number]).children('.button__editing').attr('wire:click.prevent', `update(true, ${number + 1}, ${d_left}, ${d_top}, ${d_width}, ${d_height}, ${radio_checked_id})`)
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


      //алгоритм для обновления данных
      let old_X = $('#square' + number).css('left')
      let old_Y = $('#square' + number).css('top')
      old_X = old_X.substring(0, old_X.length - 2)
      old_Y = old_Y.substring(0, old_Y.length - 2)
      console.log('oldX', old_X, old_Y)

      let transform_value = $(testobjects[number]).css('transform')
      let tmp_X = 0
      let tmp_Y = 0
      if (transform_value != 'none') {
        transform_value = transform_value.substring(7)
        transform_value = transform_value.substring(0, transform_value.length - 1)
        tmp_X = transform_value.split(',')[4]
        tmp_Y = transform_value.split(',')[5]
      }

      console.log(tmp_X, tmp_Y)
      // $('#hiddenX').val(new_X.split(',')[4])

      let new_arr_X = $('#hiddenX').val().split(',')
      let new_arr_Y = $('#hiddenY').val().split(',')

      console.log(new_arr_X);
      let new_X = new_arr_X[number]
      let new_Y = new_arr_Y[number]
      new_X = new_X.substring(0, new_X.length - 2)
      new_X = parseFloat(old_X) + parseFloat(tmp_X) + 'px'

      new_Y = new_Y.substring(0, new_Y.length - 2)
      new_Y = parseFloat(old_Y) + parseFloat(tmp_Y) + 'px'
      console.log(new_X, new_Y)
      new_arr_X[number] = new_X
      new_arr_Y[number] = new_Y
      $('#hiddenX').val(new_arr_X)
      $('#hiddenY').val(new_arr_Y)

      let new_arr_Width = $('#hiddenWidth').val().split(',')
      new_arr_Width[number] = $('#square' + number).css('width')
      console.log('width', new_arr_Width)
      $('#hiddenWidth').val(new_arr_Width)

      let new_arr_Height = $('#hiddenHeight').val().split(',')
      new_arr_Height[number] = $('#square' + number).css('height')
      $('#hiddenHeight').val(new_arr_Height)


      let new_arr_Category = $('#hiddenCategory').val().split(',')
      console.log(new_arr_Category)
      new_arr_Category[number] = radio_checked_id
      $('#hiddenCategory').val(new_arr_Category)
      console.log(new_arr_Category)
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

    console.log(x_arr)
    console.log(x_arr[0])
    console.log(number)
    // x_arr.push($(id).css('left'))
    // y_arr.push($(id).css('top'))
    // width_arr.push($(id).css('width'))
    // height_arr.push($(id).css('height'))

    // $('#hiddenX').val(x_arr)
    // $('#hiddenY').val(y_arr)
    // $('#hiddenWidth').val(width_arr)
    // $('#hiddenHeight').val(height_arr)
    // if (condition) {

    // } else {

    // }
    delete_arr.push(parseInt(number))

    // delete_arr = parseInt(number)
    x_arr.splice(number, 1)
    y_arr.splice(number, 1)
    width_arr.splice(number, 1)
    height_arr.splice(number, 1)
    categories_arr.splice(number, 1)
    $('#hiddenX').val(x_arr)
    $('#hiddenY').val(y_arr)
    $('#hiddenWidth').val(width_arr)
    $('#hiddenHeight').val(height_arr)
    $('#hiddenCategory').val(categories_arr)

    console.log('ID', delete_arr)
    $(objects[number]).remove()

    $(testobjects[number]).remove()
    console.log($('.canvas').children('.square').length)
    if ($('.canvas').children('.square').length == 0) {
      $('#hidden_delete').val(0)
    }
    else {
      $('#hidden_delete').val(delete_arr)
    }
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



  addOnWheel(text, function (e) {
    var delta = e.deltaY || e.detail || e.wheelDelta;

    // $(".img__current").css("left", parseFloat($(".img__current").css("left")) - (parseFloat($(".img__current").css("left")) + e.layerX)/10)
    // $(".img__current").css("top", parseFloat($(".img__current").css("top")) - (parseFloat($(".img__current").css("top")) + e.layerY)/10)
    console.log(e.keyCode)
    // отмасштабируем при помощи CSS
    if (scale >= min_scale) {
      if (e.ctrlKey) {
        $('.wrapper_canvas').css('margin-top', `${parseInt($('.wrapper_canvas').css('margin-top')) + 20 * Math.abs(delta) / delta}px`)
      }
      else {
        if (e.shiftKey) {
          $('.wrapper_canvas').css('margin-left', `${parseInt($('.wrapper_canvas').css('margin-left')) + 20 * Math.abs(delta) / delta}px`)
        }
        else {
          if (delta > 0) scale -= 0.05;
          else scale += 0.05;
        }

      }

    }
    if (scale < min_scale)
      scale = min_scale


    // img.height = img.height * scale
    // img.width = img.width * scale
    text.style.transform = text.style.WebkitTransform = text.style.MsTransform = 'scale(' + scale + ')';
    // console.log($('div.canvas').css('height'), $('div.canvas').css('width'))
    // отменим прокрутку
    e.preventDefault();
  });

  $(document).keydown(function (e) {
    console.log(e.keyCode);
  });

  $(document).keydown(function (e) {
    if (e.keyCode == 38) {
      $('.wrapper_canvas').css('margin-top', `${parseInt($('.wrapper_canvas').css('margin-top')) - 10 }px`)
    }
    else if (e.keyCode == 40) {
      $('.wrapper_canvas').css('margin-top', `${parseInt($('.wrapper_canvas').css('margin-top')) + 10 }px`)
    }
    else if (e.keyCode == 37) {
      $('.wrapper_canvas').css('margin-left', `${parseInt($('.wrapper_canvas').css('margin-left')) - 10 }px`)
    }
    else if (e.keyCode == 39) {
      $('.wrapper_canvas').css('margin-left', `${parseInt($('.wrapper_canvas').css('margin-left')) + 10 }px`)
    }

    e.preventDefault()
  });
})

