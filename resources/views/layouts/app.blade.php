<!DOCTYPE html>
<html lang="ru">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="FlagsOcta система для создания DataSinice">
    <meta name="author" content="Belosheev">
    <meta name="keywords" content="web, разработка, crm">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link rel="shortcut icon" href="{{ asset('images/favicon.png') }}" />

    <link rel="canonical" href="https://octagramma.ru" />

    <title>{{ config('app.name', 'Octagramma') }}-@yield('title')</title>


        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"></script>


    <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />
    <script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&display=swap" rel="stylesheet">


    @vite(['resources/adminkit/css/light.css'])
    {{-- @vite(['resources/adminkit/js/myscript.js']) --}}
    <script src="{{ asset('myscript.js') }}"></script>
    <link rel="stylesheet" href="{{ asset('style.css') }}">
    @stack('scripts')

    @livewireStyles
</head>

<body data-theme="default" data-layout="fluid" data-sidebar-position="left" data-sidebar-layout="default">
    <div class="wrapper">

        @include('layouts.navigation')
        <div class="main">
            @include('layouts.navigation-top')
            <main class="content">
                @yield('content')
            </main>
            @include('layouts.footer')
        </div>
    </div>
    @vite(['resources/js/app.js', 'resources/adminkit/js/app.js'])
    @livewireScripts
</body>

</html>
