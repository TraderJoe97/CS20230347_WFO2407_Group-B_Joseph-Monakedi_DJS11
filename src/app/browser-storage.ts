import { RootState } from "@/store/store";

const STORAGE_KEY = "podcast-App-state";

/**
 * Loads the application state from local storage.
 * @returns the loaded state or undefined if it failed to load.
 */
export function loadStateFromLocalStorage(): RootState | undefined {
  try {
    const serializedState = localStorage.getItem(STORAGE_KEY);
    if (!serializedState) return undefined;
    const parsedState = JSON.parse(serializedState);
    if (parsedState === null) {
      console.error("Failed to load state from localStorage:", "null pointer");
      return undefined;
    }
    return parsedState;
  } catch (err) {
    console.error("Failed to load state from localStorage:", err);
    return undefined;
  }
}

/**
 * Saves the application state to local storage.
 * @param state the state to be saved
 */
export function saveStateToLocalStorage(state: RootState) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(STORAGE_KEY, serializedState);
  } catch (err) {
    console.error("Failed to save state to localStorage:", err);
  }
}
