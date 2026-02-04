import { HappyProvider } from '@ant-design/happy-work-theme';
import { FaRegCircleUser as UserOutlined } from 'react-icons/fa6';
import { css } from '@emotion/react';
import { join } from '@fireflysemantics/join';
import { useFullscreen, useKeyPress } from 'ahooks';
import {
  Avatar,
  Breadcrumb,
  Button,
  Divider,
  Drawer,
  Dropdown,
  Layout,
  Menu,
  MenuProps,
  Spin,
  Switch,
  Typography,
  theme as antdTheme,
} from 'antd';
import { BreadcrumbItemType } from 'antd/es/breadcrumb/Breadcrumb';
import clsx from 'clsx';
import { flatten } from 'lodash';
import { observer } from 'mobx-react';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { Fade } from 'react-awesome-reveal';
import { useTranslation } from 'react-i18next';
import { AiOutlineUserSwitch } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import { GoMoon, GoSun } from 'react-icons/go';
import { HiOutlineLogout } from 'react-icons/hi';
import { MdFullscreen, MdFullscreenExit } from 'react-icons/md';
import { RiMenuFoldLine, RiMenuUnfoldLine } from 'react-icons/ri';

import { useApi } from '@src/api';
import { useI18n } from '@src/i18/useI18n';
import { useStore } from '@src/stores/stores';
import { DarkMode } from '@src/widgets/dark-mode/dark_mode';
import { LanguageElements } from '@src/widgets/language/language';
import Notification from '@src/widgets/notification';

import { Lottie } from '@components/lottie/lottie';
import { Title } from '@components/title';

import { useMyTheme } from '@hooks/use-my-theme';
import { useUserMe } from '@hooks/use-user-me';

const { useToken } = antdTheme;

const { Text } = Typography;

const { Header, Sider, Content, Footer } = Layout;

export type Menus = (
  | { key: string; icon: React.ReactNode; label: string; path?: undefined; children?: any }
  | { key: string; icon: React.ReactNode; label: string; path: string; children?: any }
)[];

export const Welcome = (
  <div className={'flex flex-col items-center justify-center h-[80vh]'}>
    <Lottie link={'/lotties/welcome three.lottie'} height={400} width={400} />

    <Title>Xush kelibsiz</Title>
  </div>
);

