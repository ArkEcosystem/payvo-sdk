import { assert, describe, test } from "@payvo/sdk-test";
import { nock } from "@payvo/sdk-test";
import { BIP32 } from "@payvo/sdk-cryptography";
import { createService } from "../test/mocking";
import { BindingType } from "./constants";
import { AddressFactory } from "./address.factory";
import * as bitcoin from "bitcoinjs-lib";

let subject;

test.before.each(async () => {
	nock.disableNetConnect();

	subject = await createService(AddressFactory, "btc.testnet", async (container) => {
		container.singleton(BindingType.AddressFactory, AddressFactory);
	});

	nock.fake("https://btc-test.payvo.com:443", { encodedQueryParams: true })
		.post(
			"/api/wallets/addresses",
			'{"addresses":["mv9pNZs3d65sjL68JueZDphWe3vHNmmSn6","mqLZY69ZjogwvFWfLEuGdFUPKeZ6JvyRj1","mwhFCM54gRxY27ynaB7xmmuuGpxATWDzXd","mjTpEuSwBh4KmKMt9pwFViTWQVZzqnWEis","mxdEAqtmiXqqczohNonMbUZP8ntYLPUUF4","miWmLw6bSSqvKDiVpM4SNKuSz5SX9kkMPA","mvRNAXLYUYhxuTdZahnw3mNtyDcxeiSt6y","mirzRVH2z9hyEVDDbv2QAMSaWjPDjFM3Na","mo6XLVZ39Pd3bkSsNjLs6iyz56qF4PYe9g","mtSQ96xauiYzz1xryvLhMNduw57Sie9LSE","mqNKx6o1P74CDDkvMoa2Jq4qcMviKYZFc1","mjr9b55DXcCLEZbqj4Z1JX2GgvZip75ge7","msZGjfGbdNDwhcH4M2UypirvxFeBS1Q8Y6","mo3dcPFguG2PacM5NUfp64k95qUzk8d6UE","n2VAVsBWCESjCaWrdZwJq3aYJr7zLQdEJ8","mytz9GeGaU7QrtGPYh7Pz9f7gihvbHKLum","muKxLoTUeCBL4czS9uaYeoWrWGcc3guyqL","mkkvJiKyYeRPZ8R4ZXv6p3aFBg28asBXZJ","muH9SVf3xvZPTpezLyH8Q6oixq4gNnoz7k","mfvGHJx8C5X7FjVaPvnkX4SLmC8XQ1xYHG","moa7w3BfHA9ENzuzBwCPMjWKWnokUDtc3P","n3rg3cRpwydmzuFF6DB33mDujFZU9xUVhS","my14NrWyUxsAir8sEWVZeDcvGEQVPo9y6m","msedyPEyejVYLWQpSarPL33MPgVzmaFEoN","mkYWa3ndp42DMryDk3R435vFW7he6rAkaN","mpNBsosQ4nvGpGzKYXahmKxtECagWyWHmB","mj4FbCdfjuhnrL47fvXqiGwtb4YA2BNmg7","n2e3aamJ9rijAWNgbhqaEhQz1gkXqVwv3H","mprAVWpzQWXfZQyCL1cXbdS5r1P6PQH7Lx","mgmACAUXLU4Y6UtK6f8FWe5v91ZV9diEYV","mtTirAvBsJnm2sN2yFxc4RbjEPKdPGZPpw","mzix3qtCtrnMPUEyi8WK6tCTjD2p8jSTER","mzLWiJBTaShRjA8aUifDiKPf2QZRk9fc9b","n2rEg9zPanYzxYd7QefY6ts4YyoVmdMUDH","mwqYEM9MreprUT7B74GMvtZoVoTS21ujja","mzmNYJg1o8W8P3dw5LwgpaMZMHBhY8dJ3f","mh6rfmwHMfk7VuBgpvjyxyfYqndvya5FJA","mphDrvh3NZzEhuUjnnfHvmXRyC4vw2rW3E","mn24hyd8P72KQH4Cw2SRwuijV9T3A5K7cZ","n4cVj1UYzqkfyKL6B4Qxwms5YGA3Fg6jzp","moHTPGxDPESt8oxqmPAavpopGUMT5rg3yx","mrwMYe7MoDEjzCSBs7RABHTkvJ1REnBSBz","mwcxFKnUf8QLCXkCAA9kNMUo8PoeE3ZNih","n1ny4eeB6brjVs9vr7hAvVfxPzebx4dXVn","mn4jAxNChyWiQTUWcWD7TkubkWnpvjgBv4","n18mAypHDvxee2E6V6AviKmnZPm1wzFE19","msGcyr9E4cDzxD9EDiPxM29cC8c7QumozJ","mhH5bnYnLJmxN2Z5tHxSeSSkNMahL4EzKs","mqYjXDpCVKMA35dfzdUYBYTQD25AWvVoiG","myvyBt3zC352JR7413McVEvAYuFqkwgqWb","n1i8xa9CRHhMPCV5pddciGpaKdL3tpDu3K","mzuxJDcbgKU6bv3gVXLJ1HdLtAyZXA31zV","mfg6im7pkgQFyuzaQSPt1KBKU9zdZnkqgy","n1ymFJTcCdCZQvrFvCKWJQWpwxVmF7YvLA","mnLovetW93Mdgo2vT5y3wYHUv6BJKgZoxb","msUTXvU96voEAVpz9KQ3fAuwaGd4FQAyrq","mkk64Ch1kKvyXpqRYmWX83yQRsy3eRTTRX","mjw6TdbDdSnfuEenqBAD65AfbsuPSZ5p9Y","mi8F4pRefaGKvVpXJsMbbo4PbBNTtvXmag","mydNPx62PcyYjRrJCS63zf2BH1xHLSXX9u","n3KBoSgDqnBQBeCnKfBjPEdxPHBnZ7xp6h","mnZAdewZ4v8Ppdh7JEEMQJtvLdeRHH1VNn","mg656eh1DVFspD15jkxXxoyi7Kv7fgMdvM","mwWnGEsATbfCS4AV5hFkXWJ2RYCQAqFJGA","mjpkTaJ9DANEdERbYYS9HuUDmgEPYYyBK9","mv9aAsmv6NdvaGoYSkmVUcLpUH9xeziP9G","n2t3VNLRR8a7tGeGiJrUM6e1meTbdw25CZ","mfxMkw5nLm5WioT77twDETR722g9SbnoZt","mzrt4ynLsVUE3osMEkdhpQGqzutQ49CWVA","mwpEVmw1Ng2mnNeiTKrvtwCn6CtN4VD99C","mnMGzAtqhkduba7Nco69Y68Ug1WznBANHY","mt1qyjuY36A6gu9qh35mXMmTEivxysP2Hk","mpJxJHWkiTd8nbPKWtoq8FxYrNeDsfXuyX","mi5td1SkrnPU8pkwkb3d9nWhCJxUzZnBXp","mjRxeSS9P3DHMwmcnkDpdK45T9Zreogd1d","mohFFiM4S5BbwUiLTBmGjNpujaUzd2jav5","mg5a3aAfN5sikYmrSdxJnM6BxG5BxaFybx","ms2PzPBBGF377CnRmN559E2NK4mK82hbYc","msrUFHvQ9TNf55PR5fRKDzK9KbjakL9wLz","mt2cmM2Umo2cSDNZX635pPJTsdJCH31gsp","mnDK5vBXuMh8t6As3YfibqGVqshj9DkGwJ","muM8F7AM7rU7a7uSBs8LS5Qj26NPVzkp7f","mqs6W2ujvSbrGyUXxsybfYxrqyHgSnbKLi","muFyoYmo7wsRzx6bZ5EReRJrQpREFbgBUU","mxyHq29pLa52X4Jghj1KvLs6mhGNDUygBH","n12EFBQ25Wh67KrBTmEjze13PyQxGUdUt5","mzrcunEFvoBPdN4N2KyDi7G4JvpMkWdtCJ","msKrmVTy99orKLdA5fPynmdY7jr2mc3uTN","mfuUcXpTzmxUag9r3hsgn89hoFDBkUCvYV","moohmKrnKUMkzt5jKwFkpUagad6o5NBrd7","mi21bYwhvLL4DSuZhiLKfDLDv7J8xyDhXA","mqzxFciGNGdAtnkyftU2XJ43oesV5V9Q1o","mhJCwNQNe5UiFSU9WnehKF2zQp4qNmhU9V","my1jQfVeHEHfjSWmbrAhQ3a1KuFemg3zvo","mqDxWKmfsGnCKj7gFDbrhQYJdUFtKxbgvL","miN3x4ZecShnV2c5RBDWVaJtiRNpQM9yBB","mwaiuRVexbNkq5n4vn95jonVLnUyCR8D1r","n1Hjmy8aSfi51VeXi9BG7Ku1tePJ6EmWQ5","mvxDAPoF63a1BmNJBmQWHjNXM6LFXtY9mU","my9uRTqts9FStbDzDGyjL4CpkCSwbN69at"]}',
		)
		.reply(
			200,
			'{"data":{"mv9pNZs3d65sjL68JueZDphWe3vHNmmSn6":true,"mqLZY69ZjogwvFWfLEuGdFUPKeZ6JvyRj1":true,"mwhFCM54gRxY27ynaB7xmmuuGpxATWDzXd":true,"mjTpEuSwBh4KmKMt9pwFViTWQVZzqnWEis":false,"mxdEAqtmiXqqczohNonMbUZP8ntYLPUUF4":false,"miWmLw6bSSqvKDiVpM4SNKuSz5SX9kkMPA":false,"mvRNAXLYUYhxuTdZahnw3mNtyDcxeiSt6y":false,"mirzRVH2z9hyEVDDbv2QAMSaWjPDjFM3Na":false,"mo6XLVZ39Pd3bkSsNjLs6iyz56qF4PYe9g":false,"mtSQ96xauiYzz1xryvLhMNduw57Sie9LSE":false,"mqNKx6o1P74CDDkvMoa2Jq4qcMviKYZFc1":false,"mjr9b55DXcCLEZbqj4Z1JX2GgvZip75ge7":false,"msZGjfGbdNDwhcH4M2UypirvxFeBS1Q8Y6":false,"mo3dcPFguG2PacM5NUfp64k95qUzk8d6UE":false,"n2VAVsBWCESjCaWrdZwJq3aYJr7zLQdEJ8":false,"mytz9GeGaU7QrtGPYh7Pz9f7gihvbHKLum":false,"muKxLoTUeCBL4czS9uaYeoWrWGcc3guyqL":false,"mkkvJiKyYeRPZ8R4ZXv6p3aFBg28asBXZJ":false,"muH9SVf3xvZPTpezLyH8Q6oixq4gNnoz7k":false,"mfvGHJx8C5X7FjVaPvnkX4SLmC8XQ1xYHG":false,"moa7w3BfHA9ENzuzBwCPMjWKWnokUDtc3P":false,"n3rg3cRpwydmzuFF6DB33mDujFZU9xUVhS":false,"my14NrWyUxsAir8sEWVZeDcvGEQVPo9y6m":false,"msedyPEyejVYLWQpSarPL33MPgVzmaFEoN":false,"mkYWa3ndp42DMryDk3R435vFW7he6rAkaN":false,"mpNBsosQ4nvGpGzKYXahmKxtECagWyWHmB":false,"mj4FbCdfjuhnrL47fvXqiGwtb4YA2BNmg7":false,"n2e3aamJ9rijAWNgbhqaEhQz1gkXqVwv3H":false,"mprAVWpzQWXfZQyCL1cXbdS5r1P6PQH7Lx":false,"mgmACAUXLU4Y6UtK6f8FWe5v91ZV9diEYV":false,"mtTirAvBsJnm2sN2yFxc4RbjEPKdPGZPpw":false,"mzix3qtCtrnMPUEyi8WK6tCTjD2p8jSTER":false,"mzLWiJBTaShRjA8aUifDiKPf2QZRk9fc9b":false,"n2rEg9zPanYzxYd7QefY6ts4YyoVmdMUDH":false,"mwqYEM9MreprUT7B74GMvtZoVoTS21ujja":false,"mzmNYJg1o8W8P3dw5LwgpaMZMHBhY8dJ3f":false,"mh6rfmwHMfk7VuBgpvjyxyfYqndvya5FJA":false,"mphDrvh3NZzEhuUjnnfHvmXRyC4vw2rW3E":false,"mn24hyd8P72KQH4Cw2SRwuijV9T3A5K7cZ":false,"n4cVj1UYzqkfyKL6B4Qxwms5YGA3Fg6jzp":false,"moHTPGxDPESt8oxqmPAavpopGUMT5rg3yx":false,"mrwMYe7MoDEjzCSBs7RABHTkvJ1REnBSBz":false,"mwcxFKnUf8QLCXkCAA9kNMUo8PoeE3ZNih":false,"n1ny4eeB6brjVs9vr7hAvVfxPzebx4dXVn":false,"mn4jAxNChyWiQTUWcWD7TkubkWnpvjgBv4":false,"n18mAypHDvxee2E6V6AviKmnZPm1wzFE19":false,"msGcyr9E4cDzxD9EDiPxM29cC8c7QumozJ":false,"mhH5bnYnLJmxN2Z5tHxSeSSkNMahL4EzKs":false,"mqYjXDpCVKMA35dfzdUYBYTQD25AWvVoiG":false,"myvyBt3zC352JR7413McVEvAYuFqkwgqWb":false,"n1i8xa9CRHhMPCV5pddciGpaKdL3tpDu3K":false,"mzuxJDcbgKU6bv3gVXLJ1HdLtAyZXA31zV":false,"mfg6im7pkgQFyuzaQSPt1KBKU9zdZnkqgy":false,"n1ymFJTcCdCZQvrFvCKWJQWpwxVmF7YvLA":false,"mnLovetW93Mdgo2vT5y3wYHUv6BJKgZoxb":false,"msUTXvU96voEAVpz9KQ3fAuwaGd4FQAyrq":false,"mkk64Ch1kKvyXpqRYmWX83yQRsy3eRTTRX":false,"mjw6TdbDdSnfuEenqBAD65AfbsuPSZ5p9Y":false,"mi8F4pRefaGKvVpXJsMbbo4PbBNTtvXmag":false,"mydNPx62PcyYjRrJCS63zf2BH1xHLSXX9u":false,"n3KBoSgDqnBQBeCnKfBjPEdxPHBnZ7xp6h":false,"mnZAdewZ4v8Ppdh7JEEMQJtvLdeRHH1VNn":false,"mg656eh1DVFspD15jkxXxoyi7Kv7fgMdvM":false,"mwWnGEsATbfCS4AV5hFkXWJ2RYCQAqFJGA":false,"mjpkTaJ9DANEdERbYYS9HuUDmgEPYYyBK9":false,"mv9aAsmv6NdvaGoYSkmVUcLpUH9xeziP9G":false,"n2t3VNLRR8a7tGeGiJrUM6e1meTbdw25CZ":false,"mfxMkw5nLm5WioT77twDETR722g9SbnoZt":false,"mzrt4ynLsVUE3osMEkdhpQGqzutQ49CWVA":false,"mwpEVmw1Ng2mnNeiTKrvtwCn6CtN4VD99C":false,"mnMGzAtqhkduba7Nco69Y68Ug1WznBANHY":false,"mt1qyjuY36A6gu9qh35mXMmTEivxysP2Hk":false,"mpJxJHWkiTd8nbPKWtoq8FxYrNeDsfXuyX":false,"mi5td1SkrnPU8pkwkb3d9nWhCJxUzZnBXp":false,"mjRxeSS9P3DHMwmcnkDpdK45T9Zreogd1d":false,"mohFFiM4S5BbwUiLTBmGjNpujaUzd2jav5":false,"mg5a3aAfN5sikYmrSdxJnM6BxG5BxaFybx":false,"ms2PzPBBGF377CnRmN559E2NK4mK82hbYc":false,"msrUFHvQ9TNf55PR5fRKDzK9KbjakL9wLz":false,"mt2cmM2Umo2cSDNZX635pPJTsdJCH31gsp":false,"mnDK5vBXuMh8t6As3YfibqGVqshj9DkGwJ":false,"muM8F7AM7rU7a7uSBs8LS5Qj26NPVzkp7f":false,"mqs6W2ujvSbrGyUXxsybfYxrqyHgSnbKLi":false,"muFyoYmo7wsRzx6bZ5EReRJrQpREFbgBUU":false,"mxyHq29pLa52X4Jghj1KvLs6mhGNDUygBH":false,"n12EFBQ25Wh67KrBTmEjze13PyQxGUdUt5":false,"mzrcunEFvoBPdN4N2KyDi7G4JvpMkWdtCJ":false,"msKrmVTy99orKLdA5fPynmdY7jr2mc3uTN":false,"mfuUcXpTzmxUag9r3hsgn89hoFDBkUCvYV":false,"moohmKrnKUMkzt5jKwFkpUagad6o5NBrd7":false,"mi21bYwhvLL4DSuZhiLKfDLDv7J8xyDhXA":false,"mqzxFciGNGdAtnkyftU2XJ43oesV5V9Q1o":false,"mhJCwNQNe5UiFSU9WnehKF2zQp4qNmhU9V":false,"my1jQfVeHEHfjSWmbrAhQ3a1KuFemg3zvo":false,"mqDxWKmfsGnCKj7gFDbrhQYJdUFtKxbgvL":false,"miN3x4ZecShnV2c5RBDWVaJtiRNpQM9yBB":false,"mwaiuRVexbNkq5n4vn95jonVLnUyCR8D1r":false,"n1Hjmy8aSfi51VeXi9BG7Ku1tePJ6EmWQ5":false,"mvxDAPoF63a1BmNJBmQWHjNXM6LFXtY9mU":false,"my9uRTqts9FStbDzDGyjL4CpkCSwbN69at":false}}',
		)
		.post(
			"/api/wallets/addresses",
			'{"addresses":["mya5ZRZi3epftGxvMP5trEfkpCFhPzMPqA","ms4Hd6b1a5TkfeWB9GJgNuFFKasfcNJ3tG","mpYRddfkDi6j6PQtMQSdzW5cWcgBAyn13b","mqwqp8LQ9KTW5z5T7Cz6bgKPYZfU295cNV","mmn4RLfCQ212uJ9J4AsCdSBpdv8Zunsv3T","my2fXCjuD171r23HDt6RdXqyTLtgNStode","mpdihF6RNDvvMUgkR6XVd4vk7bNxn1fWQ1","mgisjKNWXEQ4iTaxkqM1S6AzSk41J6GViq","mrq2jg7jZ8RFmb7ghGUNNdug1uPjJQSRjP","mhjGYmXqLWwvdNCQqTDk2u2g2pLgAyz3oY","mzP1TqX7SZQkEL6KUC93sj2HjppkEpQsJS","mmyKqrUdQY5PEnroPf3KoXA5Hz2HheYtj1","mvvoazPwCXW1ZYt9RkzWU5wqhEJYkzFSkR","mmqj1J2pyHTqeoXqYkEzamXXF24bnBepVi","mpLbymsruNuEfMjmpTNbqnXiDiBPRPMXPz","moawaywryMjx3jCMcVj1rvHk8umnQNfu3g","mvSYNLhGPZAzKsD5JGNzrvUFaoy7XvSvk7","mvYszAkFqNni1wp5KKXpzBhHWEr14wa2E6","mmYuY2CKGp8RHWzE4dEA9N9ggn8uNpPsgd","mhi6GknrHLmxmRzGbY1eQEFbrZ2k7os94w","moa77Sg1ojb6fQFRqvG83mBKDoCCCCvMuQ","mmWxZMQCWgNPP9uAHcW17jNZCGCPJ8FkLs","mzSwHhM4fFK2Z2xUr6BjjGcX9fFCk3PeMi","mrdhJHG3r5V8eFAeqa2rtNjExdAHdeAam7","mq2tFwnyYJvzgijDuLujzrBwi5NLn8hdiV","moqLkvAFW8oTWW8kxHBxouC8AHrWtUBkYU","mty52foLTDMj7CkB86cSUKdMtSARRpponG","mnH8hSsYCuYHJdPMoMNM4YshmtYbRff78i","ms6b343mjyoJwZug9JbMh8DyukWkhURY6x","mh3bUc6wzv5F4wCvh72gJ31xJfoiXuaEXx","mgS7aLWDjNDjzmoqCNDbyirFBY1Fs1YSuj","mq6AU4DDw6GXEFGiBK4y1nqK9W4P94HwyZ","mzfPgEseU1zWa8T3XGwyEoFFZE9yuN1hEv","mu4QZGhCa6xWvnMgCfZcpRmodKeiCnPrXM","n17pBjKyYrogPw8NDNVdypbCbt2B4e53AJ","mtKSHEEzm5oLevFdQH5afa5fXX3aDUTq8d","mrfvs5u1un7EHTtyQZLNqFNuCTeFVNhmsu","mvg2868L1hvtSfJubvCLGcFia2p1u66Lpg","mj4Cq6q5ByfoE9ZpvqqQS7Ls6X3yhKGnSF","mtfsBReVptQrBJRM9t6afcqZuYhxT7YTDd","muETqzJv9x9yeiEKu7ELhX3q8B3cnb21kA","msS6VdzDBYepWD6SgMtQmHUz2Zyq2WNiZZ","mtg9uwQHSJmvhYMWouesT3pMUnYmS8DA6c","mfh9EECmpnqdBgrpoZFs7ms98a2rcpLXvt","mheQGcT3SMXovQ47Rwhfupx3AZY9t1V5Cx","mmj54DT6W6Rf6WwVVg21cEbttHg88iy5Nm","mmkH9ecvncNg1JNtpdNyPj21T28AE2WEgs","mpSGyrMqKW5EQeQFXEqnZnUjCnAbzGxs8U","miYwei39kHYxAd1BRgW6hJqGgFMmAFNrUz","mgszb8nLYpVXysfnedgy4SUshcNUfpbvLK","mjnTNFXHcHcHLvbgpMFdtpc7VbTNeHN6bP","mgjjCjtzSYVjyq9hDUhwBidmMJijsShAy9","mpSe2ZvSFFBJmnZzCJ3Xg1Fw8D7rP4XexQ","mr4MZE3Hr8txpx3wsWj72dThFNwMgiiwtM","mmAUqYqCdjUpPRHkXXyrt2UTGCkk9aH5M4","n16UH9euzeJgfVb28gucEZAJJwPaSYwnuv","mwYWbp4uLMg9uQ16uYzuBxWFp5Nuey5DF5","mvTiBsGRhYQc6f6DFVvYTAN3wva9b6iz3k","mzKH7EJr9v215NVDnN1jCfrC6dQCsEf7CZ","mhXoJGLzZGDhY6H7ow5SKGgKvEPiAFt65h","mxJntKV7bQ2Ydb2GiEqFwcS2CCPiqwn5NS","mspNeiE31jptQeG1dWVzsNERbn2BFjkcBJ","mr2dhPGiWVDwbYdz5NYCbsB8f8UKYxP9gc","n12LDfjtXkbrt7ayakm79V3Z2db8TYBnSK","mxsz7M8ryrkcmpjba5Gw1b3zQnybUFQhC7","n45c4uLpTWmJG48QL5G1BXrT8cHGZSSrN2","n1TjZTwyhmTxCaEvqu3FnLZNj2ToJV7htj","mqGLob3vcS9WQQ6dtPo2c1dfhZpyD5gnAR","mk1tqhhCfcgGJD2v3PBfHgCbKvaNryFLwS","muSKNhMDNqgJFWQXrZ6TopcQBskmKL8XzM","n2rErFT26dm95id4cZkeAfbXRoTTfcBuAN","mzBGsABUb6ePNLgkh3GsbajhyZcaNkSN7f","mp8n4qvSKyfbqcfwGFjiRShjFbep21vZGz","moNRsPqShPU2Lu1mLzRCH8AHr1y1p4jeAd","mnkmEBevngZ4RSDNZjxSp9LhzxMmkPpbAS","morD5hKxsbGdQPcv6HHzSJ5CSkDVTm5bA3","n2oVKQV9BWwYH93Xi8SjHzJQNW6PcXj6Fs","mqgJXLHC8jAu3Y6x47zufGx98AVtP4nqJr","mtAEUhUjmzpFsakaVJmPjFVitweGagWu7i","muc8LSTdRwE5AnW6KxiYuEdAKTqLc3E83S","mhGjXfCSu2Trf38r8aE7SvyXJdqRTVm6w7","mjeeFqvxF3Zsz2C9hZtwMUo9Y2kupd2ESj","mydT6MpNAmUpgdrfmbEzS96DQPvNWSog98","mnNmS9xnrn5ZJwALQqsTbxrVjL5gPjE1D9","n32H2h9dqJ15d19yMpE79LoeGVTEHPgDGw","mrSDFk967B9L1KzzudutDjh37DFry66Nhx","mnA7ZTiAz3qKSxLZdPHXh5p1goWvSpQpmn","mhctYwa9SGYdhCNrUWP9ZM2gm7CEyregpW","mheT3L9RCJcQvEazGzLRGbzLCoCbdTPSpg","mnU2B6JSkBBT3oRBL4FGN3xuUx2Uj2UZbB","mkPoZ4sydswBhFw8TnHvYJrwT18ya3E6Kq","mi7ShFCXgfWghYSDEKbKMhXQPrrZoqk3NX","myJLjQB2EKLeTGVoziKLEHCTgy4XiWXBoa","mzH8DNqu1hNSdoyHM5VYRbAQWthWk6ENFe","mkBbBUsZrmZCeeAfmYQn5bPTPmKEH22pQd","mj2nECW7U8ydt9KY32ijxyNHvDhSFYZtWu","mun5PPRKGgdiv3F3uuVnDxWHJgbx6X8u1T","mmZvz6Rxdis4rYH2hE3jEGzaFcA76p4M9v","myHcAK4HGtifqYN3uatN8j6b9txe2UKUsn","mzQRJEFQikWKsfRt1HoiT7U5F5u3ESCuzN"]}',
		)
		.reply(
			200,
			'{"data":{"mya5ZRZi3epftGxvMP5trEfkpCFhPzMPqA":false,"ms4Hd6b1a5TkfeWB9GJgNuFFKasfcNJ3tG":false,"mpYRddfkDi6j6PQtMQSdzW5cWcgBAyn13b":false,"mqwqp8LQ9KTW5z5T7Cz6bgKPYZfU295cNV":false,"mmn4RLfCQ212uJ9J4AsCdSBpdv8Zunsv3T":false,"my2fXCjuD171r23HDt6RdXqyTLtgNStode":false,"mpdihF6RNDvvMUgkR6XVd4vk7bNxn1fWQ1":false,"mgisjKNWXEQ4iTaxkqM1S6AzSk41J6GViq":false,"mrq2jg7jZ8RFmb7ghGUNNdug1uPjJQSRjP":false,"mhjGYmXqLWwvdNCQqTDk2u2g2pLgAyz3oY":false,"mzP1TqX7SZQkEL6KUC93sj2HjppkEpQsJS":false,"mmyKqrUdQY5PEnroPf3KoXA5Hz2HheYtj1":false,"mvvoazPwCXW1ZYt9RkzWU5wqhEJYkzFSkR":false,"mmqj1J2pyHTqeoXqYkEzamXXF24bnBepVi":false,"mpLbymsruNuEfMjmpTNbqnXiDiBPRPMXPz":false,"moawaywryMjx3jCMcVj1rvHk8umnQNfu3g":false,"mvSYNLhGPZAzKsD5JGNzrvUFaoy7XvSvk7":false,"mvYszAkFqNni1wp5KKXpzBhHWEr14wa2E6":false,"mmYuY2CKGp8RHWzE4dEA9N9ggn8uNpPsgd":false,"mhi6GknrHLmxmRzGbY1eQEFbrZ2k7os94w":false,"moa77Sg1ojb6fQFRqvG83mBKDoCCCCvMuQ":false,"mmWxZMQCWgNPP9uAHcW17jNZCGCPJ8FkLs":false,"mzSwHhM4fFK2Z2xUr6BjjGcX9fFCk3PeMi":false,"mrdhJHG3r5V8eFAeqa2rtNjExdAHdeAam7":false,"mq2tFwnyYJvzgijDuLujzrBwi5NLn8hdiV":false,"moqLkvAFW8oTWW8kxHBxouC8AHrWtUBkYU":false,"mty52foLTDMj7CkB86cSUKdMtSARRpponG":false,"mnH8hSsYCuYHJdPMoMNM4YshmtYbRff78i":false,"ms6b343mjyoJwZug9JbMh8DyukWkhURY6x":false,"mh3bUc6wzv5F4wCvh72gJ31xJfoiXuaEXx":false,"mgS7aLWDjNDjzmoqCNDbyirFBY1Fs1YSuj":false,"mq6AU4DDw6GXEFGiBK4y1nqK9W4P94HwyZ":false,"mzfPgEseU1zWa8T3XGwyEoFFZE9yuN1hEv":false,"mu4QZGhCa6xWvnMgCfZcpRmodKeiCnPrXM":false,"n17pBjKyYrogPw8NDNVdypbCbt2B4e53AJ":false,"mtKSHEEzm5oLevFdQH5afa5fXX3aDUTq8d":false,"mrfvs5u1un7EHTtyQZLNqFNuCTeFVNhmsu":false,"mvg2868L1hvtSfJubvCLGcFia2p1u66Lpg":false,"mj4Cq6q5ByfoE9ZpvqqQS7Ls6X3yhKGnSF":false,"mtfsBReVptQrBJRM9t6afcqZuYhxT7YTDd":false,"muETqzJv9x9yeiEKu7ELhX3q8B3cnb21kA":false,"msS6VdzDBYepWD6SgMtQmHUz2Zyq2WNiZZ":false,"mtg9uwQHSJmvhYMWouesT3pMUnYmS8DA6c":false,"mfh9EECmpnqdBgrpoZFs7ms98a2rcpLXvt":false,"mheQGcT3SMXovQ47Rwhfupx3AZY9t1V5Cx":false,"mmj54DT6W6Rf6WwVVg21cEbttHg88iy5Nm":false,"mmkH9ecvncNg1JNtpdNyPj21T28AE2WEgs":false,"mpSGyrMqKW5EQeQFXEqnZnUjCnAbzGxs8U":false,"miYwei39kHYxAd1BRgW6hJqGgFMmAFNrUz":false,"mgszb8nLYpVXysfnedgy4SUshcNUfpbvLK":false,"mjnTNFXHcHcHLvbgpMFdtpc7VbTNeHN6bP":false,"mgjjCjtzSYVjyq9hDUhwBidmMJijsShAy9":false,"mpSe2ZvSFFBJmnZzCJ3Xg1Fw8D7rP4XexQ":false,"mr4MZE3Hr8txpx3wsWj72dThFNwMgiiwtM":false,"mmAUqYqCdjUpPRHkXXyrt2UTGCkk9aH5M4":false,"n16UH9euzeJgfVb28gucEZAJJwPaSYwnuv":false,"mwYWbp4uLMg9uQ16uYzuBxWFp5Nuey5DF5":false,"mvTiBsGRhYQc6f6DFVvYTAN3wva9b6iz3k":false,"mzKH7EJr9v215NVDnN1jCfrC6dQCsEf7CZ":false,"mhXoJGLzZGDhY6H7ow5SKGgKvEPiAFt65h":false,"mxJntKV7bQ2Ydb2GiEqFwcS2CCPiqwn5NS":false,"mspNeiE31jptQeG1dWVzsNERbn2BFjkcBJ":false,"mr2dhPGiWVDwbYdz5NYCbsB8f8UKYxP9gc":false,"n12LDfjtXkbrt7ayakm79V3Z2db8TYBnSK":false,"mxsz7M8ryrkcmpjba5Gw1b3zQnybUFQhC7":false,"n45c4uLpTWmJG48QL5G1BXrT8cHGZSSrN2":false,"n1TjZTwyhmTxCaEvqu3FnLZNj2ToJV7htj":false,"mqGLob3vcS9WQQ6dtPo2c1dfhZpyD5gnAR":false,"mk1tqhhCfcgGJD2v3PBfHgCbKvaNryFLwS":false,"muSKNhMDNqgJFWQXrZ6TopcQBskmKL8XzM":false,"n2rErFT26dm95id4cZkeAfbXRoTTfcBuAN":false,"mzBGsABUb6ePNLgkh3GsbajhyZcaNkSN7f":false,"mp8n4qvSKyfbqcfwGFjiRShjFbep21vZGz":false,"moNRsPqShPU2Lu1mLzRCH8AHr1y1p4jeAd":false,"mnkmEBevngZ4RSDNZjxSp9LhzxMmkPpbAS":false,"morD5hKxsbGdQPcv6HHzSJ5CSkDVTm5bA3":false,"n2oVKQV9BWwYH93Xi8SjHzJQNW6PcXj6Fs":false,"mqgJXLHC8jAu3Y6x47zufGx98AVtP4nqJr":false,"mtAEUhUjmzpFsakaVJmPjFVitweGagWu7i":false,"muc8LSTdRwE5AnW6KxiYuEdAKTqLc3E83S":false,"mhGjXfCSu2Trf38r8aE7SvyXJdqRTVm6w7":false,"mjeeFqvxF3Zsz2C9hZtwMUo9Y2kupd2ESj":false,"mydT6MpNAmUpgdrfmbEzS96DQPvNWSog98":false,"mnNmS9xnrn5ZJwALQqsTbxrVjL5gPjE1D9":false,"n32H2h9dqJ15d19yMpE79LoeGVTEHPgDGw":false,"mrSDFk967B9L1KzzudutDjh37DFry66Nhx":false,"mnA7ZTiAz3qKSxLZdPHXh5p1goWvSpQpmn":false,"mhctYwa9SGYdhCNrUWP9ZM2gm7CEyregpW":false,"mheT3L9RCJcQvEazGzLRGbzLCoCbdTPSpg":false,"mnU2B6JSkBBT3oRBL4FGN3xuUx2Uj2UZbB":false,"mkPoZ4sydswBhFw8TnHvYJrwT18ya3E6Kq":false,"mi7ShFCXgfWghYSDEKbKMhXQPrrZoqk3NX":false,"myJLjQB2EKLeTGVoziKLEHCTgy4XiWXBoa":false,"mzH8DNqu1hNSdoyHM5VYRbAQWthWk6ENFe":false,"mkBbBUsZrmZCeeAfmYQn5bPTPmKEH22pQd":false,"mj2nECW7U8ydt9KY32ijxyNHvDhSFYZtWu":false,"mun5PPRKGgdiv3F3uuVnDxWHJgbx6X8u1T":false,"mmZvz6Rxdis4rYH2hE3jEGzaFcA76p4M9v":false,"myHcAK4HGtifqYN3uatN8j6b9txe2UKUsn":false,"mzQRJEFQikWKsfRt1HoiT7U5F5u3ESCuzN":false}}',
		)
		.post(
			"/api/wallets/transactions/unspent",
			'{"addresses":["mv9pNZs3d65sjL68JueZDphWe3vHNmmSn6","mqLZY69ZjogwvFWfLEuGdFUPKeZ6JvyRj1","mwhFCM54gRxY27ynaB7xmmuuGpxATWDzXd"]}',
		)
		.reply(
			200,
			'{"data":[{"address":"mqLZY69ZjogwvFWfLEuGdFUPKeZ6JvyRj1","txId":"94336a791ade1aee7a55f0132e1c766e7272b304b805347f34a716cd0b10ebe6","outputIndex":0,"script":"76a9146bba19cd7beb53addb39ab750531668ad409474688ac","satoshis":1000000},{"address":"mv9pNZs3d65sjL68JueZDphWe3vHNmmSn6","txId":"3b182fedfbf8dca089b5ff97004e53081c6610a2eb08dd9bd8c3243a64216649","outputIndex":0,"script":"76a914a08a89d81d7a9be55a18d12f9808dcd572e2cd1c88ac","satoshis":1000000},{"address":"mwhFCM54gRxY27ynaB7xmmuuGpxATWDzXd","txId":"473f473a78f569e93ebd0955d3eb5855c888938106e8f55670c6b75ec1b44d16","outputIndex":0,"script":"76a914b17447e9524445be6572706a3ccfdc9c0e2a8ae788ac","satoshis":1000000}],"links":{"first":"https:\\/\\/btc-test.payvo.com\\/api\\/wallets\\/transactions\\/unspent?page=1","last":"https:\\/\\/btc-test.payvo.com\\/api\\/wallets\\/transactions\\/unspent?page=1","prev":null,"next":null},"meta":{"current_page":1,"from":1,"last_page":1,"links":[{"url":null,"label":"&laquo; Previous","active":false},{"url":"https:\\/\\/btc-test.payvo.com\\/api\\/wallets\\/transactions\\/unspent?page=1","label":"1","active":true},{"url":null,"label":"Next &raquo;","active":false}],"path":"https:\\/\\/btc-test.payvo.com\\/api\\/wallets\\/transactions\\/unspent","per_page":15,"to":3,"total":3}}',
		)
		.post(
			"/api/wallets/transactions/raw",
			'{"transaction_ids":["94336a791ade1aee7a55f0132e1c766e7272b304b805347f34a716cd0b10ebe6","3b182fedfbf8dca089b5ff97004e53081c6610a2eb08dd9bd8c3243a64216649","473f473a78f569e93ebd0955d3eb5855c888938106e8f55670c6b75ec1b44d16"]}',
		)
		.reply(
			200,
			'{"data":{"94336a791ade1aee7a55f0132e1c766e7272b304b805347f34a716cd0b10ebe6":"01000000000101f918cfe92daf57938655190a9c49512ed3c90880de4573698e1ad9d91b86fdd40100000000f0ffffff0340420f00000000001976a9146bba19cd7beb53addb39ab750531668ad409474688ac6002200000000000160014a7ec2786b0b69fde7fa17c91b840010a0a459a1e0000000000000000196a1768747470733a2f2f746274632e6269746170732e636f6d0247304402202e95518835663a419bb68a20bf87050d60a5f74153344c00a9f4c58059501ae20220379384577ff91409c027db710366fa5bee110b1f3e93e0dd2fe686ca8dc705bd012102d9df366a292c38fee7d741066404cff7a2a7d33d5e065a1d0618b2424e18896400000000","3b182fedfbf8dca089b5ff97004e53081c6610a2eb08dd9bd8c3243a64216649":"010000000001018fd59fca8c155ca700f8dc82c582177464409d7525a7a529495ca1af9ae565ce0100000000f0ffffff0340420f00000000001976a914a08a89d81d7a9be55a18d12f9808dcd572e2cd1c88ac3af124000000000016001426675e52bd5285e36d3d5ab451adb40748c636af0000000000000000196a1768747470733a2f2f746274632e6269746170732e636f6d024830450221009c9262185b692f625351550fa76030a6d8d48f701c2dd09feb7c48484b85e6c302205f34e1e681ac5aa0f8e4ca7552b187310e37ef7e2376600951ef27141133cb6c012102bc4a237367a011b80c98e4a93fdd056f2d630097b82d455b96b2d441889d6b0b00000000","473f473a78f569e93ebd0955d3eb5855c888938106e8f55670c6b75ec1b44d16":"01000000000101605cf9d712df4533c9a8cbbc023b4bc97921d92ee23c3e450ad380455b8990460100000000f0ffffff0340420f00000000001976a914b17447e9524445be6572706a3ccfdc9c0e2a8ae788ac6cd41f0000000000160014e81b5d8f035a3b950ad72d869be2448b023d23410000000000000000196a1768747470733a2f2f746274632e6269746170732e636f6d024730440220148c049f0f9d5c2b6d5b8a3efbe02e5953a414dc078688f55a6ac7a8612ae8800220343527bc59b13724e6878e5d79952a83f53ebfa9aae84a7a6b5342dcae0195d8012103418ce7ab05d74e5b240116672dc1b0c983d534258bbedfd676d212a33554bed500000000"}}',
		)
		.get("/api/fees")
		.reply(200, {
			data: {
				min: 0.00001074,
				avg: 0.00001,
				max: 0.00180617,
			},
		})
		.persist();
});

