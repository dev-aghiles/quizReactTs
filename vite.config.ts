import { defineConfig } from 'vite';
import ghPages from 'vite-plugin-gh-pages';import react from "@vitejs/plugin-react";



export default defineConfig({
  plugins: [
    ghPages({
      // The base URL for your GitHub Pages site (e.g. https://username.github.io)
      base: '/your-repo-name/',
      // The branch to deploy your site to (default is 'gh-pages')
      branch: 'main',
      // Set this to true to create a new commit with the changes when deploying (default is false)
      push: true,
    }),
  ],
});
