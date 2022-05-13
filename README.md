# 🐰 Rabbit Mart

Rabbit Mart is a new Egyptian startup that guarantees delivery within 20 minutes of specified locations. While Rabbit
Mart is only available on mobile platforms, our job is to make the shopping experience available to web users as well.

## Tech Stack

| Frontend     | Backend      |
|:-------------|:-------------|
| React        | Node.js      |
| React Router | Express.js   |
| Redux        | MongoDB      |
| Axios        | Stripe API   |
|              | SendGrid API |

## Usage

### Clone the Project

```bash
$ git clone https://github.com/skittlesaur/rabbitmart
```

**Note:** the main branch is the `develop` branch by default, which is used for feature development and planning but is
not the most recently deployed version. Check out `master` and `releases` for latest deployment and releases.

### Client Side

```bash
$ cd client   # go to the client folder
$ npm i       # install packages
$ npm run dev # run the client locally

# deployment for client
$ npm build   # compile react code using webpack
$ npm start   # run the client side statically with react-scripts
```

### Server Side

Create a `.env` file in the server directory and insert the following code. Replace the values with your credentials.

```dotenv
# default port value
PORT=5000

# mongodb connection url
CONNECTION_URL=

# jwt encryption secret key
JWT_SECRET_KEY=
```

Start the server

```bash
$ cd server   # go to the server folder
$ npm i       # install packages
$ npm run dev # run the client locally
$ npm build   # builds the server code to es5 js code
```

## Authors

<table>
    <td align="center"><a href="https://skittlesaur.github.io"><sub><b>Baraa A.</b></sub></a><br /><a href="https://github.com/skittlesaur/rabbitmart/commits?author=skittlesaur" title="Commits">📖</a></td>
    <td align="center"><a href="https://github.com/emansalehkhalil"><sub><b>Eman S.</b></sub></a><br /><a href="https://github.com/skittlesaur/rabbitmart/commits?author=emansalehkhalil" title="Commits">📖</a></td>
    <td align="center"><a href="https://github.com/ssary"><sub><b>Sary N.</b></sub></a><br /><a href="https://github.com/skittlesaur/rabbitmart/commits?author=ssary" title="Commits">📖</a></td>
    <td align="center"><a href="https://github.com/youssefsaadgiu"><sub><b>Youssef S.</b></sub></a><br /><a href="https://github.com/skittlesaur/rabbitmart/commits?author=youssefsaadgiu" title="Commits">📖</a></td>
</table>
