import { css } from '@emotion/react';
import { useDebounce, useUpdateEffect } from 'ahooks';
import { Button, Tooltip } from 'antd';
import { observer } from 'mobx-react';
import React, {
  KeyboardEventHandler,
  MouseEventHandler,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useDetectClickOutside } from 'react-detect-click-outside';
import {
  AiFillCode,
  AiOutlineAudio,
  AiOutlineCheckSquare,
  AiOutlineLink,
  AiOutlineStrikethrough,
} from 'react-icons/ai';
import { BiBold, BiCode, BiCopyright, BiItalic, BiListOl, BiListUl, BiSpaceBar, BiVideo } from 'react-icons/bi';
import { BsCardImage, BsSquare, BsSquareFill, BsWindowSplit } from 'react-icons/bs';
import { CiViewTable } from 'react-icons/ci';
import { FiInfo } from 'react-icons/fi';
import { ImPageBreak } from 'react-icons/im';
import { RiArrowLeftSLine } from 'react-icons/ri';

import Article, { ArticleCode, Block, Note } from '@components/article';
import { IoIosCodeWorking } from 'react-icons/io';
import { FaRegImage } from 'react-icons/fa';
import { RxDividerVertical } from 'react-icons/rx';

// eslint-disable-next-line react/display-name
export const ActionButton = React.memo(
  ({ action }: { action: { icon: React.ReactNode; title: React.ReactNode; onClick: Function } }) => {
    return (
      <Tooltip title={action.title}>
        <Button
          type={'text'}
          size={'small'}
          className={'border-0'}
          onClick={action.onClick as MouseEventHandler<HTMLElement>}
        >
          {action.icon}
        </Button>
      </Tooltip>
    );
  },
);

