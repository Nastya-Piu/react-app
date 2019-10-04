import React from 'react';
import { connect } from 'react-redux';

class UserHeader extends React.Component {

  render() {
    // const user = this.props.users.find(user => user.id === this.props.userId);
    if(this.props.user) {
      return (
        <div><i>{this.props.user.name}</i></div>
      );
    }

    return <div className="ui active inline loader"></div>;

  };

}

const mapStateToProps = (state, ownProps) => {
  return { user: state.users.find(user => user.id === ownProps.userId)};
}

export default connect(mapStateToProps)(UserHeader);

