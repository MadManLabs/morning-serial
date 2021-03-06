import React from 'react';
import PropTypes from 'prop-types';
import Article from './Article';

Listing.propTypes = {
  latestArticles: PropTypes.arrayOf(
    PropTypes.shape({
      link: PropTypes.string.isRequired,
      publishedAt: PropTypes.oneOfType([
        PropTypes.instanceOf(Date),
        PropTypes.string,
      ]),
      title: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      uuid: PropTypes.string.isRequired,
    }),
  ).isRequired,
  getFavicon: PropTypes.func.isRequired,
};

export default function Listing({ latestArticles, getFavicon }) {
  const articles = latestArticles.map(article => {
    const favicon = getFavicon(article.type);
    return (
      <Article
        key={article.uuid}
        favicon={favicon}
        {...article}
      />
    );
  });
  return (
    <main
      className="listing"
      aria-live="polite"
      aria-relevant="additions"
    >
      { articles }
    </main>
  );
}
