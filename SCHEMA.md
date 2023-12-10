# Schema

## User Schema

```jsonc
{
  
    "username": "string" , // unique
    "first name": "string",
    "last name": "string",
    "birthdate": "date",
    "gender": "string", // enum
    "city": "string",
    "address": "string", 
    "email": "string", 
    "password": "string",
    "role": "string", // enum
    "photo": "string",
    "passwordConfirm": "string",
    "passwordChangedAt": "date",
}
```

## match Schema

```jsonc
{
"homeTeam": "string",  // to be changed to team id
"awayTeam": "string",  // to be changed to team id
"staduim": "string",   // to be changed to staduim id
"date": "date",
"price": "number",
"referee": "string",   // to be changed to referee id
"linesman1": "string", // to be changed to referee id
"linesman2": "string", // to be changed to referee id
"tickets": ["id"],  // to be changed to ticket id
}
```
<!-- /match/id [1,2,10] -->
## staduim Schema

```jsonc
{
"name": "string", // unique
"location": "string", // to be changed to geo location
"capacity": "number", 
"image": "string", // to be removed
}
```

## team Schema

```jsonc
{
"name": "string", // unique
"image": "string",  
}
```

## referee Schema

```jsonc
{
"name": "string", // unique
"role": "string", // enum
}
```

## ticket Schema

```jsonc
{
"match": "string", // to be changed to match id
"user": "string", // to be changed to user id
"seat": "number", // unique
}
```
