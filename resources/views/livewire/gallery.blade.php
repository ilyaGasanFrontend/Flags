<div>
    {{-- <script src="https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js"
        integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous">
    </script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js"
        integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous">
    </script> --}}
    <main>
        <div class="container-fluid p-0">
            <div class="row">
                <div class="card">
                    <div class="card-body">
                        <div class="row">

                            <label for="formFileMultiple" class="form-label">Добавить файлы</label>
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <input class="form-control" type="file" id="formFileMultiple" wire:model="files"
                                        multiple>
                                </div>
                            </div>
                            <div class="col-md-2">
                                <button class="btn btn-primary" wire:click.prevent="store_photos">Загрузить</button>
                            </div>
                            <div class="col-md-2">
                                <div class="btn-group">
                                    <button type="button" class="btn btn-primary dropdown-toggle"
                                        data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                        Параметры
                                    </button>
                                    <div class="dropdown-menu" data-popper-placement="bottom-start"
                                        style="position: absolute; inset: 0px auto auto 0px; margin: 0px; transform: translate(0px, 35px);">
                                        <div>
                                            <label class="form-check">
                                                <input class="form-check-input" type="radio" value="option1"
                                                    name="radios-example" wire:click="view_switch(true)"
                                                    @if ($col_md == 3) checked @endif
                                                    style="margin-left: -1em">
                                                <span class="form-check-label" style="padding-left: 5px">
                                                    Большие значки
                                                </span>
                                            </label>
                                            <label class="form-check">
                                                <input class="form-check-input" type="radio" value="option2"
                                                    name="radios-example" wire:click="view_switch(false)"
                                                    @if ($col_md == 2) checked @endif
                                                    style="margin-left: -1em">
                                                <span class="form-check-label" style="padding-left: 5px">
                                                    Маленькие значки
                                                </span>
                                            </label>

                                        </div>
                                        <div class="dropdown-divider"></div>
                                        <div class="form-check form-switch">
                                            <input wire:model='filter' class="form-check-input" type="checkbox"
                                                id="flexSwitchCheckDefault" style="margin-left: -2rem">
                                            <label class="form-check-label" for="flexSwitchCheckDefault">Скрывать
                                                готовые</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-2">
                                {{-- <button class="btn btn-primary" disabled="">Экспорт</button> --}}
                                <button type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown"
                                    aria-haspopup="true" aria-expanded="false">
                                    Экспорт
                                </button>
                                <div class="dropdown-menu" style="">
                                    <h6 class="dropdown-header">Экспортировать как...</h6>
                                    <a class="dropdown-item" wire:click='download_file("txt")'>TXT</a>
                                    <a class="dropdown-item" wire:click='download_file("csv")'>CSV</a>
                                    {{-- <div class="dropdown-item" wire:click='download_file("json")'>JSON</div> --}}
                                </div>
                            </div>
                        </div>



                        {{-- <img src="https://hb.bizmrg.com/octagramma-files/livewire-imgs/knnE13EfYuHUTyOdIzmp2kH1PXlDWWzjY2evHhDU.png"> --}}
                    </div>
                </div>
            </div>

            {{-- <button wire:click="store_zip">123</button> --}}

            <div class="row">
                <div class="card">
                    <div class="card-header">
                        <div class="row">
                            <div class="col-md-9">
                                <h5 class="card-title mb-0">Список фотографий</h5>
                            </div>
                            <div class="col-md-3" style="">
                                {{-- {{ $paginate->links('livewire.livewire-pagination-links')}} --}}
                                {{-- {{ $paginate->links() }} --}}
                            </div>
                        </div>
                    </div>

                    <div class="card-body">
                        <div class="row">
                            {{ $paginate->links() }}
                        </div>
                        <div class="row">
                            @foreach ($paginate as $image)
                                <div class="col-md-{{ $col_md }}">
                                    {{-- <button class="btn btn-primary submit-button"> --}}
                                    <div class="card bg-light col d-flex ">
                                        <div class="wrapper__class ">
                                            <a class="row-8"
                                                @if ($is_empty == true) wire:click="alert" @else href="/gallery/{{ $image->id }}" @endif>
                                                <img class="card-img-top" src="{{ $image->path_to_file }}"
                                                    loading="lazy" alt="{{ $image->path_to_file }}"
                                                    style="width: 100%; height: @if ($col_md == 3) 337px @else 220px @endif; object-fit: cover;">
                                                {{-- <img class="card-img-top" src="{{asset('images/dog.jpg')}}" alt="Unsplash"> --}}
                                            </a>

                                            <div class="card-header bg-light row-8">

                                                <h5 class="card-title ">
                                                    {{-- {{ substr($image->original_name, 0, 7) . '...' . substr($image->name, -9, 9) }} --}}
                                                    {{ $image->original_name }}
                                                </h5>
                                            </div>
                                            <div class="card-body h-auto row-1 h-25 p-3">
                                                @if ($image->is_ready)
                                                    <div class="badge bg-success my-2">Готово</div>
                                                @else
                                                    <div class="badge bg-danger my-2">Не готово</div>
                                                @endif

                                                <button class="btn btn-danger btn-sm"
                                                    wire:click="delete({{ $image->id }})"><i
                                                        class="fas fa-times"></i></button>

                                            </div>
                                        </div>



                                    </div>
                                    {{-- </button> --}}
                                </div>
                            @endforeach




                        </div>

                    </div>
                </div>

            </div>
            {{-- <button wire:click="alert">123</button> --}}
            <script>
                window.addEventListener('modal-confirm-hide', event => {
                    myMessageConfirm(event.detail.message, 'danger')
                });
            </script>


    </main>
</div>
