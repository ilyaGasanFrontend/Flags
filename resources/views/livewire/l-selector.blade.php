<div>
    <main>
        @vite(['resources/js/selector.js'])

        <h1><a href="/gallery">Галерея</a> / Фотография {{ $this_img_number }} из {{ $images_count }}</h1><br>

        <div class="container-fluid p-0">
            <div class="row">
                {{-- <div class="row row__selector"> --}}
                <div class="col-8">
                    <div class="row">
                        <div class="col-12" style="height: 60vh; margin-bottom: 24px">
                            <div class="card card__selector">
                                <div class="card-body m-sm-3 m-md-0 card__for__analis">
                                    <div id="text" {{-- wire:ignore --}}
                                        style="position: absolute; 
                                        width: 100%; 
                                        height: 100%; 
                                        overflow: hidden; 
                                        /* padding: 30px; */
                                        overflow: scroll;"
                                        class="position_image">

                                        <div class="canvas" wire:ignore.self wire:click.prevent id="canvas"
                                            style="transform-origin: 0% 0%; 
                                            /* width: {{ $images->original_width }}px; height: {{ $images->original_height }}px;  */
                                            width: 100%; height: 100%; 
                                            transition-duration: 0ms; margin:auto;">


                                            <img src="{{ $images->path_to_file }}" alt="" class="img__current"
                                                id="image">

                                            @foreach ($squares as $i => $square)
                                                <div class="square point__events" id="square{{ $i }}"
                                                    style="top: {{ $square->y }}px; left: {{ $square->x }}px; width: {{ $square->width }}px; height: {{ $square->height }}px; color: {{ $square->color }};">

                                                </div>
                                            @endforeach

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>
                        <div class="col-12">
                            {{-- <div class="row"> --}}
                            {{-- <div class="col-8"> --}}
                            <div class="card">
                                <div class="wrapper__prev__img">
                                    <div class=" row__arrows">
                                        @if ($param != $first_id)
                                            <div class="col-1 col--arrows col--arrows--arrow" id="left"
                                                style="justify-content: center; display: flex" wire:click="go_to_prev">
                                                {{-- <a href="{{ $prev_image_id }}"> --}}
                                                <a href="#">
                                                    <svg style="scale:3; height:100%;"
                                                        xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                        viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                                        class="feather feather-chevron-left align-middle me-2">
                                                        <polyline points="15 18 9 12 15 6"></polyline>
                                                    </svg>
                                                </a>
                                            </div>
                                        @endif

                                        <div class="col-md-auto col--arrows col--arrows--photos">
                                            <div class="row row__photo__list">
                                                @foreach ($nav_images as $img)
                                                    @if ($img['id'] == $images->id)
                                                        <div class="col-sm col__photos__list">
                                                            <a href="{{ $img['id'] }}">
                                                                <img class="photogal-el photogal-el--active"
                                                                    src="{{ asset($img['path_to_file']) }}"
                                                                    alt="Image" style="height: 10vh" />
                                                            </a>
                                                        </div>
                                                    @else
                                                        <div class="col-sm col__photos__list">
                                                            <a href="{{ $img['id'] }}">
                                                                <img class="photogal-el"
                                                                    src="{{ asset($img['path_to_file']) }}"
                                                                    alt="Image"
                                                                    style="height: 6vh; width: 100%; margin-top: 2vh" />
                                                            </a>
                                                        </div>
                                                    @endif
                                                @endforeach
                                            </div>
                                        </div>
                                        @if ($param != $last_id)
                                            <div class="col-1 col--arrows col--arrows--arrow" wire:click="go_to_next"
                                                id="right" style="justify-content: center; display: flex">
                                                <a href="#">
                                                    <svg style="scale:3; height:100%;"
                                                        xmlns="http://www.w3.org/2000/svg" width="0" height="0"
                                                        viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                                        class="feather feather-chevron-right align-middle me-2">
                                                        <polyline points="9 18 15 12 9 6"></polyline>
                                                    </svg>
                                                </a>
                                            </div>
                                        @endif

                                    </div>
                                </div>
                            </div>
                            {{-- </div> --}}
                            {{-- </div> --}}
                        </div>
                    </div>
                </div>
                {{-- </div> --}}

                <div class="col-sm-4">
                    <div class="row">
                        <div class="card">
                            <div class="card-header">
                                <h5 class="card-title mb-0">Параметры</h5>
                            </div>
                            <div class="card-body">
                                <button class="btn btn-primary" id="toggle_grid">
                                    @if ($show_grid)
                                        Скрыть сетку
                                    @else
                                        Показать сетку
                                    @endif
                                </button>

                            </div>
                        </div>
                        <div class="card">
                            <div class="card-header">
                                <h5 class="card-title mb-0">Категории</h5>
                            </div>
                            <div class="card-body">
                                <div class="categories">
                                    @foreach ($categories as $i => $category)
                                        <label class="form-check">
                                            <input class="form-check-input categories-default"
                                                id="radio_{{ $category->id }}" type="radio" name="radio_category"
                                                value="{{ $category->id }}"
                                                @if ($i == 0) checked @endif>
                                            <span class="form-check-label" id="span_{{ $category->id }}"
                                                style="color: {{ $category->color }}">
                                                {{ $category->description }}
                                            </span>
                                        </label>
                                    @endforeach
                                </div>
                            </div>
                        </div>

                        <div class="card" style="padding-left: 0%; padding-right: 0%">
                            <div class="table-responsive">
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th style="width:25%;">Номер</th>
                                            <th style="width:60%;">Категория</th>
                                            <th>Действия</th>
                                        </tr>
                                    </thead>
                                    <tbody class="obj-table">

                                        @if ($squares != null)
                                            @foreach ($squares as $i => $square)
                                                <tr id="table_row_{{ $i }}" class="table-row"
                                                    style="background-color: {{ $square->color . 40 }};">
                                                    <td class="number">{{ $i + 1 }}</td>
                                                    <td class="desmetr">
                                                        {{ $square->description }}

                                                    </td>
                                                    <input type="hidden" id="hidden-category-{{ $i }}"
                                                        value="{{ $square->category_id }}" />
                                                    <td class="table-action">
                                                        <a class="button__editing"
                                                            id="editing__button{{ $i }}"
                                                            {{-- wire:click.prevent="update(false, null, null, null, null, null, null)" --}} wire:click.prevent=""
                                                            style="text-decoration: none"><svg
                                                                xmlns="http://www.w3.org/2000/svg" width="24"
                                                                height="24" viewBox="0 0 24 24" fill="none"
                                                                stroke="blue" stroke-width="2"
                                                                stroke-linecap="round" stroke-linejoin="round"
                                                                class="feather feather-edit-2 align-middle">
                                                                <path
                                                                    d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z">
                                                                </path>
                                                            </svg>
                                                        </a>
                                                        <a class="button__deletting"
                                                            id="deletting__button{{ $i }}"
                                                            wire:click.prevent="delete({{ $i }})"
                                                            style="text-decoration: none"><svg
                                                                xmlns="http://www.w3.org/2000/svg" width="24"
                                                                height="24" viewBox="0 0 24 24" fill="none"
                                                                stroke="red" stroke-width="2"
                                                                stroke-linecap="round" stroke-linejoin="round"
                                                                class="feather feather-trash-2 align-middle me-2">
                                                                <polyline points="3 6 5 6 21 6"></polyline>
                                                                <path
                                                                    d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2">
                                                                </path>
                                                                <line x1="10" y1="11" x2="10"
                                                                    y2="17">
                                                                </line>
                                                                <line x1="14" y1="11" x2="14"
                                                                    y2="17">
                                                                </line>
                                                            </svg></a>
                                                    </td>
                                                </tr>
                                            @endforeach
                                        @endif
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </main>

    <link href="{{ url('/css/selector.css') }}" rel="stylesheet">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/interactjs/dist/interact.min.js"></script>
</div>
