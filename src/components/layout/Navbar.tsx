'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import { useUser } from '@/contexts/UserContext'

export default function Navbar() {
  const router = useRouter()
  const { userPhoto } = useUser()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [imgError, setImgError] = useState(false)
  const [imageUrl, setImageUrl] = useState<string>('')

  useEffect(() => {
    const storedPhoto = localStorage.getItem('userPhoto')
    if (userPhoto) {
      const baseUrl = 'http://localhost:4000'
      const url = `${baseUrl}${userPhoto}`
      setImageUrl(url)
      localStorage.setItem('userPhoto', url)
    } else if (storedPhoto) {
      setImageUrl(storedPhoto)
    }
  }, [userPhoto])

  const handleLogout = () => {
    localStorage.removeItem('userPhoto')
    Cookies.remove('accessToken')
    router.push('/login')
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const handleImageError = () => {
    setImgError(true)
  }

  return (
    <nav className="bg-blue-400">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              onClick={toggleMobileMenu}
              className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="absolute -inset-0.5"></span>
              <span className="sr-only">Open main menu</span>
              <svg
                className={`${isMobileMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
              <svg
                className={`${isMobileMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="flex flex-1 items-center justify-start max-w-7xl mx-auto w-full">
            <div className="flex flex-shrink-0 items-center">
              {imageUrl && !imgError ? (
                <img
                  src={imageUrl}
                  alt="Profile"
                  className="h-11 w-11 rounded-full object-cover border-2 border-black"
                  onError={handleImageError}
                />
              ) : (
                <div className="h-11 w-11 rounded-full bg-gray-300 flex items-center justify-center border-2 border-black">
                  <span className="text-gray-600">User</span>
                </div>
              )}
            </div>
            <div className="hidden sm:ml-6 sm:block flex-grow">
              <div className="flex space-x-4">
                <a
                  href="/"
                  className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
                  aria-current="page"
                >
                  Dashboard
                </a>
              </div>
            </div>
            <div className="flex items-center">
              <button
                onClick={handleLogout}
                className="rounded-md bg-red-500 px-3 py-2 text-sm font-medium text-white hover:bg-red-600 transition-colors"
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`${isMobileMenuOpen ? 'block' : 'hidden'} sm:hidden`}
        id="mobile-menu"
      >
        <div className="space-y-1 px-2 pb-3 pt-2">
          <a
            href="/"
            className="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white"
            aria-current="page"
          >
            Dashboard
          </a>
          <button
            onClick={handleLogout}
            className="w-full text-left rounded-md bg-red-500 px-3 py-2 text-base font-medium text-white hover:bg-red-600 transition-colors"
          >
            Sair
          </button>
        </div>
      </div>
    </nav>
  )
}
