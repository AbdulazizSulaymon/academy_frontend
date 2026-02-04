// Davlatlar kodlari va ularning formatlari
interface CountryCode {
  code: string;
  name: string;
  pattern: RegExp;
  format: (number: string) => string;
}

const countryCodes: CountryCode[] = [
  // O'zbekiston
  {
    code: '998',
    name: "O'zbekiston",
    pattern: /^998(\d{9})$/,
    format: (num) => `+998 (${num.slice(3, 5)}) ${num.slice(5, 8)}-${num.slice(8, 10)}-${num.slice(10)}`,
  },
  // Rossiya
  {
    code: '7',
    name: 'Rossiya',
    pattern: /^7(\d{10})$/,
    format: (num) => `+7 (${num.slice(1, 4)}) ${num.slice(4, 7)}-${num.slice(7, 9)}-${num.slice(9)}`,
  },
  // AQSH/Kanada
  {
    code: '1',
    name: 'AQSH/Kanada',
    pattern: /^1(\d{10})$/,
    format: (num) => `+1 (${num.slice(1, 4)}) ${num.slice(4, 7)}-${num.slice(7)}`,
  },
  // Turkiya
  {
    code: '90',
    name: 'Turkiya',
    pattern: /^90(\d{10})$/,
    format: (num) => `+90 (${num.slice(2, 5)}) ${num.slice(5, 8)} ${num.slice(8, 10)} ${num.slice(10)}`,
  },
  // Germaniya
  {
    code: '49',
    name: 'Germaniya',
    pattern: /^49(\d{10,11})$/,
    format: (num) => `+49 ${num.slice(2, 4)} ${num.slice(4, 8)} ${num.slice(8)}`,
  },
  // Fransiya
  {
    code: '33',
    name: 'Fransiya',
    pattern: /^33(\d{9})$/,
    format: (num) => `+33 ${num.slice(2, 3)} ${num.slice(3, 5)} ${num.slice(5, 7)} ${num.slice(7, 9)} ${num.slice(9)}`,
  },
  // Buyuk Britaniya
  {
    code: '44',
    name: 'Buyuk Britaniya',
    pattern: /^44(\d{10})$/,
    format: (num) => `+44 ${num.slice(2, 4)} ${num.slice(4, 8)} ${num.slice(8)}`,
  },
  // Italiya
  {
    code: '39',
    name: 'Italiya',
    pattern: /^39(\d{9,10})$/,
    format: (num) => `+39 ${num.slice(2, 5)} ${num.slice(5, 8)} ${num.slice(8)}`,
  },
  // Ispaniya
  {
    code: '34',
    name: 'Ispaniya',
    pattern: /^34(\d{9})$/,
    format: (num) => `+34 ${num.slice(2, 5)} ${num.slice(5, 7)} ${num.slice(7, 9)} ${num.slice(9)}`,
  },
  // Yaponiya
  {
    code: '81',
    name: 'Yaponiya',
    pattern: /^81(\d{10,11})$/,
    format: (num) => `+81 ${num.slice(2, 4)} ${num.slice(4, 8)} ${num.slice(8)}`,
  },
  // Xitoy
  {
    code: '86',
    name: 'Xitoy',
    pattern: /^86(\d{11})$/,
    format: (num) => `+86 ${num.slice(2, 5)} ${num.slice(5, 9)} ${num.slice(9)}`,
  },
  // Hindiston
  {
    code: '91',
    name: 'Hindiston',
    pattern: /^91(\d{10})$/,
    format: (num) => `+91 ${num.slice(2, 4)} ${num.slice(4, 8)} ${num.slice(8)}`,
  },
  // Braziliya
  {
    code: '55',
    name: 'Braziliya',
    pattern: /^55(\d{11})$/,
    format: (num) => `+55 (${num.slice(2, 4)}) ${num.slice(4, 9)}-${num.slice(9)}`,
  },
  // Avstraliya
  {
    code: '61',
    name: 'Avstraliya',
    pattern: /^61(\d{9})$/,
    format: (num) => `+61 ${num.slice(2, 3)} ${num.slice(3, 7)} ${num.slice(7)}`,
  },
];

