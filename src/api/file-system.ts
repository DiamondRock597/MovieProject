import * as DocumentPicker from 'expo-document-picker';

export class FileSystem {
    public static pick = async () => {
        
        const response = await DocumentPicker.getDocumentAsync({
            type: '*/*'
        });

        if (!response.assets?.[0]) {
            return null;
        }

        return response.assets[0];
    }
}



