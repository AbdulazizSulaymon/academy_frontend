import { Global, css } from '@emotion/react';

//html,
//body {
//  background: linear-gradient(119.02deg, #3f4789 4.85%, #070c3f 98.03%);
//  color: white !important;
//}

export const GlobalStyles = () => (
  <Global
    styles={css`
      @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400&display=swap');
      @import url('https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
      @import url('https://fonts.googleapis.com/css2?family=Ubuntu+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap');
      @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap');

      html, body{
        scroll-behavior: smooth;
      }

      * {
        font-family: 'Rubik', 'Montserrat', sans-serif;
        line-height: 1.5;
      }

      code {
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
          font-family: 'Ubuntu Mono', MonoLisa, Menlo, Monaco, "Courier New", monospace;
        !important;
          letter-spacing: 0px !important;
          font-size: 16px !important;
        }
      }

      a {
        text-decoration: none !important;
        color: inherit !important;
        transition: color 0.2s ease;
      }

      /* Links should inherit color from parent, not use blue */
      a:link,
      a:visited,
      a:hover,
      a:active {
        color: inherit !important;
      }

      /* Antd Typography links - override default blue */
      .ant-typography a,
      .ant-typography a:link, 
      .ant-typography a:visited,
      .ant-typography a:hover,
      .ant-typography a:active {
        color: inherit !important;
      }

      /* Dark mode support for links */
      .dark a,
      .dark a:link,
      .dark a:visited,
      .dark a:hover,
      .dark a:active {
        color: inherit !important;
      }

      .dark .ant-typography a,
      .dark .ant-typography a:link,
      .dark .ant-typography a:visited,
      .dark .ant-typography a:hover,
      .dark .ant-typography a:active {
        color: inherit !important;
      }

      /* Primary links use theme colors on hover only */
      a.primary-link:hover,
      a[class*="text-primary"]:hover,
      .ant-typography a.primary-link:hover,
      .ant-typography a[class*="text-primary"]:hover {
        color: #F87607 !important;
      }

      .dark a.primary-link:hover,
      .dark a[class*="text-primary"]:hover,
      .dark .ant-typography a.primary-link:hover,
      .dark .ant-typography a[class*="text-primary"]:hover {
        color: #f5892d !important;
      }

      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        font-weight: bold;
      }

      h1 {
        font-size: 1.875rem;
      }

      h2 {
        font-size: 1.7rem;
      }

      h3 {
        font-size: 1.6rem;
      }

      h4 {
        font-size: 1.5rem;
      }

      h5 {
        font-size: 1.4rem;
      }

      h6 {
        font-size: 1.2rem;
      }

      ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
      }

      /* width */

      ::-webkit-scrollbar {
        width: 8px;
        height: 8px;
        z-index: 1000;
      }

      /* Track */

      ::-webkit-scrollbar-track {
        box-shadow: inset 0 0 5px transparent !important;
        border-radius: 0px;
        z-index: 1000;
      }

      /* Handle */

      ::-webkit-scrollbar-thumb {
        background: rgba(128, 128, 128, 0.5) !important;
        border-radius: 8px;
        z-index: 1000;
      }

      /* Handle on hover */

      ::-webkit-scrollbar-thumb:hover {
        background: #f0f0f06e;
        z-index: 1000;
      }

      input[type='checkbox'],
      input[type='radio'] {
        vertical-align: middle;
      }

      button {
        display: inline-flex !important;
        align-items: center !important;
        justify-content: center;
      }

      body, .ant-layout, .ant-typography, a, li, span, div {
        //font-size: 16px;
      }

      .ant-dropdown-menu {
        max-height: 900px !important;
        overflow: auto;
      }

      .ant-btn {
        svg {
          display: inline-block !important;
        }
      }

      .ant-popconfirm-message{
        align-items: center !important;
        gap: 4px;
      }

      .ant-popconfirm-message-icon{
        display: flex;
        align-items: center;
      }

      @media screen and (max-width: 769px) {
        .ant-modal-content {
          padding: 16px !important;
        }
      }

      .gradient-text {
        background-size: contain;
        background-position: top left;
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
      }

      /* Animations */

      .animate {
        -webkit-animation-duration: 2s;
        animation-duration: 2s;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
      }

      /*=== slide-right ===*/
      @-webkit-keyframes slide-right {
        from {
          opacity: 0;
          -webkit-transform: translate3d(30%, 0, 0);
          transform: translate3d(30%, 0, 0);
        }
        to {
          opacity: 1;
          -webkit-transform: none;
          transform: none;
        }
      }
      @keyframes slide-right {
        from {
          opacity: 0;
          -webkit-transform: translate3d(30%, 0, 0);
          transform: translate3d(30%, 0, 0);
        }
        to {
          opacity: 1;
          -webkit-transform: none;
          transform: none;
        }
      }

      .slide-right {
        -webkit-animation-name: slide-right;
        animation-name: slide-right;
      }

      @-webkit-keyframes slide-left {
        from {
          opacity: 0;
          -webkit-transform: translate3d(-30%, 0, 0);
          transform: translate3d(-30%, 0, 0);
        }
        to {
          opacity: 1;
          -webkit-transform: none;
          transform: none;
        }
      }
      @keyframes slide-left {
        from {
          opacity: 0;
          -webkit-transform: translate3d(-30%, 0, 0);
          transform: translate3d(-30%, 0, 0);
        }
        to {
          opacity: 1;
          -webkit-transform: none;
          transform: none;
        }
      }

      .slide-left {
        -webkit-animation-name: slide-left;
        animation-name: slide-left;
      }

      /* FADE IN */
      /* make keyframes that tell the start state and the end state of our object */
      @-webkit-keyframes fadeIn {
        from {
          opacity: 0;
          opacity: 1 \\9;
        }
        to {
          opacity: 1;
        }
      }
      @-moz-keyframes fadeIn {
        from {
          opacity: 0;
          opacity: 1 \\9;
        }
        to {
          opacity: 1;
        }
      }
      @keyframes fadeIn {
        from {
          opacity: 0;
          opacity: 1 \\9;
        }
        to {
          opacity: 1;
        }
      }

      .fade-in {
        opacity: 0;
        -webkit-animation: fadeIn ease-in 1;
        -moz-animation: fadeIn ease-in 1;
        animation: fadeIn ease-in 1;
        /* Animation is done */
        -webkit-animation-fill-mode: forwards;
        -moz-animation-fill-mode: forwards;
        animation-fill-mode: forwards;
        -webkit-animation-duration: 1s;
        -moz-animation-duration: 1s;
        animation-duration: 1s;
      }

      .fade-in.delay {
        -webkit-animation-delay: 2s;
        -moz-animation-delay: 2s;
        animation-delay: 2s;
      }

      .circle-animation {
        animation-name: circle;
        animation-duration: 20s;
        animation-iteration-count: infinite;
        //animation-timing-function: linear;
        animation-timing-function: cubic-bezier(0.42, -0.5, 0.4, 1);
      }

      @keyframes circle {
        0% {
          transform: rotateZ(0deg);
        }
        100% {
          transform: rotateZ(360deg);
        }
      }
    `}
  />
);
