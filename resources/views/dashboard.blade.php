@extends('layouts.app')

@section('content')
@vite(['resources/js/selector/gallery_links.js'])


<main class='wrapper-w' style="width: 100%; height:100%; postion:relative;">
    <div class="modal fade" id="oldgalls" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-1 w-70">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Полседнии 3 галереи </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body row">
                    <div class="card col">
                        <img src="/images/example-gal.jpg" class="card-img-top" alt="...">

                        <div class="card-body">
                            <h5 class="card-title">Имя галереи</h5>
                            <p class="card-text">Короткое описание. Lorem ipsum dolor sit amet consectetur adipisicing
                                elit. Repellendus aspernatur pariatur nulla corporis, accusamus ex voluptate incidunt
                                ipsam blanditiis nihil, voluptas architecto, obcaecati assumenda quo culpa sapiente
                                laboriosam sed recusandae.</p>
                            <a href="#" class="btn btn-primary">Go somewhere</a>
                        </div>
                    </div>
                    <div class="card col">
                        <img src="/images/example3-gal.jpg" class="card-img-top" alt="...">

                        <div class="card-body">
                            <h5 class="card-title">Имя галереи</h5>
                            <p class="card-text">Короткое описание. Lorem ipsum dolor sit amet consectetur adipisicing
                                elit. Repellendus aspernatur pariatur nulla corporis, accusamus ex voluptate incidunt
                                ipsam blanditiis nihil, voluptas architecto, obcaecati assumenda quo culpa sapiente
                                laboriosam sed recusandae.</p>
                            <a href="#" class="btn btn-primary">Go somewhere</a>
                        </div>
                    </div>
                    <div class="card col">
                        <img src="/images/example2-gal.jpg" class="card-img-top" alt="...">

                        <div class="card-body">
                            <h5 class="card-title">Имя галереи</h5>
                            <p class="card-text">Короткое описание. Lorem ipsum dolor sit amet consectetur adipisicing
                                elit. Repellendus aspernatur pariatur nulla corporis, accusamus ex voluptate incidunt
                                ipsam blanditiis nihil, voluptas architecto, obcaecati assumenda quo culpa sapiente
                                laboriosam sed recusandae.</p>
                            <a href="#" class="btn btn-primary">Go somewhere</a>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>


    <div class="modal fade" id="newgalls" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-2 w-30">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Полседнии 3 галереи </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body modal-body-flex">
                    <h3 class='lable-gal'>
                        Создание новой галереи.
                        <small class="text-muted">Тут вы можете загрузить не все файлы, записать краткое описание и
                            название</small>
                    </h3>
                    <input type="text" class="form-control  form-control-lable w-30" placeholder="имя галлереи"
                        aria-label="gal">

                    <div class=" input-group mh-20">
                        <span class="input-group-text mh-30">краткое описание </span>
                        <textarea class="form-control mh-30" aria-label="With textarea"></textarea>
                        <input type="file" class="form-control" id="inputGroupFile03"
                            aria-describedby="inputGroupFileAddon03" aria-label="Upload">
                    </div>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>


    <div class="container-fluid p-3 w-100 h-100">
        <div class="row h-100">
            <div class="col h-100 p-3" style="display:flex; flex-direction: column; justify-content: space-between;">
                <a id="show-gals" data-bs-toggle="modal" data-bs-target="#oldgalls" style="margin-bottom:0; height:47%;"
                    class="card  bg-gal bg-gals-old box-shadow multiple-filters p-3 align-middle">
                    <div class="card h-50 w-70 card-transperent" style="margin-bottom: 0;">
                        Последнии галереи
                    </div>
                </a>
                <a id="show-gals" data-bs-toggle="modal" data-bs-target="#newgalls" style="margin-bottom:0; height:47%;"
                    class="card bg-gal bg-gals-future box-shadow multiple-filters p-3 align-middle">
                    <div class="card h-50 w-70 card-transperent" style="margin-bottom: 0;">
                        Создать новую галерею
                    </div>
                </a>
            </div>
            <div class="col h-100 p-3" style='max-height: 800px;'>
                <div class="card h-100 m-n  " style="display: flex; justify-content: center; ">
                    
                    <div id="carouselExampleDark" class="carousel carousel-dark slide" data-bs-ride="carousel">
                        
                        <div class="carousel-indicators">
                            <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0"
                                class="active" aria-current="true" aria-label="Slide 1"></button>
                            <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1"
                                aria-label="Slide 2"></button>
                            <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2"
                                aria-label="Slide 3"></button>
                        </div>
                        <div class="carousel-inner">
                            <div class="carousel-item active" data-bs-interval="10000">
                                <img src="/images/carusel.jpg" class="d-block w-100" style="max-height: 750px;" alt="...">
                                <div class="carousel-caption d-none d-md-block text-light">
                                    <h5>Тут могла быть ваша реклама</h5>
                                    <p>Тут могла быть ваша реклама</p>
                                </div>
                            </div>
                            <div class="carousel-item" data-bs-interval="2000">
                                <img src="/images/carusel1.jpg" class="d-block w-100" style="max-height: 750px;" alt="...">
                                <div class="carousel-caption d-none d-md-block text-light">
                                    <h5>Тут могла быть ваша реклама</h5>
                                    <p>Тут могла быть ваша реклама</p>
                                </div>
                            </div>
                            <div class="carousel-item">
                                <img src="/images/carusel2.jpg" class="d-block w-100" style="max-height: 750px;" alt="...">
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
    <link href="{{ url('/css/home_place.css') }}" rel="stylesheet">
</main>
@push('scripts')
<script src={{ asset('dashboardmy.js') }}></script>
@endpush
@endsection