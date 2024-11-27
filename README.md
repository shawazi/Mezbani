# 🫖 Mezbani Chai House

A modern web application for a Bangladeshi chai house, featuring online ordering, event booking, and a digital menu system.

## 🌐 Live Demo

Visit our site at: [mezbani.shawaz.org](https://mezbani.shawaz.org)

## 🚀 Tech Stack

### Frontend
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

1. **Prerequisites**
   - Node.js 20+
   - npm 9+

2. **Environment Variables**
   ```bash
   # Copy example env file
   cp frontend/.env.example frontend/.env
   ```
   Fill in the Firebase configuration variables:
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_STORAGE_BUCKET`
   - `VITE_FIREBASE_MESSAGING_SENDER_ID`
   - `VITE_FIREBASE_APP_ID`
   - `VITE_FIREBASE_MEASUREMENT_ID`

3. **Installation**
   ```bash
   cd frontend
   npm install
   ```

4. **Development Server**
   ```bash
   npm run dev
   ```

5. **Build**
   ```bash
   npm run build
   ```

## 🧪 Testing

```bash
# Run ESLint
npm run lint

# Type checking
npm run type-check
```

## 📦 Project Structure

```
mezbani/
├── frontend/           # React application
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── pages/     # Page components
│   │   ├── config/    # Configuration files
│   │   └── assets/    # Static assets
│   └── public/        # Public assets
├── terraform/         # Infrastructure as Code
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
- Write meaningful commit messages
- Add appropriate documentation
- Ensure all tests pass

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by Bangladeshi chai culture
- Built with modern web technologies
- Designed for accessibility and user experience

---
Made with ❤️ by [Shawaz](https://github.com/shawazi)
