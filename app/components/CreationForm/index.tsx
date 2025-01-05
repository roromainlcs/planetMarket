import { useState } from 'react';
import styles from './styles.module.css';
import useIPFS from '@/hooks/useIPFS';
import { useUser } from '@/contexts/userContext';
import { useXRPL } from '@/contexts/xrplContext';
import { set } from 'local-storage';
import TimePicker from 'react-time-picker';
import { nftUriType } from '@/contexts/xrplContext';

interface CreationFormProps {
    onClose: () => void;
    setIsCreatingNft: (isCreatingNft: boolean) => void;
}
const CreationForm: React.FC<CreationFormProps> = ({ onClose, setIsCreatingNft }) => {
    const [error, setError] = useState("");
    const { userWallet } = useUser();
    const { mintNFT } = useXRPL();
    const [declinationFormatError, setDeclinationFormatError] = useState("");
    const [formData, setFormData] = useState<nftUriType>({
        name: '',
        discovery_date: '',
        right_ascension: '',
        declination: '',
    });

    const handleSubmit = async () => {
        if (formData.name === "" || formData.discovery_date === "" || formData.right_ascension === "" || formData.declination === "") {
            setError("Please fill all the fields");
            return;
        } else if (formData.name.length > 50) {
            setError("Name is too long");
            return;
        } else if (declinationFormatError !== "")
            return;
        try {
            setIsCreatingNft(true);
            console.log("handlesubmit:", formData);
            if (userWallet !== undefined) {
                mintNFT(userWallet, formData).then((res) => {
                console.log("is nft created ?:", res);
                setIsCreatingNft(false);
                onClose();
                });
            }
        } catch (error) {
            console.log('error handle submit:', error);
        }
    };

    function isValidDeclination (declination: string) {
        const raRegex = /^[+-]?(90(?!.*[1-9])|[0-8]?[0-9]?(\.\d+)?)(?:°|º|:|\s)\s*(60(?!.*[1-9])|[0-5]?[0-9])(?:\'|:|\s)\s*([0-5]?[0-9](\.\d+)?)(?:\")?/;
        //console.log(raRegex.test(declination));
        if (declination === "" || declination === undefined || raRegex.test(declination))
            setDeclinationFormatError("");
        else if (!raRegex.test(declination))
            setDeclinationFormatError("Declination format is not valid");
        return(true);
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.formContainer}>
                <h2>New planet</h2>
                    {/* <div className={styles.formGroup}>
                        <label className={styles.dateLabel} htmlFor="images">Images</label>
                        <input
                            type="file"
                            id="images"
                            accept=".png, .jpg"
                            onChange={handleImageChange}
                        />
                    </div> */}
                    <div className={styles.formGroup}>
                        {error !== "" && <p className={styles.errorMessage}>{error}</p>}
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                        <label htmlFor="discovery">Discovery date</label>
                        <input
                        aria-label='discovery_date'
                            type="date"
                            value={formData.discovery_date}
                            onChange={(e) => setFormData({ ...formData, discovery_date: e.target.value })}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="right_ascension">Right ascension</label>
                        <TimePicker className={styles.timePicker}
                        disableClock={true}
                        maxDetail='second'
                        value={formData.right_ascension}
                        clearIcon={null}
                        onChange={(time) => setFormData({ ...formData, right_ascension: (time !== null && time) || "00:00:00" })}/>
                        <label htmlFor="declination">declination</label>
                        <input
                            placeholder={"-62° 40\" 46.0'"}
                            type="text"
                            value={formData.declination}
                            onChange={(e) => isValidDeclination(e.target.value) && setFormData({ ...formData, declination: e.target.value })}
                        />
                        {declinationFormatError !== "" && <p className={styles.errorMessage}>{declinationFormatError}</p>}
                    </div>
                    <div className={styles.buttonGroup}>
                        <button type="submit" onClick={async () => await handleSubmit()}>Submit</button>
                        <button onClick={onClose}>Close</button>
                    </div>
            </div>
        </div>
    );
}

export default CreationForm;