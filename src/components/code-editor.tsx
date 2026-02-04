import { css } from '@emotion/react';
import Editor, { Monaco, loader } from '@monaco-editor/react';
import { Button } from 'antd';
import axios, { AxiosError } from 'axios';
import clsx from 'clsx';
// import { editor } from 'monaco-editor';
import React, { useCallback, useEffect, useRef } from 'react';
import { FaPlay } from 'react-icons/fa';

import { Props } from '../types';
import Loading from './loading';
import { useMutation } from '@tanstack/react-query';

// import IStandaloneCodeEditor = editor.IStandaloneCodeEditor;
// import IMarker = editor.IMarker;

const nightOwlTheme = {
  base: 'vs-dark' as const,
  inherit: true,
  rules: [
    { token: 'comment', foreground: '637777', fontStyle: 'italic' },
    { token: 'keyword', foreground: 'c792ea' },
    { token: 'string', foreground: 'ecc48d' },
    { token: 'number', foreground: 'f78c6c' },
    { token: 'type', foreground: 'ffcb8b' },
    { token: 'function', foreground: '82aaff' },
    { token: 'variable', foreground: 'd6deeb' },
    { token: 'constant', foreground: '82aaff' },
  ],
  colors: {
    'editor.background': '#011627',
    'editor.foreground': '#d6deeb',
    'editorLineNumber.foreground': '#4b6479',
    'editorCursor.foreground': '#80a4c2',
    'editor.selectionBackground': '#1d3b53',
    'editor.lineHighlightBackground': '#01111d',
  },
};

const defineTheme = (theme: string) => {
  return new Promise<void>((res) => {
    loader.init().then((monaco) => {
      monaco.editor.defineTheme(theme, nightOwlTheme);
      res();
    });
  });
};

const CodeEditor = ({
  className,
  code,
  language,
  onresize,
  ...props
}: Props & { code: string; language: string; onresize?: boolean }) => {
  const editorRef = useRef({} as any);
  // const [result, setResult] = useState("");
  // const [error, setError] = useState("");

  function handleEditorDidMount(editor: any, monaco: Monaco) {
    editorRef.current = editor;

    if (onresize)
      window.onresize = function () {
        editor.layout({ width: 100, height: 100 });
      };
    // window.onresize = _.debounce(function () {
    //   editor.layout({ width: 100, height: 100 });
    // }, 1000);

    // const container = document.querySelector(
    //   "#monacoEditorContainer"
    // ) as HTMLDivElement;
    // if (container) {
    //   console.log("if worked");
    //   container.onresize = function () {
    //     console.log("onresize");
    //     editor.layout({ width: 100, height: 100 });
    //   };
    //
    //   console.log(container.onresize);
    // }
  }

  const showValue = useCallback(() => {
    alert(editorRef.current.getValue());
  }, [editorRef.current]);

  const getValue = useCallback(() => {
    console.log(editorRef.current.getValue());
    return editorRef.current.getValue();
  }, [editorRef.current]);

  // function run() {
  //   axios
  //     .post("http://localhost:3002/api/compiler", {
  //       code: getValue(),
  //       lang: "C++",
  //     })
  //     .then((data) => {
  //       console.log(data);
  //       setResult(data.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       setError(error.response.data.error_msg);
  //     });
  // }

  function handleEditorValidation(markers: any[]) {
    // model markers
    markers.forEach((marker) => console.log('onValidate:', marker.message));
  }

  useEffect(() => {
    defineTheme('night-owl');
  }, []);

  const {
    data,
    error,
    isLoading,
    mutateAsync: run,
  } = useMutation(() => {
    return axios.post('http://localhost:3002/api/compiler', {
      code: getValue(),
      lang: 'C++',
    });
  });

  // console.log({ data, error, loading, run, cancel });

  // @ts-ignore
  return (
    <div
      id={'monacoEditorContainer'}
      className={(className as string) + ' rounded-lg overflow-hidden shadow-2xl bg-[#011627]'}
      css={css`
        overflow: auto;
        svg {
          display: inline-block;
          margin-right: 0.3rem;
        }
      `}
      {...props}
    >
      <div className={'mb-0 p-2'}>
        <Button icon={<FaPlay />} type={'primary'} className={'border-0 mr-1'} size={'small'} onClick={showValue}>
          Show value
        </Button>
        <Button icon={<FaPlay />} type={'primary'} className={'border-0 mr-1'} size={'small'} onClick={() => run()}>
          Run
        </Button>
      </div>

      <Editor
        width={'100%'}
        height="80vh"
        theme={'night-owl'}
        defaultLanguage={language}
        defaultValue={code}
        onMount={handleEditorDidMount}
        onValidate={handleEditorValidation}
        loading={<Loading />}
        options={{
          automaticLayout: true,
        }}
        className={''}
        css={css`
          &,
          h1,
          h2,
          h3,
          h4,
          h5,
          h6,
          span,
          a,
          li,
          div,
          textarea,
          input {
            font-family: 'Ubuntu Mono', MonoLisa, Menlo, Monaco, "Courier New", monospace; !important;
            letter-spacing: 0px !important;
            font-size: 16px !important;
          }
        `}
      />
      <pre className={'p-3 border-t-[1px] border-gray-500'}>
        <code className={clsx({ 'text-red-500': error })}>
          {(isLoading && <Loading />) || ''}
          {data && JSON.stringify(data.data)}
          {(!!error && (
            <>
              <span className={'font-bold'}>Error: </span>
              {
                // @ts-ignore
                (error as AxiosError)?.response?.data?.error_msg
              }
            </>
          )) ||
            ''}
        </code>
      </pre>
    </div>
  );
};

export default CodeEditor;
