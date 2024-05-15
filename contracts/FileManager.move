address 0x1 {
module FileManager {
    struct FileMeta {
        hash: vector<u8>,
        ipfs_link: vector<u8>,
        zero_knowledge_proof: vector<u8>,
        owner: address,
    }

    resource map<address, vector<FileMeta>> files;

    public fun add_file(account: &signer, hash: vector<u8>, ipfs_link: vector<u8>, proof: vector<u8>) {
        let file_meta = FileMeta { hash, ipfs_link, proof, Signer::address_of(account) };
        Vector::push_back(&mut borrow_global_mut<files>(Signer::address_of(account)), file_meta);
    }

    public fun get_file(account: address, file_index: u64): &FileMeta acquires files {
        let file_list = borrow_global<files>(account);
        &Vector::borrow(file_list, file_index)
    }
}
}
