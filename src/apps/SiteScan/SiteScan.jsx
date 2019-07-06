import React, { Component } from 'react'
import PropTypes from "prop-types";
import withAuthorization from '../../shared/firebase/withAuthorization'
import * as ROLES from '../../shared/constants/roles'
import { compose } from "recompose";
import { withFirebase } from '../../shared/firebase'
class SiteScan extends Component {

    render() {
        return (
            <div>
                <h2>Site Scan!!</h2>
                <div>
                    Authorized users only!!!
                </div>
            </div>
        )
    }
}

SiteScan.propTypes = {
    store: PropTypes.object
}

const condition = authUser => authUser && !!authUser.roles[ROLES.ADMIN];;

export default compose(
    withAuthorization(condition),
    withFirebase,
)(SiteScan);

// export default compose(
//     withAuthorization(condition)
// )(SiteScan);

// export default withAuthorization(condition)(SiteScan);
// export default SiteScan
