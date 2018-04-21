import { h, Component } from 'preact';
import style from './style.scss';
import { connect } from 'unistore/preact';
import PropTypes from 'prop-types';
import actions from './actions';
import ShareLink from '../shareLink';

export class VideoPlayer extends Component {
  state = {
    isPaused: false
  };

  propTypes = {
    setActiveVideoTime: PropTypes.func,
    activeVideo: PropTypes.object.isRequired
  };

  setTimestamp = event => {
    const currentTime = Math.floor(event.target.currentTime);
    this.props.setActiveVideoTime(
      this.calculateTimestamp(currentTime),
      currentTime
    );
  };

  onPlay = () => {
    this.setState({ isPaused: false });
  };

  onPause = () => {
    this.setState({ isPaused: true });
  };

  /**
   * Get the start timestamp from seconds
   * e.g. 14m44s to 884
   *
   * @param {integer} time in seconds, e.g. 884
   */
  calculateTimestamp(time) {
    const secondsNumber = parseInt(time, 10);
    const hours = Math.floor(secondsNumber / 3600);
    const minutes = Math.floor((secondsNumber - hours * 3600) / 60);
    const seconds = secondsNumber - hours * 3600 - minutes * 60;

    let timestamp = '';
    if (hours > 0) {
      timestamp += `${hours}h`;
    }
    if (minutes > 0) {
      timestamp += `${minutes}m`;
    }
    if (seconds > 0) {
      timestamp += `${seconds}s`;
    }
    return timestamp;
  }

  /**
   * Sets the current time for a video, in this case the start time
   * It takes a time string like "1m21s" and converts it to an integer, e.g. 81
   *
   * @param {string} startTimestamp in youtube time format, e.g. 14m44s
   */
  get startTime() {
    if (!this.props.activeVideo.startTimestamp) {
      return '0s';
    }
    const match = this.props.activeVideo.startTimestamp.match(
      /(\d+h)?(\d+m)?(\d+s)?/i
    );

    const matches = match.slice(1).map(function(x) {
      if (x != null) {
        return x.replace(/\D/, '');
      }
    });

    const hours = parseInt(matches[0]) || 0;
    const minutes = parseInt(matches[1]) || 0;
    const seconds = parseInt(matches[2]) || 0;

    return hours * 3600 + minutes * 60 + seconds;
  }

  handleMouseEnter = () => {
    this.setState({ mouseOver: true });
  };

  handleMouseLeave = () => {
    this.setState({ mouseOver: false });
  };

  render(props) {
    const bgImageStyle = `background-image: url(${
      process.env.ASSET_PATH
    }FuBK_testcard_vectorized.svg)`;
    return (
      <div className={props.className}>
        <div className={style.sizer}>
          {props.activeVideo.src ? (
            <video
              className={style.video}
              controls
              autoPlay
              src={props.activeVideo.src}
              style={bgImageStyle}
              currentTime={this.startTime}
              onTimeUpdate={this.setTimestamp}
              onPause={this.onPause}
              onPlay={this.onPlay}
            />
          ) : (
            <div className={style.poster} style={bgImageStyle} />
          )}

          {props.activeVideo.src && (
            <ShareLink
              show={this.state.isPaused && props.activeVideo.currentTime > 0}
              className={style.shareButton}
            />
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ activeVideo }) => ({ activeVideo });

export default connect(mapStateToProps, actions)(VideoPlayer);
