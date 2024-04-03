import { useState } from 'react';
import styles from './styles.module.css';
import useIPFS from '@/hooks/useIPFS';
import { useUser } from '@/contexts/userContext';
import { useXRPL } from '@/contexts/xrplContext';

type FormFieldData = {
    images: File[],
    title: string,
    description: string,
    category: string,
    price: number,
    [key: string]: string | File[] | number,
}

export default function CreationForm({ onClose }: any) {
    const categories = ['Electromenager', 'Jeux vidéo', 'Vetements'];
    const [error, setError] = useState("");
    const { userWallet } = useUser();
    const { mintNFT } = useXRPL();
    const [isCreatingNft, setIsCreatingNft] = useState(false);
    const { uploadFileOnIPFS, pinFileOnIFPS } = useIPFS();
    const [formData, setFormData] = useState<FormFieldData>({
        images: [],
        title: '',
        description: '',
        category: '',
        price: 0,
    });

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const selectedImages = Array.from(files);
            setFormData({ ...formData, images: selectedImages });
        }
    };

    const handleSubmit = async () => {
        try {
            console.log("handlesubmit:", formData);
            const test = { test: "1", history: "4701374014210", value: 'banana' };
            console.log("test:", test);
            const jsonFile = new File([JSON.stringify(test)], "announcement.json", { type: 'application/json' });
            console.log("jsonFile:", jsonFile);

            const jsonFileCID = await uploadFileOnIPFS(jsonFile);
            console.log("jsonFileCID:", jsonFileCID);

            const isPinned = await pinFileOnIFPS(jsonFileCID);
            console.log("is json file pinned:", isPinned);

            if (isPinned !== undefined && isPinned?.length > 0 && userWallet !== undefined) {
                const newNFToken = await mintNFT(userWallet, jsonFileCID);
                console.log("is nft created ?:", newNFToken);
            }
        } catch (error) {
            console.log('error handle submit:', error);
        }
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.formContainer}>
                <h2>Create Announcement</h2>
                    <div className={styles.formGroup}>
                        <label htmlFor="images">Image</label>
                        <input
                            type="file"
                            id="images"
                            accept=".png, .jpg"
                            onChange={handleImageChange}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="description">Description</label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        ></textarea>
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="price">Price</label>
                        <input
                            type="number"
                            step="0.01"
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                        />
                    </div>
                    <div className={styles.buttonGroup}>
                        <button onClick={async () => await handleSubmit()}>Submit</button>
                        <button onClick={onClose}>Close</button>
                    </div>
            </div>
        </div>
    );
}