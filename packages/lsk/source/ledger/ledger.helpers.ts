const crcTable = [
	0x00_00,
	0x11_89,
	0x23_12,
	0x32_9b,
	0x46_24,
	0x57_ad,
	0x65_36,
	0x74_bf,
	0x8c_48,
	0x9d_c1,
	0xaf_5a,
	0xbe_d3,
	0xca_6c,
	0xdb_e5,
	0xe9_7e,
	0xf8_f7,
	0x10_81,
	0x01_08,
	0x33_93,
	0x22_1a,
	0x56_a5,
	0x47_2c,
	0x75_b7,
	0x64_3e,
	0x9c_c9,
	0x8d_40,
	0xbf_db,
	0xae_52,
	0xda_ed,
	0xcb_64,
	0xf9_ff,
	0xe8_76,
	0x21_02,
	0x30_8b,
	0x02_10,
	0x13_99,
	0x67_26,
	0x76_af,
	0x44_34,
	0x55_bd,
	0xad_4a,
	0xbc_c3,
	0x8e_58,
	0x9f_d1,
	0xeb_6e,
	0xfa_e7,
	0xc8_7c,
	0xd9_f5,
	0x31_83,
	0x20_0a,
	0x12_91,
	0x03_18,
	0x77_a7,
	0x66_2e,
	0x54_b5,
	0x45_3c,
	0xbd_cb,
	0xac_42,
	0x9e_d9,
	0x8f_50,
	0xfb_ef,
	0xea_66,
	0xd8_fd,
	0xc9_74,
	0x42_04,
	0x53_8d,
	0x61_16,
	0x70_9f,
	0x04_20,
	0x15_a9,
	0x27_32,
	0x36_bb,
	0xce_4c,
	0xdf_c5,
	0xed_5e,
	0xfc_d7,
	0x88_68,
	0x99_e1,
	0xab_7a,
	0xba_f3,
	0x52_85,
	0x43_0c,
	0x71_97,
	0x60_1e,
	0x14_a1,
	0x05_28,
	0x37_b3,
	0x26_3a,
	0xde_cd,
	0xcf_44,
	0xfd_df,
	0xec_56,
	0x98_e9,
	0x89_60,
	0xbb_fb,
	0xaa_72,
	0x63_06,
	0x72_8f,
	0x40_14,
	0x51_9d,
	0x25_22,
	0x34_ab,
	0x06_30,
	0x17_b9,
	0xef_4e,
	0xfe_c7,
	0xcc_5c,
	0xdd_d5,
	0xa9_6a,
	0xb8_e3,
	0x8a_78,
	0x9b_f1,
	0x73_87,
	0x62_0e,
	0x50_95,
	0x41_1c,
	0x35_a3,
	0x24_2a,
	0x16_b1,
	0x07_38,
	0xff_cf,
	0xee_46,
	0xdc_dd,
	0xcd_54,
	0xb9_eb,
	0xa8_62,
	0x9a_f9,
	0x8b_70,
	0x84_08,
	0x95_81,
	0xa7_1a,
	0xb6_93,
	0xc2_2c,
	0xd3_a5,
	0xe1_3e,
	0xf0_b7,
	0x08_40,
	0x19_c9,
	0x2b_52,
	0x3a_db,
	0x4e_64,
	0x5f_ed,
	0x6d_76,
	0x7c_ff,
	0x94_89,
	0x85_00,
	0xb7_9b,
	0xa6_12,
	0xd2_ad,
	0xc3_24,
	0xf1_bf,
	0xe0_36,
	0x18_c1,
	0x09_48,
	0x3b_d3,
	0x2a_5a,
	0x5e_e5,
	0x4f_6c,
	0x7d_f7,
	0x6c_7e,
	0xa5_0a,
	0xb4_83,
	0x86_18,
	0x97_91,
	0xe3_2e,
	0xf2_a7,
	0xc0_3c,
	0xd1_b5,
	0x29_42,
	0x38_cb,
	0x0a_50,
	0x1b_d9,
	0x6f_66,
	0x7e_ef,
	0x4c_74,
	0x5d_fd,
	0xb5_8b,
	0xa4_02,
	0x96_99,
	0x87_10,
	0xf3_af,
	0xe2_26,
	0xd0_bd,
	0xc1_34,
	0x39_c3,
	0x28_4a,
	0x1a_d1,
	0x0b_58,
	0x7f_e7,
	0x6e_6e,
	0x5c_f5,
	0x4d_7c,
	0xc6_0c,
	0xd7_85,
	0xe5_1e,
	0xf4_97,
	0x80_28,
	0x91_a1,
	0xa3_3a,
	0xb2_b3,
	0x4a_44,
	0x5b_cd,
	0x69_56,
	0x78_df,
	0x0c_60,
	0x1d_e9,
	0x2f_72,
	0x3e_fb,
	0xd6_8d,
	0xc7_04,
	0xf5_9f,
	0xe4_16,
	0x90_a9,
	0x81_20,
	0xb3_bb,
	0xa2_32,
	0x5a_c5,
	0x4b_4c,
	0x79_d7,
	0x68_5e,
	0x1c_e1,
	0x0d_68,
	0x3f_f3,
	0x2e_7a,
	0xe7_0e,
	0xf6_87,
	0xc4_1c,
	0xd5_95,
	0xa1_2a,
	0xb0_a3,
	0x82_38,
	0x93_b1,
	0x6b_46,
	0x7a_cf,
	0x48_54,
	0x59_dd,
	0x2d_62,
	0x3c_eb,
	0x0e_70,
	0x1f_f9,
	0xf7_8f,
	0xe6_06,
	0xd4_9d,
	0xc5_14,
	0xb1_ab,
	0xa0_22,
	0x92_b9,
	0x83_30,
	0x7b_c7,
	0x6a_4e,
	0x58_d5,
	0x49_5c,
	0x3d_e3,
	0x2c_6a,
	0x1e_f1,
	0x0f_78,
];

const crc16CcittStart = Number.parseInt("FFFF", 16);
const crc = Number.parseInt("FF", 16);
const xorVariable = Number.parseInt("FFFF", 16);

/**
 * Get CRC-16bit-CCITT.
 *
 * @param {Buffer} buffer
 * @returns {int} unsigned CRC 16 bit
 */
export const getCrc16 = (buffer: Buffer): number => {
	let crc16 = crc16CcittStart;

	for (let index = 0; index < buffer.length; index++) {
		crc16 = crcTable[(crc16 ^ buffer.readUInt8(index)) & crc] ^ (crc16 >> 8);
	}

	return (crc16 & xorVariable) ^ xorVariable;
}

export const getPathArray = (text: string): number[] => {
	const HARDENED = 0x80_00_00_00;

	// skip the root
	if (/^m\//i.test(text)) {
		text = text.slice(2);
	}

	const path = text.split('/');
	const result = new Array(path.length);

	for (let index = 0; index < path.length; index++) {
		const temporary = /(\d+)(['Hh]?)/.exec(path[index]);

		if (temporary === null) {
			throw new Error('Invalid input');
		}

		result[index] = Number.parseInt(temporary[1], 10);

		if (result[index] >= HARDENED) {
			throw new Error('Invalid child index');
		}

		if (temporary[2] === 'h' || temporary[2] === 'H' || temporary[2] === '\'') {
			result[index] += HARDENED;
		} else if (temporary[2].length > 0) {
			throw new Error('Invalid modifier');
		}
	}

	return result;
};
