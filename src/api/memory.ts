import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Memory {
    save: <T>(key: StorageKeys, value: T) => Promise<void>;
    load: <T>(key: StorageKeys) => Promise<T | null>;
    remove: (key: StorageKeys) => Promise<void>;
    clear: () => Promise<void>;
}

export enum StorageKeys {
    AccessToken = 'ACCESS_TOKEN'
}

export class AsyncMemory implements Memory {
    public save = <T>(key: StorageKeys, value: T) => AsyncStorage.setItem(key, JSON.stringify(value));

    public load = async <T>(key: StorageKeys) => {
        const data = await AsyncStorage.getItem(key);

        return typeof data === 'string' ? (JSON.parse(data) as T) : null;
    }

    public remove = (key: StorageKeys) => AsyncStorage.removeItem(key);

    public clear = () => AsyncStorage.clear();
}

export const memory: Memory = new AsyncMemory();