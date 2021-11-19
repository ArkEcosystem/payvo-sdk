import { assert, test } from "@payvo/sdk-test";
import { FeatureFlag } from "./enums";

test("FeatureFlag", () => {
	assert.equal(FeatureFlag, {
		AddressMnemonicBip39: "Address.mnemonic.bip39",
		AddressMnemonicBip44: "Address.mnemonic.bip44",
		AddressMnemonicBip49: "Address.mnemonic.bip49",
		AddressMnemonicBip84: "Address.mnemonic.bip84",
		AddressMultiSignature: "Address.multiSignature",
		AddressPrivateKey: "Address.privateKey",
		AddressPublicKey: "Address.publicKey",
		AddressSecret: "Address.secret",
		AddressValidate: "Address.validate",
		AddressWif: "Address.wif",
		ClientBroadcast: "Client.broadcast",
		ClientDelegate: "Client.delegate",
		ClientDelegates: "Client.delegates",
		ClientTransaction: "Client.transaction",
		ClientTransactions: "Client.transactions",
		ClientVoters: "Client.voters",
		ClientVotes: "Client.votes",
		ClientWallet: "Client.wallet",
		ClientWallets: "Client.wallets",
		FeeAll: "Fee.all",
		FeeCalculate: "Fee.calculate",
		KeyPairMnemonicBip39: "KeyPair.mnemonic.bip39",
		KeyPairMnemonicBip44: "KeyPair.mnemonic.bip44",
		KeyPairMnemonicBip49: "KeyPair.mnemonic.bip49",
		KeyPairMnemonicBip84: "KeyPair.mnemonic.bip84",
		KeyPairPrivateKey: "KeyPair.privateKey",
		KeyPairSecret: "KeyPair.secret",
		KeyPairWif: "KeyPair.wif",
		LedgerGetPublicKey: "Ledger.getPublicKey",
		LedgerGetVersion: "Ledger.getVersion",
		LedgerSignMessage: "Ledger.signMessage",
		LedgerSignTransaction: "Ledger.signTransaction",
		MessageSign: "Message.sign",
		MessageVerify: "Message.verify",
		PeerSearch: "Peer.search",
		PrivateKeyMnemonicBip39: "PrivateKey.mnemonic.bip39",
		PrivateKeyMnemonicBip44: "PrivateKey.mnemonic.bip44",
		PrivateKeyMnemonicBip49: "PrivateKey.mnemonic.bip49",
		PrivateKeyMnemonicBip84: "PrivateKey.mnemonic.bip84",
		PrivateKeySecret: "PrivateKey.secret",
		PrivateKeyWif: "PrivateKey.wif",
		PublicKeyMnemonicBip39: "PublicKey.mnemonic.bip39",
		PublicKeyMnemonicBip44: "PublicKey.mnemonic.bip44",
		PublicKeyMnemonicBip49: "PublicKey.mnemonic.bip49",
		PublicKeyMnemonicBip84: "PublicKey.mnemonic.bip84",
		PublicKeyMultiSignature: "PublicKey.multiSignature",
		PublicKeySecret: "PublicKey.secret",
		PublicKeyWif: "PublicKey.wif",
		TransactionDelegateRegistration: "Transaction.delegateRegistration",
		TransactionDelegateRegistrationLedgerS: "Transaction.delegateRegistration.ledgerS",
		TransactionDelegateRegistrationLedgerX: "Transaction.delegateRegistration.ledgerX",
		TransactionDelegateResignation: "Transaction.delegateResignation",
		TransactionDelegateResignationLedgerS: "Transaction.delegateResignation.ledgerS",
		TransactionDelegateResignationLedgerX: "Transaction.delegateResignation.ledgerX",
		TransactionHtlcClaim: "Transaction.htlcClaim",
		TransactionHtlcClaimLedgerS: "Transaction.htlcClaim.ledgerS",
		TransactionHtlcClaimLedgerX: "Transaction.htlcClaim.ledgerX",
		TransactionHtlcLock: "Transaction.htlcLock",
		TransactionHtlcLockLedgerS: "Transaction.htlcLock.ledgerS",
		TransactionHtlcLockLedgerX: "Transaction.htlcLock.ledgerX",
		TransactionHtlcRefund: "Transaction.htlcRefund",
		TransactionHtlcRefundLedgerS: "Transaction.htlcRefund.ledgerS",
		TransactionHtlcRefundLedgerX: "Transaction.htlcRefund.ledgerX",
		TransactionIpfs: "Transaction.ipfs",
		TransactionIpfsLedgerS: "Transaction.ipfs.ledgerS",
		TransactionIpfsLedgerX: "Transaction.ipfs.ledgerX",
		TransactionMultiPayment: "Transaction.multiPayment",
		TransactionMultiPaymentLedgerS: "Transaction.multiPayment.ledgerS",
		TransactionMultiPaymentLedgerX: "Transaction.multiPayment.ledgerX",
		TransactionMultiSignature: "Transaction.multiSignature",
		TransactionMultiSignatureLedgerS: "Transaction.multiSignature.ledgerS",
		TransactionMultiSignatureLedgerX: "Transaction.multiSignature.ledgerX",
		TransactionSecondSignature: "Transaction.secondSignature",
		TransactionSecondSignatureLedgerS: "Transaction.secondSignature.ledgerS",
		TransactionSecondSignatureLedgerX: "Transaction.secondSignature.ledgerX",
		TransactionTransfer: "Transaction.transfer",
		TransactionTransferLedgerS: "Transaction.transfer.ledgerS",
		TransactionTransferLedgerX: "Transaction.transfer.ledgerX",
		TransactionUnlockToken: "Transaction.unlockToken",
		TransactionUnlockTokenLedgerS: "Transaction.unlockToken.ledgerS",
		TransactionUnlockTokenLedgerX: "Transaction.unlockToken.ledgerX",
		TransactionVote: "Transaction.vote",
		TransactionVoteLedgerS: "Transaction.vote.ledgerS",
		TransactionVoteLedgerX: "Transaction.vote.ledgerX",
		WifMnemonicBip39: "WIF.mnemonic.bip39",
		WifMnemonicBip44: "WIF.mnemonic.bip44",
		WifMnemonicBip49: "WIF.mnemonic.bip49",
		WifMnemonicBip84: "WIF.mnemonic.bip84",
		WifSecret: "WIF.secret",
	});
});
