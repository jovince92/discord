import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { ThemeProvider } from './lib/ThemeProvider';
import { Toaster } from './Components/ui/toaster';
import QueryProvider from './Providers/QueryProvider';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.tsx`, import.meta.glob('./Pages/**/*.tsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(

            <ThemeProvider>
                <Toaster />
                <QueryProvider>
                    <App {...props} />
                </QueryProvider>
            </ThemeProvider>
        );
    },
    progress: {
        delay:1000,
        color: '#4f46e5',
    },
});
