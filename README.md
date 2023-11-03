
# Expressjs + Typescript + ESM

Boilerplate for using Expressjs + Typescript + ESM module

# Express
Init a server, try to handle unhandledRejection and uncaughtException. Gracefully shutdown and disconnect all connection to databases.
## Package manager
Use pnpm for better performance and disk saving
## Typescript
Setup nodemon + ts-node to run with development mode: `npm run dev`  
Config ts-node + tsconfig to work with ESM module
## Eslint
Use Airbnb base + Prettier
## Mongodb
Use **[mongoose](https://mongoosejs.com/)** to conenct with retry handling

Use **[prisma](https://www.prisma.io/)** as an alternative
## Joi
For validate request

### Note
Compression will be done on Nginx/KongAPI instead of in service