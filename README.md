# Engi's University Data Finder
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)	![Website](https://img.shields.io/website/https/novendraw.github.io/euni.svg?style=popout)

## Installation

You need **node.js** and **npm** to run this program. Please go to [node.js website](https://nodejs.org) if you haven't installed it.

Install and run this app locally:

```
git clone https://github.com/novendraw/euni
cd euni
npm install
npm run start
```

> The application will run on [http://localhost:3000/](http://localhost:3000/) (if port still available).

## Usage


## Screenshots

### Desktop



### Mobile



## Application Design

In this project, I use the **Chain of Responsibility** design pattern.


> Chain of Responsibility is a behavioral design pattern that pass requests along a chain of handlers. After receiving the request, each handler decides to process the request or forward it to the next handler in the chain.

The application consist of two pages, Login / Register Page and Search Page. In each page there are some parameters and handlers for different types of request.

The parameters and handlers in this project are :

### Login / Register Page

---

#### `username`

Type : String

Required, can't empty or longer than 20 characters

#### `password`
Type : String

Required, can't empty

#### `handleUsernameChange`
Handle username state when username input changed.
#### `handlePasswordChange`
Handle password state when password input changed.
#### `handleUserLogin`
Handle login request when login button clicked.
#### `handleUserRegister`
Handle register request when register button clicked.
### Search Page

---

#### `count`
Type : Integer

Default : 10

#### `byname`
Type : boolean

Default : true

#### `keyword`
Type : String

Required

#### `token`
Type : String

Required, passed as cookie in header

#### `handleCountChange`
Handle count state when count parameter changed.

#### `handleTypeChange`
Handle byname state when search type input changed.

#### `handleSearch`
Handle search action when keyword parameter changed.

#### `handleByName`
Handle search request when using byname search type.

#### `handleById`
Handle search request when using byid search type.

#### `handleChangePage`
Handle search action when change page.

## API Review

### Pros :

+ Give enough explanations when error occured.
+ Many optional query parameters that can be configured when sending request.

### Cons :

+ Bad response when send request to **register** url with empty `username` and empty `password` parameters. (quotation marks in `status` is missing)

	> Can be fixed by adding quotation marks to `status`.

+ Bad response when send request to **login** url with empty `username` and empty `password` parameters. (quotation marks in `status` is missing)

	> Can be fixed by adding quotation marks to `status`.

+ Bad response when send request to **register** url with `username` parameter length more than 20 characters. (quotation marks in `status` is missing)

	> Can be fixed by adding quotation marks to `status`.

+ The value of the `'Access-Control-Allow-Origin'` header in the response is `'*'`. (Can't do CORS Request)

	> Can be fixed by modifying the `'Access-Control-Allow-Origin'` header in the response.

## Tech / Framework Used

+ [axios](https://www.npmjs.com/package/axios) (Promise based HTTP client for the browser and node.js)
+ [bootstrap](https://getbootstrap.com/) (Open source toolkit for developing with HTML, CSS, and JS)
+ [Github Pages](https://pages.github.com/) (Turn github repository to website)
+ [qs](https://www.npmjs.com/package/qs) (A querystring parsing and stringifying library with some added security)
+ [react](https://reactjs.org/) (A JavaScript library for building user interfaces)
+ [react-cookies](https://www.npmjs.com/package/react-cookies) (Load and save cookies with React)
+ [react-dom](https://www.npmjs.com/package/react-dom) (This package serves as the entry point to the DOM and server renderers for React)
+ [react-paginating](https://www.npmjs.com/package/react-paginating) (Simple lightweight pagination component)
+ [react-scripts](https://www.npmjs.com/package/react-scripts) (This package includes scripts and configuration used by [Create React App](https://github.com/facebook/create-react-app))


## Author

__Eka Novendra Wahyunadi / 13517011__

## License

Copyright (c) Eka Novendra Wahyunadi. All rights reserved.

Licensed under the [GNU GPLv3](https://github.com/novendraw/euni/blob/master/LICENSE) license.