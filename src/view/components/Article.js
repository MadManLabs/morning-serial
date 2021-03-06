import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import moment from 'moment';
import 'moment-timezone';
import { Clock } from 'react-feather';
import url from 'url-parse';
import { AllHtmlEntities } from 'html-entities';

const entities = new AllHtmlEntities();

Article.propTypes = {
  title: PropTypes.string.isRequired,
  publishedAt: PropTypes.oneOfType([
    PropTypes.instanceOf(Date),
    PropTypes.string,
  ]).isRequired,
  link: PropTypes.string.isRequired,
  // type: PropTypes.string.isRequired,
  favicon: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  commentsID: PropTypes.number,
};

Article.defaultProps = {
  // Source doesnt support commentsID
  commentsID: -1,
};

export default function Article({
  title,
  publishedAt,
  link,
  favicon,
  type,
  commentsID,
}) {
  const { hostname, href } = url(link);
  const hasComments = (type === 'hacker-news' && commentsID !== -1);
  // Massage the date string here because client & server render `publishedAt`
  // differently when placed under the time[title] attribute
  return (
    <div className="article">
      <div className="article__media">
        <img className="favicon" src={favicon} alt={type} title={type} />
      </div>
      <div className="article__details">
        <a className="article__link" href={href} target="_blank" rel="noreferrer noopener">
          {entities.decode(title)}
        </a>
        &ensp;
        <a href={`//${hostname}`} className="article__hostname">
          {hostname}
        </a>
        <p className="article__info">
          <Clock size={12} aria-hidden="true" /> &nbsp;
          <Moment
            className="article__publish-date"
            title={moment(publishedAt).tz("America/Toronto").toString()}
            element="span"
            fromNow
            tz="America/Toronto"
          >
            {publishedAt}
          </Moment>
          &nbsp; &nbsp;
          {hasComments &&
            <a href={`https://news.ycombinator.com/item?id=${commentsID}`}>
              Comments
            </a>
          }
        </p>
      </div>
    </div>
  );
}
