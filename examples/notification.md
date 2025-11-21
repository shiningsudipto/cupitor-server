# Notification Module Documentation

## Routes

| Method | Endpoint                              | Description                               |
| :----- | :------------------------------------ | :---------------------------------------- |
| POST   | `/notification`                       | Create a new notification                 |
| GET    | `/notification`                       | Get all notifications                     |
| GET    | `/notification/:id`                   | Get notification by ID                    |
| GET    | `/notification/user/:userId`          | Get notifications for a user              |
| GET    | `/notification/user/:userId/unread`   | Get unread notifications for a user       |
| PUT    | `/notification/:id/read`              | Mark notification as read                 |
| PUT    | `/notification/user/:userId/read-all` | Mark all notifications as read for a user |
| DELETE | `/notification/:id`                   | Delete a notification                     |

## JSON Examples

### Create Notification

```json
{
  "userId": "507f1f77bcf86cd799439013",
  "userType": "candidate",
  "title": "Application Received",
  "message": "Your application for Senior Full Stack Developer at TechCorp Solutions has been received and is under review.",
  "type": "application",
  "relatedId": "507f1f77bcf86cd799439016"
}
```

**User Type Options:**

- "candidate"
- "company"

**Notification Type Options:**

- "application"
- "job"
- "review"
- "general"

### Mark as Read

```json
{
  "isRead": true
}
```

### Notification Object Structure

```json
{
  "_id": "507f1f77bcf86cd799439019",
  "userId": "507f1f77bcf86cd799439013",
  "userType": "candidate",
  "title": "Application Received",
  "message": "Your application for Senior Full Stack Developer at TechCorp Solutions has been received and is under review.",
  "type": "application",
  "isRead": false,
  "relatedId": "507f1f77bcf86cd799439016",
  "createdAt": "2024-01-25T14:31:00.000Z",
  "updatedAt": "2024-01-25T14:31:00.000Z"
}
```
