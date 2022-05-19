# backend api

> backend api for handling bootcamps, courses, reviews and users. validates user authentication both with cookies or jwt headers, has route protection and route authorization by user role.

## usage

rename .env.example to .env and replace values/settings to your own

## install dependencies

```
npm install
```

## run

```
# dev
npm run dev

# prod
npm start
```

## backend

- express
- bcryptjs
- colors
- cookie-parser
- dotenv
- morgan
- slugify
- nodemailer
- express-fileupload
- node-geocoder

## auth

- jsonwebtoken

## security

- cors
- express-mongo-sanitize
- express-rate-limit
- helmet
- hpp
- xss-clean

## db

- mongoDB
- mongoose

## linting and conventional commits

- eslint
- git-commit-msg-linter
- husky
- lint-staged

## deploy

- digital ocean (before/paid)
- pm2
- nginx
- domain
- ssl
- heroku (after/free)
