import { getUser } from '../auth.js';
import { tierFeatures } from '../lib/tiers.js';
import { getUserTier } from '../auth.js';

export function renderPricing(container) {
    const user = getUser();
    const currentTier = getUserTier();

    container.innerHTML = `
    <div class="animated-bg"></div>
    <nav class="navbar">
      <div class="container">
        <a href="#/" class="navbar-brand">
          <span class="logo-icon">🚀</span>
          <span class="brand-text">CodeLearn</span>
        </a>
        <ul class="navbar-nav">
          <li><a href="#/">Start</a></li>
          <li><a href="#/pricing" class="active">Preise</a></li>
        </ul>
      </div>
    </nav>

    <main class="page-content page-container">
      <div class="container">
        <div class="pricing-header slide-up">
          <h1>Wähle deinen <span class="gradient-text">Plan</span></h1>
          <p>Starte kostenlos und upgrade jederzeit für vollen Zugang.</p>
        </div>

        <div class="pricing-grid slide-up stagger-1">
          <!-- Free Plan -->
          <div class="pricing-card ${currentTier === 'free' ? 'current' : ''}">
            <div class="pricing-card-header">
              <h2>${tierFeatures.free.name}</h2>
              <div class="pricing-price">
                <span class="price-amount">${tierFeatures.free.price}</span>
                <span class="price-period">für immer</span>
              </div>
            </div>
            <ul class="pricing-features">
              ${tierFeatures.free.features.map(f => `
                <li><span class="feature-check">✓</span> ${f}</li>
              `).join('')}
            </ul>
            <div class="pricing-cta">
              ${currentTier === 'free'
            ? '<button class="btn btn-outline btn-lg btn-full" disabled>Aktueller Plan</button>'
            : '<a href="#/" class="btn btn-outline btn-lg btn-full">Kostenlos starten</a>'}
            </div>
          </div>

          <!-- Pro Plan -->
          <div class="pricing-card featured ${currentTier === 'pro' ? 'current' : ''}">
            <div class="pricing-badge">Beliebteste Wahl</div>
            <div class="pricing-card-header">
              <h2>${tierFeatures.pro.name}</h2>
              <div class="pricing-price">
                <span class="price-amount">${tierFeatures.pro.price.replace('/Monat', '')}</span>
                <span class="price-period">/Monat</span>
              </div>
            </div>
            <ul class="pricing-features">
              ${tierFeatures.pro.features.map(f => `
                <li><span class="feature-check pro">✓</span> ${f}</li>
              `).join('')}
            </ul>
            <div class="pricing-cta">
              ${currentTier === 'pro'
            ? '<button class="btn btn-primary btn-lg btn-full" disabled>Aktueller Plan</button>'
            : user
                ? '<button class="btn btn-primary btn-lg btn-full" id="btn-upgrade">Jetzt upgraden</button>'
                : '<a href="#/auth" class="btn btn-primary btn-lg btn-full">Registrieren & upgraden</a>'}
            </div>
          </div>
        </div>

        <div class="pricing-faq slide-up stagger-2">
          <h3>Häufige Fragen</h3>
          <div class="faq-grid">
            <div class="faq-item">
              <h4>Kann ich jederzeit kündigen?</h4>
              <p>Ja, du kannst dein Pro-Abo jederzeit kündigen. Du behältst den Zugang bis zum Ende des Abrechnungszeitraums.</p>
            </div>
            <div class="faq-item">
              <h4>Bleibt mein Fortschritt erhalten?</h4>
              <p>Absolut! Dein Fortschritt wird in deinem Account gespeichert und geht nie verloren – auch bei einem Downgrade.</p>
            </div>
            <div class="faq-item">
              <h4>Wie funktioniert die Bezahlung?</h4>
              <p>Kontaktiere uns direkt für ein Upgrade – wir sind gerade in der Beta-Phase und bieten flexible Zahlungsoptionen.</p>
            </div>
            <div class="faq-item">
              <h4>Gibt es eine Testphase?</h4>
              <p>Die Free-Version enthält bereits viele Inhalte. Probiere es einfach aus – ein Upgrade lohnt sich für tiefere Themen.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  `;
}
