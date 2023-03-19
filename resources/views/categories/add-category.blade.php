@extends('layouts.app')
@section('title', 'Добавить категорию')

@section('content')
    <main>
        <div class="container-fluid p-0">

            <h1 class="h3 mb-3">Добавить категорию</h1>

            <div class="row">
                <div class="col-12">
                    <div class="card">

                        {{-- <h5 class="card-title mb-0">Добавить пользовалеля</h5> --}}
                        @if (session('status'))
                            {{-- <div class="card-header">
                                <div class="alert alert-success alert-dismissible" role="alert">
                                    <div class="alert-message">
                                        <strong>{{ session('status') }}</strong>
                                    </div>
                                </div>
                            </div> --}}
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
                            <form method="POST" action="{{ route('store-category') }}">
                                @csrf
                                @method('POST')

                                <div class="row">
                                    
                                    <div class="mb-3 col-md-12">
                                        <label class="form-label" for="name">Название</label>
                                        <input type="text" name="name" class="form-control" id="name"
                                            placeholder="Название">
                                    </div>
                                    <div class="mb-3 col-md-12">
                                        <label class="form-label" for="color">Цвет</label>
                                        <input type="color" name="color" class="form-control form-control-color"
                                            id="color">
                                    </div>
                                </div>


                                <button type="submit" class="btn btn-outline-primary">Сохранить</button>
                                <a href="{{ route('categories') }}" class="btn btn-outline-danger">Отмена</a>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
@endsection
