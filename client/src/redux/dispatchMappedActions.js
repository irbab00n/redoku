import { bindActionCreators } from 'redux';
import actions from './actions';

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
});

export default mapDispatchToProps;