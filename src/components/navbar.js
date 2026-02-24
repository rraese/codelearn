import { getUser, getUserTier, signOut } from '../auth.js';

export function renderNavbar(activeLink = '') {
    const user = getUser();
    const tier = getUserTier();

    const userSection = user
        ? `<div class="user-menu">
            <span class="tier-badge tier-badge-${tier}">${tier === 'pro' ? '⭐ Pro' : 'Free'}</span>
            <div class="user-avatar">${(user.email || '?')[0].toUpperCase()}</div>
            <span class="user-email">${user.email || ''}</span>
            <button class="btn-ghost" id="btn-logout">Abmelden</button>
           </div>`
        : `<div class="user-menu">
            <a href="#/auth" class="btn btn-sm btn-outline">Anmelden</a>
            <a href="#/pricing" class="btn btn-sm btn-primary">Pro holen</a>
           </div>`;

    return `
    <nav class="navbar">
      <div class="container">
        <a href="#/" class="navbar-brand">
          <span class="logo-icon">🚀</span>
          <span class="brand-text">CodeLearn</span>
        </a>
        <div class="navbar-right">
          <ul class="navbar-nav">
            <li><a href="#/" class="${activeLink === 'home' ? 'active' : ''}">Start</a></li>
            <li><a href="#/" class="nav-courses ${activeLink === 'courses' ? 'active' : ''}">Kurse</a></li>
            <li><a href="#/pricing" class="${activeLink === 'pricing' ? 'active' : ''}">Preise</a></li>
          </ul>
          ${userSection}
        </div>
      </div>
    </nav>`;
}

export function bindNavbar(container) {
    const logoutBtn = container.querySelector('#btn-logout');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', async () => {
            await signOut();
            window.location.hash = '#/';
            // Force re-render
            window.dispatchEvent(new HashChangeEvent('hashchange'));
        });
    }
}
