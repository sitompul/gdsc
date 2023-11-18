# React Learn

## How to learn

- Don't you double dare to over-engineer.
- Limit your Scope
- Focus on Concept:
    - **Frameworks and languages will be deprecated but good concepts won't**

## JS Runtime and Package Manager

* Program untuk menjalankan Javascript:
    * NodeJS, Deno, Bun, Browser (Chrome, Firefox, Etc)
* Program untuk menginstall Javascript Library/Framework:
    * NPM, yarn, pnpm, Deno use URL, Bun

## FE vs CSS Framework

**CSS Framework 🧑‍🎨**: Styling, anything related to CSS

**Frontend Framework 👷**: Logic, Fetching data, Routing anything related to JS


## CSS Framework
1. **HTML styling** is so easy:
    - Tailwind
        - TailwindUI
        - DaisyUI
        - flowbite
    - Master CSS
    ```html
    <div class="bg-indigo-500 dark:bg-indigo-900">
        Content
    </div>
    ```

2. **CSS code** is **☠️☠️Black Magic☠️☠️**:
    - Bootstrap
    ```html
    <div class=".bg-primary custom">
        Content
    </div>
    <style>
    .custom {background-color: powderblue;}
    </style>
    ```
3. **Component UI**: Non-agnostic framework:
    - Chakra
    ```jsx
    // only works in React or framework specific.
    import * as React from 'react'
    import { ChakraProvider } from '@chakra-ui/react'
    function App() {
        return <ChakraProvider>
            <TheRestOfYourApplication />
        </ChakraProvider>;
    }
    ```

|Comparison| Tailwind✔️ | Master CSS | Bootstrap |
|---|---|---|---|
|Stable|😍|😍 (Previously 😐)|😍|
|Performance|😐|😍|😐|
|Bundle Size|😐|😍|😐|
|Documentation|😍|😍|😐|
|DX (Developer Experience)|😍|😍|🤮|
|Corporate Backed|😐|🤮|🤮|
|Popularity|😍|🤮|😍|

## Frontend Framework

|Comparison| React✔️ | Solid🔥 |
|---|---|---|
|Stable|😍|😍|😍|
|Performance|🤮|😍|
|Bundle Size|🤮|😍|
|Documentation|😍|😍|
|DX|😍|😐|
|Corporate Backed|😍|🤮|
|Popularity|😍|🤮|


Ada banyak framework SPA seperti React, Vue, Angular, Lit, Solid, Svelte dst.

Bahasa pemrograman yang digunakan juga berbeda:
- React, Vue, Solid menggunakan **JSX/TSX**.😍
- Lit menggunakan pure **JS/TS** 😍😍😍 tapi menggunakan decorators dan OOP 🤮
- Vue, Angular, Svelte menggunakan **bahasa pemrograman sendiri yang 99% mirip dengan JS/TS** 🤮


## Frontend Framework berbentuk SPA.

Untuk menggunakan framework SPA kamu cukup mempelajari konsep:
- Membuat component.
    - Menambahkan props ke component dan menggunakannya.
    - Children props
    - Conditional Rendering, Bagaimana component dapat berubah bentuk jika state atau props diubah.
- State dan Global State
    - State: Variable that when changed using its setter will trigger UI changes for that component.
    - Global State/ State Provider: Variable that when changed can trigger UI change for component that reference it.
    - Component Lifecycle.
- Data Fetching.
    - Mengambil data dari backend.
    - Rending beberapa item.
- Routing
    - Navigate programatically and navigation component
    - Get querystring, get params.
- (Optional) Localstorage and IndexedDB: Saving data inside frontend.
- (Optional) Lazy loading. Menjadi penting kita ukuran code base sangat besar.
- (Optional) Intl: Handling currency, date format, etc.

## Create React Tailwind Project

1. Create Project.
    ```sh
    # Change project-name to your liking
    npm create vite@latest project-name -- --template react-ts
    cd project-name

    # Install tailwind
    npm install -D tailwindcss postcss autoprefixer
    npx tailwindcss init -p
    ```
2. Edit `tailwind.config.js`

    ```js
    /** @type {import('tailwindcss').Config} */
    export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {},
    },
    plugins: [],
    }
    ```

3. Edit `index.css`
    ```css
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
    ```

4. Run the server
    ```sh
    npm run dev
    ```

## Starting Backend Server

Load insomnia config from `backend/backend-api.json`

```sh
cd to_backend_folder # Go to backend folder
npm i # install dependencies
npm start # start the server
# open in browser localhost:8080
```
