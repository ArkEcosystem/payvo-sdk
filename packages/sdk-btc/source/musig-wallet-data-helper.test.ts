import "jest-extended";

import nock from "nock";
import { IoC } from "@payvo/sdk";
import { createService } from "../test/mocking";
import { BindingType } from "./constants";
import { AddressFactory } from "./address.factory";
import MusigWalletDataHelper from "./musig-wallet-data-helper";
import { defaultNativeSegwitMusigAccountKey, rootToAccountKeys } from "./address.domain";
import { BIP32 } from "@payvo/cryptography";
import * as bitcoin from "bitcoinjs-lib";
import { musig } from "../test/fixtures/musig";

let subject: AddressFactory;

beforeEach(async () => {
	nock.disableNetConnect();

	subject = await createService(AddressFactory, "btc.testnet", async (container: IoC.Container) => {
		container.singleton(BindingType.AddressFactory, AddressFactory);
	});
});

beforeAll(() => {
	nock("https://btc-test.payvo.com:443", { encodedQueryParams: true })
		.post(
			"/api/wallets/addresses",
			'{"addresses":["tb1qzdtkhgwyqnufeuc3tq88d74plcagcryzmfwclyadxgj90kwvhpps0gu965","tb1qq57mp9ygm7d6ps9mzgelzwj806dfszw4paqzmuds8n24q9eacspq4t20kv","tb1qu74mke55g3645qz2phgvej24k4qpmq33mkywyn5yyqknh7lcag5qapfmxv","tb1qhy9td6wyklj8cf0r5y8jxefrace6txkwaqj72aumm5jn703e2geqt3y5mj","tb1quwzh2lh27rr4gr6jm9ajhgd3kl42rhmgmt7clyfl8uvyhj0msstsj44x6q","tb1qrvg0evduwlpqcegehxe67850fa6ks7m2ggmrcdfdqt0v99fr4xds6g8c25","tb1q53370mfkprpzhy3amx86jdz2dt4h6jtwy6h86z7hr5ls6yzca5hq6t380v","tb1q44w9jpfmh2lppzw5qdm967tyd52n7c38xarhz9sgzhp5nmr66tnsrel5vx","tb1ql52r8a5z0a9enjff0xze483rcdywehhcdaja2h0ska33ch3dklsq96hx5f","tb1qdl6wmannd5rrtyy7qt8rkssldr9t8l33c5dk380pzd0qnu346w9qq8x4g6","tb1qd39n5952y7ayq9saq0l8kl6dvr0zuufa62pxdk566q4qpg0kp6dqvtu4j4","tb1qj2veuskz4m5hkx4hu6m8kew2mxmer5qkx9rzqmcpp585jj3wt5eqgk055h","tb1qj0hpe62hw99cqe6q65pjg2gfp2kf5eymt536tgd548u44q433hwsa7vapp","tb1q34x3atvc8h7s5ptqthlkh6f578avnnugn8rtwpn9egmaclvy53jsescqxq","tb1qkusd957vyd0kktg7s6lw5sajm3tlr7akzhxsselxyme5hcy86uashssgcy","tb1qs92g8nqskcjtyp593tlkmqg5wprpdfpg6m4g9x7ynnxac68an38s08ahcj","tb1qhfzlatav6vvfs593ppd3gkadpgdqq575wt8ffqnh9tkjaflcse0syyv9vg","tb1qpuqj28cdaa4wdw9lma36k4nrrxqnhtvt3pq6dj6h4c4r0u43e2vsr4rw7r","tb1qvfpqldfkqmg8pczyy360uxp74a57c2224f9edrae69jc2tun749qp2yz6f","tb1qtv6kgceeedq929syhtpg3rvdkdmyjscp3ncy6pcy4jkxujlaxsuqj5v3fv","tb1qmwhu5hw4ea3ktdwj4dn04l4t5rv0zzs4t6xmpgmch8rnghtcnc6s5nrczz","tb1qx3ywunss5ewqntpy4539yjhz3453ya3y76qy64829zwdfnnslanq6mxhn8","tb1qeukh8r0jtalhu0a2y8c22qkuj5wx2lw236fgqasvsk0y5zxqj9kqruz9g0","tb1qjs33vw030f03tygudt7xccetrcggg4e4xu2lfaw2jvh5s7ehw6zscdfudy","tb1qpl3jwtug967y87k6kfkvev5dlh3kwyupjypgham3qqlu9y3f625qx8nsmz","tb1qdsvzjzw5kdg4l7ylxakrguctq2cenaqg5p6dz0swjysl74y5gnfqkn5p3z","tb1qlx7tvfd345gvenemydsfacxn7vw0smw84n2pgc9v7j90uuh0qh4q0gp7ng","tb1quqkcmznkmlrnjehnujec2fqcavnk6c9wd3jqtnhlgrpxkaup4e4qnk6xct","tb1qpega6z25a0nwft7d2wgqj45w6wzzdwafgqk99ru7rnkm8wtkysgq2588v6","tb1q7z89dpp4mv34wxy3glccha0mawvafwpwge6gjthmz7fl3skv3y0s50mtt5","tb1qs52dcvl5yeuvjt50uy5ws6f939cwcyyk5dcyhj48zu7s0ggr2pcs0rm073","tb1q53sgy4ex4qn2la2uzn5gdgn4q9fz6w6g75u0myayjd373pxdwa7q3aqut4","tb1qu0naz3tjhu0lk8v5v5qc4gakz39qlnq3w3wnjvx77f32w9vce7csmklv7w","tb1qc0phtm60v9y49z03c0ym9jthepns377072yhlwwt0xp9fxhlpguqz8z4kh","tb1qzweuvgem733ads70krmf0gk9m62rpcgupfaal36qk2d27f9zaf2sae7cmj","tb1ql8gwlsfmkq3xsrjm3ternuj4ny09ss3zfmd4zdg4ycycyywqqfcqr9cxpp","tb1qwjqg249rdrggnkhjfw4gg890ha4hxcjuhaylppfe2fvhkgtqhxpstjw3jh","tb1q5dv65q30ehx0qh749edze49xcvqsf6ylkyzyckm4u6mpxwy3f09smlsryv","tb1qwnma40s4zcrht65tpxthzvc58vq6azwj3udu6ns7uh5zvwgv8nfqv9u7k8","tb1qyxkghscsxuqwsf4hntdns3u2mxjlpnkqgux274e6ua4lgxfurvlsz0prld","tb1q4dka3shget65x0e7t4wxasgdnmxfny4ut8wpwx5mvcfpl9fhsmzqwwjl9p","tb1qaga4x68ap9rctf75ktvmjyvrry64k0gheseksr3npnkxlkkdp83q0azlrz","tb1q7scsecp5uvsajcuxl8f4g2kfdk5z5knewmms7jc8dl6kv3qmnmwq9w7ljk","tb1qqdsmqt29ylkuz92xaqm0sle3aakc6a402unwxmfkq7aue9tz47vsquyzuv","tb1q0uugyd4ccnkawj72adxs40f6649wm8dj9dkcxha83t0jhkdzletqllka25","tb1q4hm4p9vla4wm6xgf8wqqn4k3lqu2ra8l9t9hlw60vwhkvsa499ps85unuy","tb1qy06xwxefpgd69e4rr42vugug3hjc6kdww6mq3lzxjjydsj8t22qqfccvjz","tb1qcm29h84uu4ptelml57gnnv2ml762fn86rqtckcp7pjfjssnpj0lsmu56fz","tb1qw7d6yvckd0mmzmx3fhenrtn938mus79dl2t8cyqmhphcnner6v7sqntg35","tb1qvemevdm7pyseeaksea6dgp6rafczvp7z4f4evtwy3q7nkn800qfs9xvhck","tb1qdmc80qfxm7e93lcgptg7wsvhqzwp2mfamxhamthpkqrexq9rhtysqcjfvt","tb1q5lgxzhzpcv7xgu73klp2nzmdp9h085tuywkdad4x7dkuh0cjq08q6usjjw","tb1qt8xcxqxvyjha32npwlsu36yn534phy5c2dykg6dsuz3cwjh0k63q789gsx","tb1qfu9wynwjlle2etrcm7ee4yjpd5mhhk4c4dn3hrgh8666dlae8zesu32vpy","tb1qdxd8tetdnwf2j0jrxsa9ne6fd96k352svxanypfufwkx3j0d3tsqsjfywu","tb1qadwrq8ecm97ruldza8nfrnv3fx429lrfe52lgmgeh55qj2j62epsl5p3x4","tb1qjff902tq557hrppg2mnkzxk464369g280wp86z9mscwy5z5xesaq4fn9xc","tb1qtwh0r2aughuvtj3zq67pxcx4q8pnzsaw5styeehq0ffp9z0xfrlqdz7zya","tb1qymnd70ky64fesrp4gm5sjvkeg3ycly7nee9r89rryrsn547ty4jsqsxmff","tb1qrtk9mha9ck7ydudgrdyfn48ttldlk6739ekgqslendhx4ruskagqktx4vz","tb1qsttp3pd68658zvtcmhx7dzpz0l7p6nwryaqmqwn4mtjr79rzuvrskgr26d","tb1q8py2zv0qpje3cdr6zhn62ev28ps8sw5lwmdxu7kczrhpq9vndccswpswzc","tb1qpu68s278ulzp9sj6wwltj4e7ssdptmy3dvm2g7estaj5m7tg5v6sp66p0a","tb1qetuf0vpqknz9vpa47efv2fc769hlqudavn8k52tmzj95c7hed78q3v0d4h","tb1qcfw6l0d56upv77hw5dqzqu892fy87dcvlv3thy244tcya0w6d8mqklnjvg","tb1q5j5zlayztgshguc4hcdx2gyuzypw99hesl3r4eany3p9rk54ks8sm0grq6","tb1q3j0v0yv49hagax0kzefra90shrspvcssykumam2zge79ryclag3sn27uss","tb1qu4v2u6k6cjh9phz6z40kxrcwm7ljmnhl4w0ky5d7ejnyz06ddgus0xykah","tb1qhmngyjlxmywhxhe2jyl67cj7rgvxafcmhcusuzewl46uugmaw7aswqn7zz","tb1qxta2grupj8jyw6h7arpgswuhrq867w8uwd3l0a2hhdhwu33d5syqhf9frc","tb1qg3087y743kwz7l4z9edqxp9cmqsldvlvdlz0pcnzelpppcxl6v8s5vwyvk","tb1qa4gukdglrtscxw9cy86cevvqu93a43n9rvge8ksuk6jpqqmxngusx4cx7g","tb1qd85s22ky4hz0mae8jd2kv2n3gmf7yxa3scydeaey9jllvz9mavjsmupt83","tb1qcnwxgsaa7jkxwxl3yjsw6f8wdmd3c53wlsshc4yh2kv9s0vd9t7s0mzhnu","tb1q3e2p0s7ns95d0kdmwqtlax6t5qe6ua9wcjjkz7j0ljhtss6plw6syy0qza","tb1qtyghqvye3tlvka3p39yx6yy4hr8rkcac5yzlm32ryk8ks254pdmqxp9qw5","tb1qyusd3uunftjhpcl5ygp4aklnh6qgdsjznkek6epd7pt6y0tq5y8s9llm6h","tb1qda66hc47czk3z7qj709jgsm6muqzah3qq07uf5ww38rtkpng5m7szwcaqs","tb1qcksnsxfptln66dgwwgljm0ktlwh9pdcmwze8l7qr03z9gan9yshqd65fen","tb1qkggt5x6msdn26a7f4uzz2edfa9mhqhul7dzqud9gaezyz5fmwpfsj7x5ry","tb1qmkuecn6m2hq43yd7vzjq5v906f84v6cl9y32ecwcd00tt2z8zpash3s6f5","tb1qa8qzgzj3666a2dsgcskwwxjh9crgn9e7zztjlt43hcufdxuaamtq9wnfl5","tb1q8lpl0sf70ryx205qtmf8w3a40j5u4waqcjzlgllr70daam87zdzs5k2p4w","tb1qtcuqxpa86fp7lslvq3u2evpklje3jyt73m37hwrjzcnmql4vy5ps5vuasj","tb1qxfzf87txk5uknfuaw0nfu0mawveap9084ewgeu3u70z5yxs094csp5d9g0","tb1qxqehg7qaue5q2yhc73xa8s8cekswp0qvvfuajrkm42k368wgvg2s5k5h66","tb1qr7cwmue7fmmdlj526u8t5pca2d73jrcfkvvqc6l83jwm4c9jkzyqhmta8w","tb1q9xtmpmcwvudr4n07tursynk8nldpuda6ypn4q27jt2j8395mcgrq9pmu8x","tb1qcqmd9z0dsstj7han2dt8sm59qmvs47gd5h0wcccq3atxxrrmfa6q9jwekw","tb1qnv0zyfglp5e93jzsvnncmdjmy9zg9433v6wxyh9wqzgsmlehvjnq5rnscx","tb1qh0tpkurympgepwkwdsnn5n2rx2d3pehp0vxgxlpdxsgz3x5f5zyseptjp8","tb1qq3ezhqe8jzp9dh362tl9uyr0hfty9dj7ldyxlfftvuldmffaas6skrmdt9","tb1q48xf0lje9f2fl53j9mcuk3au5wy2f7569sgjlsnnuvuug5wknt5s9t8jpl","tb1qmhu3a7q4u9lml7j3ulqlt0fu33m5ay6t9jq49psgsdyc9949sx8s07npyz","tb1qun4apsdelhydazn8zjschmjqnrpxd72p72u5yetp240ujs5xzggqfqaqyk","tb1qs07snkpsaggqhqj0n3uwf49kckkl8wl202p4p67hh4e33wkwe6fsdz95ls","tb1q42pd9zegquvl0uwfpg4fjs80yn3qjw823t3n30k6vfl3j8we2gqs6u354f","tb1q6p75yzxj2pc3w46gxa0w6vqg9yftkc665adfh5d0v35rqam8vclshgjrlt","tb1qezqpes0s5sm46vf5ymctnkqp4dqgft8weakchp469g3j96l6hxxquan0hr","tb1qqr667p2ac8848f523mytzy4hfcf5m93z79s8nvmvgd8d25sk89csatqs4m"]}',
		)
		.reply(
			200,
			'{"data":{"tb1qzdtkhgwyqnufeuc3tq88d74plcagcryzmfwclyadxgj90kwvhpps0gu965":true,"tb1qq57mp9ygm7d6ps9mzgelzwj806dfszw4paqzmuds8n24q9eacspq4t20kv":true,"tb1qu74mke55g3645qz2phgvej24k4qpmq33mkywyn5yyqknh7lcag5qapfmxv":false,"tb1qhy9td6wyklj8cf0r5y8jxefrace6txkwaqj72aumm5jn703e2geqt3y5mj":false,"tb1quwzh2lh27rr4gr6jm9ajhgd3kl42rhmgmt7clyfl8uvyhj0msstsj44x6q":false,"tb1qrvg0evduwlpqcegehxe67850fa6ks7m2ggmrcdfdqt0v99fr4xds6g8c25":false,"tb1q53370mfkprpzhy3amx86jdz2dt4h6jtwy6h86z7hr5ls6yzca5hq6t380v":false,"tb1q44w9jpfmh2lppzw5qdm967tyd52n7c38xarhz9sgzhp5nmr66tnsrel5vx":false,"tb1ql52r8a5z0a9enjff0xze483rcdywehhcdaja2h0ska33ch3dklsq96hx5f":false,"tb1qdl6wmannd5rrtyy7qt8rkssldr9t8l33c5dk380pzd0qnu346w9qq8x4g6":false,"tb1qd39n5952y7ayq9saq0l8kl6dvr0zuufa62pxdk566q4qpg0kp6dqvtu4j4":false,"tb1qj2veuskz4m5hkx4hu6m8kew2mxmer5qkx9rzqmcpp585jj3wt5eqgk055h":false,"tb1qj0hpe62hw99cqe6q65pjg2gfp2kf5eymt536tgd548u44q433hwsa7vapp":false,"tb1q34x3atvc8h7s5ptqthlkh6f578avnnugn8rtwpn9egmaclvy53jsescqxq":false,"tb1qkusd957vyd0kktg7s6lw5sajm3tlr7akzhxsselxyme5hcy86uashssgcy":false,"tb1qs92g8nqskcjtyp593tlkmqg5wprpdfpg6m4g9x7ynnxac68an38s08ahcj":false,"tb1qhfzlatav6vvfs593ppd3gkadpgdqq575wt8ffqnh9tkjaflcse0syyv9vg":false,"tb1qpuqj28cdaa4wdw9lma36k4nrrxqnhtvt3pq6dj6h4c4r0u43e2vsr4rw7r":false,"tb1qvfpqldfkqmg8pczyy360uxp74a57c2224f9edrae69jc2tun749qp2yz6f":false,"tb1qtv6kgceeedq929syhtpg3rvdkdmyjscp3ncy6pcy4jkxujlaxsuqj5v3fv":false,"tb1qmwhu5hw4ea3ktdwj4dn04l4t5rv0zzs4t6xmpgmch8rnghtcnc6s5nrczz":false,"tb1qx3ywunss5ewqntpy4539yjhz3453ya3y76qy64829zwdfnnslanq6mxhn8":false,"tb1qeukh8r0jtalhu0a2y8c22qkuj5wx2lw236fgqasvsk0y5zxqj9kqruz9g0":false,"tb1qjs33vw030f03tygudt7xccetrcggg4e4xu2lfaw2jvh5s7ehw6zscdfudy":false,"tb1qpl3jwtug967y87k6kfkvev5dlh3kwyupjypgham3qqlu9y3f625qx8nsmz":false,"tb1qdsvzjzw5kdg4l7ylxakrguctq2cenaqg5p6dz0swjysl74y5gnfqkn5p3z":false,"tb1qlx7tvfd345gvenemydsfacxn7vw0smw84n2pgc9v7j90uuh0qh4q0gp7ng":false,"tb1quqkcmznkmlrnjehnujec2fqcavnk6c9wd3jqtnhlgrpxkaup4e4qnk6xct":false,"tb1qpega6z25a0nwft7d2wgqj45w6wzzdwafgqk99ru7rnkm8wtkysgq2588v6":false,"tb1q7z89dpp4mv34wxy3glccha0mawvafwpwge6gjthmz7fl3skv3y0s50mtt5":false,"tb1qs52dcvl5yeuvjt50uy5ws6f939cwcyyk5dcyhj48zu7s0ggr2pcs0rm073":false,"tb1q53sgy4ex4qn2la2uzn5gdgn4q9fz6w6g75u0myayjd373pxdwa7q3aqut4":false,"tb1qu0naz3tjhu0lk8v5v5qc4gakz39qlnq3w3wnjvx77f32w9vce7csmklv7w":false,"tb1qc0phtm60v9y49z03c0ym9jthepns377072yhlwwt0xp9fxhlpguqz8z4kh":false,"tb1qzweuvgem733ads70krmf0gk9m62rpcgupfaal36qk2d27f9zaf2sae7cmj":false,"tb1ql8gwlsfmkq3xsrjm3ternuj4ny09ss3zfmd4zdg4ycycyywqqfcqr9cxpp":false,"tb1qwjqg249rdrggnkhjfw4gg890ha4hxcjuhaylppfe2fvhkgtqhxpstjw3jh":false,"tb1q5dv65q30ehx0qh749edze49xcvqsf6ylkyzyckm4u6mpxwy3f09smlsryv":false,"tb1qwnma40s4zcrht65tpxthzvc58vq6azwj3udu6ns7uh5zvwgv8nfqv9u7k8":false,"tb1qyxkghscsxuqwsf4hntdns3u2mxjlpnkqgux274e6ua4lgxfurvlsz0prld":false,"tb1q4dka3shget65x0e7t4wxasgdnmxfny4ut8wpwx5mvcfpl9fhsmzqwwjl9p":false,"tb1qaga4x68ap9rctf75ktvmjyvrry64k0gheseksr3npnkxlkkdp83q0azlrz":false,"tb1q7scsecp5uvsajcuxl8f4g2kfdk5z5knewmms7jc8dl6kv3qmnmwq9w7ljk":false,"tb1qqdsmqt29ylkuz92xaqm0sle3aakc6a402unwxmfkq7aue9tz47vsquyzuv":false,"tb1q0uugyd4ccnkawj72adxs40f6649wm8dj9dkcxha83t0jhkdzletqllka25":false,"tb1q4hm4p9vla4wm6xgf8wqqn4k3lqu2ra8l9t9hlw60vwhkvsa499ps85unuy":false,"tb1qy06xwxefpgd69e4rr42vugug3hjc6kdww6mq3lzxjjydsj8t22qqfccvjz":false,"tb1qcm29h84uu4ptelml57gnnv2ml762fn86rqtckcp7pjfjssnpj0lsmu56fz":false,"tb1qw7d6yvckd0mmzmx3fhenrtn938mus79dl2t8cyqmhphcnner6v7sqntg35":false,"tb1qvemevdm7pyseeaksea6dgp6rafczvp7z4f4evtwy3q7nkn800qfs9xvhck":false,"tb1qdmc80qfxm7e93lcgptg7wsvhqzwp2mfamxhamthpkqrexq9rhtysqcjfvt":false,"tb1q5lgxzhzpcv7xgu73klp2nzmdp9h085tuywkdad4x7dkuh0cjq08q6usjjw":false,"tb1qt8xcxqxvyjha32npwlsu36yn534phy5c2dykg6dsuz3cwjh0k63q789gsx":false,"tb1qfu9wynwjlle2etrcm7ee4yjpd5mhhk4c4dn3hrgh8666dlae8zesu32vpy":false,"tb1qdxd8tetdnwf2j0jrxsa9ne6fd96k352svxanypfufwkx3j0d3tsqsjfywu":false,"tb1qadwrq8ecm97ruldza8nfrnv3fx429lrfe52lgmgeh55qj2j62epsl5p3x4":false,"tb1qjff902tq557hrppg2mnkzxk464369g280wp86z9mscwy5z5xesaq4fn9xc":false,"tb1qtwh0r2aughuvtj3zq67pxcx4q8pnzsaw5styeehq0ffp9z0xfrlqdz7zya":false,"tb1qymnd70ky64fesrp4gm5sjvkeg3ycly7nee9r89rryrsn547ty4jsqsxmff":false,"tb1qrtk9mha9ck7ydudgrdyfn48ttldlk6739ekgqslendhx4ruskagqktx4vz":false,"tb1qsttp3pd68658zvtcmhx7dzpz0l7p6nwryaqmqwn4mtjr79rzuvrskgr26d":false,"tb1q8py2zv0qpje3cdr6zhn62ev28ps8sw5lwmdxu7kczrhpq9vndccswpswzc":false,"tb1qpu68s278ulzp9sj6wwltj4e7ssdptmy3dvm2g7estaj5m7tg5v6sp66p0a":false,"tb1qetuf0vpqknz9vpa47efv2fc769hlqudavn8k52tmzj95c7hed78q3v0d4h":false,"tb1qcfw6l0d56upv77hw5dqzqu892fy87dcvlv3thy244tcya0w6d8mqklnjvg":false,"tb1q5j5zlayztgshguc4hcdx2gyuzypw99hesl3r4eany3p9rk54ks8sm0grq6":false,"tb1q3j0v0yv49hagax0kzefra90shrspvcssykumam2zge79ryclag3sn27uss":false,"tb1qu4v2u6k6cjh9phz6z40kxrcwm7ljmnhl4w0ky5d7ejnyz06ddgus0xykah":false,"tb1qhmngyjlxmywhxhe2jyl67cj7rgvxafcmhcusuzewl46uugmaw7aswqn7zz":false,"tb1qxta2grupj8jyw6h7arpgswuhrq867w8uwd3l0a2hhdhwu33d5syqhf9frc":false,"tb1qg3087y743kwz7l4z9edqxp9cmqsldvlvdlz0pcnzelpppcxl6v8s5vwyvk":false,"tb1qa4gukdglrtscxw9cy86cevvqu93a43n9rvge8ksuk6jpqqmxngusx4cx7g":false,"tb1qd85s22ky4hz0mae8jd2kv2n3gmf7yxa3scydeaey9jllvz9mavjsmupt83":false,"tb1qcnwxgsaa7jkxwxl3yjsw6f8wdmd3c53wlsshc4yh2kv9s0vd9t7s0mzhnu":false,"tb1q3e2p0s7ns95d0kdmwqtlax6t5qe6ua9wcjjkz7j0ljhtss6plw6syy0qza":false,"tb1qtyghqvye3tlvka3p39yx6yy4hr8rkcac5yzlm32ryk8ks254pdmqxp9qw5":false,"tb1qyusd3uunftjhpcl5ygp4aklnh6qgdsjznkek6epd7pt6y0tq5y8s9llm6h":false,"tb1qda66hc47czk3z7qj709jgsm6muqzah3qq07uf5ww38rtkpng5m7szwcaqs":false,"tb1qcksnsxfptln66dgwwgljm0ktlwh9pdcmwze8l7qr03z9gan9yshqd65fen":false,"tb1qkggt5x6msdn26a7f4uzz2edfa9mhqhul7dzqud9gaezyz5fmwpfsj7x5ry":false,"tb1qmkuecn6m2hq43yd7vzjq5v906f84v6cl9y32ecwcd00tt2z8zpash3s6f5":false,"tb1qa8qzgzj3666a2dsgcskwwxjh9crgn9e7zztjlt43hcufdxuaamtq9wnfl5":false,"tb1q8lpl0sf70ryx205qtmf8w3a40j5u4waqcjzlgllr70daam87zdzs5k2p4w":false,"tb1qtcuqxpa86fp7lslvq3u2evpklje3jyt73m37hwrjzcnmql4vy5ps5vuasj":false,"tb1qxfzf87txk5uknfuaw0nfu0mawveap9084ewgeu3u70z5yxs094csp5d9g0":false,"tb1qxqehg7qaue5q2yhc73xa8s8cekswp0qvvfuajrkm42k368wgvg2s5k5h66":false,"tb1qr7cwmue7fmmdlj526u8t5pca2d73jrcfkvvqc6l83jwm4c9jkzyqhmta8w":false,"tb1q9xtmpmcwvudr4n07tursynk8nldpuda6ypn4q27jt2j8395mcgrq9pmu8x":false,"tb1qcqmd9z0dsstj7han2dt8sm59qmvs47gd5h0wcccq3atxxrrmfa6q9jwekw":false,"tb1qnv0zyfglp5e93jzsvnncmdjmy9zg9433v6wxyh9wqzgsmlehvjnq5rnscx":false,"tb1qh0tpkurympgepwkwdsnn5n2rx2d3pehp0vxgxlpdxsgz3x5f5zyseptjp8":false,"tb1qq3ezhqe8jzp9dh362tl9uyr0hfty9dj7ldyxlfftvuldmffaas6skrmdt9":false,"tb1q48xf0lje9f2fl53j9mcuk3au5wy2f7569sgjlsnnuvuug5wknt5s9t8jpl":false,"tb1qmhu3a7q4u9lml7j3ulqlt0fu33m5ay6t9jq49psgsdyc9949sx8s07npyz":false,"tb1qun4apsdelhydazn8zjschmjqnrpxd72p72u5yetp240ujs5xzggqfqaqyk":false,"tb1qs07snkpsaggqhqj0n3uwf49kckkl8wl202p4p67hh4e33wkwe6fsdz95ls":false,"tb1q42pd9zegquvl0uwfpg4fjs80yn3qjw823t3n30k6vfl3j8we2gqs6u354f":false,"tb1q6p75yzxj2pc3w46gxa0w6vqg9yftkc665adfh5d0v35rqam8vclshgjrlt":false,"tb1qezqpes0s5sm46vf5ymctnkqp4dqgft8weakchp469g3j96l6hxxquan0hr":false,"tb1qqr667p2ac8848f523mytzy4hfcf5m93z79s8nvmvgd8d25sk89csatqs4m":false}}',
		)
		.post(
			"/api/wallets/addresses",
			'{"addresses":["tb1qsyz35zpeueuwmcjap75flg93mny2gn7v3urnnwe4k05rcnvnp4cqq7hew2","tb1q9dpf5gjwgwmdftn22tfmq4cmw3qt825nf3xgd4wkdg3ktw6z2shsa5wauj","tb1qlj3qkv9c5j5gfqgfnqjl0nkwuvw8ktq9u3ahg0du4jnde852nrcstf4cka","tb1qes5lcckv97t0umnyvwxcjh7y4lemad0utwjl4lcg54yhxkdtlgyq35hlw3","tb1qv42ern8yjn3lq9rywl4ky2kdxtk783w8vtvsf3qf4u8r9lj4cjesu9htw6","tb1q0jhddny2g66g9w9e5nnsy7a0wpmtee60tcdx5jkwd9eq408vdueqv89r3z","tb1qs4jcfl66n7kjvml04ggj4qaqsygnkzxy5fznc8tek8l9js8dda7s0dfdxd","tb1qjqtgnkr24p7snzd7tfrvaw730ncsgk8vyg9z278a8gdcw2vln7dsezhp45","tb1q5q6vxfgvfx2pnsusrhhcjda7nt34v7m5hsd3909pvvjvcxg796zq8jccdc","tb1q6y0hr6sskangsempgej9udsw6q8xqgg5m4gejhww3tl9dphyy4ks0ggefg","tb1q486z3sqhlmk50q7fwuevvle75dpezylhw9jfe8hhe0f6f4vuhu9qfhjxa2","tb1qewyw7fwzm94l4z3xvtqgr7clx0z3f0r0z8lxd9tcr8s7ps9n8gqq787nql","tb1qh62yhwxt4jlmdhjj6qg8q77evhgpsfrr0t9gkgvu7luacdjl8snsudzhxn","tb1qznlwvphh66m0j39g5mpp8fxkydxcutngsj7d9f0x42sc5s9tv5xq6rpzuc","tb1qmu92s68qtal0wkq53l4yh6q70ke28p6nzm5wux2dk3kyu3g96xvsz4cgdl","tb1qdh0r96zj7news5l64uklwp36nhglcens4tpcvr95xxureq4f7vnsgr8y5y","tb1qrrn3pzqfnw39yxfhhhprluyy357977s220r0ja2edkgkf5q70rpsj7jpex","tb1qaxxrvgyjxrcjgy06ds2ljv8hnn298nthdf4l4gjc2typ2kfu0wqqjzgr2z","tb1qdrczmglape6ag62smukzne8wuvg8c7ggkfu7azktq3vxlwjej0ksl94drz","tb1q0kpqnp2hxp4l8jckp5ppvvdvdvntd8yslsdwv760yn4f29n3n8sqhzuz29","tb1qwr3z7clyuhffdp08e0dnkq93gfdeac3m07df25y40gjuq9zgwm4qrcyfvt","tb1q82yksm7jn93k7u5y9pke3mknztrw3asux84g7dm4drvq6m4fg8tsdnjuse","tb1qqf9r2g8pm2fcwth4f566khtzwelsg2f950qhgy0gww9kfnudxjuq5xgdtn","tb1q5h9hfm9ywgkggjnaz5c93qz5kukm3lgykxf737s7veexhprzgmxqhtz7s9","tb1que7sm42cu7kmg56zj9p8jwewphtmfwm58ghrlqgud5977zkwqxkqug7hzu","tb1qp0yg4p6fzk86fr489d3arcdshgg0wz5ep7876e7n7y79kdmeg0hsmczd8j","tb1qssa4q8zj2xkmvk02pwhe6el5p3y2n8p8lffzuk82w9gne25fmqgsksd0vu","tb1qensuvjf6qyd2xc0fva07ajcc6m450h2ftp5zxmpwgcf7fggtew0sq99uf6","tb1q4stfz7f8004n3fr5ujm9vuuv3eyxz63a65zr3yddl3q77pvelutq0lznac","tb1q9n6uzs3twfnzdqspy9u3lr4ynqcwrcsyc4sjvwfns4rc4tdzp0yszvvnf0","tb1q3xqnux9pc7wxmlmezztezdrst0gqhf6l50z3xvguz2yw6ukzv6eqr4fp9v","tb1qwruumlpyrkfgm5dsy40pp3259w8vxsrz0x7dvhhape59a27sk2yq57nyzl","tb1qwjjdnmf6fndyztphs7rgq0j46hannsmzxcjyfhedwcpq0v6aszeqyclphv","tb1q0g9afx3ewsy5a5uhp9p7p4n8crcmkh69dyetr5u0radavmdshrwshzznm6","tb1qy99hykem62a70r6ahsnljkp0gfpxyykv8ex3530cvurxdm7ccwtqzdvghf","tb1qghyr3p9e40uqev09petul667lmjsrf82xg4ns5fnwtmxytm3y5wqehrl32","tb1q4xue89lc34n3j0xpfn9hjjzame387tvx7t95fhpu2e8pswneq7ascp975r","tb1qqgr4wqqt5g8qv9jmwg5p034snqfud8zgk8dj3fhxtg5mpvsnzywsl3qg9f","tb1qngx9m0rp53z2mtyavlz753cwr3mcw34ep0q2vszk7ng0ae8e5f7qurj6vs","tb1qe224f77gzgt83ukgr67ddgsu40f0u5l4vhaz43wg3k8kq9j9s5cshha5xp","tb1qz8773msdl5ns83dcefk372mwr0exrfrht8ktd9qr4y74dqwc6xnq5qrn0j","tb1q3aqr7rc9selufk4cwk969k7tu9p94zgfzfmw2dvypw3tzkpfy23sgu9n9n","tb1qrf0eg2yz8sfyldn66zztccpfy7sm75waf5ksncrau6l33qr5tgfsndj5r3","tb1qzhf2en6txh4sudtpeczwkey280rk23hhw0qpmrrzuuxjfmzynytshtd0ey","tb1q2k8wghl6q62t7hqyau0h24lewffvy9akwjcw68jfr2z2kxpazhlsw9dz9f","tb1q5hly0a5x203gwttaat0d4rqk3zy7ekmyv90yusa0vawzkcg5fj6scflj3x","tb1qxu95r2fhrqfjmnm25y4f33pcnernx64ms602ruerzjmtgufguagsc3rxu0","tb1q5e2de4t0xg3jnn988vswkake0qnvz22uqy0s0hfmk27plvzqm9zqu4vfa2","tb1q7wztc5wdw7nugw00tuemhlhjq7efjgugsdcn6sht4fhnquhu7a8szda5j7","tb1qjwxc6e50edtmhajnm7kt36rjs7els4f2mvqrwc9yzrcdz54tj34syunpyv","tb1qtwtnmx4n76tlnl5j6p7rp8t6yu32y03dngxm8ya3pwrs0jrn4sdqpvcyk4","tb1qupyyudc53knneugdz7qynrdjjane88gkw7wclm7y936gfud3n8sqyuht2l","tb1qxkl7njf7lyt9njr3tyhcxyt87y3262ayxyrz3at0c5ea9gdeaj9s8uhymq","tb1qmk8dfg7dfzn9uesxtrwgcmgkneqclw39pnycndjscr35sxlnkqyqzcvn9x","tb1q2exgm8edud2hdnngcze7n62j2n644npqlr7ffqmg35vkg25j9cjqyg5tnw","tb1q5dkpaftvvmtsyg2dx3xqats9ql056zjurz92tqa4nqr2an5ku57stp2vxf","tb1qp9sgh7rup2pf6xmj7pgc3nw833txgd3ergxqrpfcajzjzuvjsg0qqf8yad","tb1qnd7t7jkn2xy4fwjzxuq6wkkglupmdeglzl4l6veqng0hsk22969svhf5t0","tb1qftdrndcqtaalte848fkvmt5mhuy660585mug8hhz7cmzhzru2e8qvs6tts","tb1qg5vt5fsvchq6243syv0lg8m4tsfdl976mh533f8l95xe32yrpkest64k8u","tb1qfnkxkyhe6ex3dclaqlhvs4redcujw0xg6lv48m7cl2wcnqq5xcns0fplcg","tb1qwamgd8289m2y7zg9422ppa3yx0y0l066qa0qh5ct7lwxx2jddx7qtexh8c","tb1qpw3rfcmayuzpuc94wmuj6gnavu9j22fdgrn8asnly7wlmj4dl6dq9ehyhp","tb1quapjvfnhv702zr35x6g5vhrd5k5rvwl83suzr0r3kxlhysrjkytszemkml","tb1q8tgqllnasc04dc6gf9zzprm302g5ghe2hsgd3adh4xv4h8s3252qvm80cr","tb1qxs06255k2ep0hu269jtc9adfqa6p2mc79rhlc6285af03fawda6sgdqszu","tb1qutgaf4c72naj2dpp3gaywzhzx6khtw3qmdhaq8v5w858fa2gvlpqx6jj9r","tb1qelp3lh2jk95xuhr6ffm9z5cg7552kjqknymtq0ja3nq5az3wg5hs34mt05","tb1qhg4u5gadszqsve8zctx27q7eax4sw0mu06fe09992t84lqvg9aesghral4","tb1qrq2zz4yrcj7njkk94d4x2csrukp0frvrpd2njnq8kmkntetfc2hq99enkc","tb1q5xnxgjlvr2lqx79vg93hjscfdd7wpa7r3fjt2hepn6674amdm96s8jxpr9","tb1q6z83sjh07p02r7rp9ag27gyvk4z9ar69n25evqj55gusj6j2c9ssseny7v","tb1qalvh74f04fshu0ee0v0r6g6hnk5py4rxzx9dd9sy4970rnwrlaxs9l8e5z","tb1qqc0f803ytqapulw4zdc5zju42mq9ukkljd9ggr88hk8z6u30kn6smpdz6j","tb1qm7d7rruqh9gxnf3yj97xr4ayaqne38ycuhhcw4eczkng9ahglals7zve82","tb1q3puafp92tfzh5psacmq67mdf4u5qanmjj947enllxq82vqfg4e6qw5euxx","tb1q685rg422fazvptysmcy6nh3cwhmhzun6grw05kjqxvj4kf4sqvns532368","tb1q98sq5smaaxmd0edd5zxg2e0npcxuel20rp54fnd39dg2jluzeqgqngcssf","tb1q3c5lvr0k66tnt04405gaux6w9j670f2mzmmcnyylzlqdd2zqvtjqu8teds","tb1qpeda44c4f3fn2nqunsweytzkuq3xleexfxn94h7p6taa4n0uavvq3xnru6","tb1qc0puyp9n6js5edgeq95hgj4yg7c7psqwz3vfanhlndkk8pg2tphq8ss63a","tb1qpfvjq86mk48tpsjjrx2v5qjtkxxw8vzjplwwh3uy9fhnq2h5232svaxlm4","tb1q55sfpe3s0ddqh6xjzpdhpjfhqn3t8na042lpma40c4prevsyz8mspqzwn0","tb1qxlp64rgc39jcvkasdndkxdt48uyqddws875n0l627z4468eercls3k5uxs","tb1q8wpundsj7vr5p4tx5pza06s4g7f0r99xtd7euqhqy63pwafu63dq59gxem","tb1qunaqu7m3908ra7re78eu9vc74zl2rqsaxvr9qs2yqjhkumx936tsddmv7z","tb1qp4kye7xax60gqsh0wesvrq3gq2crxcqcwkjdax8rxk26qevkzrsq4fjhf7","tb1qx59mhqfwqp9gprt8qujcacmuv263w866ttuskpc9svrgk7l89j2stgpf2l","tb1qn262y3d0szjzhkg0dl287qpxkt3n9skvk7asgl5zdklakja8ahhqj5za05","tb1qxe62ljrd3uasncs5vmxk8d6qwwrcfljasjm6qsr0jkv6z8h6jg6s7p4a79","tb1qn6ev5cgcc4v0007u6xq632e77ku4w899jredy57a5mgpyvsqkeusrfrnug","tb1qvyzxerka6au4re0y02437ya2f09aad6nks36l6u6gxv3s3cxas5s8qmv6j","tb1qfhydy46auksshl893tm6crpnp4tdyhzymcns025mtuhh7pwxkgeqprvjp2","tb1qt4dp2cgklaugaax5yxhpaguy92203tajxwxhgu5vxwd6ml0r3h7qq7gznu","tb1q94e3ygwjscqntm5jw4zpwggjhnnql0eundjvzqctds920pv38w4q4jl20v","tb1qz2acgyh2hy7hk93av6750695ykjw6yw6h7300azr470my2d26ngqw6cv28","tb1qg57w722xc59xe4rsw5z7ddu825fqfa5qv3jtsmdtl3h56r9ct9ysnqftnh","tb1qm59tcqsg2kpj9ry05ldr7f5cqka9alw24npy8khsrt3qhjqjmtjsa3lzvn","tb1qut73xxg08heks0gjaxst9c8mlrydqpqdafan0r030gzsw9s9uvzqdqt0g9","tb1q4mdcnyz30j3j97mrtywwjy409l9gvgeqakwaedudctcp9gnunceqkt3lyf"]}',
		)
		.reply(
			200,
			'{"data":{"tb1qsyz35zpeueuwmcjap75flg93mny2gn7v3urnnwe4k05rcnvnp4cqq7hew2":true,"tb1q9dpf5gjwgwmdftn22tfmq4cmw3qt825nf3xgd4wkdg3ktw6z2shsa5wauj":true,"tb1qlj3qkv9c5j5gfqgfnqjl0nkwuvw8ktq9u3ahg0du4jnde852nrcstf4cka":true,"tb1qes5lcckv97t0umnyvwxcjh7y4lemad0utwjl4lcg54yhxkdtlgyq35hlw3":false,"tb1qv42ern8yjn3lq9rywl4ky2kdxtk783w8vtvsf3qf4u8r9lj4cjesu9htw6":false,"tb1q0jhddny2g66g9w9e5nnsy7a0wpmtee60tcdx5jkwd9eq408vdueqv89r3z":false,"tb1qs4jcfl66n7kjvml04ggj4qaqsygnkzxy5fznc8tek8l9js8dda7s0dfdxd":false,"tb1qjqtgnkr24p7snzd7tfrvaw730ncsgk8vyg9z278a8gdcw2vln7dsezhp45":false,"tb1q5q6vxfgvfx2pnsusrhhcjda7nt34v7m5hsd3909pvvjvcxg796zq8jccdc":false,"tb1q6y0hr6sskangsempgej9udsw6q8xqgg5m4gejhww3tl9dphyy4ks0ggefg":false,"tb1q486z3sqhlmk50q7fwuevvle75dpezylhw9jfe8hhe0f6f4vuhu9qfhjxa2":false,"tb1qewyw7fwzm94l4z3xvtqgr7clx0z3f0r0z8lxd9tcr8s7ps9n8gqq787nql":false,"tb1qh62yhwxt4jlmdhjj6qg8q77evhgpsfrr0t9gkgvu7luacdjl8snsudzhxn":false,"tb1qznlwvphh66m0j39g5mpp8fxkydxcutngsj7d9f0x42sc5s9tv5xq6rpzuc":false,"tb1qmu92s68qtal0wkq53l4yh6q70ke28p6nzm5wux2dk3kyu3g96xvsz4cgdl":false,"tb1qdh0r96zj7news5l64uklwp36nhglcens4tpcvr95xxureq4f7vnsgr8y5y":false,"tb1qrrn3pzqfnw39yxfhhhprluyy357977s220r0ja2edkgkf5q70rpsj7jpex":false,"tb1qaxxrvgyjxrcjgy06ds2ljv8hnn298nthdf4l4gjc2typ2kfu0wqqjzgr2z":false,"tb1qdrczmglape6ag62smukzne8wuvg8c7ggkfu7azktq3vxlwjej0ksl94drz":false,"tb1q0kpqnp2hxp4l8jckp5ppvvdvdvntd8yslsdwv760yn4f29n3n8sqhzuz29":false,"tb1qwr3z7clyuhffdp08e0dnkq93gfdeac3m07df25y40gjuq9zgwm4qrcyfvt":false,"tb1q82yksm7jn93k7u5y9pke3mknztrw3asux84g7dm4drvq6m4fg8tsdnjuse":false,"tb1qqf9r2g8pm2fcwth4f566khtzwelsg2f950qhgy0gww9kfnudxjuq5xgdtn":false,"tb1q5h9hfm9ywgkggjnaz5c93qz5kukm3lgykxf737s7veexhprzgmxqhtz7s9":false,"tb1que7sm42cu7kmg56zj9p8jwewphtmfwm58ghrlqgud5977zkwqxkqug7hzu":false,"tb1qp0yg4p6fzk86fr489d3arcdshgg0wz5ep7876e7n7y79kdmeg0hsmczd8j":false,"tb1qssa4q8zj2xkmvk02pwhe6el5p3y2n8p8lffzuk82w9gne25fmqgsksd0vu":false,"tb1qensuvjf6qyd2xc0fva07ajcc6m450h2ftp5zxmpwgcf7fggtew0sq99uf6":false,"tb1q4stfz7f8004n3fr5ujm9vuuv3eyxz63a65zr3yddl3q77pvelutq0lznac":false,"tb1q9n6uzs3twfnzdqspy9u3lr4ynqcwrcsyc4sjvwfns4rc4tdzp0yszvvnf0":false,"tb1q3xqnux9pc7wxmlmezztezdrst0gqhf6l50z3xvguz2yw6ukzv6eqr4fp9v":false,"tb1qwruumlpyrkfgm5dsy40pp3259w8vxsrz0x7dvhhape59a27sk2yq57nyzl":false,"tb1qwjjdnmf6fndyztphs7rgq0j46hannsmzxcjyfhedwcpq0v6aszeqyclphv":false,"tb1q0g9afx3ewsy5a5uhp9p7p4n8crcmkh69dyetr5u0radavmdshrwshzznm6":false,"tb1qy99hykem62a70r6ahsnljkp0gfpxyykv8ex3530cvurxdm7ccwtqzdvghf":false,"tb1qghyr3p9e40uqev09petul667lmjsrf82xg4ns5fnwtmxytm3y5wqehrl32":false,"tb1q4xue89lc34n3j0xpfn9hjjzame387tvx7t95fhpu2e8pswneq7ascp975r":false,"tb1qqgr4wqqt5g8qv9jmwg5p034snqfud8zgk8dj3fhxtg5mpvsnzywsl3qg9f":false,"tb1qngx9m0rp53z2mtyavlz753cwr3mcw34ep0q2vszk7ng0ae8e5f7qurj6vs":false,"tb1qe224f77gzgt83ukgr67ddgsu40f0u5l4vhaz43wg3k8kq9j9s5cshha5xp":false,"tb1qz8773msdl5ns83dcefk372mwr0exrfrht8ktd9qr4y74dqwc6xnq5qrn0j":false,"tb1q3aqr7rc9selufk4cwk969k7tu9p94zgfzfmw2dvypw3tzkpfy23sgu9n9n":false,"tb1qrf0eg2yz8sfyldn66zztccpfy7sm75waf5ksncrau6l33qr5tgfsndj5r3":false,"tb1qzhf2en6txh4sudtpeczwkey280rk23hhw0qpmrrzuuxjfmzynytshtd0ey":false,"tb1q2k8wghl6q62t7hqyau0h24lewffvy9akwjcw68jfr2z2kxpazhlsw9dz9f":false,"tb1q5hly0a5x203gwttaat0d4rqk3zy7ekmyv90yusa0vawzkcg5fj6scflj3x":false,"tb1qxu95r2fhrqfjmnm25y4f33pcnernx64ms602ruerzjmtgufguagsc3rxu0":false,"tb1q5e2de4t0xg3jnn988vswkake0qnvz22uqy0s0hfmk27plvzqm9zqu4vfa2":false,"tb1q7wztc5wdw7nugw00tuemhlhjq7efjgugsdcn6sht4fhnquhu7a8szda5j7":false,"tb1qjwxc6e50edtmhajnm7kt36rjs7els4f2mvqrwc9yzrcdz54tj34syunpyv":false,"tb1qtwtnmx4n76tlnl5j6p7rp8t6yu32y03dngxm8ya3pwrs0jrn4sdqpvcyk4":false,"tb1qupyyudc53knneugdz7qynrdjjane88gkw7wclm7y936gfud3n8sqyuht2l":false,"tb1qxkl7njf7lyt9njr3tyhcxyt87y3262ayxyrz3at0c5ea9gdeaj9s8uhymq":false,"tb1qmk8dfg7dfzn9uesxtrwgcmgkneqclw39pnycndjscr35sxlnkqyqzcvn9x":false,"tb1q2exgm8edud2hdnngcze7n62j2n644npqlr7ffqmg35vkg25j9cjqyg5tnw":false,"tb1q5dkpaftvvmtsyg2dx3xqats9ql056zjurz92tqa4nqr2an5ku57stp2vxf":false,"tb1qp9sgh7rup2pf6xmj7pgc3nw833txgd3ergxqrpfcajzjzuvjsg0qqf8yad":false,"tb1qnd7t7jkn2xy4fwjzxuq6wkkglupmdeglzl4l6veqng0hsk22969svhf5t0":false,"tb1qftdrndcqtaalte848fkvmt5mhuy660585mug8hhz7cmzhzru2e8qvs6tts":false,"tb1qg5vt5fsvchq6243syv0lg8m4tsfdl976mh533f8l95xe32yrpkest64k8u":false,"tb1qfnkxkyhe6ex3dclaqlhvs4redcujw0xg6lv48m7cl2wcnqq5xcns0fplcg":false,"tb1qwamgd8289m2y7zg9422ppa3yx0y0l066qa0qh5ct7lwxx2jddx7qtexh8c":false,"tb1qpw3rfcmayuzpuc94wmuj6gnavu9j22fdgrn8asnly7wlmj4dl6dq9ehyhp":false,"tb1quapjvfnhv702zr35x6g5vhrd5k5rvwl83suzr0r3kxlhysrjkytszemkml":false,"tb1q8tgqllnasc04dc6gf9zzprm302g5ghe2hsgd3adh4xv4h8s3252qvm80cr":false,"tb1qxs06255k2ep0hu269jtc9adfqa6p2mc79rhlc6285af03fawda6sgdqszu":false,"tb1qutgaf4c72naj2dpp3gaywzhzx6khtw3qmdhaq8v5w858fa2gvlpqx6jj9r":false,"tb1qelp3lh2jk95xuhr6ffm9z5cg7552kjqknymtq0ja3nq5az3wg5hs34mt05":false,"tb1qhg4u5gadszqsve8zctx27q7eax4sw0mu06fe09992t84lqvg9aesghral4":false,"tb1qrq2zz4yrcj7njkk94d4x2csrukp0frvrpd2njnq8kmkntetfc2hq99enkc":false,"tb1q5xnxgjlvr2lqx79vg93hjscfdd7wpa7r3fjt2hepn6674amdm96s8jxpr9":false,"tb1q6z83sjh07p02r7rp9ag27gyvk4z9ar69n25evqj55gusj6j2c9ssseny7v":false,"tb1qalvh74f04fshu0ee0v0r6g6hnk5py4rxzx9dd9sy4970rnwrlaxs9l8e5z":false,"tb1qqc0f803ytqapulw4zdc5zju42mq9ukkljd9ggr88hk8z6u30kn6smpdz6j":false,"tb1qm7d7rruqh9gxnf3yj97xr4ayaqne38ycuhhcw4eczkng9ahglals7zve82":false,"tb1q3puafp92tfzh5psacmq67mdf4u5qanmjj947enllxq82vqfg4e6qw5euxx":false,"tb1q685rg422fazvptysmcy6nh3cwhmhzun6grw05kjqxvj4kf4sqvns532368":false,"tb1q98sq5smaaxmd0edd5zxg2e0npcxuel20rp54fnd39dg2jluzeqgqngcssf":false,"tb1q3c5lvr0k66tnt04405gaux6w9j670f2mzmmcnyylzlqdd2zqvtjqu8teds":false,"tb1qpeda44c4f3fn2nqunsweytzkuq3xleexfxn94h7p6taa4n0uavvq3xnru6":false,"tb1qc0puyp9n6js5edgeq95hgj4yg7c7psqwz3vfanhlndkk8pg2tphq8ss63a":false,"tb1qpfvjq86mk48tpsjjrx2v5qjtkxxw8vzjplwwh3uy9fhnq2h5232svaxlm4":false,"tb1q55sfpe3s0ddqh6xjzpdhpjfhqn3t8na042lpma40c4prevsyz8mspqzwn0":false,"tb1qxlp64rgc39jcvkasdndkxdt48uyqddws875n0l627z4468eercls3k5uxs":false,"tb1q8wpundsj7vr5p4tx5pza06s4g7f0r99xtd7euqhqy63pwafu63dq59gxem":false,"tb1qunaqu7m3908ra7re78eu9vc74zl2rqsaxvr9qs2yqjhkumx936tsddmv7z":false,"tb1qp4kye7xax60gqsh0wesvrq3gq2crxcqcwkjdax8rxk26qevkzrsq4fjhf7":false,"tb1qx59mhqfwqp9gprt8qujcacmuv263w866ttuskpc9svrgk7l89j2stgpf2l":false,"tb1qn262y3d0szjzhkg0dl287qpxkt3n9skvk7asgl5zdklakja8ahhqj5za05":false,"tb1qxe62ljrd3uasncs5vmxk8d6qwwrcfljasjm6qsr0jkv6z8h6jg6s7p4a79":false,"tb1qn6ev5cgcc4v0007u6xq632e77ku4w899jredy57a5mgpyvsqkeusrfrnug":false,"tb1qvyzxerka6au4re0y02437ya2f09aad6nks36l6u6gxv3s3cxas5s8qmv6j":false,"tb1qfhydy46auksshl893tm6crpnp4tdyhzymcns025mtuhh7pwxkgeqprvjp2":false,"tb1qt4dp2cgklaugaax5yxhpaguy92203tajxwxhgu5vxwd6ml0r3h7qq7gznu":false,"tb1q94e3ygwjscqntm5jw4zpwggjhnnql0eundjvzqctds920pv38w4q4jl20v":false,"tb1qz2acgyh2hy7hk93av6750695ykjw6yw6h7300azr470my2d26ngqw6cv28":false,"tb1qg57w722xc59xe4rsw5z7ddu825fqfa5qv3jtsmdtl3h56r9ct9ysnqftnh":false,"tb1qm59tcqsg2kpj9ry05ldr7f5cqka9alw24npy8khsrt3qhjqjmtjsa3lzvn":false,"tb1qut73xxg08heks0gjaxst9c8mlrydqpqdafan0r030gzsw9s9uvzqdqt0g9":false,"tb1q4mdcnyz30j3j97mrtywwjy409l9gvgeqakwaedudctcp9gnunceqkt3lyf":false}}',
		)
		// .post(
		// 	"/api/wallets/transactions/unspent",
		// 	'{"addresses":["mv9pNZs3d65sjL68JueZDphWe3vHNmmSn6","mqLZY69ZjogwvFWfLEuGdFUPKeZ6JvyRj1","mwhFCM54gRxY27ynaB7xmmuuGpxATWDzXd"]}',
		// )
		// .reply(
		// 	200,
		// 	'{"data":[{"address":"mqLZY69ZjogwvFWfLEuGdFUPKeZ6JvyRj1","txId":"94336a791ade1aee7a55f0132e1c766e7272b304b805347f34a716cd0b10ebe6","outputIndex":0,"script":"76a9146bba19cd7beb53addb39ab750531668ad409474688ac","satoshis":1000000},{"address":"mv9pNZs3d65sjL68JueZDphWe3vHNmmSn6","txId":"3b182fedfbf8dca089b5ff97004e53081c6610a2eb08dd9bd8c3243a64216649","outputIndex":0,"script":"76a914a08a89d81d7a9be55a18d12f9808dcd572e2cd1c88ac","satoshis":1000000},{"address":"mwhFCM54gRxY27ynaB7xmmuuGpxATWDzXd","txId":"473f473a78f569e93ebd0955d3eb5855c888938106e8f55670c6b75ec1b44d16","outputIndex":0,"script":"76a914b17447e9524445be6572706a3ccfdc9c0e2a8ae788ac","satoshis":1000000}],"links":{"first":"https:\\/\\/btc-test.payvo.com\\/api\\/wallets\\/transactions\\/unspent?page=1","last":"https:\\/\\/btc-test.payvo.com\\/api\\/wallets\\/transactions\\/unspent?page=1","prev":null,"next":null},"meta":{"current_page":1,"from":1,"last_page":1,"links":[{"url":null,"label":"&laquo; Previous","active":false},{"url":"https:\\/\\/btc-test.payvo.com\\/api\\/wallets\\/transactions\\/unspent?page=1","label":"1","active":true},{"url":null,"label":"Next &raquo;","active":false}],"path":"https:\\/\\/btc-test.payvo.com\\/api\\/wallets\\/transactions\\/unspent","per_page":15,"to":3,"total":3}}',
		// )
		// .post(
		// 	"/api/wallets/transactions/raw",
		// 	'{"transaction_ids":["94336a791ade1aee7a55f0132e1c766e7272b304b805347f34a716cd0b10ebe6","3b182fedfbf8dca089b5ff97004e53081c6610a2eb08dd9bd8c3243a64216649","473f473a78f569e93ebd0955d3eb5855c888938106e8f55670c6b75ec1b44d16"]}',
		// )
		// .reply(
		// 	200,
		// 	'{"data":{"94336a791ade1aee7a55f0132e1c766e7272b304b805347f34a716cd0b10ebe6":"01000000000101f918cfe92daf57938655190a9c49512ed3c90880de4573698e1ad9d91b86fdd40100000000f0ffffff0340420f00000000001976a9146bba19cd7beb53addb39ab750531668ad409474688ac6002200000000000160014a7ec2786b0b69fde7fa17c91b840010a0a459a1e0000000000000000196a1768747470733a2f2f746274632e6269746170732e636f6d0247304402202e95518835663a419bb68a20bf87050d60a5f74153344c00a9f4c58059501ae20220379384577ff91409c027db710366fa5bee110b1f3e93e0dd2fe686ca8dc705bd012102d9df366a292c38fee7d741066404cff7a2a7d33d5e065a1d0618b2424e18896400000000","3b182fedfbf8dca089b5ff97004e53081c6610a2eb08dd9bd8c3243a64216649":"010000000001018fd59fca8c155ca700f8dc82c582177464409d7525a7a529495ca1af9ae565ce0100000000f0ffffff0340420f00000000001976a914a08a89d81d7a9be55a18d12f9808dcd572e2cd1c88ac3af124000000000016001426675e52bd5285e36d3d5ab451adb40748c636af0000000000000000196a1768747470733a2f2f746274632e6269746170732e636f6d024830450221009c9262185b692f625351550fa76030a6d8d48f701c2dd09feb7c48484b85e6c302205f34e1e681ac5aa0f8e4ca7552b187310e37ef7e2376600951ef27141133cb6c012102bc4a237367a011b80c98e4a93fdd056f2d630097b82d455b96b2d441889d6b0b00000000","473f473a78f569e93ebd0955d3eb5855c888938106e8f55670c6b75ec1b44d16":"01000000000101605cf9d712df4533c9a8cbbc023b4bc97921d92ee23c3e450ad380455b8990460100000000f0ffffff0340420f00000000001976a914b17447e9524445be6572706a3ccfdc9c0e2a8ae788ac6cd41f0000000000160014e81b5d8f035a3b950ad72d869be2448b023d23410000000000000000196a1768747470733a2f2f746274632e6269746170732e636f6d024730440220148c049f0f9d5c2b6d5b8a3efbe02e5953a414dc078688f55a6ac7a8612ae8800220343527bc59b13724e6878e5d79952a83f53ebfa9aae84a7a6b5342dcae0195d8012103418ce7ab05d74e5b240116672dc1b0c983d534258bbedfd676d212a33554bed500000000"}}',
		// )
		// .get("/api/fees")
		// .reply(200, {
		// 	data: {
		// 		min: 0.00001074,
		// 		avg: 0.00001,
		// 		max: 0.00180617,
		// 	},
		// })
		.persist();
});

