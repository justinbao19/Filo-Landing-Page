import { Language } from '@/lib/locale'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { memo, useCallback, useState } from 'react'

const HomeFloat = ({ selectedLanguage }: { selectedLanguage: Language }) => {
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
      style={{
        display: 'flex',
        width: '1440px',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '120px',
      }}
    >
      {/* 主标题 */}
      <h1
        style={{
          color: 'var(--06, #000)',
          textAlign: 'center',
          fontFeatureSettings: '"liga" off, "clig" off',
          fontFamily: 'Inter',
          fontSize:
            selectedLanguage === Language.ZH_CN ||
            selectedLanguage === Language.ZH_TW ||
            selectedLanguage === Language.JA
              ? '60px'
              : selectedLanguage === Language.ES
                ? '70px'
                : '80px',
          fontStyle: 'normal',
          fontWeight: 700,
          lineHeight: '120%',
          letterSpacing: '-3px',
          alignSelf: 'stretch',
          margin: 0,
        }}
      >
        {t('emailInTaskOut')}
      </h1>

      {/* 内容区域 */}
      <div
        style={{
          display: 'flex',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'space-between',
          maxWidth: '1200px',
        }}
      >
        {/* 左侧文字 */}
        <div style={{ flex: '0 0 auto', width: '224px' }}>
          <h2
            style={{
              color: 'var(--06, #000)',
              textAlign: 'center',
              fontFeatureSettings: '"liga" off, "clig" off',
              fontFamily: 'Georgia',
              fontSize: '40px',
              fontStyle: 'normal',
              fontWeight: 400,
              lineHeight: '120%',
              margin: 0,
              marginBottom: '32px',
            }}
          >
            {t('neverMissATask')}
          </h2>

          <p
            style={{
              color: 'var(--07, #707070)',
              textAlign: 'center',
              fontFeatureSettings: '"liga" off, "clig" off',
              fontFamily: 'Inter',
              fontSize: '20px',
              fontStyle: 'normal',
              fontWeight: 500,
              lineHeight: '150%',
              alignSelf: 'stretch',
              margin: 0,
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
              className="w-auto h-auto"
              style={{
                borderRadius: '20.27px',
                borderLeft: '0.338px solid var(--14, rgba(0, 0, 0, 0.04))',
                background: 'var(--10, #FFF)',
                boxShadow:
                  '0px 67.568px 54.054px 0px rgba(0, 0, 0, 0.07), 0px 28.228px 22.582px 0px rgba(0, 0, 0, 0.05), 0px 15.092px 12.074px 0px rgba(0, 0, 0, 0.04), 0px 8.461px 6.768px 0px rgba(0, 0, 0, 0.04), 0px 4.493px 3.595px 0px rgba(0, 0, 0, 0.03), 0px 1.87px 1.496px 0px rgba(0, 0, 0, 0.02)',
              }}
            />

            {/* 弹窗 1 - Review (右上角) */}
            <div
              className={`absolute float-animation transition-transform duration-300 hover:scale-110 ${isAnyPopupHovered ? 'paused' : ''}`}
              style={{
                top: '180px',
                right: '-210px',
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
              />
            </div>

            {/* 弹窗 2 - Reservation (左侧中部) */}
            <div
              className={`absolute float-animation transition-transform duration-300 hover:scale-110 ${isAnyPopupHovered ? 'paused' : ''}`}
              style={{
                top: '325px',
                left: '-170px',
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
              />
            </div>

            {/* 弹窗 3 - Confirm (右侧中下部) */}
            <div
              className={`absolute float-animation transition-transform duration-300 hover:scale-110 ${isAnyPopupHovered ? 'paused' : ''}`}
              style={{
                top: '435px',
                right: '-120px',
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
              />
            </div>

            {/* 弹窗 4 - RSVP Cancel (底部中央) */}
            <div
              className={`absolute float-animation transition-transform duration-300 hover:scale-110 ${isAnyPopupHovered ? 'paused' : ''}`}
              style={{
                top: '610px',
                left: '-70px',
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
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(HomeFloat)
