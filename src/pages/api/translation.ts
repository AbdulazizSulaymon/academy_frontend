import fs from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';

const getLocaleFilePath = (lang: string): string => {
  return path.join(process.cwd(), 'public', 'locales', lang, 'translation.json');
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { key, translations } = req.body;

    if (typeof key !== 'string' || typeof translations !== 'object' || translations === null) {
      return res.status(400).json({ message: 'Invalid request format.' });
    }

    try {
      Object.entries(translations).forEach(([lang, value]) => {
        const filePath = getLocaleFilePath(lang);

        let jsonData: Record<string, string> = {};

        if (fs.existsSync(filePath)) {
          const fileContent = fs.readFileSync(filePath, 'utf-8');
          jsonData = JSON.parse(fileContent);
        }

        jsonData[key] = String(value);

        fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2), 'utf-8');
      });

      return res.status(200).json({ message: 'Translations saved successfully.' });
    } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({ message: 'Internal server error.' });
    }
  }

  if (req.method === 'DELETE') {
    const { key } = req.query;
    const languages = req.query['languages[]'];

    if (typeof key !== 'string' || !Array.isArray(languages)) {
      return res.status(400).json({ message: 'Invalid request format.' });
    }

    try {
      for (const language of languages) {
        const filePath = getLocaleFilePath(language);

        if (!fs.existsSync(filePath)) {
          continue;
        }

        const fileContent = fs.readFileSync(filePath, 'utf-8');
        let jsonData = JSON.parse(fileContent);

        if (key in jsonData) {
          delete jsonData[key];
          fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2), 'utf-8');
        }
      }

      return res.status(200).json({ message: 'Translation deleted successfully.' });
    } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({ message: 'Internal server error.' });
    }
  }

  return res.status(405).json({ message: 'Method not allowed.' });
}
