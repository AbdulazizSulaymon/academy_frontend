import React, { ReactElement, useState } from 'react';
import StudentLayout from '@src/components/student-layout';
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  Coins,
  Gift,
  Award,
  ShoppingCart,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Filter,
} from 'lucide-react';
import { useLayoutStore } from '@src/stores/layout-store';
import { useMyTheme } from '@hooks/use-my-theme';
import { observer } from 'mobx-react';
import { useCoinHistories } from '@src/queries/models/coin-history';
import { get } from 'lodash';
import { NextPageWithLayout } from '@/types';
import { StudentDynamicProviders } from '@hocs/dynamic-providers';
import { GlassCard } from '@/components/ui/card';
import { Paragraph } from '@/components/ui/typography';
import { Select, Tag } from 'antd';
import { CoinTransactionType, getStatusColor } from '@api/academy-types';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/uz';

dayjs.extend(relativeTime);
dayjs.locale('uz');

const CoinsPage: NextPageWithLayout = observer(() => {
  const { user } = useLayoutStore();
  const { isDarkMode } = useMyTheme();
  const { t } = useTranslation();

  const [filterType, setFilterType] = useState<string>('all');

  // Fetch coin history
  const { data: coinHistoryResponse, isLoading: isLoadingHistory } = useCoinHistories(
    {
      where: {
        userId: user?.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
    },
    { enabled: !!user?.id },
  );

  const coinHistory = get(coinHistoryResponse, 'data.data', []);

  // Filter by type
  const filteredHistory = filterType === 'all' ? coinHistory : coinHistory.filter((ch: any) => ch.type === filterType);

  // Calculate stats
  const totalEarned = coinHistory
    .filter((ch: any) => ch.type === CoinTransactionType.Earned || ch.type === CoinTransactionType.Bonus)
    .reduce((sum: number, ch: any) => sum + Math.abs(ch.amount), 0);

  const totalSpent = coinHistory
    .filter((ch: any) => ch.type === CoinTransactionType.Spent)
    .reduce((sum: number, ch: any) => sum + Math.abs(ch.amount), 0);

  const currentBalance = user?.coins || 0;

  // Get transaction type info
  const getTransactionTypeInfo = (type: CoinTransactionType) => {
    switch (type) {
      case CoinTransactionType.Earned:
        return {
          icon: <ArrowUpRight className="w-5 h-5" />,
          bgColor: 'bg-green-100 dark:bg-green-900/30',
          textColor: 'text-green-600 dark:text-green-400',
          label: t('Yutuq') || 'Yutuq',
        };
      case CoinTransactionType.Spent:
        return {
          icon: <ArrowDownRight className="w-5 h-5" />,
          bgColor: 'bg-red-100 dark:bg-red-900/30',
          textColor: 'text-red-600 dark:text-red-400',
          label: t('Xaraj') || 'Xaraj',
        };
      case CoinTransactionType.Bonus:
        return {
          icon: <Gift className="w-5 h-5" />,
          bgColor: 'bg-purple-100 dark:bg-purple-900/30',
          textColor: 'text-purple-600 dark:text-purple-400',
          label: t('Bonus') || 'Bonus',
        };
      case CoinTransactionType.Refund:
        return {
          icon: <TrendingUp className="w-5 h-5" />,
          bgColor: 'bg-blue-100 dark:bg-blue-900/30',
          textColor: 'text-blue-600 dark:text-blue-400',
          label: t('Qaytarish') || 'Qaytarish',
        };
      default:
        return {
          icon: <Coins className="w-5 h-5" />,
          bgColor: 'bg-gray-100 dark:bg-gray-800',
          textColor: 'text-gray-600 dark:text-gray-400',
          label: type,
        };
    }
  };

  return (
    <div className="">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {t('Coin hamyoni') || 'Coin hamyoni'}
          </h1>
          <Paragraph className="text-gray-600 dark:text-gray-400">
            {t('Coinlaringizni boshqaring') || 'Coinlaringizni boshqaring'}
          </Paragraph>
        </div>
      </div>

      {/* Balance Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 p-8 text-white shadow-2xl">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 h-40 w-40 rounded-full bg-white/10 blur-2xl"></div>
        <div className="absolute bottom-0 left-0 -mb-8 -ml-8 h-32 w-32 rounded-full bg-black/10 blur-xl"></div>

        <div className="relative">
          <div className="flex items-center gap-3 mb-4">
            <Wallet className="w-8 h-8" />
            <span className="text-lg font-medium opacity-90">{t('Jami balance') || 'Jami balance'}</span>
          </div>
          <div className="text-5xl font-bold mb-2">{currentBalance.toLocaleString()}</div>
          <div className="flex items-center gap-2 opacity-90">
            <Coins className="w-5 h-5" />
            <span className="text-lg">{t('coin') || 'coin'}</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <GlassCard className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-4 rounded-xl bg-green-100 dark:bg-green-900/30">
              <TrendingUp className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <Paragraph className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                {t('Jami yutuq') || 'Jami yutuq'}
              </Paragraph>
              <Paragraph className="text-2xl font-bold text-green-600 dark:text-green-400">
                +{totalEarned.toLocaleString()}
              </Paragraph>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-4 rounded-xl bg-red-100 dark:bg-red-900/30">
              <TrendingDown className="w-8 h-8 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <Paragraph className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                {t('Jami xaraj') || 'Jami xaraj'}
              </Paragraph>
              <Paragraph className="text-2xl font-bold text-red-600 dark:text-red-400">
                -{totalSpent.toLocaleString()}
              </Paragraph>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-4 rounded-xl bg-purple-100 dark:bg-purple-900/30">
              <Gift className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <Paragraph className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                {t('Bonuslar') || 'Bonuslar'}
              </Paragraph>
              <Paragraph className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                +
                {coinHistory
                  .filter((ch: any) => ch.type === CoinTransactionType.Bonus)
                  .reduce((sum: number, ch: any) => sum + Math.abs(ch.amount), 0)
                  .toLocaleString()}
              </Paragraph>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Transaction History */}
      <GlassCard className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
              {t('Operatsiyalar tarixi') || 'Operatsiyalar tarixi'}
            </h2>
            <Paragraph className="text-sm text-gray-600 dark:text-gray-400">
              {t('Barcha tranzaksiyalar') || 'Barcha tranzaksiyalar'}
            </Paragraph>
          </div>

          <Select
            value={filterType}
            onChange={setFilterType}
            className="w-40"
            options={[
              { label: t('Barchasi') || 'Barchasi', value: 'all' },
              { label: t('Yutuq') || 'Yutuq', value: CoinTransactionType.Earned },
              { label: t('Xaraj') || 'Xaraj', value: CoinTransactionType.Spent },
              { label: t('Bonus') || 'Bonus', value: CoinTransactionType.Bonus },
              { label: t('Qaytarish') || 'Qaytarish', value: CoinTransactionType.Refund },
            ]}
          />
        </div>

        {isLoadingHistory ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : filteredHistory.length === 0 ? (
          <div className="text-center py-12">
            <Coins className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <Paragraph className="text-gray-600 dark:text-gray-400">
              {t('Tranzaksiyalar topilmadi') || 'Tranzaksiyalar topilmadi'}
            </Paragraph>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredHistory.map((history: any) => {
              const typeInfo = getTransactionTypeInfo(history.type);
              const isPositive =
                history.type === CoinTransactionType.Earned ||
                history.type === CoinTransactionType.Bonus ||
                history.type === CoinTransactionType.Refund;

              return (
                <div
                  key={history.id}
                  className={`flex items-center gap-4 p-4 rounded-xl border transition-all hover:shadow-md ${
                    isPositive
                      ? 'bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800'
                      : 'bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-800'
                  }`}
                >
                  <div className={`p-3 rounded-full ${typeInfo.bgColor} ${typeInfo.textColor} flex-shrink-0`}>
                    {typeInfo.icon}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                      {history.description || typeInfo.label}
                    </h4>
                    <div className="flex items-center gap-3 text-xs text-gray-600 dark:text-gray-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {dayjs(history.createdAt).format('DD.MM.YYYY HH:mm')}
                      </span>
                      <span>({dayjs(history.createdAt).fromNow()})</span>
                    </div>
                    {history.balanceBefore !== undefined && history.balanceAfter !== undefined && (
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {history.balanceBefore.toLocaleString()} → {history.balanceAfter.toLocaleString()}
                      </div>
                    )}
                  </div>

                  <div className="text-right flex-shrink-0">
                    <Paragraph
                      className={`text-xl font-bold ${
                        isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                      }`}
                    >
                      {isPositive ? '+' : '-'}
                      {Math.abs(history.amount).toLocaleString()}
                    </Paragraph>
                    <Tag color={isPositive ? 'green' : 'red'} className="m-0 mt-1">
                      {typeInfo.label}
                    </Tag>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </GlassCard>

      {/* How to Earn */}
      <GlassCard className="p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          {t('Coin qanday ishlaydi?') || 'Coin qanday ishlaydi?'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
            <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400 flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                {t('Topshiriqlarni bajarish') || 'Topshiriqlarni bajarish'}
              </h4>
              <Paragraph className="text-sm text-gray-600 dark:text-gray-400">
                {t('Har bir topshiriq uchun coin yuting') || 'Har bir topshiriq uchun coin yuting'}
              </Paragraph>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
            <CheckCircle className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                {t('Kurslarni tugatish') || 'Kurslarni tugatish'}
              </h4>
              <Paragraph className="text-sm text-gray-600 dark:text-gray-400">
                {t("Tayyor bo'lgan kurs uchun bonus oling") || "Tayor bo'lgan kurs uchun bonus oling"}
              </Paragraph>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
            <CheckCircle className="w-6 h-6 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                {t("Do'kondan xarid qilish") || "Do'kondan xarid qilish"}
              </h4>
              <Paragraph className="text-sm text-gray-600 dark:text-gray-400">
                {t('Coinlaringizni mahsulotlar uchun ishlatting') || 'Coinlaringizni mahsulotlar uchun ishlatting'}
              </Paragraph>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl">
            <CheckCircle className="w-6 h-6 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                {t('Kunlik vazifalar') || 'Kunlik vazifalar'}
              </h4>
              <Paragraph className="text-sm text-gray-600 dark:text-gray-400">
                {t('Har kuni vazifalarni bajaring va coin yuting') || 'Har kuni vazifalarni bajaring va coin yuting'}
              </Paragraph>
            </div>
          </div>
        </div>
      </GlassCard>
    </div>
  );
});

// Add CheckCircle icon
function CheckCircle({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

CoinsPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <StudentDynamicProviders>
      <StudentLayout title="Coins">{page}</StudentLayout>
    </StudentDynamicProviders>
  );
};

export default CoinsPage;
