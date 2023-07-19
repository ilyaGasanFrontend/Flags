$(document).ready(function (e) {
    const storage = window.sessionStorage
    var wrappercanvas = $('#text')
    const Statuses = Object.freeze({
        CreatingElements: 1,
        EditingElements: 2,
        DeletingElements: 3
    });

    var status = storage.getItem('status')


    var isOverToolbar = false

    var script_src = document.getElementsByTagName('script')[3].src
    // //console.log(script_src)
    var prevobjects = $('.dropdown-menu')
    var canvas = $('.canvas')
    var form = $('.hidden-form')

    var statusElements = $('.action-el')
    var status = Statuses.CreatingElements

    var scale = parseFloat(storage.getItem('scale'));
    var pointX = 0
    var pointY = 0

    var canvas = $('.canvas')
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
        $(document).trigger('radioChange', [radio_checked_id, radio_checked_color])
    })

    // event listeners
    $(document).on('zoom', function (e, param) {
        scale = parseFloat(param)
    })

    $(document).on('hoverToolbar', function (e, param) {
        isOverToolbar = param
    })

    $(document).on('statusChange', function (e, param) {
        status = param
    })

    // drawing
    $(canvas).on('mousedown', function (e) {
        switch (status) {
            case (Statuses.CreatingElements):
                if (isOverToolbar) {

                }
                else {
                    scale = parseFloat(storage.getItem('scale'))

                    startcoordX = e.originalEvent.layerX / scale
                    startcoordY = e.originalEvent.layerY / scale

                    var object = $('<div>', {
                        'class': 'square point__events',
                    })

                    id = '#' + square + $('.canvas').children('.square').length
                    curenid = id

                    newstartX = startcoordX;
                    newstartY = startcoordY;

                    $(object).attr('id', 'square' + $('.canvas').children('.square').length)
                    $(canvas).append(object)

                    $(id).css('top', startcoordY)
                    $(id).css('left', startcoordX)
                    $(id).css('width', 0)
                    $(id).css('height', 0)
                    $(id).css('color', radio_checked_color)

                    $('.toolbar').toggleClass('hidden')

                    flag = true
                    is_out = false

                    break
                }
        }
    });

    $(canvas).on('mousemove', function (e) {
        switch (status) {
            case (Statuses.CreatingElements):
                if (flag) {
                    var endcoordX = e.originalEvent.layerX / scale
                    var endcoordY = e.originalEvent.layerY / scale

                    // if (
                    //     parseFloat($(canvas).css('width')) * scale > parseFloat($(wrappercanvas).css('width')) ||
                    //     parseFloat($(canvas).css('height')) * scale > parseFloat($(wrappercanvas).css('height'))
                    // ) {
                    //     var scrolhor = getScrollLeft('text')
                    //     // console.log(parseFloat($(canvas).css('height'))/scale -e.originalEvent.layerY - getScrollTop('text')  )
                    //     if (parseFloat($(wrappercanvas).css('width')) - e.originalEvent.layerX + getScrollLeft('text') < 150 / scale) {
                    //         scrollRight('text', 10)
                    //     }
                    //     if (e.originalEvent.layerX - scrolhor < 150 / scale) {
                    //         scrollRight('text', -10)
                    //     }
                    //     if (e.originalEvent.layerY - getScrollTop('text') < 150 / scale) {
                    //         scrollTop('text', -10)
                    //     }

                    //     if (parseFloat($(wrappercanvas).css('height')) - e.originalEvent.layerY + getScrollTop('text') < 150 / scale) {
                    //         scrollTop('text', 10)
                    //     }
                    // }
                    var width_current = endcoordX - startcoordX
                    var height_current = endcoordY - startcoordY

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

    $(canvas).on('mouseup', function () {
        switch (status) {
            case (Statuses.CreatingElements):
                if (flag) {
                    flag = false;

                    if (parseInt($(curenid).css('width')) < 30 && parseInt($(curenid).css('height')) < 30) {
                        $(curenid).css('width', 30)
                        $(curenid).css('height', 30)

                        $(curenid).css('top', parseInt($(curenid).css('top')) - parseInt($(curenid).css('height')) / 2)
                        $(curenid).css('left', parseInt($(curenid).css('left')) - parseInt($(curenid).css('width')) / 2)
                    }

                    $(id).css('width', (e.clientX - startcoordX) / scale)
                    $(id).css('height', (e.clientY - startcoordY) / scale)

                    if (!is_out) {
                        Livewire.emit('create', parseInt(curenid.substr(7, curenid.length)) + 1, radio_checked_id, parseFloat($(id).css('left')), parseFloat($(id).css('top')), parseFloat($(id).css('width')), parseFloat($(id).css('height')))
                    }

                    $('.toolbar').toggleClass('hidden')
                    break
                }
        }

    });

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
})