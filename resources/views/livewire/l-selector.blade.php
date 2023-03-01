<main class="content">
    <h1>{{ $images->name }}</h1>


    <div class="container-fluid p-0">
        <div class="row row__selector">
            <div class="col-12 col-lg-8 col_selector">
                <div class="card card__selector">
                    <div class="card-body m-sm-3 m-md-0 card__for__analis">
                        {{-- <div class="tools__wrap">
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
                        </div> --}}
                        <div class="container">

                            <div class="box-2">
                                <div class="canvas_main">
                                    <div class="wrapper_canvas" id="text">
                                        <div class="canvas">
                                            <!-- canvas-changeable -->
                                            <img src="{{ $images->path_to_file }}" alt="" class="img__current">

                                            @push('scripts')
                                                <script>
                                                    $(document).ready(function(e) {
                                                        // let squares = @js($squares);
                                                        // var object = $('<div>', {
                                                        //     'class': 'square point__events',
                                                        //     'id': 'square0',
                                                        //     'style': 'style="top: 369.5px; left: 353.5px; width: 147px; height: 103px; color: rgb(255, 255, 255);"'
                                                        // })
                                                        // console.log(squares[2])
                                                        // $.each(squares, function(key, data) {
                                                        //     $.each(data, function(index, value) {
                                                        //         console.log(value['id'])
                                                        //         $('.canvas').append(object)
                                                        //         $(object).attr('id', 'square' + $('.canvas').children('.square').length)

                                                        //     })
                                                        // })

                                                        // $.each(squares, function(key, data) {
                                                        //     $.each(data, function(index, value) {
                                                        //         $('.canvas').append(object)
                                                        //         $(object).attr('id', 'square' + $('.canvas').children('.square').length)
                                                        //     });
                                                        // });

                                                        for (var i = 1; i <= squares
                                                            .length; i++) //see that I removed the $ preceeding the `for` keyword, it should not have been there
                                                        {
                                                            // $('.canvas').append(object)
                                                            // $(object).attr('id', 'square' + $('.canvas').children('.square').length)
                                                            // $(object).attr('top', '500px')
                                                            // $(object).attr('left', 500)
                                                            // $(object).attr('width', 500)
                                                            // $(object).attr('height', 500)
                                                        }
                                                    })
                                                </script>
                                            @endpush
                                            {{-- @dd($squares) --}}
                                            @if ($squares != null)
                                                @foreach ($squares as $i => $square)
                                                    <div class="square point__events" id="square{{ $i }}"
                                                        style="top: {{ $square->y }}px; left: {{ $square->x }}px; width: {{ $square->width }}px; height: {{ $square->height }}px; color: rgb(255, 255, 255);">

                                                    </div>
                                                @endforeach
                                            @endif

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
                                <input type="radio" name="color_selector" value="#fff" class="colorCL"
                                    checked="True">
                                <label id="defaultColor" class="lable__color">Default</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card card-info-input card-info-obj">
                    <form style="width: 100%" wire:submit.prevent="submit">
                        @if ($squares != null)
                            @php
                                $x_str = '';
                                $y_str = '';
                                $width_str = '';
                                $height_str = '';
                                foreach ($squares as $i => $square) {
                                    if ($i == 0) {
                                        $x_str = strval($square->x) . 'px';
                                        $y_str = strval($square->y) . 'px';
                                        $width_str = strval($square->width). 'px';
                                        $height_str = strval($square->height). 'px';
                                    } else {
                                        $x_str = $x_str . ',' . strval($square->x) . 'px';
                                        $y_str = $y_str . ',' . strval($square->y) . 'px';
                                        $width_str = $width_str . ',' . strval($square->width) . 'px';
                                        $height_str = $height_str . ',' . strval($square->height) . 'px';
                                    }
                                }
                                
                            @endphp

                            <input type="hidden" id="hiddenX" value="{{ $x_str }}" />
                            <input type="hidden" id="hiddenY" value="{{ $y_str }}"/>
                            <input type="hidden" id="hiddenWidth" value="{{ $width_str }}"/>
                            <input type="hidden" id="hiddenHeight" value="{{ $height_str }}"/>
                        @else
                            <input type="hidden" id="hiddenX" />
                            <input type="hidden" id="hiddenY" />
                            <input type="hidden" id="hiddenWidth" />
                            <input type="hidden" id="hiddenHeight" />
                        @endif

                        {{-- <input type="hidden" id="hiddenX" />
                        <input type="hidden" id="hiddenY" />
                        <input type="hidden" id="hiddenWidth" />
                        <input type="hidden" id="hiddenHeight" /> --}}
                        <input type="submit" class="btn btn-primary submit-button">
                        <div class="dropdown-menu mb-2 dropdown-menu-obj" style="position:static;display:block;">
                            @if ($squares != null)
                                @foreach ($squares as $i => $square)
                                    <div class="prev__elemnt__objects dropdown-item"
                                        id="prev__elemnt__objects{{ $i }}">
                                        <div class="number">{{ $i + 1 }}</div>
                                        <div class="desmetr">Default</div>
                                        <div class="wrapper__buttons"><a class="button__deletting"
                                                id="deletting__button{{ $i }}"><svg
                                                    xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                    viewBox="0 0 24 24" fill="none" stroke="red" stroke-width="2"
                                                    stroke-linecap="round" stroke-linejoin="round"
                                                    class="feather feather-trash-2 align-middle me-2">
                                                    <polyline points="3 6 5 6 21 6"></polyline>
                                                    <path
                                                        d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2">
                                                    </path>
                                                    <line x1="10" y1="11" x2="10" y2="17">
                                                    </line>
                                                    <line x1="14" y1="11" x2="14" y2="17">
                                                    </line>
                                                </svg></a><a class="button__editing"
                                                id="editing__button{{ $i }}"><svg
                                                    xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                    viewBox="0 0 24 24" fill="none" stroke="blue" stroke-width="2"
                                                    stroke-linecap="round" stroke-linejoin="round"
                                                    class="feather feather-edit-2 align-middle me-2">
                                                    <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z">
                                                    </path>
                                                </svg></a></div>
                                    </div>
                                @endforeach
                            @endif

                        </div>
                    </form>
                </div>

                @push('scripts')
                    <script>
                        $(document).ready(function(e) {


                            $('.canvas').on('mouseup', function() {
                                // console.log(x_arr)
                                console.log($('#hiddenX').attr('value'))
                                // static array(arr)
                                // arr.push(@this.x)

                                // arr.push($('#hiddenX').attr('value'))
                                //TODO: УБРАТЬ КОСТЫЛЬ
                                /////////////////////////////////////////////////////////////////////////////////////////////
                                setTimeout(() => {
                                    // arr.push($('#hiddenX').attr('value'))
                                    // @this.x = 123
                                    // console.log($('#hiddenX').attr('value'))
                                    // @this.x = $('#hiddenX').attr('value')
                                    // console.log($('#hidden_X123').attr('value'))
                                }, 1);

                                // @this.x = ['1', '2', '3']
                            })

                            $('.submit-button').on('mouseup', function() {
                                @this.x = $('#hiddenX').attr('value')
                                @this.y = $('#hiddenY').attr('value')
                                @this.width = $('#hiddenWidth').attr('value')
                                @this.height = $('#hiddenHeight').attr('value')
                            })
                        })
                    </script>
                @endpush
            </div>
        </div>


        <div class="col-12 col-lg-8">
            <div class="card">
                <div class="wrapper__prev__img">
                    <div class="row row__arrows">
                        <div class="col-1 col--arrows col--arrows--arrow" id="left">
                            <img src="{{ asset('images/right-arrow.png') }}" alt="" class="arrow arrow--left">
                        </div>
                        <div class="col-6 col--arrows col--arrows--photos">
                            <div class="row row__photo__list">
                                <div class="col-sm col__photos__list"><img class="photogal-el"
                                        src="{{ asset('images/example1.png') }}" alt="Image" /></div>
                                <div class="col-sm col__photos__list"><img class="photogal-el"
                                        src="{{ asset('images/example2.png') }}" alt="Image" /></div>
                                <div class="col-sm col__photos__list"><img class="photogal-el photogal-el--active"
                                        src="{{ $images->path_to_file }}" alt="Image" /></div>
                                <div class="col-sm col__photos__list"><img class="photogal-el"
                                        src="{{ asset('images/example3.png') }}" alt="Image" /></div>
                                <div class="col-sm col__photos__list"><img class="photogal-el"
                                        src="{{ asset('images/example4.png') }}" alt="Image" /></div>
                            </div>
                        </div>

                        <div class="col-1 col--arrows col--arrows--arrow" onclick="GetStyle()" id="right">



                            <img src="{{ asset('images/right-arrow.png') }}" alt="" class="arrow">
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
