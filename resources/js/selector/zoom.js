$(document).ready(function (e) {
    const storage = window.sessionStorage

    var scale = parseFloat(storage.getItem('scale'))
    var min_scale = parseFloat(storage.getItem('min_scale'))
    
    var zoom = $('.canvas')

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

        if (delta > 0) {
            if (scale > min_scale) {
                scale -= 0.05
                document.querySelector('#text').scrollTop = document.querySelector('#text').scrollTop
                document.querySelector('#text').scrollLeft = document.querySelector('#text').scrollLeft
                $(document).trigger('zoom', scale)
                storage.setItem('scale', scale)
                // document.querySelector('#text').scrollLeft = ((img.width * scale - outer_width)) / 2 //просто к центру
                // document.querySelector('#text').scrollTop = ((img.height * scale - outer_height)) / 2
            }
        }
        else {
            scale += 0.05
            document.querySelector('#text').scrollTop = document.querySelector('#text').scrollTop / (scale - 0.05) * scale
            document.querySelector('#text').scrollLeft = document.querySelector('#text').scrollLeft / (scale - 0.05) * scale

            $(document).trigger('zoom', scale)
            storage.setItem('scale', scale)
        }

        // //console.log(e.clientY)


        // $('.canvas').css('transform', "translate(" + -document.querySelector('#text').scrollLeft * scale + "px, " + -document.querySelector('#text').scrollTop * scale + "px) scale(" + scale + ")")
        // $('.canvas').css('transform-origin', parseInt(document.querySelector('#text').scrollLeft) + 'px ' + parseInt(document.querySelector('#text').scrollTop) + 'px')

        $(zoom).css('transform', "scale(" + scale + ") ")
        e.preventDefault();
    });
})