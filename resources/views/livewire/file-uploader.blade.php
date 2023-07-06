<div>
    <div class="row">
        <div class="col-md-9">
            <div class="mb-3">
                <input type="file" class="form-control" id="file_uploader" multiple>
            </div>
            <div class="row">
                @foreach ($files as $i => $file)
                    <div class="row">
                        <div class="col-md-9">
                            <div class="progress mb-3">
                                <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"
                                    style="width: {{ $file['progress'] }}%" aria-valuenow="{{ $file['progress'] }}"
                                    aria-valuemin="0" aria-valuemax="100">
                                    {{ $file['progress'] }}%
                                </div>
                            </div>
                        </div>
                        {{-- {{$file->progress}} --}}

                        <div class="col-md-3">{{ $file['fileName'] }}</div>


                        {{-- <progress max="100" wire:model="files.{{ $i }}.progress"> --}}
                    </div>
                @endforeach
            </div>
        </div>
        <div class="col-md-3">
            <button class="btn btn-primary" wire:click="store_files" wire:loading.attr='disabled'>Отправить</button>
        </div>

        {{-- <button class="btn btn-primary" wire:loading.attr="wire:click='store_files'">test</button> --}}



        <script>
            window.addEventListener('livewire-upload-progress', event => {
                @this.set('progress', event.detail.progress);
            });

            const filesSelector = document.querySelector('#file_uploader');
            let chnkStarts = [];

            filesSelector.addEventListener('change', () => {
                const fileList = [...filesSelector.files];
                fileList.forEach((file, index) => {
                    @this.set('files.' + index + '.fileName', file.name);
                    @this.set('files.' + index + '.fileSize', file.size);
                    @this.set('files.' + index + '.progress', 0);
                    chnkStarts[index] = 0;
                    livewireUploadChunk(index, file);
                });
            });

            function livewireUploadChunk(index, file) {
                const chunkEnd = Math.min(chnkStarts[index] + @js($chunkSize), file.size);
                const chunk = file.slice(chnkStarts[index], chunkEnd);

                @this.upload('files.' + index + '.fileChunk', chunk, (n) => {}, () => {}, (e) => {
                    if (e.detail.progress == 100) {
                        // Get next start
                        chnkStarts[index] =
                            Math.min(chnkStarts[index] + @js($chunkSize), file.size);

                        // Upload if within file size
                        if (chnkStarts[index] < file.size)
                            livewireUploadChunk(index, file);
                    }
                });
            }
        </script>
    </div>
</div>