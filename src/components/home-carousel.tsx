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

  return (
    <div
      className={`sample-cards-scroll flex gap-[40px] ${!isSampleCardsVisible ? 'stop' : ''}`}
      style={{
        paddingLeft: '80px',
        paddingRight: '80px',
        paddingTop: '30px',
        paddingBottom: '30px',
      }}
    >
      {/* 卡片 1 - Understand It All */}
      <div
        className="flex-shrink-0 transition-all duration-200 hover:scale-105"
        style={{
          width: '600px',
          height: '570px',
          borderRadius: '20px',
          border: '0.5px solid rgba(0, 0, 0, 0.04)',
          background: 'var(--09, #FCFAFA)',
          position: 'relative',
        }}
      >
        <div className="w-full h-full flex flex-col" style={{ padding: '30px' }}>
          <h3
            style={{
              color: 'var(--06, #000)',
              fontFeatureSettings: '"liga" off, "clig" off',
              fontFamily: 'Inter',
              fontSize: '27px',
              fontStyle: 'normal',
              fontWeight: 700,
              lineHeight: '130%',
              marginBottom: t('understandItAll').includes('\n') ? '28px' : '40px',
            }}
          >
            {t('understandItAll').includes('\n')
              ? t('understandItAll')
                  .split('\n')
                  .map((line, index) => (
                    <div key={index}>
                      {index === 0 ? (
                        <span
                          style={{
                            fontSize:
                              selectedLanguage === Language.ZH_CN ||
                              selectedLanguage === Language.ZH_TW ||
                              selectedLanguage === Language.JA
                                ? '16px'
                                : '18.225px',
                          }}
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
            <div style={{ display: 'flex', gap: '16px', width: '100%' }}>
              {/* Japanese email */}
              <div style={{ flex: 1 }}>
                <Image
                  src="/icons/feature/sample1_jp.png"
                  alt="Japanese email example"
                  width={258}
                  height={350}
                  className="w-full h-auto"
                  style={{
                    display: 'block',
                    borderRadius: '12px',
                    boxShadow:
                      '0px 100px 80px 0px rgba(0, 0, 0, 0.01), 0px 41.778px 33.422px 0px rgba(0, 0, 0, 0.01), 0px 22.336px 17.869px 0px rgba(0, 0, 0, 0.01), 0px 12.522px 10.017px 0px rgba(0, 0, 0, 0.02), 0px 6.65px 5.32px 0px rgba(0, 0, 0, 0.02), 0px 2.767px 2.214px 0px rgba(0, 0, 0, 0.03)',
                  }}
                />
              </div>
              {/* English translation */}
              <div style={{ flex: 1 }}>
                <Image
                  src="/icons/feature/sample1_en.png"
                  alt="English translation example"
                  width={258}
                  height={350}
                  className="w-full h-auto"
                  style={{
                    display: 'block',
                    borderRadius: '12px',
                    boxShadow:
                      '0px 100px 80px 0px rgba(0, 0, 0, 0.01), 0px 41.778px 33.422px 0px rgba(0, 0, 0, 0.01), 0px 22.336px 17.869px 0px rgba(0, 0, 0, 0.01), 0px 12.522px 10.017px 0px rgba(0, 0, 0, 0.02), 0px 6.65px 5.32px 0px rgba(0, 0, 0, 0.02), 0px 2.767px 2.214px 0px rgba(0, 0, 0, 0.03)',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 卡片 2 - Promo, Condensed */}
      <div
        className="flex-shrink-0 transition-all duration-200 hover:scale-105"
        style={{
          width: '600px',
          height: '570px',
          borderRadius: '20px',
          border: '0.5px solid rgba(0, 0, 0, 0.04)',
          background: 'var(--09, #FCFAFA)',
          position: 'relative',
        }}
      >
        <div className="w-full h-full flex flex-col" style={{ padding: '30px' }}>
          <h3
            style={{
              alignSelf: 'stretch',
              color: 'var(--06, #000)',
              fontFeatureSettings: '"liga" off, "clig" off',
              fontFamily: 'Inter',
              fontSize: '27px',
              fontStyle: 'normal',
              fontWeight: 700,
              lineHeight: '130%',
              marginBottom: t('promoCondensed').includes('\n') ? '28px' : '40px',
            }}
          >
            {t('promoCondensed').includes('\n')
              ? t('promoCondensed')
                  .split('\n')
                  .map((line, index) => (
                    <div key={index}>
                      {index === 0 ? (
                        <span
                          style={{
                            fontSize:
                              selectedLanguage === Language.ZH_CN ||
                              selectedLanguage === Language.ZH_TW ||
                              selectedLanguage === Language.JA
                                ? '16px'
                                : '18.225px',
                          }}
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
              className="w-full h-auto"
              style={{
                display: 'block',
                borderRadius: '12px',
                boxShadow:
                  '0px 100px 80px 0px rgba(0, 0, 0, 0.01), 0px 41.778px 33.422px 0px rgba(0, 0, 0, 0.01), 0px 22.336px 17.869px 0px rgba(0, 0, 0, 0.01), 0px 12.522px 10.017px 0px rgba(0, 0, 0, 0.02), 0px 6.65px 5.32px 0px rgba(0, 0, 0, 0.02), 0px 2.767px 2.214px 0px rgba(0, 0, 0, 0.03)',
              }}
            />
          </div>
        </div>
      </div>

      {/* 卡片 3 - What do I say? */}
      <div
        className="flex-shrink-0 transition-all duration-200 hover:scale-105"
        style={{
          width: '600px',
          height: '570px',
          borderRadius: '20px',
          border: '0.5px solid rgba(0, 0, 0, 0.04)',
          background: 'var(--09, #FCFAFA)',
          position: 'relative',
        }}
      >
        <div className="w-full h-full flex flex-col" style={{ padding: '30px' }}>
          <h3
            style={{
              alignSelf: 'stretch',
              color: 'var(--06, #000)',
              fontFeatureSettings: '"liga" off, "clig" off',
              fontFamily: 'Inter',
              fontSize: '27px',
              fontStyle: 'normal',
              fontWeight: 700,
              lineHeight: '130%',
              marginBottom: t('whatDoISay').includes('\n') ? '28px' : '40px',
            }}
          >
            {t('whatDoISay').includes('\n')
              ? t('whatDoISay')
                  .split('\n')
                  .map((line, index) => (
                    <div key={index}>
                      {index === 0 ? (
                        <span
                          style={{
                            fontSize:
                              selectedLanguage === Language.ZH_CN ||
                              selectedLanguage === Language.ZH_TW ||
                              selectedLanguage === Language.JA
                                ? '16px'
                                : '18.225px',
                          }}
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
              className="w-full h-auto"
              style={{
                display: 'block',
                borderRadius: '12px',
                boxShadow:
                  '0px 100px 80px 0px rgba(0, 0, 0, 0.01), 0px 41.778px 33.422px 0px rgba(0, 0, 0, 0.01), 0px 22.336px 17.869px 0px rgba(0, 0, 0, 0.01), 0px 12.522px 10.017px 0px rgba(0, 0, 0, 0.02), 0px 6.65px 5.32px 0px rgba(0, 0, 0, 0.02), 0px 2.767px 2.214px 0px rgba(0, 0, 0, 0.03)',
              }}
            />
          </div>
        </div>
      </div>

      {/* 卡片 4 - Boss Bomb Defused */}
      <div
        className="flex-shrink-0 transition-all duration-200 hover:scale-105"
        style={{
          width: '600px',
          height: '570px',
          borderRadius: '20px',
          border: '0.5px solid rgba(0, 0, 0, 0.04)',
          background: 'var(--09, #FCFAFA)',
          position: 'relative',
        }}
      >
        <div className="w-full h-full flex flex-col" style={{ padding: '30px' }}>
          <h3
            style={{
              alignSelf: 'stretch',
              color: 'var(--06, #000)',
              fontFeatureSettings: '"liga" off, "clig" off',
              fontFamily: 'Inter',
              fontSize: '27px',
              fontStyle: 'normal',
              fontWeight: 700,
              lineHeight: '130%',
              marginBottom: t('bossBombDefused').includes('\n') ? '28px' : '40px',
            }}
          >
            {t('bossBombDefused').includes('\n')
              ? t('bossBombDefused')
                  .split('\n')
                  .map((line, index) => (
                    <div key={index}>
                      {index === 0 ? (
                        <span
                          style={{
                            fontSize:
                              selectedLanguage === Language.ZH_CN ||
                              selectedLanguage === Language.ZH_TW ||
                              selectedLanguage === Language.JA
                                ? '16px'
                                : '18.225px',
                          }}
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
              className="w-full h-auto"
              style={{
                display: 'block',
                borderRadius: '12px',
                boxShadow:
                  '0px 100px 80px 0px rgba(0, 0, 0, 0.01), 0px 41.778px 33.422px 0px rgba(0, 0, 0, 0.01), 0px 22.336px 17.869px 0px rgba(0, 0, 0, 0.01), 0px 12.522px 10.017px 0px rgba(0, 0, 0, 0.02), 0px 6.65px 5.32px 0px rgba(0, 0, 0, 0.02), 0px 2.767px 2.214px 0px rgba(0, 0, 0, 0.03)',
              }}
            />
          </div>
        </div>
      </div>

      {/* 卡片 5 - Goodbye Auto-Bill */}
      <div
        className="flex-shrink-0 transition-all duration-200 hover:scale-105"
        style={{
          width: '600px',
          height: '570px',
          borderRadius: '20px',
          border: '0.5px solid rgba(0, 0, 0, 0.04)',
          background: 'var(--09, #FCFAFA)',
          position: 'relative',
        }}
      >
        <div className="w-full h-full flex flex-col" style={{ padding: '30px' }}>
          <h3
            style={{
              alignSelf: 'stretch',
              color: 'var(--06, #000)',
              fontFeatureSettings: '"liga" off, "clig" off',
              fontFamily: 'Inter',
              fontSize: '27px',
              fontStyle: 'normal',
              fontWeight: 700,
              lineHeight: '130%',
              marginBottom: t('goodbyeAutoBill').includes('\n') ? '28px' : '40px',
            }}
          >
            {t('goodbyeAutoBill').includes('\n')
              ? t('goodbyeAutoBill')
                  .split('\n')
                  .map((line, index) => (
                    <div key={index}>
                      {index === 0 ? (
                        <span
                          style={{
                            fontSize:
                              selectedLanguage === Language.ZH_CN ||
                              selectedLanguage === Language.ZH_TW ||
                              selectedLanguage === Language.JA
                                ? '16px'
                                : '18.225px',
                          }}
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
              className="w-full h-auto"
              style={{
                display: 'block',
                borderRadius: '12px',
                boxShadow:
                  '0px 100px 80px 0px rgba(0, 0, 0, 0.01), 0px 41.778px 33.422px 0px rgba(0, 0, 0, 0.01), 0px 22.336px 17.869px 0px rgba(0, 0, 0, 0.01), 0px 12.522px 10.017px 0px rgba(0, 0, 0, 0.02), 0px 6.65px 5.32px 0px rgba(0, 0, 0, 0.02), 0px 2.767px 2.214px 0px rgba(0, 0, 0, 0.03)',
              }}
            />
          </div>
        </div>
      </div>

      {/* 重复卡片以实现无缝循环 */}
      {/* 卡片 1 - Understand It All (重复) */}
      <div
        className="flex-shrink-0 transition-all duration-200 hover:scale-105"
        style={{
          width: '600px',
          height: '570px',
          borderRadius: '20px',
          border: '0.5px solid rgba(0, 0, 0, 0.04)',
          background: 'var(--09, #FCFAFA)',
          position: 'relative',
        }}
      >
        <div className="w-full h-full flex flex-col" style={{ padding: '30px' }}>
          <h3
            style={{
              color: 'var(--06, #000)',
              fontFeatureSettings: '"liga" off, "clig" off',
              fontFamily: 'Inter',
              fontSize: '27px',
              fontStyle: 'normal',
              fontWeight: 700,
              lineHeight: '130%',
              marginBottom: t('understandItAll').includes('\n') ? '28px' : '40px',
            }}
          >
            {t('understandItAll').includes('\n')
              ? t('understandItAll')
                  .split('\n')
                  .map((line, index) => (
                    <div key={index}>
                      {index === 0 ? (
                        <span
                          style={{
                            fontSize:
                              selectedLanguage === Language.ZH_CN ||
                              selectedLanguage === Language.ZH_TW ||
                              selectedLanguage === Language.JA
                                ? '16px'
                                : '18.225px',
                          }}
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
            <div style={{ display: 'flex', gap: '16px', width: '100%' }}>
              {/* Japanese email */}
              <div style={{ flex: 1 }}>
                <Image
                  src="/icons/feature/sample1_jp.png"
                  alt="Japanese email example"
                  width={258}
                  height={350}
                  className="w-full h-auto"
                  style={{
                    display: 'block',
                    borderRadius: '12px',
                    boxShadow:
                      '0px 100px 80px 0px rgba(0, 0, 0, 0.01), 0px 41.778px 33.422px 0px rgba(0, 0, 0, 0.01), 0px 22.336px 17.869px 0px rgba(0, 0, 0, 0.01), 0px 12.522px 10.017px 0px rgba(0, 0, 0, 0.02), 0px 6.65px 5.32px 0px rgba(0, 0, 0, 0.02), 0px 2.767px 2.214px 0px rgba(0, 0, 0, 0.03)',
                  }}
                />
              </div>
              {/* English translation */}
              <div style={{ flex: 1 }}>
                <Image
                  src="/icons/feature/sample1_en.png"
                  alt="English translation example"
                  width={258}
                  height={350}
                  className="w-full h-auto"
                  style={{
                    display: 'block',
                    borderRadius: '12px',
                    boxShadow:
                      '0px 100px 80px 0px rgba(0, 0, 0, 0.01), 0px 41.778px 33.422px 0px rgba(0, 0, 0, 0.01), 0px 22.336px 17.869px 0px rgba(0, 0, 0, 0.01), 0px 12.522px 10.017px 0px rgba(0, 0, 0, 0.02), 0px 6.65px 5.32px 0px rgba(0, 0, 0, 0.02), 0px 2.767px 2.214px 0px rgba(0, 0, 0, 0.03)',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 卡片 2 - Promo, Condensed (重复) */}
      <div
        className="flex-shrink-0 transition-all duration-200 hover:scale-105"
        style={{
          width: '600px',
          height: '570px',
          borderRadius: '20px',
          border: '0.5px solid rgba(0, 0, 0, 0.04)',
          background: 'var(--09, #FCFAFA)',
          position: 'relative',
        }}
      >
        <div className="w-full h-full flex flex-col" style={{ padding: '30px' }}>
          <h3
            style={{
              alignSelf: 'stretch',
              color: 'var(--06, #000)',
              fontFeatureSettings: '"liga" off, "clig" off',
              fontFamily: 'Inter',
              fontSize: '27px',
              fontStyle: 'normal',
              fontWeight: 700,
              lineHeight: '130%',
              marginBottom: t('promoCondensed').includes('\n') ? '28px' : '40px',
            }}
          >
            {t('promoCondensed').includes('\n')
              ? t('promoCondensed')
                  .split('\n')
                  .map((line, index) => (
                    <div key={index}>
                      {index === 0 ? (
                        <span
                          style={{
                            fontSize:
                              selectedLanguage === Language.ZH_CN ||
                              selectedLanguage === Language.ZH_TW ||
                              selectedLanguage === Language.JA
                                ? '16px'
                                : '18.225px',
                          }}
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
              className="w-full h-auto"
              style={{
                display: 'block',
                borderRadius: '12px',
                boxShadow:
                  '0px 100px 80px 0px rgba(0, 0, 0, 0.01), 0px 41.778px 33.422px 0px rgba(0, 0, 0, 0.01), 0px 22.336px 17.869px 0px rgba(0, 0, 0, 0.01), 0px 12.522px 10.017px 0px rgba(0, 0, 0, 0.02), 0px 6.65px 5.32px 0px rgba(0, 0, 0, 0.02), 0px 2.767px 2.214px 0px rgba(0, 0, 0, 0.03)',
              }}
            />
          </div>
        </div>
      </div>

      {/* 卡片 3 - What do I say? (重复) */}
      <div
        className="flex-shrink-0 transition-all duration-200 hover:scale-105"
        style={{
          width: '600px',
          height: '570px',
          borderRadius: '20px',
          border: '0.5px solid rgba(0, 0, 0, 0.04)',
          background: 'var(--09, #FCFAFA)',
          position: 'relative',
        }}
      >
        <div className="w-full h-full flex flex-col" style={{ padding: '30px' }}>
          <h3
            style={{
              alignSelf: 'stretch',
              color: 'var(--06, #000)',
              fontFeatureSettings: '"liga" off, "clig" off',
              fontFamily: 'Inter',
              fontSize: '27px',
              fontStyle: 'normal',
              fontWeight: 700,
              lineHeight: '130%',
              marginBottom: t('whatDoISay').includes('\n') ? '28px' : '40px',
            }}
          >
            {t('whatDoISay').includes('\n')
              ? t('whatDoISay')
                  .split('\n')
                  .map((line, index) => (
                    <div key={index}>
                      {index === 0 ? (
                        <span
                          style={{
                            fontSize:
                              selectedLanguage === Language.ZH_CN ||
                              selectedLanguage === Language.ZH_TW ||
                              selectedLanguage === Language.JA
                                ? '16px'
                                : '18.225px',
                          }}
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
              className="w-full h-auto"
              style={{
                display: 'block',
                borderRadius: '12px',
                boxShadow:
                  '0px 100px 80px 0px rgba(0, 0, 0, 0.01), 0px 41.778px 33.422px 0px rgba(0, 0, 0, 0.01), 0px 22.336px 17.869px 0px rgba(0, 0, 0, 0.01), 0px 12.522px 10.017px 0px rgba(0, 0, 0, 0.02), 0px 6.65px 5.32px 0px rgba(0, 0, 0, 0.02), 0px 2.767px 2.214px 0px rgba(0, 0, 0, 0.03)',
              }}
            />
          </div>
        </div>
      </div>

      {/* 卡片 4 - Boss Bomb Defused (重复) */}
      <div
        className="flex-shrink-0 transition-all duration-200 hover:scale-105"
        style={{
          width: '600px',
          height: '570px',
          borderRadius: '20px',
          border: '0.5px solid rgba(0, 0, 0, 0.04)',
          background: 'var(--09, #FCFAFA)',
          position: 'relative',
        }}
      >
        <div className="w-full h-full flex flex-col" style={{ padding: '30px' }}>
          <h3
            style={{
              alignSelf: 'stretch',
              color: 'var(--06, #000)',
              fontFeatureSettings: '"liga" off, "clig" off',
              fontFamily: 'Inter',
              fontSize: '27px',
              fontStyle: 'normal',
              fontWeight: 700,
              lineHeight: '130%',
              marginBottom: '40px',
            }}
          >
            {t('bossBombDefused')
              .split('\n')
              .map((line, index) => (
                <div key={index}>
                  {index === 0 ? (
                    <span
                      style={{
                        fontSize:
                          selectedLanguage === Language.ZH_CN ||
                          selectedLanguage === Language.ZH_TW ||
                          selectedLanguage === Language.JA
                            ? '16px'
                            : '18.225px',
                      }}
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
              className="w-full h-auto"
              style={{
                display: 'block',
                borderRadius: '12px',
                boxShadow:
                  '0px 100px 80px 0px rgba(0, 0, 0, 0.01), 0px 41.778px 33.422px 0px rgba(0, 0, 0, 0.01), 0px 22.336px 17.869px 0px rgba(0, 0, 0, 0.01), 0px 12.522px 10.017px 0px rgba(0, 0, 0, 0.02), 0px 6.65px 5.32px 0px rgba(0, 0, 0, 0.02), 0px 2.767px 2.214px 0px rgba(0, 0, 0, 0.03)',
              }}
            />
          </div>
        </div>
      </div>

      {/* 卡片 5 - Goodbye Auto-Bill (重复) */}
      <div
        className="flex-shrink-0 transition-all duration-200 hover:scale-105"
        style={{
          width: '600px',
          height: '570px',
          borderRadius: '20px',
          border: '0.5px solid rgba(0, 0, 0, 0.04)',
          background: 'var(--09, #FCFAFA)',
          position: 'relative',
        }}
      >
        <div className="w-full h-full flex flex-col" style={{ padding: '30px' }}>
          <h3
            style={{
              alignSelf: 'stretch',
              color: 'var(--06, #000)',
              fontFeatureSettings: '"liga" off, "clig" off',
              fontFamily: 'Inter',
              fontSize: '27px',
              fontStyle: 'normal',
              fontWeight: 700,
              lineHeight: '130%',
              marginBottom: t('goodbyeAutoBill').includes('\n') ? '28px' : '40px',
            }}
          >
            {t('goodbyeAutoBill').includes('\n')
              ? t('goodbyeAutoBill')
                  .split('\n')
                  .map((line, index) => (
                    <div key={index}>
                      {index === 0 ? (
                        <span
                          style={{
                            fontSize:
                              selectedLanguage === Language.ZH_CN ||
                              selectedLanguage === Language.ZH_TW ||
                              selectedLanguage === Language.JA
                                ? '16px'
                                : '18.225px',
                          }}
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
              className="w-full h-auto"
              style={{
                display: 'block',
                borderRadius: '12px',
                boxShadow:
                  '0px 100px 80px 0px rgba(0, 0, 0, 0.01), 0px 41.778px 33.422px 0px rgba(0, 0, 0, 0.01), 0px 22.336px 17.869px 0px rgba(0, 0, 0, 0.01), 0px 12.522px 10.017px 0px rgba(0, 0, 0, 0.02), 0px 6.65px 5.32px 0px rgba(0, 0, 0, 0.02), 0px 2.767px 2.214px 0px rgba(0, 0, 0, 0.03)',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(HomeCarousel)
