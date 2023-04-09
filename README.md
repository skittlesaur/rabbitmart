# 🐰 Rabbit Mart

Rabbit Mart is a new Egyptian startup that guarantees delivery within 20 minutes of specified locations. While Rabbit
Mart is only available on mobile platforms, our job is to make the shopping experience available to web users as well.

## Screenshots
![Landing Page](https://i.ibb.co/sR92dH4/Screenshot-24.png)
![Products Page](https://i.ibb.co/T2jh3B5/Screenshot-25.png)
![Login Page](https://i.ibb.co/H4jvt9K/Screenshot-26.png)


## Tech Stack

| Frontend     | Backend      |
|:-------------|:-------------|
| React        | Node.js      |
| React Router | Express.js   |
| Redux        | MongoDB      |
| Axios        | Stripe       |
|              | SendGrid     |

## Usage

### Clone the Project

```bash
$ git clone https://github.com/skittlesaur/rabbitmart
```

**Note:** the `master` branch is the current production build. `releases` contain latest deployment tests. `develop` contains all new features and build.

### Client Side

```bash
$ cd client   # go to the client folder
$ npm i       # install packages
$ npm start   # run the client side statically with react-scripts
```

### Server Side

Create a `.env` file in the server directory and insert the following code. Replace the values with your credentials.

```dotenv
# DATABASE CONNECTIVITY
CONNECTION_URL=

# JWT SECTION
JWT_SECRET_KEY =
JWT_AUTH_TTL = 
JWT_CHECKOUT_TTL = 

# EMAIL SECRETS
SENDGRID_KEY = 

# PAYMENT SECRETS
STRIPE_PRIVATE_KEY = 
```

Start the server

```bash
$ cd server   # go to the server folder
$ npm i       # install packages
$ npm start   # start the server
```

## Authors

<table>
    <td align="center"><a href="https://skittlesaur.github.io"><sub><b>Baraa A.</b></sub></a><br /><a href="https://github.com/skittlesaur/rabbitmart/commits?author=skittlesaur" title="Commits">📖</a></td>
    <td align="center"><a href="https://github.com/emansalehkhalil"><sub><b>Eman S.</b></sub></a><br /><a href="https://github.com/skittlesaur/rabbitmart/commits?author=emansalehkhalil" title="Commits">📖</a></td>
    <td align="center"><a href="https://github.com/ssary"><sub><b>Sary N.</b></sub></a><br /><a href="https://github.com/skittlesaur/rabbitmart/commits?author=ssary" title="Commits">📖</a></td>
    <td align="center"><a href="https://github.com/YoussefElbasha"><sub><b>Youssef S.</b></sub></a><br /><a href="https://github.com/skittlesaur/rabbitmart/commits?author=youssefelbasha" title="Commits">📖</a></td>
</table>

