@extends('layouts.app')

@section('content')
    @vite(['resources/js/selector/gallery_links.js'])


    <div>
        {{-- <h1>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="{{ route('dashboard') }}">Рабочий стол</a></li>
                    <li class="breadcrumb-item active">Галерея</li>
                </ol>
            </nav>
        </h1> --}}
        <div class="row h-100">
            <div class="col h-100">
                <div class="row">
                    <div class="card">
                        <div class="card-header">
                            <h5 class="card-title mb-0">Недавние</h5>
                        </div>

                        <div class="card-body">
                            <div class="row">
                                @if ($projects)
                                    @foreach ($projects as $project)
                                        <div class="col-4">
                                            <div class="card bg-light col d-flex ">
                                                <div class="wrapper__class ">
                                                    <a class="row-8"
                                                        href="{{ route('gallery', ['gal' => $project->id]) }}">
                                                        @if ($project->path_to_file)
                                                            <img class="card-img-top" src="{{ $project->path_to_file }}"
                                                                loading="lazy" style="width: 100%; object-fit: cover;">
                                                        @else
                                                            <img class="card-img-top"
                                                                src="{{ Vite::asset('resources/adminkit/img/logo/flags.png') }}"
                                                                loading="lazy" style="width: 100%; object-fit: cover;">
                                                        @endif

                                                        {{-- <img class="card-img-top" src="{{asset('images/dog.jpg')}}" alt="Unsplash"> --}}
                                                    </a>

                                                    <div class="card-header bg-light row-8">

                                                        <h5 class="card-title ">
                                                            <a href="{{ route('gallery', ['gal' => $project->id]) }}">
                                                                {{ $project->name }}
                                                            </a>
                                                        </h5>
                                                        <p>
                                                            <em>
                                                                @if ($project->description)
                                                                    {{ $project->description }}
                                                                @else
                                                                    Описание отсутствует
                                                                @endif
                                                            </em>
                                                        </p>

                                                    </div>

                                                </div>



                                            </div>
                                        </div>
                                    @endforeach
                                @endif
                            </div>
                        </div>
                    </div>

                    <div class="card">
                        <div class="card-header">

                            <h5 class="card-title mb-0">Добавить новую галерею</h5>

                        </div>
                        <div class="card-body">
                            @livewire('dashboard-form')
                        </div>
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="card">
                    <div id="carouselExampleDark" class="carousel carousel-dark slide" data-bs-ride="carousel">

                        <div class="carousel-indicators">
                            <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" class="active"
                                aria-current="true" aria-label="Slide 1"></button>
                            <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1"
                                aria-label="Slide 2"></button>
                            <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2"
                                aria-label="Slide 3"></button>
                        </div>
                        <div class="carousel-inner">
                            <div class="carousel-item active" data-bs-interval="10000">
                                <img src="/images/carusel.jpg" class="d-block w-100" style="max-height: 750px;"
                                    alt="...">
                                <div class="carousel-caption d-none d-md-block text-light">
                                    <h5>Тут могла быть ваша реклама</h5>
                                    <p>Тут могла быть ваша реклама</p>
                                </div>
                            </div>
                            <div class="carousel-item" data-bs-interval="2000">
                                <img src="/images/carusel1.jpg" class="d-block w-100" style="max-height: 750px;"
                                    alt="...">
                                <div class="carousel-caption d-none d-md-block text-light">
                                    <h5>Тут могла быть ваша реклама</h5>
                                    <p>Тут могла быть ваша реклама</p>
                                </div>
                            </div>
                            <div class="carousel-item">
                                <img src="/images/carusel2.jpg" class="d-block w-100" style="max-height: 750px;"
                                    alt="...">
                                <div class="carousel-caption d-none d-md-block text-light">
                                    <h5>Тут могла быть ваша реклама</h5>
                                    <p>Тут могла быть ваша реклама</p>
                                </div>
                            </div>
                        </div>
                        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark"
                            data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Предыдущий</span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleDark"
                            data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Следующий</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    {{-- @push('scripts')
        <script src={{ asset('dashboardmy.js') }}></script>
    @endpush --}}
@endsection
