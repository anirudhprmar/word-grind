import Image from "next/image";
import Link from "next/link";
import { Button } from "~/components/ui/button";

export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
           <div>
            <Image 
            src={'/wordgrindLogo.png'}
            width={'50'}
            height={'50'}
            alt="wordgrind logo, a cartoon with pencil in one hand and surrounded by a letter A"
            className="rounded-md"
            />
           </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  WordGrind
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Vocabulary Learning Platform
                </p>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              Master vocabulary through interactive quizzes, AI conversations, and personalized learning. 
              Build your word collection and track your progress with our comprehensive vocabulary platform.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Get Started
            </h4>
            <div className="space-y-3">
              <Link
                href="/sign-in"
                className="block text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/sign-up"
                className="block text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
              >
                Sign Up
              </Link>
              <Link
                href="/pricing"
                className="block text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
              >
                Pricing
              </Link>
              <Link
                href="/dashboard"
                className="block text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
              >
                Dashboard
              </Link>
            </div>
          </div>

          {/* Legal Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Legal
            </h4>
            <div className="space-y-3">
              <Link
                href="/privacy-policy"
                className="block text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms-of-service"
                className="block text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
              >
                Terms of Service
              </Link>
              <a
                href="mailto:anirudhparmar2004@gmail.com"
                className="block text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
              >
                Contact Support
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © {new Date().getFullYear()} WordGrind. All rights reserved.
            </p>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Made with ❤️ for vocabulary learners
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
