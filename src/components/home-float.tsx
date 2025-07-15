'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { memo, useCallback, useState } from 'react'

const HomeFloat = () => {
  const t = useTranslations('home')

  // Email Task 弹窗悬停状态
  const [isAnyPopupHovered, setIsAnyPopupHovered] = useState(false)
  // 处理弹窗悬停
  const handlePopupMouseEnter = useCallback(() => {
    setIsAnyPopupHovered(true)
  }, [])

  const handlePopupMouseLeave = useCallback(() => {
    setIsAnyPopupHovered(false)
  }, [])
  return (
    <div
      className="md:w-[1440px] w-full mx-auto flex flex-col items-center md:gap-30 gap-10"
    >
      {/* 主标题 */}
      <h1
        className="md:text-[70px] text-[54px] font-bold w-full md:flex-row flex-col flex items-center justify-center"
        style={{
          color: 'var(--06, #000)',
          textAlign: 'center',
          fontFeatureSettings: '"liga" off, "clig" off',
          fontFamily: 'Inter',
          fontStyle: 'normal',
          fontWeight: 700,
          lineHeight: '120%',
          letterSpacing: '-3px',
          alignSelf: 'stretch',
          margin: 0,
        }}
      >
        <p>{t('emailInTaskOut1')}</p>
        <p>{t('emailInTaskOut2')}</p>
      </h1>

      {/* 内容区域 */}
      <div
      className="w-full flex items-center md:justify-between md:max-w-[1200px] mx-auto flex-col md:flex-row gap-10"
        
      >
        {/* 左侧文字 */}
        <div className="w-[224px] flex gap-5 flex-col">
          <p
            className="md:text-[40px] text-[36px] font-normal text-center block "
            style={{
              color: 'var(--06, #000)',
              fontFeatureSettings: '"liga" off, "clig" off',
              fontFamily: 'Georgia',
              lineHeight: '120%',
              margin: 0,
            }}
          >
            {t('neverMissATask')}
          </p>

          <p
            className="md:text-[20px] text-[16px] font-normal text-center block"
            style={{
              color: 'var(--07, #707070)',
              fontFeatureSettings: '"liga" off, "clig" off',
              fontFamily: 'Inter',
              fontStyle: 'normal',
              lineHeight: '150%',
              alignSelf: 'stretch',
              width: '100%',
            }}
          >
            {t('neverMissATaskDescription')}
          </p>
        </div>

        {/* 右侧邮件交互区域 */}
        <div
          style={{
            flex: '1',
            display: 'flex',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          {/* 邮件底图 */}
          <div style={{ position: 'relative' }}>
            <Image
              src="/icons/feature/feature_todo_email.png"
              alt="Email interface"
              width={343}
              height={692}
              className="h-auto md:shadow-2xl shadow md:w-auto w-[180px] px-3"
              style={{
                borderRadius: '20.27px',
                background: 'var(--10, #FFF)',
              }}
            />

            {/* 弹窗 1 - Review (右上角) */}
            <div
              className={`absolute md:top-[180px] top-[50px] md:-right-[210px] -right-[100px] float-animation transition-transform duration-300 hover:scale-110 ${isAnyPopupHovered ? 'paused' : ''}`}
              style={{
                animationDelay: '0.5s',
              }}
              onMouseEnter={handlePopupMouseEnter}
              onMouseLeave={handlePopupMouseLeave}
            >
              <Image
                src="/icons/feature/feature_todo_popup1_review.svg"
                alt="Review popup"
                width={297}
                height={78}
                className="md:w-[297px] w-[150px]"
              />
            </div>

            {/* 弹窗 2 - Reservation (左侧中部) */}
            <div
              className={`absolute float-animation md:top-[325px] top-[100px] md:-left-[170px] -left-[100px] transition-transform duration-300 hover:scale-110 ${isAnyPopupHovered ? 'paused' : ''}`}
              style={{
                animationDelay: '1s',
              }}
              onMouseEnter={handlePopupMouseEnter}
              onMouseLeave={handlePopupMouseLeave}
            >
              <Image
                src="/icons/feature/feature_todo_popup2_reservation.svg"
                alt="Reservation popup"
                width={202}
                height={78}
                className="md:w-[202px] w-[140px]"
              />
            </div>

            {/* 弹窗 3 - Confirm (右侧中下部) */}
            <div
              className={`absolute float-animation md:top-[435px] top-[150px] md:-right-[120px] -right-[100px] transition-transform duration-300 hover:scale-110 ${isAnyPopupHovered ? 'paused' : ''}`}
              style={{
                animationDelay: '1.5s',
              }}
              onMouseEnter={handlePopupMouseEnter}
              onMouseLeave={handlePopupMouseLeave}
            >
              <Image
                src="/icons/feature/feature_todo_popup3_confirm.svg"
                alt="Confirm popup"
                width={252}
                height={58}
                className="md:w-[252px] w-[150px]"
              />
            </div>

            {/* 弹窗 4 - RSVP Cancel (底部中央) */}
            <div
              className={`absolute float-animation md:top-[610px] top-[250px] md:-left-[70px] -left-[100px] transition-transform duration-300 hover:scale-110 ${isAnyPopupHovered ? 'paused' : ''}`}
              style={{
                animationDelay: '2s',
              }}
              onMouseEnter={handlePopupMouseEnter}
              onMouseLeave={handlePopupMouseLeave}
            >
              <Image
                src="/icons/feature/feature_todo_popup4_RSVP_cancel.svg"
                alt="RSVP Cancel popup"
                width={236}
                height={78}
                className="md:w-[236px] w-[150px]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(HomeFloat)
