
// This file was generated by [tauri-specta](https://github.com/oscartbeaumont/tauri-specta). Do not edit this file manually.

/** user-defined commands **/


export const commands = {
async networkConfig() : Promise<Result<NetworkConfig, Error>> {
    try {
    return { status: "ok", data: await TAURI_INVOKE("network_config") };
} catch (e) {
    if(e instanceof Error) throw e;
    else return { status: "error", error: e  as any };
}
},
async setDiscoverPeers(discoverPeers: boolean) : Promise<Result<null, Error>> {
    try {
    return { status: "ok", data: await TAURI_INVOKE("set_discover_peers", { discoverPeers }) };
} catch (e) {
    if(e instanceof Error) throw e;
    else return { status: "error", error: e  as any };
}
},
async setTargetPeers(targetPeers: number) : Promise<Result<null, Error>> {
    try {
    return { status: "ok", data: await TAURI_INVOKE("set_target_peers", { targetPeers }) };
} catch (e) {
    if(e instanceof Error) throw e;
    else return { status: "error", error: e  as any };
}
},
async setNetworkId(networkId: string) : Promise<Result<null, Error>> {
    try {
    return { status: "ok", data: await TAURI_INVOKE("set_network_id", { networkId }) };
} catch (e) {
    if(e instanceof Error) throw e;
    else return { status: "error", error: e  as any };
}
},
async walletConfig(fingerprint: number) : Promise<Result<WalletConfig, Error>> {
    try {
    return { status: "ok", data: await TAURI_INVOKE("wallet_config", { fingerprint }) };
} catch (e) {
    if(e instanceof Error) throw e;
    else return { status: "error", error: e  as any };
}
},
async setDeriveAutomatically(fingerprint: number, deriveAutomatically: boolean) : Promise<Result<null, Error>> {
    try {
    return { status: "ok", data: await TAURI_INVOKE("set_derive_automatically", { fingerprint, deriveAutomatically }) };
} catch (e) {
    if(e instanceof Error) throw e;
    else return { status: "error", error: e  as any };
}
},
async setDerivationBatchSize(fingerprint: number, derivationBatchSize: number) : Promise<Result<null, Error>> {
    try {
    return { status: "ok", data: await TAURI_INVOKE("set_derivation_batch_size", { fingerprint, derivationBatchSize }) };
} catch (e) {
    if(e instanceof Error) throw e;
    else return { status: "error", error: e  as any };
}
},
async networkList() : Promise<Result<{ [key in string]: Network }, Error>> {
    try {
    return { status: "ok", data: await TAURI_INVOKE("network_list") };
} catch (e) {
    if(e instanceof Error) throw e;
    else return { status: "error", error: e  as any };
}
},
async activeWallet() : Promise<Result<WalletInfo | null, Error>> {
    try {
    return { status: "ok", data: await TAURI_INVOKE("active_wallet") };
} catch (e) {
    if(e instanceof Error) throw e;
    else return { status: "error", error: e  as any };
}
},
async getWalletSecrets(fingerprint: number) : Promise<Result<WalletSecrets | null, Error>> {
    try {
    return { status: "ok", data: await TAURI_INVOKE("get_wallet_secrets", { fingerprint }) };
} catch (e) {
    if(e instanceof Error) throw e;
    else return { status: "error", error: e  as any };
}
},
async walletList() : Promise<Result<WalletInfo[], Error>> {
    try {
    return { status: "ok", data: await TAURI_INVOKE("wallet_list") };
} catch (e) {
    if(e instanceof Error) throw e;
    else return { status: "error", error: e  as any };
}
},
async loginWallet(fingerprint: number) : Promise<Result<null, Error>> {
    try {
    return { status: "ok", data: await TAURI_INVOKE("login_wallet", { fingerprint }) };
} catch (e) {
    if(e instanceof Error) throw e;
    else return { status: "error", error: e  as any };
}
},
async logoutWallet() : Promise<Result<null, Error>> {
    try {
    return { status: "ok", data: await TAURI_INVOKE("logout_wallet") };
} catch (e) {
    if(e instanceof Error) throw e;
    else return { status: "error", error: e  as any };
}
},
async generateMnemonic(use24Words: boolean) : Promise<Result<string, Error>> {
    try {
    return { status: "ok", data: await TAURI_INVOKE("generate_mnemonic", { use24Words }) };
} catch (e) {
    if(e instanceof Error) throw e;
    else return { status: "error", error: e  as any };
}
},
async createWallet(name: string, mnemonic: string, saveMnemonic: boolean) : Promise<Result<null, Error>> {
    try {
    return { status: "ok", data: await TAURI_INVOKE("create_wallet", { name, mnemonic, saveMnemonic }) };
} catch (e) {
    if(e instanceof Error) throw e;
    else return { status: "error", error: e  as any };
}
},
async importWallet(name: string, key: string) : Promise<Result<null, Error>> {
    try {
    return { status: "ok", data: await TAURI_INVOKE("import_wallet", { name, key }) };
} catch (e) {
    if(e instanceof Error) throw e;
    else return { status: "error", error: e  as any };
}
},
async deleteWallet(fingerprint: number) : Promise<Result<null, Error>> {
    try {
    return { status: "ok", data: await TAURI_INVOKE("delete_wallet", { fingerprint }) };
} catch (e) {
    if(e instanceof Error) throw e;
    else return { status: "error", error: e  as any };
}
},
async renameWallet(fingerprint: number, name: string) : Promise<Result<null, Error>> {
    try {
    return { status: "ok", data: await TAURI_INVOKE("rename_wallet", { fingerprint, name }) };
} catch (e) {
    if(e instanceof Error) throw e;
    else return { status: "error", error: e  as any };
}
},
async resyncWallet(fingerprint: number) : Promise<Result<null, Error>> {
    try {
    return { status: "ok", data: await TAURI_INVOKE("resync_wallet", { fingerprint }) };
} catch (e) {
    if(e instanceof Error) throw e;
    else return { status: "error", error: e  as any };
}
},
async initialize() : Promise<Result<null, Error>> {
    try {
    return { status: "ok", data: await TAURI_INVOKE("initialize") };
} catch (e) {
    if(e instanceof Error) throw e;
    else return { status: "error", error: e  as any };
}
},
async getSyncStatus() : Promise<Result<SyncStatus, Error>> {
    try {
    return { status: "ok", data: await TAURI_INVOKE("get_sync_status") };
} catch (e) {
    if(e instanceof Error) throw e;
    else return { status: "error", error: e  as any };
}
},
async getAddresses() : Promise<Result<string[], Error>> {
    try {
    return { status: "ok", data: await TAURI_INVOKE("get_addresses") };
} catch (e) {
    if(e instanceof Error) throw e;
    else return { status: "error", error: e  as any };
}
},
async getCoins() : Promise<Result<CoinRecord[], Error>> {
    try {
    return { status: "ok", data: await TAURI_INVOKE("get_coins") };
} catch (e) {
    if(e instanceof Error) throw e;
    else return { status: "error", error: e  as any };
}
},
async getCatCoins(assetId: string) : Promise<Result<CoinRecord[], Error>> {
    try {
    return { status: "ok", data: await TAURI_INVOKE("get_cat_coins", { assetId }) };
} catch (e) {
    if(e instanceof Error) throw e;
    else return { status: "error", error: e  as any };
}
},
async getCats() : Promise<Result<CatRecord[], Error>> {
    try {
    return { status: "ok", data: await TAURI_INVOKE("get_cats") };
} catch (e) {
    if(e instanceof Error) throw e;
    else return { status: "error", error: e  as any };
}
},
async getCat(assetId: string) : Promise<Result<CatRecord | null, Error>> {
    try {
    return { status: "ok", data: await TAURI_INVOKE("get_cat", { assetId }) };
} catch (e) {
    if(e instanceof Error) throw e;
    else return { status: "error", error: e  as any };
}
},
async getDids() : Promise<Result<DidRecord[], Error>> {
    try {
    return { status: "ok", data: await TAURI_INVOKE("get_dids") };
} catch (e) {
    if(e instanceof Error) throw e;
    else return { status: "error", error: e  as any };
}
},
async getNftStatus() : Promise<Result<NftStatus, Error>> {
    try {
    return { status: "ok", data: await TAURI_INVOKE("get_nft_status") };
} catch (e) {
    if(e instanceof Error) throw e;
    else return { status: "error", error: e  as any };
}
},
async getNftCollections(request: GetNftCollections) : Promise<Result<NftCollectionRecord[], Error>> {
    try {
    return { status: "ok", data: await TAURI_INVOKE("get_nft_collections", { request }) };
} catch (e) {
    if(e instanceof Error) throw e;
    else return { status: "error", error: e  as any };
}
},
async getNftCollection(collectionId: string | null) : Promise<Result<NftCollectionRecord, Error>> {
    try {
    return { status: "ok", data: await TAURI_INVOKE("get_nft_collection", { collectionId }) };
} catch (e) {
    if(e instanceof Error) throw e;
    else return { status: "error", error: e  as any };
}
},
async getNfts(request: GetNfts) : Promise<Result<NftRecord[], Error>> {
    try {
    return { status: "ok", data: await TAURI_INVOKE("get_nfts", { request }) };
} catch (e) {
    if(e instanceof Error) throw e;
    else return { status: "error", error: e  as any };
}
},
async getNft(launcherId: string) : Promise<Result<NftInfo | null, Error>> {
    try {
    return { status: "ok", data: await TAURI_INVOKE("get_nft", { launcherId }) };
} catch (e) {
    if(e instanceof Error) throw e;
    else return { status: "error", error: e  as any };
}
},
async getCollectionNfts(request: GetCollectionNfts) : Promise<Result<NftRecord[], Error>> {
    try {
    return { status: "ok", data: await TAURI_INVOKE("get_collection_nfts", { request }) };
} catch (e) {
    if(e instanceof Error) throw e;
    else return { status: "error", error: e  as any };
}
},
async getPendingTransactions() : Promise<Result<PendingTransactionRecord[], Error>> {
    try {
    return { status: "ok", data: await TAURI_INVOKE("get_pending_transactions") };
} catch (e) {
    if(e instanceof Error) throw e;
    else return { status: "error", error: e  as any };
}
},
async validateAddress(address: string) : Promise<Result<boolean, Error>> {
    try {
    return { status: "ok", data: await TAURI_INVOKE("validate_address", { address }) };
} catch (e) {
    if(e instanceof Error) throw e;
    else return { status: "error", error: e  as any };
}
},
async updateCatInfo(record: CatRecord) : Promise<Result<null, Error>> {
    try {
    return { status: "ok", data: await TAURI_INVOKE("update_cat_info", { record }) };
} catch (e) {
    if(e instanceof Error) throw e;
    else return { status: "error", error: e  as any };
}
},
async removeCatInfo(assetId: string) : Promise<Result<null, Error>> {
    try {
    return { status: "ok", data: await TAURI_INVOKE("remove_cat_info", { assetId }) };
} catch (e) {
    if(e instanceof Error) throw e;
    else return { status: "error", error: e  as any };
}
},
async updateDid(didId: string, name: string | null, visible: boolean) : Promise<Result<null, Error>> {
    try {
    return { status: "ok", data: await TAURI_INVOKE("update_did", { didId, name, visible }) };
} catch (e) {
    if(e instanceof Error) throw e;
    else return { status: "error", error: e  as any };
}
},
async updateNft(nftId: string, visible: boolean) : Promise<Result<null, Error>> {
    try {
    return { status: "ok", data: await TAURI_INVOKE("update_nft", { nftId, visible }) };
} catch (e) {
    if(e instanceof Error) throw e;
    else return { status: "error", error: e  as any };
}
},
async send(address: string, amount: Amount, fee: Amount) : Promise<Result<TransactionSummary, Error>> {
    try {
    return { status: "ok", data: await TAURI_INVOKE("send", { address, amount, fee }) };
} catch (e) {
    if(e instanceof Error) throw e;
    else return { status: "error", error: e  as any };
}
},
async combine(coinIds: string[], fee: Amount) : Promise<Result<TransactionSummary, Error>> {
    try {
    return { status: "ok", data: await TAURI_INVOKE("combine", { coinIds, fee }) };
} catch (e) {
    if(e instanceof Error) throw e;
    else return { status: "error", error: e  as any };
}
},
async split(coinIds: string[], outputCount: number, fee: Amount) : Promise<Result<TransactionSummary, Error>> {
    try {
    return { status: "ok", data: await TAURI_INVOKE("split", { coinIds, outputCount, fee }) };
} catch (e) {
    if(e instanceof Error) throw e;
    else return { status: "error", error: e  as any };
}
},
async combineCat(coinIds: string[], fee: Amount) : Promise<Result<TransactionSummary, Error>> {
    try {
    return { status: "ok", data: await TAURI_INVOKE("combine_cat", { coinIds, fee }) };
} catch (e) {
    if(e instanceof Error) throw e;
    else return { status: "error", error: e  as any };
}
},
async splitCat(coinIds: string[], outputCount: number, fee: Amount) : Promise<Result<TransactionSummary, Error>> {
    try {
    return { status: "ok", data: await TAURI_INVOKE("split_cat", { coinIds, outputCount, fee }) };
} catch (e) {
    if(e instanceof Error) throw e;
    else return { status: "error", error: e  as any };
}
},
async issueCat(name: string, ticker: string, amount: Amount, fee: Amount) : Promise<Result<TransactionSummary, Error>> {
    try {
    return { status: "ok", data: await TAURI_INVOKE("issue_cat", { name, ticker, amount, fee }) };
} catch (e) {
    if(e instanceof Error) throw e;
    else return { status: "error", error: e  as any };
}
},
async sendCat(assetId: string, address: string, amount: Amount, fee: Amount) : Promise<Result<TransactionSummary, Error>> {
    try {
    return { status: "ok", data: await TAURI_INVOKE("send_cat", { assetId, address, amount, fee }) };
} catch (e) {
    if(e instanceof Error) throw e;
    else return { status: "error", error: e  as any };
}
},
async createDid(name: string, fee: Amount) : Promise<Result<TransactionSummary, Error>> {
    try {
    return { status: "ok", data: await TAURI_INVOKE("create_did", { name, fee }) };
} catch (e) {
    if(e instanceof Error) throw e;
    else return { status: "error", error: e  as any };
}
},
async bulkMintNfts(request: BulkMintNfts) : Promise<Result<BulkMintNftsResponse, Error>> {
    try {
    return { status: "ok", data: await TAURI_INVOKE("bulk_mint_nfts", { request }) };
} catch (e) {
    if(e instanceof Error) throw e;
    else return { status: "error", error: e  as any };
}
},
async transferNft(nftId: string, address: string, fee: Amount) : Promise<Result<TransactionSummary, Error>> {
    try {
    return { status: "ok", data: await TAURI_INVOKE("transfer_nft", { nftId, address, fee }) };
} catch (e) {
    if(e instanceof Error) throw e;
    else return { status: "error", error: e  as any };
}
},
async transferDid(didId: string, address: string, fee: Amount) : Promise<Result<TransactionSummary, Error>> {
    try {
    return { status: "ok", data: await TAURI_INVOKE("transfer_did", { didId, address, fee }) };
} catch (e) {
    if(e instanceof Error) throw e;
    else return { status: "error", error: e  as any };
}
},
async addNftUri(nftId: string, uri: string, kind: NftUriKind, fee: Amount) : Promise<Result<TransactionSummary, Error>> {
    try {
    return { status: "ok", data: await TAURI_INVOKE("add_nft_uri", { nftId, uri, kind, fee }) };
} catch (e) {
    if(e instanceof Error) throw e;
    else return { status: "error", error: e  as any };
}
},
async signTransaction(coinSpends: CoinSpendJson[]) : Promise<Result<SpendBundleJson, Error>> {
    try {
    return { status: "ok", data: await TAURI_INVOKE("sign_transaction", { coinSpends }) };
} catch (e) {
    if(e instanceof Error) throw e;
    else return { status: "error", error: e  as any };
}
},
async submitTransaction(spendBundle: SpendBundleJson) : Promise<Result<null, Error>> {
    try {
    return { status: "ok", data: await TAURI_INVOKE("submit_transaction", { spendBundle }) };
} catch (e) {
    if(e instanceof Error) throw e;
    else return { status: "error", error: e  as any };
}
},
async getPeers() : Promise<Result<PeerRecord[], Error>> {
    try {
    return { status: "ok", data: await TAURI_INVOKE("get_peers") };
} catch (e) {
    if(e instanceof Error) throw e;
    else return { status: "error", error: e  as any };
}
},
async addPeer(ip: string, trusted: boolean) : Promise<Result<null, Error>> {
    try {
    return { status: "ok", data: await TAURI_INVOKE("add_peer", { ip, trusted }) };
} catch (e) {
    if(e instanceof Error) throw e;
    else return { status: "error", error: e  as any };
}
},
async removePeer(ipAddr: string, ban: boolean) : Promise<Result<null, Error>> {
    try {
    return { status: "ok", data: await TAURI_INVOKE("remove_peer", { ipAddr, ban }) };
} catch (e) {
    if(e instanceof Error) throw e;
    else return { status: "error", error: e  as any };
}
}
}

