## Object

|URL | METHOD | COMMENT |
|---|---|---|
| /api/classes | GET | get all objects of this class |
| /api/classes/ID | GET | get a single object |
| /api/classes/ID/subclass | GET | get subresources of a single object |
| /api/classes | POST | create a new object |
| /api/classes/ID | PUT | update an object |
| /api/classes/ID | DELTE | delete an object |

## User

|URL | METHOD | COMMENT |
|---|---|---|
| /api/users/ID/trips | GET | get all trips of a single user |
| /api/users/ID/messages | GET | get all messages of a single user |
| /api/users/ID/vehiecles | GET | get all vehiecles of a single user |
| /api/users/ID/queries | GET | get all queries of a single user |
| /api/users/me | GET | get the profile of the current user|
| /api/users/ID/password | PUT | change the password of the current user|

## Trip

|URL | METHOD | COMMENT |
|---|---|---|
| /api/trips/ID/driver | GET | get the driver of a trip|
| /api/trips/ID/passengers | GET | get all passengers of a trip |
| /api/trips/ID/passengers | POST | add a passenger to a trip |
| /api/trips/ID/passengers | DELETE | delete a passenger from a trip |

####POST /api/trips/ID/passengers

**payload**
```
{
  "passengerID": ID
}
```
