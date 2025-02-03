# Mini Blogs App

A React Native application for bloggers and blog viewers with role-based authentication, blog management, and interactive features.

Direct APK Link : https://drive.google.com/file/d/1i8tV52RjnuEbvmBtWQY6AmGE2MkYJ7DS/view?usp=sharing

## Features

- Role-based user authentication (Blogger/Viewer)
- Blog creation and management
- Writer profiles with detailed information
- Interactive map showing bloggers across India
- Basic chat functionality
- Search and filter capabilities

## Tech Stack

- React Native
- TypeScript
- React Navigation (Stack + Tab)
- NativeWind for styling(it saves time)
- React Native Vector Icons
- React Native Maps
- Local state management
- Mock API (JSON data)

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- React Native development environment
- iOS Simulator (Mac) or Android Emulator

### Installation

1. Clone the repository:
```bash
git clone https://github.com/rkofficial786/blog_app.git
cd mini-blogs-app
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm start
# or
yarn start
```

4. Run on Android , IOS not tested:
```bash


# For Android
npm run android
# or
yarn android
```



## Testing Credentials

### Pre-registered Blogger Accounts:
- Email: rahul@example.com
- Email: priya@example.com
- Email: amit@example.com
- Password: Any password will work (mock authentication)

### New Users:
- Can register as either a Blogger or Viewer

## Development Notes

- Development time: Approximately 20 hours
- Mock API implementation: Data is managed locally
- Some features may have static content due to the mock nature of the implementation and just used to support design and feel
- Dynamic data management is handled through redux locally 
- If something is not as expected , just need to give more time to that , but its doable

## Limitations

- Authentication is mocked for demonstration purposes
- Data persistence is limited to the session
- Some features might have reduced functionality due to the mock backend
