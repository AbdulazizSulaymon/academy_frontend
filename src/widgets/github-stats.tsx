import React, { useMemo, useState } from 'react';
import { useApi } from '@src/api';
import { useQuery } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';
import { useMyTheme } from '@hooks/use-my-theme';
const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

export type Contributor = {
  name: string;
  commits: number;
};

export type RepoSummary = {
  repoName: string;
  totalCommits: number;
};

export type GitHubStatsProps = {
  totalCommits: number;
  totalContributors: number;
  contributors: Contributor[];
  repos: RepoSummary[];
};

export const useGithubStats = () => {
  const api = useApi();

  const { data, ...props } = useQuery(['github-stats'], () => api.instance.get('/api/github-stats/stats'), {});

  const githubStats = useMemo(() => {
    const parsed = data?.data || {};

    const contributorsMap = new Map<string, number>();
    const repoSummaries: RepoSummary[] = [];

    for (const [repo, users] of Object.entries(parsed)) {
      let repoTotal = 0;
      for (const [user, count] of Object.entries(users as Record<string, any>)) {
        repoTotal += count;
        contributorsMap.set(user, (contributorsMap.get(user) || 0) + count);
      }
      repoSummaries.push({ repoName: repo, totalCommits: repoTotal });
    }

    const contributors = Array.from(contributorsMap.entries())
      .map(([name, commits]) => ({ name, commits }))
      .sort((a, b) => b.commits - a.commits);

    const repos = repoSummaries.sort((a, b) => b.totalCommits - a.totalCommits);

    return {
      totalCommits: contributors.reduce((sum, c) => sum + c.commits, 0),
      totalContributors: contributors.length,
      contributors,
      repos,
    };
  }, [data]);

  return { githubStats, data, ...props };
};

export const useMonthlyCommits = () => {
  const api = useApi();

  const { data, ...props } = useQuery(['monthly-commits'], () => api.instance.get('/api/github-stats/monthly'), {});

  return {
    monthlyCommits: data?.data || [],
    data,
    ...props,
  };
};

export const GitHubStatsPanel = () => {
  const {
    githubStats: { totalCommits, totalContributors, contributors, repos },
  } = useGithubStats();

  return (
    <div className="space-y-6 transition-colors">
      <div className="flex justify-between items-center gap-4">
        <StatCard label="Total Commits" value={totalCommits} />
        <StatCard label="Contributors" value={totalContributors} />
      </div>

      <div>
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Contributorlar</h2>
        <div className="overflow-x-auto rounded-md border border-gray-200 dark:border-zinc-700">
          <table className="w-full table-auto text-sm">
            <thead>
              <tr className="bg-gray-100 dark:bg-zinc-700 text-left font-semibold text-gray-700 dark:text-gray-200">
                <th className="p-3">#</th>
                <th className="p-3">Foydalanuvchi</th>
                <th className="p-3 text-right">Commitlar soni</th>
              </tr>
            </thead>
            <tbody>
              {contributors.map((contributor, idx) => (
                <tr
                  key={contributor.name}
                  className="border-t border-gray-100 dark:border-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-600 transition-colors"
                >
                  <td className="p-3">{idx + 1}</td>
                  <td className="p-3">{contributor.name}</td>
                  <td className="p-3 text-right font-medium">{contributor.commits}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Repolar bo‘yicha commitlar jadvali */}
      <div>
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Repo Commitlar</h2>
        <div className="overflow-x-auto rounded-md border border-gray-200 dark:border-zinc-700">
          <table className="w-full table-auto text-sm">
            <thead>
              <tr className="bg-gray-100 dark:bg-zinc-700 text-left font-semibold text-gray-700 dark:text-gray-200">
                <th className="p-3">#</th>
                <th className="p-3">Repo nomi</th>
                <th className="p-3 text-right">Commitlar soni</th>
              </tr>
            </thead>
            <tbody>
              {repos.map((repo, idx) => (
                <tr
                  key={repo.repoName}
                  className="border-t border-gray-100 dark:border-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-600 transition-colors"
                >
                  <td className="p-3">{idx + 1}</td>
                  <td className="p-3">{repo.repoName}</td>
                  <td className="p-3 text-right font-medium">{repo.totalCommits}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const StatCard: React.FC<{ label: string; value: number }> = ({ label, value }) => (
  <div className="flex-1 bg-gray-50 dark:bg-zinc-700 rounded-lg p-4 text-center shadow-sm border border-gray-200 dark:border-zinc-600 transition-colors">
    <div className="text-sm text-gray-500 dark:text-gray-300">{label}</div>
    <div className="text-2xl font-bold text-gray-800 dark:text-white">{value}</div>
  </div>
);

const ChartComponent = ({ monthlyCommits }: { monthlyCommits: Record<string, number> }) => {
  const { theme } = useMyTheme();

  const options = useMemo<ApexOptions>(
    () => ({
      chart: {
        id: 'monthly-commits',
        type: 'bar',
      },
      xaxis: {
        categories: Object.keys(monthlyCommits).reverse(),
        title: {
          text: 'Month',
        },
      },
      yaxis: {
        title: {
          text: 'Commits',
        },
      },
      title: {
        text: 'Monthly Commits',
        align: 'center',
      },
      grid: {
        show: true,
      },
      theme: { mode: theme },
    }),
    [monthlyCommits, theme],
  );

  const series = useMemo(
    () => [
      {
        name: 'Commits',
        data: Object.values(monthlyCommits).reverse(),
      },
    ],
    [monthlyCommits],
  );

  return (
    <div className="chart-container w-full">
      <ApexChart options={options} series={series} type="bar" height={450} />
    </div>
  );
};

export const MonthlyCommits = () => {
  const { monthlyCommits } = useMonthlyCommits();

  console.log(monthlyCommits);

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-xl lg:text-2xl font-bold text-center mt-10 mb-8">Monthly Commits Chart</h1>
      <ChartComponent monthlyCommits={monthlyCommits} />
    </div>
  );
};
