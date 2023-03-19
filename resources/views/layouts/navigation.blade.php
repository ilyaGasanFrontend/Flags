
<nav id="sidebar" class="sidebar js-sidebar">
    <div class="sidebar-content js-simplebar">
        <a class="sidebar-brand" href="">
            <span class="sidebar-brand-text align-middle">
                <img src="{{ Vite::asset('resources/adminkit/img/logo/flags2.png') }}" alt="Oktagramma"
                    width="150px" height="auto">

            </span>
            <svg class="sidebar-brand-icon align-middle" width="32px" height="32px" viewBox="0 0 24 24"
                fill="none" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="miter"
                color="#FFFFFF" style="margin-left: -3px">
                <path d="M12 4L20 8.00004L12 12L4 8.00004L12 4Z"></path>
                <path d="M20 12L12 16L4 12"></path>
                <path d="M20 16L12 20L4 16"></path>
            </svg>
        </a>

        

        <ul class="sidebar-nav">
            <li class="sidebar-header">
                Разделы
            </li>
           
            <li class="sidebar-item ">
                <a class="sidebar-link" href="{{ route('dashboard') }}">
                    <i class="align-middle" data-feather="sliders"></i> <span class="align-middle">Рабочий стол</span>
                </a>
            </li>

            <li class="sidebar-item ">
                <a class="sidebar-link" href="{{ route('gallery') }}">
                    <i class="align-middle" data-feather="grid"></i> <span class="align-middle">Галерея</span>
                </a>
            </li>
            
            <li class="sidebar-header">
                Справочники
            </li>
            <li class="sidebar-item @if (request()->routeIs('users', 'add-user', 'edit-user')) active @endif">
                <a class="sidebar-link" href="{{ route('users') }}">
                    <i class="align-middle" data-feather="users"></i> <span class="align-middle">Пользователи</span>
                </a>
            </li>
            <li class="sidebar-item @if (request()->routeIs('role.index')) active @endif">
                <a class="sidebar-link" href="{{ route('role.index') }}">
                    <i class="align-middle" data-feather="user-check"></i> <span class="align-middle">Роли</span>
                </a>
            </li>
            <li class="sidebar-item">
                <a class="sidebar-link" href="{{ route('categories') }}">
                    <i class="align-middle" data-feather="crop"></i> <span class="align-middle">Категории</span>
                </a>
            </li>

        </ul>

        <div class="sidebar-cta">
            <div class="sidebar-cta-content">
                <strong class="d-inline-block mb-2">Octagramma</strong>
                <div class="mb-3 text-sm">
                    Заказ и цены!
                </div>

                <div class="d-grid">
                    <a href="https://octagramma.ru/" class="btn btn-outline-primary" target="_blank">Перейти</a>
                </div>
            </div>
        </div>
    </div>
</nav>
