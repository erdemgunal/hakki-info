export const consoleArtScript = `
    console.log('%c👋 Merhaba! meraklı arkadaş!', 'color: #10b981; font-size: 16px; font-weight: bold;');
    console.log('%c🚀 Eğer bu siteyi beğendiysen, benimle çalışmak ister misin?', 'color: #8b5cf6; font-size: 14px;');
    console.log('%c💼 Hire me! => https://www.linkedin.com/in/hakkierdem/', 'color: #f59e0b; font-size: 14px; font-weight: bold;');
    console.log('');
    console.log('%c💡 Psst... try %cwindow.__hakki.help()%c in the console', 'color: #6b7280; font-size: 11px; font-style: italic;', 'color: #818cf8; font-size: 11px; font-weight: bold; font-style: normal;', 'color: #6b7280; font-size: 11px; font-style: italic;');

    window.__hakki = {
        help: function() {
            console.log('%c🕹️  window.__hakki — secret dev API', 'color: #10b981; font-size: 14px; font-weight: bold;');
            console.log('%c──────────────────────────────────', 'color: #374151;');
            console.log('%c  .help()    %c→ show this message', 'color: #818cf8; font-weight: bold; font-family: monospace;', 'color: #9ca3af;');
            console.log('%c  .party()   %c→ 🎉 trigger party mode', 'color: #818cf8; font-weight: bold; font-family: monospace;', 'color: #9ca3af;');
            console.log('%c  .hire()    %c→ why you should hire me', 'color: #818cf8; font-weight: bold; font-family: monospace;', 'color: #9ca3af;');
            console.log('%c  .skills()  %c→ print my top skills', 'color: #818cf8; font-weight: bold; font-family: monospace;', 'color: #9ca3af;');
            console.log('%c  .konami()  %c→ hint for a secret', 'color: #818cf8; font-weight: bold; font-family: monospace;', 'color: #9ca3af;');
        },
        party: function() {
            console.log('%c🎊 Releasing the confetti...', 'color: #f97316; font-size: 13px; font-weight: bold;');
            window.dispatchEvent(new CustomEvent('hakki:party'));
        },
        hire: function() {
            console.log('%c💼 Why hire Hakkı Erdem?', 'color: #f59e0b; font-size: 15px; font-weight: bold;');
            console.log('%c──────────────────────────────────', 'color: #374151;');
            console.log('%c  ✅  Full-stack developer who ships', 'color: #10b981; font-size: 12px;');
            console.log('%c  ✅  Turns coffee into clean code', 'color: #10b981; font-size: 12px;');
            console.log('%c  ✅  Writes easter eggs into his own portfolio', 'color: #10b981; font-size: 12px;');
            console.log('%c  ✅  Found by curious devs like you', 'color: #10b981; font-size: 12px;');
            console.log('');
            console.log('%c🔗 https://www.linkedin.com/in/hakkierdem/', 'color: #f59e0b; font-size: 13px; font-weight: bold;');
        },
        skills: function() {
            console.log('%c🛠️  Top Skills', 'color: #10b981; font-size: 15px; font-weight: bold;');
            console.log('%c──────────────────────────────────', 'color: #374151;');
            var skills = [
                ['TypeScript',       95],
                ['React / Next.js',  92],
                ['Node.js',          85],
                ['Python',           78],
                ['Docker / DevOps',  72],
                ['Data Analysis',    80],
            ];
            skills.forEach(function(s) {
                var name = s[0];
                var pct  = s[1];
                var filled = Math.round(pct / 10);
                var bar = '█'.repeat(filled) + '░'.repeat(10 - filled);
                console.log(
                    '%c  ' + (name + '          ').slice(0, 18) + ' %c' + bar + '%c ' + pct + '%',
                    'color: #9ca3af; font-family: monospace; font-size: 12px;',
                    'color: #818cf8; font-family: monospace; font-size: 12px;',
                    'color: #6b7280; font-family: monospace; font-size: 12px;'
                );
            });
        },
        konami: function() {
            console.log('%c🕹️  Hint:', 'color: #f59e0b; font-size: 13px; font-weight: bold;');
            console.log('%c  Try typing this on your keyboard:', 'color: #9ca3af; font-size: 12px;');
            console.log('%c  ↑  ↑  ↓  ↓  ←  →  ←  →  B  A', 'color: #818cf8; font-size: 14px; font-weight: bold; font-family: monospace; letter-spacing: 4px;');
        },
    };
`;
