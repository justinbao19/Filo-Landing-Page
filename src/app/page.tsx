import Image from 'next/image'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import './animate.css'
import HomeCarousel from '@/components/home-carousel'
import HomeCloser from '@/components/home-closer'
import HomeLanguage from '@/components/home-language'
import HomeSection from '@/components/home-section'
import HomeRainbowBtn from '@/components/home-rainbow-btn'
import HomeDownloadDropdown from '@/components/home-download-dropdown'
import HomeTitle from '@/components/home-title'

export default async function Home() {

  const t = await getTranslations('home')

  return (
    <div className="min-h-screen bg-white overflow-x-hidden overflow-y-auto">
      {/* 主要背景框体 - 自适应宽度 x 610px with gradient */}
      <div
        className="w-full md:h-[610px] flex-shrink-0 relative z-20"
        style={{
          background: 'linear-gradient(180deg, #E7F5FF 1.04%, #FFF 98.7%)',
        }}
      >
        {/* 内容容器 - 最大宽度1440px居中 */}
        <div className="max-w-[1440px] mx-auto h-full">
          {/* 导航栏 */}
          <HomeLanguage />

          {/* 主要内容区域 */}
          <main className="flex flex-col items-center text-center md:px-20 px-7.5">
            {/* 主标题区域 - 调整垂直间距以适应610px高度 */}
            <div className="md:mt-[120px] mt-[70px] md:mb-10 mb-7.5">
              <h1
                className="text-center font-bold md:text-[108px] text-[52px]"
                style={{
                  alignSelf: 'stretch',
                  color: '#000',
                  textAlign: 'center',
                  fontFeatureSettings: '"liga" off, "clig" off',
                  fontFamily: 'var(--font-inter), Inter, sans-serif',
                  fontStyle: 'normal',
                  fontWeight: 700,
                  lineHeight: '130%',
                  letterSpacing: '-3px',
                }}
              >
                {t('slogan')}
              </h1>
            </div>

            {/* 副标题描述 - 应用设计规范 */}
            <div className="md:mb-[80px] mb-7.5">
              <p
                className="text-center md:text-[22px] text-[16px]"
                style={{
                  alignSelf: 'stretch',
                  color: '#707070',
                  textAlign: 'center',
                  fontFeatureSettings: '"liga" off, "clig" off',
                  fontFamily: 'var(--font-inter), Inter, sans-serif',
                  fontStyle: 'normal',
                  fontWeight: 400,
                  lineHeight: '150%',
                  maxWidth: '800px',
                  margin: '0 auto',
                }}
              >
                {t('sloganDescription')}
              </p>
            </div>

            {/* 下载按钮组 */}
            <div className="flex gap-[30px] items-center md:flex-row flex-col">
              {/* App Store 按钮 - 使用提供的SVG */}
              <a
                href="https://apple.co/43FINlq"
                className="inline-flex md:px-5 px-3 md:h-[74px] h-[54px] items-center transition-all gap-4 duration-300 hover:-translate-y-1"
                target="_blank"
              >
                <Image
                  className="md:w-[258px] w-[175px] md:rounded-3xl rounded-2xl"
                  src="/icons/feature/mobile-apple-download-btn.png"
                  alt="Apple Logo"
                  width={525}
                  height={162}
                  style={{
                    boxShadow:
                      '0px 100px 80px 0px rgba(0, 0, 0, 0.02), 0px 41.778px 33.422px 0px rgba(0, 0, 0, 0.03), 0px 22.336px 17.869px 0px rgba(0, 0, 0, 0.04), 0px 12.522px 10.017px 0px rgba(0, 0, 0, 0.04), 0px 6.65px 5.32px 0px rgba(0, 0, 0, 0.05), 0px 2.767px 2.214px 0px rgba(0, 0, 0, 0.07)',
                  }}
                />
              </a>

              {/* macOS 按钮 - 使用新的SVG with dropdown */}
              <HomeDownloadDropdown />
            </div>
          </main>
        </div>
      </div>

      {/* Sample Emails 区域 */}
      <section
        className={`w-full bg-white pt-15 md:pt-[120px] md:pb-32 mb-20 scroll-animate relative z-10 visible`}
      >
        <div className="w-full">
          {/* 卡片自动滚动容器 */}
          <div className="relative overflow-hidden">
            <HomeCarousel />
          </div>
        </div>
      </section>

      {/* A Closer Look 区域 */}
      <section className="w-full overflow-hidden">
        <HomeCloser />
      </section>

      <HomeSection />

      {/* 底部图像区域 */}
      <div className="md:pt-[140px] pt-20" style={{ background: '#E9F6FF', paddingBottom: '40px' }}>
        <div className="max-w-[1280px] mx-auto">
          {/* 主容器 - 左右布局 */}
          <div
            className="px-2 md:flex-row flex-col md:gap-30 gap-10 md:items-start items-center"
            style={{
              display: 'flex',
              width: '100%',
            }}
          >
            {/* 左侧：标题、文本和按钮容器 */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
              }}
              className="md:w-[575px] w-full md:gap-10 gap-4 items-center md:items-start"
            >
              {/* 标题 */}
              <HomeTitle title={t('theStartOfFilo')} />

              {/* 文本 */}
              <div
                style={{
                  color: 'var(--07, #707070)',
                  textAlign: 'left',
                  fontFeatureSettings: '"liga" off, "clig" off',
                  fontFamily: 'Inter',
                  fontStyle: 'normal',
                  fontWeight: 400,
                  lineHeight: '150%',
                  margin: 0,
                }}
                className="md:w-[417px] w-full md:text-[18px] text-[16px] md:px-0 px-10"
              >
                {t('theStartOfFiloDescription')
                  .split('\n\n')
                  .map((paragraph, index) => (
                    <p
                      key={index}
                      style={{
                        margin: index === 0 ? '0 0 16px 0' : '16px 0',
                      }}
                    >
                      {paragraph}
                    </p>
                  ))}
              </div>

              <div
                style={{
                  flex: '1',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                className="md:hidden flex mb-10"
              >
                <Image
                  src="/icons/feature/team.svg"
                  alt="Team working in office"
                  width={500}
                  height={300}
                  style={{
                    width: 'auto',
                    height: 'auto',
                    maxWidth: '100%',
                  }}
                />
              </div>
              {/* 按钮区域 */}
              <div className="flex gap-[30px] items-start">
                {/* Mobile 按钮 - Rainbow Button */}
                <HomeRainbowBtn />

                {/* Docs 按钮 - Regular Button */}
                <a
                  href="https://filo-mail.gitbook.io/filo-mail-docs/"
                  className="inline-block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button
                    className="w-[161px] h-[53px] transition-colors duration-300 text-black hover:bg-black/5 hover:text-black bg-white font-semibold text-base whitespace-nowrap"
                    style={{
                      fontFamily: 'Inter',
                      border: 'none',
                      borderRadius: '12px',
                      boxShadow: '0px 2px 20px 0px rgba(0, 0, 0, 0.04)',
                      cursor: 'pointer',
                      colorScheme: 'light',
                    }}
                  >
                    {t('learnHow')}
                  </button>
                </a>
              </div>
            </div>

            {/* 右侧：团队插图 */}
            <div
              style={{
                flex: '1',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              className="md:flex hidden"
            >
              <Image
                src="/icons/feature/team.svg"
                alt="Team working in office"
                width={500}
                height={300}
                style={{
                  width: 'auto',
                  height: 'auto',
                  maxWidth: '100%',
                  transform: 'scale(0.9) translateY(200px) translateX(50px)',
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 分割线 */}
      <div
        className="w-full bg-[#E9F6FF] flex justify-center px-5"
      >
        <div
          className="w-[1280px] bg-black h-[0.5px] self-stretch"
        />
      </div>

      {/* 页脚区域 */}
      <div
        style={{
          width: '100%',
          background: '#E9F6FF',
          padding: '30px 20px 110px 20px',
        }}
      >
        <div className="max-w-[1280px] mx-auto w-full flex md:flex-row flex-col justify-between items-center">
          {/* 左侧链接 */}
          <div className="items-center md:flex hidden" style={{ gap: '24px' }}>
            <Link
              href="/terms-privacy?section=terms"
              style={{
                color: 'var(--06, #000)',
                fontFamily: 'Inter',
                fontSize: '13px',
                fontStyle: 'normal',
                fontWeight: 500,
                lineHeight: '130%',
                letterSpacing: '-0.3px',
                textDecoration: 'none',
              }}
              target="_blank"
              className="hover:opacity-70 transition-opacity duration-300"
            >
              {t('termsOfService')}
            </Link>
            <Link
              href="/terms-privacy?section=privacy"
              style={{
                color: 'var(--06, #000)',
                fontFamily: 'Inter',
                fontSize: '13px',
                fontStyle: 'normal',
                fontWeight: 500,
                lineHeight: '130%',
                letterSpacing: '-0.3px',
                textDecoration: 'none',
              }}
              className="hover:opacity-70 transition-opacity duration-300"
              target="_blank"
            >
              {t('privacyPolicy')}
            </Link>
            <Link
              href="/terms-privacy?section=data"
              style={{
                color: 'var(--06, #000)',
                fontFamily: 'Inter',
                fontSize: '13px',
                fontStyle: 'normal',
                fontWeight: 500,
                lineHeight: '130%',
                letterSpacing: '-0.3px',
                textDecoration: 'none',
              }}
              className="hover:opacity-70 transition-opacity duration-300"
              target="_blank"
            >
              {t('dataProtection')}
            </Link>
            <span
              style={{
                color: 'var(--07, #707070)',
                fontFamily: 'Inter',
                fontSize: '13px',
                fontStyle: 'normal',
                fontWeight: 500,
                lineHeight: '130%',
                letterSpacing: '-0.3px',
              }}
            >
              {t('copyright')}
            </span>
          </div>

          {/* 右侧社交媒体图标 */}
          <div className="items-center flex gap-7.5">
            <a
              href="https://discord.gg/filo-mail"
              className="transition-all duration-300 hover:scale-110"
              style={{
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              target="_blank"
            >
              <Image
                src="/icons/brand/brand_discord_icon.svg"
                alt="Discord"
                width={32}
                height={32}
                className="w-[32px] h-[32px]"
                style={{
                  width: '32px',
                  height: '32px',
                }}
              />
            </a>
            <a
              href="https://x.com/Filo_Mail"
              className="transition-all duration-300 hover:scale-110"
              style={{
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              target="_blank"
            >
              <Image
                src="/icons/brand/brand_x_icon.svg"
                alt="X (Twitter)"
                width={32}
                height={32}
                className="w-[32px] h-[32px]"
                style={{
                  width: '32px',
                  height: '32px',
                }}
              />
            </a>
            <a
              href="https://feedback.filomail.com/"
              className="transition-all duration-300 hover:scale-110"
              style={{
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transform: 'translateY(-3px) scale(0.95)',
              }}
              target="_blank"
            >
              <Image
                src="/icons/brand/brand_feedback_icon.svg"
                alt="Feedback"
                width={32}
                height={32}
                className="w-[32px] h-[32px]"
                style={{
                  width: '32px',
                  height: '32px',
                }}
              />
            </a>
          </div>
          <div className="items-center md:hidden flex gap-6 mt-5">
            <Link
              href="/terms-privacy?section=terms"
              style={{
                color: 'var(--06, #000)',
                fontFamily: 'Inter',
                fontSize: '13px',
                fontStyle: 'normal',
                fontWeight: 500,
                lineHeight: '130%',
                letterSpacing: '-0.3px',
                textDecoration: 'none',
              }}
              target="_blank"
              className="hover:opacity-70 transition-opacity duration-300"
            >
              {t('termsOfService')}
            </Link>
            <Link
              href="/terms-privacy?section=privacy"
              style={{
                color: 'var(--06, #000)',
                fontFamily: 'Inter',
                fontSize: '13px',
                fontStyle: 'normal',
                fontWeight: 500,
                lineHeight: '130%',
                letterSpacing: '-0.3px',
                textDecoration: 'none',
              }}
              className="hover:opacity-70 transition-opacity duration-300"
              target="_blank"
            >
              {t('privacyPolicy')}
            </Link>
            <Link
              href="/terms-privacy?section=data"
              style={{
                color: 'var(--06, #000)',
                fontFamily: 'Inter',
                fontSize: '13px',
                fontStyle: 'normal',
                fontWeight: 500,
                lineHeight: '130%',
                letterSpacing: '-0.3px',
                textDecoration: 'none',
              }}
              className="hover:opacity-70 transition-opacity duration-300"
              target="_blank"
            >
              {t('dataProtection')}
            </Link>
          </div>
          <span
            style={{
              color: 'var(--07, #707070)',
              fontFamily: 'Inter',
              fontSize: '13px',
              fontStyle: 'normal',
              fontWeight: 500,
              lineHeight: '130%',
              letterSpacing: '-0.3px',
            }}
            className="md:hidden flex items-center justify-center mt-5"
          >
            {t('copyright')}
          </span>
        </div>
      </div>
    </div>
  )
}
