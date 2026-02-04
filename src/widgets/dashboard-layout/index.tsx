import { HappyProvider } from '@ant-design/happy-work-theme';
import { css } from '@emotion/react';
import { join } from '@fireflysemantics/join';
import { useKeyPress } from 'ahooks';
import { configResponsive, useResponsive } from 'ahooks';
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
  Typography,
  theme as antdTheme,
} from 'antd';
import { QuickActions } from './quick-actions';
import { BreadcrumbItemType } from 'antd/es/breadcrumb/Breadcrumb';
import clsx from 'clsx';
import { flatten } from 'lodash';
import { observer } from 'mobx-react';
import { useRouter } from 'next/router';
import React, { useMemo, useRef, useEffect, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CgProfile } from 'react-icons/cg';
import { FaRegCircleUser as UserOutlined } from 'react-icons/fa6';
import { GoMoon, GoSun } from 'react-icons/go';
import { HiMenuAlt2, HiOutlineLogout } from 'react-icons/hi';
import { MdFullscreen, MdFullscreenExit } from 'react-icons/md';
import { useApi } from '@src/api';
import { useI18n } from '@src/i18/useI18n';
import { useLayoutStore } from '@src/stores/layout-store';
import { LanguageElements } from '@src/widgets/language/language';
import Notification from '@src/widgets/notification';
import MyShops from '@src/widgets/shops/shop';
import { Link } from '@components/link';
import { Title } from '@components/title';
import { Theme, useMyTheme } from '@hooks/use-my-theme';
import { useFullscreen } from '@hooks/use-fullscreen';
import { useShopId } from '@hooks/use-shop-id';
import { AiOutlineUserSwitch } from 'react-icons/ai';
import { useCheckRoles } from '@hooks/use-check-roles';
import { LoadingScreen } from '@hocs/loading-wrapper';
import { Error403Content } from '@src/components/error-403';

const { useToken } = antdTheme;
const { Text } = Typography;
const { Header, Sider, Content, Footer } = Layout;

export type Menus = (
  | { key: string; icon: React.ReactNode; label: string; path?: undefined; children?: any }
  | { key: string; icon: React.ReactNode; label: string; path: string; children?: any }
)[];

configResponsive({
  small: 0,
  mobile: 769,
  middle: 991,
});