/** user-defined events **/


export const events = __makeEvents__<{
syncEvent: SyncEvent
}>({
syncEvent: "sync-event"
})

/** user-defined constants **/



/** user-defined types **/

export type Amount = string
export type BulkMintNfts = { nft_mints: NftMint[]; did_id: string; fee: Amount }
export type BulkMintNftsResponse = { nft_ids: string[]; summary: TransactionSummary }
export type CatRecord = { asset_id: string; name: string | null; ticker: string | null; description: string | null; icon_url: string | null; visible: boolean; balance: Amount }
export type CoinJson = { parent_coin_info: string; puzzle_hash: string; amount: number }
export type CoinRecord = { coin_id: string; address: string; amount: Amount; created_height: number | null; spent_height: number | null; create_transaction_id: string | null; spend_transaction_id: string | null }
export type CoinSpendJson = { coin: CoinJson; puzzle_reveal: string; solution: string }
export type DidRecord = { launcher_id: string; name: string | null; visible: boolean; coin_id: string; address: string; amount: Amount; created_height: number | null; create_transaction_id: string | null }
export type Error = { kind: ErrorKind; reason: string }
export type ErrorKind = "Io" | "Database" | "Client" | "Keychain" | "Logging" | "Serialization" | "InvalidAddress" | "InvalidMnemonic" | "InvalidKey" | "InvalidAmount" | "InvalidRoyalty" | "InvalidAssetId" | "InvalidLauncherId" | "InsufficientFunds" | "TransactionFailed" | "UnknownNetwork" | "UnknownFingerprint" | "NotLoggedIn" | "Sync" | "Wallet"
export type GetCollectionNfts = { collection_id: string | null; offset: number; limit: number; sort_mode: NftSortMode; include_hidden: boolean }
export type GetNftCollections = { offset: number; limit: number; include_hidden: boolean }
export type GetNfts = { offset: number; limit: number; sort_mode: NftSortMode; include_hidden: boolean }
export type Input = ({ type: "unknown" } | { type: "xch" } | { type: "launcher" } | { type: "cat"; asset_id: string; name: string | null; ticker: string | null; icon_url: string | null } | { type: "did"; launcher_id: string; name: string | null } | { type: "nft"; launcher_id: string; image_data: string | null; image_mime_type: string | null; name: string | null }) & { coin_id: string; amount: Amount; address: string; outputs: Output[] }
export type Network = { default_port: number; ticker: string; address_prefix: string; precision: number; genesis_challenge: string; agg_sig_me: string; dns_introducers: string[] }
export type NetworkConfig = { network_id?: string; target_peers?: number; discover_peers?: boolean }
export type NftCollectionRecord = { collection_id: string; did_id: string; metadata_collection_id: string; visible: boolean; name: string | null; icon: string | null; nfts: number; visible_nfts: number }
export type NftInfo = { launcher_id: string; collection_id: string | null; collection_name: string | null; minter_did: string | null; owner_did: string | null; visible: boolean; coin_id: string; address: string; royalty_address: string; royalty_percent: string; data_uris: string[]; data_hash: string | null; metadata_uris: string[]; metadata_hash: string | null; license_uris: string[]; license_hash: string | null; edition_number: number | null; edition_total: number | null; created_height: number | null; data: string | null; data_mime_type: string | null; metadata: string | null }
export type NftMint = { edition_number: number | null; edition_total: number | null; data_uris: string[]; metadata_uris: string[]; license_uris: string[]; royalty_address: string | null; royalty_percent: Amount }
export type NftRecord = { launcher_id: string; collection_id: string | null; collection_name: string | null; minter_did: string | null; owner_did: string | null; visible: boolean; sensitive_content: boolean; name: string | null; created_height: number | null; data_mime_type: string | null; data: string | null }
export type NftSortMode = "name" | "recent"
export type NftStatus = { nfts: number; visible_nfts: number; collections: number; visible_collections: number }
export type NftUriKind = "data" | "metadata" | "license"
export type Output = { coin_id: string; amount: Amount; address: string; receiving: boolean; burning: boolean }
export type PeerRecord = { ip_addr: string; port: number; trusted: boolean; peak_height: number }
export type PendingTransactionRecord = { transaction_id: string; fee: Amount; submitted_at: string | null }
export type SpendBundleJson = { coin_spends: CoinSpendJson[]; aggregated_signature: string }
export type SyncEvent = { type: "start"; ip: string } | { type: "stop" } | { type: "subscribed" } | { type: "derivation" } | { type: "coin_state" } | { type: "puzzle_batch_synced" } | { type: "cat_info" } | { type: "did_info" } | { type: "nft_data" }
export type SyncStatus = { balance: Amount; unit: Unit; synced_coins: number; total_coins: number; receive_address: string; burn_address: string }
export type TransactionSummary = { fee: Amount; inputs: Input[]; coin_spends: CoinSpendJson[] }
export type Unit = { ticker: string; decimals: number }
export type WalletConfig = { name?: string; derive_automatically?: boolean; derivation_batch_size?: number }
export type WalletInfo = { name: string; fingerprint: number; public_key: string; kind: WalletKind }
export type WalletKind = "cold" | "hot"
export type WalletSecrets = { mnemonic: string | null; secret_key: string }

