import { ParseOptions, StringifyOptions } from 'query-string';
import queryString from 'query-string';
import { useMemo } from 'react';
import Router, { useRouter } from 'next/router';
import { get } from 'lodash';
import { toJS } from 'mobx';

export const parseUrlOptions: ParseOptions = {
  parseNumbers: true,
  parseBooleans: true,
  arrayFormat: 'bracket',
  arrayFormatSeparator: '|',
};

const stringifyOptions: StringifyOptions = {
  skipEmptyString: true,
  arrayFormat: 'bracket',
  arrayFormatSeparator: '|',
};

export const useLocationParams = () => {
  const { asPath } = useRouter();
  // const asPath = `/bot/4c0293c1-ba70-467a-bf01-ad9a0dc807b3/775493822#tgWebAppVersion=8.0&tgWebAppPlatform=tdesktop&tgWebAppThemeParams=%7B%22accent_text_color%22%3A%22%236ab2f2%22%2C%22bg_color%22%3A%22%2317212b%22%2C%22bottom_bar_bg_color%22%3A%22%2317212b%22%2C%22button_color%22%3A%22%235288c1%22%2C%22button_text_color%22%3A%22%23ffffff%22%2C%22destructive_text_color%22%3A%22%23ec3942%22%2C%22header_bg_color%22%3A%22%2317212b%22%2C%22hint_color%22%3A%22%23708499%22%2C%22link_color%22%3A%22%236ab3f3%22%2C%22secondary_bg_color%22%3A%22%23232e3c%22%2C%22section_bg_color%22%3A%22%2317212b%22%2C%22section_header_text_color%22%3A%22%236ab3f3%22%2C%22section_separator_color%22%3A%22%23111921%22%2C%22subtitle_text_color%22%3A%22%23708499%22%2C%22text_color%22%3A%22%23f5f5f5%22%7D?productId=0f63153d-bf5b-42aa-80b3-b7a66e4605dd`;

  const { query, url: pathname } = useMemo(() => {
    let str = '';

    if (asPath.includes('#')) str = asPath.split('#')[0] + '?' + (asPath.split('?')[1] || '');
    else str = asPath;

    return queryString.parseUrl(str, parseUrlOptions);
  }, [asPath]);

  const origin = typeof window !== 'undefined' ? window.location.origin : process.env.NEXT_PUBLIC_SITE_URL || '';

  const push = (newQuery: Record<string, any>, options?: { update?: boolean; replace?: boolean }) => {
    const update = get(options, 'update', false);
    const replace = get(options, 'replace', false);

    let str = '';
    if (newQuery.query)
      str = queryString.stringifyUrl(
        { url: newQuery.url || pathname, query: update ? { ...query, ...newQuery.query } : newQuery.query },
        stringifyOptions,
      );
    else {
      const url = Router.asPath.includes('?') ? Router.asPath.slice(0, Router.asPath.indexOf('?')) : Router.asPath;
      str = `${url}?${queryString.stringify(update ? { ...query, ...newQuery } : newQuery, stringifyOptions)}`;
    }

    if (str !== Router.asPath) {
      if (replace) Router.replace(str, undefined, { shallow: true });
      else Router.push(str, undefined, { shallow: true });
    }
  };

  return { query: query as Record<string, any>, pathname, domain: origin, push };
};
