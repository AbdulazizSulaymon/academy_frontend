import { Collapse } from 'antd';
import { useMemo } from 'react';
import { Fade } from 'react-awesome-reveal';
import { HelpCircle, ChevronDown } from 'lucide-react';

import { Container } from '@components/container';

const faqs = [
  {
    question: 'HBS Academy qanday ishlaydi?',
    answer:
      "HBS Academy - bu professional treyder bo'lish uchun to'liq onlayn ta'lim platformasi. Siz video darslar, amaliy mashg'ulotlar va shaxsiy mentorlar yordami bilan trading o'rganasiz.",
  },
  {
    question: "Trading o'rganish uchun oldindan bilim kerakmi?",
    answer:
      "Yo'q, bizning boshlang'ich kursimiz 0 dan boshlanadi. Hech qanday oldindan bilim talab qilinmaydi. Biz sizga moliyaviy bozorlar va trading asoslaridan boshlab o'rgatamiz.",
  },
  {
    question: 'Kurs davomiyligi qancha?',
    answer:
      "Boshlang'ich kurs 30 kun, Professional kurs esa 90 kun davom etadi. VIP mentorlash dasturining davomiyligi esa individual ravishda belgilanadi.",
  },
  {
    question: "Real pul bilan trading qilishim kerakmi?",
    answer:
      "Yo'q, dastlab siz demo hisob bilan amaliyot qilasiz. Real pul bilan trading faqat siz tayyor bo'lganingizda va xohlagan vaqtingizda boshlaysiz.",
  },
  {
    question: "Kurs tugagandan keyin qo'llab-quvvatlash bormi?",
    answer:
      "Ha, Professional va VIP kurslarda umrbod qo'llab-quvvatlash mavjud. Siz istalgan vaqtda mentorlarimizga savol berib, maslahat olishingiz mumkin.",
  },
  {
    question: "Bo'lib-bo'lib to'lash mumkinmi?",
    answer:
      "Ha, biz turli xil to'lov rejalarini taklif qilamiz. Siz bo'lib-bo'lib to'lash yoki bir oyda to'lash (10% chegirma bilan) variantini tanlashingiz mumkin.",
  },
  {
    question: "Qanday bozorlarni o'rganaman?",
    answer:
      "Siz Cryptocurrency, aksiyalar va boshqa moliyaviy bozorlarni o'rganasiz. Kurs davomida turli bozorlar va trading instrumentlari bilan tanishasiz.",
  },
  {
    question: 'Nega aynan HBS Academy ni tanlashim kerak?',
    answer:
      "HBS Academy tajribali mentorlar, samarali o'quv dasturi va real trading tajribasi bilan O'zbekistondagi eng yaxshi trading akademiyalaridan biri. Biz nafaqat nazariya, balki amaliy trading ko'nikmalarini ham o'rgatamiz.",
  },
];

function Faq() {
  const items = useMemo(
    () =>
      faqs.map((item, index) => ({
        key: index.toString(),
        label: (
          <div className="flex items-center gap-3 py-1">
            <span className="text-base font-medium text-gray-900 dark:text-white">{item.question}</span>
          </div>
        ),
        children: (
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed pl-0">{item.answer}</p>
        ),
      })),
    [],
  );

  return (
    <section className="py-20 md:py-28 relative overflow-hidden" id="faq">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-gradient-to-r from-primary/5 to-transparent rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-gradient-to-l from-primary/5 to-transparent rounded-full blur-3xl -translate-y-1/2" />

      <Container className="relative">
        <div className="text-center mb-16">
          <Fade triggerOnce duration={800}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <HelpCircle className="w-4 h-4" />
              <span>FAQ</span>
            </div>
          </Fade>
          <Fade triggerOnce duration={800} delay={200}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Eng ko'p{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-700">
                so'raladigan savollar
              </span>
            </h2>
            <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-400 text-lg">
              Savollaringizga javoblar shu yerda
            </p>
          </Fade>
        </div>

        <Fade triggerOnce duration={800} delay={400}>
          <div className="max-w-3xl mx-auto">
            <Collapse
              accordion
              ghost
              expandIconPosition="end"
              expandIcon={({ isActive }) => (
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 dark:bg-dark-200 transition-transform duration-300 ${
                    isActive ? 'rotate-180' : ''
                  }`}
                >
                  <ChevronDown className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                </div>
              )}
              items={items}
              className="faq-collapse"
              style={{ background: 'transparent' }}
            />
          </div>
        </Fade>

        <style jsx global>{`
          .faq-collapse .ant-collapse-item {
            border: none !important;
            margin-bottom: 12px;
            background: white;
            border-radius: 16px !important;
            overflow: hidden;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
            transition: all 0.3s ease;
          }

          .dark .faq-collapse .ant-collapse-item {
            background: #18181B;
          }

          .faq-collapse .ant-collapse-item:hover {
            box-shadow: 0 4px 12px rgba(248, 118, 7, 0.1);
          }

          .faq-collapse .ant-collapse-header {
            padding: 20px 24px !important;
            align-items: center !important;
          }

          .faq-collapse .ant-collapse-content {
            border-top: 1px solid rgba(0, 0, 0, 0.05);
          }

          .dark .faq-collapse .ant-collapse-content {
            border-top: 1px solid rgba(255, 255, 255, 0.05);
          }

          .faq-collapse .ant-collapse-content-box {
            padding: 16px 24px 24px !important;
          }

          .faq-collapse .ant-collapse-item-active {
            box-shadow: 0 4px 20px rgba(248, 118, 7, 0.15) !important;
          }
        `}</style>
      </Container>
    </section>
  );
}

export default Faq;