export const MarkdownEditor = observer(
  ({
    value,
    setValue,
    initialValue = null,
    readOnly,
    collapse = false,
  }: {
    value: string;
    setValue: (value: string) => void;
    initialValue?: any;
    readOnly?: boolean;
    collapse?: boolean;
  }) => {
    const refArticle = useRef(null);
    const refTextarea = useRef<HTMLTextAreaElement>(null);
    const [mdValue, setMdValue] = useState<string>(initialValue || value);
    const [selectionStart, setSelectionStart] = useState(0);
    const debouncedValue = useDebounce(mdValue, { wait: 1000 });
    const [show, setShow] = useState(false);
    const [state, setState] = useState<'both' | 'editor' | 'result'>('both');

    const ref = useDetectClickOutside({
      onTriggered: () => setShow(false),
      triggerKeys: ['Escape'],
    });

    useUpdateEffect(() => {
      setValue(debouncedValue);
    }, [debouncedValue]);

    useUpdateEffect(() => {
      setMdValue(value);
    }, [value]);

    const getTextarea = useCallback(() => (refTextarea.current || {}) as HTMLTextAreaElement, []);
    const onScroll: React.UIEventHandler<HTMLTextAreaElement> = useCallback(
      (e) => {
        const textarea = getTextarea();
        const articleDiv = (refArticle.current || {}) as HTMLDivElement;
        articleDiv.scrollTop = Math.floor(
          ((articleDiv.scrollHeight - articleDiv.clientHeight) * textarea.scrollTop) /
            (textarea.scrollHeight - textarea.clientHeight),
        );
      },
      [getTextarea],
    );
    const getCursorPosition = useCallback(() => getTextarea().selectionStart, [getTextarea]);
    const addText = useCallback(
      (text: string, start?: number, end?: number) => {
        if (!start) start = getCursorPosition();
        if (!end) end = start;

        setMdValue((mdValue?.substring(0, start) || '') + text + (mdValue?.substring(end) || ''));
        setSelectionStart(start + text.length);
      },
      [mdValue, getCursorPosition],
    );
    useEffect(() => {
      const textarea = getTextarea();
      const scrollTop = textarea.scrollTop;
      // textarea.focus();
      textarea.selectionStart = textarea.selectionEnd = selectionStart;
      textarea.scrollTop = scrollTop;
    }, [selectionStart]);

    const onKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (event) => {
      if (event.keyCode === 9) {
        // tab was pressed
        event.preventDefault();

        const textarea = getTextarea();
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;

        addText('\t', start, end);
      }
    };

    const getAction = useCallback(
      (icon: React.ReactNode, title: React.ReactNode, onClick: Function) => ({ icon, title, onClick }),
      [],
    );
    const actions = useMemo(
      () => [
        [
          getAction(<IoIosCodeWorking />, <span>Editor</span>, () => setState('editor')),
          getAction(<BsWindowSplit />, <span>Editor + Oyna</span>, () => setState('both')),
          getAction(<FaRegImage />, <span>Oyna</span>, () => setState('result')),
        ],
        [
          getAction(<small>H1</small>, <h1>Bosh sarlavha</h1>, () => addText('# ')),
          getAction(<small>H2</small>, <h2>h2 sarlavha</h2>, () => addText('## ')),
          getAction(<small>H3</small>, <h3>h3 sarlavha</h3>, () => addText('### ')),
          getAction(<small>H4</small>, <h4>h4 sarlavha</h4>, () => addText('#### ')),
          getAction(<small>H5</small>, <h5>h5 sarlavha</h5>, () => addText('##### ')),
          getAction(<small>H6</small>, <h6>h6 sarlavha</h6>, () => addText('###### ')),
          getAction(<BiBold />, <b>Qalin yozuv</b>, () => addText('**bold** ')),
          getAction(<BiItalic />, <i>Yotiq yozuv</i>, () => addText('*italic*')),
          getAction(<AiOutlineStrikethrough />, <s>O'rtasi chizilgan yozuv</s>, () => addText('~~strike~~')),
          getAction(
            <ImPageBreak />,
            <p>
              Qatorni bo'luvchi <br /> (Line Break)
            </p>,
            () => addText('<br>'),
          ),
          getAction(<BiSpaceBar />, <p>Probel</p>, () => addText('&nbsp;')),
          getAction(<AiOutlineLink />, <a>Link</a>, () => addText('[Link](http://algorismic.uz/) ')),
          getAction(<CiViewTable />, `Jadval`, () =>
            addText(`
| Month    | Savings |
| -------- | ------- |
| January  | $250    |
| February | $80     |
| March    | $420    |
        `),
          ),
          getAction(<BiListUl />, `Tartiblanmagan ro'yxat`, () => addText(`  * Item`)),
          getAction(<BiListOl />, `Tartiblangan ro'yxat`, () => addText(`  1. Item`)),
          getAction(<FiInfo />, <Note>Ma'lumot uchun</Note>, () => addText(`> `)),
          getAction(
            <AiOutlineCheckSquare />,
            <>
              <input type="checkbox" id={'checkbox-tooltip'} className={'mr-1'} readOnly={true} />
              <label htmlFor="checkbox-tooltip">Checkbox</label>
            </>,
            () => addText(`[x] Item `),
          ),
          getAction(<BsSquare className={'text-yellow-500'} />, <Block>Text</Block>, () =>
            addText(`<Block>Text</Block>`),
          ),
          getAction(<BsSquare className={'text-green-500'} />, <Block color={'green'}>Block</Block>, () =>
            addText(`<Block color="green">Text</Block>`),
          ),
          getAction(<BsSquare className={'text-blue-500'} />, <Block color={'blue'}>Text</Block>, () =>
            addText(`<Block color="blue">Text</Block>`),
          ),
          getAction(<BsSquare className={'text-red-500'} />, <Block color={'red'}>Text</Block>, () =>
            addText(`<Block color="red">Text</Block>`),
          ),
          getAction(<BsSquareFill className={'text-yellow-500 bg-yellow-500'} />, <Block fill>Text</Block>, () =>
            addText(`<Block fill>Text</Block>`),
          ),
          getAction(
            <BsSquareFill className={'text-green-500 bg-green-500'} />,
            <Block color={'green'} fill>
              Text
            </Block>,
            () => addText(`<Block fill color="green">Text</Block>`),
          ),
          getAction(
            <BsSquareFill className={'text-blue-500 bg-blue-500'} />,
            <Block color={'blue'} fill>
              Text
            </Block>,
            () => addText(`<Block fill color="blue">Text</Block>`),
          ),
          getAction(
            <BsSquareFill className={'text-red-500 bg-red-500'} />,
            <Block color={'red'} fill>
              Text
            </Block>,
            () => addText(`<Block fill color="red">Text</Block>`),
          ),
          getAction(
            <BsSquareFill className={'text-purple-500 bg-purple-500'} />,
            <Block color={'purple'} fill>
              Text
            </Block>,
            () => addText(`<Block fill color="purple">Text</Block>`),
          ),
          getAction(<BsCardImage />, 'Rasm', () => addText(`![LogoImage](/logo/light/logo.png)`)),
          getAction(
            <BiCode />,
            <ArticleCode>int a = 10;</ArticleCode>,
            () =>
              addText(`<Code lang="cpp">
      int a = 10;</Code>`),
            // addText('`code`'),
          ),
          getAction(<AiFillCode />, 'Kod muharrir', () => addText(`<CodeEditor lang='cpp' code="int a = 10;" />`)),
          getAction(<BiVideo />, `Video`, () => addText(`<video src="" controls style="max-width: 100%"></video>`)),
          getAction(<AiOutlineAudio />, 'Audio', () =>
            addText(`<audio src="" controls style="max-width: 100%"></audio>`),
          ),
          getAction(<BiCopyright />, <p>&copy;</p>, () => addText(`©`)),
          getAction(<RiArrowLeftSLine />, <p>&lt;tag&gt;</p>, () => addText(`&lt;tag&gt; &lt;/tag&gt;`)),
        ],
      ],
      [addText, getAction],
    );

    const editorActions = (): ReactNode => {
      return (
        <div
          className={
            'flex-1 rounded-lg border-[1px] border-gray-200 dark:border-gray-600 border-solid max-h-screen flex flex-col'
          }
        >
          <div className={'p-2 flex flex-wrap items-center'}>
            {actions?.map((group, index) => (
              <>
                {index == 0 ? (
                  <span className={'bg-gray-300 dark:bg-gray-700 rounded'}>
                    {group.map((action, indexAction) => (
                      <ActionButton key={indexAction} action={action} />
                    ))}
                  </span>
                ) : (
                  group.map((action, indexAction) => <ActionButton key={indexAction} action={action} />)
                )}
                {index !== actions.length - 1 && <RxDividerVertical className={''} style={{ height: 24, width: 24 }} />}
              </>
            ))}
          </div>
          <textarea
            className={
              'resize-none bg-transparent outline-0 border-0 border-t-[1px] border-gray-300 dark:border-gray-600 outline-[#33337355]  w-full h-full max-h-screen  p-2 min-h-[400px]'
            }
            value={mdValue || ''}
            onChange={(e) => !readOnly && setMdValue(e.target.value)}
            onScroll={onScroll}
            onKeyDown={onKeyDown}
            ref={refTextarea}
          ></textarea>
        </div>
      );
    };

    useEffect(() => {
      if (show && collapse && refTextarea.current) refTextarea.current.focus();
    }, [refTextarea.current, show]);

    return (
      <div ref={ref} className={`flex gap-4 ${!collapse ? 'gap-4 h-full' : 'flex-col-reverse'}`} css={css``}>
        {(!collapse || show) && (state === 'both' || state === 'editor') ? editorActions() : null}

        {(state === 'both' || state === 'result') && (
          <div
            className={`flex-1 min-h-[32px] h-full overflow-auto cursor-text ${
              collapse
                ? 'p-2 py-1 rounded-lg border-[1px] border-gray-200 dark:border-gray-600 border-solid'
                : 'min-h-[500px]'
            }`}
            css={css`
              max-height: calc(100vh - 80px);
            `}
            onClick={() => {
              setShow(true);
              refTextarea.current?.focus();
            }}
            ref={refArticle}
          >
            {state === 'result' && (
              <div
                className={
                  'p-2 flex flex-wrap items-center rounded-lg border-[1px] border-gray-200 dark:border-gray-600 border-solid'
                }
              >
                {actions[0].map((action, indexAction) => (
                  <ActionButton key={indexAction} action={action} />
                ))}
              </div>
            )}
            <Article>{debouncedValue || value}</Article>
          </div>
        )}
      </div>
    );
  },
);
