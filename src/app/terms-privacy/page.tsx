'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

export default function TermsPrivacyPage() {
  const searchParams = useSearchParams()
  const [activeSection, setActiveSection] = useState<'terms' | 'privacy' | 'data'>('terms')
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState('English')
  const languageTimeoutRef = React.useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const section = searchParams.get('section')
    if (section === 'data' || section === 'data-protection') {
      setActiveSection('data')
    } else if (section === 'privacy') {
      setActiveSection('privacy')
    } else {
      setActiveSection('terms')
    }
  }, [searchParams])

  // 处理语言下拉菜单鼠标进入
  const handleLanguageMouseEnter = () => {
    if (languageTimeoutRef.current) {
      clearTimeout(languageTimeoutRef.current)
      languageTimeoutRef.current = null
    }
    setIsLanguageDropdownOpen(true)
  }

  // 处理语言下拉菜单鼠标离开
  const handleLanguageMouseLeave = () => {
    languageTimeoutRef.current = setTimeout(() => {
      setIsLanguageDropdownOpen(false)
    }, 100)
  }

  // 处理语言选择
  const handleLanguageSelect = (language: string) => {
    setSelectedLanguage(language)
    setIsLanguageDropdownOpen(false)
  }

  const renderContent = () => {
    switch (activeSection) {
      case 'terms':
        return (
          <div>
            <h1
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '48px',
                fontWeight: 700,
                lineHeight: '1.2',
                marginBottom: '12px',
                color: '#000',
              }}
            >
              Terms of Service
            </h1>

            <div style={{ marginBottom: '48px' }}>
              <p
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '16px',
                  fontWeight: 500,
                  color: '#666',
                  margin: 0,
                }}
              >
                <strong>Effective Date:</strong> January 10, 2025
              </p>
              <p
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '16px',
                  fontWeight: 500,
                  color: '#666',
                  margin: 0,
                }}
              >
                <strong>Last Updated:</strong> January 10, 2025
              </p>
            </div>

            <p
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '18px',
                fontWeight: 400,
                lineHeight: '1.6',
                color: '#333',
                marginBottom: '48px',
              }}
            >
              Welcome to Filo Mail! By using our services, you agree to the following Terms of
              Service ("Terms"). Please read them carefully. If you do not agree to these Terms,
              please refrain from using our services.
            </p>

            <div style={{ marginBottom: '40px' }}>
              <h2
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '24px',
                  fontWeight: 600,
                  lineHeight: '1.3',
                  marginBottom: '16px',
                  color: '#000',
                }}
              >
                1. Acceptance of Terms
              </h2>

              <p
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '16px',
                  fontWeight: 400,
                  lineHeight: '1.6',
                  color: '#333',
                  margin: 0,
                }}
              >
                By accessing or using Filo Mail ("Service"), you agree to be bound by these Terms
                and our Privacy Policy. If you are using the Service on behalf of an organization,
                you represent that you have the authority to bind that organization to these Terms.
              </p>
            </div>

            <div style={{ marginBottom: '40px' }}>
              <h2
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '24px',
                  fontWeight: 600,
                  lineHeight: '1.3',
                  marginBottom: '16px',
                  color: '#000',
                }}
              >
                2. Description of Service
              </h2>

              <p
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '16px',
                  fontWeight: 400,
                  lineHeight: '1.6',
                  color: '#333',
                  marginBottom: '16px',
                }}
              >
                Filo Mail provides an AI-powered email management platform that helps users
                organize, prioritize, and interact with their emails. Our features include, but are
                not limited to:
              </p>

              <ul
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '16px',
                  fontWeight: 400,
                  lineHeight: '1.6',
                  color: '#333',
                  paddingLeft: '24px',
                  margin: 0,
                }}
              >
                <li style={{ marginBottom: '8px' }}>Email categorization</li>
                <li style={{ marginBottom: '8px' }}>AI-assisted email writing</li>
                <li style={{ marginBottom: '8px' }}>Voice-to-email drafting</li>
                <li style={{ marginBottom: '8px' }}>Email summarization</li>
                <li style={{ marginBottom: '8px' }}>Smart push notifications</li>
              </ul>
            </div>

            <div style={{ marginBottom: '40px' }}>
              <h2
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '24px',
                  fontWeight: 600,
                  lineHeight: '1.3',
                  marginBottom: '16px',
                  color: '#000',
                }}
              >
                3. User Accounts
              </h2>

              <p
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '16px',
                  fontWeight: 400,
                  lineHeight: '1.6',
                  color: '#333',
                  marginBottom: '16px',
                }}
              >
                To use our Service, you may need to create an account. By creating an account, you
                agree to:
              </p>

              <ul
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '16px',
                  fontWeight: 400,
                  lineHeight: '1.6',
                  color: '#333',
                  paddingLeft: '24px',
                  marginBottom: '16px',
                }}
              >
                <li style={{ marginBottom: '8px' }}>Provide accurate and complete information.</li>
                <li style={{ marginBottom: '8px' }}>
                  Maintain the security of your account credentials.
                </li>
                <li style={{ marginBottom: '8px' }}>
                  Notify us immediately of any unauthorized access or use of your account.
                </li>
              </ul>

              <p
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '16px',
                  fontWeight: 400,
                  lineHeight: '1.6',
                  color: '#333',
                  margin: 0,
                }}
              >
                We reserve the right to suspend or terminate accounts for violations of these Terms.
              </p>
            </div>

            <div style={{ marginBottom: '40px' }}>
              <h2
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '24px',
                  fontWeight: 600,
                  lineHeight: '1.3',
                  marginBottom: '16px',
                  color: '#000',
                }}
              >
                4. Use of the Service
              </h2>

              <p
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '16px',
                  fontWeight: 400,
                  lineHeight: '1.6',
                  color: '#333',
                  marginBottom: '16px',
                }}
              >
                You agree to use the Service only for lawful purposes and in compliance with all
                applicable laws and regulations. You must not:
              </p>

              <ul
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '16px',
                  fontWeight: 400,
                  lineHeight: '1.6',
                  color: '#333',
                  paddingLeft: '24px',
                  margin: 0,
                }}
              >
                <li style={{ marginBottom: '8px' }}>
                  Use the Service to send spam, phishing emails, or other harmful content.
                </li>
                <li style={{ marginBottom: '8px' }}>
                  Interfere with or disrupt the integrity or performance of the Service.
                </li>
                <li style={{ marginBottom: '8px' }}>
                  Reverse-engineer, modify, or attempt to gain unauthorized access to our software.
                </li>
              </ul>
            </div>

            <div style={{ marginBottom: '40px' }}>
              <h2
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '24px',
                  fontWeight: 600,
                  lineHeight: '1.3',
                  marginBottom: '16px',
                  color: '#000',
                }}
              >
                12. Contact Us
              </h2>

              <p
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '16px',
                  fontWeight: 400,
                  lineHeight: '1.6',
                  color: '#333',
                  marginBottom: '16px',
                }}
              >
                If you have any questions or concerns about these Terms, please contact us at:
              </p>

              <p
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '16px',
                  fontWeight: 500,
                  lineHeight: '1.6',
                  color: '#22A0FB',
                  margin: 0,
                }}
              >
                Email: support@filomail.com
              </p>
            </div>
          </div>
        )

      case 'privacy':
        return (
          <div>
            <h1
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '48px',
                fontWeight: 700,
                lineHeight: '1.2',
                marginBottom: '12px',
                color: '#000',
              }}
            >
              Privacy Policy
            </h1>

            <div style={{ marginBottom: '48px' }}>
              <p
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '16px',
                  fontWeight: 500,
                  color: '#666',
                  margin: 0,
                }}
              >
                <strong>Effective Date:</strong> January 10, 2025
              </p>
              <p
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '16px',
                  fontWeight: 500,
                  color: '#666',
                  margin: 0,
                }}
              >
                <strong>Last Updated:</strong> January 10, 2025
              </p>
            </div>

            <p
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '18px',
                fontWeight: 400,
                lineHeight: '1.6',
                color: '#333',
                marginBottom: '48px',
              }}
            >
              Filo Mail ("we," "our," or "us") is committed to protecting your privacy. This Privacy
              Policy explains how we collect, use, and safeguard your information when you use our
              services. By using Filo Mail, you agree to the practices described in this policy. If
              you do not agree, please refrain from using our services.
            </p>

            <div style={{ marginBottom: '40px' }}>
              <h2
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '24px',
                  fontWeight: 600,
                  lineHeight: '1.3',
                  marginBottom: '16px',
                  color: '#000',
                }}
              >
                1. Information We Collect
              </h2>

              <p
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '16px',
                  fontWeight: 400,
                  lineHeight: '1.6',
                  color: '#333',
                  marginBottom: '16px',
                }}
              >
                We collect minimal information necessary to provide and improve our services. This
                includes:
              </p>

              <h3
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '18px',
                  fontWeight: 600,
                  lineHeight: '1.4',
                  marginBottom: '8px',
                  color: '#000',
                }}
              >
                Account Information
              </h3>

              <ul
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '16px',
                  fontWeight: 400,
                  lineHeight: '1.6',
                  color: '#333',
                  paddingLeft: '24px',
                  marginBottom: '24px',
                }}
              >
                <li style={{ marginBottom: '8px' }}>
                  Name, email address, and password (hashed for security).
                </li>
                <li style={{ marginBottom: '8px' }}>
                  Optional profile details you choose to provide.
                </li>
              </ul>

              <h3
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '18px',
                  fontWeight: 600,
                  lineHeight: '1.4',
                  marginBottom: '8px',
                  color: '#000',
                }}
              >
                Email Metadata
              </h3>

              <ul
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '16px',
                  fontWeight: 400,
                  lineHeight: '1.6',
                  color: '#333',
                  paddingLeft: '24px',
                  margin: 0,
                }}
              >
                <li style={{ marginBottom: '8px' }}>
                  Sender, recipient, timestamp, and subject line of emails (only as required for
                  functionality such as categorization and prioritization).
                </li>
                <li style={{ marginBottom: '8px' }}>
                  <strong>We do not store or access the main content of your emails.</strong>
                </li>
              </ul>
            </div>

            <div style={{ marginBottom: '40px' }}>
              <h2
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '24px',
                  fontWeight: 600,
                  lineHeight: '1.3',
                  marginBottom: '16px',
                  color: '#000',
                }}
              >
                2. How We Use Your Information
              </h2>

              <p
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '16px',
                  fontWeight: 400,
                  lineHeight: '1.6',
                  color: '#333',
                  marginBottom: '16px',
                }}
              >
                We use your information solely to provide, maintain, and improve our services.
                Specifically:
              </p>

              <ul
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '16px',
                  fontWeight: 400,
                  lineHeight: '1.6',
                  color: '#333',
                  paddingLeft: '24px',
                  marginBottom: '16px',
                }}
              >
                <li style={{ marginBottom: '8px' }}>
                  AI Assistance: Analyze email metadata and temporary email content for features
                  like categorization, summarization, and prioritization.
                </li>
                <li style={{ marginBottom: '8px' }}>
                  Push Notifications: Notify you of high-priority or time-sensitive emails.
                </li>
                <li style={{ marginBottom: '8px' }}>
                  Voice-to-Email Drafting: Convert dictated text into emails using AI.
                </li>
                <li style={{ marginBottom: '8px' }}>
                  Customer Support: Address your inquiries or troubleshoot issues.
                </li>
              </ul>

              <p
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '16px',
                  fontWeight: 600,
                  lineHeight: '1.6',
                  color: '#333',
                  margin: 0,
                }}
              >
                We do not store the primary content of your emails permanently and do not use your
                data to train AI models.
              </p>
            </div>

            <div style={{ marginBottom: '40px' }}>
              <h2
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '24px',
                  fontWeight: 600,
                  lineHeight: '1.3',
                  marginBottom: '16px',
                  color: '#000',
                }}
              >
                10. Contact Us
              </h2>

              <p
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '16px',
                  fontWeight: 400,
                  lineHeight: '1.6',
                  color: '#333',
                  marginBottom: '16px',
                }}
              >
                If you have any questions or concerns about this Privacy Policy, please contact us
                at:
              </p>

              <p
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '16px',
                  fontWeight: 500,
                  lineHeight: '1.6',
                  color: '#22A0FB',
                  margin: 0,
                }}
              >
                Email: support@filomail.com
              </p>
            </div>
          </div>
        )

      case 'data':
        return (
          <div>
            <h1
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '48px',
                fontWeight: 700,
                lineHeight: '1.2',
                marginBottom: '48px',
                color: '#000',
              }}
            >
              Data Protection
            </h1>

            <div style={{ marginBottom: '40px' }}>
              <p
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '16px',
                  fontWeight: 400,
                  lineHeight: '1.6',
                  color: '#333',
                  marginBottom: '16px',
                }}
              >
                At <strong>Filo</strong>, security is baked in from the first line of code. Every
                feature — AI summaries, smart triage, and more — rests on a framework that treats
                confidentiality, integrity, and uptime as non‑negotiable. Our engineers, seasoned in
                cloud security and applied AI, employ modern encryption, segmented cloud
                architecture, and routine security testing to shield your email, attachments, and
                account data.
              </p>

              <p
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '16px',
                  fontWeight: 400,
                  lineHeight: '1.6',
                  color: '#333',
                  margin: 0,
                }}
              >
                Independent reviews such as{' '}
                <strong>Google's annual Cloud Application Security Assessment (CASA)</strong>{' '}
                confirm these safeguards. And if you ever decide to leave, Filo's one‑tap delete
                instantly and irreversibly removes all of your data — no waiting period, no
                leftovers.
              </p>
            </div>

            <div style={{ marginBottom: '40px' }}>
              <h2
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '24px',
                  fontWeight: 600,
                  lineHeight: '1.3',
                  marginBottom: '16px',
                  color: '#000',
                }}
              >
                Data secured in AWS
              </h2>

              <p
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '16px',
                  fontWeight: 400,
                  lineHeight: '1.6',
                  color: '#333',
                  marginBottom: '16px',
                }}
              >
                All production data resides in Amazon Web Services' (AWS) ISO‑, PCI‑, and
                SOC‑certified data centers.
              </p>

              <ul
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '16px',
                  fontWeight: 400,
                  lineHeight: '1.6',
                  color: '#333',
                  paddingLeft: '24px',
                  marginBottom: '16px',
                }}
              >
                <li style={{ marginBottom: '8px' }}>
                  At rest: encrypted with AES‑256 keys managed by AWS KMS
                </li>
                <li style={{ marginBottom: '8px' }}>In transit: encrypted with TLS 1.2 or newer</li>
              </ul>

              <p
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '16px',
                  fontWeight: 400,
                  lineHeight: '1.6',
                  color: '#333',
                  margin: 0,
                }}
              >
                We follow a strict "defence‑in‑depth" strategy, combining network segmentation,
                service isolation, and fine‑grained IAM roles to eliminate single points of failure.
              </p>
            </div>

            <div style={{ marginBottom: '40px' }}>
              <h2
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '24px',
                  fontWeight: 600,
                  lineHeight: '1.3',
                  marginBottom: '16px',
                  color: '#000',
                }}
              >
                Google‑verified, annually audited
              </h2>

              <p
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '16px',
                  fontWeight: 400,
                  lineHeight: '1.6',
                  color: '#333',
                  margin: 0,
                }}
              >
                Filo passes Google's <strong>Cloud Application Security Assessment (CASA)</strong>{' '}
                <strong>Tier 3</strong>—the required third‑party audit for any app requesting
                restricted Gmail scopes. We also comply fully with Google's{' '}
                <strong>API Services User Data Policy</strong> and remain approved in the Google
                Workspace Marketplace.
              </p>
            </div>

            <div style={{ marginBottom: '40px' }}>
              <h2
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '24px',
                  fontWeight: 600,
                  lineHeight: '1.3',
                  marginBottom: '16px',
                  color: '#000',
                }}
              >
                Delete your data anytime
              </h2>

              <p
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '16px',
                  fontWeight: 400,
                  lineHeight: '1.6',
                  color: '#333',
                  marginBottom: '16px',
                }}
              >
                You always retain full control:
              </p>

              <ul
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '16px',
                  fontWeight: 400,
                  lineHeight: '1.6',
                  color: '#333',
                  paddingLeft: '24px',
                  marginBottom: '16px',
                }}
              >
                <li style={{ marginBottom: '8px' }}>Open Settings</li>
                <li style={{ marginBottom: '8px' }}>Tap Filo Account</li>
                <li style={{ marginBottom: '8px' }}>Select Delete and confirm</li>
              </ul>

              <p
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '16px',
                  fontWeight: 400,
                  lineHeight: '1.6',
                  color: '#333',
                  margin: 0,
                }}
              >
                Confirmation triggers immediate, irreversible deletion: Gmail OAuth tokens are
                revoked on the spot, and all Filo‑stored data — live and backup copies alike — is
                purged within seconds.
              </p>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fff' }}>
      {/* Header */}
      <nav
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '20px 80px',
          borderBottom: '1px solid #E5E5E5',
        }}
      >
        <Link href="/" style={{ display: 'flex', alignItems: 'center' }}>
          <Image
            src="/icons/brand/brand-logo-black.svg"
            alt="Filo Logo"
            width={60}
            height={35.792}
          />
        </Link>

        <div
          className="relative"
          onMouseEnter={handleLanguageMouseEnter}
          onMouseLeave={handleLanguageMouseLeave}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: '#707070',
            cursor: 'pointer',
          }}
        >
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px' }}>
            {selectedLanguage}
          </span>
          <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
            <path
              d="M1 1.5L6 6.5L11 1.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>

          {/* Language Dropdown */}
          {isLanguageDropdownOpen && (
            <div
              className="absolute top-full right-0 z-30"
              style={{
                marginTop: '8px',
                display: 'inline-flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                borderRadius: '16px',
                background: 'white',
                border: '1px solid rgba(0, 0, 0, 0.1)',
                padding: '8px',
                gap: '4px',
                width: '140px',
                whiteSpace: 'nowrap',
              }}
            >
              {['English', 'español', '简体中文', '繁体中文', '日本語'].map((language) => (
                <div
                  key={language}
                  onClick={() => handleLanguageSelect(language)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    width: '100%',
                    padding: '4px 8px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    fontFamily: 'Inter',
                    fontSize: '16px',
                    fontWeight: selectedLanguage === language ? 600 : 400,
                    color: '#374151',
                    gap: '8px',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = '0.7'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = '1'
                  }}
                >
                  <svg
                    width="17.6"
                    height="17.6"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{
                      opacity: selectedLanguage === language ? 1 : 0,
                    }}
                  >
                    <path
                      d="M13.854 4.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 11.293l6.646-6.647a.5.5 0 0 1 .708 0z"
                      fill="black"
                    />
                  </svg>
                  <span>{language}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </nav>

      <div style={{ display: 'flex', maxWidth: '1440px', margin: '0 auto' }}>
        {/* Left Sidebar Navigation */}
        <div
          style={{
            width: '280px',
            padding: '60px 40px',
            borderRight: '1px solid #E5E5E5',
            marginLeft: '-20px',
          }}
        >
          <nav>
            <button
              onClick={() => setActiveSection('terms')}
              style={{
                display: 'block',
                width: '100%',
                textAlign: 'left',
                padding: '16px 0',
                borderTop: 'none',
                borderRight: 'none',
                borderBottom: 'none',
                borderLeft: 'none',
                backgroundColor: 'transparent',
                fontFamily: 'Inter, sans-serif',
                fontSize: '18px',
                fontWeight: activeSection === 'terms' ? 600 : 400,
                color: activeSection === 'terms' ? '#22A0FB' : '#333',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                if (activeSection !== 'terms') {
                  e.currentTarget.style.color = '#22A0FB'
                }
              }}
              onMouseLeave={(e) => {
                if (activeSection !== 'terms') {
                  e.currentTarget.style.color = '#333'
                }
              }}
            >
              Terms of Service
            </button>

            <button
              onClick={() => setActiveSection('privacy')}
              style={{
                display: 'block',
                width: '100%',
                textAlign: 'left',
                padding: '16px 0',
                borderTop: 'none',
                borderRight: 'none',
                borderBottom: 'none',
                borderLeft: 'none',
                backgroundColor: 'transparent',
                fontFamily: 'Inter, sans-serif',
                fontSize: '18px',
                fontWeight: activeSection === 'privacy' ? 600 : 400,
                color: activeSection === 'privacy' ? '#22A0FB' : '#333',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                if (activeSection !== 'privacy') {
                  e.currentTarget.style.color = '#22A0FB'
                }
              }}
              onMouseLeave={(e) => {
                if (activeSection !== 'privacy') {
                  e.currentTarget.style.color = '#333'
                }
              }}
            >
              Privacy Policy
            </button>

            <button
              onClick={() => setActiveSection('data')}
              style={{
                display: 'block',
                width: '100%',
                textAlign: 'left',
                padding: '16px 0',
                borderTop: 'none',
                borderRight: 'none',
                borderBottom: 'none',
                borderLeft: 'none',
                backgroundColor: 'transparent',
                fontFamily: 'Inter, sans-serif',
                fontSize: '18px',
                fontWeight: activeSection === 'data' ? 600 : 400,
                color: activeSection === 'data' ? '#22A0FB' : '#333',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                if (activeSection !== 'data') {
                  e.currentTarget.style.color = '#22A0FB'
                }
              }}
              onMouseLeave={(e) => {
                if (activeSection !== 'data') {
                  e.currentTarget.style.color = '#333'
                }
              }}
            >
              Data Protection
            </button>
          </nav>
        </div>

        {/* Right Content Area */}
        <div
          style={{
            flex: 1,
            padding: '60px 80px',
            maxWidth: 'calc(100% - 280px)',
          }}
        >
          {renderContent()}
        </div>
      </div>
    </div>
  )
}
