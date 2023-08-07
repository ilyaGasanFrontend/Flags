<div>
    <div class="mb-3">
        <label class="form-label ">Название*</label>
        <input type="text" class="form-control @error('name') is-invalid @enderror" placeholder="Название" wire:model="name" required>
        @error('name')  <div class="invalid-feedback">{{ $message }}</div> @enderror
      
    </div>
    <div class="mb-3">
        <label class="form-label @error('description') is-invalid @enderror">Описание</label>
        <input type="text" class="form-control" placeholder="Краткое описание" wire:model="description">
        @error('description')  <div class="invalid-feedback">{{ $message }}</div> @enderror
    </div>
    <button class="btn btn-primary" wire:click='submit'>Создать</button>
    <button class="btn btn-danger" wire:click="clear">Сброс</button>
</div>
