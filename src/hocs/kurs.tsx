import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';

export type KursType = {
  dollar: number;
};

const KursContext = React.createContext<KursType | null>(null);

export const KursProvider = ({ children }: { children: React.ReactNode }) => {
  const [kurs, setKurs] = useState<KursType | null>(null);

  useEffect(() => {
    axios
      .get('https://cbu.uz/uz/arkhiv-kursov-valyut/json/')
      .then((res: Record<string, any>) => {
        const dollar = res.data.find((item: Record<string, any>) => item.Ccy == 'USD');

        setKurs({ dollar: parseFloat(dollar.Rate) as number });
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return <KursContext.Provider value={kurs}>{children}</KursContext.Provider>;
};

export const useKurs = () => useContext(KursContext);
