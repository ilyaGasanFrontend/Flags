import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/css/app.css',
                'resources/js/app.js',
                'resources/adminkit/css/light.css',
                'resources/adminkit/js/app.js',
                'resources/adminkit/js/datatables.js',
                'resources/adminkit/js/fullcalendar.js',
                'resources/js/selector.js',
                'resources/js/slider.js',
                'resources/js/creatingmarks.js',
                'resources/js/returnerToBD.js',
            ],
            refresh: true,
        }),
    ],
});
