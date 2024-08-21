import React, { useState } from 'react';
import { uploadFileToArweave } from '../utils/utils';
import { useWallet } from '@manahippo/aptos-wallet-adapter';
import { MovementClient } from '@movementlabs/movement-sdk';

const ArweaveUploader = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [arweaveHash, setArweaveHash] = useState('');
    const { account, signAndSubmitTransaction } = useWallet();

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!selectedFile) return;

        try {
            const hash = await uploadFileToArweave(selectedFile);
            setArweaveHash(hash);
            console.log('Arweave hash:', hash);
        } catch (error) {
            console.error('Arweave yükleme hatası:', error);
        }
    };

    const handleEncryptAndTransfer = async () => {
        if (!arweaveHash || !account) return;

        const client = new MovementClient();
        await client.initialize();

        const payload = {
            function: '0x1::FileTransfer::encrypt_and_transfer',
            type_arguments: [],
            arguments: [Date.now().toString(), arweaveHash],
        };

        try {
            const result = await signAndSubmitTransaction(payload);
            console.log('İşlem sonucu:', result);
        } catch (error) {
            console.error('İşlem hatası:', error);
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Arweave'e Yükle</button>
            {arweaveHash && (
                <>
                    <p>Arweave Hash: {arweaveHash}</p>
                    <button onClick={handleEncryptAndTransfer}>Şifrele ve Transfer Et</button>
                </>
            )}
        </div>
    );
};

export default ArweaveUploader;
