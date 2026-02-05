import { observer } from 'mobx-react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useLayoutEffect, useState, useEffect } from 'react';
import Link from 'next/link';
import { useApi } from '@src/api';
import { Button } from 'antd';
import TopButton from '@components/Button/Top-btn';
import { projectName, tokenName } from '@data/const';
import AntdProvider from '@hocs/antd-provider';
import { useLocationParams } from '@hooks/use-location-params';
import { useMyTheme } from '@hooks/use-my-theme';
import { get } from 'lodash';
import {
  TrendingUp,
  BarChart3,
  Award,
  Users,
  Target,
  Zap,
  Shield,
  BookOpen,
  CheckCircle,
  ArrowRight,
  Play,
  Star,
  Clock,
  GraduationCap,
  LineChart,
  Bitcoin,
  DollarSign,
  PieChart,
  Moon,
  Sun,
} from 'lucide-react';

const Home: NextPage = () => {
  const { isDarkMode, toggleTheme } = useMyTheme();
  const router = useRouter();
  const { query } = useLocationParams();
  const api = useApi();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [courses, setCourses] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useLayoutEffect(() => {
    if (query.ref) {
      localStorage.setItem('ref', query.ref as string);
      api.instance.post('/api/partner/referral-click', { ref: query.ref });
    }
    if (localStorage.getItem(tokenName)) router.push('/student');
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch courses
        const coursesRes = await api.instance.post('/api/course/find-many', {
          where: { isPublished: true },
          include: {
            category: true,
            mentor: true,
            modules: { where: { isPublished: true } },
          },
          orderBy: { createdAt: 'desc' },
          take: 6,
        });
        setCourses(get(coursesRes, 'data.data', []));

        // Fetch categories
        const categoriesRes = await api.instance.post('/api/courseCategory/find-many', {
          orderBy: { nameUz: 'asc' },
        });
        setCategories(get(categoriesRes, 'data.data', []));
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter courses by category
  const filteredCourses =
    activeCategory === 'all' ? courses : courses.filter((course: any) => course.categoryId === activeCategory);

  const stats = [
    { icon: Users, value: '5000+', label: 'Talabalar' },
    { icon: GraduationCap, value: '50+', label: 'Kurslar' },
    { icon: Award, value: '95%', label: 'Muvaffaqiyat' },
    { icon: BookOpen, value: '1000+', label: 'Soat dars' },
  ];

  const features = [
    {
      icon: Target,
      title: "Amaliyotga yo'naltirilgan",
      description: "Real bozorlarda ishlash uchun kerakli bilik va ko'nikmalar",
    },
    {
      icon: Shield,
      title: 'Xavfsizlik birinchi',
      description: 'Risklarni boshqarish va kapitalni himoya qilish strategiyalari',
    },
    {
      icon: LineChart,
      title: 'Zamonaviy analitika',
      description: 'Texnik va fundamental tahlilning eng samarali usullari',
    },
    {
      icon: Zap,
      title: "Tez o'rganish",
      description: 'Qisqa muddatda real natijalarga erishish uchun optimallashgan dastur',
    },
  ];

  const courseTypes = [
    { icon: Bitcoin, title: 'Kripto valyuta', description: 'Bitcoin, Ethereum va boshqa cryptocurrency trading' },
    { icon: PieChart, title: 'Aksiyalar', description: 'Fond bozori va dividend strategiyalari' },
    { icon: BarChart3, title: 'Investitsiya', description: 'Uzoq muddatli portfelni boshqarish' },
  ];

  return (
    <AntdProvider>
      <Head>
        <title>HBS Academy - Professional Treyderlarni Tayyorlaymiz</title>
        <meta
          name="description"
          content="HBS Academy - moliyaviy bozorlarda muvaffaqiyatli treyder bo'lish uchun professional ta'lim. Amaliy darslar, mentor yordami va real trading tajribasi."
        />
        <meta
          name="keywords"
          content="trading academy, treyder, crypto, cryptocurrency, aksiyalar, investment, moliyaviy bozorlar, trading kurslari, HBS Academy"
        />
        <meta property="og:title" content="HBS Academy - Professional Treyderlarni Tayyorlaymiz" />
        <meta
          property="og:description"
          content="Moliyaviy bozorlarda professional treyder bo'ling. HBS Academy bilan amaliy ta'lim va real trading tajribasi."
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <TopButton />

        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-600 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-slate-900 dark:text-white">HBS Academy</span>
              </div>

              <div className="hidden md:flex items-center gap-8">
                <a
                  href="#courses"
                  className="text-slate-700 dark:text-slate-300 hover:!text-primary transition-colors font-medium no-underline"
                >
                  Kurslar
                </a>
                <a
                  href="#features"
                  className="text-slate-700 dark:text-slate-300 hover:!text-primary transition-colors font-medium no-underline"
                >
                  Afzaliklar
                </a>
                <a
                  href="#types"
                  className="text-slate-700 dark:text-slate-300 hover:!text-primary transition-colors font-medium no-underline"
                >
                  Yo&apos;nalishlar
                </a>
              </div>

              <div className="flex items-center gap-4">
                {/* Theme Toggle */}
                <button
                  onClick={toggleTheme}
                  className="inline-flex items-center justify-center w-11 h-11 rounded-lg transition-colors border-0 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400"
                >
                  {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>

                <Link href="/login">
                  <Button type="text" className="!text-slate-700 dark:!text-slate-300 !font-medium !h-11 !px-6">
                    Kirish
                  </Button>
                </Link>
                <Link href="/register">
                  <Button
                    type="primary"
                    className="!bg-primary hover:!bg-primary-600 !text-white !font-semibold !h-11 !px-8 !rounded-xl"
                  >
                    Boshlash
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <main>
          {/* Hero Section */}
          <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5 dark:opacity-10">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, rgb(22, 204, 83) 1px, transparent 0)`,
                  backgroundSize: '40px 40px',
                }}
              ></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-8">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold">
                    <Zap className="w-4 h-4" />
                    Professional Trading Academy
                  </div>

                  <h1 className="text-5xl lg:text-7xl font-bold text-slate-900 dark:text-white leading-tight">
                    Professional{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-600">
                      Treyder
                    </span>{' '}
                    Bo&apos;ling
                  </h1>

                  <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
                    Moliyaviy bozorlarda muvaffaqiyatli treyder bo&apos;lish uchun professional ta&apos;lim. Real
                    amaliyot, mentor yordami va ishlaydigan strategiyalar.
                  </p>

                  <div className="flex flex-wrap gap-4">
                    <Link href="/register">
                      <Button
                        type="primary"
                        size="large"
                        className="!bg-primary hover:!bg-primary-600 !text-white !font-semibold !h-14 !px-10 !rounded-xl !text-lg"
                      >
                        Hoziroq Boshlash
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    </Link>
                    <Link href="/login">
                      <Button
                        size="large"
                        className="!bg-slate-100 dark:!bg-slate-800 hover:!bg-slate-200 dark:hover:!bg-slate-700 !text-slate-900 dark:!text-white !font-semibold !h-14 !px-10 !rounded-xl !text-lg !border-0"
                      >
                        <Play className="w-5 h-5 mr-2" />
                        Demo Ko&apos;rish
                      </Button>
                    </Link>
                  </div>

                  <div className="flex items-center gap-6 pt-4">
                    <div className="flex -space-x-3">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className="w-12 h-12 rounded-full border-3 border-white dark:border-slate-900 bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 font-semibold text-sm"
                        >
                          {i}
                        </div>
                      ))}
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        5000+ dan ortiq talaba muvaffaqiyatli o&apos;qimoqda
                      </p>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="relative z-10 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 p-8 shadow-2xl">
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400 text-sm">BTC/USDT</span>
                        <span className="text-green-400 text-sm font-semibold">+12.5%</span>
                      </div>
                      <div className="text-5xl font-bold text-white">$67,432.50</div>
                      <div className="h-48 flex items-end justify-between gap-2">
                        {[30, 45, 35, 50, 40, 60, 55, 70, 65, 80, 75, 90].map((h, i) => (
                          <div
                            key={i}
                            className="flex-1 bg-gradient-to-t from-primary to-primary-600 rounded-t-lg transition-all hover:from-primary-600 hover:to-primary-700"
                            style={{ height: `${h}%` }}
                          />
                        ))}
                      </div>
                      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-700">
                        <div>
                          <p className="text-slate-400 text-xs">24h Volume</p>
                          <p className="text-white font-semibold">$2.4B</p>
                        </div>
                        <div>
                          <p className="text-slate-400 text-xs">Market Cap</p>
                          <p className="text-white font-semibold">$1.2T</p>
                        </div>
                        <div>
                          <p className="text-slate-400 text-xs">Traders</p>
                          <p className="text-white font-semibold">15M+</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute -inset-4 bg-gradient-to-r from-primary to-primary-600 rounded-3xl blur-3xl opacity-20 -z-10" />
                </div>
              </div>
            </div>
          </section>

          {/* Stats Section */}
          <section className="py-16 bg-white dark:bg-slate-900/50 border-y border-slate-200 dark:border-slate-800">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-primary-600/10 mb-4">
                      <stat.icon className="w-8 h-8 text-primary" />
                    </div>
                    <div className="text-4xl font-bold text-slate-900 dark:text-white mb-2">{stat.value}</div>
                    <div className="text-slate-600 dark:text-slate-400">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section id="features" className="py-24">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
                  <Award className="w-4 h-4" />
                  Nima uchun biz
                </div>
                <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-6">
                  Professional Trading Ta&apos;limi
                </h2>
                <p className="text-xl text-slate-600 dark:text-slate-400">
                  Biz sizni noldan professional treydergacha aylantirish uchun zarur bo&apos;lgan hamma narsani taqdim etamiz
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="group p-8 rounded-3xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300"
                  >
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-primary-600/10 group-hover:from-primary/20 group-hover:to-primary-600/20 transition-all mb-6">
                      <feature.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{feature.title}</h3>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Course Types Section */}
          <section
            id="types"
            className="py-24 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900/50 dark:to-slate-900"
          >
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
                  <BarChart3 className="w-4 h-4" />
                  Trading Yo&apos;nalishlari
                </div>
                <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-6">
                  Tanlangan Yo&apos;nalishingizni O&apos;rganing
                </h2>
                <p className="text-xl text-slate-600 dark:text-slate-400">
                  Har xil moliyaviy bozorlar uchun ixtisoslashgan kurslar
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courseTypes.map((type, index) => (
                  <div
                    key={index}
                    className="group p-8 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-primary hover:scale-105 transition-all duration-300 cursor-pointer"
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary-600 mb-6 group-hover:scale-110 transition-transform">
                      <type.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{type.title}</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{type.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Courses Section */}
          <section id="courses" className="py-24">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
                  <BookOpen className="w-4 h-4" />
                  Mashhur Kurslar
                </div>
                <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-6">
                  O&apos;zingizga Mos Kursni Tanlang
                </h2>
                <p className="text-xl text-slate-600 dark:text-slate-400">
                  Boshlang&apos;ich darajadan professionalgacha bo&apos;lgan barcha kurslar
                </p>
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap justify-center gap-3 mb-12">
                <button
                  onClick={() => setActiveCategory('all')}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                    activeCategory === 'all'
                      ? 'bg-primary text-white shadow-lg shadow-primary/30'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  Barchasi
                </button>
                {categories.map((category: any) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                      activeCategory === category.id
                        ? 'bg-primary text-white shadow-lg shadow-primary/30'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {category.nameUz || category.nameEn}
                  </button>
                ))}
              </div>

              {/* Course Cards */}
              {isLoading ? (
                <div className="flex items-center justify-center py-20">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-3 border-primary"></div>
                </div>
              ) : filteredCourses.length === 0 ? (
                <div className="text-center py-20">
                  <BookOpen className="w-20 h-20 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
                  <p className="text-xl text-slate-600 dark:text-slate-400">Hozircha kurslar yo&apos;q</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredCourses.map((course: any) => (
                    <div
                      key={course.id}
                      className="group rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 overflow-hidden hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300"
                    >
                      {/* Course Image */}
                      <div className="relative h-48 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 overflow-hidden">
                        {course.coverImage ? (
                          <img
                            src={course.coverImage}
                            alt={course.titleUz || course.titleEn}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <BookOpen className="w-20 h-20 text-slate-400 dark:text-slate-500" />
                          </div>
                        )}
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1.5 rounded-lg bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm text-slate-900 dark:text-white text-sm font-semibold">
                            {course.category?.nameUz || course.category?.nameEn}
                          </span>
                        </div>
                        {course.isFree && (
                          <div className="absolute top-4 right-4">
                            <span className="px-3 py-1.5 rounded-lg bg-green-500 text-white text-sm font-semibold">
                              Bepul
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Course Content */}
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                          {course.titleUz || course.titleEn || 'Kurs nomi'}
                        </h3>

                        <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 line-clamp-2">
                          {course.descriptionUz || course.descriptionEn || "Kurs haqida ma'lumot"}
                        </p>

                        <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400 mb-4">
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4" />
                            <span>{course.modules?.length || 0} modul</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Users className="w-4 h-4" />
                            <span>{course.mentor?.firstName || 'Mentor'}</span>
                          </div>
                        </div>

                        <Link href={`/course/${course.id}`}>
                          <Button
                            type="primary"
                            className="!w-full !bg-primary hover:!bg-primary-600 !text-white !font-semibold !h-12 !rounded-xl"
                          >
                            Batafsil
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* View All Courses */}
              <div className="text-center mt-12">
                <Link href="/login">
                  <Button
                    size="large"
                    className="!bg-slate-100 dark:!bg-slate-800 hover:!bg-slate-200 dark:hover:!bg-slate-700 !text-slate-900 dark:!text-white !font-semibold !h-14 !px-10 !rounded-xl !text-lg !border-0"
                  >
                    Barcha Kurslarni Ko&apos;rish
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-24 bg-gradient-to-br from-slate-900 to-slate-800 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, rgb(255, 255, 255) 1px, transparent 0)`,
                  backgroundSize: '40px 40px',
                }}
              ></div>
            </div>

            <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary text-sm font-semibold mb-8">
                <Zap className="w-4 h-4" />
                Kelayotgan yil treyder sifatida boshlang
              </div>

              <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6">
                Professional Treyderlikka Birinchi Qadamni Qo&apos;ying
              </h2>

              <p className="text-xl text-slate-400 mb-10 leading-relaxed">
                HBS Academy bilan moliyaviy bozorlarda professional treyder bo&apos;ling. Real amaliyot, mentor yordami
                va ishlaydigan strategiyalar bilan karyerangizni boshlang.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/register">
                  <Button
                    type="primary"
                    size="large"
                    className="!bg-primary hover:!bg-primary-600 !text-white !font-semibold !h-14 !px-12 !rounded-xl !text-lg"
                  >
                    Hoziroq Royxatdan O&apos;ting
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link href="/login">
                  <Button
                    size="large"
                    className="!bg-white/10 hover:!bg-white/20 !text-white !font-semibold !h-14 !px-12 !rounded-xl !text-lg !border-0"
                  >
                    Demo Ko&apos;rish
                  </Button>
                </Link>
              </div>

              <div className="flex items-center justify-center gap-8 mt-12 pt-12 border-t border-slate-700">
                <div className="flex items-center gap-2 text-slate-400">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span>Bepul boshlash</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span>Kredit kartasi kerak emas</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span>Istalgan vaqtda to&apos;xtatish</span>
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="py-12 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-600 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xl font-bold text-slate-900 dark:text-white">HBS Academy</span>
                </div>

                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  © {new Date().getFullYear()} HBS Academy. Barcha huquqlar himoyalangan.
                </p>

                <div className="flex items-center gap-6">
                  <a
                    href="#"
                    className="text-slate-600 dark:text-slate-400 hover:text-primary transition-colors text-sm"
                  >
                    Maxfiylik siyosati
                  </a>
                  <a
                    href="#"
                    className="text-slate-600 dark:text-slate-400 hover:text-primary transition-colors text-sm"
                  >
                    Foydalanish shartlari
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </AntdProvider>
  );
};

export default observer(Home);
