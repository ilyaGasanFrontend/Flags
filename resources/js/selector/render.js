$(document).ready(function (e) {
    const storage = window.sessionStorage

    const Statuses = Object.freeze({
        CreatingElements: 1,
        EditingElements: 2,
        DeletingElements: 3
    });
    var status = Statuses.CreatingElements

    storage.setItem('Statuses', Statuses)
    storage.setItem('status', status)

    var canvas = $('.canvas')
    var text = $('#text')

    var img = new Image();


    img.src = $(".img__current").attr('src');
    img.onload = function () {

    }
    $(canvas).css("width", img.width);
    $(canvas).css("height", img.height);

    var scale = 1
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
    $(canvas).css('transform', 'scale(' + scale + ')')

    storage.setItem('scale', scale)
    storage.setItem('min_scale', min_scale)

    // event listeners 
    $(document).on('goToPageClicked', function (e) {
        console.log(123)
    })

    $('#toggle_grid').on('click', function (e) {
        $('.card__for__analis').toggleClass('grid')
    })

})