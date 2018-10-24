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

---

### What the client wants to know:
- Is the current user allowed to manage user groups?

---

### What the client needs to do:
- UserContainer: get the current user from the server:
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
- UserContainer: pass `currentUser` to UserGroupPageHeader
- UserGroupPageHeader: get the User Group Management operation from the operation config file
- UserGroupPageHeader: pass `currentUser`and the operation to ComponentAuthorization
- ComponentAuthorization: pass `currentUser`and operation to StandardPolicy
- StandardPolicy: Iterate through `user.allowedOperations` and check `user.role`; authorize if `allowedOperations`
contains the User Group Management operation or if `currentUser` has the administrator role
- ComponentAuthorization: if authorized, display the button; if not, hide it.

