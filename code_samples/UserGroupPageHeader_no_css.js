import React from 'react';
import PropTypes from 'prop-types';

import ComponentAuthorization from '../../../../lib/ComponentAuthorization';
import { operations } from '../../../../config/operation-config';

const UserGroupPageHeader = ({ onCreateUserGroup, currentUser }) =>
  <div>
    <div>
      <h1>User Groups</h1>
    </div>
    <div>
      <ComponentAuthorization user={currentUser} operations={[operations.USER_GROUP_MANAGEMENT]} >
        <button onClick={onCreateUserGroup}>Create User Group</button>
      </ComponentAuthorization>
    </div>
  </div>;

UserGroupPageHeader.propTypes = {
  onCreateUserGroup: PropTypes.func.isRequired,
  currentUser: PropTypes.object.isRequired
};

export default UserGroupPageHeader;