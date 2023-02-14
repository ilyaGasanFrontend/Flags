<?php

namespace App\Http\Livewire;

use Livewire\Component;
use Spatie\Permission\Models\Role;

class RolesIndex extends Component
{
    public $beginDeleteRole = null;

    public function confirmRoleDelete($roleId)
    {
        $this->beginDeleteRole = $roleId;

        $role_name = Role::findOrFail($this->beginDeleteRole);

        $this->dispatchBrowserEvent('modal-confirm-show', ['text' => $role_name->name]);
    }

    public function roleDelete()
    {
        $role = Role::findOrFail($this->beginDeleteRole);

        $role->delete();

        $this->dispatchBrowserEvent('modal-confirm-hide', ['message' => 'Роль удалена!']);
    }

    public function render()
    {
        $roles = Role::orderBy('id', 'desc')->get();

        return view('livewire.roles-index', compact([
            'roles'
        ]));
    }
}
