import { css } from '@emotion/react';
import { SwitchChangeEventHandler } from 'antd/lib/switch';
import { observer } from 'mobx-react';
import React from 'react';

import { useMyTheme } from '@hooks/use-my-theme';

const flags: Record<string, string> = {
  ru: '/flags/russia.png',
  eng: '/flags/united-kingdom.png',
  uz: '/flags/uzbekistan.png',
};

export const DarkMode = observer(() => {
  const { theme, setTheme } = useMyTheme();

  return (
    <label className="switch" css={DarkModeCss}>
      <input
        checked={theme === 'dark'}
        onChange={() => (theme == 'dark' ? setTheme('light') : setTheme('dark'))}
        type="checkbox"
      />
      <div className="switch__button"></div>
      <div className="switch__background"></div>
    </label>
  );
});

const DarkModeCss = css`
  cursor: pointer;
  margin: 0 15px;
  display: block;
  width: 30px;
  height: 15px;
  position: relative;
  scale: 1.8;
  input {
    display: none;
  }
  input:checked ~ .switch__background {
    background-position: 20% 0%;
  }
  input:checked ~ .switch__background:before {
    opacity: 0.9;
  }
  input:checked ~ .switch__background:after {
    transform: translateY(250%);
    opacity: 0.5;
  }
  input:checked ~ .switch__button {
    left: calc(100% - 2.5px);
    transform: translateX(-100%);
    transition: 0.2s ease all;
    box-shadow: inset 3px 5px 3px #edf1f9;
    background: #c3c9d2;
  }
  input:checked ~ .switch__button:before {
    content: '';
    display: block;
    position: absolute;
    left: 6px;
    top: 5px;
    height: 2px;
    width: 2px;
    border-radius: 9px;
    background: #949ead;
    box-shadow: inset 2px 1px 1px #848e9b;
  }

  input:checked ~ .switch__button:after {
    content: '';
    display: block;
    position: absolute;
    left: 2px;
    top: 3px;
    height: 2px;
    width: 2px;
    border-radius: 12px;
    background: #949ead;
    box-shadow: inset 2px 2px 2px #848e9b;
  }
  .switch__button {
    top: 2.5px;
    left: 2.5px;
    width: 10px;
    height: 10px;
    border-radius: 30px;
    background: #f1c530;
    position: absolute;
    transition: 0.2s ease all;
    box-shadow: inset 3px 5px 3px #f8a100;
  }
  .switch__background {
    width: 100%;
    height: 100%;
    display: block;
    z-index: -1;
    background: grey;
    border-radius: 40px;
    position: relative;
    box-shadow: inset -4px -4px 6px rgba(255, 255, 255, 0.3), inset 4px 4px 6px rgba(70, 70, 70, 0.12);
    background: radial-gradient(
      circle at center right,
      #347ab2,
      #347ab2 10%,
      #4886b7 10%,
      #4886b7 20%,
      #5c93bf 20%,
      #5c93bf 30%,
      #699ec6 30%,
      #699ec6 40%,
      #494e5c 40%,
      #494e5c 50%,
      #404350 50%,
      #404350 60%,
      #2d333c 60%,
      #2d333c 70%,
      #242830 70%,
      #242830 80%,
      #111 80%,
      #111 90%
    );
    background-size: 250% 100%;
    background-position: 100% 0%;
    transition: 0.2s ease all;
    overflow: hidden;
  }
  .switch__background:before {
    content: '★';
    display: block;
    position: absolute;
    left: 5px;
    top: -30px;
    font-size: 3px;
    color: white;
    opacity: 0;
    transition: 0.2s ease all;
    text-shadow: 10px 10px 0px rgba(255, 255, 255, 0.8), 20px 5px 0px white;
  }
`;