export const Welcome = () => {
  const { isDarkMode } = useMyTheme();
  const { t } = useTranslation();

  return (
    <div className={'flex flex-col items-center justify-center h-[80vh]'}>
      <img src={`/logo/${isDarkMode ? 'dark' : 'light'}/logo.png`} alt={''} height={80} className={'block mb-10'} />
      <Title>{t('Xush kelibsiz')}!</Title>
    </div>
  );
};

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
    role,
  }: {
    children: React.ReactNode;
    title?: string;
    menuItems: Menus;
    startPath?: string;
    footerTitle?: string;
    withoutPadding?: boolean;
    happyWork?: boolean;
    breadcrumbItems?: BreadcrumbItemType[];
    role?: string;
  }) => {
    const { collapsed, setCollapsed, setUser, user, lang, roles } = useLayoutStore();
    const { token } = useToken();
    const api = useApi();
    const router = useRouter();
    const { t } = useTranslation();
    const { theme, setTheme, toggleTheme, isDarkMode, localTheme } = useMyTheme();
    const [isClient, setIsClient] = useState(false);
    const responsive = useResponsive();
    const { shop } = useShopId();
    const { accessRoles, isAdmin } = useCheckRoles();

    useEffect(() => {
      if (theme != localTheme) setTheme(localTheme as Theme);
    }, [localTheme]);

    useI18n(lang);

    const [subPath, title, currentMenuItemName, currentMenuItem] = useMemo(() => {
      const route = router.route + '/';
      const slashIndex = route.indexOf('/', startPath.length + 1);
      const subPath = route.slice(startPath.length + 1, slashIndex);
      const title = route.slice(slashIndex + 1, router.route.indexOf('/', slashIndex + 1));
      const currentMenuItemName = title || subPath;

      const items = flatten(menuItems.map((menu) => menu.children || menu));

      const currentMenuItem = items.find((item) => item.key === currentMenuItemName);

      return [subPath, title, currentMenuItemName, currentMenuItem];
    }, [router.route, startPath, t]);

    const contentStyle = {
      backgroundColor: token.colorBgElevated,
      borderRadius: token.borderRadiusLG,
      boxShadow: token.boxShadowSecondary,
    };
    const menuStyle = {
      boxShadow: 'none',
    };

    const wrappedMenuItems = useMemo(
      () =>
        menuItems?.map((item) => ({
          ...item,
          label: item.children ? item.label : <Link href={join(startPath, item.key)}>{item.label}</Link>,
          children:
            item?.children?.map((child: Record<string, any>) => ({
              ...child,
              label: child.children ? (
                child.label
              ) : (
                <Link href={join(startPath, item.key, child.key)}>{child.label}</Link>
              ),
            })) || undefined,
        })),
      [menuItems, startPath],
    );

    const profileItems: MenuProps['items'] = useMemo(
      () =>
        [
          // ...(router.route.startsWith('/shop/')
          //   ? [
          //       {
          //         label: (
          //           <p className={'m-0 flex items-center gap-2 font-bold'}>
          //             <MdOutlineStorefront />
          //             {shop.name || ''}
          //           </p>
          //         ),
          //         key: 'shop',
          //         onClick: () => {
          //           // router.push(join(startPath, 'profile-settings'));
          //         },
          //       },
          //     ]
          //   : []),
          {
            label: (
              <p className={'m-0 flex items-center gap-2'}>
                <CgProfile />
                {t(`Shaxsiy kabinet`) || ''}
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
          accessRoles.length > 1 && {
            label: (
              <p className={'m-0 flex items-center'}>
                <AiOutlineUserSwitch className={'mr-2'} /> {t('Rol') || ''}
              </p>
            ),
            key: 'role',
            onClick: () => {
              router.push('/roles');
            },
          },
          {
            label: (
              <p className={'m-0 flex items-center'}>
                <HiOutlineLogout className={'mr-2'} /> {t('Chiqish') || ''}
              </p>
            ),
            key: 'log-out',
            onClick: () => {
              api.logOut();
              setUser(null);
              router.push('/');
            },
          },
        ].filter(Boolean) as MenuProps['items'],
      [user, lang, user?.lang, shop, router.route, api, t, accessRoles.length],
    );

    // Fullscreen
    const ref = useRef(null);
    const { isFullscreen, toggleFullscreen } = useFullscreen();
    useKeyPress('f', (event) => {
      if ((event.target as HTMLElement).tagName === 'BODY') toggleFullscreen();
    });

    useEffect(() => {
      setIsClient(true);
    }, []);

    useEffect(() => {
      setCollapsed(localStorage.getItem('sidebar') == 'true');
    }, []);

    useEffect(() => {
      if (!api.getToken()) router.push('/login');
    }, []);

    useEffect(() => {
      if (!responsive.middle) setCollapsed(true);
    }, [responsive.middle]);

    const onSelectMenu = useCallback(
      (obj: Record<string, any>, isCollapsed = false) => {
        // router.push(join(startPath, ...obj.keyPath.reverse()));
        setCollapsed(true);
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

    if (!user)
      return (
        <div
          className="flex items-center justify-center p-4"
          css={css`
            min-height: 100vh;
          `}
        >
          <LoadingScreen />
        </div>
      );

    if (role && !roles[role]) return <Error403Content />;

    return (
      <>
        <Layout ref={ref} className={clsx('h-[100vh]', isDarkMode && 'dark')} css={LayoutCSS}>
        {!responsive.middle && (
          <Drawer
            title={
              <Link href={startPath}>
                {/*{collapsed ? (*/}
                {/*  <Image src={`/logo/dark/left.png`} alt={'logo'} width={45} height={35} />*/}
                {/*) : (*/}
                {/*  <Image src={`/logo/dark/logo.svg`} alt={'logo'} width={290} height={50} className={'block'} />*/}
                {/*)}*/}
                <div className={'mb-1'}>
                  <img src={`/logo/dark/logo.png`} alt={'logo'} height={36} className={'block max-w-[80%]'} />
                </div>
              </Link>
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
                items={wrappedMenuItems}
                onSelect={(obj: Record<string, any>) => onSelectMenu(obj, true)}
              />
            </Sider>
          </Drawer>
        )}
        {responsive.middle && (
          <Sider
            theme={theme}
            trigger={null}
            collapsible
            collapsed={collapsed}
            className={'sticky top-0'}
            css={css`
              overflow-y: auto;
              overflow-x: hidden;

              &:not(.ant-layout-sider-collapsed) {
                flex: none !important;
                min-width: 240px !important;
                max-width: 300px !important;
                width: auto !important;
              }
            `}
          >
            <div className="hidden p-0 px-6 logo md:block">
              <Link href={startPath}>
                <div
                  css={css`
                    margin-top: 16px;
                    margin-left: 0;
                    margin-bottom: 16px;
                  `}
                  className={'flex flex-nowrap'}
                >
                  {collapsed ? (
                    <img
                      src={`/logo/${!isDarkMode ? 'light' : 'dark'}/left.png`}
                      alt={''}
                      height={42}
                      className="block mb-[6px]"
                    />
                  ) : (
                    <img
                      src={`/logo/${!isDarkMode ? 'light' : 'dark'}/logo.svg`}
                      alt={''}
                      height={42}
                      className={'block'}
                    />
                  )}
                </div>
              </Link>
              {/*<Text className={'font-bold block  text-white text-center text-2xl p-3 whitespace-nowrap'}>*/}
              {/*  {(collapsed && 'R') || projectName}*/}
              {/*</Text>*/}
            </div>
            <Menu
              theme={theme}
              mode="inline"
              selectedKeys={[title || subPath]}
              // defaultOpenKeys={collapsed ? [] : [subPath]}
              items={wrappedMenuItems}
              // onSelect={onSelectMenu}
            />
          </Sider>
        )}

        <Layout className="site-layout flex flex-column h-[100vh]">
          <Header className={'drop-shadow-xl bg-white dark:bg-black flex items-center justify-between px-8'}>
            <div className={'flex items-center justify-center'}>
              {/*{React.createElement(collapsed ? RiMenuUnfoldLine : RiMenuFoldLine, {*/}
              {/*{React.createElement(HiMenuAlt2, {*/}
              {/*  className: 'trigger cursor-pointer',*/}
              {/*  onClick: () => setCollapsed(!collapsed),*/}
              {/*})}*/}
              <Button type={'text'} onClick={() => setCollapsed(!collapsed)} size={'small'}>
                <HiMenuAlt2 />
              </Button>
              {breadcrumbItems ? (
                <Breadcrumb separator="/" className="ml-3 font-bold capitalize" items={breadcrumbItems} />
              ) : (
                <Text className={'font-bold capitalize ml-3 hidden sm:block'}>
                  {titleFromProps ? t(titleFromProps) : currentMenuItem?.label || title || subPath}
                </Text>
              )}
            </div>
            <div className={'flex items-center justify-center gap-0'}>
              {/*  Language */}
              <LanguageElements />

              {/*{React.createElement(theme == 'light' ? GoSun : GoMoon, {*/}
              {/*  className: 'trigger cursor-pointer w-5 h-5',*/}
              {/*  onClick: () => (theme == 'dark' ? setTheme('light') : setTheme('dark')),*/}
              {/*})}*/}

              <Button onClick={toggleTheme} type={'text'}>
                {theme == 'light' ? <GoSun /> : <GoMoon />}
              </Button>
              {/*<DarkMode />*/}
              <Notification />

              {responsive.mobile && (
                <Button onClick={toggleFullscreen} type={'text'}>
                  {isFullscreen ? <MdFullscreenExit /> : <MdFullscreen />}
                </Button>
              )}

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
                            ? `${user?.firstName || ''} ${user?.lastName || ''}`
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

              {startPath === '/shop' && (
                <>
                  <Divider type={'vertical'} />
                  <MyShops />
                </>
              )}
            </div>
          </Header>
          <Content
            className={clsx({ 'p-2 md:p-4 xl:p-6': !withoutPadding, 'p-0': withoutPadding })}
            style={{
              minHeight: 280,
              flex: 1,
              overflow: 'auto',
            }}
          >
            {isClient ? <>{happyWork ? <HappyProvider>{children}</HappyProvider> : children}</> : ''}
          </Content>
          {/*{responsive.middle && (*/}
          {/*  <Footer className={'px-4 md:px-10 xl:px-12 '}>*/}
          {/*    <Typography className={'font-bold mb-1'}>«{projectName}»</Typography>*/}
          {/*    <Typography>{footerTitle}</Typography>*/}
          {/*  </Footer>*/}
          {/*)}*/}
        </Layout>
      </Layout>
      {startPath === '/shop' && <QuickActions />}
      </>
    );
  },
);

const LayoutCSS = css`
  .ant-layout-sider {
    border-right: 1px solid rgba(33, 93, 245, 0.1);
    background: linear-gradient(to right bottom, #040931, #050c31);
    background: transparent;
    /* background-image: linear-gradient(to right bottom, #040931, #050c31);*/

    .ant-menu,
    .ant-menu-sub {
      background: transparent !important;
      position: relative;
      border: none !important;
    }

    .ant-menu-item,
    .ant-menu-submenu {
      position: relative !important;
      user-select: none;
      transition: 0s !important;

      a {
        transition: 0s !important;
      }
    }
  }

  & {
    background-size: cover;
    position: relative;
    z-index: 2;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      backdrop-filter: blur(10px);
      z-index: -1;
    }

    .ant-layout,
    footer {
      background-color: transparent;
    }

    header {
      background: transparent;
      border-bottom: 1px solid rgba(33, 93, 245, 0.1);
    }

    footer {
      border-top: 1px solid rgba(33, 93, 245, 0.1);
    }
  }

  hr {
    height: 1px;
    background-color: #d0d0d0;
    border: none;
    margin-block: 20px;
  }

  &.dark {
    .ant-layout-sider {
      border-right: 1px solid rgba(0, 255, 113, 0.09);
      background: transparent;
      /* background-image: linear-gradient(to right bottom, #040931, #050c31);*/
    }

    /* background: linear-gradient(145deg, #232755, rgb(24, 27, 68)); */
    /* background: url('/backs/artistic-background.jpg'); */
    /* background: linear-gradient(145deg, rgba(1, 4, 31, 0.9), rgba(24, 27, 68, 0.4)), url('/backs/back6.jpg'); */
    /* background: linear-gradient(145deg, rgba(1, 4, 31, 1), rgba(24, 27, 68, 0.4)), url('/backs/colorful-background.jpg'); */
    /*  background: linear-gradient(180deg, rgba(1, 4, 31, 0.5), rgba(0, 0, 0, 0.8)),
       url('/backs/artistic-background-min.webp');    */
    background: #111111;
    background-size: cover;
    position: relative;
    z-index: 2;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      backdrop-filter: blur(40px);
      z-index: -1;
    }

    .ant-layout,
    footer {
      background-color: transparent;
    }

    header {
      /*  background: linear-gradient(145deg, #01041a, #060b2f); */
      background: transparent;
      color: white !important;
      border-bottom: 1px solid rgba(0, 255, 113, 0.09);

      span,
      button {
        color: white !important;
      }
    }

    footer {
      border-top: 1px solid rgba(0, 255, 113, 0.09);
    }

    hr {
      background-color: #505050;
    }
  }

  /*.ant-table,
  .ant-table-container {
    border-radius: 10px !important;
    overflow: hidden;
  }

  .ant-table tbody tr:last-child td:last-child {
    border-bottom-right-radius: 10px;
  }

  .ant-table tbody tr:last-child td:first-of-type {
    border-bottom-left-radius: 10px;
  }*/
`;

export default React.memo(DashboardLayout);
