import { h, Component } from 'preact';
import style from './style.scss';
import PropTypes from 'prop-types';
import { Link } from 'preact-router/match';

export default class MetaContainer extends Component {
  propTypes = {
    meta: PropTypes.object
  };

  render(props) {
    const { meta, showTitle } = props;
    return (
      <div className={style.meta}>
        {showTitle && <h1>{meta.title}</h1>}
        <div className={style.people}>
          <img
            className={style.icon}
            src="/octicons/build/svg/person.svg"
            alt="person"
            role="presentation"
          />

          {meta.people.map((person, j) => (
            <Link
              href={`/search/${encodeURIComponent(person)}`}
              key={`person${j}`}
            >
              {person}
            </Link>
          ))}
        </div>
        <div className={style.tags}>
          {meta.tags.map((tag, i) => (
            <Link
              key={`tag${i}`}
              href={`/search/${encodeURIComponent(tag)}`}
              className={style.tag}
            >
              {tag}
            </Link>
          ))}
        </div>
        <div className="description">{meta.description}</div>
      </div>
    );
  }
}
