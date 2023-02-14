@extends('layouts.app')
@section('title', 'Добавить роль')

@section('content')
    <main>
        <div class="container-fluid p-0">

            <h1 class="h3 mb-3">Добавить роль</h1>

            <div class="row">
                <div class="col-12">
                    <div class="card">

                        {{-- <h5 class="card-title mb-0">Добавить пользовалеля</h5> --}}
                        @if (session('status'))
                            <script>
                                myMessage("{!! session('status') !!}", "success");
                            </script>
                        @endif
                        @if ($errors->any())
                            <div class="card-header">
                                <div class="alert alert-danger alert-dismissible" role="alert">
                                    <div class="alert-message">
                                        <ul>
                                            @foreach ($errors->all() as $error)
                                                <li>{{ $error }}</li>
                                            @endforeach
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        @endif

                        <div class="card-body">
                            <form method="POST" action="{{ route('role.store') }}">
                                @csrf
                                @method('POST')
                                <div class="row">
                                    <div class="mb-3 col-md-3">
                                        <label class="form-label" for="name">Имя</label>
                                        <input type="text" name="name" class="form-control" id="name"
                                            placeholder="Имя">
                                    </div>
                                    <div class="mb-3 col-md-3">
                                        @foreach ($permissions as $permission)
                                            <div class="form-check form-switch">
                                                <input name="permissions[]" value="{{ $permission->id }}"
                                                    class="form-check-input" type="checkbox"
                                                    id="role_{{ $permission->id }}">
                                                <label class="form-check-label"
                                                    for="role_{{ $permission->id }}">{{ trans('messages.' . $permission->name) }}</label>
                                            </div>
                                        @endforeach
                                    </div>
                                </div>

                                <button type="submit" class="btn btn-outline-primary">Сохранить</button>
                                <a href="{{ route('role.index') }}" class="btn btn-outline-danger">Отмена</a>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </main>
@endsection
