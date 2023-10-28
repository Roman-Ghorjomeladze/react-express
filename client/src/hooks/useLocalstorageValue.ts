import { useState } from "react"

export const useLocalstorageValue = (key: string) => {
    const [state, setState] = useState(localStorage.getItem(key));

    const setLocalStorageValue = (newValue: string) => {
        localStorage.setItem(key, newValue);
        setState(newValue);
    }
    return [state, setLocalStorageValue];
}