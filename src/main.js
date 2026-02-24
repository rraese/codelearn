import './styles/index.css';
import './styles/components.css';
import './styles/editor.css';
import './styles/auth.css';
import './styles/pricing.css';
import { Router } from './router.js';
import { renderHome } from './pages/home.js';
import { renderCourse } from './pages/course.js';
import { renderLesson } from './pages/lesson.js';
import { renderAuth } from './pages/auth.js';
import { renderPricing } from './pages/pricing.js';
import { initAuth } from './auth.js';

// Define routes
const routes = [
  {
    path: '/',
    render: (container) => renderHome(container),
  },
  {
    path: '/auth',
    render: (container) => renderAuth(container),
  },
  {
    path: '/pricing',
    render: (container) => renderPricing(container),
  },
  {
    path: '/course/:lang',
    render: (container, params) => renderCourse(container, params),
  },
  {
    path: '/lesson/:lang/:id',
    render: (container, params) => renderLesson(container, params),
  },
];

// Initialize auth, then router
initAuth().then(() => {
  new Router(routes);
});
