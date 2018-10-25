import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import ComponentAuthorization from '../../../../lib/ComponentAuthorization';
import { operations } from '../../../../config/operation-config';

const CAN_USER_CREATE_USER_GROUPS = gql`
  query CanUserCreateUserGroups {
      user {
          canCreateUserGroups
      }
  }
`;

const UserGroupPageHeader = ({ onCreateUserGroup }) =>
  <Query query={CAN_USER_CREATE_USER_GROUPS}>
    {({ loading, error, data }) => {
      if (loading) {
        return <div>Loading...</div>
      }

      if (error) {
        console.log(`Something went wrong: ${error}`);

        return null;
      }

      return (
        <div>
          {data.user.canCreateUserGroups &&
            <button onClick={onCreateUserGroup}>Create User Group</button>
          }
        </div>
      )
    }}
  </Query>


export UserGroupPageHeader;



