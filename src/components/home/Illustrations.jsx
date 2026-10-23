// Line illustrations drawn in code (64×64 grid, stroke = currentColor).
// Strokes do not scale, so lines stay thin at any size.

const Svg = ({ children, size = 64, title, ...rest }) => (
  <svg
    viewBox="0 0 64 64"
    width={size}
    height={size}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    role={title ? 'img' : undefined}
    aria-hidden={title ? undefined : true}
    {...rest}
  >
    {title && <title>{title}</title>}
    {children}
  </svg>
);

const line = { vectorEffect: 'non-scaling-stroke' };

export const BagIcon = (props) => (
  <Svg {...props}>
    <path style={line} d="M24 20v-4a8 8 0 0 1 16 0v4" />
    <path style={line} d="M14 20h36l-3 34a4 4 0 0 1-4 4H21a4 4 0 0 1-4-4z" />
    <path style={line} d="M22 30c4 3 16 3 20 0" />
  </Svg>
);

export const LunchBoxIcon = (props) => (
  <Svg {...props}>
    <path style={line} d="M10 26v-4a4 4 0 0 1 4-4h36a4 4 0 0 1 4 4v4z" />
    <path style={line} d="M12 26h40l-3 24a4 4 0 0 1-4 4H19a4 4 0 0 1-4-4z" />
    <path style={line} d="M32 30v20M18 38h10" />
  </Svg>
);

export const FoamTrayIcon = (props) => (
  <Svg {...props}>
    <path style={line} d="M6 30h52l-6 16a3 3 0 0 1-3 2H15a3 3 0 0 1-3-2z" />
    <path style={line} d="M14 36h36" />
    <path style={line} d="M18 41h1M26 41h1M34 41h1M42 41h1" />
  </Svg>
);

export const BottleIcon = (props) => (
  <Svg {...props}>
    <path style={line} d="M27 4h10v6H27z" />
    <path style={line} d="M28 10h8v4l6 7v33a4 4 0 0 1-4 4H26a4 4 0 0 1-4-4V21l6-7z" />
    <path style={line} d="M22 30h20M22 44h20" />
  </Svg>
);

export const PipeIcon = (props) => (
  <Svg {...props}>
    <path style={line} d="M6 20h26a14 14 0 0 1 14 14v24" />
    <path style={line} d="M6 32h24a4 4 0 0 1 4 4v22" />
    <path style={line} d="M6 20v12M34 58h12" />
    <path style={line} d="M16 18v16M32 44h16" />
  </Svg>
);

export const CartonIcon = (props) => (
  <Svg {...props}>
    <path style={line} d="M18 18h28v40H18z" />
    <path style={line} d="M18 18l5-8h18l5 8" />
    <path style={line} d="M39 10l4-8" />
    <path style={line} d="M24 30h16M24 36h10" />
  </Svg>
);

export const FactoryIcon = (props) => (
  <Svg {...props}>
    <path style={line} d="M6 56V32l12 8v-8l12 8v-8l12 8V18h10v38z" />
    <path style={line} d="M24 56v-8h6v8M42 46h4M12 46h4" />
  </Svg>
);

export const PhoneIcon = (props) => (
  <Svg {...props}>
    <rect style={line} x="18" y="4" width="28" height="56" rx="5" />
    <path style={line} d="M28 9h8" />
    <path style={line} d="M24 22v-4h4M40 22v-4h-4M24 38v4h4M40 38v4h-4" />
    <path style={line} d="M23 30h18" />
  </Svg>
);

export const ReactorIcon = (props) => (
  <Svg {...props}>
    <path style={line} d="M20 8h24v26a12 12 0 0 1-24 0z" />
    <path style={line} d="M20 20h24" />
    <path style={line} d="M44 14h8v12" />
    <path style={line} d="M32 62c-3 0-5-2-5-5 0-3 3-4 3-7 2 1 3 3 3 4 1-1 1-3 1-4 2 2 3 4 3 7 0 3-2 5-5 5z" />
  </Svg>
);

export const FeedstockIcon = (props) => (
  <Svg {...props}>
    <path style={line} d="M32 6C24 18 18 26 18 34a14 14 0 0 0 28 0c0-8-6-16-14-28z" />
    <circle style={line} cx="14" cy="54" r="4" />
    <circle style={line} cx="26" cy="56" r="4" />
    <circle style={line} cx="50" cy="54" r="4" />
  </Svg>
);

export const BinIcon = (props) => (
  <Svg {...props}>
    <path style={line} d="M14 20h36M26 20v-6h12v6" />
    <path style={line} d="M18 20l3 36h22l3-36" />
    <path style={line} d="M27 30l10 16M37 30L27 46" />
  </Svg>
);
