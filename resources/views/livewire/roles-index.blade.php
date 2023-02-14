<div>
    <main>
        <div class="container-fluid p-0">

            <h1 class="h3 mb-3">Роли</h1>

            <div class="row">
                <div class="col-12">
                    <div class="card">
                        <div class="card-header">
                            <h5 class="card-title mb-0">
                                <a href="{{ route('role.create') }}" class="btn btn-outline-primary"><i
                                        class="align-middle me-1 fas fa-plus"></i>Добавить роль</a>
                            </h5>
                        </div>
                        <div class="card-body">
                            <div class="card">
                                @if (session('status'))
                                    <div class="alert alert-success">
                                        {{ session('status') }}
                                    </div>
                                    <script>
                                        myMessage("Роль удалена", "success");
                                    </script>
                                @endif

                                <table class="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th style="width:40%;">##</th>
                                            <th class="d-none d-md-table-cell" style="width:25%">Имя</th>
                                            <th>Действия</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        @foreach ($roles as $role)
                                            <tr>
                                                <td>{{ $role->id }}</td>
                                                <td>{{ $role->name }}</td>
                                                <td class="table-action">
                                                    <a href="{{ route('role.edit', $role->id) }}"><i
                                                        class="far fa-fw fa-edit"></i></a>
                                                    <form method="POST"
                                                        action="{{ route('role.destroy', $role->id) }}"
                                                        style="display: inline-block;">
                                                        @csrf
                                                        @method('DELETE')
                                                        <button type="button" style="border: none; background: none;"
                                                            wire:click.prevent="confirmRoleDelete({{ $role->id }})"
                                                            data-bs-toggle="modal" data-bs-target="#defaultModalDanger">
                                                            <i class="fas fa-fw fa-trash-alt text-danger"></i></button>
                                                    </form>
                                                </td>
                                            </tr>
                                        @endforeach
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <!-- BEGIN danger modal -->
        <div class="modal fade" id="defaultModalDanger" tabindex="-1" role="dialog" aria-hidden="true" wire:ignore.self>
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Удаление роли</h5>
                        {{-- <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> --}}
                    </div>
                    <div class="modal-body m-3">
                        <p class="mb-0">Вы действительно хотите удалить эту запись?</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Отмена</button>
                        <button id="delete-role" type="button" class="btn btn-danger"
                        wire:click.prevent="roleDelete"
                            data-bs-dismiss="modal">Удалить</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- END danger modal -->
        <script>
            window.addEventListener('modal-confirm-show', event => {
                $(".modal-title").text($(".modal-title").text() + '-' +event.detail.text)
            })

            window.addEventListener('modal-confirm-hide', event => {
                myMessageConfirm(event.detail.message, 'success')
            });
        </script>
    </main>
</div>
