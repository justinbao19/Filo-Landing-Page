'use client'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import AutoScroll from 'embla-carousel-auto-scroll'
import { useTranslations } from 'next-intl'
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from './ui/carousel'

const HomeCarousel = () => {
  const t = useTranslations('home')
  const [api, setApi] = useState<CarouselApi | null>(null)

  const toggleAutoplay = useCallback(() => {
    const autoScroll = api?.plugins()?.autoScroll
    if (!autoScroll) return

    const playOrStop = autoScroll.isPlaying() ? autoScroll.stop : autoScroll.play
    playOrStop()
  }, [api])

  const containerRef = useRef<HTMLDivElement>(null)

  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        setIsVisible(entry.isIntersecting)
      })
    })

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (!api?.plugins()?.autoScroll) return
    if (isVisible) {
      api.plugins()?.autoScroll.play()
    } else {
      api.plugins()?.autoScroll.stop()
    }
  }, [isVisible, api])

  return (
    <section ref={containerRef} className={`w-full bg-white pt-[200px] pb-32 relative z-10 overflow-hidden`}>
      <Carousel
        className="items-center flex"
        setApi={setApi}
        opts={{ loop: true }}
        plugins={[AutoScroll({ playOnInit: false, speed: 1 })]}
      >
        <CarouselContent className="-ml-10 snap-center">
          <CarouselItem className="pl-10 w-[640px] group h-[600px] flex items-center justify-center relative">
            <div
              style={{
                background: 'var(--09, #FCFAFA)',
              }}
              className="w-[600px] h-[570px] will-change-transform group-hover:scale-105 transition-transform duration-200 flex flex-col p-[30px] rounded-[20px] border-0.5 border-black/5"
              onMouseEnter={() => {
                toggleAutoplay()
              }}
              onMouseLeave={() => {
                toggleAutoplay()
              }}
            >
              <h3
                style={{
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
                {t('understandItAll')}
              </h3>

              <div className="relative">
                <img
                  src="/icons/feature/sample1_jp.png"
                  alt="Japanese email example"
                  className="absolute top-0 left-0 w-[80%] h-auto"
                  style={{
                    display: 'block',
                    borderRadius: '12px',
                  }}
                />
                <img
                  src="/icons/feature/sample1_en.png"
                  alt="English translation example"
                  className="absolute top-[100px] left-[100px] w-[80%] h-auto"
                  style={{
                    display: 'block',
                    borderRadius: '12px',
                  }}
                />
              </div>
            </div>
          </CarouselItem>

          <CarouselItem className="pl-10 w-[640px] group h-[600px] flex items-center justify-center relative">
            <div
              style={{
                background: 'var(--09, #FCFAFA)',
              }}
              className="w-[600px] h-[570px] will-change-transform group-hover:scale-105 transition-transform duration-200 flex flex-col p-[30px] rounded-[20px] border-0.5 border-black/5"
              onMouseEnter={() => {
                toggleAutoplay()
              }}
              onMouseLeave={() => {
                toggleAutoplay()
              }}
            >
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
                {t('promoCondensed')}
              </h3>

              <div className="flex-1 flex items-end">
                <img
                  src="/icons/feature/sample2.png"
                  alt="Promo email condensed feature"
                  width={540}
                  height={350}
                  style={{
                    display: 'block',
                    borderRadius: '12px',
                    boxShadow:
                      '0px 100px 80px 0px rgba(0, 0, 0, 0.01), 0px 41.778px 33.422px 0px rgba(0, 0, 0, 0.01), 0px 22.336px 17.869px 0px rgba(0, 0, 0, 0.01), 0px 12.522px 10.017px 0px rgba(0, 0, 0, 0.02), 0px 6.65px 5.32px 0px rgba(0, 0, 0, 0.02), 0px 2.767px 2.214px 0px rgba(0, 0, 0, 0.03)',
                  }}
                />
              </div>
            </div>
          </CarouselItem>

          <CarouselItem className="pl-10 w-[640px] group h-[600px] flex items-center justify-center relative">
            <div
              style={{
                background: 'var(--09, #FCFAFA)',
              }}
              className="w-[600px] h-[570px] will-change-transform group-hover:scale-105 transition-transform duration-200 flex flex-col p-[30px] rounded-[20px] border-0.5 border-black/5"
              onMouseEnter={() => {
                toggleAutoplay()
              }}
              onMouseLeave={() => {
                toggleAutoplay()
              }}
            >
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
                {t('whatDoISay')}
              </h3>

              <div className="flex-1 flex items-end">
                <img
                  src="/icons/feature/sample3.png"
                  alt="French AI reply feature"
                  width={540}
                  height={350}
                  style={{
                    display: 'block',
                    borderRadius: '12px',
                    boxShadow:
                      '0px 100px 80px 0px rgba(0, 0, 0, 0.01), 0px 41.778px 33.422px 0px rgba(0, 0, 0, 0.01), 0px 22.336px 17.869px 0px rgba(0, 0, 0, 0.01), 0px 12.522px 10.017px 0px rgba(0, 0, 0, 0.02), 0px 6.65px 5.32px 0px rgba(0, 0, 0, 0.02), 0px 2.767px 2.214px 0px rgba(0, 0, 0, 0.03)',
                  }}
                />
              </div>
            </div>
          </CarouselItem>

          <CarouselItem className="pl-10 w-[640px] group h-[600px] flex items-center justify-center relative">
            <div
              style={{
                background: 'var(--09, #FCFAFA)',
              }}
              className="w-[600px] h-[570px] will-change-transform group-hover:scale-105 transition-transform duration-200 flex flex-col p-[30px] rounded-[20px] border-0.5 border-black/5"
              onMouseEnter={() => {
                toggleAutoplay()
              }}
              onMouseLeave={() => {
                toggleAutoplay()
              }}
            >
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
                {t('bossBombDefused')}
              </h3>

              <div className="flex-1 flex items-end">
                <img
                  src="/icons/feature/sample4.png"
                  alt="Boss task management feature"
                  width={540}
                  height={350}
                  style={{
                    display: 'block',
                    borderRadius: '12px',
                    boxShadow:
                      '0px 100px 80px 0px rgba(0, 0, 0, 0.01), 0px 41.778px 33.422px 0px rgba(0, 0, 0, 0.01), 0px 22.336px 17.869px 0px rgba(0, 0, 0, 0.01), 0px 12.522px 10.017px 0px rgba(0, 0, 0, 0.02), 0px 6.65px 5.32px 0px rgba(0, 0, 0, 0.02), 0px 2.767px 2.214px 0px rgba(0, 0, 0, 0.03)',
                  }}
                />
              </div>
            </div>
          </CarouselItem>

          <CarouselItem className="pl-10 w-[640px] group h-[600px] flex items-center justify-center relative">
            <div
              style={{
                background: 'var(--09, #FCFAFA)',
              }}
              className="w-[600px] h-[570px] will-change-transform group-hover:scale-105 transition-transform duration-200 flex flex-col p-[30px] rounded-[20px] border-0.5 border-black/5"
              onMouseEnter={() => {
                toggleAutoplay()
              }}
              onMouseLeave={() => {
                toggleAutoplay()
              }}
            >
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
                {t('goodbyeAutoBill')}
              </h3>

              <div className="flex-1 flex items-end">
                <img
                  src="/icons/feature/sample5.png"
                  alt="Subscription management feature"
                  width={540}
                  height={350}
                  style={{
                    display: 'block',
                    borderRadius: '12px',
                    boxShadow:
                      '0px 100px 80px 0px rgba(0, 0, 0, 0.01), 0px 41.778px 33.422px 0px rgba(0, 0, 0, 0.01), 0px 22.336px 17.869px 0px rgba(0, 0, 0, 0.01), 0px 12.522px 10.017px 0px rgba(0, 0, 0, 0.02), 0px 6.65px 5.32px 0px rgba(0, 0, 0, 0.02), 0px 2.767px 2.214px 0px rgba(0, 0, 0, 0.03)',
                  }}
                />
              </div>
            </div>
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </section>
  )
}

export default HomeCarousel
