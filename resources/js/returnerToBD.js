$(document).ready(function (e) {
    function GetStyle(){
        console.log('hi')
        let squares = $('.canvas').children('.square')
        return $(squares[0]).css('width')
    }
})