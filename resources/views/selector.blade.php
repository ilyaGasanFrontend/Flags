@extends('layouts/app')
@section('content')
<main class="content">
    <div class="container-fluid p-0">

       
        <div class="row row__selector">
            <div class="col-12 col-lg-8 col_selector">
                <div class="card card__selector">
                    <div class="card-body m-sm-3 m-md-0 card__for__analis">
                        <div class="tools__wrap">
                                <div class="action__list">
                                    <div class="col-sm action-el action-el--active">
                                        <a href="#" class="action" id="create-elements">Create </a>
                                    </div>
                                    <div class="col-sm action-el">
                                        <a href="#" class="action" id="change-size">Change all</a>
                                    </div>
                                    <div class="col-sm action-el">
                                        <a href="#" class="action" id="delete-elements">Delete section</a>
                                    </div>
                            </div>
                        </div>
                        <div class="container">
                            
                            <div class="box-2">
                                <div class="canvas_main">
                                    <div class="wrapper_canvas" id="text">
                                        <div class="canvas" > 
                                            <!-- canvas-changeable -->
                                            <img src="{{asset('images/dog.jpg')}}" alt="" class="img__current">
                                        </div>
                                    </div>

                                </div>
                            </div>
                            

                        </div>
                    </div>
                </div>
            </div>
            <div class="col-sm-4">
                <div class="card card-info-input">
                    <div class="wrapper__info">
                        <input type="text" class="name_imput">
                        <input type="color" class="calor_input">
                        <a href="" class="create__markColor">Create</a>
                        <div class="radio_buttons__wrapper">
                            <div class="rowRad">
                                <input type="radio" name="color_selector" value="#fff"
                                    class="colorCL" checked="True">
                                <label id="defaultColor" class="lable__color">Default</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card card-info-input card-info-obj">
                    <div class="dropdown-menu mb-2 dropdown-menu-obj" style="position:static;display:block;">
                        
                    </div>
                </div>
                
            </div>
        </div>
        <div class="row">
            <div class="col-12 col-lg-8">
                <div class="card">
                    <div class="wrapper__prev__img">
                        <div class="row row__arrows">
                            <div class="col-1 col--arrows col--arrows--arrow" id="left">
                                <img src="{{asset('images/right-arrow.png')}}"  alt="" class="arrow arrow--left" >
                            </div>
                            <div class="col-6 col--arrows col--arrows--photos">
                                <div class="row row__photo__list">
                                    <div class="col-sm col__photos__list"><img class="photogal-el" src="{{asset('images/example1.png')}}" alt="Image"/></div>
                                    <div class="col-sm col__photos__list"><img class="photogal-el" src="{{asset('images/example2.png')}}" alt="Image"/></div>
                                    <div class="col-sm col__photos__list"><img class="photogal-el photogal-el--active" src="{{asset('images/dog.jpg')}}" alt="Image"/></div>
                                    <div class="col-sm col__photos__list"><img class="photogal-el" src="{{asset('images/example3.png')}}" alt="Image"/></div>
                                    <div class="col-sm col__photos__list"><img class="photogal-el" src="{{asset('images/example4.png')}}" alt="Image"/></div>
                                </div>
                            </div>
                            <script>
                                var lol
                                
                                function GetStyle(){
                                    console.log('hi')
                                    lol = $('.canvas').children('.square');
                                    
                                    
                                    cosole.log({{$count}})
                                }
                            </script>
                            <div class="col-1 col--arrows col--arrows--arrow" onclick="GetStyle()" id="right">
                                
                               
                                
                                
                                <img src="{{asset('images/right-arrow.png')}}"  alt="" class="arrow">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

</main>

    <script src="js/app.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/interactjs/dist/interact.min.js"></script>
   
    
@endsection