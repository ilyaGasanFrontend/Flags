<!DOCTYPE html>
<html lang="ru">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="Octagramma CRM">
    <meta name="author" content="Belosheev">
    <meta name="keywords"
        content="web, разработка, crm">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link rel="shortcut icon" href="{{ asset('images/favicon.png') }}" />

    <link rel="canonical" href="https://octagramma.ru" />

    <title>{{ config('app.name', 'Octagramma') }}</title>

    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&display=swap" rel="stylesheet">
    
    <link href="{{ url('/css/selector.css') }}" rel="stylesheet">
    @push('head')
    <script src="{{ asset('js/components/pizza.js')}}"></script>
    @endpush
    {{-- <link href="{{ asset('resources/adminkit/css/selector.css') }}" rel="stylesheet"> --}}
    <!-- Choose your prefered color scheme -->
    <!-- <link href="css/light.css" rel="stylesheet"> -->
    <!-- <link href="css/dark.css" rel="stylesheet"> -->
    <!-- scripts -->
    @vite(['resources/adminkit/css/light.css', 'resources/js/app.js'])
    @vite(['resources/js/selector.js', 'resources/js/slider.js', 'resources/js/creatingmarks.js'])

    <!-- BEGIN SETTINGS -->
    <!-- Remove this after purchasing -->
    {{-- <link class="js-stylesheet" href="css/light.css" rel="stylesheet">
	<script src="js/settings.js"></script>
	<style>
		body {
			opacity: 0;
		}
	</style> --}}
    <!-- END SETTINGS -->
</head>
<!--
  HOW TO USE:
  data-theme: default (default), dark, light, colored
  data-layout: fluid (default), boxed
  data-sidebar-position: left (default), right
  data-sidebar-layout: default (default), compact
-->

<body data-theme="default" data-layout="fluid" data-sidebar-position="left" data-sidebar-layout="default">
    

    @vite(['resources/adminkit/js/app.js'])

</body>

</html>
