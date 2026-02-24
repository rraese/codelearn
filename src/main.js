import './styles/index.css';
import './styles/components.css';
import './styles/editor.css';
import { Router } from './router.js';
import { renderHome } from './pages/home.js';
import { renderCourse } from './pages/course.js';
import { renderLesson } from './pages/lesson.js';

// Define routes
const routes = [
  {
    path: '/',
    render: (container) => renderHome(container),
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

// Initialize router
new Router(routes);
