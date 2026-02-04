import { css } from '@emotion/react';
import { get } from 'lodash';
import React, { useMemo } from 'react';
// import cpp from 'react-syntax-highlighter/dist/cjs/languages/prism/cpp';
import SyntaxHighlighter from 'react-syntax-highlighter/dist/cjs/prism-async-light';
import { nightOwl } from 'react-syntax-highlighter/dist/cjs/styles/prism';

import { CodeProps, Props } from '../types';
import { prettierFormat } from '../utils/util';
import { Typography } from 'antd';

// SyntaxHighlighter.registerLanguage('cpp', cpp);

function Code({ code, language, inline, title, ...props }: Props & CodeProps) {
  const codes = useMemo(() => (Array.isArray(code) && code.length > 0 ? code[0] : code), [code]);

  // console.log(11, code, codes, prettierFormat(codes));

  const content = (
    <SyntaxHighlighter
      language={language}
      style={nightOwl}
      lineProps={{ style: { wordBreak: 'break-all', whiteSpace: 'pre-wrap' } }}
      wrapLines={true}
      showLineNumbers={!inline}
      css={
        inline &&
        css`
          display: inline-block;
          border-radius: 0.5rem;
          margin: 0 0.3rem !important;
          vertical-align: middle;
          padding: 0.5rem !important;
        `
      }
      {...props}
    >
      {prettierFormat(codes)?.trim()}
    </SyntaxHighlighter>
  );

  return title ? (
    <div
      className={'rounded-lg shadow overflow-hidden pt-2 bg-slate-500 dark:bg-slate-800'}
      css={css`
        pre {
          margin-bottom: 0 !important;
        }
      `}
    >
      <Typography className={'text-white ml-2 mb-2 mr-2'}>{title}</Typography>
      {content}
    </div>
  ) : (
    <div
      className={'rounded-lg shadow overflow-hidden'}
      css={css`
        pre {
          margin-block: 0 !important;
        }
      `}
    >
      {content}
    </div>
  );
}

export default Code;
