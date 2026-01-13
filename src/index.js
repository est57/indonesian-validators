// indonesian-validators.js
// Library untuk validasi data Indonesia

/**
 * Validasi NIK (Nomor Induk Kependudukan)
 * Format: 16 digit
 * 6 digit pertama: kode wilayah
 * 6 digit berikutnya: tanggal lahir (DDMMYY, +40 untuk perempuan)
 * 4 digit terakhir: nomor urut
 */
export function validateNIK(nik) {
    if (!nik) return { valid: false, message: 'NIK tidak boleh kosong' };

    const nikString = String(nik).replace(/\s/g, '');

    if (!/^\d{16}$/.test(nikString)) {
        return { valid: false, message: 'NIK harus 16 digit angka' };
    }

    const provinceCode = nikString.substring(0, 2);
    const districtCode = nikString.substring(0, 4);
    const subdistrictCode = nikString.substring(0, 6);

    let day = parseInt(nikString.substring(6, 8));
    const month = parseInt(nikString.substring(8, 10));
    const year = parseInt(nikString.substring(10, 12));

    // Deteksi jenis kelamin (perempuan = tanggal + 40)
    const gender = day > 40 ? 'Perempuan' : 'Laki-laki';
    if (day > 40) day -= 40;

    // Validasi tanggal
    if (day < 1 || day > 31) {
        return { valid: false, message: 'Tanggal lahir tidak valid' };
    }

    if (month < 1 || month > 12) {
        return { valid: false, message: 'Bulan lahir tidak valid' };
    }

    return {
        valid: true,
        message: 'NIK valid',
        data: {
            provinceCode,
            districtCode,
            subdistrictCode,
            birthDate: { day, month, year },
            gender
        }
    };
}

/**
 * Validasi NPWP (Nomor Pokok Wajib Pajak)
 * Format: XX.XXX.XXX.X-XXX.XXX (15 digit)
 */
export function validateNPWP(npwp) {
    if (!npwp) return { valid: false, message: 'NPWP tidak boleh kosong' };

    const npwpString = String(npwp).replace(/[.\-\s]/g, '');

    if (!/^\d{15}$/.test(npwpString)) {
        return { valid: false, message: 'NPWP harus 15 digit angka' };
    }

    const formatted = `${npwpString.substring(0, 2)}.${npwpString.substring(2, 5)}.${npwpString.substring(5, 8)}.${npwpString.substring(8, 9)}-${npwpString.substring(9, 12)}.${npwpString.substring(12, 15)}`;

    return {
        valid: true,
        message: 'NPWP valid',
        data: { formatted }
    };
}

/**
 * Validasi Nomor HP Indonesia
 * Format: 08xx, +628xx, 628xx
 */
export function validatePhoneNumber(phone) {
    if (!phone) return { valid: false, message: 'Nomor HP tidak boleh kosong' };

    let phoneString = String(phone).replace(/[\s\-()]/g, '');

    // Normalisasi format
    if (phoneString.startsWith('+62')) {
        phoneString = '0' + phoneString.substring(3);
    } else if (phoneString.startsWith('62')) {
        phoneString = '0' + phoneString.substring(2);
    }

    // Validasi format
    if (!/^08\d{8,11}$/.test(phoneString)) {
        return { valid: false, message: 'Format nomor HP tidak valid. Harus diawali 08 dan 10-13 digit' };
    }

    // Deteksi operator
    const prefix = phoneString.substring(0, 4);
    let operator = 'Unknown';

    if (['0811', '0812', '0813', '0821', '0822', '0823', '0851', '0852', '0853'].includes(prefix)) {
        operator = 'Telkomsel';
    } else if (['0814', '0815', '0816', '0855', '0856', '0857', '0858'].includes(prefix)) {
        operator = 'Indosat';
    } else if (['0817', '0818', '0819', '0859', '0877', '0878'].includes(prefix)) {
        operator = 'XL';
    } else if (['0895', '0896', '0897', '0898', '0899'].includes(prefix)) {
        operator = 'Three';
    } else if (['0881', '0882', '0883', '0884', '0885', '0886', '0887', '0888', '0889'].includes(prefix)) {
        operator = 'Smartfren';
    }

    const formatted = phoneString;
    const international = '+62' + phoneString.substring(1);

    return {
        valid: true,
        message: 'Nomor HP valid',
        data: { formatted, international, operator }
    };
}

