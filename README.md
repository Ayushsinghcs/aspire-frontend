# Aspire Frontend


## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Ayushsinghcs/aspire-frontend.git
   cd aspire-frontend
   ```

2. **Install dependencies**
   ```bash
   # Using npm
   npm install
   
   # Using pnpm (recommended)
   pnpm install
   ```

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (>= 18.0.0)
- **npm** (>= 9.0.0) or **pnpm** (recommended)

## 🚀 Development

### Starting the Development Server

```bash
# Using npm
npm run dev

# Using pnpm
pnpm dev
```

The application will be available at `http://localhost:5173`


## 🚀 Features

React | TypeScript | Responsive Design | Redux | Tailwind CSS | Mock Server 

### Project Structure

```
src/
├── assets/          # Static assets (icons, images, etc.)
│   └── icons/       # Icon files
├── core/            # Core application logic
│   ├── api/         # API related configurations
│   ├── config/      # Application configuration
│   ├── constants/   # Application constants
│   ├── data/        # Static data files
│   ├── services/    # Service layer
│   ├── store/       # Redux store configuration
│   ├── utils/       # Core utilities
│   └── browser.ts   # Browser-specific configurations
├── features/        # Feature-based components
│   ├── balance/     # Balance display components
│   └── cards/       # Card management components
├── shared/          # Shared components and utilities
│   ├── components/  # Reusable UI components
│   ├── types/       # TypeScript type definitions
│   └── utils/       # Shared utility functions
├── App.tsx          # Main application component
├── App.css          # Application styles
├── index.css        # Global styles
├── main.tsx         # Application entry point
└── vite-env.d.ts    # Vite environment types
```

## 🎨 UI Components

The application uses a combination of:
- **Ant Design** for UI components
- **Tailwind CSS** for custom styling
- **Responsive design** with mobile-first approach

### Key Components

- **Navigation**: Sidebar navigation for desktop, bottom navigation for mobile
- **Balance Display**: Shows current account balance
- **Card Management**: Credit/debit card display and actions
- **Transaction List**: Recent transaction history

## 🔧 Configuration

### Environment Setup

The application uses Vite for configuration. Key configuration files:

- `vite.config.ts` - Vite configuration
- `tsconfig.json` - TypeScript configuration
- `eslint.config.js` - ESLint rules
- `.prettierrc` - Prettier formatting rules

### Tailwind CSS

Tailwind CSS is configured with Vite plugin for optimal performance. Custom styles can be added in:
- `src/index.css` - Global styles
- `src/App.css` - Application-specific styles

## 🧪 Testing

The application includes Mock Service Worker (MSW) for API mocking during development. This allows you to develop without a backend server.

## 📱 Responsive Design

The application is fully responsive with:
- **Desktop**: Sidebar navigation with full layout
- **Mobile**: Bottom navigation with card overlay interface

## 🚀 Deployment

### Building for Production

```bash
# Using npm
npm run build

# Using pnpm
pnpm build
```

The build output will be in the `dist/` directory.

## 🔍 Code Quality

### Linting

```bash
# Run ESLint
npm run lint

# Fix auto-fixable issues
npm run lint -- --fix
```

### Code Formatting

The project uses Prettier for code formatting. Configure your editor to format on save or run:

```bash
npx prettier --write .
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Ayush** - [GitHub](https://github.com/ayush)

## 🐛 Issues

If you encounter any issues, please report them on the [GitHub Issues page](https://github.com/ayush/aspire-frontend/issues).

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Contact the maintainer

---

**Note**: This is a frontend application for the Aspire project. Make sure to have the backend API running if you need to connect to real data instead of using the mock service worker.
