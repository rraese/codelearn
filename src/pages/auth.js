import { signIn, signUp, getUser } from '../auth.js';

export function renderAuth(container) {
    if (getUser()) {
        window.location.hash = '#/';
        return;
    }

    container.innerHTML = `
    <div class="animated-bg"></div>
    <nav class="navbar">
      <div class="container">
        <a href="#/" class="navbar-brand">
          <span class="logo-icon">🚀</span>
          <span class="brand-text">CodeLearn</span>
        </a>
      </div>
    </nav>

    <main class="page-content page-container">
      <div class="auth-wrapper">
        <div class="auth-card slide-up">
          <div class="auth-header">
            <h1>Willkommen bei <span class="gradient-text">CodeLearn</span></h1>
            <p>Lerne Programmieren – interaktiv & kostenlos</p>
          </div>

          <div class="auth-tabs">
            <button class="auth-tab active" data-tab="login">Anmelden</button>
            <button class="auth-tab" data-tab="register">Registrieren</button>
          </div>

          <!-- Login Form -->
          <form class="auth-form" id="login-form">
            <div class="form-group">
              <label for="login-email">E-Mail</label>
              <input type="email" id="login-email" placeholder="deine@email.de" required autocomplete="email" />
            </div>
            <div class="form-group">
              <label for="login-password">Passwort</label>
              <input type="password" id="login-password" placeholder="••••••••" required autocomplete="current-password" />
            </div>
            <div class="auth-error" id="login-error"></div>
            <button type="submit" class="btn btn-primary btn-lg btn-full" id="login-btn">
              <span class="btn-text">Anmelden</span>
              <span class="btn-loader" style="display:none;">⏳</span>
            </button>
          </form>

          <!-- Register Form -->
          <form class="auth-form" id="register-form" style="display: none;">
            <div class="form-group">
              <label for="register-email">E-Mail</label>
              <input type="email" id="register-email" placeholder="deine@email.de" required autocomplete="email" />
            </div>
            <div class="form-group">
              <label for="register-password">Passwort</label>
              <input type="password" id="register-password" placeholder="Min. 6 Zeichen" required minlength="6" autocomplete="new-password" />
            </div>
            <div class="form-group">
              <label for="register-password-confirm">Passwort bestätigen</label>
              <input type="password" id="register-password-confirm" placeholder="Passwort wiederholen" required minlength="6" autocomplete="new-password" />
            </div>
            <div class="auth-error" id="register-error"></div>
            <button type="submit" class="btn btn-primary btn-lg btn-full" id="register-btn">
              <span class="btn-text">Registrieren</span>
              <span class="btn-loader" style="display:none;">⏳</span>
            </button>
          </form>

          <div class="auth-footer">
            <p class="auth-divider"><span>oder</span></p>
            <p class="auth-hint">Nutze CodeLearn auch <a href="#/">ohne Account</a> – mit eingeschränktem Fortschritt.</p>
          </div>
        </div>
      </div>
    </main>
  `;

    bindAuthTabs(container);
    bindLoginForm(container);
    bindRegisterForm(container);
}

function bindAuthTabs(container) {
    const tabs = container.querySelectorAll('.auth-tab');
    const loginForm = container.querySelector('#login-form');
    const registerForm = container.querySelector('#register-form');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            if (tab.dataset.tab === 'login') {
                loginForm.style.display = 'flex';
                registerForm.style.display = 'none';
            } else {
                loginForm.style.display = 'none';
                registerForm.style.display = 'flex';
            }

            // Clear errors
            container.querySelectorAll('.auth-error').forEach(e => e.textContent = '');
        });
    });
}

function bindLoginForm(container) {
    const form = container.querySelector('#login-form');
    const errorEl = container.querySelector('#login-error');
    const btn = container.querySelector('#login-btn');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        errorEl.textContent = '';

        const email = container.querySelector('#login-email').value.trim();
        const password = container.querySelector('#login-password').value;

        btn.querySelector('.btn-text').textContent = 'Wird angemeldet...';
        btn.querySelector('.btn-loader').style.display = 'inline';
        btn.disabled = true;

        try {
            await signIn(email, password);
            window.location.hash = '#/';
        } catch (err) {
            errorEl.textContent = translateError(err.message);
        } finally {
            btn.querySelector('.btn-text').textContent = 'Anmelden';
            btn.querySelector('.btn-loader').style.display = 'none';
            btn.disabled = false;
        }
    });
}

function bindRegisterForm(container) {
    const form = container.querySelector('#register-form');
    const errorEl = container.querySelector('#register-error');
    const btn = container.querySelector('#register-btn');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        errorEl.textContent = '';

        const email = container.querySelector('#register-email').value.trim();
        const password = container.querySelector('#register-password').value;
        const passwordConfirm = container.querySelector('#register-password-confirm').value;

        if (password !== passwordConfirm) {
            errorEl.textContent = 'Die Passwörter stimmen nicht überein.';
            return;
        }

        btn.querySelector('.btn-text').textContent = 'Wird registriert...';
        btn.querySelector('.btn-loader').style.display = 'inline';
        btn.disabled = true;

        try {
            await signUp(email, password);
            // Auto-login after signup
            await signIn(email, password);
            window.location.hash = '#/';
        } catch (err) {
            errorEl.textContent = translateError(err.message);
        } finally {
            btn.querySelector('.btn-text').textContent = 'Registrieren';
            btn.querySelector('.btn-loader').style.display = 'none';
            btn.disabled = false;
        }
    });
}

function translateError(msg) {
    const translations = {
        'Invalid login credentials': 'E-Mail oder Passwort falsch.',
        'User already registered': 'Diese E-Mail ist bereits registriert.',
        'Password should be at least 6 characters': 'Das Passwort muss mindestens 6 Zeichen lang sein.',
        'Unable to validate email address: invalid format': 'Bitte gib eine gültige E-Mail-Adresse ein.',
        'Email rate limit exceeded': 'Zu viele Versuche. Bitte warte einen Moment.',
    };
    return translations[msg] || `Fehler: ${msg}`;
}
