$(document).ready(e=>{
    $(".create__markColor").click(function(e){
        e.preventDefault();
    
        var name = $(".name_imput").val();
        var rbga = $(".calor_input").val()
        var objectRad = '<input type="radio"  name="' + name + '"/>' + '<div>' + name +'</div>'
        var objectInput = $('<input>', {
              'type': 'radio',
              'value': rbga,
              'class': 'colorsCL',
              'name': 'color_selector'
            })
    
        var objectLable = $('<lable>', {
            'class': 'lable__color',
          })
          $(objectLable).html(name)
        var objectRow = $('<div>',{
          'class': 'rowRad',
          'id': 'name'
        })
        $(objectRow).css('color', rbga)
        $(objectInput).appendTo(objectRow);
        $(objectLable).appendTo(objectRow);
        
       $(objectRow).appendTo('.radio_buttons__wrapper');
    
      })
})