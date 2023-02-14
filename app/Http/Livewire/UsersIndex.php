<?php

namespace App\Http\Livewire;

use App\Models\User;
use Illuminate\Pagination\Paginator;
use Livewire\Component;
use Livewire\WithPagination;

class UsersIndex extends Component
{
    use WithPagination;

    public $search = '';
    public $sortField = 'name';
    public $sortDirection = 'desc';
    public $currentPage = 1;
    public $beginUserDelete = null;


    public function setPage($url)
    {
        $this->currentPage = explode('page=', $url)[1];

        Paginator::currentPageResolver(function() {
            return $this->currentPage;
        });
    }

    public function sortBy($field)
    {
        $this->sortDirection = $this->sortField === $field
        ? $this->sortDirection = $this->sortDirection === 'desc' ? 'asc' : 'desc' 
        : 'desc';

        $this->sortField = $field;
    }

    public function confirmUserDelete($userId)
    {
        // dd($userId);
        $this->beginUserDelete = $userId;
        $user_name = User::findOrFail($this->beginUserDelete);
        $this->dispatchBrowserEvent('modal-confirm-show', ['text' => $user_name->name]);
    }

    public function userDelete()
    {
        // dd('ok');
        $user = User::findOrFail($this->beginUserDelete);

        $user->delete();

        $this->dispatchBrowserEvent('modal-confirm-hide', ['message' => 'Пользователь '. $user->name .' удален!']);
    }

    public function render()
    {
        
        $users = User::orderBy($this->sortField, $this->sortDirection)
        ->orWhere('name', 'like', '%' . $this->search . '%')
        ->orWhere('email', 'like', '%' . $this->search . '%')->with('roles')
        // ->get();
        ->paginate(50, ['*'], 'page');
        return view('livewire.users-index', compact([
            'users',
        ]));
    }
}
