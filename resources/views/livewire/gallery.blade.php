<div>
    <main class="content">
        <h1>Галерея</h1><br><br>

        {{-- TEST
        <form wire:submit.prevent="test">
            <input type="text" wire:model="test.1" name="test[]">
            <input type="text" wire:model="test.2" name="test[]">
            <input type="hidden" name="test[1]" wire:model="test.3" value="test1">
            <input type="hidden" name="test[2]" wire:model="test.4" value="test2">
            <input type="submit" class="btn btn-primary">
            
        </form>
        ENDTEST --}}

        <div class="row">
            <div class="col-12 col-md-6 col-lg-3">
                <form wire:submit.prevent="store_photos">
                    <input type="file" wire:model="files" multiple>
                    <div wire:loading wire:target="files">Uploading...</div>

                    <input type="submit">
                </form>
            </div>
        </div>

        <br>S3
        <div class="row">
            <div class="col-12 col-md-6 col-lg-3">
                <form wire:submit.prevent="store_s3">
                    <input type="file" wire:model="files">
                    <input type="submit">
                </form>
            </div>
        </div>
        <br>

        {{-- <img src="https://hb.bizmrg.com/octagramma-files/livewire-imgs/knnE13EfYuHUTyOdIzmp2kH1PXlDWWzjY2evHhDU.png"> --}}
        @push('scripts')
            <script>
                $(document).ready(function(e) {
                    console.log($("input[name='test[1]']").val())
                })
            </script>
        @endpush
        {{-- <div class="col-md-12">
            <div class="tab">
                <ul class="nav nav-tabs" role="tablist">
                    <li class="nav-item"><a class="nav-link active" href="#tab-1" data-bs-toggle="tab" role="tab"
                            aria-selected="true">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24"
                                height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                stroke-linecap="round" stroke-linejoin="round"
                                class="feather feather-home align-middle">
                                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                <polyline points="9 22 9 12 15 12 15 22"></polyline>
                            </svg>
                            Обзор
                        </a>
                    </li>
                    <li class="nav-item"><a class="nav-link" href="#tab-2" data-bs-toggle="tab" role="tab"
                            aria-selected="false">Добавить</a></li>
                </ul>
                <div class="tab-content">
                    <div class="tab-pane active" id="tab-1" role="tabpanel">
                        <div class="input-group mb-3">
                            <select class="form-select flex-grow-1">
                                <option>Показывать все</option>
                                <option>Показывать пустые</option>
                            </select>
                            <button class="btn btn-secondary" type="button">Go!</button>
                        </div>
                        <form>
                            <div class="row">

                                @foreach ($images as $image)
                                    <div class="col-12 col-md-6 col-lg-3">
                                        <div class="card">

                                            <a href="/db/{{ $image->id }}"  >
                                                <img class="" src="{{ $image->path_to_file }}" style="height: auto; max-width: 100%"
                                                    alt="{{ $image->path_to_file }}">

                                            </a>

                                            <div class="card-header px-4 pt-4">
                                                <div class="card-actions float-end">
                                                    <div class="dropdown position-relative">
                                                        <a href="#" data-bs-toggle="dropdown"
                                                            data-bs-display="static">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24"
                                                                height="24" viewBox="0 0 24 24" fill="none"
                                                                stroke="currentColor" stroke-width="2"
                                                                stroke-linecap="round" stroke-linejoin="round"
                                                                class="feather feather-more-horizontal align-middle">
                                                                <circle cx="12" cy="12" r="1">
                                                                </circle>
                                                                <circle cx="19" cy="12" r="1">
                                                                </circle>
                                                                <circle cx="5" cy="12" r="1">
                                                                </circle>
                                                            </svg>
                                                        </a>

                                                        <div class="dropdown-menu dropdown-menu-end">
                                                            <a class="dropdown-item" href="#">Action</a>
                                                            <a class="dropdown-item" href="#">Another action</a>
                                                            <a class="dropdown-item" href="#">Something else
                                                                here</a>
                                                        </div>
                                                    </div>


                                                </div>
                                                <h5 class="card-title mb-0">
                                                    {{ substr($image->name, 0, 7) . '...' . substr($image->name, -9, 9) }}
                                                </h5>
                                            </div>
                                            <div class="card-body px-4 pt-2">
                                                @if ($image->is_ready)
                                                    <div class="badge bg-success my-2">Готово</div>
                                                @else
                                                    <div class="badge bg-danger my-2">Не готово</div>
                                                @endif



                                            </div>
                                        </div>
                                    </div>
                                @endforeach
                            </div>
                        </form>
                    </div>
                    <div class="tab-pane" id="tab-2" role="tabpanel">
                        <form wire:submit.prevent="store_photos">
                            <input type="file" wire:model="photo">
                            <input type="submit">
                        </form>
                    </div>
                </div>
            </div>
        </div> --}}
        <div class="row">
            <div class="col-md-6">
                <input type="checkbox" wire:click="filter"><label> Скрывать готовые</label>

            </div>
            <div class="col-md-6 text-center">
                {{-- <div class="input-group mb-3">
                    <select class="form-select flex-grow-1" wire:click="filter(0)">
                        <option wire:click="filter">Показывать все</option>
                        <option wire:click="filter">Показывать пустые</option>
                    </select>

                    <button class="btn btn-secondary" type="button">Go!</button>
                </div> --}}
                
            </div>

        </div>

        <div class="row">
            <form>
                <div class="row">
                    @foreach ($images as $image)
                        <div class="col-12 col-md-6 col-lg-3">
                            {{-- <button class="btn btn-primary submit-button"> --}}
                            <div class="card">

                                <a href="/db/{{ $image->id }}">
                                    <img class="card-img-top" src="{{ $image->path_to_file }}" loading="lazy"
                                        alt="{{ $image->path_to_file }}" style="aspect-ratio: 1/1;" >
                                    {{-- <img class="card-img-top" src="{{asset('images/dog.jpg')}}" alt="Unsplash"> --}}

                                </a>

                                <div class="card-header px-4 pt-4">
                                    <div class="card-actions float-end">
                                        <div class="dropdown position-relative">
                                            <a href="#" data-bs-toggle="dropdown" data-bs-display="static">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                    viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                                    class="feather feather-more-horizontal align-middle">
                                                    <circle cx="12" cy="12" r="1">
                                                    </circle>
                                                    <circle cx="19" cy="12" r="1">
                                                    </circle>
                                                    <circle cx="5" cy="12" r="1">
                                                    </circle>
                                                </svg>
                                            </a>

                                            <div class="dropdown-menu dropdown-menu-end">
                                                <a class="dropdown-item" href="#">Action</a>
                                                <a class="dropdown-item" href="#">Another action</a>
                                                <a class="dropdown-item" href="#">Something else
                                                    here</a>
                                            </div>
                                        </div>


                                    </div>
                                    <h5 class="card-title mb-0">
                                        {{ substr($image->name, 0, 7) . '...' . substr($image->name, -9, 9) }}
                                    </h5>
                                </div>
                                <div class="card-body px-4 pt-2">
                                    @if ($image->is_ready)
                                        <div class="badge bg-success my-2">Готово</div>
                                    @else
                                        <div class="badge bg-danger my-2">Не готово</div>
                                    @endif

                                    <button class="btn btn-danger btn-sm"><i class="fas fa-times"></i></button>

                                </div>
                            </div>
                            {{-- </button> --}}
                        </div>
                    @endforeach




                </div>
            </form>
        </div>
    </main>
</div>
