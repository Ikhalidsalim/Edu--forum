document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('.sidebar-nav a[data-fragment]');
    const main = document.getElementById('main-content');

    async function loadFragment(fragment) {
        if (!main) return;
        try {
            const res = await fetch(fragment, { cache: 'no-store' });
            if (!res.ok) throw new Error(res.status + ' ' + res.statusText);
            const html = await res.text();
            main.innerHTML = html;
            window.scrollTo(0, 0);
        } catch (err) {
            main.innerHTML = `<div class="error">Failed to load content: ${err.message}</div>`;
        }
    }

    links.forEach(a => {
        a.addEventListener('click', (e) => {
            e.preventDefault();
            links.forEach(l => l.classList.remove('active'));
            a.classList.add('active');
            const frag = a.dataset.fragment;
            if (frag) loadFragment(frag);
        });
    });

    // Load the first fragment by default (Announcement)
    const first = document.querySelector('.sidebar-nav a[data-fragment]');
    if (first) first.click();
});

