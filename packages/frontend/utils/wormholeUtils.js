import { TokenTransfer } from '@wormhole-foundation/wormhole-sdk-ts';

export const transferViaWormhole = async (arweaveHash, destinationAddress, destinationChain) => {
    const tokenTransfer = new TokenTransfer();

    // Aptos ağı için gerekli parametreler
    const aptosChainId = 22; // Aptos zincir ID'si
    const aptosTokenBridge = '0x576410486a2da45eee6c949c995670112ddf2fbeedab20350d506328eefc9d4f'; // Aptos Token Bridge adresi

    const transferParams = {
        amount: '1', // Token miktarı (örneğin: 1 NFT)
        tokenAddress: arweaveHash, // Arweave hash'ini token adresi olarak kullan
        fromChain: aptosChainId, // Kaynak zincir olarak Aptos
        toChain: destinationChain,
        toAddress: destinationAddress,
        fromAddress: account.address, // Aptos hesap adresi
        tokenBridgeAddress: aptosTokenBridge // Aptos Token Bridge adresi
    };

    try {
        const result = await tokenTransfer.transferFromAptos(transferParams);
        return result;
    } catch (hata) {
        console.error('Wormhole transfer hatası:', hata);
        throw hata;
    }
};
