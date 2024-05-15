address 0x1 {
module AccessControl {
    struct Access {
        can_download: bool,
    }

    resource map<address, map<vector<u8>, Access>> access_rights;

    public fun grant_access(file_owner: &signer, requester: address, file_hash: vector<u8>) {
        let rights = borrow_global_mut<access_rights>(Signer::address_of(file_owner));
        let access = Access { can_download: true };
        Map::insert(rights, file_hash, access);
    }

    public fun check_access(account: address, file_hash: vector<u8>): bool acquires access_rights {
        let rights = borrow_global<access_rights>(account);
        Map::contains_key(rights, file_hash)
    }
}
}
