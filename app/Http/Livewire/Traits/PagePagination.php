<?php

namespace App\Http\Livewire\Traits;
use Illuminate\Pagination\Paginator;
use Livewire\WithPagination;

trait PagePagination
{
    use WithPagination;
    
    public $currentPage = 1;

    public function setPage($url)
    {
        $this->currentPage = explode('page=', $url)[1];

        Paginator::currentPageResolver(function () {
            return $this->currentPage;
        });
    }
}
