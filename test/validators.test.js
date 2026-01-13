// test/validators.test.js
// Example unit tests

import {
    validateNIK,
    validateNPWP,
    validatePhoneNumber,
    validateEmail,
    validateBankAccount,
    validatePostalCode,
    formatNIK,
    formatNPWP,
    formatPhoneNumber
} from '../src/index.js';

describe('validateNIK', () => {
    test('should validate correct NIK', () => {
        const result = validateNIK('3201012901950001');
        expect(result.valid).toBe(true);
        expect(result.data.gender).toBe('Laki-laki');
    });

    test('should detect female from NIK', () => {
        const result = validateNIK('3201015001950001'); // Tanggal 50 = 10 + 40 (perempuan)
        expect(result.valid).toBe(true);
        expect(result.data.gender).toBe('Perempuan');
        expect(result.data.birthDate.day).toBe(10);
    });

    test('should reject NIK with invalid length', () => {
        const result = validateNIK('123456789');
        expect(result.valid).toBe(false);
        expect(result.message).toContain('16 digit');
    });

    test('should reject NIK with invalid date', () => {
        const result = validateNIK('3201013201950001'); // Tanggal 32 invalid
        expect(result.valid).toBe(false);
    });

    test('should reject empty NIK', () => {
        const result = validateNIK('');
        expect(result.valid).toBe(false);
    });
});

describe('validateNPWP', () => {
    test('should validate correct NPWP with dots and dash', () => {
        const result = validateNPWP('01.234.567.8-901.000');
        expect(result.valid).toBe(true);
    });

    test('should validate NPWP without formatting', () => {
        const result = validateNPWP('012345678901000');
        expect(result.valid).toBe(true);
    });

    test('should reject NPWP with invalid length', () => {
        const result = validateNPWP('123456789');
        expect(result.valid).toBe(false);
    });
});

describe('validatePhoneNumber', () => {
    test('should validate Telkomsel number', () => {
        const result = validatePhoneNumber('081234567890');
        expect(result.valid).toBe(true);
        expect(result.data.operator).toBe('Telkomsel');
    });

    test('should validate number with +62 prefix', () => {
        const result = validatePhoneNumber('+6281234567890');
        expect(result.valid).toBe(true);
        expect(result.data.formatted).toBe('081234567890');
    });

    test('should validate number with 62 prefix', () => {
        const result = validatePhoneNumber('6281234567890');
        expect(result.valid).toBe(true);
    });

    test('should detect XL operator', () => {
        const result = validatePhoneNumber('081734567890');
        expect(result.valid).toBe(true);
        expect(result.data.operator).toBe('XL');
    });

    test('should reject invalid phone format', () => {
        const result = validatePhoneNumber('021234567890'); // Bukan 08xx
        expect(result.valid).toBe(false);
    });

    test('should reject too short number', () => {
        const result = validatePhoneNumber('0812345'); // Terlalu pendek
        expect(result.valid).toBe(false);
    });
});

describe('validateEmail', () => {
    test('should validate correct email', () => {
        const result = validateEmail('user@example.com');
        expect(result.valid).toBe(true);
        expect(result.data.domain).toBe('example.com');
    });

    test('should reject email without @', () => {
        const result = validateEmail('userexample.com');
        expect(result.valid).toBe(false);
    });

    test('should reject email without domain', () => {
        const result = validateEmail('user@');
        expect(result.valid).toBe(false);
    });
});

describe('validateBankAccount', () => {
    test('should validate BCA account (10 digits)', () => {
        const result = validateBankAccount('1234567890', 'BCA');
        expect(result.valid).toBe(true);
        expect(result.data.bank).toBe('Bank Central Asia');
    });

    test('should validate BRI account (15 digits)', () => {
        const result = validateBankAccount('123456789012345', 'BRI');
        expect(result.valid).toBe(true);
    });

    test('should validate Mandiri account (13 digits)', () => {
        const result = validateBankAccount('1234567890123', 'MANDIRI');
        expect(result.valid).toBe(true);
    });

    test('should reject BCA account with wrong length', () => {
        const result = validateBankAccount('12345', 'BCA');
        expect(result.valid).toBe(false);
    });

    test('should validate generic account without bank code', () => {
        const result = validateBankAccount('1234567890');
        expect(result.valid).toBe(true);
    });
});

describe('validatePostalCode', () => {
    test('should validate correct postal code', () => {
        const result = validatePostalCode('12345');
        expect(result.valid).toBe(true);
    });

    test('should reject postal code with wrong length', () => {
        const result = validatePostalCode('123');
        expect(result.valid).toBe(false);
    });

    test('should reject non-numeric postal code', () => {
        const result = validatePostalCode('ABCDE');
        expect(result.valid).toBe(false);
    });
});

describe('Format functions', () => {
    test('formatNIK should add spaces', () => {
        const formatted = formatNIK('3201012901950001');
        expect(formatted).toBe('320101 290195 0001');
    });

    test('formatNPWP should add dots and dash', () => {
        const formatted = formatNPWP('012345678901000');
        expect(formatted).toBe('01.234.567.8-901.000');
    });

    test('formatPhoneNumber should convert to international', () => {
        const formatted = formatPhoneNumber('081234567890', 'international');
        expect(formatted).toBe('+6281234567890');
    });

    test('formatPhoneNumber should keep local format', () => {
        const formatted = formatPhoneNumber('+6281234567890', 'local');
        expect(formatted).toBe('081234567890');
    });
});