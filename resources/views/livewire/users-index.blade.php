<div>
    <main>
        <div class="container-fluid p-0">

            <h1 class="h3 mb-3">Пользователи</h1>

            <div class="row">
                <div class="col-12">
                    <div class="card">
                        <div class="card-header">
                            <h5 class="card-title mb-0">
                                <a href="{{ route('add-user') }}" class="btn btn-outline-primary"><i
                                        class="align-middle me-1 fas fa-plus"></i>Добавить пользователя</a>
                            </h5>
                        </div>
                        <div class="card-body">
                            <div class="card">
                                @if (session('status'))
                                    <div class="alert alert-success">
                                        {{ session('status') }}
                                    </div>
                                @endif
                                <div class="card-header col-md-4">
                                    {{-- <form class="d-none d-sm-inline-block" wire:submit.prevent="submit"> --}}
                                    <div class="input-group input-group-navbar">
                                        <input wire:model.lazy="search" type="text" class="form-control"
                                            placeholder="Поиск..." aria-label="Search">
                                        <button class="btn" type="button" type="submit">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                                class="feather feather-search align-middle">
                                                <circle cx="11" cy="11" r="8"></circle>
                                                <line x1="21" y1="21" x2="16.65" y2="16.65">
                                                </line>
                                            </svg>
                                        </button>
                                    </div>
                                    {{-- </form> --}}
                                </div>
                                <table class="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>##</th>
                                            <th style="width:40%; cursor: pointer;" wire:click="sortBy('name')">
                                                @if ($sortField == 'name')
                                                    <i
                                                        class="{{ $sortDirection == 'asc' ? 'fas fa-fw fa-sort-alpha-up' : 'fas fa-fw fa-sort-alpha-down' }}"></i>
                                                @endif
                                                Имя
                                            </th>
                                            <th style="width:25%; cursor: pointer;" wire:click="sortBy('email')">
                                                @if ($sortField == 'email')
                                                    <i
                                                        class="{{ $sortDirection == 'asc' ? 'fas fa-fw fa-sort-alpha-up' : 'fas fa-fw fa-sort-alpha-down' }}"></i>
                                                @endif
                                                E-mail
                                            </th>
                                            <th class="d-none d-md-table-cell" style="width:25%; cursor: pointer;"
                                                wire:click="sortBy('created_at')">
                                                @if ($sortField == 'created_at')
                                                    <i
                                                        class="{{ $sortDirection == 'asc' ? 'fas fa-fw fa-sort-alpha-up' : 'fas fa-fw fa-sort-alpha-down' }}"></i>
                                                @endif
                                                Дата
                                            </th>
                                            <th>Действия</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        @foreach ($users as $user)
                                            <tr>
                                                <td>{{ $user->id }}</td>
                                                <td>{{ $user->name }}</td>
                                                <td>{{ $user->email }}</td>
                                                <td class="d-none d-md-table-cell">
                                                    {{-- {{  }} --}}
                                                    {{ Carbon\Carbon::parse($user->created_at)->translatedFormat('d-F-Y') }}
                                                </td>
                                                <td class="table-action">
                                                    <a href="{{ route('edit-user', $user->id) }}"><i
                                                            class="far fa-fw fa-edit"></i></a>
                                                    <form method="POST" action=""
                                                        style="display: inline-block;">
                                                        @csrf
                                                        @method('DELETE')
                                                        <button type="button"
                                                            wire:click.prevent="confirmUserDelete({{ $user->id }})"
                                                            data-bs-toggle="modal" data-bs-target="#defaultModalDanger"
                                                            style="border: none; background: none;"><i
                                                                class="fas fa-fw fa-trash-alt text-danger"></i></button>
                                                    </form>
                                                </td>
                                            </tr>
                                        @endforeach
                                    </tbody>
                                </table>
                                {{ $users->onEachSide(1)->links('pagination::bootstrap-5') }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <!-- BEGIN danger modal -->
        <div class="modal fade" id="defaultModalDanger" tabindex="-1" role="dialog" aria-hidden="true"
            wire:ignore.self>
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Удаление пользователя </h5>
                        {{-- <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> --}}
                    </div>
                    <div class="modal-body m-3">
                        <p class="mb-0">Вы действительно хотите удалить эту запись?</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Отмена</button>
                        <button type="button" wire:click.prevent="userDelete" class="btn btn-danger"
                            data-bs-dismiss="modal">Удалить</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- END danger modal -->
        <script>
            window.addEventListener('modal-confirm-show', event => {
                $(".modal-title").text($(".modal-title").text() + event.detail.text)
            })

            window.addEventListener('modal-confirm-hide', event => {
                myMessageConfirm(event.detail.message, 'success')
            });
        </script>
    </main>
</div>
