$(document).ready((e)=>{
    var objects = document.querySelectorAll('.photogal-el')
    var currentIndexImg = 0

    var imgView = $('.img__current')
    var canvas = $('.canvas')
    var $set = $('.col__photos__list');
    for (let i = 0; i < objects.length; i++){
        if ($(objects[i]).hasClass('photogal-el--active')){
            currentIndexImg = i
        }
    }
    $('#left').on('click', function(e){
        $($(objects[currentIndexImg])).toggleClass('photogal-el--active');
        currentIndexImg--
        $($(objects[currentIndexImg])).toggleClass('photogal-el--active');
        $(imgView).attr('src', $(objects[currentIndexImg]).attr('src'))
        $(canvas).find('.square').remove()
        console.log("pisk")
    })
    $('#right').on('click', function(e){
        $($(objects[currentIndexImg])).toggleClass('photogal-el--active');
        currentIndexImg++
        $($(objects[currentIndexImg])).toggleClass('photogal-el--active');
        $(imgView).attr('src', $(objects[currentIndexImg]).attr('src'))
        $(canvas).find('.square').remove()
    })
    $('.row__photo__list').on('click', '.col__photos__list', function() {
        if (currentIndexImg != $set.index(this)){
            $($(objects[currentIndexImg])).toggleClass('photogal-el--active');
            currentIndexImg = $set.index(this);
            $($(objects[currentIndexImg])).toggleClass('photogal-el--active');
            $(imgView).attr('src', $(objects[currentIndexImg]).attr('src'))
            $(canvas).find('.square').remove()
        }
    })
})
  