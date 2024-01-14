export const PRODUCT_CATEGORIES = [
  {
    label: "UI Kits",
    value: "ui_kits" as const,
    featured: [
      {
        name: "landing pages",
        href: `/products?category=ui_kits`,
        imageSrc: "/nav/ui-kits/mixed.jpg",
      },
      {
        name: "Presentation Templates",
        href: "/products?category=ui_kits&sort=desc",
        imageSrc: "/nav/ui-kits/blue.jpg",
      },
      {
        name: "Bestsellers",
        href: "/products?category=ui_kits",
        imageSrc: "/nav/ui-kits/purple.jpg",
      },
    ],
  },
  {
    label: "Icons",
    value: "icons" as const,
    featured: [
      {
        name: "Favorite Icon Picks",
        href: `/products?category=icons`,
        imageSrc: "/nav/icons/picks.jpg",
      },
      {
        name: "New Arrivals",
        href: "/products?category=icons&sort=desc",
        imageSrc: "/nav/icons/new.jpg",
      },
      {
        name: "Bestselling Icons",
        href: "/products?category=icons",
        imageSrc: "/nav/icons/bestsellers.jpg",
      },
    ],
  },
];

export const PRODUCT_CATFORNAV = [
  {
    label: "UI Kits",
    value: "ui_kits" as const,
    featured: [
      {
        name: "landing pages",
        href: `/products?category=ui_kits`,
        imageSrc: "/nav/ui-kits/landing-page.png",
      },
      {
        name: "UX/UI",
        href: "/products?category=ui_kits&sort=desc",
        imageSrc: "/nav/ui-kits/blue.jpg",
      },
      {
        name: "Bestsellers",
        href: "/products?category=ui_kits",
        imageSrc: "/nav/ui-kits/purple.jpg",
      },
    ],
  },
  {
    label: "Font & Icons",
    value: "icons" as const,
    featured: [
      {
        name: "fonts",
        href: `/products?category=icons`,
        imageSrc: "/nav/icons/fonts.jpg",
      },
      {
        name: "fonts",
        href: "/products?category=icons&sort=desc",
        imageSrc: "/nav/icons/new.jpg",
      },
      {
        name: "Icons",
        href: "/products?category=icons",
        imageSrc: "/nav/icons/bestsellers.jpg",
      },
    ],
  },
];

export const QUALITY_PROMISE = [
  {
    label: "Quality Assurance: ",
    value:
      "We take pride in offering only the highest quality digital assets, ensuring that our customers receive the best possible value for their money.",
  },
  {
    label: "Expert Verification: ",
    value:
      "Our team of experts carefully reviews and verifies each digital asset to ensure it meets our strict quality standards, providing you with the confidence and assurance that you're purchasing top-notch products.",
  },
  {
    label: "Wide Range of Products: ",
    value:
      "digitalHome offers a diverse selection of digital assets, catering to various needs and preferences. Whether you're looking for e-books, software, or multimedia content, you'll find it all here.",
  },
  {
    label: "Secure Transactions: ",
    value:
      "We prioritize your security and privacy, implementing robust security measures to protect your personal information and transactions.",
  },
];