const DashboardLayout = observer(
  ({
    children,
    menuItems,
    startPath = '/',
    footerTitle,
    withoutPadding,
    happyWork,
    title: titleFromProps,
    breadcrumbItems,
  }: {
    children: React.ReactNode;
    title?: string;
    menuItems: Menus;
    startPath?: string;
    footerTitle?: string;
    withoutPadding?: boolean;
    happyWork?: boolean;
    breadcrumbItems?: BreadcrumbItemType[];
  }) => {
    const store = useStore();
    const { collapsed, setCollapsed } = store.layoutStore;
    const { token } = useToken();
    const api = useApi();
    const router = useRouter();
    const { t } = useTranslation();
    const { isLoading, isError } = useUserMe();
    const { theme, isDarkMode, setTheme, toggleTheme } = useMyTheme();

    const { user, lang, roles, permissions } = useStore().layoutStore;
    useI18n(user?.lang);

    const [subPath, title, currentMenuItemName, currentMenuItem] = useMemo(() => {
      const route = router.route + '/';
      const slashIndex = route.indexOf('/', startPath.length + 1);
      const subPath = route.slice(startPath.length + 1, slashIndex);
      const title = route.slice(slashIndex + 1, router.route.indexOf('/', slashIndex + 1));
      const currentMenuItemName = title || subPath;

      const items = flatten(menuItems.map((menu) => menu.children || menu));

      const currentMenuItem = items.find((item) => item.key === currentMenuItemName);

      return [subPath, title, currentMenuItemName, currentMenuItem];
    }, [router.route, startPath]);

    const contentStyle = {
      backgroundColor: token.colorBgElevated,
      borderRadius: token.borderRadiusLG,
      boxShadow: token.boxShadowSecondary,
    };
    const menuStyle = {
      boxShadow: 'none',
    };

    const profileItems: MenuProps['items'] = useMemo(
      () => [
        {
          label: (
            <p className={'m-0 flex items-center gap-2'}>
              <CgProfile />
              {t(`Profil`) || ''}
              {/*{user.firstName || user.lastName*/}
              {/*  ? `${user.firstName || ''} ${user.lastName || ''}`*/}
              {/*  : "Shaxsiy ma'lumotlar"}*/}
            </p>
          ),
          key: 'profile',
          onClick: () => {
            router.push(join(startPath, 'profile-settings'));
          },
        },
        // { type: 'divider' },

        {
          label: (
            <p className={'m-0 flex items-center'}>
              <AiOutlineUserSwitch className={'mr-2'} /> {t('Role') || ''}
            </p>
          ),
          key: 'role',
          onClick: () => {
            router.push(join(startPath, 'select-role'));
          },
        },

        {
          label: (
            <p className={'m-0 flex items-center'}>
              <HiOutlineLogout className={'mr-2'} /> {t('Chiqish') || ''}
            </p>
          ),
          key: 'log-out',
          onClick: () => api.logOut(),
        },
      ],
      [user, lang, user?.lang],
    );

    // Fullscreen
    const ref = useRef(null);
    const [isFullscreen, { enterFullscreen, exitFullscreen, toggleFullscreen }] = useFullscreen(ref);
    useKeyPress('f', (event) => {
      if ((event.target as HTMLElement).tagName === 'BODY') toggleFullscreen();
    });

    useEffect(() => {
      setCollapsed(localStorage.getItem('sidebar') == 'true');
    }, []);

    useEffect(() => {
      if (!api.getToken()) router.push('/login');
    }, []);

    const onSelectMenu = useCallback(
      (obj: Record<string, any>, isCollapsed = false) => {
        router.push(join(startPath, ...obj.keyPath.reverse()));
        setCollapsed(isCollapsed);
      },
      [setCollapsed, startPath],
    );

    // useEffect(() => {
    //   const ifHas = menuItems.some((item) => item.key === title);
    //   console.log('aa', title, ifHas, !ifHas && user, menuItems);
    //   // if (!ifHas && user) router.push('/admin/login');
    // }, [menuItems]);

    // const ifHas = menuItems.some((item) => router.route.includes(item.key));
    // if (!ifHas && roleName)
    //   return (
    //     <Box className={'py-10 min-h-[100vh] bg-amber-200 flex flex-col justify-center'}>
    //       <Result
    //         status="403"
    //         title="403"
    //         subTitle="Sizda bu sahifa uchun ruxsat yo'q"
    //         extra={
    //           <Button type={'primary'} onClick={() => router.push('/admin/login')}>
    //             Login sahifaga o'tish
    //           </Button>
    //         }
    //       />
    //     </Box>
    //   );
    // else if (!roleName) return null;

    if (isLoading)
      return (
        <div className="p-4">
          <Spin />
        </div>
      );

    return (
      <Layout ref={ref} className={'h-[100vh]'} css={LayoutCSS}>
        <Drawer
          title={
            <div
              css={css`
                width: 161px;
                height: 22px;
                margin-left: 4px;
              `}
              className={'flex flex-nowrap'}
            >
              <img src={'/logo/light/left.png'} alt={''} width={23} height={22} />
              {!collapsed && (
                <Fade duration={500}>
                  <img src={'/logo/light/right.png'} alt={'OsonSotuv'} width={138} height={22} />
                </Fade>
              )}
            </div>
          }
          placement="left"
          onClose={() => setCollapsed(true)}
          open={!collapsed}
          rootClassName={'layout-drawer'}
          // style={{ backgroundColor: 'rgba(0, 0, 0, 0.06)', backdropFilter: 'blur(10px)' }}
          style={{ backgroundColor: '#001529' }}
          css={css`
            .ant-drawer-title,
            .ant-drawer-close {
              color: white !important;
            }
            .ant-drawer-body {
              padding: 0 !important;
            }
            .ant-drawer-header-title {
              flex-direction: row-reverse;
              justify-content: space-between;
              align-items: center;
            }
          `}
        >
          <Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
            className={'sticky top-0'}
            css={css`
              &:not(.ant-layout-sider-collapsed) {
                flex: none !important;
                min-width: 240px !important;
                max-width: 100% !important;
                width: 100% !important;
              }
            `}
          >
            {/*<Text className={'font-bold block  text-white text-center text-2xl p-3 whitespace-nowrap'}>*/}
            {/*  {(collapsed && 'R') || projectName}*/}
            {/*</Text>*/}

            <Menu
              theme="dark"
              mode="inline"
              selectedKeys={[title || subPath]}
              defaultOpenKeys={[subPath]}
              items={menuItems}
              onSelect={(obj: Record<string, any>) => onSelectMenu(obj, true)}
            />
          </Sider>
        </Drawer>
        <Sider
          // theme={theme as 'light' | 'dark'}
          trigger={null}
          collapsible
          collapsed={collapsed}
          className={'sticky top-0'}
          css={css`
            overflow-y: auto;
            overflow-x: hidden;
            border-radius: 12px;
            padding-inline: 4px;
            margin: 7px;
            margin-right: 0;

            &:not(.ant-layout-sider-collapsed) {
              flex: none !important;
              min-width: 240px !important;
              max-width: 300px !important;
              width: auto !important;
            }
            @media (max-width: 768px) {
              & {
                display: none !important;
              }
            }
          `}
        >
          <div className="logo hidden md:block p-3 px-6">
            <div
              css={css`
                width: 161px;
                height: 22px;
                margin-top: 16px;
                margin-left: 4px;
              `}
              className={'flex flex-nowrap'}
            >
              <img src={'/logo/light/left.png'} alt={''} width={23} height={22} />
              {!collapsed && (
                <Fade duration={500}>
                  <img
                    src={`/logo/${isDarkMode ? 'light' : 'dark'}/right.png`}
                    alt={'OsonSotuv'}
                    width={138}
                    height={22}
                  />
                </Fade>
              )}
            </div>

            {/*<Text className={'font-bold block  text-white text-center text-2xl p-3 whitespace-nowrap'}>*/}
            {/*  {(collapsed && 'R') || projectName}*/}
            {/*</Text>*/}
          </div>
          <Menu
            theme={'dark'}
            // theme={theme as 'light' | 'dark'}
            mode="inline"
            selectedKeys={[title || subPath]}
            // defaultOpenKeys={collapsed ? [] : [subPath]}
            items={menuItems}
            onSelect={onSelectMenu}
          />
        </Sider>

        <Layout className="site-layout flex flex-column h-[100vh]">
          <div className={'flex-1 overflow-y-auto overflow-x-visible pl-[10px]'}>
            <Header
              className={
                'drop-shadow-xl bg-[#fff7] dark:bg-[#0003] flex items-center justify-between px-8 backdrop-blur-[8px] sticky top-[10px]'
              }
              css={css`
                margin: 7px 7px 0 0;
                border-radius: 12px;
                z-index: 10;

                @media (max-width: 768px) {
                  & {
                    margin: 7px 7px 0 7px;
                  }
                }
              `}
            >
              <div className={'flex items-center justify-center'}>
                {React.createElement(collapsed ? RiMenuUnfoldLine : RiMenuFoldLine, {
                  className: 'trigger cursor-pointer',
                  onClick: () => setCollapsed(!collapsed),
                })}
                {breadcrumbItems ? (
                  <Breadcrumb separator="/" className="font-bold capitalize ml-3" items={breadcrumbItems} />
                ) : (
                  <Text className={'font-bold capitalize ml-3'}>
                    {titleFromProps || currentMenuItem?.label || title || subPath}
                  </Text>
                )}
              </div>
              <div className={'flex items-center justify-center gap-0'}>
                {/*  Language */}
                {/*<LanguageElements />*/}

                {/*{React.createElement(theme == 'light' ? GoSun : GoMoon, {*/}
                {/*  className: 'trigger cursor-pointer w-5 h-5',*/}
                {/*  onClick: () => (theme == 'dark' ? setTheme('light') : setTheme('dark')),*/}
                {/*})}*/}

                <Button onClick={toggleTheme} type={'text'}>
                  {theme == 'light' ? <GoSun /> : <GoMoon />}
                </Button>

                {/*<DarkMode />*/}

                {/* Insert notification component */}
                <Notification />

                <Button onClick={toggleFullscreen} type={'text'}>
                  {isFullscreen ? <MdFullscreenExit /> : <MdFullscreen />}
                </Button>

                <Dropdown
                  menu={{ items: profileItems }}
                  trigger={['click']}
                  dropdownRender={(menu) => (
                    <div style={contentStyle}>
                      <div className={'py-2 px-3 flex items-center'}>
                        <Avatar className={'mr-2'} icon={<UserOutlined />} />
                        <div className={'m-0'}>
                          <Typography className={'font-bold'}>
                            {user?.firstName || user?.lastName
                              ? `${user?.firstName} ${user?.lastName}`
                              : 'Foydalanuvchi'}
                          </Typography>
                          <Typography> {user?.email}</Typography>
                        </div>
                      </div>
                      <Divider className={'py-0 my-0'} />
                      {/* @ts-ignore */}
                      {React.cloneElement(menu as React.ReactElement, { style: menuStyle })}
                      {/*<Divider style={{ margin: 0 }} />*/}
                      {/*<Space style={{ padding: 8 }}>*/}
                      {/*  <Button type="primary">Click me!</Button>*/}
                      {/*</Space>*/}
                    </div>
                  )}
                >
                  <Button type={'text'}>
                    <CgProfile />
                  </Button>
                </Dropdown>
              </div>
            </Header>
            <Content
              className={clsx({ 'p-2 md:p-4 xl:p-6': !withoutPadding, 'p-0': withoutPadding })}
              style={{
                minHeight: 'calc(100vh - 140px)',
                flex: 1,
                overflow: 'auto',
              }}
            >
              {happyWork ? <HappyProvider>{children}</HappyProvider> : children}
            </Content>
          </div>
          <Footer className={'px-4 md:px-10 xl:px-12 py-2 pb-3'}>
            <Typography className={'font-bold mb-1'}>{t('OsonSotuv') || ''}</Typography>
            <Typography>{footerTitle}</Typography>
          </Footer>
        </Layout>
      </Layout>
    );
  },
);

const LayoutCSS = css`
  .ant-layout-sider2 {
    .ant-menu-item-selected {
      border-radius: 10px;
      position: relative;
      overflow: visible;
      z-index: 1;
      font-weight: bold;

      &::before {
        content: '';
        display: block;
        width: calc(100% + 3px);
        height: calc(100% + 3px);
        position: absolute;
        top: 0;
        left: 0;
        background: #32996d;
        box-shadow: 0 8px 16px #32996d77;
        border-radius: 10px;
        opacity: 0.5;
        z-index: -2;
      }

      &::after {
        content: '';
        display: block;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background: linear-gradient(180deg, #00b96b 0%, #27865e 100%);
        border-radius: 10px;
        opacity: 1;
        z-index: -1;
      }
    }
  }
`;

export default DashboardLayout;
