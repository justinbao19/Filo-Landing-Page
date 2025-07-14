'use client'
import React, { memo, useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { Language } from '@/lib/locale'
import Cookies from 'universal-cookie'
import Image from 'next/image'

const cookies = new Cookies()

const HomeCarousel = () => {
  const t = useTranslations('home')

  const [isSampleCardsVisible, setIsSampleCardsVisible] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState(Language.EN)

  useEffect(() => {
    setSelectedLanguage((cookies.get('user-locale') as Language) || Language.EN)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsSampleCardsVisible(true)
        } else {
          setIsSampleCardsVisible(false)
        }
      })
    })

    const sampleCards = document.querySelector('.sample-cards-scroll')
    if (sampleCards) {
      observer.observe(sampleCards)
    }

    return () => {
      if (sampleCards) {
        observer.unobserve(sampleCards)
      }
    }
  }, [])

  const [activeIndex, setActiveIndex] = useState(-1)

  const mobileOnClick = (index: number) => {
    if (activeIndex === index) {
      document.querySelector('.sample-cards-scroll')?.classList.remove('stop')
      setActiveIndex(-1)
      return
    }
    setActiveIndex(index)
    document.querySelector('.sample-cards-scroll')?.classList.add('stop')
  }

  return (
    <div
      className={`sample-cards-scroll flex gap-5 md:gap-10 ${!isSampleCardsVisible ? 'stop' : ''}`}
      style={{
        paddingLeft: '80px',
        paddingRight: '80px',
        paddingTop: '30px',
        paddingBottom: '30px',
      }}
    >
      {/* 卡片 1 - Understand It All */}
      <div
        className={`flex-shrink-0 md:rounded-[20px] rounded-2xl md:h-[570px] h-[352px] w-[372px] md:w-[600px] transition-all duration-200 hover:scale-105 ${activeIndex === 0 ? 'scale-105' : ''}`}
        style={{
          border: '0.5px solid rgba(0, 0, 0, 0.04)',
          background: 'var(--09, #FCFAFA)',
          position: 'relative',
        }}
        onClick={() => mobileOnClick(0)}
      >
        <div className="w-full h-full flex flex-col md:p-7.5 p-4">
          <h3
            className={`md:text-[27px] text-[16px] font-bold ${t('understandItAll').includes('\n') ? 'md:mb-7.5 mb-5' : 'md:mb-10 mb-7.5'}`}
            style={{
              color: 'var(--06, #000)',
              fontFeatureSettings: '"liga" off, "clig" off',
              fontFamily: 'Inter',
              fontStyle: 'normal',
              lineHeight: '130%',
              letterSpacing: '-0.5px',
            }}
          >
            {t('understandItAll').includes('\n')
              ? t('understandItAll')
                  .split('\n')
                  .map((line, index) => (
                    <div key={index}>
                      {index === 0 ? (
                        <span
                        className={`${selectedLanguage === Language.ZH_CN || selectedLanguage === Language.ZH_TW || selectedLanguage === Language.JA ? 'md:text-[16px] text-[13px]' : 'md:text-[18.225px] text-[15px]'}`}
                        >
                          {line}
                        </span>
                      ) : (
                        <div>{line}</div>
                      )}
                    </div>
                  ))
              : t('understandItAll')}
          </h3>

          {/* 功能示例图片 */}
          <div className="flex-1 flex items-end">
            <div className="relative w-full h-full">
              {/* Japanese email */}
              <div className="w-[90%] h-[90%] absolute top-0 left-0 md:shadow-xl shadow rounded-3xl">
                <Image
                  src="/icons/feature/sample1_jp.png"
                  alt="Japanese email example"
                  width={258}
                  height={350}
                  className="w-full h-auto "
                  style={{
                    display: 'block',
                    borderRadius: '12px',
                  }}
                />
              </div>
              {/* English translation */}
              <div className="w-[80%] h-[80%] absolute top-[15%] left-[20%] rounded-3xl md:shadow-xl shadow">
                <Image
                  src="/icons/feature/sample1_en.png"
                  alt="English translation example"
                  width={258}
                  height={350}
                  className="w-full h-auto "
                  style={{
                    display: 'block',
                    borderRadius: '12px',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 卡片 2 - Promo, Condensed */}
      <div
        className={`flex-shrink-0 md:rounded-[20px] rounded-2xl md:h-[570px] h-[352px] w-[372px] md:w-[600px] transition-all duration-200 hover:scale-105 ${activeIndex === 1 ? 'scale-105' : ''}`}
        style={{
          border: '0.5px solid rgba(0, 0, 0, 0.04)',
          background: 'var(--09, #FCFAFA)',
          position: 'relative',
        }}
        onClick={() => mobileOnClick(1)}
      >
        <div className="w-full h-full flex flex-col md:p-7.5 p-4">
          <h3
            className={`md:text-[27px] text-[16px] font-bold ${t('promoCondensed').includes('\n') ? 'md:mb-7.5 mb-5' : 'md:mb-10 mb-7.5'}`}
            style={{
              color: 'var(--06, #000)',
              fontFeatureSettings: '"liga" off, "clig" off',
              fontFamily: 'Inter',
              fontStyle: 'normal',
              lineHeight: '130%',
              letterSpacing: '-0.5px',
            }}
          >
            {t('promoCondensed').includes('\n')
              ? t('promoCondensed')
                  .split('\n')
                  .map((line, index) => (
                    <div key={index}>
                      {index === 0 ? (
                        <span
                        className={`${selectedLanguage === Language.ZH_CN || selectedLanguage === Language.ZH_TW || selectedLanguage === Language.JA ? 'md:text-[16px] text-[13px]' : 'md:text-[18.225px] text-[15px]'}`}
                        >
                          {line}
                        </span>
                      ) : (
                        <div>{line}</div>
                      )}
                    </div>
                  ))
              : t('promoCondensed')}
          </h3>

          {/* 促销功能示例图片 */}
          <div className="flex-1 flex items-end">
            <Image
              src="/icons/feature/sample2.png"
              alt="Promo email condensed feature"
              width={540}
              height={350}
              className="w-full h-auto md:shadow-xl shadow"
              style={{
                display: 'block',
                borderRadius: '12px',
              }}
            />
          </div>
        </div>
      </div>

      {/* 卡片 3 - What do I say? */}
      <div
        className={`flex-shrink-0 md:rounded-[20px] rounded-2xl md:h-[570px] h-[352px] w-[372px] md:w-[600px] transition-all duration-200 hover:scale-105 ${activeIndex === 2 ? 'scale-105' : ''}`}
        style={{
          border: '0.5px solid rgba(0, 0, 0, 0.04)',
          background: 'var(--09, #FCFAFA)',
          position: 'relative',
        }}
        onClick={() => mobileOnClick(2)}
      >
        <div className="w-full h-full flex flex-col md:p-7.5 p-4">
          <h3
            className={`md:text-[27px] text-[16px] font-bold ${t('whatDoISay').includes('\n') ? 'md:mb-7.5 mb-5' : 'md:mb-10 mb-7.5'}`}
            style={{
              color: 'var(--06, #000)',
              fontFeatureSettings: '"liga" off, "clig" off',
              fontFamily: 'Inter',
              fontStyle: 'normal',
              lineHeight: '130%',
              letterSpacing: '-0.5px',
            }}
          >
            {t('whatDoISay').includes('\n')
              ? t('whatDoISay')
                  .split('\n')
                  .map((line, index) => (
                    <div key={index}>
                      {index === 0 ? (
                        <span
                        className={`${selectedLanguage === Language.ZH_CN || selectedLanguage === Language.ZH_TW || selectedLanguage === Language.JA ? 'md:text-[16px] text-[13px]' : 'md:text-[18.225px] text-[15px]'}`}
                        >
                          {line}
                        </span>
                      ) : (
                        <div>{line}</div>
                      )}
                    </div>
                  ))
              : t('whatDoISay')}
          </h3>

          {/* 法语功能示例图片 */}
          <div className="flex-1 flex items-end">
            <Image
              src="/icons/feature/sample3.png"
              alt="French AI reply feature"
              width={540}
              height={350}
              className="w-full h-auto md:shadow-xl shadow"
              style={{
                display: 'block',
                borderRadius: '12px',
              }}
            />
          </div>
        </div>
      </div>

      {/* 卡片 4 - Boss Bomb Defused */}
      <div
        className={`flex-shrink-0 md:rounded-[20px] rounded-2xl md:h-[570px] h-[352px] w-[372px] md:w-[600px] transition-all duration-200 hover:scale-105 ${activeIndex === 3 ? 'scale-105' : ''}`}
        style={{
          border: '0.5px solid rgba(0, 0, 0, 0.04)',
          background: 'var(--09, #FCFAFA)',
          position: 'relative',
        }}
        onClick={() => mobileOnClick(3)}
      >
        <div className="w-full h-full flex flex-col md:p-7.5 p-4">
          <h3
            className={`md:text-[27px] text-[16px] font-bold ${t('bossBombDefused').includes('\n') ? 'md:mb-7.5 mb-5' : 'md:mb-10 mb-7.5'}`}
            style={{
              color: 'var(--06, #000)',
              fontFeatureSettings: '"liga" off, "clig" off',
              fontFamily: 'Inter',
              fontStyle: 'normal',
              lineHeight: '130%',
              letterSpacing: '-0.5px',
            }}
          >
            {t('bossBombDefused').includes('\n')
              ? t('bossBombDefused')
                  .split('\n')
                  .map((line, index) => (
                    <div key={index}>
                      {index === 0 ? (
                        <span
                        className={`${selectedLanguage === Language.ZH_CN || selectedLanguage === Language.ZH_TW || selectedLanguage === Language.JA ? 'md:text-[16px] text-[13px]' : 'md:text-[18.225px] text-[15px]'}`}
                        >
                          {line}
                        </span>
                      ) : (
                        <div>{line}</div>
                      )}
                    </div>
                  ))
              : t('bossBombDefused')}
          </h3>

          {/* Boss功能示例图片 */}
          <div className="flex-1 flex items-end">
            <Image
              src="/icons/feature/sample4.png"
              alt="Boss task management feature"
              width={540}
              height={350}
              className="w-full h-auto md:shadow-xl shadow"
              style={{
                display: 'block',
                borderRadius: '12px',
              }}
            />
          </div>
        </div>
      </div>

      {/* 卡片 5 - Goodbye Auto-Bill */}
      <div
        className={`flex-shrink-0 md:rounded-[20px] rounded-2xl md:h-[570px] h-[352px] w-[372px] md:w-[600px] transition-all duration-200 hover:scale-105 ${activeIndex === 4 ? 'scale-105' : ''}`}
        style={{
          border: '0.5px solid rgba(0, 0, 0, 0.04)',
          background: 'var(--09, #FCFAFA)',
          position: 'relative',
        }}
        onClick={() => mobileOnClick(4)}
      >
        <div className="w-full h-full flex flex-col md:p-7.5 p-4">
          <h3
            className={`md:text-[27px] text-[16px] font-bold ${t('goodbyeAutoBill').includes('\n') ? 'md:mb-7.5 mb-5' : 'md:mb-10 mb-7.5'}`}
            style={{
              color: 'var(--06, #000)',
              fontFeatureSettings: '"liga" off, "clig" off',
              fontFamily: 'Inter',
              fontStyle: 'normal',
              lineHeight: '130%',
              letterSpacing: '-0.5px',
            }}
          >
            {t('goodbyeAutoBill').includes('\n')
              ? t('goodbyeAutoBill')
                  .split('\n')
                  .map((line, index) => (
                    <div key={index}>
                      {index === 0 ? (
                        <span
                        className={`${selectedLanguage === Language.ZH_CN || selectedLanguage === Language.ZH_TW || selectedLanguage === Language.JA ? 'md:text-[16px] text-[13px]' : 'md:text-[18.225px] text-[15px]'}`}
                        >
                          {line}
                        </span>
                      ) : (
                        <div>{line}</div>
                      )}
                    </div>
                  ))
              : t('goodbyeAutoBill')}
          </h3>

          {/* 订阅管理功能示例图片 */}
          <div className="flex-1 flex items-end">
            <Image
              src="/icons/feature/sample5.png"
              alt="Subscription management feature"
              width={540}
              height={350}
              className="w-full h-auto md:shadow-xl shadow"
              style={{
                display: 'block',
                borderRadius: '12px',
              }}
            />
          </div>
        </div>
      </div>

      {/* 重复卡片以实现无缝循环 */}
      {/* 卡片 1 - Understand It All (重复) */}
      <div
        className={`flex-shrink-0 md:rounded-[20px] rounded-2xl md:h-[570px] h-[352px] w-[372px] md:w-[600px] transition-all duration-200 hover:scale-105 ${activeIndex === 5 ? 'scale-105' : ''}`}
        style={{
          border: '0.5px solid rgba(0, 0, 0, 0.04)',
          background: 'var(--09, #FCFAFA)',
          position: 'relative',
        }}
        onClick={() => mobileOnClick(5)}
      >
        <div className="w-full h-full flex flex-col md:p-7.5 p-4">
          <h3
            className={`md:text-[27px] text-[16px] font-bold ${t('understandItAll').includes('\n') ? 'md:mb-7.5 mb-5' : 'md:mb-10 mb-7.5'}`}
            style={{
              color: 'var(--06, #000)',
              fontFeatureSettings: '"liga" off, "clig" off',
              fontFamily: 'Inter',
              fontStyle: 'normal',
              lineHeight: '130%',
              letterSpacing: '-0.5px',
            }}
          >
            {t('understandItAll').includes('\n')
              ? t('understandItAll')
                  .split('\n')
                  .map((line, index) => (
                    <div key={index}>
                      {index === 0 ? (
                        <span
                        className={`${selectedLanguage === Language.ZH_CN || selectedLanguage === Language.ZH_TW || selectedLanguage === Language.JA ? 'md:text-[16px] text-[13px]' : 'md:text-[18.225px] text-[15px]'}`}
                        >
                          {line}
                        </span>
                      ) : (
                        <div>{line}</div>
                      )}
                    </div>
                  ))
              : t('understandItAll')}
          </h3>

          {/* 功能示例图片 */}
          <div className="flex-1 flex items-end">
            <div className="relative w-full h-full">
              {/* Japanese email */}
              <div className="w-[90%] h-[90%] absolute top-0 left-0 md:shadow-xl shadow rounded-3xl">
                <Image
                  src="/icons/feature/sample1_jp.png"
                  alt="Japanese email example"
                  width={258}
                  height={350}
                  className="w-full h-auto"
                  style={{
                    display: 'block',
                    borderRadius: '12px',
                  }}
                />
              </div>
              {/* English translation */}
              <div className="w-[80%] h-[80%] absolute top-[15%] left-[20%] md:shadow-xl shadow rounded-3xl">
                <Image
                  src="/icons/feature/sample1_en.png"
                  alt="English translation example"
                  width={258}
                  height={350}
                  className="w-full h-auto"
                  style={{
                    display: 'block',
                    borderRadius: '12px',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 卡片 2 - Promo, Condensed (重复) */}
      <div
        className={`flex-shrink-0 md:rounded-[20px] rounded-2xl md:h-[570px] h-[352px] w-[372px] md:w-[600px] transition-all duration-200 hover:scale-105 ${activeIndex === 6 ? 'scale-105' : ''}`}
        style={{
          border: '0.5px solid rgba(0, 0, 0, 0.04)',
          background: 'var(--09, #FCFAFA)',
          position: 'relative',
        }}
        onClick={() => mobileOnClick(6)}
      >
        <div className="w-full h-full flex flex-col md:p-7.5 p-4">
          <h3
            className={`md:text-[27px] text-[16px] font-bold ${t('promoCondensed').includes('\n') ? 'md:mb-7.5 mb-5' : 'md:mb-10 mb-7.5'}`}
            style={{
              color: 'var(--06, #000)',
              fontFeatureSettings: '"liga" off, "clig" off',
              fontFamily: 'Inter',
              fontStyle: 'normal',
              lineHeight: '130%',
              letterSpacing: '-0.5px',
            }}
          >
            {t('promoCondensed').includes('\n')
              ? t('promoCondensed')
                  .split('\n')
                  .map((line, index) => (
                    <div key={index}>
                      {index === 0 ? (
                        <span
                        className={`${selectedLanguage === Language.ZH_CN || selectedLanguage === Language.ZH_TW || selectedLanguage === Language.JA ? 'md:text-[16px] text-[13px]' : 'md:text-[18.225px] text-[15px]'}`}
                        >
                          {line}
                        </span>
                      ) : (
                        <div>{line}</div>
                      )}
                    </div>
                  ))
              : t('promoCondensed')}
          </h3>

          {/* 促销功能示例图片 */}
          <div className="flex-1 flex items-end">
            <Image
              src="/icons/feature/sample2.png"
              alt="Promo email condensed feature"
              width={540}
              height={350}
              className="w-full h-auto md:shadow-xl shadow"
              style={{
                display: 'block',
                borderRadius: '12px',
              }}
            />
          </div>
        </div>
      </div>

      {/* 卡片 3 - What do I say? (重复) */}
      <div
        className={`flex-shrink-0 md:rounded-[20px] rounded-2xl md:h-[570px] h-[352px] w-[372px] md:w-[600px] transition-all duration-200 hover:scale-105 ${activeIndex === 7 ? 'scale-105' : ''}`}
        style={{
          border: '0.5px solid rgba(0, 0, 0, 0.04)',
          background: 'var(--09, #FCFAFA)',
          position: 'relative',
        }}
        onClick={() => mobileOnClick(7)}
      >
        <div className="w-full h-full flex flex-col md:p-7.5 p-4">
          <h3
            className={`md:text-[27px] text-[16px] font-bold ${t('whatDoISay').includes('\n') ? 'md:mb-7.5 mb-5' : 'md:mb-10 mb-7.5'}`}
            style={{
              color: 'var(--06, #000)',
              fontFeatureSettings: '"liga" off, "clig" off',
              fontFamily: 'Inter',
              fontStyle: 'normal',
              lineHeight: '130%',
              letterSpacing: '-0.5px',
            }}
          >
            {t('whatDoISay').includes('\n')
              ? t('whatDoISay')
                  .split('\n')
                  .map((line, index) => (
                    <div key={index}>
                      {index === 0 ? (
                        <span
                        className={`${selectedLanguage === Language.ZH_CN || selectedLanguage === Language.ZH_TW || selectedLanguage === Language.JA ? 'md:text-[16px] text-[13px]' : 'md:text-[18.225px] text-[15px]'}`}
                        >
                          {line}
                        </span>
                      ) : (
                        <div>{line}</div>
                      )}
                    </div>
                  ))
              : t('whatDoISay')}
          </h3>

          {/* 法语功能示例图片 */}
          <div className="flex-1 flex items-end">
            <Image
              src="/icons/feature/sample3.png"
              alt="French AI reply feature"
              width={540}
              height={350}
              className="w-full h-auto md:shadow-2xl shadow"
              style={{
                display: 'block',
                borderRadius: '12px',
              }}
            />
          </div>
        </div>
      </div>

      {/* 卡片 4 - Boss Bomb Defused (重复) */}
      <div
        className={`flex-shrink-0 md:rounded-[20px] rounded-2xl md:h-[570px] h-[352px] w-[372px] md:w-[600px] transition-all duration-200 hover:scale-105 ${activeIndex === 8 ? 'scale-105' : ''}`}
        style={{
          border: '0.5px solid rgba(0, 0, 0, 0.04)',
          background: 'var(--09, #FCFAFA)',
          position: 'relative',
        }}
        onClick={() => mobileOnClick(8)}
      >
        <div className="w-full h-full flex flex-col md:p-7.5 p-4">
          <h3
            className={`md:text-[27px] text-[16px] font-bold ${t('bossBombDefused').includes('\n') ? 'md:mb-7.5 mb-5' : 'md:mb-10 mb-7.5'}`}
            style={{
              color: 'var(--06, #000)',
              fontFeatureSettings: '"liga" off, "clig" off',
              fontFamily: 'Inter',
              fontStyle: 'normal',
              lineHeight: '130%',
              letterSpacing: '-0.5px',
            }}
          >
            {t('bossBombDefused')
              .split('\n')
              .map((line, index) => (
                <div key={index}>
                  {index === 0 ? (
                    <span
                    className={`${selectedLanguage === Language.ZH_CN || selectedLanguage === Language.ZH_TW || selectedLanguage === Language.JA ? 'md:text-[16px] text-[13px]' : 'md:text-[18.225px] text-[15px]'}`}
                    >
                      {line}
                    </span>
                  ) : (
                    <div>{line}</div>
                  )}
                </div>
              ))}
          </h3>

          {/* Boss功能示例图片 */}
          <div className="flex-1 flex items-end">
            <Image
              src="/icons/feature/sample4.png"
              alt="Boss task management feature"
              width={540}
              height={350}
              className="w-full h-auto md:shadow-2xl shadow"
              style={{
                display: 'block',
                borderRadius: '12px',
              }}
            />
          </div>
        </div>
      </div>

      {/* 卡片 5 - Goodbye Auto-Bill (重复) */}
      <div
        className={`flex-shrink-0 md:rounded-[20px] rounded-2xl md:h-[570px] h-[352px] w-[372px] md:w-[600px] transition-all duration-200 hover:scale-105 ${activeIndex === 9 ? 'scale-105' : ''}`}
        style={{
          border: '0.5px solid rgba(0, 0, 0, 0.04)',
          background: 'var(--09, #FCFAFA)',
          position: 'relative',
        }}
        onClick={() => mobileOnClick(9)}
      >
        <div className="w-full h-full flex flex-col md:p-7.5 p-4">
          <h3
            className={`md:text-[27px] text-[16px] font-bold ${t('goodbyeAutoBill').includes('\n') ? 'md:mb-7.5 mb-5' : 'md:mb-10 mb-7.5'}`}
            style={{
              color: 'var(--06, #000)',
              fontFeatureSettings: '"liga" off, "clig" off',
              fontFamily: 'Inter',
              fontStyle: 'normal',
              lineHeight: '130%',
              letterSpacing: '-0.5px',
            }}
          >
            {t('goodbyeAutoBill').includes('\n')
              ? t('goodbyeAutoBill')
                  .split('\n')
                  .map((line, index) => (
                    <div key={index}>
                      {index === 0 ? (
                        <span
                        className={`${selectedLanguage === Language.ZH_CN || selectedLanguage === Language.ZH_TW || selectedLanguage === Language.JA ? 'md:text-[16px] text-[13px]' : 'md:text-[18.225px] text-[15px]'}`}
                        >
                          {line}
                        </span>
                      ) : (
                        <div>{line}</div>
                      )}
                    </div>
                  ))
              : t('goodbyeAutoBill')}
          </h3>

          {/* 订阅管理功能示例图片 */}
          <div className="flex-1 flex items-end">
            <Image
              src="/icons/feature/sample5.png"
              alt="Subscription management feature"
              width={540}
              height={350}
              className="w-full h-auto md:shadow-2xl shadow"
              style={{
                display: 'block',
                borderRadius: '12px',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(HomeCarousel)
