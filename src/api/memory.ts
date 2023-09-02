import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Memory {
    save: <T>(key: string, value: T) => Promise<void>;
    load: <T>(key: string) => Promise<T | null>;
    remove: (key: string) => Promise<void>;
    clear: () => Promise<void>;
}

export class AsyncMemory implements Memory {
    public save = <T>(key: string, value: T) => AsyncStorage.setItem(key, JSON.stringify(value));

    public load = async <T>(key: string) => {
        const data = await AsyncStorage.getItem(key);

        return typeof data === 'string' ? (JSON.parse(data) as T) : null;
    }

    public remove = (key: string) => AsyncStorage.removeItem(key);

    public clear = () => AsyncStorage.clear();
}