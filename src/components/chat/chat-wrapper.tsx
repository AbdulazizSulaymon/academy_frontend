import styled from '@emotion/styled';

export const prefersDarkMode = '(prefers-color-scheme: dark)';

export const ChatWrapper = styled.div`
  @mixin font-bold {
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
  }
  @mixin font {
    font-family: 'Poppins', sans-serif;
    font-weight: 400;
  }
  @mixin placeholder {
    &::-webkit-input-placeholder {
      @content;
    }

    &:-moz-placeholder {
      @content;
    }

    &::-moz-placeholder {
      @content;
    }

    &:-ms-input-placeholder {
      @content;
    }
  }

  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }

  --white: #fff;
  --black: #121212;
  --bg: #f8f8f8;
  --grey: #999;
  --dark: #1a1a1a;
  --light: #e6e6e6;
  --wrapper: 1000px;
  --blue: #00b0ff;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
  @include font;

  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  .wrapper {
    width: 100%;
    height: calc(100vh - 200px);
    background-color: var(--white);
    display: flex;
  }

  .left {
    width: 300px;
    height: 100%;
    border: 1px solid var(--light);
    background-color: var(--white);
    display: flex;
    flex-direction: column;
    overflow-y: auto;

    .top {
      width: 100%;
      display: flex;
      justify-content: space-between;
      position: sticky;
      top: 0;
      z-index: 1;
      background: white;
      padding: 10px;

      &:after {
        position: absolute;
        bottom: 0;
        left: 50%;
        display: block;
        width: 100%;
        height: 1px;
        content: '';
        background-color: var(--light);
        transform: translate(-50%, 0);
      }
    }

    input {
      flex: 1;
      height: 42px;
      padding: 0 15px;
      border: 1px solid var(--light);
      background-color: #eceff1;
      border-radius: 21px;
      @include font();

      &:focus {
        outline: none;
      }
    }

    a.search {
      display: block;
      width: 42px;
      height: 42px;
      margin-left: 10px;
      border: 1px solid var(--light);
      background-color: var(--blue);
      background-image: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/382994/name-type.png');
      background-repeat: no-repeat;
      background-position: top 12px left 14px;
      border-radius: 50%;
    }

    .people {
      padding: 10px;
      margin-top: 10px;
      flex: 1;

      .person {
        position: relative;
        width: 100%;
        padding: 10px 0;
        cursor: pointer;
        background-color: var(--white);
        transition: 0.2s;

        &:after {
          position: absolute;
          bottom: 0;
          left: 50%;
          display: block;
          width: 80%;
          height: 1px;
          content: '';
          background-color: var(--light);
          transform: translate(-50%, 0);
        }

        img {
          float: left;
          width: 40px;
          height: 40px;
          margin-right: 12px;
          border-radius: 50%;
          object-fit: cover;
        }

        .name {
          font-size: 14px;
          line-height: 22px;
          color: var(--dark);
          @include font-bold;
        }

        .time {
          font-size: 14px;
          position: absolute;
          top: 16px;
          right: 10%;
          padding: 0 0 5px 5px;
          color: var(--grey);
        }

        .preview {
          font-size: 14px;
          display: inline-block;
          overflow: hidden !important;
          width: 70%;
          white-space: nowrap;
          text-overflow: ellipsis;
          color: var(--grey);
        }

        &.active,
        &:hover {
          border: 0;
          background-color: var(--blue);
          padding-left: 10px;

          span {
            color: var(--white);
            background: transparent;
          }

          &:after {
            display: none;
          }
        }
      }
    }
  }

  .right {
    position: relative;
    flex: 1;
    display: flex;
    flex-direction: column;
    border-width: 1px 1px 1px 0;
    border-style: solid;
    border-color: var(--light);

    .top {
      width: 100%;
      height: 47px;
      padding: 15px 29px;
      background-color: #eceff1;
      border-width: 1px 1px 1px 0;
      border-style: solid;
      border-color: var(--light);

      span {
        font-size: 15px;
        color: var(--grey);

        .name {
          color: var(--dark);
          @include font-bold;
        }
      }
    }

    .chat {
      position: relative;
      display: none;
      justify-content: flex-end;
      flex-direction: column;
      flex: 1;
      overflow-y: auto !important;

      &.active-chat {
        display: block;
        display: flex;

        .bubble {
          transition-timing-function: cubic-bezier(0.4, -0.04, 1, 1);
          @for $i from 1 through 10 {
            &:nth-of-type(#{$i}) {
              animation-duration: 0.15s * $i;
            }
          }
        }
      }
    }

    .write {
      margin-top: 20px;
      margin-bottom: 29px;
      margin-left: 30px;
      height: 42px;
      padding-left: 8px;
      border: 1px solid var(--light);
      background-color: #eceff1;
      width: calc(100% - 58px);
      border-radius: 5px;
      display: flex;

      input {
        font-size: 16px;
        flex: 1;
        height: 40px;
        padding: 0 10px;
        color: var(--dark);
        border: 0;
        outline: none;
        background-color: #eceff1;
        @include font;
      }

      .write-link {
        &.attach {
          &:before {
            display: inline-block;
            width: 20px;
            height: 42px;
            content: '';
            background-image: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/382994/attachment.png');
            background-repeat: no-repeat;
            background-position: center;
          }
        }

        &.smiley {
          &:before {
            display: inline-block;
            width: 20px;
            height: 42px;
            content: '';
            background-image: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/382994/smiley.png');
            background-repeat: no-repeat;
            background-position: center;
          }
        }

        &.send {
          &:before {
            display: inline-block;
            width: 20px;
            height: 42px;
            margin-left: 11px;
            margin-right: 11px;
            content: '';
            background-image: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/382994/send.png');
            background-repeat: no-repeat;
            background-position: center;
          }
        }
      }
    }

    .bubble {
      font-size: 16px;
      position: relative;
      display: inline-block;
      clear: both;
      margin-bottom: 8px;
      padding: 13px 14px;
      vertical-align: top;
      border-radius: 5px;

      &:before {
        position: absolute;
        top: 19px;
        display: block;
        width: 8px;
        height: 6px;
        content: '\00A0';
        transform: rotate(29deg) skew(-35deg);
      }

      &.you {
        float: left;
        color: var(--white);
        background-color: var(--blue);
        align-self: flex-start;
        animation-name: slideFromLeft;

        &:before {
          left: -3px;
          background-color: var(--blue);
        }
      }

      &.me {
        float: right;
        color: var(--dark);
        background-color: #eceff1;
        align-self: flex-end;
        animation-name: slideFromRight;

        &:before {
          right: -3px;
          background-color: #eceff1;
        }
      }
    }

    .conversation-start {
      position: relative;
      width: 100%;
      margin-bottom: 27px;
      text-align: center;

      span {
        font-size: 14px;
        display: inline-block;
        color: var(--grey);

        &:before,
        &:after {
          position: absolute;
          top: 10px;
          display: inline-block;
          width: 30%;
          height: 1px;
          content: '';
          background-color: var(--light);
        }

        &:before {
          left: 0;
        }

        &:after {
          right: 0;
        }
      }
    }
  }

  html.dark & {
    .wrapper {
      background-color: var(--black);
    }

    .left {
      width: 300px;
      height: 100%;
      border: 1px solid var(--dark);
      background-color: var(--black);
      display: flex;
      flex-direction: column;
      overflow-y: auto;

      .top {
        width: 100%;
        display: flex;
        justify-content: space-between;
        position: sticky;
        top: 0;
        z-index: 1;
        background: var(--dark);
        padding: 10px;

        &:after {
          background-color: var(--dark);
        }
      }

      input {
        border: 1px solid var(--dark);
        background-color: var(--dark);
      }

      a.search {
        border: 1px solid var(--dark);
        background-color: var(--blue);
        background-image: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/382994/name-type.png');
      }

      .people {
        .person {
          background-color: var(--black);

          &:after {
            background-color: var(--dark);
          }

          .name {
            color: var(--light);
          }

          .time {
            color: var(--grey);
          }

          .preview {
            color: var(--grey);
          }

          &.active,
          &:hover {
            background-color: var(--blue);

            span {
              color: var(--light);
            }
          }
        }
      }
    }

    .right {
      border-color: var(--dark);

      .top {
        background-color: #1a1a1a;
        border-color: var(--dark);

        span {
          color: var(--light);

          .name {
            color: var(--light);
          }
        }
      }

      .write {
        border: 1px solid dimgrey;
        background-color: var(--dark);

        input {
          background-color: var(--dark);
          color: white;
        }

        .write-link {
          &.attach {
            &:before {
              background-image: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/382994/attachment.png');
            }
          }

          &.smiley {
            &:before {
              background-image: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/382994/smiley.png');
            }
          }

          &.send {
            &:before {
              background-image: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/382994/send.png');
            }
          }
        }
      }

      .bubble {
        &.you {
          color: var(--light);
          background-color: var(--blue);

          &:before {
            background-color: var(--blue);
          }
        }

        &.me {
          color: var(--light);
          background-color: #000;

          &:before {
            background-color: #000;
          }
        }
      }

      .conversation-start {
        span {
          color: var(--light);

          &:before,
          &:after {
            background-color: var(--dark);
          }
        }
      }
    }
  }

  @keyframes slideFromLeft {
    0% {
      margin-left: -200px;
      opacity: 0;
    }
    100% {
      margin-left: 0;
      opacity: 1;
    }
  }
  @-webkit-keyframes slideFromLeft {
    0% {
      margin-left: -200px;
      opacity: 0;
    }
    100% {
      margin-left: 0;
      opacity: 1;
    }
  }
  @keyframes slideFromRight {
    0% {
      margin-right: -200px;
      opacity: 0;
    }
    100% {
      margin-right: 0;
      opacity: 1;
    }
  }
  @-webkit-keyframes slideFromRight {
    0% {
      margin-right: -200px;
      opacity: 0;
    }
    100% {
      margin-right: 0;
      opacity: 1;
    }
  }
`;
