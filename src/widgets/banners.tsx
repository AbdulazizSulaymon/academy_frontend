import { css } from '@emotion/react';
import React from 'react';
import { Slide } from 'react-awesome-reveal';
import { useTranslation } from 'react-i18next';
import { GrStatusGood } from 'react-icons/gr';

export const PartnerBanner = () => {
  const { t } = useTranslation();

  return (
    <div
      className={
        'relative overflow-hidden rounded-lg shadow text-white bg-gradient-to-r from-green-500 to-[#086737] dark:from-sky-500 dark:to-indigo-700 flex gap-2 items-center'
      }
    >
      <img
        src="https://static.vecteezy.com/system/resources/thumbnails/019/895/736/small/3d-rendering-e-commerce-promotion-discount-day-element-png.png"
        alt=""
        css={css`
          position: absolute;
          width: 45%;
          max-width: 400px;
          align-self: flex-end;
          filter: blur(1px);
          top: 60%;
          transform: translateY(-50%);
          right: -30px;
          opacity: 0.6;
        `}
      />
      <img
        src="/images/partner.png"
        alt=""
        css={css`
          width: 25%;
          max-width: 250px;
          align-self: flex-end;
          z-index: 2;
        `}
        className={'hidden sm:block'}
      />
      <div className={'p-4 pl-7 xl:p-7 transition-all duration-300 skew-x-[10deg] overflow-hidden '}>
        <Slide triggerOnce>
          <h1 className={'text-5xl  rounded-xl inline-block p-3 border-0 border-b-2 border-solid border-white'}>
            {t('HBS Academy') || ''}
          </h1>
        </Slide>
        <div className={'text-[18px] flex flex-col sm:flex-row gap-6 flex-wrap'}>
          <span className={'overflow-hidden'}>
            <Slide triggerOnce delay={250}>
              <span className={'flex items-center gap-2'}>
                <GrStatusGood /> {t('Treyder kurslari') || ''}
              </span>
            </Slide>
          </span>
          <span className={'overflow-hidden'}>
            <Slide triggerOnce delay={500}>
              <span className={'flex items-center gap-2'}>
                <GrStatusGood /> {t('Yangi talabalar') || ''}
              </span>
            </Slide>
          </span>
          <span className={'overflow-hidden'}>
            <Slide triggerOnce delay={750}>
              <span className={'flex items-center gap-2'}>
                <GrStatusGood /> {t('Professional treyderlar') || ''}
              </span>
            </Slide>
          </span>
          <span className={'overflow-hidden'}>
            <Slide triggerOnce delay={1000}>
              <span className={'flex items-center gap-2'}>
                <GrStatusGood /> {t('Mentor yordami') || ''}
              </span>
            </Slide>
          </span>
          {/*<span className={'overflow-hidden'}>*/}
          {/*  <Slide triggerOnce delay={1250}>*/}
          {/*    <span className={'flex items-center gap-2'}>*/}
          {/*      <GrStatusGood /> Savol - javoblar*/}
          {/*    </span>*/}
          {/*  </Slide>*/}
          {/*</span>*/}
        </div>
      </div>
    </div>
  );
};

