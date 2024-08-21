module arweave_hash_encryptor_addr::arweave_hash_encryptor {
    use std::string::{String, utf8};
    use std::signer;
    use aptos_framework::account;
    use aptos_framework::event;

    /// Struct to store the encrypted hash of an Arweave file
    struct EncryptedHash has key {
        value: String,
    }

    /// Event emitted when a new hash is stored
    struct HashStoredEvent has drop, store {
        account_address: address,
        encrypted_hash: String,
    }

    /// Event handle for HashStoredEvent
    struct HashEventHandle has key {
        store_events: event::EventHandle<HashStoredEvent>,
    }

    /// Error codes
    const E_NOT_INITIALIZED: u64 = 1;
    const E_ALREADY_INITIALIZED: u64 = 2;

    /// Initialize the module for a given account
    public entry fun initialize(account: &signer) {
        let account_addr = signer::address_of(account);
        assert!(!exists<HashEventHandle>(account_addr), E_ALREADY_INITIALIZED);

        move_to(account, HashEventHandle {
            store_events: account::new_event_handle<HashStoredEvent>(account),
        });
    }

    /// Store an encrypted hash
    public entry fun store_encrypted_hash(account: &signer, encrypted_hash: String) acquires HashEventHandle {
        let account_addr = signer::address_of(account);
        assert!(exists<HashEventHandle>(account_addr), E_NOT_INITIALIZED);

        if (!exists<EncryptedHash>(account_addr)) {
            move_to(account, EncryptedHash { value: encrypted_hash });
        } else {
            let old_hash = borrow_global_mut<EncryptedHash>(account_addr);
            old_hash.value = encrypted_hash;
        }

        // Emit an event
        let event_handle = borrow_global_mut<HashEventHandle>(account_addr);
        event::emit_event(&mut event_handle.store_events, HashStoredEvent {
            account_address: account_addr,
            encrypted_hash,
        });
    }

    /// Get the stored encrypted hash for an account
    #[view]
    public fun get_encrypted_hash(account_address: address): String acquires EncryptedHash {
        assert!(exists<EncryptedHash>(account_address), E_NOT_INITIALIZED);
        *&borrow_global<EncryptedHash>(account_address).value
    }
}
