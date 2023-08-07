<?php

namespace App\Http\Livewire;

use App\Models\Projects;
use Livewire\Component;


class DashboardForm extends Component
{
    public $name, $description;

    protected $rules = [
        'name' => 'required|min:3|max:20',
        'description' => 'max:100',
    ];

    protected $messages = [
        'required' => ':Attribute обязательно для заполнения',
        'min' => 'Слишком короткое :attribute',
        'max' => 'Слишком длинное :attribute',
    ];

    protected $validationAttributes = [
        'name' => 'название',
        'description' => 'описание',
    ];

    public function updated($propertyName)
    {
        $this->validateOnly($propertyName);
    }

    public function submit()
    {
        $this->validate();

        $sql = Projects::create([
            'name' => $this->name,
            'description' => $this->description,
            'user_id' => auth()->user()->id,
        ]);
        
        return redirect()->route('gallery', ['gal' => $sql->id]);
    }

    public function clear()
    {
        $this->reset();
    }

    public function render()
    {
        return view('livewire.dashboard-form');
    }
}
