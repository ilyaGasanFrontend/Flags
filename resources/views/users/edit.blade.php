@extends('layouts.app')
@section('title', 'Добавить пользователя')

@section('content')
    <main>
        <div class="container-fluid p-0">

            <h1 class="h3 mb-3">Добавить пользовалеля</h1>

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
                            <form method="POST" action="{{ route('update-user', $user->id) }}">
                                @csrf
                                @method('PUT')
                                <div class="row">
                                    <div class="mb-3 col-md-12">
                                        <label class="form-label" for="name">Имя</label>
                                        <input type="text" name="name" class="form-control" id="name"
                                            placeholder="Имя" value="{{ $user->name }}">
                                    </div>
                                    <div class="mb-3 col-md-12">
                                        <label class="form-label" for="email">E-mail</label>
                                        <input type="text" name="email" class="form-control" id="email"
                                            placeholder="Email" value="{{ $user->email }}">
                                    </div>
                                    <div class="mb-3 col-md-12">
                                        <label class="form-label" for="role">Роль</label>
                                        <select name="role" id="role" class="form-control">
                                            {{-- <option selected="">Choose...</option> --}}
                                            <option selected disabled hidden>Выбирите роль</option>
                                            @foreach ($roles as $role)
                                                <option value="{{ $role->id }}"
                                                    @if ($user->hasRole($role->name)) selected @endif>{{ $role->name }}
                                                </option>
                                            @endforeach

                                        </select>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="mb-3 col-md-12">
                                        <label class="form-label" for="password">Пароль</label>
                                        <input type="password" name="password" class="form-control" id="password"
                                            placeholder="Пароль">
                                    </div>
                                    {{-- <div class="mb-3 col-md-6">
                                        <label class="form-label" for="password_confirmation">Повтор пароля</label>
                                        <input type="password" name="password_confirmation" class="form-control"
                                            id="password_confirmation" placeholder="Повтор пароля">
                                    </div> --}}
                                </div>


                                <button type="submit" class="btn btn-outline-primary">Сохранить</button>
                                <a href="{{ route('users') }}" class="btn btn-outline-danger">Отмена</a>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </main>
@endsection
