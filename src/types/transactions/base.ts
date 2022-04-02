import { Numeric } from '../basic';

/**
 * Enum for application transaction types.
 *
 * The full list is available at https://developer.algorand.org/docs/reference/transactions/
 */
export enum TransactionType {
  /**
   * Payment transaction
   */
  pay = 'pay',

  /**
   * Key registration transaction
   */
  keyreg = 'keyreg',

  /**
   * Asset configuration transaction
   */
  acfg = 'acfg',

  /**
   * Asset transfer transaction
   */
  axfer = 'axfer',

  /**
   * Asset freeze transaction
   */
  afrz = 'afrz',

  /**
   * Application transaction
   */
  appl = 'appl',
}

export function isTransactionType(s: string): s is TransactionType {
  return (
    s === TransactionType.pay ||
    s === TransactionType.keyreg ||
    s === TransactionType.acfg ||
    s === TransactionType.axfer ||
    s === TransactionType.afrz ||
    s === TransactionType.appl
  );
}

/**
 * Enums for application transactions on-transaction-complete behavior
 */
export enum OnApplicationComplete {
  /**
   * NoOpOC indicates that an application transaction will simply call its
   * ApprovalProgram
   */
  NoOpOC,

  /**
   * OptInOC indicates that an application transaction will allocate some
   * LocalState for the application in the sender's account
   */
  OptInOC,

  /**
   * CloseOutOC indicates that an application transaction will deallocate
   * some LocalState for the application from the user's account
   */
  CloseOutOC,

  /**
   * ClearStateOC is similar to CloseOutOC, but may never fail. This
   * allows users to reclaim their minimum balance from an application
   * they no longer wish to opt in to.
   */
  ClearStateOC,

  /**
   * UpdateApplicationOC indicates that an application transaction will
   * update the ApprovalProgram and ClearStateProgram for the application
   */
  UpdateApplicationOC,

  /**
   * DeleteApplicationOC indicates that an application transaction will
   * delete the AppParams for the application from the creator's balance
   * record
   */
  DeleteApplicationOC,
}

/**
 * A dict holding common-to-all-txns arguments
 */
export interface SuggestedParams {
  /**
   * Set this to true to specify fee as microalgos-per-txn
   *   If the final calculated fee is lower than the protocol minimum fee, the fee will be increased to match the minimum
   */
  flatFee?: boolean;

  /**
   * Integer fee per byte, in microAlgos. For a flat fee, set flatFee to true
   */
  fee: Numeric;

  /**
   * First protocol round on which this txn is valid
   */
  firstRound: Numeric;

  /**
   * Last protocol round on which this txn is valid
   */
  lastRound: Numeric;

  /**
   * Specifies genesis ID of network in use
   */
  genesisID: string;

  /**
   * Specifies hash genesis block of network in use
   */
  genesisHash: string;
}

/**
 * A full list of all available transaction parameters
 *
 * The full documentation is available at:
 * https://developer.algorand.org/docs/reference/transactions/#common-fields-header-and-type
 */
export interface TransactionParams {
  /**
   * String representation of Algorand address of sender
   */
  from: string;

  /**
   * String representation of Algorand address of recipient
   */
  to: string;

  /**
   * Integer fee per byte, in microAlgos. For a flat fee, set flatFee to true
   */
  fee: Numeric;

  /**
   * Integer amount to send
   */
  amount: Numeric;

  /**
   * Integer first protocol round on which this txn is valid
   */
  firstRound: Numeric;

  /**
   * Integer last protocol round on which this txn is valid
   */
  lastRound: Numeric;

  /**
   * Arbitrary data for sender to store
   */
  note?: Uint8Array;

  /**
   * Specifies genesis ID of network in use
   */
  genesisID: string;

  /**
   * Specifies hash genesis block of network in use
   */
  genesisHash: string;

  /**
   * Lease a transaction. The sender cannot send another txn with that same lease until the last round of original txn has passed
   */
  lease?: Uint8Array;

  /**
   * Close out remaining account balance to this account
   */
  closeRemainderTo?: string;

  /**
   * Voting key bytes. For key deregistration, leave undefined
   */
  voteKey: Uint8Array | string;

