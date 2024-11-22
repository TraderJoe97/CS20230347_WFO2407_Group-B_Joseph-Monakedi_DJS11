import { RootState } from "@/store/store"

const STORAGE_KEY = "podcast-App-state";

export function loadStateFromLocalStorage(): RootState | undefined {
  try {
    const serializedState = localStorage.getItem(STORAGE_KEY);
    if (!serializedState) return undefined;
    return JSON.parse(serializedState);
  } catch (err) {
    console.error("Failed to load state from localStorage:", err);
    return undefined;
  }
}

export function saveStateToLocalStorage(state: RootState) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(STORAGE_KEY, serializedState);
  } catch (err) {
    console.error("Failed to save state to localStorage:", err);
  }
}
