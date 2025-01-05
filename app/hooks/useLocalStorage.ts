import { get, set, remove } from 'local-storage';

export default function useLocalStorage() {

    const localStorageData = (key: string, value: string): boolean => {
        try {
            const response = set(key, value);
            return (response);
        } catch (error) {
            console.log('Trying to store the string:', value, "with the key:", key, "and got this error:", error);
            return (false);
        }
    };

    const localReadingData = (key: string): string | undefined => {
        try {
            const value: string = get(key);
            return (value ? value : undefined);
        } catch (error) {
            console.log('Trying to read the key:', key, "and got this error:", error);
            return (undefined);
        }
    };

    const localDeletingData = (key: string): boolean => {
        try {
            remove(key);
            return (true);
        } catch (error) {
            console.log('Trying to delete the key:', key, "and got this error:", error);
            return (false);
        }
    };

    return { localStorageData, localReadingData, localDeletingData };
}