import Link from 'next/link'
import { Github, Twitter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

export function Navbar() {
  return (
    <nav className="w-full px-4 py-4 flex items-center justify-between">
      <div className="flex items-center gap-8">
        <Link href="/" className="flex items-center gap-2">
          <Image 
            src="https://res.cloudinary.com/docg651du/image/upload/v1736315070/qude_logo_bmpqiw.jpg"
            alt="QudeAI Logo"
            width={32}
            height={32}
            className="rounded-lg"
          />
          <span className="font-bold text-xl">QudeAI</span>
        </Link>
        <div className="hidden md:flex items-center gap-6">
          <Link href="https://docs.qude.ai/" className="text-sm font-medium hover:text-[#ff5501]">
            Docs
          </Link>
          <Link href="https://github.com/qudeai/qudeai-framework-v.1/releases/tag/qudeframework_v.1beta" className="text-sm font-medium hover:text-[#ff5501]">
            Changelog
          </Link>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Link href="https://github.com/qudeai">
          <Button variant="ghost" size="icon">
            <Github className="h-5 w-5" />
          </Button>
        </Link>
        <Link href="https://x.com/Qudeai">
          <Button variant="ghost" size="icon">
            <Twitter className="h-5 w-5" />
          </Button>
        </Link>
        <Link href="https://www.npmjs.com/package/@qudeaiframework/v.1beta">
          <Button 
            size="sm"
            style={{
              backgroundColor: 'rgba(255,85,1,255)',
              color: 'white',
            }}
          >
            Build
          </Button>
        </Link>
      </div>
    </nav>
  )
}

