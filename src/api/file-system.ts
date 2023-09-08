import * as DocumentPicker from 'expo-document-picker';

export class FileSystem {
    public static pick = async (fileType?: string | Array<string>) => {
        
        const response = await DocumentPicker.getDocumentAsync({
            type: fileType
        });

        if (!response.assets?.[0]) {
            return null;
        }

        return response.assets[0];
    }
}



