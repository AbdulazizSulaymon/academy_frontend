import { css } from '@emotion/react';
import { Button, Card, Col, Row, Typography, theme } from 'antd';
import { lowerCase } from 'lodash';
import { observer } from 'mobx-react';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BiUserVoice } from 'react-icons/bi';
import { FaUserGraduate } from 'react-icons/fa';
import { GiTeacher } from 'react-icons/gi';
import { LiaUserEditSolid } from 'react-icons/lia';
import { LuUsers } from 'react-icons/lu';
import { PiUsersThreeBold } from 'react-icons/pi';

import { useStore } from '@src/stores/stores';

import { Title } from '@components/title';

const { useToken } = theme;

type RoleType = { icon: React.ReactNode; title: string; path: string };

export const SelectRole = observer(() => {
  const router = useRouter();
  const { t } = useTranslation();
  const { roles: my_roles } = useStore().layoutStore;

  const roles: RoleType[] = useMemo(() => {
    const isAdmin = !!my_roles['admin'];
    const arr = [
      {
        icon: <GiTeacher />,
        title: t("O'qituvchi") || '',
        path: '/mentor',
      },
      {
        icon: <BiUserVoice />,
        title: t('Admin') || '',
        path: '/admin',
      },
      {
        icon: <LuUsers />,
        title: t('Yordamchi') || '',
        path: '/assistant',
      },
      {
        icon: <LiaUserEditSolid />,
        title: t('Yozuvchi') || '',
        path: '/writer',
      },
      {
        icon: <FaUserGraduate />,
        title: t('Talaba') || '',
        path: '/student',
      },
      {
        icon: <PiUsersThreeBold />,
        title: t('Hamkor') || '',
        path: '/partner',
      },
    ];

    return arr.filter(({ path }) => isAdmin || path === '/student' || my_roles[path.slice(1)]);
  }, [my_roles]);

  const { token } = useToken();
  const [value, setValue] = useState<RoleType | null>(null);

  const jump = () => {
    if (value) router.push(value.path);
  };

  useEffect(() => {
    const obj = roles.find((r) => router.pathname.startsWith(r.path));
    if (obj) setValue(obj);
  }, []);

  return (
    <>
      <div>
        <Title>{t(`Foydalanuvchi rollari`) || ''}</Title>
        <Typography>{t(`Quyidagi rollardan birini tanlang`) || ''}</Typography>
      </div>
      <Row gutter={[22, 22]} className={'mt-10'}>
        {roles.map((item, index) => {
          return (
            <Col xs={12} sm={12} md={8} lg={6} xl={4} key={item.title}>
              <Card
                onClick={() => {
                  setValue(item);
                }}
                className={'text-center shadow hover:shadow-lg cursor-pointer select-none'}
                css={css`
                  &:hover {
                    color: ${token.colorPrimary};
                    .role-title {
                      color: ${token.colorPrimary};
                    }
                  }

                  ${item.title === value?.title
                    ? ` & {
                      color: ${token.colorPrimary};
                      .role-title {
                        color: ${token.colorPrimary};
                      }
                    }`
                    : ''}
                `}
              >
                <Typography
                  className={`role-title`}
                  css={css`
                    font-size: 50px;
                    margin-bottom: 5px;
                  `}
                >
                  {item.icon}
                </Typography>

                <Title
                  css={css`
                    font-size: 18px;
                    margin-bottom: 0;
                  `}
                >
                  {item.title}
                </Title>
              </Card>
            </Col>
          );
        })}
      </Row>
      <div className={'flex justify-end mt-4'}>
        <Button type={'primary'} onClick={jump}>
          {t(`O'tish`) || ''}
        </Button>
      </div>
      {/*admin*/}
      {/*mentor*/}
      {/*asistent*/}
      {/*writer*/}
      {/*student*/}
      {/*partner*/}
    </>
  );
});
