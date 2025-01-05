import { create, CID } from 'ipfs-http-client';

export default function useIPFS() {
    const ipfs = create({ host: '127.0.0.1', port: 5001, protocol: 'http' });

    const uploadFileOnIPFS = async (file: File): Promise<string> => {
        try {
            const response = await ipfs.add(file);
            return (response?.cid?.toString());

        } catch (error) {
            console.log('error from the uploadFileOnIPFS function:', error);
            return ('')
        }
    };

    const pinFileOnIFPS = async (hash: string): Promise<string | undefined> => {
        try {
            const cid = CID.parse(hash);
            const response = await ipfs.pin.add(cid);
            return (response?.toString());
        } catch (error) {
            console.log('error from the pinOnIPFS function:', error);
            return (undefined);
        }
    };

    const retrieveFileOnIPFS = async (hash: string): Promise<string | undefined> => {
        try {
            const stream = ipfs.cat(hash);
            let fileData = '';
            
            for await (const chunk of stream) {
                fileData += chunk.toString();
            }

            return (fileData);
        } catch (error) {
            console.log('error from the retrieve from ipfs function:', error);
            return (undefined)
        }
    };

    return { uploadFileOnIPFS, pinFileOnIFPS, retrieveFileOnIPFS };
}