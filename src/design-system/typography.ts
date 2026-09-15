/**
 * Centralized Typography Configuration & Design Scale
 * 
 * Strict Global Rules:
 * 1. Exactly one primary font-family across Latin & Arabic scripts.
 * 2. Strict hierarchical font-size scale (Display 32px, Heading 24px, Subhead 18-20px, Body 14-16px, Caption 13px min).
 * 3. Reusable typography tokens preventing arbitrary inline font sizes.
 */

export const FONT_FAMILY =
  "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

export const FONT_WEIGHTS = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
  black: 900,
} as const;

export const FONT_SCALE = {
  // Display & Hero Totals
  display: {
    fontSize: '32px',
    lineHeight: '40px',
    fontWeight: FONT_WEIGHTS.extrabold,
    letterSpacing: '-0.02em',
  },
  // Large Heading (H1 / Modal Titles)
  headingLg: {
    fontSize: '24px',
    lineHeight: '32px',
    fontWeight: FONT_WEIGHTS.extrabold,
    letterSpacing: '-0.01em',
  },
  // Medium Heading (H2 / Section Banners)
  headingMd: {
    fontSize: '20px',
    lineHeight: '28px',
    fontWeight: FONT_WEIGHTS.bold,
    letterSpacing: '-0.01em',
  },
  // Small Heading (H3 / Card Titles)
  headingSm: {
    fontSize: '18px',
    lineHeight: '24px',
    fontWeight: FONT_WEIGHTS.bold,
    letterSpacing: '0em',
  },
  // Subheading / Section Titles (H4)
  subheading: {
    fontSize: '16px',
    lineHeight: '22px',
    fontWeight: FONT_WEIGHTS.semibold,
    letterSpacing: '0em',
  },
  // Primary Body (Main Content, Form Inputs)
  bodyLarge: {
    fontSize: '16px',
    lineHeight: '24px',
    fontWeight: FONT_WEIGHTS.regular,
    letterSpacing: '0em',
  },
  // Standard Body (List Rows, Description Lines)
  body: {
    fontSize: '14px',
    lineHeight: '20px',
    fontWeight: FONT_WEIGHTS.regular,
    letterSpacing: '0em',
  },
  // Small Body / Micro Subtitles (Minimum 13px Accessible Threshold)
  caption: {
    fontSize: '13px',
    lineHeight: '18px',
    fontWeight: FONT_WEIGHTS.medium,
    letterSpacing: '0.01em',
  },
  // Category Eyebrow / Overline (Uppercase Section Badges)
  eyebrow: {
    fontSize: '13px',
    lineHeight: '16px',
    fontWeight: FONT_WEIGHTS.extrabold,
    letterSpacing: '0.06em',
    textTransform: 'uppercase' as const,
  },
} as const;

export type TypographyVariant = keyof typeof FONT_SCALE;

/**
 * Helper utility to get typography style object for any variant
 */
export const getTypographyStyle = (
  variant: TypographyVariant,
  overrides?: React.CSSProperties
): React.CSSProperties => {
  return {
    fontFamily: FONT_FAMILY,
    ...FONT_SCALE[variant],
    ...overrides,
  };
};

export const typographyConfig = {
  fontFamily: FONT_FAMILY,
  weights: FONT_WEIGHTS,
  scale: FONT_SCALE,
  getStyle: getTypographyStyle,
};

export default typographyConfig;
