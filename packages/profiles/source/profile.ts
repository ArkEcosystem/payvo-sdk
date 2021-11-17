/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { AppearanceService } from "./appearance.service.js";
import { Authenticator } from "./authenticator.js";
import { CoinService } from "./coin.service.js";
import { ContactRepository } from "./contact.repository";
import {
	IAppearanceService,
	IAuthenticator,
	ICoinService,
	IContactRepository,
	ICountAggregate,
	IDataRepository,
	IExchangeTransactionRepository,
	IPasswordManager,
	IPluginRepository,
	IPortfolio,
	IProfile,
	IProfileInput,
	IProfileStatus,
	IReadWriteWallet,
	IRegistrationAggregate,
	ISettingRepository,
	ITransactionAggregate,
	IWalletAggregate,
	IWalletFactory,
	IWalletRepository,
	ProfileData,
	ProfileSetting,
} from "./contracts";
import { CountAggregate } from "./count.aggregate";
import { DataRepository } from "./data.repository";
import { ExchangeTransactionRepository } from "./exchange-transaction.repository";
import { Avatar } from "./helpers/avatar.js";
import { AttributeBag } from "./helpers/attribute-bag.js";
import { IProfileNotificationService } from "./notification.repository.contract.js";
import { ProfileNotificationService } from "./notification.service.js";
import { PasswordManager } from "./password.js";
import { PluginRepository } from "./plugin.repository";
import { Portfolio } from "./portfolio.js";
import { ProfileInitialiser } from "./profile.initialiser";
import { ProfileStatus } from "./profile.status";
import { RegistrationAggregate } from "./registration.aggregate";
import { SettingRepository } from "./setting.repository";
import { TransactionAggregate } from "./transaction.aggregate";
import { WalletAggregate } from "./wallet.aggregate";
import { WalletFactory } from "./wallet.factory";
import { WalletRepository } from "./wallet.repository";

export class Profile implements IProfile {
	/**
	 * The coin service.
	 *
	 * @type {ICoinService}
	 * @memberof Profile
	 */
	readonly #coinService: ICoinService;

	/**
	 * The portfolio service.
	 *
	 * @type {IPortfolio}
	 * @memberof Profile
	 */
	readonly #portfolio: IPortfolio;

	/**
	 * The contact repository.
	 *
	 * @type {IContactRepository}
	 * @memberof Profile
	 */
	readonly #contactRepository: IContactRepository;

	/**
	 * The data repository.
	 *
	 * @type {IDataRepository}
	 * @memberof Profile
	 */
	readonly #dataRepository: IDataRepository;

	/**
	 * The exchange transaction repository.
	 *
	 * @type {IExchangeTransactionRepository}
	 * @memberof Profile
	 */
	readonly #exchangeTransactionRepository: IExchangeTransactionRepository;

	/**
	 * The notification service.
	 *
	 * @type {IProfileNotificationService}
	 * @memberof Profile
	 */
	readonly #notificationsService: IProfileNotificationService;

	/**
	 * The plugin repository.
	 *
	 * @type {IPluginRepository}
	 * @memberof Profile
	 */
	readonly #pluginRepository: IPluginRepository;

	/**
	 * The setting repository.
	 *
	 * @type {ISettingRepository}
	 * @memberof Profile
	 */
	readonly #settingRepository: ISettingRepository;

	/**
	 * The appearance settings service.
	 *
	 * @type {IAppearanceService}
	 * @memberOf Profile
	 */
	readonly #appearanceService: IAppearanceService;

	/**
	 * The wallet factory.
	 *
	 * @type {IWalletFactory}
	 * @memberof Profile
	 */
	readonly #walletFactory: IWalletFactory;

	/**
	 * The wallet repository.
	 *
	 * @type {IWalletRepository}
	 * @memberof Profile
	 */
	readonly #walletRepository: IWalletRepository;

	/**
	 * The count aggregate service.
	 *
	 * @type {ICountAggregate}
	 * @memberof Profile
	 */
	readonly #countAggregate: ICountAggregate;

	/**
	 * The registration aggregate service.
	 *
	 * @type {IRegistrationAggregate}
	 * @memberof Profile
	 */
	readonly #registrationAggregate: IRegistrationAggregate;

