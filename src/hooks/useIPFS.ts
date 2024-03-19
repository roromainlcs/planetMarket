import axios from "axios";

export default function useIPFS() {

    const uploadFileOnIPFS = async (file: File): Promise<string> => {
        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await axios.post('/api/uploadOnIPFS', formData);
            return (response && response !== null ? response.data.hash : '');
        } catch (error) {
            console.log('error from the uploadFileOnIPFS function:', error);
            return ('')
        }
    };

    const pinFileOnIFPS = async (hash: string): Promise<boolean> => {
        try {
            const response = await axios.post('/api/pinOnIPFS', hash);

            return (response && response !== null ? response.data.pinned : false);
        } catch (error) {
            console.log('error from the pinOnIPFS function:', error);
            return (false);
        }
    };

    const retrieveFileOnIPFS = async (hash: string): Promise<string> => {
        try {
            const response = await axios.post('/api/retrieveFromIPFS', hash);

            return (response && response !== null ? response.data.data : '');
        } catch (error) {
            console.log('error from the retrieve from ipfs function:', error);
            return ('')
        }
    };

    return { uploadFileOnIPFS, pinFileOnIFPS, retrieveFileOnIPFS };
}