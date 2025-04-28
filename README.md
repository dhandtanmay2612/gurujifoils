# Guruji Foils

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Run the development server:
   ```
   npm run dev
   ```
4. Build for production:
   ```
   npm run build
   ```

## Notes on Path Aliases

The project now uses relative import paths instead of the `@/` path alias to ensure compatibility during the build process. If you need to revert to using path aliases for development:

1. Make sure the paths are correctly configured in both:
   - `tsconfig.json` (and `tsconfig.app.json`)
   - `vite.config.ts`

2. If you encounter build issues related to path resolution, run the included `fix-imports.js` script:
   ```
   node fix-imports.js
   ```
   This will convert all `@/` imports to relative paths.

## Project Structure

- `/src` - Source code
  - `/components` - UI components
  - `/pages` - Page components
  - `/hooks` - Custom React hooks
  - `/lib` - Utility functions

## Technologies

- React
- TypeScript
- Vite
- Shadcn UI
- Tailwind CSS

## Project info

**URL**: https://lovable.dev/projects/655ca0b1-7a6d-42ad-aa6c-bd38e1de44e1

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/655ca0b1-7a6d-42ad-aa6c-bd38e1de44e1) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/655ca0b1-7a6d-42ad-aa6c-bd38e1de44e1) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes it is!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
