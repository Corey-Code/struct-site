// Submits a contact request.
function submit() {
  // Get all the data.
  let first = document.getElementById("first");
  let last = document.getElementById("last");
  let phone = document.getElementById("phone");
  let email = document.getElementById("email");
  let message = document.getElementById("message");

  if (!first || !last || !phone || !email || !message) {
    return;
  }

  if (!phone.value || !email.value || !message.value) {
    return;
  }

  fetch("api/contact", {
    body: JSON.stringify({
      first: first.value,
      last: last.value,
      phone: phone.value,
      email: email.value,
      message: message.value
    }),
    method: "POST"
  }).then(x => {
    return;
  }).catch(err => {
    console.log(err);
    return;
  }).finally(() => {
    first.value = "";
    last.value = "";
    phone.value = "";
    email.value = "";
    message.value = "";
    window.scroll({
      top: -10000,
      behavior: 'smooth'
    });
  });
}

let collapsed = true;
function moveDrawer() {
  // Find the drawer.
  let drawer = document.getElementById("menu-drawer");
  if (!drawer) {
    return;
  }

  // Swap the collapsed value.
  collapsed = !collapsed;

  // Set the classes appropriately.
  drawer.className = collapsed ? "menu-drawer" : "menu-drawer expanded";
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
      behavior: 'smooth'
    });

    return;
  }

  // If element.scrollIntoView is not available, then do nothing.
  if (!element.scrollIntoView) {
    return;
  }

  element.scrollIntoView();
}

// Load and render articles from YAML into the Articles section
async function renderArticlesFromYaml() {
  const container = document.getElementById("articles-grid-row");
  if (!container) {
    return;
  }

  /** @type {{title: string, description: string}[]} */
  let articles = [];

  try {
    const response = await fetch("./_data/articles.yml", { cache: "no-store" });
    if (response && response.ok) {
      const yamlText = await response.text();
      const parsed = (window.jsyaml && window.jsyaml.load) ? window.jsyaml.load(yamlText) : [];
      if (Array.isArray(parsed)) {
        articles = parsed.slice(0, 3);
      }
    }
  } catch (err) {
    console.log("Failed to load ./_data/articles.yml", err);
  }

  if (!articles || articles.length === 0) {
    articles = [
      { title: "Article 1", description: "Coming soon." },
      { title: "Article 2", description: "Coming soon." },
      { title: "Article 3", description: "Coming soon." }
    ];
  }

  container.innerHTML = "";

  articles.forEach((article, index) => {
    const anchor = document.createElement("a");
    anchor.className = "article-card";
    anchor.href = `REPLACE_ARTICLE_LINK_${index + 1}`;
    anchor.target = "_blank";
    anchor.rel = "noopener";

    const title = document.createElement("div");
    title.className = "article-card-title";
    title.textContent = (article && article.title) ? article.title : `Article ${index + 1}`;

    const desc = document.createElement("div");
    desc.className = "article-card-desc";
    const descriptionText = (article && article.description) ? String(article.description).trim() : "";
    desc.textContent = descriptionText;

    anchor.appendChild(title);
    anchor.appendChild(desc);
    container.appendChild(anchor);
  });
}

if (document && document.addEventListener) {
  document.addEventListener("DOMContentLoaded", () => {
    renderArticlesFromYaml();
  });
}