"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/utils/AuthContext";

const Footer = () => {
  const { isAuthenticated } = useAuth();
  const currentYear = new Date().getFullYear();
  const address = "6500 Dublin Blvd., Ste.218, Dublin, CA, 94568";
  const googleMapsLink = `https://www.google.com/maps?q=${encodeURIComponent(
    address
  )}`;

  useEffect(() => {
    const sitesealElement = document.getElementById("siteseal");
    const script = document.createElement("script");
    script.src =
      "https://seal.godaddy.com/getSeal?sealID=v3KT7oJ1lPBg9VtkckOTfJJAwgbvIXY1mAuP0Qzb9OBFhXLj5FvNJFdMjtjF";
    script.async = true;

    if (sitesealElement) {
      sitesealElement.appendChild(script);
    }

    return () => {
      if (sitesealElement && script.parentNode === sitesealElement) {
        sitesealElement.removeChild(script);
      }
    };
  }, []);

  return (
    <>
      <footer
        className="wow fadeInUp relative z-10 bg-primary bg-opacity-5 pt-6 shadow-2xl shadow-black md:pt-8"
        data-wow-delay=".1s"
      >
        <div className="container">
          <div className="-mx-4 flex flex-wrap justify-around">
            <div className="flex w-full items-center justify-center text-center sm:w-1/2 lg:w-4/12">
              <div className="mb-12 max-w-[360px]">
                <Link href="/" className="inline-block">
                  <div className="mb-4 text-2xl font-bold text-black dark:text-white sm:mb-8">
                    Whitebox Learning
                  </div>
                </Link>
                <div className="flex items-center justify-around">
                  <a
                    href="https://www.facebook.com/profile.php?id=100076790355187"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Twitter"
                    className="mr-5 text-[#858691] duration-500 hover:text-[#316ff6] dark:text-gray-700 dark:hover:text-[#316ff6]"
                  >
                    <svg
                      width="40"
                      height="40"
                      className="fill-current p-2"
                      viewBox="0 0 30 30"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M19 6h3V0h-3c-3.3 0-6 2.7-6 6v4h-4v6h4v16h6V16h4l1-6h-5V6c0-0.6 0.4-1 1-1z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.youtube.com/channel/UCslSigBnOPXZE2ZFMA6N44g"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="social-link"
                    className="mr-5 text-[#858691] duration-500 hover:text-red-600 dark:text-gray-700 dark:hover:text-red-600"
                  >
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 18 14"
                      className="fill-current p-2"
                    >
                      <path d="M17.5058 2.07119C17.3068 1.2488 16.7099 0.609173 15.9423 0.395963C14.5778 7.26191e-08 9.0627 0 9.0627 0C9.0627 0 3.54766 7.26191e-08 2.18311 0.395963C1.41555 0.609173 0.818561 1.2488 0.619565 2.07119C0.25 3.56366 0.25 6.60953 0.25 6.60953C0.25 6.60953 0.25 9.68585 0.619565 11.1479C0.818561 11.9703 1.41555 12.6099 2.18311 12.8231C3.54766 13.2191 9.0627 13.2191 9.0627 13.2191C9.0627 13.2191 14.5778 13.2191 15.9423 12.8231C16.7099 12.6099 17.3068 11.9703 17.5058 11.1479C17.8754 9.68585 17.8754 6.60953 17.8754 6.60953C17.8754 6.60953 17.8754 3.56366 17.5058 2.07119ZM7.30016 9.44218V3.77687L11.8771 6.60953L7.30016 9.44218Z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.linkedin.com/company/whitebox-learning/about/"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Linkedin"
                    className="mr-5 text-[#858691] duration-500 hover:text-blue-700 dark:text-gray-700 dark:hover:text-blue-700"
                  >
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 17 16"
                      className="fill-current p-2"
                    >
                      <path d="M15.2196 0H1.99991C1.37516 0 0.875366 0.497491 0.875366 1.11936V14.3029C0.875366 14.8999 1.37516 15.4222 1.99991 15.4222H15.1696C15.7943 15.4222 16.2941 14.9247 16.2941 14.3029V1.09448C16.3441 0.497491 15.8443 0 15.2196 0ZM5.44852 13.1089H3.17444V5.7709H5.44852V13.1089ZM4.29899 4.75104C3.54929 4.75104 2.97452 4.15405 2.97452 3.43269C2.97452 2.71133 3.57428 2.11434 4.29899 2.11434C5.02369 2.11434 5.62345 2.71133 5.62345 3.43269C5.62345 4.15405 5.07367 4.75104 4.29899 4.75104ZM14.07 13.1089H11.796V9.55183C11.796 8.7061 11.771 7.58674 10.5964 7.58674C9.39693 7.58674 9.222 8.53198 9.222 9.47721V13.1089H6.94792V5.7709H9.17202V6.79076H9.19701C9.52188 6.19377 10.2466 5.59678 11.3711 5.59678C13.6952 5.59678 14.12 7.08925 14.12 9.12897V13.1089H14.07Z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            <div className="hidden w-full text-center sm:w-1/2 sm:text-left md:flex md:justify-center lg:w-4/12">
              <div className="mb-6">
                <div className="mb-8">
                  <a
                    href={"/contact"}
                    target="_self"
                    rel="noopener noreferrer"
                    className="text-2xl font-bold text-black dark:text-white"
                  >
                    Contact us
                  </a>
                </div>
                <ul>
                  <li className="mb-3">
                    <a
                      href={googleMapsLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-md text-black duration-500 hover:text-blue-600 dark:text-white dark:hover:text-blue-600"
                    >
                      {address}
                    </a>
                  </li>
                  <li className="mb-3">
                    <a
                      className="text-md text-black duration-500 hover:text-blue-600 dark:text-white dark:hover:text-blue-600"
                      href="tel:+19255571053"
                    >
                      +1 925-557-1053
                    </a>
                  </li>
                  <li className="mb-3">
                    <a
                      className="text-md mb-1 block text-black duration-500 hover:text-blue-600 dark:text-white dark:hover:text-blue-600"
                      href="mailto:info@whitebox-learning.com"
                    >
                      info@whitebox-learning.com
                    </a>
                    <a
                      className="text-md text-black duration-500 hover:text-blue-600 dark:text-white dark:hover:text-blue-600"
                      href="mailto:recruiting@whitebox-learning.com"
                    >
                      recruiting@whitebox-learning.com
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Copyrights note */}

        <div className="flex h-10 items-center bg-gray-300 py-10 dark:bg-primary/10">
          <div className="container flex">
            <div className="sm:text-md text-bl ackdark:text-white text-center text-sm font-semibold sm:w-11/12 sm:text-right lg:text-xl">
              &copy; {currentYear}{" "}
              <Link href="/" className="inline-block">
                <div className="text-blue-600 dark:text-blue-500">
                  Whitebox Learning,Inc.
                </div>
              </Link>{" "}
              All rights reserved.
            </div>
            <div className="hidden sm:flex sm:w-1/2 sm:justify-end">
              <div className="" id="siteseal"></div>
            </div>
          </div>
        </div>

        <div className="absolute right-0 top-14 z-[-1]">
          <svg
            width="55"
            height="99"
            viewBox="0 0 55 99"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle opacity="0.8" cx="49.5" cy="49.5" r="49.5" fill="#959CB1" />
            <mask
              id="mask0_94:899"
              style={{ maskType: "alpha" }}
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="99"
              height="99"
            >
              <circle
                opacity="0.8"
                cx="49.5"
                cy="49.5"
                r="49.5"
                fill="#4A6CF7"
              />
            </mask>
            <g mask="url(#mask0_94:899)">
              <circle
                opacity="0.8"
                cx="49.5"
                cy="49.5"
                r="49.5"
                fill="url(#paint0_radial_94:899)"
              />
              <g opacity="0.8" filter="url(#filter0_f_94:899)">
                <circle cx="53.8676" cy="26.2061" r="20.3824" fill="white" />
              </g>
            </g>
            <defs>
              <filter
                id="filter0_f_94:899"
                x="12.4852"
                y="-15.1763"
                width="82.7646"
                height="82.7646"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="BackgroundImageFix"
                  result="shape"
                />
                <feGaussianBlur
                  stdDeviation="10.5"
                  result="effect1_foregroundBlur_94:899"
                />
              </filter>
              <radialGradient
                id="paint0_radial_94:899"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(49.5 49.5) rotate(90) scale(53.1397)"
              >
                <stop stopOpacity="0.47" />
                <stop offset="1" stopOpacity="0" />
              </radialGradient>
            </defs>
          </svg>
        </div>
        <div className="absolute left-0 bottom-24 z-[-1]">
          <svg
            width="79"
            height="94"
            viewBox="0 0 79 94"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              opacity="0.3"
              x="-41"
              y="26.9426"
              width="66.6675"
              height="66.6675"
              transform="rotate(-22.9007 -41 26.9426)"
              fill="url(#paint0_linear_94:889)"
            />
            <rect
              x="-41"
              y="26.9426"
              width="66.6675"
              height="66.6675"
              transform="rotate(-22.9007 -41 26.9426)"
              stroke="url(#paint1_linear_94:889)"
              strokeWidth="0.7"
            />
            <path
              opacity="0.3"
              d="M50.5215 7.42229L20.325 1.14771L46.2077 62.3249L77.1885 68.2073L50.5215 7.42229Z"
              fill="url(#paint2_linear_94:889)"
            />
            <path
              d="M50.5215 7.42229L20.325 1.14771L46.2077 62.3249L76.7963 68.2073L50.5215 7.42229Z"
              stroke="url(#paint3_linear_94:889)"
              strokeWidth="0.7"
            />
            <path
              opacity="0.3"
              d="M17.9721 93.3057L-14.9695 88.2076L46.2077 62.325L77.1885 68.2074L17.9721 93.3057Z"
              fill="url(#paint4_linear_94:889)"
            />
            <path
              d="M17.972 93.3057L-14.1852 88.2076L46.2077 62.325L77.1884 68.2074L17.972 93.3057Z"
              stroke="url(#paint5_linear_94:889)"
              strokeWidth="0.7"
            />
            <defs>
              <linearGradient
                id="paint0_linear_94:889"
                x1="-41"
                y1="21.8445"
                x2="36.9671"
                y2="59.8878"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" stopOpacity="0.62" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_94:889"
                x1="25.6675"
                y1="95.9631"
                x2="-42.9608"
                y2="20.668"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" stopOpacity="0" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0.51" />
              </linearGradient>
              <linearGradient
                id="paint2_linear_94:889"
                x1="20.325"
                y1="-3.98039"
                x2="90.6248"
                y2="25.1062"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" stopOpacity="0.62" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint3_linear_94:889"
                x1="18.3642"
                y1="-1.59742"
                x2="113.9"
                y2="80.6826"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" stopOpacity="0" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0.51" />
              </linearGradient>
              <linearGradient
                id="paint4_linear_94:889"
                x1="61.1098"
                y1="62.3249"
                x2="-8.82468"
                y2="58.2156"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" stopOpacity="0.62" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint5_linear_94:889"
                x1="65.4236"
                y1="65.0701"
                x2="24.0178"
                y2="41.6598"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" stopOpacity="0" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0.51" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </footer>
    </>
  );
};

export default Footer;