/** tauri-specta globals **/

import {
	invoke as TAURI_INVOKE,
	Channel as TAURI_CHANNEL,
} from "@tauri-apps/api/core";
import * as TAURI_API_EVENT from "@tauri-apps/api/event";
import { type WebviewWindow as __WebviewWindow__ } from "@tauri-apps/api/webviewWindow";

type __EventObj__<T> = {
	listen: (
		cb: TAURI_API_EVENT.EventCallback<T>,
	) => ReturnType<typeof TAURI_API_EVENT.listen<T>>;
	once: (
		cb: TAURI_API_EVENT.EventCallback<T>,
	) => ReturnType<typeof TAURI_API_EVENT.once<T>>;
	emit: T extends null
		? (payload?: T) => ReturnType<typeof TAURI_API_EVENT.emit>
		: (payload: T) => ReturnType<typeof TAURI_API_EVENT.emit>;
};

export type Result<T, E> =
	| { status: "ok"; data: T }
	| { status: "error"; error: E };

function __makeEvents__<T extends Record<string, any>>(
	mappings: Record<keyof T, string>,
) {
	return new Proxy(
		{} as unknown as {
			[K in keyof T]: __EventObj__<T[K]> & {
				(handle: __WebviewWindow__): __EventObj__<T[K]>;
			};
		},
		{
			get: (_, event) => {
				const name = mappings[event as keyof T];

				return new Proxy((() => {}) as any, {
					apply: (_, __, [window]: [__WebviewWindow__]) => ({
						listen: (arg: any) => window.listen(name, arg),
						once: (arg: any) => window.once(name, arg),
						emit: (arg: any) => window.emit(name, arg),
					}),
					get: (_, command: keyof __EventObj__<any>) => {
						switch (command) {
							case "listen":
								return (arg: any) => TAURI_API_EVENT.listen(name, arg);
							case "once":
								return (arg: any) => TAURI_API_EVENT.once(name, arg);
							case "emit":
								return (arg: any) => TAURI_API_EVENT.emit(name, arg);
						}
					},
				});
			},
		},
	);
}
