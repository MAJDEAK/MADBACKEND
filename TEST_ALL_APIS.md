# 🧪 COMPLETE API TESTING GUIDE

## After fixing database and environment variables, test these:

### 1. Test Base Server
```
GET https://madbackend2.onrender.com
Expected: {"message":"E-Library API Server"}
```

### 2. Test Authentication APIs

#### Login Test:
```bash
curl -X POST "https://madbackend2.onrender.com/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```
**Expected Response:**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "admin",
    "fname": "Admin",
    "lname": "User",
    "isAdmin": true
  }
}
```

#### Register Test:
```bash
curl -X POST "https://madbackend2.onrender.com/api/auth/register" \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"test123","fname":"Test","lname":"User"}'
```

### 3. Test Publishers API (with token)

#### Get All Publishers:
```bash
curl -X GET "https://madbackend2.onrender.com/api/publishers" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```
**Expected Response:**
```json
[
  {"Id": 1, "PName": "Dar Al Shorouk", "City": "Cairo"},
  {"Id": 2, "PName": "Lebanon Publishers", "City": "Beirut"},
  ...
]
```

#### Create Publisher:
```bash
curl -X POST "https://madbackend2.onrender.com/api/publishers" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{"pname":"Test Publisher","city":"Test City"}'
```

### 4. Test Authors API

#### Get All Authors:
```bash
curl -X GET "https://madbackend2.onrender.com/api/authors" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

#### Create Author:
```bash
curl -X POST "https://madbackend2.onrender.com/api/authors" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{"fname":"Test","lname":"Author","country":"Test Country","city":"Test City","address":"Test Address"}'
```

### 5. Test Books API

#### Get All Books:
```bash
curl -X GET "https://madbackend2.onrender.com/api/books" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

#### Create Book:
```bash
curl -X POST "https://madbackend2.onrender.com/api/books" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{"title":"Test Book","type":"Novel","price":25.00,"pubId":1,"authorId":1}'
```

### 6. Test Search API

#### Search Books:
```bash
curl -X GET "https://madbackend2.onrender.com/api/search?q=Palace" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## PowerShell Testing Commands:

### Login:
```powershell
$response = Invoke-RestMethod -Uri "https://madbackend2.onrender.com/api/auth/login" -Method POST -ContentType "application/json" -Body '{"username":"admin","password":"admin123"}'
$token = $response.token
Write-Host "Token: $token"
```

### Test Publishers:
```powershell
$headers = @{ Authorization = "Bearer $token" }
Invoke-RestMethod -Uri "https://madbackend2.onrender.com/api/publishers" -Headers $headers
```

### Test Authors:
```powershell
Invoke-RestMethod -Uri "https://madbackend2.onrender.com/api/authors" -Headers $headers
```

### Test Books:
```powershell
Invoke-RestMethod -Uri "https://madbackend2.onrender.com/api/books" -Headers $headers
```

## Success Indicators:

✅ **All APIs Working:**
- Login returns token
- Publishers return array of publishers
- Authors return array of authors  
- Books return array of books
- Search returns filtered results
- Create operations return success messages

❌ **Common Issues:**
- 500 Error: Database not set up correctly
- 401 Error: Missing or invalid token
- 404 Error: Endpoint not found
- CORS Error: Frontend domain not allowed

## Database Verification:

**Run this in phpMyAdmin to verify data:**
```sql
SELECT COUNT(*) as Users FROM `Users`;
SELECT COUNT(*) as Authors FROM `Author`;
SELECT COUNT(*) as Publishers FROM `Publisher`;
SELECT COUNT(*) as Books FROM `Book`;
SELECT * FROM `Users` WHERE `Username` = 'admin';
```

**Expected Results:**
- Users: 2
- Authors: 5
- Publishers: 5
- Books: 10
- Admin user exists with correct password hash