let walletDataHelper;

test.before.each(async () => {
	walletDataHelper = subject.walletDataHelper(
		{
			purpose: 44,
			coinType: 1,
			account: 0,
		},
		"bip44",
		BIP32.fromBase58(
			"tpubDDAvBLg1EVUWj64oWHj7yduZcKaTVFiHXP8rnmtn8zqYTQB6tG49HJiGwLako3piYC7ByEFGgxxgyFSfVN3oEi1ppr4xurYPWLxnrYeUzjx",
			bitcoin.networks.testnet,
		),
	);
});

test("should discover all used", async () => {
	assert.undefined(await walletDataHelper.discoverAllUsed());

	assert.length(walletDataHelper.discoveredSpendAddresses(), 100);
	assert.length(walletDataHelper.discoveredChangeAddresses(), 100);
});

test("should return the next change address", async () => {
	assert.undefined(await walletDataHelper.discoverAllUsed());

	assert.equal(walletDataHelper.firstUnusedChangeAddress(), {
		address: "mya5ZRZi3epftGxvMP5trEfkpCFhPzMPqA",
		path: "m/44'/1'/0'/1/0",
		status: "unused",
		publicKey: "037ee1abd7e0c84f5b79f18dbd67aed2a8e28c6b1cc431c9bbfdce1d2eb392a884",
		privateKey: undefined,
	});
});

test.run();
