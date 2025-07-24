import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { invoke } from '@tauri-apps/api/core'

let firebaseApp = null;
let auth = null;

export async function initFirebaseAuth() {
  if (!firebaseApp) {
    let config;
    try {
      const { invoke } = await import('@tauri-apps/api/core');
      const configStr = await invoke('get_firebase_config');
      config = JSON.parse(configStr);
      console.log("TAURI CONFIG:", config);
      // Validate config keys
      const requiredKeys = [
        "apiKey",
        "authDomain",
        "projectId",
        "storageBucket",
        "messagingSenderId",
        "appId"
      ];
      const missing = requiredKeys.filter(k => !config[k]);
      if (missing.length > 0) {
        throw new Error(`Missing Firebase config keys: ${missing.join(", ")}`);
      }
      console.log("FIREBASE CONFIG USED:", config);
      firebaseApp = initializeApp(config);
      auth = getAuth(firebaseApp);
      console.log("Firebase initialized successfully.");
    } catch (e) {
      console.error("Failed to initialize Firebase:", e, config);
      throw e;
    }
  } else {
    console.log("Firebase already initialized:", firebaseApp);
  }
  return { firebaseApp, auth };
}

export { firebaseApp, auth };
