## DOES QCLOUD NEED GRAPHQL?

Thoughts after the Apollo spike

---
PAINS WITH REDUX


- Complexity
- Boilerplate
- Indirection
---
PAINS WITH ~~REDUX~~ REST


- Complexity
- Boilerplate
- **Indirection**
---
![current](images/current_page_header_component.png)


Should `UserGroupsPageHeader` display 
the Create User Group button?

---

THE BUSINESS RULE

The Create User Group button should be displayed if the current user is allowed to create user groups.


WHAT THE CLIENT WANTS TO ASK THE SERVER

Is the current user allowed to create user groups?

---
WHAT ACTUALLY HAPPENS

`UserContainer` requests the current user from the server...

---
```json
{
  "allowedOperations": [
    "review_sheets",
    "user_management"
  ],
  "companyId": 1,
  "companyName": "Nulogy",
  "confirmed": true,
  "createdAt": "2017-08-16T03:15:20.821+05:30",
  "email": "qcloudmanager@nulogy.com",
  "id": 2,
  "name": "QCloud Manager",
  "role": "manager",
  "timeZone": "Sri Jayawardenepura",
  "updatedAt": "2018-10-25T00:50:45.250+05:30",
  "userGroupId": 6
}
```
---
- `UserContainer` passes `currentUser` to `UserGroupPageHeader`
- `UserGroupPageHeader` gets the User Group Management operation from the operation config file
- `UserGroupPageHeader` passes `currentUser`and the operation to `ComponentAuthorization`
---
- `ComponentAuthorization` passes `currentUser`and the operation to `StandardPolicy`
- `StandardPolicy` iterates through `user.allowedOperations` and authorizes the component
if `allowedOperations` contains the operation
- `StandardPolicy` checks `user.role` and authorizes the component if 
contains the User Group Management operation or if `currentUser` has the administrator role
---
`ComponentAuthorization` displays the button if authorized and hides it if not.

---
```json
{
  "allowedOperations": [
    "review_sheets",
    "user_management"
  ],
  "companyId": 1,
  "companyName": "Nulogy",
  "confirmed": true,
  "createdAt": "2017-08-16T03:15:20.821+05:30",
  "email": "qcloudmanager@nulogy.com",
  "id": 2,
  "name": "QCloud Manager",
  "role": "manager",
  "timeZone": "Sri Jayawardenepura",
  "updatedAt": "2018-10-25T00:50:45.250+05:30",
  "userGroupId": 6
}
```
@[2-5, 16]
---






