$(document).ready(t=>{$(".create__markColor").click(function(r){r.preventDefault();var l=$(".name_imput").val(),e=$(".calor_input").val(),c=$("<input>",{type:"radio",value:e,class:"colorsCL",name:"color_selector"}),o=$("<lable>",{class:"lable__color"});$(o).html(l);var a=$("<div>",{class:"rowRad",id:"name"});$(a).css("color",e),$(c).appendTo(a),$(o).appendTo(a),$(a).appendTo(".radio_buttons__wrapper")})});