	/**
	 * The transaction aggregate service.
	 *
	 * @type {ITransactionAggregate}
	 * @memberof Profile
	 */
	readonly #transactionAggregate: ITransactionAggregate;

	/**
	 * The wallet aggregate service.
	 *
	 * @type {IWalletAggregate}
	 * @memberof Profile
	 */
	readonly #walletAggregate: IWalletAggregate;

	/**
	 * The authentication service.
	 *
	 * @type {IAuthenticator}
	 * @memberof Profile
	 */
	readonly #authenticator: IAuthenticator;

	/**
	 * The password service.
	 *
	 * @type {IPasswordManager}
	 * @memberof Profile
	 */
	readonly #password: IPasswordManager;

	/**
	 * The normalised profile data.
	 *
	 * @type {AttributeBag<IProfileInput>}
	 * @memberof Profile
	 */
	readonly #attributes: AttributeBag<IProfileInput>;

	/**
	 * The status service.
	 *
	 * @type {IProfileStatus}
	 * @memberof Profile
	 */
	readonly #status: IProfileStatus;

	public constructor(data: IProfileInput) {
		this.#attributes = new AttributeBag<IProfileInput>(data);
		this.#coinService = new CoinService(new DataRepository());
		this.#portfolio = new Portfolio(this);
		this.#contactRepository = new ContactRepository(this);
		this.#dataRepository = new DataRepository();
		this.#exchangeTransactionRepository = new ExchangeTransactionRepository(this);
		this.#notificationsService = new ProfileNotificationService(this);
		this.#pluginRepository = new PluginRepository();
		this.#settingRepository = new SettingRepository(this, Object.values(ProfileSetting));
		this.#appearanceService = new AppearanceService(this);
		this.#walletFactory = new WalletFactory(this);
		this.#walletRepository = new WalletRepository(this);
		this.#countAggregate = new CountAggregate(this);
		this.#registrationAggregate = new RegistrationAggregate(this);
		this.#transactionAggregate = new TransactionAggregate(this);
		this.#walletAggregate = new WalletAggregate(this);
		this.#authenticator = new Authenticator(this);
		this.#password = new PasswordManager();
		this.#status = new ProfileStatus();
	}

	/** {@inheritDoc IProfile.id} */
	public id(): string {
		return this.#attributes.get<string>("id");
	}

	/** {@inheritDoc IProfile.name} */
	public name(): string {
		if (this.settings().missing(ProfileSetting.Name)) {
			return this.#attributes.get<string>("name");
		}

		return this.settings().get<string>(ProfileSetting.Name)!;
	}

	/** {@inheritDoc IProfile.avatar} */
	public avatar(): string {
		const avatarFromSettings: string | undefined = this.settings().get(ProfileSetting.Avatar);

		if (avatarFromSettings) {
			return avatarFromSettings;
		}

		if (this.#attributes.hasStrict("data.avatar")) {
			return this.#attributes.get<string>("avatar");
		}

		return Avatar.make(this.name());
	}

	/** {@inheritDoc IProfile.appearance} */
	public appearance(): IAppearanceService {
		return this.#appearanceService;
	}

	/** {@inheritDoc IProfile.balance} */
	public balance(): number {
		return this.walletAggregate().balance();
	}

	/** {@inheritDoc IProfile.convertedBalance} */
	public convertedBalance(): number {
		return this.walletAggregate().convertedBalance();
	}

	/** {@inheritDoc IProfile.flush} */
	public flush(): void {
		const name: string | undefined = this.settings().get(ProfileSetting.Name);

		if (name === undefined) {
			throw new Error("The name of the profile could not be found. This looks like a bug.");
		}

		new ProfileInitialiser(this).initialise(name);
	}

	/** {@inheritDoc IProfile.initialiseSettings} */
	public flushSettings(): void {
		const name: string | undefined = this.settings().get(ProfileSetting.Name);

		if (name === undefined) {
			throw new Error("The name of the profile could not be found. This looks like a bug.");
		}

		new ProfileInitialiser(this).initialiseSettings(name);
	}

