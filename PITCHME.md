# Does QCloud need GraphQL?

Thoughts after the Apollo spike

---

### Pains with Redux

- Complexity
- Boilerplate
- Indirection

---

### Pains with ~~Redux~~ REST

- Complexity
- Boilerplate
- **Indirection**

---

```javascript
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
```

### The client wants to know
- Should I display the Create User Group button?

### The business rule
- The Create User Group button should be displayed if the current user is allowed to create user groups.

### The client needs to ask the server
- Is the current user allowed to create user groups?

---

### What actually happens
- `UserContainer` requests the current user from the server
- Server response:
```json
{
  "user": {
    "id": 1,
    "name": "Barb",
    "email": "barb@test.com",
    "userGroupId": 30,
    // ... a bunch of other crap
    "allowedOperations": [...]
  }
}
```

---

- `UserContainer` passes `currentUser` to `UserGroupPageHeader`
- `UserGroupPageHeader` gets the User Group Management operation from the operation config file
- `UserGroupPageHeader` passes `currentUser`and the operation to `ComponentAuthorization`
- `ComponentAuthorization` passes `currentUser`and the operation to `StandardPolicy`
- `StandardPolicy` iterates through `user.allowedOperations` and authorizes the component
if `allowedOperations` contains the operation
- `StandardPolicy` checks `user.role` and authorizes the component if 
contains the User Group Management operation or if `currentUser` has the administrator role
- ComponentAuthorization: if authorized, display the button; if not, hide it.

