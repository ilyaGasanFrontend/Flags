@extends('layouts.guest')

@section('content')
    <main class="d-flex w-100 h-100">
        <div class="container d-flex flex-column">
            <div class="row vh-100">
                <div class="col-sm-10 col-md-8 col-lg-6 mx-auto d-table h-100">
                    <div class="d-table-cell align-middle">
                        <div class="card">
                            <div class="card-body">
                                <div class="m-sm-4">
                                    <div class="text-center">
                                        <img src="{{ Vite::asset('resources/adminkit/img/logo/flags.png') }}"
                                            alt="Charles Hall" class="img-fluid" width="200" height="auto" />
                                    </div>
                                    @if ($errors->any())
                                        @foreach ($errors->all() as $error)
                                        <div class="alert alert-danger alert-dismissible" role="alert">
											<div class="alert-message">
												<strong>{{ $error }}</strong>
											</div>
										</div>
                                        @endforeach
                                    @endif
                                    <form method="POST" action="{{ route('login') }}">
                                        @csrf
                                        @method('POST')
                                        <div class="mb-3">
                                            <label class="form-label">E-mail</label>
                                            <input class="form-control form-control-lg" type="email" name="email"
                                                value="{{ old('email') }}" placeholder="Email" required />
                                        </div>
                                        <div class="mb-3">
                                            <label class="form-label">Пароль</label>
                                            <input class="form-control form-control-lg" type="password" name="password"
                                                placeholder="Пароль" required autocomplete="off"/>
                                            {{-- <small>
                                            <a href="pages-reset-password.html">Вспомнить пароль</a>
                                        </small> --}}
                                        </div>
                                        {{-- <div>
                                        <label class="form-check">
                                            <input class="form-check-input" type="checkbox" value="remember-me" name="remember-me" checked>
                                            <span class="form-check-label">
                                                Remember me next time
                                            </span>
                                        </label>
                                    </div> --}}
                                        <div class="text-center mt-3">
                                            <button type="submit" class="btn btn-lg btn-primary">Войти</button>
                                            {{-- <a href="index.html" class="btn btn-lg btn-primary">Sign in</a> --}}
                                            <!-- <button type="submit" class="btn btn-lg btn-primary">Sign in</button> -->
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </main>
@endsection
