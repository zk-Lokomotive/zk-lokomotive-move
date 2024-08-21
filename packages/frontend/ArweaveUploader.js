import React, { useState } from 'react';
import { useWallet } from '@manahippo/aptos-wallet-adapter';
import { MovementClient } from '@movementlabs/movement-sdk';
import { ethers } from 'ethers';
import { uploadFileToArweave } from '../utils/arweaveUtils';

const ArweaveUploader = ({ evmAddress, movementClient }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [arweaveHash, setArweaveHash] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState('');
    const { signAndSubmitTransaction } = useWallet();

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        setError('');
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            setError('Lütfen bir dosya seçin.');
            return;
        }

        setIsUploading(true);
        setError('');

        try {
            const hash = await uploadFileToArweave(selectedFile);
            setArweaveHash(hash);
            console.log('Arweave hash:', hash);

            const payload = {
                function: '0x1::FileTransfer::upload_to_arweave',
                type_arguments: [],
                arguments: [Date.now().toString(), hash],
            };

            const result = await signAndSubmitTransaction(payload);
            console.log('İşlem sonucu:', result);

        } catch (error) {
            console.error('Yükleme hatası:', error);
            setError('Dosya yüklenirken bir hata oluştu.');
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div>
            <h2>Arweave'e Dosya Yükle</h2>
            <input type="file" onChange={handleFileChange} disabled={isUploading} />
            <button onClick={handleUpload} disabled={!selectedFile || isUploading}>
                {isUploading ? 'Yükleniyor...' : 'Yükle'}
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {arweaveHash && (
                <div>
                    <p>Arweave Hash: {arweaveHash}</p>
                </div>
            )}
        </div>
    );
};

export default ArweaveUploader;