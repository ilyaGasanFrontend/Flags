$(document).ready(function (e) {
    const Statuses = Object.freeze({
        CreatingElements: 1,
        EditingElements: 2,
        DeletingElements: 3
    });

    const storage = window.sessionStorage
    
    var status = storage.getItem('status')    
    var scale = parseFloat(storage.getItem('scale'))

    var canvas = $('.canvas')
    var radio_checked_id = $("input[name='radio_category']:checked").val();
    var radio_checked_color = $('#span_' + radio_checked_id).css('color');

    var isOverToolbar = false

    // event listeners
    $(document).on('radioChange', function (e, id, color) {
        console.log(id, color)
        radio_checked_id = id
    })

    $(document).on('zoom', function (e, param) {
        scale = param
    })
    $(canvas).on('mouseenter', '.toolbar', function (e) {
        if ($(this).hasClass('disabled')) {
            isOverToolbar = true
            $(document).trigger('hoverToolbar', true)
            $(this).toggleClass('disabled')
        }
    })

    $(canvas).on('mouseleave', '.toolbar', function (e) {
        if (!$(this).hasClass('disabled')) {
            $(document).trigger('hoverToolbar', false)
            isOverToolbar = false
            $(this).toggleClass('disabled')
        }
    })

    $(canvas).on('mouseenter', '.button__deletting', function (e) {
        let number = ($(this).attr('id')).substring('toolbar_deletting_button'.length)
        let testobjects = $(canvas).children('.square')
        $(testobjects[number]).toggleClass('active__square__el__obj__deletting')
    })

    $(canvas).on('mouseleave', '.button__deletting', function (e) {
        let number = ($(this).attr('id')).substring('toolbar_deletting_button'.length)
        let testobjects = $(canvas).children('.square')
        $(testobjects[number]).toggleClass('active__square__el__obj__deletting')
    })

    $(canvas).on('click', '.button__deletting', function (e) {
        isOverToolbar = false
        $(document).trigger('hoverToolbar', false)
    })

    $(canvas).on('mouseenter', '.button__editing', function (e) {
        // console.log(123)
        let number = ($(this).attr('id')).substring('toolbar__editing__button'.length)
        let testobjects = $(canvas).children('.square')
        $(testobjects[number]).toggleClass('active__square__el__obj__edititng')
        // console.log($(testobjects[0]))
    })

    $(canvas).on('mouseleave', '.button__editing', function (e) {
        let number = ($(this).attr('id')).substring('toolbar__editing__button'.length)
        let testobjects = $(canvas).children('.square')
        $(testobjects[number]).toggleClass('active__square__el__obj__edititng')
    })

    $(canvas).on('click', '.button__editing', function (e) {
        if (status != Statuses.EditingElements) {

            status = Statuses.EditingElements
            $(document).trigger('statusChange', status)

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
            $(document).trigger('statusChange', status)

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
})