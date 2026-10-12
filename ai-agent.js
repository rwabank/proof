/* Avia — Scripted AI Bot for €PROOF Proof Token */
(function () {
  'use strict';
  var state = { isOpen: false };
  function el(id) { return document.getElementById(id); }

  var CONTRACT = '5rzYSSWCgiY5dUf7JG1i1fBUkNWbYA51fuzWhMYx6t6A';
  var POOL = '3dUpe7cru8HTw3WmHufJu2Ho4UcXQsuCTc84tNGHshpw';
  var AUDT_CONTRACT = '4EqVmfTc2ftfdcXCbR95UEsoMdab3WstSj5MEPVW2kqb';

  var KB = {
    'what': {
      title: 'What is €PROOF?',
      answer: [
        '**€PROOF (Proof Token)** — the proof layer of AviaTrust on Solana.',
        '',
        '€PROOF is a fungible token for **on-chain audit certificates**.',
        '',
        '**How it works:**',
        '· Token audited via €AUDT',
        '· Score calculated',
        '· €PROOF certificate issued',
        '· On-chain record published',
        '',
        '**What\'s recorded on-chain:**',
        '· Audit score 0-100',
        '· Date of audit',
        '· Contract address',
        '',
        '📄 Contract: `' + CONTRACT + '`',
        '⛓ Chain: Solana (Token-2022, 1% transfer fee)'
      ].join('\n')
    },
    'buy': {
      title: 'How to buy €PROOF?',
      answer: [
        '**Buy €PROOF on Solana:**',
        '',
        '**1. Jupiter**',
        '→ https://jup.ag/tokens/' + CONTRACT,
        '',
        '**2. OpenSea**',
        '→ https://opensea.io/token/solana/' + CONTRACT,
        '',
        '**3. GeckoTerminal**',
        '→ https://www.geckoterminal.com/solana/pools/' + POOL,
        '',
        '💡 Recommend Jupiter for lowest slippage.'
      ].join('\n')
    },
    'contract': {
      title: 'Contract & Pool',
      answer: [
        '**€PROOF Contract (Solana)**',
        '',
        '`' + CONTRACT + '`',
        '',
        '**Meteora Pool**',
        '`' + POOL + '`',
        '',
        '**Verify on:**',
        '· Solscan: https://solscan.io/token/' + CONTRACT,
        '· GeckoTerminal: https://www.geckoterminal.com/solana/pools/' + POOL
      ].join('\n')
    },
    'price': {
      title: 'Price & Target',
      answer: [
        '**€PROOF Price**',
        '',
        '· Launch price: **€0.01**',
        '· Community target: **×100 → €1.00**',
        '',
        '**Live price:**',
        '· GeckoTerminal: https://www.geckoterminal.com/solana/pools/' + POOL,
        '· Jupiter: https://jup.ag/tokens/' + CONTRACT,
        '',
        '⚠️ The ×100 is a community-stated target, not a promise.'
      ].join('\n')
    },
    'liquidity': {
      title: 'Liquidity',
      answer: [
        '**€PROOF Liquidity**',
        '',
        'Liquidity is locked on Meteora DAMM V2.',
        '',
        '**Pool address:**',
        '`' + POOL + '`',
        '',
        '**Verify on:**',
        '· GeckoTerminal: https://www.geckoterminal.com/solana/pools/' + POOL,
        '',
        '⚠️ Check current liquidity on GeckoTerminal — it updates in real time.'
      ].join('\n')
    },
    'proof': {
      title: 'How does proof work?',
      answer: [
        '**€PROOF issuance flow:**',
        '',
        '**Step 1.** Token audited via €AUDT',
        '**Step 2.** Scanner checks:',
        '· Mint/Freeze Authority',
        '· LP Lock status',
        '· Holder Distribution',
        '· Honeypot detection',
        '',
        '**Step 3.** Score 0-100 calculated',
        '**Step 4.** €PROOF certificate issued',
        '**Step 5.** On-chain record published',
        '',
        '**AI agents** read the registry and trust the audited token.'
      ].join('\n')
    },
    'audit': {
      title: 'Want to audit your token?',
      answer: [
        '**Submit your token for audit:**',
        '',
        '**Step 1.** Buy €AUDT',
        '**Step 2.** Pay €AUDT to our address',
        '**Step 3.** Email payment hash + contract address',
        '**Step 4.** Get €PROOF certificate in 24-48h',
        '',
        '**Open full instructions:**',
        '→ https://aviabank.github.io/audt/audit.html',
        '',
        '**Email:** aviabanktoken@gmail.com'
      ].join('\n')
    },
    'ecosystem': {
      title: 'What is AviaTrust?',
      answer: [
        '**AviaTrust — aviation tokenization ecosystem on Solana.**',
        '',
        '**Audit layer:**',
        '· **€AUDT** — Audit Token (working unit)',
        '· **€PROOF** — Proof Token (you are here)',
        '',
        '**Financial layer:**',
        '· **€ESCR** — Escrow',
        '· **€DLCT** — Tokenized Documentary LC',
        '· **€LUMP** — Lump Sum (fixed commission)',
        '',
        '**Aircraft layer:**',
        '€B787 · €A350 · €C929 · €A220 · €E195 · €IL96'
      ].join('\n')
    },
    'risk': {
      title: 'Is €PROOF risky?',
      answer: [
        '**Honest answer: YES.**',
        '',
        '**Known risks:**',
        '· Price volatility',
        '· Liquidity risk',
        '· Smart contract risk',
        '',
        '**What reduces risk:**',
        '· Mint Authority disabled',
        '· Freeze Authority disabled',
        '· Utility token — proof certificate',
        '',
        '⚠️ **Not financial advice.** Only invest what you can afford to lose.'
      ].join('\n')
    }
  };

  var SUGGESTIONS = [
    { key: 'what',      label: '✅ What is €PROOF?' },
    { key: 'proof',     label: '📜 How proof works' },
    { key: 'liquidity', label: '💧 Liquidity' },
    { key: 'audit',     label: '🔍 Submit audit' },
    { key: 'buy',       label: '🛒 How to buy?' },
    { key: 'price',     label: '💰 Price & Target' },
    { key: 'ecosystem', label: '🌍 AviaTrust' },
    { key: 'risk',      label: '⚠️ Is it risky?' }
  ];

  function createUI() {
    var btn = document.createElement('button');
    btn.id = 'avia-btn';
    btn.className = 'avia-btn';
    btn.innerHTML = '<span class="avia-btn-icon">✅</span><span class="avia-btn-label">Avia</span>';
    document.body.appendChild(btn);

    var win = document.createElement('div');
    win.id = 'avia-window';
    win.className = 'avia-window';
    win.innerHTML = [
      '<div class="avia-header">',
      '  <div class="avia-header-left">',
      '    <img src="proof_logo.png" alt="Avia" class="avia-avatar" onerror="this.style.display=\'none\'" />',
      '    <div>',
      '      <div class="avia-name">Avia</div>',
      '      <div class="avia-status">AI assistant · €PROOF</div>',
      '    </div>',
      '  </div>',
      '  <button class="avia-close" id="avia-close">×</button>',
      '</div>',
      '<div class="avia-messages" id="avia-messages"></div>',
      '<div class="avia-suggestions" id="avia-suggestions"></div>',
      '<div class="avia-external">',
      '  <a href="registry.html">📜 Registry</a>',
      '  <a href="https://jup.ag/tokens/' + CONTRACT + '" target="_blank">🔄 Jupiter</a>',
      '  <a href="https://x.com/aviatrust" target="_blank">🐦 X</a>',
      '</div>',
      '<div class="avia-footer">Scripted assistant · Not financial advice</div>'
    ].join('');
    document.body.appendChild(win);

    el('avia-btn').addEventListener('click', toggle);
    el('avia-close').addEventListener('click', toggle);

    addMessage('agent', 'Hi! I am Avia — assistant for €PROOF Proof Token. Pick a topic below.');
    renderSuggestions();
  }

  function renderSuggestions() {
    var box = el('avia-suggestions');
    if (!box) return;
    box.innerHTML = '';
    SUGGESTIONS.forEach(function (item) {
      var b = document.createElement('button');
      b.className = 'avia-suggestion';
      b.textContent = item.label;
      b.addEventListener('click', function () { showAnswer(item.key); });
      box.appendChild(b);
    });
  }

  function addMessage(role, text) {
    var box = el('avia-messages');
    if (!box) return;
    var msg = document.createElement('div');
    msg.className = 'avia-msg avia-msg-' + role;
    var bubble = document.createElement('div');
    bubble.className = 'avia-bubble';
    bubble.innerHTML = formatText(text);
    msg.appendChild(bubble);
    box.appendChild(msg);
    box.scrollTop = box.scrollHeight;
  }

  function formatText(text) {
    var safe = String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    safe = safe.replace(/`([^`]+)`/g, '<code>$1</code>');
    safe = safe.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    safe = safe.replace(/\n/g, '<br />');
    safe = safe.replace(/(https?:\/\/[^\s<]+)/g, '<a href="$1" target="_blank" rel="noopener">$1</a>');
    return safe;
  }

  function showAnswer(key) {
    var item = KB[key];
    if (!item) { addMessage('agent', 'Sorry, no info on that.'); return; }
    addMessage('user', item.title);
    setTimeout(function () { addMessage('agent', item.answer); }, 250);
  }

  function toggle() {
    state.isOpen = !state.isOpen;
    var win = el('avia-window');
    var btn = el('avia-btn');
    if (state.isOpen) { win.classList.add('avia-open'); btn.classList.add('avia-btn-hidden'); }
    else { win.classList.remove('avia-open'); btn.classList.remove('avia-btn-hidden'); }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', createUI);
  else createUI();
})();
