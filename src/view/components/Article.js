import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Clock } from 'react-feather';

Article.propTypes = {
  title: PropTypes.string.isRequired,
  publishedAt: PropTypes.instanceOf(Date).isRequired,
  link: PropTypes.string.isRequired,
  // type: PropTypes.string.isRequired,
  favicon: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default function Article({
  title,
  publishedAt,
  link,
  favicon,
  type,
}) {
  return (
    <div className="article">
      <div className="media">
        <img className="favicon" src={favicon} alt={type} />
      </div>
      <div>
        <a href={link}>{title}</a>
        <p className="info"><Clock size={12} /> {moment(publishedAt).fromNow()}</p>
      </div>
    </div>
  );
}
