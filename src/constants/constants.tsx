export const firebaseMoviesCollection = "movies";
export const firebaseUsersCollection = "users";

export const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

export const colors = {
  transparent: "transparent",
  white: "rgba(255, 255, 255, 1)",
  whiteActive: "rgba(235, 235, 235, 1)",
  whiteTransparent: "rgba(255, 255, 255, 0.5)",
  gray: "rgba(120, 120, 120, 1)",
  grayTransparent: "rgba(120, 120, 120, 0.5)",
  black: "rgba(7, 5, 14, 1)",
  blackBackground: "rgba(7, 5, 14, 0.9)",
  blackThickTransparent: "rgba(7, 5, 14, 0.7)",
  blackTransparent: "rgba(7, 5, 14, 0.5)",
};

export const fontSizes = {
  sm: "8px",
  md: "16px",
  lg: "24px",
  xl: "32px",
  xxl: "40px",
  xxxl: "80px",
  xxxxl: "120px",
};

export const spacing = {
  sm: "8px",
  md: "16px",
  lg: "24px",
  xl: "32px",
  xxl: "40px",
  xxxl: "80px",
  xxxxl: "120px",
};