// Telefon nomerni formatlash funksiyasi
export function formatPhoneNumber(
  phoneNumber: string | null | undefined,
  format: 'standard' | 'international' | 'masked' | 'clean' = 'standard',
): string {
  // Null yoki undefined tekshiruvi
  if (!phoneNumber) {
    return '';
  }

  // + belgisini olib tashlaymiz va faqat raqamlarni qoldiramiz
  const cleanNumber = phoneNumber.replace(/^\+/, '').replace(/\D/g, '');

  if (!cleanNumber) {
    return phoneNumber;
  }

  // Format turiga qarab qaytaramiz
  switch (format) {
    case 'clean':
      return cleanNumber;

    case 'international':
      return `+${cleanNumber}`;

    case 'masked':
      return maskPhoneNumber(cleanNumber);

    case 'standard':
    default:
      return formatByCountry(cleanNumber);
  }
}

// Davlat bo'yicha formatlash
function formatByCountry(cleanNumber: string): string {
  for (const country of countryCodes) {
    if (country.pattern.test(cleanNumber)) {
      return country.format(cleanNumber);
    }
  }

  // Agar davlat topilmasa, standart format
  return formatGeneric(cleanNumber);
}

// Umumiy format (noma'lum davlatlar uchun)
function formatGeneric(cleanNumber: string): string {
  if (cleanNumber.length <= 7) {
    return `+${cleanNumber}`;
  }

  // Eng katta ehtimollik bilan davlat kodi 1-4 raqam
  const countryCodeLength = cleanNumber.length > 10 ? 2 : 1;
  const countryCode = cleanNumber.slice(0, countryCodeLength);
  const localNumber = cleanNumber.slice(countryCodeLength);

  // Mahalliy nomerni guruhlaymiz
  if (localNumber.length >= 10) {
    return `+${countryCode} ${localNumber.slice(0, 3)} ${localNumber.slice(3, 6)} ${localNumber.slice(
      6,
      8,
    )} ${localNumber.slice(8)}`;
  } else if (localNumber.length >= 7) {
    return `+${countryCode} ${localNumber.slice(0, 3)} ${localNumber.slice(3, 6)} ${localNumber.slice(6)}`;
  } else {
    return `+${countryCode} ${localNumber}`;
  }
}

// Yashirin format
function maskPhoneNumber(cleanNumber: string): string {
  if (cleanNumber.length <= 6) {
    return `+${cleanNumber}`;
  }

  const start = cleanNumber.slice(0, 3);
  const end = cleanNumber.slice(-2);
  const middleLength = cleanNumber.length - 5;
  const mask = '*'.repeat(Math.min(middleLength, 6));

  return `+${start}${mask}${end}`;
}

// Davlat nomini aniqlash
export function getCountryName(phoneNumber: string | null | undefined): string {
  if (!phoneNumber) {
    return "Noma'lum davlat";
  }
  const cleanNumber = phoneNumber.replace(/^\+/, '').replace(/\D/g, '');

  for (const country of countryCodes) {
    if (country.pattern.test(cleanNumber)) {
      return country.name;
    }
  }

  return "Noma'lum davlat";
}

// Telefon nomer validatsiyasi
export function isValidPhoneNumber(phoneNumber: string | null | undefined): boolean {
  if (!phoneNumber) {
    return false;
  }
  const cleanNumber = phoneNumber.replace(/^\+/, '').replace(/\D/g, '');

  // Minimal uzunlik tekshiruvi
  if (cleanNumber.length < 7 || cleanNumber.length > 15) {
    return false;
  }

  // Ma'lum davlatlar uchun aniq tekshirish
  for (const country of countryCodes) {
    if (country.pattern.test(cleanNumber)) {
      return true;
    }
  }

  // Umumiy tekshirish (7-15 raqam)
  return /^\d{7,15}$/.test(cleanNumber);
}

// Davlat kodini ajratib olish
export function getCountryCode(phoneNumber: string | null | undefined): string {
  if (!phoneNumber) {
    return '';
  }
  const cleanNumber = phoneNumber.replace(/^\+/, '').replace(/\D/g, '');

  for (const country of countryCodes) {
    if (country.pattern.test(cleanNumber)) {
      return country.code;
    }
  }

  // Agar aniq davlat topilmasa, ehtimoliy kod
  if (cleanNumber.length > 10) {
    return cleanNumber.slice(0, 2);
  } else {
    return cleanNumber.slice(0, 1);
  }
}
