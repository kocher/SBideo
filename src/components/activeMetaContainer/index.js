import { h, Component } from 'preact';
import { connect } from 'redux-zero/preact';
import Meta from '../../components/meta';
import MetaEditable from '../../components/metaEditable';
import PropTypes from 'prop-types';

export class ActiveMetaContainer extends Component {
  static propTypes = {
    activeVideo: PropTypes.object,
    editMode: PropTypes.bool
  };

  render(props) {
    const meta = props.activeVideo.meta;
    if (meta && Object.keys(meta).length > 0) {
      return (
        <div className={props.className}>
          {props.editMode ? (
            <MetaEditable
              meta={meta}
              src={props.activeVideo.src}
              showTitle="true"
              onSave={this.onSave}
            />
          ) : (
            <Meta meta={meta} showTitle="true" />
          )}
        </div>
      );
    } else {
      return (
        <div className={props.className}>
          <h1>Welcome to SBideo!</h1>
          <p>Just search and select a video below.</p>
        </div>
      );
    }
  }
}

const mapStateToProps = ({ activeVideo, editMode }) => ({
  activeVideo,
  editMode
});

export default connect(mapStateToProps)(ActiveMetaContainer);
