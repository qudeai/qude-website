import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import Image from 'next/image';

export function Footer() {
  return (
    <footer
      style={{
        backgroundColor: 'rgba(255,85,1,0.05)', // Light pink background with opacity
        color: 'rgba(51, 51, 51, 1)', // Dark gray text
      }}
    >
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <Link href="/home" className="flex items-center gap-2">
              <Image
                src="https://res.cloudinary.com/docg651du/image/upload/v1736315070/qude_logo_bmpqiw.jpg"
                alt="QudeAI Logo"
                width={32}
                height={32}
                className="rounded-lg"
              />
              <span
                style={{
                  fontWeight: 'bold',
                  fontSize: '1.25rem',
                  color: 'rgba(51, 51, 51, 1)', // Dark gray
                }}
              >
                QudeAI Framework
              </span>
            </Link>
            <p
              style={{
                fontSize: '0.875rem',
                lineHeight: '1.5',
                color: 'rgba(51, 51, 51, 1)', // Dark gray
              }}
            >
              Your AI-powered CLI Copilot on Solana.
            </p>
          </div>

          {/* Product Links */}
          <div className="md:col-start-2">
            <h3
              style={{
                fontWeight: '600',
                marginBottom: '1rem',
                color: 'rgba(51, 51, 51, 1)', // Dark gray
              }}
            >
              Product
            </h3>
            <div className="space-y-3">
              <Link
                href="https://docs.qude.ai/"
                className="flex items-center gap-1 text-sm"
                style={{
                  color: 'rgba(51, 51, 51, 0.8)', // Slightly lighter dark gray
                }}
              >
                Docs
                <ExternalLink style={{ height: '1rem', width: '1rem' }} />
              </Link>
              <Link
                href="https://github.com/qudeai/qudeframework-api"
                className="flex items-center gap-1 text-sm"
                style={{
                  color: 'rgba(51, 51, 51, 0.8)',
                }}
              >
                QudeApi
                <ExternalLink style={{ height: '1rem', width: '1rem' }} />
              </Link>
              <Link
                href="https://github.com/qudeai/qudeai-framework-v.1"
                className="flex items-center gap-1 text-sm"
                style={{
                  color: 'rgba(51, 51, 51, 0.8)',
                }}
              >
                QudeFramework
                <ExternalLink style={{ height: '1rem', width: '1rem' }} />
              </Link>
            </div>
          </div>

          {/* Community Links */}
          <div>
            <h3
              style={{
                fontWeight: '600',
                marginBottom: '1rem',
                color: 'rgba(51, 51, 51, 1)', // Dark gray
              }}
            >
              Community
            </h3>
            <div className="space-y-3">
              <Link
                href="https://x.com/Qudeai"
                className="flex items-center gap-1 text-sm"
                style={{
                  color: 'rgba(51, 51, 51, 0.8)',
                }}
              >
                Twitter
                <ExternalLink style={{ height: '1rem', width: '1rem' }} />
              </Link>
              <Link
                href="https://t.me/qudeai"
                className="flex items-center gap-1 text-sm"
                style={{
                  color: 'rgba(51, 51, 51, 0.8)',
                }}
              >
                Telegram
                <ExternalLink style={{ height: '1rem', width: '1rem' }} />
              </Link>
              <Link
                href="https://github.com/qudeai"
                className="flex items-center gap-1 text-sm"
                style={{
                  color: 'rgba(51, 51, 51, 0.8)',
                }}
              >
                Github
                <ExternalLink style={{ height: '1rem', width: '1rem' }} />
              </Link>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3
              style={{
                fontWeight: '600',
                marginBottom: '1rem',
                color: 'rgba(51, 51, 51, 1)', // Dark gray
              }}
            >
              Company
            </h3>
            <div className="space-y-3">
              <Link
                href="https://docs.qude.ai/company/about"
                className="flex items-center gap-1 text-sm"
                style={{
                  color: 'rgba(51, 51, 51, 0.8)',
                }}
              >
                About
                <ExternalLink style={{ height: '1rem', width: '1rem' }} />
              </Link>
              <Link
                href="https://docs.qude.ai/company/terms-of-service"
                className="flex items-center gap-1 text-sm"
                style={{
                  color: 'rgba(51, 51, 51, 0.8)',
                }}
              >
                Terms of Service
                <ExternalLink style={{ height: '1rem', width: '1rem' }} />
              </Link>
              <Link
                href="https://docs.qude.ai/company/privacy-policy"
                className="flex items-center gap-1 text-sm"
                style={{
                  color: 'rgba(51, 51, 51, 0.8)',
                }}
              >
                Privacy Policy
                <ExternalLink style={{ height: '1rem', width: '1rem' }} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        style={{
          borderTop: '1px solid rgba(200, 200, 200, 0.5)', // Light gray border
        }}
      >
        <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p
            style={{
              fontSize: '0.875rem',
              color: 'rgba(51, 51, 51, 1)', // Dark gray
            }}
          >
            Copyright © 2024-25 QudeAI.
          </p>
        </div>
      </div>
    </footer>
  );
}

