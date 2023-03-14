<div>
    <main class="content">
        <h1>Галерея</h1><br><br>

        <div class="row">
            <div class="col-md-6 text-center">
                <div class="col-12 col-md-6 col-lg-3">
                    <form wire:submit.prevent="store_photos">
                        <input type="file" wire:model="files" multiple>
                        <div wire:loading wire:target="files">Uploading...</div>

                        <input type="submit">
                    </form>
                </div>
            </div>
            <div class="col-md-6 text-center"">
                <div class="btn-group">
                    <button type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Экспорт
                    </button>
                    <div class="dropdown-menu" style="">
                        <h6 class="dropdown-header">Экспортировать как...</h6>
                        <div class="dropdown-item" wire:click='download_file("txt")'>TXT</div>
                        <div class="dropdown-item" wire:click='download_file("csv")'>CSV</div>
                        {{-- <div class="dropdown-item" wire:click='download_file("json")'>JSON</div> --}}
                    </div>
                </div>
            </div>
        </div>

        {{-- <br>S3
        <div class="row">
            <div class="col-12 col-md-6 col-lg-3">
                <form wire:submit.prevent="store_s3">
                    <input type="file" wire:model="files">
                    <input type="submit">
                </form>
            </div>
        </div>
        <br> --}}

        {{-- <img src="https://hb.bizmrg.com/octagramma-files/livewire-imgs/knnE13EfYuHUTyOdIzmp2kH1PXlDWWzjY2evHhDU.png"> --}}
        @push('scripts')
            <script>
                $(document).ready(function(e) {
                    console.log($("input[name='test[1]']").val())
                })
            </script>
        @endpush
        <div class="row">
            <div class="col-md-6">
                <input type="checkbox" wire:click="$toggle('filter')"><label> Скрывать готовые</label>

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

                                <a href="/gallery/{{ $image->id }}">
                                    <img class="card-img-top" src="{{ $image->path_to_file }}" loading="lazy"
                                        alt="{{ $image->path_to_file }}" style="aspect-ratio: 1/1;" >
                                    {{-- <img class="card-img-top" src="{{asset('images/dog.jpg')}}" alt="Unsplash"> --}}

                                </a>

                                <div class="card-header px-4 pt-4">
                                    
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
