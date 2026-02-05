import { observer } from 'mobx-react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useApi } from '@src/api';
import { Button } from 'antd';
import { get } from 'lodash';
import {
  BookOpen,
  Clock,
  Users,
  Play,
  CheckCircle,
  Lock,
  ChevronRight,
  Target,
  Video,
  FileText,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

const CourseDetailPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const api = useApi();
  const { t } = useTranslation();

  const [course, setCourse] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchCourse = async () => {
      if (!id) return;

      setIsLoading(true);
      try {
        const res = await api.instance.post('/api/course/find-first', {
          where: { id: id as string },
          include: {
            category: true,
            mentor: true,
            modules: {
              where: { isPublished: true },
              orderBy: { order: 'asc' },
              include: {
                lessons: {
                  where: { isPublished: true },
                  orderBy: { order: 'asc' },
                },
              },
            },
          },
        });
        setCourse(get(res, 'data', null));
      } catch (error) {
        console.error('Error fetching course:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  const toggleModule = (moduleId: string) => {
    setExpandedModules((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(moduleId)) {
        newSet.delete(moduleId);
      } else {
        newSet.add(moduleId);
      }
      return newSet;
    });
  };

  const calculateTotalDuration = () => {
    if (!course?.modules) return 0;
    return course.modules.reduce((total: number, module: any) => {
      return (
        total +
        (module.lessons || []).reduce((moduleTotal: number, lesson: any) => {
          return moduleTotal + (lesson.duration || 0);
        }, 0)
      );
    }, 0);
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
      return `${hours} soat ${mins} minut`;
    }
    return `${mins} minut`;
  };

  const calculateTotalLessons = () => {
    if (!course?.modules) return 0;
    return course.modules.reduce((total: number, module: any) => {
      return total + (module.lessons?.length || 0);
    }, 0);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-3 border-primary"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="w-24 h-24 text-slate-300 dark:text-slate-600 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">Kurs topilmadi</h1>
          <p className="text-slate-600 dark:text-slate-400 mb-8">
            Qidirilayotgan kurs mavjud emas yoki o'chirilgan
          </p>
          <Link href="/">
            <Button type="primary" className="!bg-primary hover:!bg-primary-600 !text-white">
              Bosh sahifaga qaytish
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{course.titleUz || course.titleEn} - HBS Academy</title>
        <meta name="description" content={course.descriptionUz || course.descriptionEn || 'Professional trading kursi'} />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary-600 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-bold text-slate-900 dark:text-white">HBS Academy</span>
              </Link>

              <div className="flex items-center gap-3">
                <Link href="/login">
                  <Button type="text" className="!text-slate-700 dark:!text-slate-300 !font-medium">
                    Kirish
                  </Button>
                </Link>
                <Link href="/register">
                  <Button
                    type="primary"
                    className="!bg-primary hover:!bg-primary-600 !text-white !font-semibold !h-10 !px-6 !rounded-lg"
                  >
                    Ro'yxatdan o'tish
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="pt-24 pb-12">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 mb-6">
              <Link href="/" className="hover:text-primary transition-colors">
                Bosh sahifa
              </Link>
              <ChevronRight className="w-4 h-4" />
              <Link href="/#courses" className="hover:text-primary transition-colors">
                Kurslar
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-slate-900 dark:text-white font-medium">{course.titleUz || course.titleEn}</span>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Cover Image */}
                {course.coverImage && (
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                    <img src={course.coverImage} alt={course.titleUz || course.titleEn} className="w-full h-80 object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                )}

                {/* Title and Info */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <span className="inline-block px-3 py-1 rounded-lg bg-primary/10 text-primary text-sm font-semibold mb-3">
                        {course.category?.nameUz || course.category?.nameEn}
                      </span>
                      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">
                        {course.titleUz || course.titleEn}
                      </h1>
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                        {course.descriptionUz || course.descriptionEn}
                      </p>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-slate-200 dark:border-slate-700">
                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                      <Clock className="w-5 h-5" />
                      <span>{formatTime(calculateTotalDuration())}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                      <BookOpen className="w-5 h-5" />
                      <span>{course.modules?.length || 0} modul</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                      <Video className="w-5 h-5" />
                      <span>{calculateTotalLessons()} dars</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                      <Users className="w-5 h-5" />
                      <span>{course.mentor?.firstName || 'Mentor'}</span>
                    </div>
                  </div>
                </div>

                {/* What You'll Learn */}
                {course.objectives && (
                  <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                      <Target className="w-6 h-6 text-primary" />
                      Nima o'rganasiz
                    </h2>
                    <div className="grid md:grid-cols-2 gap-3">
                      {Array.isArray(course.objectives) ? (
                        course.objectives.map((objective: string, index: number) => (
                          <div key={index} className="flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                            <span className="text-slate-700 dark:text-slate-300">{objective}</span>
                          </div>
                        ))
                      ) : (
                        <p className="text-slate-600 dark:text-slate-400">{course.objectives}</p>
                      )}
                    </div>
                  </div>
                )}

                {/* Modules and Lessons */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                    <BookOpen className="w-6 h-6 text-primary" />
                    Kurs dasturi
                  </h2>

                  <div className="space-y-4">
                    {course.modules?.map((module: any, moduleIndex: number) => (
                      <div key={module.id} className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
                        {/* Module Header */}
                        <button
                          onClick={() => toggleModule(module.id)}
                          className="w-full flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center font-bold text-sm">
                              {moduleIndex + 1}
                            </div>
                            <div className="text-left">
                              <h3 className="font-semibold text-slate-900 dark:text-white">{module.titleUz || module.titleEn}</h3>
                              <p className="text-sm text-slate-600 dark:text-slate-400">
                                {module.lessons?.length || 0} dars •{' '}
                                {formatTime(
                                  (module.lessons || []).reduce((total: number, lesson: any) => total + (lesson.duration || 0), 0)
                                )}
                              </p>
                            </div>
                          </div>
                          <ChevronRight
                            className={`w-5 h-5 text-slate-600 dark:text-slate-400 transition-transform ${
                              expandedModules.has(module.id) ? 'rotate-90' : ''
                            }`}
                          />
                        </button>

                        {/* Lessons */}
                        {expandedModules.has(module.id) && (
                          <div className="p-4 space-y-2 border-t border-slate-200 dark:border-slate-700">
                            {module.lessons?.map((lesson: any, lessonIndex: number) => (
                              <div
                                key={lesson.id}
                                className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-700"
                              >
                                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xs font-medium text-slate-600 dark:text-slate-400">
                                  {lessonIndex + 1}
                                </div>
                                <Play className="w-4 h-4 text-primary flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                  <p className="font-medium text-slate-900 dark:text-white text-sm">
                                    {lesson.titleUz || lesson.titleEn}
                                  </p>
                                  <div className="flex items-center gap-3 mt-1">
                                    <span className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-1">
                                      <Clock className="w-3 h-3" />
                                      {formatTime(lesson.duration || 0)}
                                    </span>
                                    {lesson.lessonType === 'TEST' && (
                                      <span className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-1">
                                        <FileText className="w-3 h-3" />
                                        Test
                                      </span>
                                    )}
                                  </div>
                                </div>
                                <Lock className="w-4 h-4 text-slate-400 flex-shrink-0" />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Price Card */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg sticky top-24">
                  <div className="mb-6">
                    {course.isFree ? (
                      <div className="text-center mb-4">
                        <span className="text-4xl font-bold text-green-600">Bepul</span>
                      </div>
                    ) : (
                      <div className="text-center mb-4">
                        <span className="text-4xl font-bold text-slate-900 dark:text-white">${course.price || 0}</span>
                      </div>
                    )}
                  </div>

                  <Link href={course.isFree ? '/register' : `/register?course=${id}`}>
                    <Button
                      type="primary"
                      size="large"
                      className="!w-full !bg-primary hover:!bg-primary-600 !text-white !font-semibold !h-12 !rounded-xl !text-lg mb-3"
                    >
                      {course.isFree ? 'Bepul boshlash' : 'Kursga yozilish'}
                    </Button>
                  </Link>

                  <Link href="/login">
                    <Button
                      size="large"
                      className="!w-full !bg-slate-100 dark:!bg-slate-700 hover:!bg-slate-200 dark:hover:!bg-slate-600 !text-slate-900 dark:!text-white !font-semibold !h-12 !rounded-xl !text-lg border-0"
                    >
                      Kirish
                    </Button>
                  </Link>

                  {/* Features */}
                  <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700 space-y-3">
                    <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                      <span>To'liq kursga kirish</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                      <span>{calculateTotalLessons()} ta dars</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                      <span>Sertifikat</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                      <span>Amaliy topshiriqlar</span>
                    </div>
                  </div>

                  {/* Mentor */}
                  {course.mentor && (
                    <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
                      <h3 className="font-semibold text-slate-900 dark:text-white mb-3">Kurs o'qituvchisi</h3>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
                          <span className="font-semibold text-slate-600 dark:text-slate-300">{course.mentor.firstName?.[0]}</span>
                        </div>
                        <div>
                          <p className="font-medium text-slate-900 dark:text-white">
                            {course.mentor.firstName} {course.mentor.lastName}
                          </p>
                          <p className="text-sm text-slate-600 dark:text-slate-400">Professional Mentor</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default observer(CourseDetailPage);
