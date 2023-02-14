<?php

namespace App\Http\Livewire\Traits;
use Illuminate\Pagination\Paginator;

trait DeleteItemsion
{
    // public $model;
    // удаление с подверждением
    public function confirmUserDelete($userId)
    {
        // dd($userId);
        $this->beginUserDelete = $userId;
        $this->model::findOrFail($this->beginUserDelete);
        $this->dispatchBrowserEvent('modal-confirm-show', ['text' => $this->delName]);

        Paginator::currentPageResolver(function () {
            return $this->currentPage;
        });
    }

    public function userDelete()
    {
        // dd('ok');
        $user = $this->model::findOrFail($this->beginUserDelete);

        $user->delete();

        $this->dispatchBrowserEvent('modal-confirm-hide', ['message' => 'Прием ' . $this->delName . ' удален!']);
    }
}