	/** {@inheritDoc IProfile.coins} */
	public coins(): ICoinService {
		return this.#coinService;
	}

	/** {@inheritDoc IProfile.portfolio} */
	public portfolio(): IPortfolio {
		return this.#portfolio;
	}

	/** {@inheritDoc IProfile.contacts} */
	public contacts(): IContactRepository {
		return this.#contactRepository;
	}

	/** {@inheritDoc IProfile.data} */
	public data(): IDataRepository {
		return this.#dataRepository;
	}

	/** {@inheritDoc IProfile.exchangeTransactions} */
	public exchangeTransactions(): IExchangeTransactionRepository {
		return this.#exchangeTransactionRepository;
	}

	/** {@inheritDoc IProfile.notifications} */
	public notifications(): IProfileNotificationService {
		return this.#notificationsService;
	}

	/** {@inheritDoc IProfile.plugins} */
	public plugins(): IPluginRepository {
		return this.#pluginRepository;
	}

	/** {@inheritDoc IProfile.settings} */
	public settings(): ISettingRepository {
		return this.#settingRepository;
	}

	/** {@inheritDoc IProfile.wallets} */
	public wallets(): IWalletRepository {
		return this.#walletRepository;
	}

	/** {@inheritDoc IProfile.walletFactory} */
	public walletFactory(): IWalletFactory {
		return this.#walletFactory;
	}

	/** {@inheritDoc IProfile.countAggregate} */
	public countAggregate(): ICountAggregate {
		return this.#countAggregate;
	}

	/** {@inheritDoc IProfile.registrationAggregate} */
	public registrationAggregate(): IRegistrationAggregate {
		return this.#registrationAggregate;
	}

	/** {@inheritDoc IProfile.transactionAggregate} */
	public transactionAggregate(): ITransactionAggregate {
		return this.#transactionAggregate;
	}

	/** {@inheritDoc IProfile.walletAggregate} */
	public walletAggregate(): IWalletAggregate {
		return this.#walletAggregate;
	}

	/** {@inheritDoc IProfile.auth} */
	public auth(): IAuthenticator {
		return this.#authenticator;
	}

	/** {@inheritDoc IProfile.password} */
	public password(): IPasswordManager {
		return this.#password;
	}

	/** {@inheritDoc IProfile.status} */
	public status(): IProfileStatus {
		return this.#status;
	}

	/** {@inheritDoc IProfile.usesPassword} */
	public usesPassword(): boolean {
		return this.#attributes.hasStrict("password");
	}

	/** {@inheritDoc IProfile.hasBeenPartiallyRestored} */
	public hasBeenPartiallyRestored(): boolean {
		return (
			this.#walletRepository.values().filter((wallet: IReadWriteWallet) => wallet.hasBeenPartiallyRestored())
				.length > 0
		);
	}

	/** {@inheritDoc IProfile.getAttributes} */
	public getAttributes(): AttributeBag<IProfileInput> {
		return this.#attributes;
	}

	/** {@inheritDoc IProfile.async} */
	public async sync(): Promise<void> {
		await this.wallets().restore();
	}

	/** {@inheritDoc IProfile.markIntroductoryTutorialAsComplete} */
	public markIntroductoryTutorialAsComplete(): void {
		this.data().set(ProfileData.HasCompletedIntroductoryTutorial, true);

		this.status().markAsDirty();
	}

	/** {@inheritDoc IProfile.hasCompletedIntroductoryTutorial} */
	public hasCompletedIntroductoryTutorial(): boolean {
		return this.data().has(ProfileData.HasCompletedIntroductoryTutorial);
	}

	/** {@inheritDoc IProfile.markManualInstallationDisclaimerAsAccepted} */
	public markManualInstallationDisclaimerAsAccepted(): void {
		this.data().set(ProfileData.HasAcceptedManualInstallationDisclaimer, true);

		this.status().markAsDirty();
	}

	/** {@inheritDoc IProfile.hasAcceptedManualInstallationDisclaimer} */
	public hasAcceptedManualInstallationDisclaimer(): boolean {
		return this.data().has(ProfileData.HasAcceptedManualInstallationDisclaimer);
	}
}
