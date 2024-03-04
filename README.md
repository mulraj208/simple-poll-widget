# Simple Poll Widget

## How to start the project
### Steps
- Make sure to install node 18 manually or using [nvm](https://github.com/nvm-sh/nvm).
- Run the `npm i && npm run dev` command.
- The app should start on `http://127.0.0.1:5173/`.

### Run unit test
- Run the `npm run test` command.

### Minify the project for production
- Run the `npm run build && npm run preview` command.
- The app should start on `http://127.0.0.1:4173/`.

## Stack/Libraries
- vite
- vanilla js
- vitest and jsdom for testing


## Technical Summary:
### Implementation Choices
**Vanilla JavaScript**: Due to the assignment's simplicity, VanillaJS was chosen for its conciseness. Frameworks like React or Vue would have introduced unnecessary complexity and increased bundle size.

**Vite**: This build tool was selected for its efficient asset minification and unit testing capabilities.

### Potential Improvements
**Error Handling**: Implementing robust error handling mechanisms would enhance the application's stability.

**TypeScript**: Utilizing TypeScript would strengthen type safety, enabling early error detection and facilitating the development of a more versatile API capable of supporting a broader range of poll widget types.

**Alternative Frameworks**: Exploring frameworks like Svelte or Solid could potentially provide a balance between reactivity and reduced bundle size.


