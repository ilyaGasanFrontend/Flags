<?php

namespace App\Http\Livewire;

use Livewire\Component;
use App\Models\Category;
use Auth;

class CategoriesIndex extends Component
{
    public $beginCategoryDelete = null;

    public function confirmCategoryDelete($userId)
    {
        $this->beginCategoryDelete = $userId;
        $category_name = Category::findOrFail($this->beginCategoryDelete);
        $this->dispatchBrowserEvent('modal-confirm-show', ['text' => $category_name->description]);
    }

    public function categoryDelete()
    {
        // dd('ok');
        $category = Category::findOrFail($this->beginCategoryDelete);

        $category->delete();

        $this->dispatchBrowserEvent('modal-confirm-hide', ['message' => 'Категория '. $category->description .' удалена!']);
    }

    public function render()
    {
        $categories = Category::where('user_id', '=', auth()->user()->id)->get();
        // $users = User::orderBy($this->sortField, $this->sortDirection)
        // ->orWhere('name', 'like', '%' . $this->search . '%')
        // ->orWhere('email', 'like', '%' . $this->search . '%')->with('roles')
        // // ->get();
        // ->paginate(50, ['*'], 'page');
        return view('livewire.categories-index', compact(['categories']));
    }
}
