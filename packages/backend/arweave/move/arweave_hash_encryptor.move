module arweave_hash_encryptor_addr::arweave_hash_encryptor {
    use std::string::String;
    use std::signer;

    struct EncryptedHash has key {
        value: String,
    }

    public entry fun store_encrypted_hash(account: &signer, encrypted_hash: String) {
        move_to(account, EncryptedHash { value: encrypted_hash });
    }

    #[view]
    public fun get_encrypted_hash(account_address: address): String acquires EncryptedHash {
        assert!(exists<EncryptedHash>(account_address), 1);
        *&borrow_global<EncryptedHash>(account_address).value
    }
}
