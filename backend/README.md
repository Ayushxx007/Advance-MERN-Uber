# User Registration Endpoint Documentation

## Endpoint

`POST /users/register`

## Description
Registers a new user in the system. Validates input data, hashes the password, and returns an authentication token upon successful registration.

## Request Body
Send a JSON object with the following structure:

```
{
  "fullName": {
    "firstName": "string (min 3 chars, required)",
    "lastName": "string (optional)"
  },
  "email": "string (valid email, required)",
  "password": "string (min 6 chars, strong password, required)"
}
```

### Example
```
{
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "StrongP@ssw0rd"
}
```

## Validation Rules
- `fullName.firstName`: Required, minimum 3 characters
- `fullName.lastName`: Optional, minimum 3 characters if provided
- `email`: Required, must be a valid email format
- `password`: Required, minimum 6 characters, must be strong (at least 1 uppercase, 1 lowercase, 1 number)

## Responses

### Success
- **Status Code:** `201 Created`
- **Body:**
  ```json
  {
    "token": "<JWT token>",
    "user": {
      "_id": "<user id>",
      "fullName": { ... },
      "email": "..."
      // other user fields
    }
  }
  ```

### Validation Error
- **Status Code:** `400 Bad Request`
- **Body:**
  ```json
  {
    "errors": [
      { "msg": "Error message", ... }
    ]
  }
  ```

### Weak Password
- **Status Code:** `200 OK`
- **Body:**
  ```json
  "please type strong password"
  ```

### Registration Failure
- **Status Code:** `400 Bad Request`
- **Body:**
  ```json
  {
    "message": "User registration failed"
  }
  ```

### Server Error
- **Status Code:** `500 Internal Server Error`
- **Body:**
  ```json
  {
    "message": "Error message"
  }
  ```

## Notes
- Passwords are securely hashed before storage.
- The endpoint returns a JWT token for authentication after successful registration.
- All required fields must be present and valid for successful registration.
