import { useState } from 'react';
import styles from './styles.module.css';
import useIPFS from '@/hooks/useIPFS';

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
    const { uploadFileOnIPFS, pinFileOnIFPS, retrieveFileOnIPFS } = useIPFS();
    const [formData, setFormData] = useState<FormFieldData>({
        images: [],
        title: '',
        description: '',
        category: '',
        price: 0,
    });

    function isFormEmpty(formData: FormFieldData): boolean {
        for (const key in formData) {
            if (formData.hasOwnProperty(key)) {
                if (formData[key].toString().trim() === '') {
                    return true;
                }
            }
        }
        return false;
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const selectedImages = Array.from(files);
            setFormData({ ...formData, images: selectedImages });
        }
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (isFormEmpty(formData) || formData.price < 0.01) {
            setError("Each field of the form is mandatory")
        } else {
            console.log("formData:", formData);
            const test = { test: "1", history: "4701374014210", value: 'banana' };
            const jsonFile = new File([JSON.stringify(test)], "announcement.json", { type: 'application/json' });

            const jsonFileCID = await uploadFileOnIPFS(jsonFile);

            const isPinned = await pinFileOnIFPS(jsonFileCID);
            console.log("is json file pinned:", isPinned);
        }
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.formContainer}>
                <h2>Create Announcement</h2>
                <form onSubmit={handleSubmit}>
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
                        <label htmlFor="category">Category</label>
                        <select
                            id="category"
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        >
                            <option value="">Select a category</option>
                            {categories.map((category, index) => (
                                <option key={index} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
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
                        <button type="submit">Submit</button>
                        <button onClick={onClose}>Close</button>
                    </div>
                </form>
            </div>
        </div>
    );
}