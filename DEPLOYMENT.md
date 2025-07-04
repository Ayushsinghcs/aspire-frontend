# Netlify Deployment Guide

This guide will help you deploy your Aspire Frontend application to Netlify.

## Prerequisites

- A GitHub account with your repository pushed
- A Netlify account (free tier available)

## Deployment Steps

### Method 1: Deploy via Netlify UI (Recommended)

1. **Build the application locally first** (optional but recommended):
   ```bash
   npm install
   npm run build
   ```

2. **Go to Netlify**:
   - Visit [netlify.com](https://netlify.com)
   - Sign up or log in with your GitHub account

3. **Deploy from Git**:
   - Click "New site from Git"
   - Choose "GitHub" as your Git provider
   - Select your repository: `Ayushsinghcs/aspire-frontend`

4. **Configure build settings**:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Node version**: `18` (or leave default)

5. **Deploy**:
   - Click "Deploy site"
   - Netlify will automatically build and deploy your application

### Method 2: Deploy via Netlify CLI

1. **Install Netlify CLI**:
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify**:
   ```bash
   netlify login
   ```

3. **Build your application**:
   ```bash
   npm install
   npm run build
   ```

4. **Deploy**:
   ```bash
   netlify deploy --prod --dir=dist
   ```

## Configuration Files

The following configuration files are already set up for Netlify deployment:

### `netlify.toml`
- Specifies build command and publish directory
- Configures SPA redirects for client-side routing
- Sets security headers
- Configures caching for static assets
- **NEW**: Configures Netlify Functions for API endpoints

### `.nvmrc`
- Specifies Node.js version 18 for consistent builds

## API Endpoints

Your application now includes **Netlify Functions** to handle API requests in production:

### Available Endpoints

- **GET** `/api/cards` - Fetch all cards
- **POST** `/api/cards` - Create a new card
- **GET** `/api/cards/:id` - Fetch a specific card
- **PUT** `/api/cards/:id` - Update a specific card

### How It Works

1. **Development**: Uses Mock Service Worker (MSW) for API mocking
2. **Production**: Uses Netlify Functions to serve API endpoints
3. **Automatic Routing**: The `netlify.toml` file redirects `/api/*` requests to the appropriate functions

### Testing API Endpoints

After deployment, you can test the API endpoints:

```bash
# Get all cards
curl https://your-site.netlify.app/api/cards

# Get a specific card
curl https://your-site.netlify.app/api/cards/1

# Create a new card
curl -X POST https://your-site.netlify.app/api/cards \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe"}'
```

## Environment Variables

Currently, no environment variables are required for this application as it uses:
- Mock Service Worker (MSW) for API mocking in development
- Netlify Functions for API endpoints in production
- Local storage for data persistence
- No external API dependencies

If you need to add environment variables in the future:
1. Go to your Netlify site dashboard
2. Navigate to Site settings > Environment variables
3. Add your variables there

## Custom Domain (Optional)

1. Go to your Netlify site dashboard
2. Navigate to Domain settings
3. Click "Add custom domain"
4. Follow the instructions to configure your domain

## Continuous Deployment

Once deployed, Netlify will automatically:
- Watch your GitHub repository for changes
- Rebuild and redeploy on every push to the main branch
- Provide preview deployments for pull requests

## Troubleshooting

### Build Failures
- Check the build logs in Netlify dashboard
- Ensure all dependencies are in `package.json`
- Verify Node.js version compatibility

### 404 Errors on Refresh
- The `netlify.toml` file includes SPA redirects to handle this
- If issues persist, check the redirect configuration

### API Endpoint Issues
- Check Netlify Functions logs in the dashboard
- Verify the function files are in the correct location (`netlify/functions/`)
- Ensure the redirects in `netlify.toml` are correct

### Performance Issues
- Static assets are configured with long-term caching
- Consider enabling Netlify's asset optimization features

## Monitoring

- **Analytics**: Enable Netlify Analytics in your site settings
- **Forms**: Netlify automatically handles form submissions
- **Functions**: Monitor function execution in the Functions tab
- **API Logs**: Check function logs for API endpoint issues

## Support

For additional help:
- [Netlify Documentation](https://docs.netlify.com/)
- [Netlify Functions Guide](https://docs.netlify.com/functions/overview/)
- [Netlify Community](https://community.netlify.com/)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html) 