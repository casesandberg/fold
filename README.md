# Fold
Minimalist Email Client

### Setup

Create a Nylas app [here](https://developer.nylas.com/console) and add both of these callbacks under the apps under settings:
```
http://localhost:8517/callback
fold://callback
```

Create a `.env` file with the Nylas App ID:
```
NYLAS_APP_ID=<insert-app-id-here>
```

Install Deps:
```
npm install
```

### Running

Webserver (and navigate to `http://localhost:8517`)
```
npm start
```

Native (and open `ios/Mono.xcodeproj` in Xcode)
```
npm run native
```

Tests:
```
npm run unit-test
```
