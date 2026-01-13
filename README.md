# 🇮🇩 Indonesian Validators

Library JavaScript untuk validasi data format Indonesia seperti NIK, NPWP, Nomor HP, Rekening Bank, dan lainnya.

[![npm version](https://img.shields.io/npm/v/indonesian-validators.svg)](https://www.npmjs.com/package/indonesian-validators)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## ✨ Features

- ✅ Validasi NIK (Nomor Induk Kependudukan)
- ✅ Validasi NPWP (Nomor Pokok Wajib Pajak)
- ✅ Validasi Nomor HP Indonesia (dengan deteksi operator)
- ✅ Validasi Email
- ✅ Validasi Nomor Rekening Bank (BCA, BNI, BRI, Mandiri, dll)
- ✅ Validasi Kode Pos
- ✅ Format helper functions
- ✅ Zero dependencies
- ✅ TypeScript support (coming soon)
- ✅ Ringan (~5KB gzipped)

## 📦 Installation

```bash
npm install indonesian-validators
```

atau

```bash
yarn add indonesian-validators
```

## 🚀 Usage

### Validasi NIK

```javascript
import { validateNIK, formatNIK } from 'indonesian-validators';

const result = validateNIK('3201012901950001');

console.log(result);
// {
//   valid: true,
//   message: 'NIK valid',
//   data: {
//     provinceCode: '32',
//     districtCode: '3201',
//     subdistrictCode: '320101',
//     birthDate: { day: 29, month: 1, year: 95 },
//     gender: 'Laki-laki'
//   }
// }

// Format NIK untuk display
console.log(formatNIK('3201012901950001'));
// Output: "320101 290195 0001"
```

### Validasi NPWP

```javascript
import { validateNPWP, formatNPWP } from 'indonesian-validators';

const result = validateNPWP('01.234.567.8-901.000');

console.log(result);
// {
//   valid: true,
//   message: 'NPWP valid',
//   data: { formatted: '01.234.567.8-901.000' }
// }
```

### Validasi Nomor HP

```javascript
import { validatePhoneNumber, formatPhoneNumber } from 'indonesian-validators';

const result = validatePhoneNumber('081234567890');

console.log(result);
// {
//   valid: true,
//   message: 'Nomor HP valid',
//   data: {
//     formatted: '081234567890',
//     international: '+6281234567890',
//     operator: 'Telkomsel'
//   }
// }

// Format ke international
console.log(formatPhoneNumber('081234567890', 'international'));
// Output: "+6281234567890"
```

### Validasi Email

```javascript
import { validateEmail } from 'indonesian-validators';

const result = validateEmail('user@example.com');

console.log(result);
// {
//   valid: true,
//   message: 'Email valid',
//   data: { domain: 'example.com' }
// }
```

### Validasi Nomor Rekening Bank

```javascript
import { validateBankAccount } from 'indonesian-validators';

const result = validateBankAccount('1234567890', 'BCA');

console.log(result);
// {
//   valid: true,
//   message: 'Nomor rekening Bank Central Asia valid',
//   data: {
//     bank: 'Bank Central Asia',
//     accountNumber: '1234567890'
//   }
// }
```

### Validasi Kode Pos

```javascript
import { validatePostalCode } from 'indonesian-validators';

const result = validatePostalCode('12345');

console.log(result);
// {
//   valid: true,
//   message: 'Kode pos valid',
//   data: { postalCode: '12345' }
// }
```

## 📋 API Documentation

### Validation Functions

Semua fungsi validasi mengembalikan object dengan struktur:

```javascript
{
  valid: boolean,      // true jika valid, false jika tidak
  message: string,     // Pesan hasil validasi
  data?: object        // Data tambahan (jika valid)
}
```

#### `validateNIK(nik: string | number)`

Validasi NIK 16 digit dan ekstrak informasi dasar.

#### `validateNPWP(npwp: string | number)`

Validasi NPWP 15 digit dengan format yang fleksibel.

#### `validatePhoneNumber(phone: string | number)`

Validasi nomor HP Indonesia dengan deteksi operator.

#### `validateEmail(email: string)`

Validasi format email standar.

#### `validateBankAccount(accountNumber: string | number, bankCode?: string)`

Validasi nomor rekening bank. Bank code: `BCA`, `BNI`, `BRI`, `MANDIRI`, `CIMB`, `PERMATA`, `DANAMON`, `BTN`.

#### `validatePostalCode(postalCode: string | number)`

Validasi kode pos Indonesia (5 digit).

### Format Functions

#### `formatNIK(nik: string | number): string`

Format NIK dengan spasi untuk readability.

#### `formatNPWP(npwp: string | number): string`

Format NPWP dengan titik dan strip.

#### `formatPhoneNumber(phone: string | number, format?: 'local' | 'international'): string`

Format nomor HP ke format lokal atau international.

## 🎯 Use Cases

### React Form Validation

```javascript
import { validateNIK, validatePhoneNumber } from 'indonesian-validators';

function RegistrationForm() {
  const [nik, setNik] = useState('');
  const [nikError, setNikError] = useState('');

  const handleNikChange = (e) => {
    const value = e.target.value;
    setNik(value);
    
    const result = validateNIK(value);
    if (!result.valid) {
      setNikError(result.message);
    } else {
      setNikError('');
    }
  };

  return (
    <input
      value={nik}
      onChange={handleNikChange}
      placeholder="Masukkan NIK"
    />
  );
}
```

### Backend Validation (Node.js)

```javascript
const { validateNPWP, validateBankAccount } = require('indonesian-validators');

app.post('/api/submit', (req, res) => {
  const { npwp, bankAccount } = req.body;
  
  const npwpResult = validateNPWP(npwp);
  if (!npwpResult.valid) {
    return res.status(400).json({ error: npwpResult.message });
  }
  
  const accountResult = validateBankAccount(bankAccount, 'BCA');
  if (!accountResult.valid) {
    return res.status(400).json({ error: accountResult.message });
  }
  
  // Process valid data...
});
```

## 🤝 Contributing

Kontribusi sangat diterima! Silakan buat issue atau pull request.

1. Fork repository ini
2. Buat branch feature (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buka Pull Request

## 📝 License

MIT License - lihat file [LICENSE](LICENSE) untuk detail.

## 💖 Support

Jika library ini berguna untuk kamu:
- ⭐ Star repository ini
- 🐛 Laporkan bug di [Issues](https://github.com/yourusername/indonesian-validators/issues)
- 💡 Usulkan fitur baru
- ☕ [Belikan saya kopi](https://trakteer.id/yourusername)

## 🔗 Links

- [NPM Package](https://www.npmjs.com/package/indonesian-validators)
- [GitHub Repository](https://github.com/yourusername/indonesian-validators)
- [Documentation](https://github.com/yourusername/indonesian-validators#readme)

---

Made with ❤️ for Indonesian Developers