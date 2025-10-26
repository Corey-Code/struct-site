const fs = require('fs');
const path = require('path');

module.exports = async function (context, req) {
  try {
    const articlesPath = path.join(__dirname, 'articles.json');
    const articlesData = fs.readFileSync(articlesPath, 'utf8');
    const articles = JSON.parse(articlesData);

    context.res = {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: articles,
    };
  } catch (error) {
    context.log.error('Error reading articles:', error);
    context.res = {
      status: 500,
      body: { error: 'Failed to load articles' },
    };
  }
};