export const AdminBanner = () => {
  const { t } = useTranslation();

  return (
    <div
      className={
        'relative overflow-hidden rounded-lg shadow text-white bg-gradient-to-r from-green-500 to-[#086737] dark:from-sky-500 dark:to-indigo-700 flex gap-2 items-center'
      }
    >
      <img
        src="https://static.vecteezy.com/system/resources/thumbnails/019/895/736/small/3d-rendering-e-commerce-promotion-discount-day-element-png.png"
        alt=""
        css={css`
          position: absolute;
          width: 45%;
          max-width: 400px;
          align-self: flex-end;
          filter: blur(1px);
          top: 60%;
          transform: translateY(-50%);
          right: -30px;
          opacity: 0.6;
        `}
      />
      <img
        src="/images/admin.png"
        alt=""
        css={css`
          width: 25%;
          max-width: 250px;
          align-self: flex-end;
          z-index: 2;
          transform: rotateY(180deg) scale(1.2);
        `}
        className={'hidden sm:block'}
      />
      <div className={'p-4 pl-7 xl:p-7 transition-all duration-300 skew-x-[10deg] overflow-hidden '}>
        <Slide triggerOnce>
          <h1 className={'text-5xl  rounded-xl inline-block p-3 border-0 border-b-2 border-solid border-white'}>
            {t('HBS Academy')}
          </h1>
        </Slide>
        <div className={'text-[18px] flex flex-col sm:flex-row gap-6 flex-wrap'}>
          <span className={'overflow-hidden'}>
            <Slide triggerOnce delay={250}>
              <span className={'flex items-center gap-2'}>
                <GrStatusGood /> {t('Kurs boshqaruv') || ''}
              </span>
            </Slide>
          </span>
          <span className={'overflow-hidden'}>
            <Slide triggerOnce delay={500}>
              <span className={'flex items-center gap-2'}>
                <GrStatusGood /> {t('Talabalar monitoring') || ''}
              </span>
            </Slide>
          </span>
          <span className={'overflow-hidden'}>
            <Slide triggerOnce delay={750}>
              <span className={'flex items-center gap-2'}>
                <GrStatusGood /> {t('Statistika va hisobotlar') || ''}
              </span>
            </Slide>
          </span>
          <span className={'overflow-hidden'}>
            <Slide triggerOnce delay={1000}>
              <span className={'flex items-center gap-2'}>
                <GrStatusGood /> {t('Online platform') || ''}
              </span>
            </Slide>
          </span>
          {/*<span className={'overflow-hidden'}>*/}
          {/*  <Slide triggerOnce delay={1250}>*/}
          {/*    <span className={'flex items-center gap-2'}>*/}
          {/*      <GrStatusGood /> Savol - javoblar*/}
          {/*    </span>*/}
          {/*  </Slide>*/}
          {/*</span>*/}
        </div>
      </div>
    </div>
  );
};

export const ShopBanner = () => {
  const { t } = useTranslation();

  return (
    <div
      className={
        'relative overflow-hidden rounded-lg shadow text-white bg-gradient-to-r from-blue-500 to-blue-800 dark:from-sky-500 dark:to-indigo-700 flex gap-2 items-center'
      }
    >
      <img
        src="https://static.vecteezy.com/system/resources/thumbnails/019/895/736/small/3d-rendering-e-commerce-promotion-discount-d0-day-element.png"
        alt=""
        css={css`
          position: absolute;
          width: 45%;
          max-width: 400px;
          align-self: flex-end;
          filter: blur(1px);
          top: 60%;
          transform: translateY(-50%);
          right: -30px;
          opacity: 0.4;
        `}
      />
      <img
        src="/images/shop.png"
        alt=""
        css={css`
          width: 25%;
          max-width: 250px;
          align-self: flex-end;
          z-index: 2;
        `}
        className={'hidden sm:block'}
      />
      <div className={'p-4 pl-7 xl:p-7 transition-all duration-300 skew-x-[10deg] overflow-hidden '}>
        <Slide triggerOnce>
          <h1 className={'text-5xl  rounded-xl inline-block p-3 border-0 border-b-2 border-solid border-white'}>
            {t('HBS Academy Shop') || ''}
          </h1>
        </Slide>
        <div className={'text-[18px] flex flex-col sm:flex-row gap-6 flex-wrap'}>
          <span className={'overflow-hidden'}>
            <Slide triggerOnce delay={250}>
              <span className={'flex items-center gap-2'}>
                <GrStatusGood /> {t('Coin shop') || ''}
              </span>
            </Slide>
          </span>
          <span className={'overflow-hidden'}>
            <Slide triggerOnce delay={500}>
              <span className={'flex items-center gap-2'}>
                <GrStatusGood /> {t('Mukofotlar ballar') || ''}
              </span>
            </Slide>
          </span>
          <span className={'overflow-hidden'}>
            <Slide triggerOnce delay={750}>
              <span className={'flex items-center gap-2'}>
                <GrStatusGood /> {t('Premium resurslar') || ''}
              </span>
            </Slide>
          </span>
          <span className={'overflow-hidden'}>
            <Slide triggerOnce delay={1000}>
              <span className={'flex items-center gap-2'}>
                <GrStatusGood /> {t('Tez yetkazib beriladi') || ''}
              </span>
            </Slide>
          </span>
          {/*<span className={'overflow-hidden'}>*/}
          {/*  <Slide triggerOnce delay={1250}>*/}
          {/*    <span className={'flex items-center gap-2'}>*/}
          {/*      <GrStatusGood /> Savol - javoblar*/}
          {/*    </span>*/}
          {/*  </Slide>*/}
          {/*</span>*/}
        </div>
      </div>
    </div>
  );
};
