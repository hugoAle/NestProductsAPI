## RestAPI with NestJS

Author: Hugo Alejandro Villalta Mena

Date: September 2025

## Description

This project implements a sample REST API in NestJS with typescript and a local PostgresSQL database with docker.

The application contains the following modules:

### PRODUCTS module

A full module with CRUD operation.

- Ability to get paginated results for products by using following url query parameters: `page={}&pageSize={}`. If no `pageSize` is specified the default is 5. Example: 

```
http://localhost:3000/products?page=1&pageSize=10
```

- Ability to filter products by using the url query parameters. Available filters are: brand, color, category, and price. Example:

```
http://localhost:3000/products?page=1&category=cell
```

- Filter by price range using a list of 2 comma separated values:

```
http://localhost:3000/products?page=1&price=2000,340
```

### REPORTS module

A sample reports module with the following reports:

- deletedProducts: get the percentage of deleted products since the first data insertion.

- non-deletedProducts: get the percentage of active prodcuts (non-deleted) since the first data insertion. This reports accepts an optional query parameters to get the report only within a specific date range. Use the filter like this:

```
reports/non-deletedProducts?startDate={2025-09-04}&endDate={2025-09-05}
```

When using the 'date range' query param the active products are filtered by creation date and the deleted products by deletion date before calcuting the resulting percentage.

- This module is private which means its protected with Bearer Token authorization.

### Authorization module

Two minimal endpoints are exposed only for the purpose of creating an account and then logging in to get an access_token for using with the private module.

- `auth/register`: use `email` and `password` to ceate an account.

- `auth/login`: use `email` and `password` to login and get an access_token.


## Automatic data insertion

- An automatic data retrieval process to emulate how this application could connect to an external source to retrieve data and inserted into its own database. 

- It runs every hour.

## Project setup

- Make sure to have docker installed and running
- Rename `.env.example` to `.env`
- Run `npm install`
- Run `docker-compose up`

