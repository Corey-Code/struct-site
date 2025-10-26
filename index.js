// Submits a contact request.
function submit() {
  // Get all the data.
  let first = document.getElementById('first');
  let last = document.getElementById('last');
  let phone = document.getElementById('phone');
  let email = document.getElementById('email');
  let message = document.getElementById('message');

  if (!first || !last || !phone || !email || !message) {
    return;
  }

  if (!phone.value || !email.value || !message.value) {
    return;
  }

  fetch('api/contact', {
    body: JSON.stringify({
      first: first.value,
      last: last.value,
      phone: phone.value,
      email: email.value,
      message: message.value,
    }),
    method: 'POST',
  })
    .then((x) => {
      return;
    })
    .catch((err) => {
      console.log(err);
      return;
    })
    .finally(() => {
      first.value = '';
      last.value = '';
      phone.value = '';
      email.value = '';
      message.value = '';
      window.scroll({
        top: -10000,
        behavior: 'smooth',
      });
    });
}

let collapsed = true;
function moveDrawer() {
  // Find the drawer.
  let drawer = document.getElementById('menu-drawer');
  if (!drawer) {
    return;
  }

  // Swap the collapsed value.
  collapsed = !collapsed;

  // Set the classes appropriately.
  drawer.className = collapsed ? 'menu-drawer' : 'menu-drawer expanded';
}

function scrollToElement(id) {
  // Find the element.
  const element = document.getElementById(id);
  if (!element) {
    return;
  }

  // If window.scroll is available, use that.
  if (window.scroll) {
    const y = element.getBoundingClientRect().top + window.scrollY;
    window.scroll({
      top: y,
      behavior: 'smooth',
    });

    return;
  }

  // If element.scrollIntoView is not available, then do nothing.
  if (!element.scrollIntoView) {
    return;
  }

  element.scrollIntoView();
}

async function loadArticles() {
  try {
    const response = await fetch('api/articles');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const articles = await response.json();
    return articles;
  } catch (err) {
    console.error('Failed to fetch articles:', err);

    // Temporary fallback articles.
    return [
      {
        title: 'Is Cursor Chasing Jr. Developers?',
        link: '',
        description:
          'The rise of AI-assisted coding tools like Cursor has sparked an interesting debate:\nare they empowering junior developers — or quietly replacing them?\nCursor’s promise of “instant code understanding” and AI pair-programming can feel\nrevolutionary. But beneath the surface',
      },
      {
        title: 'When To Refactor vs. Rewrite',
        link: '',
        description:
          'Every engineering team faces the same crossroads: refactor the old system—or rewrite it from scratch?\nThe right call depends on risk, timeline, and the true cost of complexity.\nWe break down a pragmatic checklist to decide with confidence and avoid costly detours.',
      },
      {
        title: 'Shipping Faster Without Breaking Things',
        link: '',
        description:
          'Speed and stability aren’t enemies.\nWith the right guardrails—feature flags, trunk-based development, and contract testing—teams can move quickly and safely.\nHere’s how high-performing teams ship continuously without turning every release into a fire drill.',
      },
    ];
  }
}

// Load and render articles
async function renderArticles() {
  const container = document.getElementById('articles-grid-row');
  if (!container) return;

  /** @type {{title: string, link: string, description: string}[]} */
  let articles = await loadArticles();
  container.innerHTML = '';

  articles.forEach((article, index) => {
    // create card wrapper
    const card = document.createElement('div');
    card.className = 'article-card fade-bottom';

    // title
    const title = document.createElement('div');
    title.className = 'article-card-title';
    title.textContent = article?.title || `Article ${index + 1}`;

    // description
    const desc = document.createElement('p');
    desc.className = 'article-card-desc';
    desc.textContent = article?.description?.trim() || '';

    // full article link
    const link = document.createElement('a');
    link.className = 'full-article-link';
    link.href = article?.link || '#';
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.innerHTML = `
      Full Article
      <svg class="icon" xmlns="http://www.w3.org/2000/svg" width="14" height="14"
           viewBox="0 0 24 24" fill="none" stroke="currentColor"
           stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M18 13v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
        <polyline points="15 3 21 3 21 9"/>
        <line x1="10" y1="14" x2="21" y2="3"/>
      </svg>
    `;

    // assemble
    card.appendChild(title);
    card.appendChild(desc);
    card.appendChild(link);
    container.appendChild(card);
  });
}

if (document && document.addEventListener) {
  document.addEventListener('DOMContentLoaded', () => {
    renderArticles();
  });
}