const network = bitcoin.networks.testnet;

describe("cache wallet data", () => {
	let walletDataHelper: MusigWalletDataHelper;

	const rootAccountKeys = musig.accounts.map((account) => BIP32.fromMnemonic(account.mnemonic, network));

	const accountKeys = rootToAccountKeys(rootAccountKeys, defaultNativeSegwitMusigAccountKey);

	beforeEach(async () => {
		walletDataHelper = subject.musigWalletDataHelper(2, accountKeys, "nativeSegwitMusig");
	});

	it("should discover all used", async () => {
		await expect(walletDataHelper.discoverAllUsed()).resolves.toBeUndefined();

		expect(walletDataHelper.discoveredSpendAddresses()).toBeArrayOfSize(100);
		expect(walletDataHelper.discoveredSpendAddresses().slice(0, 20)).toEqual([
			{ path: "0/0", address: "tb1qzdtkhgwyqnufeuc3tq88d74plcagcryzmfwclyadxgj90kwvhpps0gu965", status: "used" },
			{ path: "0/1", address: "tb1qq57mp9ygm7d6ps9mzgelzwj806dfszw4paqzmuds8n24q9eacspq4t20kv", status: "used" },
			{
				path: "0/2",
				address: "tb1qu74mke55g3645qz2phgvej24k4qpmq33mkywyn5yyqknh7lcag5qapfmxv",
				status: "unused",
			},
			{
				path: "0/3",
				address: "tb1qhy9td6wyklj8cf0r5y8jxefrace6txkwaqj72aumm5jn703e2geqt3y5mj",
				status: "unused",
			},
			{
				path: "0/4",
				address: "tb1quwzh2lh27rr4gr6jm9ajhgd3kl42rhmgmt7clyfl8uvyhj0msstsj44x6q",
				status: "unused",
			},
			{
				path: "0/5",
				address: "tb1qrvg0evduwlpqcegehxe67850fa6ks7m2ggmrcdfdqt0v99fr4xds6g8c25",
				status: "unused",
			},
			{
				path: "0/6",
				address: "tb1q53370mfkprpzhy3amx86jdz2dt4h6jtwy6h86z7hr5ls6yzca5hq6t380v",
				status: "unused",
			},
			{
				path: "0/7",
				address: "tb1q44w9jpfmh2lppzw5qdm967tyd52n7c38xarhz9sgzhp5nmr66tnsrel5vx",
				status: "unused",
			},
			{
				path: "0/8",
				address: "tb1ql52r8a5z0a9enjff0xze483rcdywehhcdaja2h0ska33ch3dklsq96hx5f",
				status: "unused",
			},
			{
				path: "0/9",
				address: "tb1qdl6wmannd5rrtyy7qt8rkssldr9t8l33c5dk380pzd0qnu346w9qq8x4g6",
				status: "unused",
			},
			{
				path: "0/10",
				address: "tb1qd39n5952y7ayq9saq0l8kl6dvr0zuufa62pxdk566q4qpg0kp6dqvtu4j4",
				status: "unused",
			},
			{
				path: "0/11",
				address: "tb1qj2veuskz4m5hkx4hu6m8kew2mxmer5qkx9rzqmcpp585jj3wt5eqgk055h",
				status: "unused",
			},
			{
				path: "0/12",
				address: "tb1qj0hpe62hw99cqe6q65pjg2gfp2kf5eymt536tgd548u44q433hwsa7vapp",
				status: "unused",
			},
			{
				path: "0/13",
				address: "tb1q34x3atvc8h7s5ptqthlkh6f578avnnugn8rtwpn9egmaclvy53jsescqxq",
				status: "unused",
			},
			{
				path: "0/14",
				address: "tb1qkusd957vyd0kktg7s6lw5sajm3tlr7akzhxsselxyme5hcy86uashssgcy",
				status: "unused",
			},
			{
				path: "0/15",
				address: "tb1qs92g8nqskcjtyp593tlkmqg5wprpdfpg6m4g9x7ynnxac68an38s08ahcj",
				status: "unused",
			},
			{
				path: "0/16",
				address: "tb1qhfzlatav6vvfs593ppd3gkadpgdqq575wt8ffqnh9tkjaflcse0syyv9vg",
				status: "unused",
			},
			{
				path: "0/17",
				address: "tb1qpuqj28cdaa4wdw9lma36k4nrrxqnhtvt3pq6dj6h4c4r0u43e2vsr4rw7r",
				status: "unused",
			},
			{
				path: "0/18",
				address: "tb1qvfpqldfkqmg8pczyy360uxp74a57c2224f9edrae69jc2tun749qp2yz6f",
				status: "unused",
			},
			{
				path: "0/19",
				address: "tb1qtv6kgceeedq929syhtpg3rvdkdmyjscp3ncy6pcy4jkxujlaxsuqj5v3fv",
				status: "unused",
			},
		]);
		expect(walletDataHelper.discoveredChangeAddresses()).toBeArrayOfSize(100);
		expect(walletDataHelper.discoveredChangeAddresses().slice(0, 20)).toEqual([
			{ path: "1/0", address: "tb1qsyz35zpeueuwmcjap75flg93mny2gn7v3urnnwe4k05rcnvnp4cqq7hew2", status: "used" },
			{ path: "1/1", address: "tb1q9dpf5gjwgwmdftn22tfmq4cmw3qt825nf3xgd4wkdg3ktw6z2shsa5wauj", status: "used" },
			{ path: "1/2", address: "tb1qlj3qkv9c5j5gfqgfnqjl0nkwuvw8ktq9u3ahg0du4jnde852nrcstf4cka", status: "used" },
			{
				path: "1/3",
				address: "tb1qes5lcckv97t0umnyvwxcjh7y4lemad0utwjl4lcg54yhxkdtlgyq35hlw3",
				status: "unused",
			},
			{
				path: "1/4",
				address: "tb1qv42ern8yjn3lq9rywl4ky2kdxtk783w8vtvsf3qf4u8r9lj4cjesu9htw6",
				status: "unused",
			},
			{
				path: "1/5",
				address: "tb1q0jhddny2g66g9w9e5nnsy7a0wpmtee60tcdx5jkwd9eq408vdueqv89r3z",
				status: "unused",
			},
			{
				path: "1/6",
				address: "tb1qs4jcfl66n7kjvml04ggj4qaqsygnkzxy5fznc8tek8l9js8dda7s0dfdxd",
				status: "unused",
			},
			{
				path: "1/7",
				address: "tb1qjqtgnkr24p7snzd7tfrvaw730ncsgk8vyg9z278a8gdcw2vln7dsezhp45",
				status: "unused",
			},
			{
				path: "1/8",
				address: "tb1q5q6vxfgvfx2pnsusrhhcjda7nt34v7m5hsd3909pvvjvcxg796zq8jccdc",
				status: "unused",
			},
			{
				path: "1/9",
				address: "tb1q6y0hr6sskangsempgej9udsw6q8xqgg5m4gejhww3tl9dphyy4ks0ggefg",
				status: "unused",
			},
			{
				path: "1/10",
				address: "tb1q486z3sqhlmk50q7fwuevvle75dpezylhw9jfe8hhe0f6f4vuhu9qfhjxa2",
				status: "unused",
			},
			{
				path: "1/11",
				address: "tb1qewyw7fwzm94l4z3xvtqgr7clx0z3f0r0z8lxd9tcr8s7ps9n8gqq787nql",
				status: "unused",
			},
			{
				path: "1/12",
				address: "tb1qh62yhwxt4jlmdhjj6qg8q77evhgpsfrr0t9gkgvu7luacdjl8snsudzhxn",
				status: "unused",
			},
			{
				path: "1/13",
				address: "tb1qznlwvphh66m0j39g5mpp8fxkydxcutngsj7d9f0x42sc5s9tv5xq6rpzuc",
				status: "unused",
			},
			{
				path: "1/14",
				address: "tb1qmu92s68qtal0wkq53l4yh6q70ke28p6nzm5wux2dk3kyu3g96xvsz4cgdl",
				status: "unused",
			},
			{
				path: "1/15",
				address: "tb1qdh0r96zj7news5l64uklwp36nhglcens4tpcvr95xxureq4f7vnsgr8y5y",
				status: "unused",
			},
			{
				path: "1/16",
				address: "tb1qrrn3pzqfnw39yxfhhhprluyy357977s220r0ja2edkgkf5q70rpsj7jpex",
				status: "unused",
			},
			{
				path: "1/17",
				address: "tb1qaxxrvgyjxrcjgy06ds2ljv8hnn298nthdf4l4gjc2typ2kfu0wqqjzgr2z",
				status: "unused",
			},
			{
				path: "1/18",
				address: "tb1qdrczmglape6ag62smukzne8wuvg8c7ggkfu7azktq3vxlwjej0ksl94drz",
				status: "unused",
			},
			{
				path: "1/19",
				address: "tb1q0kpqnp2hxp4l8jckp5ppvvdvdvntd8yslsdwv760yn4f29n3n8sqhzuz29",
				status: "unused",
			},
		]);
	});

	it("should return the next change address", async () => {
		await expect(walletDataHelper.discoverAllUsed()).resolves.toBeUndefined();

		expect(walletDataHelper.firstUnusedChangeAddress()).toEqual({
			address: "tb1qes5lcckv97t0umnyvwxcjh7y4lemad0utwjl4lcg54yhxkdtlgyq35hlw3",
			path: "1/3",
			status: "unused",
		});
	});
});