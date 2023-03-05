


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
  if ($('#hiddenX').val() == '') {
    var x_arr = []
    var y_arr = []
    var width_arr = []
    var height_arr = []
  }
  else {

    var x_arr = $('#hiddenX').val().split(',')
    var y_arr = $('#hiddenY').val().split(',')
    var width_arr = $('#hiddenWidth').val().split(',')
    var height_arr = $('#hiddenHeight').val().split(',')
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

  const img = new Image();
  img.src = $(".img__current").attr('src');
  img.onload = function () {

  }
  $(canvas).css("width", img.width);
  $(canvas).css("height", img.height);

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



  function getRandomColor() {
    var radios = $('input[name=color_selector]:checked').val();
    return radios;
  }

  //////////////////////////////////////////////////////
  $('#create-elements').on('click', e => {
    // for (let i = 0; i < arraBase64OBj.length; i++) {
    //   $(arraBase64OBj[i]).toggleClass('point__events')
    // }

    status = Statuses.CreatingElements
  })
  $('#change-size').on('click', e => {
    status = Statuses.EditingElements

    // for (let i = 0; i < arraBase64OBj.length; i++) {
    //   $(arraBase64OBj[i]).toggleClass('point__events')
    // }

  })
  $('#delete-elements').on('click', e => {
    status = Statuses.DeletingElements
    // for (let i = 0; i < arraBase64OBj.length; i++) {
    //   $(arraBase64OBj[i]).toggleClass('point__events')
    // }
  })





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
        $(id).css('color', getRandomColor())
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

        $('#hiddenX').val(x_arr)
        $('#hiddenY').val(y_arr)
        $('#hiddenWidth').val(width_arr)
        $('#hiddenHeight').val(height_arr)

        var object = $('<div>', {
          'class': 'prev__elemnt__objects dropdown-item',
        })
        var numberEl = $('<div>', {
          'class': 'number',
        })
        var desMetrik = $('<div>', {
          'class': 'desmetr',
        })
        var buttonDeleting = $('<a>', {
          'class': 'button__deletting',
          'id': `${delettingButtonId}${$('.canvas').children('.square').length - 1}`

        })
        var buttonEditing = $('<a>', {
          'class': 'button__editing',
          'id': `${editingButtonId}${$('.canvas').children('.square').length - 1}`

        })
        var wrapperTools = $('<div>', {
          'class': 'wrapper__buttons',
        })

        // var form = $('<form>',{
        //   'method': 'POST',
        // })

        var hidden_x = $('<input>', {
          'type': 'hidden',
          'id': `x[${$('.canvas').children('.square').length - 1}]`,
          'value': $(id).css('left')
        })

        var hidden_y = $('<input>', {
          'type': 'hidden',
          'name': 'y',
          'wire:model': 'y',
          'value': $(id).css('top')
        })

        var hidden_width = $('<input>', {
          'type': 'hidden',
          'name': 'width',
          'wire:model': 'width',
          'value': $(id).css('width')
        })

        var hidden_height = $('<input>', {
          'type': 'hidden',
          'name': 'height',
          'wire:model': 'height',
          'value': $(id).css('height')
        })

        // var hidden_x2 = $('<input>',{
        //   'type': 'text',
        //   'name': 'x',
        //   'wire:model': '2',
        //   'value': $(id).css('left')
        // })

        // var textbox = $('<input>',{
        //   'type': 'text',
        //   'name': 'testtext',
        //   'wire:model': 'testtext',
        // })
        // var labeltextbox = $('<label>',{
        //   'for': 'testtext',
        //   'value': "123"
        // })
        // for (var i = 0; i < $('.canvas').children().length-1; i++)
        //                         {
        //                             console.log($('#id['+i+']').val())
        //                         }

        console.log($(id).css('left'))
        console.log(x_arr)
        // console.log(startcoordX)
        var svgEdit = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="blue" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit-2 align-middle me-2"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>'
        var svgDelete = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="red" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2 align-middle me-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>'
        $(desMetrik).html($('input[name=color_selector]:checked').next().html())
        $(numberEl).html($('.canvas').children('.square').length)

        // $(form).append(object)
        $(object).append(numberEl)
        $(object).append(desMetrik)
        // // $(object).append(form)


        ///////////////////////////////////////////////////////////////////////
        // $(object).append(hidden_x)
        // $(object).append(hidden_y)
        // $(object).append(hidden_width)
        // $(object).append(hidden_height)


        // $(object).append(textbox)
        // $(object).append('<label for="testtext">123</label>')

        $(buttonDeleting).append(svgDelete)
        $(buttonEditing).append(svgEdit)

        $(wrapperTools).append(buttonDeleting, buttonEditing)

        $(object).append(wrapperTools)

        $(object).attr('id', `prev__elemnt__objects${$('.canvas').children('.square').length - 1}`)


        $(prevobjects).append(object)
        break
    }

  });


  ///////
  $('.dropdown-menu-obj').on('mouseenter', '.button__editing', function (e) {
    let number = ($(this).attr('id')).substring(editingButtonId.length)
    let testobjects = $('.canvas').children('.square')
    $(testobjects[number]).toggleClass('active__square__el__obj__edititng')
  })



  $('.dropdown-menu-obj').on('mouseleave', '.button__editing', function (e) {
    let number = ($(this).attr('id')).substring(editingButtonId.length)
    let testobjects = $('.canvas').children('.square')
    $(testobjects[number]).toggleClass('active__square__el__obj__edititng')
  })


  $('.dropdown-menu-obj').on('click', '.button__editing', function (e) {
    if (status != Statuses.EditingElements) {

      status = Statuses.EditingElements

      let testobjects = $('.canvas').children('.square')
      let number = ($(this).attr('id')).substring(editingButtonId.length)
      let objects = $('.dropdown-menu-obj').children()
      
      $(this).html('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="green" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check-circle align-middle me-2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>')
      $(testobjects[number]).toggleClass('point__events')


      $(objects[number]).children('.wrapper__buttons').children('.button__deletting').toggleClass('button__deletting__disabled')

      for (let i = 0; i < testobjects.length; i++) {

        if (i != parseInt(number)) {
          $(testobjects[i]).toggleClass('hidden__squares')
          $(objects[i]).toggleClass('hidden__tools')
        }
      }


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
          }
        },
        modifiers: [
          // keep the edges inside the parent
          interact.modifiers.restrictEdges({
            outer: 'parent'
          }),

          // minimum size
          interact.modifiers.restrictSize({
            min: { width: 2, height: 1 }
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
      }
      // console.log( $(testobjects[number]).css('x'))
      window.dragMoveListener = dragMoveListener
    }
    else {

      status = Statuses.CreatingElements

      let testobjects = $('.canvas').children('.square')
      let number = ($(this).attr('id')).substring(editingButtonId.length)
      let objects = $('.dropdown-menu-obj').children()
      $(this).html('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="blue" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit-2 align-middle me-2"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>')
      $(testobjects[number]).toggleClass('point__events')

      for (let i = 0; i < testobjects.length; i++) {

        if (i != parseInt(number)) {
          $(testobjects[i]).toggleClass('hidden__squares')
          $(objects[i]).toggleClass('hidden__tools')
        }
      }
      $(objects[number]).children('.wrapper__buttons').children('.button__deletting').toggleClass('button__deletting__disabled')
      // $('#hiddenX').val().split(',')[number] = $(testobjects[number]).css('x')


      //алгоритм для обновления данных
      let old_X = $('#square'+number).css('left')
      let old_Y = $('#square'+number).css('top')
      old_X = old_X.substring(0, old_X.length - 2)
      old_Y = old_Y.substring(0, old_Y.length - 2)
      console.log('oldX', old_X, old_Y)
      let transform_value = $(testobjects[number]).css('transform')
      transform_value = transform_value.substring(7)
      transform_value = transform_value.substring(0, transform_value.length -1)
      let tmp_X = transform_value.split(',')[4]
      let tmp_Y = transform_value.split(',')[5]
      console.log(tmp_X, tmp_Y)
      // $('#hiddenX').val(new_X.split(',')[4])

      let new_arr_X = $('#hiddenX').val().split(',')
      let new_arr_Y = $('#hiddenY').val().split(',')

      console.log(new_arr_X);
      let new_X = new_arr_X[number]
      let new_Y = new_arr_Y[number]
      new_X = new_X.substring(0, new_X.length -2)
      new_X = parseFloat(old_X) + parseFloat(tmp_X) + 'px'

      new_Y = new_Y.substring(0, new_Y.length -2)
      new_Y = parseFloat(old_Y) + parseFloat(tmp_Y) + 'px'
      console.log(new_X, new_Y)
      new_arr_X[number] = new_X
      new_arr_Y[number] = new_Y
      $('#hiddenX').val(new_arr_X)
      $('#hiddenY').val(new_arr_Y)

      let new_arr_Width = $('#hiddenWidth').val().split(',')
      new_arr_Width[number] = $('#square'+number).css('width')
      console.log('width', new_arr_Width)
      $('#hiddenWidth').val(new_arr_Width)

      let new_arr_Height = $('#hiddenHeight').val().split(',')
      new_arr_Height[number] = $('#square'+number).css('height')
      $('#hiddenHeight').val(new_arr_Height)


    }

  })

  ///////



  $('.dropdown-menu-obj').on('mouseenter', '.button__deletting', function (e) {
    let number = ($(this).attr('id')).substring(delettingButtonId.length)
    let testobjects = $('.canvas').children('.square')
    $(testobjects[number]).toggleClass('active__square__el__obj__deletting')
  })



  $('.dropdown-menu-obj').on('mouseleave', '.button__deletting', function (e) {
    let number = ($(this).attr('id')).substring(delettingButtonId.length)
    let testobjects = $('.canvas').children('.square')
    $(testobjects[number]).toggleClass('active__square__el__obj__deletting')
  })



  $('.dropdown-menu-obj').on('click', '.button__deletting', function (e) {

    let number = ($(this).attr('id')).substring(delettingButtonId.length)
    let testobjects = $('.canvas').children('.square')
    let objects = $('.dropdown-menu-obj').children()

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
    delete_arr.push(parseInt(number))
    x_arr.splice(number, 1)
    y_arr.splice(number, 1)
    width_arr.splice(number, 1)
    height_arr.splice(number, 1)
    $('#hiddenX').val(x_arr)
    $('#hiddenY').val(y_arr)
    $('#hiddenWidth').val(width_arr)
    $('#hiddenHeight').val(height_arr)
    $('#hidden_delete').val(delete_arr)
    console.log('ID', delete_arr)
    $(objects[number]).remove()

    $(testobjects[number]).remove()

    testobjects = $('.canvas').children('.square')
    objects = $('.dropdown-menu-obj').children()

    for (let i = 0; i < testobjects.length; i++) {
      $(testobjects[i]).attr('id', square + i)
      $(objects[i]).attr('id', prev__elemnt__objects + i)

      $(objects[i]).children('.number').html(i + 1)

      $(objects[i]).children('.wrapper__buttons').children('.button__deletting').attr('id', delettingButtonId + i)
      $(objects[i]).children('.wrapper__buttons').children('.button__editing').attr('id', editingButtonId + i)

    }
    // //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  })

  // $('.dropdown-menu-obj').on('mouseenter','.prev__elemnt__objects',  function(e){
  //   switch (status) {
  //     case (Statuses.EditingElements):
  //       let number = ($(this).attr('id')).substring(prev__elemnt__objects.length)

  //       let objects = $('.square')
  //       $(objects[number]).toggleClass('active__menu__el__obj__changing')

  //       break
  //   }
  // })
  // $('.dropdown-menu-obj').on('mouseleave','.prev__elemnt__objects',  function(e){
  //   switch (status) {
  //     case (Statuses.EditingElements):
  //       let number = ($(this).attr('id')).substring(prev__elemnt__objects.length)

  //       let objects = $('.square')
  //       $(objects[number]).toggleClass('active__menu__el__obj__changing')

  //       break
  //   }
  // })


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

  var scale = 1;

  addOnWheel(text, function (e) {
    var delta = e.deltaY || e.detail || e.wheelDelta;

    // $(".img__current").css("left", parseFloat($(".img__current").css("left")) - (parseFloat($(".img__current").css("left")) + e.layerX)/10)
    // $(".img__current").css("top", parseFloat($(".img__current").css("top")) - (parseFloat($(".img__current").css("top")) + e.layerY)/10)

    // отмасштабируем при помощи CSS
    if (delta > 0) scale += 0.05;
    else scale -= 0.05;

    // img.height = img.height * scale
    // img.width = img.width * scale
    text.style.transform = text.style.WebkitTransform = text.style.MsTransform = 'scale(' + scale + ')';

    // отменим прокрутку
    e.preventDefault();
  });

})

