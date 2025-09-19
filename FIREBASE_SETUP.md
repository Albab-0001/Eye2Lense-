# Firebase Authentication Setup

This application uses Firebase for authentication. Follow these steps to set up Firebase for this project.

## 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" and follow the setup wizard
3. Give your project a name and follow the prompts

## 2. Register Your Web App

1. In your Firebase project console, click on the web icon (</>) to add a web app
2. Register your app with a nickname (e.g., "i2lense-web")
3. You don't need to set up Firebase Hosting now (unless you want to)

## 3. Get Your Firebase Configuration

After registering your app, you'll see the Firebase configuration. It should look something like this:

```javascript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id"
};
```

## 4. Create Environment Variables

1. Create a `.env` file in the root of your project based on `.env.example`
2. Add your Firebase configuration values to the `.env` file:

```
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

## 5. Enable Authentication Methods

1. In Firebase console, go to Authentication > Sign-in method
2. Enable the following authentication methods:
   - Email/Password
   - Google

## 6. Set Up Firestore Database

1. In Firebase console, go to Firestore Database
2. Click "Create database"
3. Choose "Start in production mode" or "Start in test mode" (for development)
4. Select a location for your Firestore database that's closest to your users
5. Create the following collections:
   - `users` - For storing user profile data
   - `vendors` - For storing vendor data
   - `reviews` - For storing review data

## 7. Set Up Storage Rules

1. In Firebase console, go to Storage
2. Click "Get started" and follow the prompts
3. For development, you can use the default rules or set up more permissive ones:

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /profile-photos/{userId}/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## 8. Testing the Connection

1. After setting up your Firebase configuration, run the application
2. Navigate to the test page to verify your Firebase connection is working correctly
3. If you encounter any issues, check the browser console for error messages

## Additional Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firebase Authentication](https://firebase.google.com/docs/auth)
- [Firestore Documentation](https://firebase.google.com/docs/firestore)
- [Firebase Storage](https://firebase.google.com/docs/storage) 