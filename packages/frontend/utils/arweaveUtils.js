import Arweave from 'arweave';

const arweave = Arweave.init({
    host: 'arweave.net',
    port: 443,
    protocol: 'https'
});

export const uploadFileToArweave = async (file) => {
    const reader = new FileReader();
    const data = await new Promise((resolve, reject) => {
        reader.onload = (event) => resolve(event.target.result);
        reader.onerror = (error) => reject(error);
        reader.readAsArrayBuffer(file);
    });

    const transaction = await arweave.createTransaction({ data: data });
    await arweave.transactions.sign(transaction);
    const response = await arweave.transactions.post(transaction);

    if (response.status === 200) {
        return transaction.id;
    } else {
        throw new Error('Arweave upload error');
    }
};