  /**
   *Selection key bytes. For key deregistration, leave undefined
   */
  selectionKey: Uint8Array | string;

  /**
   * State proof key bytes. For key deregistration, leave undefined
   */
  stateProofKey: Uint8Array | string;

  /**
   * First round on which voteKey is valid
   */
  voteFirst: Numeric;

  /**
   * Last round on which voteKey is valid
   */
  voteLast: Numeric;

  /**
   * The dilution fo the 2-level participation key
   */
  voteKeyDilution: Numeric;

  /**
   * Asset index uniquely specifying the asset
   */
  assetIndex: Numeric;

  /**
   * Total supply of the asset
   */
  assetTotal: Numeric;

  /**
   * Integer Numeric of decimals for asset unit calcuation
   */
  assetDecimals: Numeric;

  /**
   * Whether asset accounts should default to being frozen
   */
  assetDefaultFrozen: boolean;

  /**
   * String representation of Algorand address in charge of reserve, freeze, clawback, destruction, etc.
   */
  assetManager?: string;

  /**
   * String representation of Algorand address representing asset reserve
   */
  assetReserve?: string;

  /**
   * String representation of Algorand address with power to freeze/unfreeze asset holdings
   */
  assetFreeze?: string;

  /**
   * String representation of Algorand address with power to revoke asset holdings
   */
  assetClawback?: string;

  /**
   * Unit name for this asset
   */
  assetUnitName?: string;
  /**
   * Name for this asset
   */
  assetName?: string;

  /**
   * URL relating to this asset
   */
  assetURL?: string;

  /**
   * Uint8Array or UTF-8 string representation of a hash commitment with respect to the asset. Must be exactly 32 bytes long.
   */
  assetMetadataHash?: Uint8Array | string;

  /**
   * String representation of Algorand address being frozen or unfrozen
   */
  freezeAccount: string;

  /**
   * true if freezeTarget should be frozen, false if freezeTarget should be allowed to transact
   */
  freezeState: boolean;

  /**
   * String representation of Algorand address – if provided, and if "from" is
   * the asset's revocation manager, then deduct from "revocationTarget" rather than "from"
   */
  assetRevocationTarget?: string;

  /**
   * A unique application index
   */
  appIndex: Numeric;

  /**
   * What application should do once the program has been run
   */
  appOnComplete: OnApplicationComplete;

  /**
   * Restricts number of ints in per-user local state
   */
  appLocalInts: Numeric;

  /**
   * Restricts number of byte slices in per-user local state
   */
  appLocalByteSlices: Numeric;

  /**
   * Restricts number of ints in global state
   */
  appGlobalInts: Numeric;

  /**
   * Restricts number of byte slices in global state
   */
  appGlobalByteSlices: Numeric;

  /**
   * The compiled TEAL that approves a transaction
   */
  appApprovalProgram: Uint8Array;

  /**
   * The compiled TEAL program that runs when clearing state
   */
  appClearProgram: Uint8Array;

  /**
   * Array of Uint8Array, any additional arguments to the application
   */
  appArgs?: Uint8Array[];

  /**
   * Array of Address strings, any additional accounts to supply to the application
   */
  appAccounts?: string[];

  /**
   * Array of int, any other apps used by the application, identified by index
   */
  appForeignApps?: Numeric[];

  /**
   * Array of int, any assets used by the application, identified by index
   */
  appForeignAssets?: Numeric[];

  /**
   * Transaction type
   */
  type?: TransactionType;

  /**
   * Set this to true to specify fee as microalgos-per-txn.
   *
   * If the final calculated fee is lower than the protocol minimum fee, the fee will be increased to match the minimum
   */
  flatFee?: boolean;

  /**
   * A dict holding common-to-all-txns arguments
   */
  suggestedParams: SuggestedParams;

  /**
   * String representation of the Algorand address that will be used to authorize all future transactions
   */
  reKeyTo?: string;

  /**
   * Set this value to true to mark this account as nonparticipating.
   *
   * All new Algorand accounts are participating by default. This means they earn rewards.
   */
  nonParticipation?: boolean;

  /**
   * Int representing extra pages of memory to rent during an application create transaction.
   */
  extraPages?: Numeric;
}
