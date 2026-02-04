import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Tag } from 'antd';
import clsx from 'clsx';
import Markdown from 'markdown-to-jsx';
import React from 'react';

import { Props } from '@src/types';

import { useMyTheme } from '@hooks/use-my-theme';

import Code from './code';
import CodeEditor from './code-editor';

export const Block = ({ className, children, color, fill, ...props }: { color?: string; fill?: boolean } & Props) => {
  return (
    <Tag
      color={color || 'yellow'}
      className={clsx({
        'p-2 my-2 border-[1px] rounded block': true,
        className,
        // [fill ? 'border-0 bg-yellow-500/70 text-white' : 'border-yellow-500 text-yellow-500']: !color,
        // [fill ? `border-0 bg-${color}-500 text-white` : `border-${color}-500 text-${color}-500 `]: color,
        // [fill ? 'border-0 bg-blue-500 text-white' : 'border-blue-500 text-blue-500 ']: color == 'blue',
        // [fill ? 'border-0 bg-red--500 text-white' : 'border-red-500 text-red-500 ']: color == 'red',
        // [fill ? 'border-0 bg-green-500 text-white' : 'border-green-500 text-green-500 ']: color == 'green',
        // [fill ? 'border-0 bg-pink-500 text-white' : 'border-pink-500 text-pink-500 ']: color == 'pink',
      })}
      {...props}
    >
      {children}
    </Tag>
  );
};
export const Title = ({ className, children, ...props }: Props) => {
  return (
    <h1 className={'mb-5 ' + className} {...props}>
      {children}
    </h1>
  );
};
export const Note = ({ className, children, ...props }: Props) => {
  const { isDarkMode } = useMyTheme();

  return (
    <div
      className={'flex items-start my-4 p-3 rounded-lg bg-[#e8b245] dark:bg-[#e8b245aa]' + className}
      css={css`
        box-shadow: 0 4px 8px 0px ${isDarkMode ? 'rgba(140,98,18,0.5)' : 'rgba(176,130,33,0.3)'};
      `}
      {...props}
    >
      <img src="/images/lamp.png" alt="" className={'mt-1 mr-2'} />
      <div>{children}</div>
    </div>
  );
};
export const Badge = ({ className, children, ...props }: Props) => {
  return (
    <span className={'bg-blue-800 px-2 py-1 mx-1 rounded ' + className} {...props}>
      {children}
    </span>
  );
};
export const ArticleCodeEditor = ({
  className,
  lang,
  children,
  ...props
}: { children: string; lang: string } & Props) => {
  return <CodeEditor code={children} language={lang || 'cpp'} className={'flex-1 ' + className} {...props} />;
};
export const ArticleCode = ({
  className,
  lang,
  code,
  children,
  ...props
}: { code?: string; children?: string; lang?: string } & Props) => {
  return <Code code={code || children || ``} language={lang || 'cpp'} className={' ' + className} {...props} />;
};

export const articleComponents = {
  // MyComponent: {
  //   component: Block,
  //   props: {
  //     className: 'foo',
  //   },
  // },
  Block: Block,
  h1: Title,
  Title,
  Note,
  blockquote: Note,
  Badge,
  Code: ArticleCode,
  code: ArticleCode,
  CodeEditor: ArticleCodeEditor,
};

function Article({ children, ...props }: Props) {
  const { isDarkMode } = useMyTheme();

  return (
    <ArticleWrapper className={''} {...props}>
      <MDXWrapper className={clsx(isDarkMode && 'dark')}>
        <Markdown options={{ overrides: articleComponents }}>{(children || '') as string}</Markdown>
      </MDXWrapper>
    </ArticleWrapper>
  );
}

export default Article;

export const ArticleWrapper = styled.article`
  flex: 1;
  overflow: auto;
  //max-width: 800px;
`;

export const MDXWrapper = styled.div`
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: bold;
  }

  li,
  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  div,
  button,
  a,
  th,
  td {
    line-height: 1.6;
    color: black;
  }
  span {
    line-height: 1.6;
  }

  p {
    margin-bottom: 1rem;
    line-height: 2;

    &:last-child {
      margin-bottom: 0;
    }
  }

  a {
    text-decoration: underline;

    &:hover {
      text-decoration: underline;
    }
  }

  img {
    max-width: 100%;
    border-radius: 6px;
  }

  ol,
  ul {
    padding-left: 20px;
  }

  ol {
    list-style-type: decimal;
  }

  ul {
    list-style-type: disc;
    margin-block: 10px;
  }

  li {
    margin-bottom: 10px;
  }

  hr {
    margin-block: 30px;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    overflow: hidden;
  }

  th,
  td {
    padding: 0.6em 1em;
    word-break: break-all;
    text-align: left;
  }

  tr {
    border-bottom: 1px solid #d0d0d0;
  }

  th:first-of-type,
  tr:first-child {
    border-top-left-radius: 10px;
  }

  th:last-of-type {
    border-top-right-radius: 10px;
  }

  tr:last-of-type td:first-of-type {
    border-bottom-left-radius: 10px;
  }

  tr:last-of-type td:last-of-type {
    border-bottom-right-radius: 10px;
  }

  hr {
    height: 1px;
    background-color: #d0d0d0;
    border: none;
  }

  iframe {
    max-width: 100%;
    border: none;
  }

  &.dark {
    li,
    p,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    div,
    button,
    a,
    th,
    td {
      color: #e8e8e8;
    }

    hr {
      background-color: #505050;
    }

    tr {
      border-bottom: 1px solid #505050;
    }
  }
`;
