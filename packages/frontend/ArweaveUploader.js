import React, { useState } from 'react';
import { useWallet } from '@manahippo/aptos-wallet-adapter';
import { MovementClient } from '@movementlabs/movement-sdk';
import { ethers } from 'ethers';
import { wormhole, TokenTransfer } from '@wormhole-foundation/sdk';

const ArweaveUploader = ({ evmAddress, movementClient }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [arweaveHash, setArweaveHash] = useState('');
    const [aptosAddress, setAptosAddress] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState('');
    const { signAndSubmitTransaction } = useWallet();

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        setError('');
    };

    const handleAptosAddressChange = (event) => {
        setAptosAddress(event.target.value);
    };

    const uploadToArweave = async (file) => {
        // Arweave yükleme işlemi burada gerçekleştirilecek
        // Bu örnek için basit bir hash oluşturuyoruz
        const hash = ethers.utils.id(await file.text());
        return hash;
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            setError('Lütfen bir dosya seçin.');
            return;
        }

        if (!aptosAddress) {
            setError('Lütfen bir Aptos adresi girin.');
            return;
        }

        setIsUploading(true);
        setError('');

        try {
            // Dosyayı Arweave'e yükle
            const hash = await uploadToArweave(selectedFile);
            setArweaveHash(hash);

            // Wormhole SDK'yı başlat
            const wh = await wormhole("Testnet", [evm, aptos]);

            // TokenTransfer nesnesi oluştur
            const transfer = await wh.tokenTransfer(
                wh.tokenId("Ethereum", "native"), // EVM native token
                ethers.utils.parseEther("0.01"), // Transfer miktarı
                wh.chainAddress("Ethereum", evmAddress),
                wh.chainAddress("Aptos", aptosAddress),
                true, // Otomatik teslim
                hash // Payload olarak Arweave hash'i
            );

            // Transfer işlemini başlat
            const srcTxids = await transfer.initiateTransfer(evmSigner);
            console.log("Transfer başlatıldı:", srcTxids);

            // Movement SDK kullanarak işlemi gerçekleştir
            const payload = {
                function: '0x1::FileTransfer::upload_to_arweave',
                type_arguments: [],
                arguments: [hash],
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
            <h2>Arweave'e Dosya Yükle ve Aptos'a Gönder</h2>
            <input type="file" onChange={handleFileChange} disabled={isUploading} />
            <input
                type="text"
                placeholder="Aptos Adresi"
                value={aptosAddress}
                onChange={handleAptosAddressChange}
                disabled={isUploading}
            />
            <button onClick={handleUpload} disabled={!selectedFile || !aptosAddress || isUploading}>
                {isUploading ? 'Yükleniyor...' : 'Yükle ve Gönder'}
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {arweaveHash && (
                <div>
                    <p>Arweave Hash: {arweaveHash}</p>
                    <p>Aptos'a gönderildi: {aptosAddress}</p>
                </div>
            )}
        </div>
    );
};

export default ArweaveUploader;