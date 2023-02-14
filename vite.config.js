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
                // 'resources/adminkit/js/myscript.js'
                // 'resources/adminkit/js/app.js.map',
                // 'resources/adminkit/js/datatables.js.map',
                // 'resources/adminkit/js/fullcalendar.js.map',
            ],
            refresh: true,
        }),
    ],
});
