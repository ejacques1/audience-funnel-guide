# YouTube Hook Analyzer

A web application that analyzes YouTube channels to discover viral hook patterns that drive millions of views. Built with Firebase authentication, Firestore database, Stripe payments, and YouTube API integration.

## Features

- **Firebase Authentication**: Email/password and Google Sign-In
- **Credit System**: Free users get 3 credits, Pro users get unlimited
- **YouTube Analysis**: Analyzes top videos to detect hook patterns
- **Hook Pattern Detection**: Identifies numbers, questions, urgency, and problem-based hooks
- **Stripe Integration**: Pro plan subscription ($29/month)
- **Real-time Database**: User data stored in Firestore

## Setup Instructions

### 1. Firebase Configuration

1. Create a new Firebase project at [Firebase Console](https://console.firebase.google.com)
2. Enable Authentication with Email/Password and Google providers
3. Create a Firestore database
4. Replace the Firebase config in `index.html` with your actual config:

```javascript
const firebaseConfig = {
    apiKey: "your-actual-api-key",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-actual-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "your-sender-id",
    appId: "your-app-id"
};
```

### 2. Firestore Security Rules

Set up the following security rules in Firestore:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{email} {
      allow read, write: if request.auth != null && request.auth.token.email == email;
    }
  }
}
```

### 3. Environment Variables

Set up these environment variables in Netlify:

- `STRIPE_SECRET_KEY`: Your Stripe secret key
- `YOUTUBE_API_KEY`: Your YouTube Data API v3 key (optional for demo)

### 4. YouTube API Setup (Optional)

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing
3. Enable YouTube Data API v3
4. Create credentials (API Key)
5. Add the API key to your environment variables

### 5. Stripe Setup

1. Create a Stripe account at [Stripe Dashboard](https://dashboard.stripe.com)
2. Get your secret key from the API keys section
3. Add the secret key to your Netlify environment variables

### 6. Deployment

#### Deploy to Netlify:

1. Connect your GitHub repository to Netlify
2. Set build command: `npm install`
3. Set publish directory: `.` (root)
4. Add environment variables in Netlify dashboard
5. Deploy!

#### Local Development:

```bash
# Install dependencies
npm install

# Install Netlify CLI
npm install -g netlify-cli

# Run locally
netlify dev
```

## File Structure

```
├── index.html                     # Main application file
├── netlify/
│   └── functions/
│       └── create-checkout.js     # Stripe checkout function
├── .github/
│   └── workflows/
│       └── static.yml             # GitHub Pages deployment
├── package.json                   # Dependencies
└── README.md                      # This file
```

## How It Works

1. **Authentication**: Users sign up/in with email or Google
2. **Credit System**: Free users get 3 credits, Pro users unlimited
3. **Analysis**: Enter YouTube channel URL to analyze top videos
4. **Hook Detection**: AI detects patterns like numbers, questions, urgency
5. **Results**: View detailed hook pattern analysis with effectiveness scores
6. **Upgrade**: Stripe checkout for Pro plan subscription

## Hook Patterns Detected

- **Numbers & Statistics**: Specific numbers that create credibility
- **Question Hooks**: Questions that engage viewer curiosity  
- **Urgency & FOMO**: Creates sense of urgency or fear of missing out
- **Problem/Mistake**: Highlights common problems or mistakes

## Tech Stack

- **Frontend**: Vanilla HTML, CSS, JavaScript
- **Authentication**: Firebase Auth
- **Database**: Firestore
- **Payments**: Stripe
- **API**: YouTube Data API v3
- **Hosting**: Netlify
- **Functions**: Netlify Functions

## Support

For issues or questions, please create an issue in this repository.

## License

MIT License - see LICENSE file for details.