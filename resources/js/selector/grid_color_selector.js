
$(document).ready(function() {
    let colors_array = ['000', 'fff']
    let activecolor = 0
    // $(colors_radio).on('click', e=>{
    //     console.log( $("input[name=color]:checked").val());
    //     document.documentElement.style.setProperty("--color-grid", `#${$("input[name=color]:checked").val()}`);
    // })
    $('.color_changer').on('click', e=>{
        e.preventDefault()
        
        if (activecolor == 0){
            activecolor = 1 
            
            document.documentElement.style.setProperty("--color-grid", `#${colors_array[activecolor]}`);
        }
        else {
            activecolor = 0
            document.documentElement.style.setProperty("--color-grid", `#${colors_array[activecolor]}`);
        }
    })
  });