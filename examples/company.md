# Company Module Documentation

## Routes

| Method | Endpoint              | Description                                   |
| :----- | :-------------------- | :-------------------------------------------- |
| POST   | `/company`            | Create a new company                          |
| GET    | `/company`            | Get all companies                             |
| GET    | `/company/:id`        | Get company by ID                             |
| GET    | `/company/slug/:slug` | Get company by slug                           |
| GET    | `/company/:username`  | Get company by username                       |
| PUT    | `/company/update/:id` | Update company details (supports logo upload) |
| DELETE | `/company/:id`        | Delete company                                |

## JSON Examples

### Create Company

```json
{
  "name": "TechCorp Solutions",
  "email": "contact@techcorp.com",
  "username": "techcorp",
  "companyType": "507f1f77bcf86cd799439011",
  "location": "San Francisco, CA",
  "employee_len": "100-500",
  "password": "CompanyPass123!"
}
```

### Create Company Type

**Endpoint:** `POST /company` (handled internally or via specific route if implemented)

```json
{
  "label": "Technology"
}
```

**Other Company Types:**

- Healthcare
- Finance
- Education
- E-commerce
- Manufacturing

### Company Object Structure

```json
{
  "_id": "507f1f77bcf86cd799439012",
  "name": "TechCorp Solutions",
  "email": "contact@techcorp.com",
  "username": "techcorp",
  "logo": "https://res.cloudinary.com/demo/image/upload/v1234567890/logos/techcorp.png",
  "companyType": "507f1f77bcf86cd799439011",
  "location": "San Francisco, CA",
  "employee_len": "100-500",
  "password_hash": "$2b$10$abcdefghijklmnopqrstuvwxyz123456789",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```
