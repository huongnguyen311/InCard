const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');
const bodyStart = content.indexOf('<body>');
const bodyEnd = content.indexOf('</body>') + 7;
const head = content.slice(0, bodyStart);
const tail = content.slice(bodyEnd);

const arrow = '<div class="flow-card-arrow"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></div>';

const icons = {
  all:   '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#009037" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>',
  login: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4M10 17l5-5-5-5M15 12H3"/></svg>',
  home:  '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#facc15" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H5a1 1 0 01-1-1V9.5z"/><path d="M9 21v-8h6v8"/></svg>',
  net:   '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#c084fc" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="5" cy="12" r="2.5"/><circle cx="19" cy="7" r="2.5"/><circle cx="19" cy="17" r="2.5"/><path d="M7.5 12h5.5M13 12l3.5-4M13 12l3.5 4"/></svg>',
  notif: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fa987d" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"/></svg>',
  prof:  '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4ade80" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.582-7 8-7s8 3 8 7"/></svg>',
  web:   '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#EF5023" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"/></svg>',
};

const icons24 = {
  login: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4M10 17l5-5-5-5M15 12H3"/></svg>',
  home:  '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#facc15" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H5a1 1 0 01-1-1V9.5z"/><path d="M9 21v-8h6v8"/></svg>',
  net:   '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c084fc" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="5" cy="12" r="2.5"/><circle cx="19" cy="7" r="2.5"/><circle cx="19" cy="17" r="2.5"/><path d="M7.5 12h5.5M13 12l3.5-4M13 12l3.5 4"/></svg>',
  notif: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fa987d" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"/></svg>',
  prof:  '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4ade80" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.582-7 8-7s8 3 8 7"/></svg>',
  web28: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#EF5023" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"/></svg>',
};

function navItem(href, bg, icon, title, sub, badge) {
  return `  <a class="nav-item" href="${href}">
    <div class="nav-item-icon" style="background:${bg};">${icon}</div>
    <div class="nav-item-text"><span class="nav-item-title">${title}</span><span class="nav-item-sub">${sub}</span></div>
    ${badge ? `<span class="nav-badge">${badge}</span>` : ''}
  </a>`;
}

function card(href, iconBg, icon, title, desc, badgeBg, badgeColor, badgeLabel, count) {
  return `    <a class="flow-card" href="${href}">
      <div class="flow-card-icon" style="background:${iconBg};">${icon}</div>
      <div class="flow-card-body">
        <div class="flow-card-title">${title}</div>
        <div class="flow-card-desc">${desc}</div>
        <div class="flow-card-meta">
          <span class="flow-card-badge" style="background:${badgeBg};color:${badgeColor};">${badgeLabel}</span>
          <span class="flow-card-screens">${count} screens</span>
        </div>
      </div>
      ${arrow}
    </a>`;
}

const newBody = `<body>

<div class="sidebar">
  <div class="sidebar-logo">
    <img src="logo.png" alt="InCard" />
    <div class="sidebar-logo-text">
      <span class="sidebar-logo-name">InCard</span>
      <span class="sidebar-logo-sub">Design System</span>
    </div>
  </div>

  <div class="sidebar-section-label">Overview</div>
  <a class="nav-item active" href="index.html">
    <div class="nav-item-icon" style="background:rgba(0,144,55,0.15);">${icons.all}</div>
    <div class="nav-item-text"><span class="nav-item-title">All Flows</span><span class="nav-item-sub">Overview</span></div>
  </a>

  <div class="sidebar-section-label">Authentication</div>
  ${navItem('auth.html', 'rgba(59,130,246,0.12)', icons.login, 'Auth Flow', 'Sign up &amp; Sign in', 9)}

  <div class="sidebar-section-label">Core App</div>
  ${navItem('home.html', 'rgba(234,179,8,0.12)', icons.home, 'Home &amp; Account', 'Dashboard, settings', 8)}
  ${navItem('network.html', 'rgba(168,85,247,0.12)', icons.net, 'Network', 'Connections', 1)}
  ${navItem('notifications.html', 'rgba(239,80,35,0.12)', icons.notif, 'Notifications', 'Activity feed', 3)}

  <div class="sidebar-section-label">Profile</div>
  ${navItem('profile.html', 'rgba(0,144,55,0.12)', icons.prof, 'Profile Flow', 'Digital card, portfolio', 17)}

  <div class="sidebar-section-label">Web</div>
  ${navItem('ui-for-web.html', 'rgba(239,80,35,0.12)', icons.web, 'UI for Web', 'Browser layout', 4)}

  <div class="sidebar-footer">
    <div class="sidebar-footer-text">InCard Design System</div>
  </div>
</div>

<div class="main">
  <div class="main-header">
    <div class="main-header-label">InCard — Design System</div>
    <div class="main-header-title">Screen Flows</div>
    <div class="main-header-sub">Click any flow to open and explore screens</div>
  </div>

  <div class="section-title">Authentication</div>
  <div class="flow-grid">
    ${card('auth.html', 'rgba(59,130,246,0.12)', icons24.login, 'Auth Flow', 'Sign up, sign in with email, Google, Apple and LinkedIn', 'rgba(59,130,246,0.12)', '#60a5fa', 'Auth', 9)}
  </div>

  <div class="section-title">Core App</div>
  <div class="flow-grid">
    ${card('home.html', 'rgba(234,179,8,0.12)', icons24.home, 'Home &amp; Account', 'Dashboard, account details, settings and referral', 'rgba(234,179,8,0.12)', '#facc15', 'Core', 8)}
    ${card('network.html', 'rgba(168,85,247,0.12)', icons24.net, 'Network', 'Connections, scanned cards, contacts and leads tabs', 'rgba(168,85,247,0.12)', '#c084fc', 'Core', 1)}
    ${card('notifications.html', 'rgba(239,80,35,0.12)', icons24.notif, 'Notifications', 'Activity feed and notification states', 'rgba(239,80,35,0.12)', '#fa987d', 'Core', 3)}
  </div>

  <div class="section-title">Profile</div>
  <div class="flow-grid">
    ${card('profile.html', 'rgba(0,144,55,0.12)', icons24.prof, 'Profile Flow', 'Digital card, portfolio, NFC activation, schedule meeting', 'rgba(0,144,55,0.12)', '#4ade80', 'Profile', 17)}
  </div>

  <div class="section-title">Web</div>
  <div class="flow-grid">
    <a class="flow-card featured" href="ui-for-web.html">
      <div class="flow-card-icon" style="background:rgba(239,80,35,0.15);width:60px;height:60px;border-radius:16px;">${icons24.web28}</div>
      <div class="flow-card-body">
        <div class="flow-card-title">UI for Web</div>
        <div class="flow-card-desc">Browser-optimised profile page with Save &amp; Send contact flow, QR codes, and modal</div>
        <div class="flow-card-meta">
          <span class="flow-card-badge" style="background:rgba(239,80,35,0.15);color:#EF5023;">Web</span>
          <span class="flow-card-screens">4 screens</span>
        </div>
      </div>
      ${arrow}
    </a>
  </div>
</div>

</body>`;

fs.writeFileSync('index.html', head + newBody + tail, 'utf8');
console.log('done', (head + newBody + tail).length);
