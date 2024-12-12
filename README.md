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

### Infrastructure & DevOps
- **Hosting**: Firebase Hosting
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth
- **Storage**: Firebase Storage
- **Analytics**: Firebase Analytics
- **Infrastructure as Code**: Terraform
- **CI/CD**: GitHub Actions
- **Version Control**: Git

## 🛠️ Development Setup

### Prerequisites
- Node.js 20+
- npm 9+
- Firebase CLI (`npm install -g firebase-tools`)
- Terraform (for infrastructure changes)

### Environment Setup
```bash
# Next.js environment variables
cd next
cp .env.example .env
```

Fill in the required environment variables:
- Firebase configuration
- Square API credentials
- Firebase Admin SDK credentials

### Installation & Development
```bash
# Install and run Next.js app
cd next
npm install
npm run dev
```

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build production application
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking
- `npm run populate-catalog` - Populate Square catalog data

## 📁 Project Structure

```
mezbani/
├── next/              # Next.js application
│   ├── src/          # Source code
│   ├── public/       # Static assets
│   └── scripts/      # Utility scripts
├── scripts/          # Project-wide scripts
├── terraform/        # Infrastructure as Code
├── .github/          # GitHub Actions workflows
├── firebase.json     # Firebase configuration
└── .firebaserc      # Firebase project settings
```

## 🔐 Security & Configuration

### Firebase Configuration
- Firestore security rules
- Storage bucket rules
- Authentication settings
- Hosting configuration

### Square Integration
- Payment processing
- Booking system
- Menu management

## 📦 Infrastructure

### Terraform Resources
- Firebase project configuration
- Cloud Functions setup
- Storage bucket configuration
- Hosting setup

### CI/CD Pipeline
- Automated deployments via GitHub Actions
- Environment-specific deployments
- Security checks and testing

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
