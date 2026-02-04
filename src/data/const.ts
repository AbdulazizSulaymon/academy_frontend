export const baseBackendUrl = process.env.NEXT_PUBLIC_BACKEND_URL as string;
export const projectName = process.env.NEXT_PUBLIC_PROJECT_NAME as string;
export const tokenName = process.env.NEXT_PUBLIC_TOKEN_NAME as string;
export const docsKey = process.env.NEXT_PUBLIC_DOCS_KEY as string;
export const isProduction = process.env.NODE_ENV === 'production';
export const lockKey = process.env.NEXT_PUBLIC_LOCK_KEY as string;
export const encryptKey = process.env.NEXT_PUBLIC_ENCRYPT_KEY as string;
export const adminKey = process.env.NEXT_PUBLIC_ADMIN_KEY as string;
export const tinymceApiKey = process.env.NEXT_PUBLIC_TINYMCE_API_KEY as string;

// Site domain configuration
export const SITE_URL = 'https://hbsacademy.uz';

// Contact information
export const email = 'info@hbsacademy.uz';
export const phoneNumber = '+998978881027';

// Product UI helpers
export const NEW_PRODUCT_DAYS = 3;
