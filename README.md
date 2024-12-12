# 🫖 Mezbani Chai House

A modern web application for a Bangladeshi chai house, featuring online ordering, event booking, and a digital menu system.

## 🌐 Live Demo

Visit our site at: [mezbani.shawaz.org](https://mezbani.shawaz.org)

## 🚀 Tech Stack

### Next.js Implementation (Latest)
- **Framework**: Next.js 15.0.0 with App Router
- **UI Library**: Material-UI (MUI) v5
- **Forms**: React Hook Form
- **Payment**: Square Web SDK & API
- **Backend**: Firebase Admin SDK
- **Language**: TypeScript
- **Tools**: ESLint, Sharp for image optimization

### Legacy Frontend (Vite)
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **UI Library**: Material-UI (MUI)
- **Form Management**: React Hook Form
- **Routing**: React Router v6
- **Styling**: Emotion (CSS-in-JS)

### Backend & Infrastructure
- **Hosting**: Firebase Hosting
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth
- **Storage**: Firebase Storage
- **Analytics**: Firebase Analytics
- **Infrastructure as Code**: Terraform
- **CI/CD**: GitHub Actions

## 🛠️ Development Setup

### Next.js App (Recommended)
1. **Navigate to Next.js directory**
   ```bash
   cd next
   ```

2. **Environment Setup**
   ```bash
   cp .env.example .env
   ```
   Fill in the required environment variables:
   - Firebase configuration
   - Square API credentials
   - Firebase Admin SDK credentials

3. **Installation & Development**
   ```bash
   npm install
   npm run dev
   ```

4. **Available Scripts**
   - `npm run dev` - Start development server
   - `npm run build` - Build production application
   - `npm run start` - Start production server
   - `npm run lint` - Run ESLint
   - `npm run typecheck` - Run TypeScript type checking
   - `npm run populate-catalog` - Populate Square catalog data

### Legacy Frontend Setup
1. **Prerequisites**
   - Node.js 20+
   - npm 9+
   - Firebase CLI (`npm install -g firebase-tools`)

2. **Environment Variables**
   ```bash
   # Frontend environment variables
   cp frontend/.env.example frontend/.env

   # Scripts environment variables (for database initialization)
   cp scripts/.env.example scripts/.env
   ```

   Fill in the Firebase configuration variables:
   
   Frontend (.env):
   ```bash
   VITE_FIREBASE_API_KEY=
   VITE_FIREBASE_AUTH_DOMAIN=
   VITE_FIREBASE_PROJECT_ID=
   VITE_FIREBASE_STORAGE_BUCKET=
   VITE_FIREBASE_MESSAGING_SENDER_ID=
   VITE_FIREBASE_APP_ID=
   VITE_FIREBASE_MEASUREMENT_ID=
   ```

   Scripts (.env):
   ```bash
   FIREBASE_PROJECT_ID=
   FIREBASE_CLIENT_EMAIL=
   FIREBASE_PRIVATE_KEY=
   ```

3. **Installation**
   ```bash
   # Install frontend dependencies
   cd frontend
   npm install

   # Install script dependencies
   cd ../scripts
   npm install
   ```

4. **Firebase Setup**
   ```bash
   # Login to Firebase CLI
   firebase login

   # Set active project
   cd ../frontend
   firebase use --add
   # Select your project and set an alias (e.g., staging)

   # Deploy Firestore rules and indexes
   firebase deploy --only firestore:rules,firestore:indexes
   ```

5. **Database Initialization**
   ```bash
   # Initialize the menu items in Firestore
   cd ../scripts
   npm run init-db
   ```

6. **Development Server**
   ```bash
   cd ../frontend
   npm run dev
   ```

7. **Build**
   ```bash
   npm run build
   ```

## 📁 Project Structure

```
mezbani/
├── next/              # Next.js implementation (recommended)
│   ├── src/
│   │   ├── app/      # Next.js App Router pages and layouts
│   │   ├── lib/      # Shared utilities and API clients
│   │   └── components/# Reusable React components
│   ├── public/       # Static assets
│   └── scripts/      # Build and utility scripts
├── frontend/         # Legacy Vite implementation
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── pages/     # Page components
│   │   ├── lib/       # Firebase and utility functions
│   │   └── assets/    # Static assets
│   ├── firestore.rules      # Firestore security rules
│   ├── firestore.indexes.json # Firestore indexes
│   └── firebase.json        # Firebase configuration
├── functions/          # Firebase Cloud Functions
│   ├── src/
│   │   ├── square/    # Square integration functions
│   │   │   ├── booking.ts    # Booking functions
│   │   │   └── payment.ts    # Payment functions
│   │   └── index.ts   # Function exports
│   └── package.json   # Function dependencies
├── scripts/           # Database initialization scripts
│   ├── init-db.ts    # Script to populate menu items
│   └── .env          # Script environment variables
└── .github/          # GitHub Actions workflows
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Coding Standards
- Use TypeScript for all new code
- Follow the existing code style
- Keep security rules up to date when modifying database access
- Update indexes when adding new queries

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by Bangladeshi chai culture
- Built with modern web technologies
- Designed for accessibility and user experience

---
Made with ❤️ by [Shawaz](https://github.com/shawazi)
