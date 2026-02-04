import Prism from 'prismjs';
import 'prismjs/components/prism-jsx';
import React, { useEffect } from 'react';

import { Props } from '../types';

function PrismCode({ children, code, language, ...props }: Props & { code: string; language: string }) {
  useEffect(() => {
    const highlight = async () => {
      await Prism.highlightAll(); // <--- prepare Prism
    };
    highlight();
  }, [code, language]);

  return (
    <div className="Code" {...props}>
      <pre>
        <code className={`language-${language}`}>{code}</code>
      </pre>
    </div>
  );
}

export default PrismCode;