/**
 * Validasi Email Indonesia
 */
export function validateEmail(email) {
    if (!email) return { valid: false, message: 'Email tidak boleh kosong' };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        return { valid: false, message: 'Format email tidak valid' };
    }

    const domain = email.split('@')[1];
    const commonIndonesianDomains = ['gmail.com', 'yahoo.com', 'yahoo.co.id', 'hotmail.com', 'outlook.com'];

    return {
        valid: true,
        message: 'Email valid',
        data: { domain }
    };
}

/**
 * Validasi Nomor Rekening Bank
 * Berbeda per bank
 */
export function validateBankAccount(accountNumber, bankCode) {
    if (!accountNumber) return { valid: false, message: 'Nomor rekening tidak boleh kosong' };

    const accountString = String(accountNumber).replace(/[\s\-]/g, '');

    if (!/^\d+$/.test(accountString)) {
        return { valid: false, message: 'Nomor rekening harus berupa angka' };
    }

    const bankRules = {
        'BCA': { minLength: 10, maxLength: 10, name: 'Bank Central Asia' },
        'BNI': { minLength: 10, maxLength: 10, name: 'Bank Negara Indonesia' },
        'BRI': { minLength: 15, maxLength: 15, name: 'Bank Rakyat Indonesia' },
        'MANDIRI': { minLength: 13, maxLength: 13, name: 'Bank Mandiri' },
        'CIMB': { minLength: 13, maxLength: 13, name: 'CIMB Niaga' },
        'PERMATA': { minLength: 10, maxLength: 10, name: 'Bank Permata' },
        'DANAMON': { minLength: 10, maxLength: 10, name: 'Bank Danamon' },
        'BTN': { minLength: 16, maxLength: 16, name: 'Bank Tabungan Negara' },
    };

    if (bankCode && bankRules[bankCode.toUpperCase()]) {
        const rule = bankRules[bankCode.toUpperCase()];
        const length = accountString.length;

        if (length < rule.minLength || length > rule.maxLength) {
            return {
                valid: false,
                message: `Nomor rekening ${rule.name} harus ${rule.minLength} digit`
            };
        }

        return {
            valid: true,
            message: `Nomor rekening ${rule.name} valid`,
            data: { bank: rule.name, accountNumber: accountString }
        };
    }

    // Validasi umum jika bank tidak dispecify
    if (accountString.length < 10 || accountString.length > 16) {
        return { valid: false, message: 'Nomor rekening umumnya 10-16 digit' };
    }

    return {
        valid: true,
        message: 'Format nomor rekening valid',
        data: { accountNumber: accountString }
    };
}

/**
 * Validasi Kode Pos Indonesia
 */
export function validatePostalCode(postalCode) {
    if (!postalCode) return { valid: false, message: 'Kode pos tidak boleh kosong' };

    const postalString = String(postalCode).replace(/\s/g, '');

    if (!/^\d{5}$/.test(postalString)) {
        return { valid: false, message: 'Kode pos harus 5 digit angka' };
    }

    return {
        valid: true,
        message: 'Kode pos valid',
        data: { postalCode: postalString }
    };
}

/**
 * Format NIK dengan spasi untuk readability
 */
export function formatNIK(nik) {
    const nikString = String(nik).replace(/\s/g, '');
    if (nikString.length !== 16) return nik;
    return `${nikString.substring(0, 6)} ${nikString.substring(6, 12)} ${nikString.substring(12, 16)}`;
}

/**
 * Format NPWP
 */
export function formatNPWP(npwp) {
    const npwpString = String(npwp).replace(/[.\-\s]/g, '');
    if (npwpString.length !== 15) return npwp;
    return `${npwpString.substring(0, 2)}.${npwpString.substring(2, 5)}.${npwpString.substring(5, 8)}.${npwpString.substring(8, 9)}-${npwpString.substring(9, 12)}.${npwpString.substring(12, 15)}`;
}

/**
 * Format nomor HP
 */
export function formatPhoneNumber(phone, format = 'local') {
    let phoneString = String(phone).replace(/[\s\-()]/g, '');

    if (phoneString.startsWith('+62')) {
        phoneString = '0' + phoneString.substring(3);
    } else if (phoneString.startsWith('62')) {
        phoneString = '0' + phoneString.substring(2);
    }

    if (format === 'international') {
        return '+62' + phoneString.substring(1);
    }

    return phoneString;
}