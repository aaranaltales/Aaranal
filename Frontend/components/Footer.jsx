"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-50 to-rose-50 border-t border-rose-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-6">
            <Link
              href="/"
              className=" flex items-center text-3xl sm:text-4xl font-pacifico bg-gradient-to-r from-rose-600 to-pink-500 bg-clip-text text-transparent hover:from-rose-700 hover:to-pink-600 transition-all duration-300"
            >
              <Image
                src="/assests/logo.png"
                alt="Aaranal logo"
                width={50}
                height={50}
                className="h-12 mr-2 w-12"
              />
              <p>Aaranal</p>
            </Link>
            <p className="text-gray-600 text-lg max-w-md font-light leading-relaxed">
              Every piece tells a story, and now it’s part of yours. Stay
              connected with Aaranal.
            </p>
            <div className="flex items-center space-x-3">
              <a
                href="https://instagram.com/aaranal.tales"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 group"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-rose-100 to-pink-100 rounded-2xl flex items-center justify-center group-hover:from-rose-200 group-hover:to-pink-200 transform transition-all duration-300">
                  <i className="ri-instagram-line text-rose-600 text-xl sm:text-2xl group-hover:scale-110 transition-transform"></i>
                </div>
                <span className="text-rose-600 font-medium text-sm sm:text-base group-hover:text-rose-700 transition-colors duration-300">
                  @aaranal.tales
                </span>
              </a>
            </div>
          </div>
          <div className="flex w-full justify-between pr-10">
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Collections
              </h3>
              <ul className="space-y-4">
                <li>
                  <Link
                    href={{
                      pathname: "/collections",
                      query: { category: "Tote Bag" },
                    }}
                    className="text-gray-600 hover:text-rose-600 transition-colors cursor-pointer font-light"
                  >
                    Tote Bag
                  </Link>
                </li>
                <li>
                  <Link
                    href={{
                      pathname: "/collections",
                      query: { category: "Pouch and Purse" },
                    }}
                    className="text-gray-600 hover:text-rose-600 transition-colors cursor-pointer font-light"
                  >
                    Pouch and Purse
                  </Link>
                </li>
                <li>
                  <Link
                    href={{
                      pathname: "/collections",
                      query: { category: "Crochet" },
                    }}
                    className="text-gray-600 hover:text-rose-600 transition-colors cursor-pointer font-light"
                  >
                    Crochet
                  </Link>
                </li>
                <li>
                  <Link
                    href={{
                      pathname: "/collections",
                      query: { category: "Others" },
                    }}
                    className="text-gray-600 hover:text-rose-600 transition-colors cursor-pointer font-light"
                  >
                    Others
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Experience
              </h3>
              <ul className="space-y-4">
                {/* <li>
                <Link href="/craftsmanship" className="text-gray-600 hover:text-rose-600 transition-colors cursor-pointer font-light">
                  Craftsmanship
                </Link>
              </li> */}
                <li>
                  <Link
                    href="/customize"
                    className="text-gray-600 hover:text-rose-600 transition-colors cursor-pointer font-light"
                  >
                    Customization
                  </Link>
                </li>
                <li>
                  <Link
                    href="/careguide"
                    className="text-gray-600 hover:text-rose-600 transition-colors cursor-pointer font-light"
                  >
                    Care Guide
                  </Link>
                </li>
                <li>
                  <Link
                    href="mailto:support@aaranaltales.shop"
                    className="text-gray-600 hover:text-rose-600 transition-colors cursor-pointer font-light"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-rose-200 mt-16 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-600 text-sm font-light">
              © 2025 Aaranal. Crafted with passion and precision.
            </p>
            <div className="flex space-x-8">
              <Link
                href="/privacypolicy"
                className="text-gray-600 hover:text-rose-600 text-sm transition-colors cursor-pointer font-light"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-gray-600 hover:text-rose-600 text-sm transition-colors cursor-pointer font-light"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
