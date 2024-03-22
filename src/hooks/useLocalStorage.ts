import { get, set, remove } from 'local-storage';

export default function useLocalStorage() {

    const localStorageData = (key: string, value: string): boolean => {
        try {
            const response = set(key, value);
            console.log("store the value on the given key, and got this response:", response);
            return (true);
        } catch (error) {
            console.log('Trying to store the string:', value, "with the key:", key, "and got this error:", error);
            return (false);
        }
    };

    const localReadingData = (key: string): string | undefined => {
        try {
            const value: string = get(key);
            console.log("Read the value on the given key, and got this value:", value);
            return (value ? value : undefined);
        } catch (error) {
            console.log('Trying to read the key:', key, "and got this error:", error);
            return (undefined);
        }
    };

    const localDeletingData = (key: string): boolean => {
        try {
            const response = remove(key);
            console.log("delete the value on the given key, and got this response:", response);
            return (true);
        } catch (error) {
            console.log('Trying to delete the key:', key, "and got this error:", error);
            return (false);
        }
    };

    return { localStorageData, localReadingData, localDeletingData };
}