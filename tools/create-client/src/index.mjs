#!/usr/bin/env node

import { input, select, confirm } from '@inquirer/prompts';
import { readFileSync, writeFileSync, cpSync, rmSync, existsSync, mkdirSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..', '..');
const TEMPLATE_DIR = join(ROOT, 'apps', 'client-starter');
const APPS_DIR = join(ROOT, 'apps');

// Color presets
const COLOR_PRESETS = {
  earth: {
    label: 'Earth Tones',
    primary: '#5C4033', primaryHover: '#3E2B22',
    secondary: '#8B7355', secondaryHover: '#6B5344',
    accent: '#C9A961', accentHover: '#A68B4B',
    background: '#F5F1EB', foreground: '#2C2C2C',
    foregroundMuted: '#4A4A4A', muted: '#E8E2D9', mutedLight: '#D4C9B8',
  },
  ocean: {
    label: 'Ocean',
    primary: '#1B4965', primaryHover: '#143B52',
    secondary: '#5FA8D3', secondaryHover: '#4890BA',
    accent: '#F2C57C', accentHover: '#D9AE64',
    background: '#F7F9FC', foreground: '#1A1A2E',
    foregroundMuted: '#4A4A6A', muted: '#E1E8ED', mutedLight: '#D0DCE5',
  },
  forest: {
    label: 'Forest',
    primary: '#2D4A3E', primaryHover: '#1E3329',
    secondary: '#6B8F71', secondaryHover: '#557558',
    accent: '#D4A574', accentHover: '#BC8D5C',
    background: '#F5F5F0', foreground: '#2C2C2C',
    foregroundMuted: '#555555', muted: '#E0DED5', mutedLight: '#C8D5C0',
  },
  warm: {
    label: 'Warm',
    primary: '#9B2335', primaryHover: '#7A1C2A',
    secondary: '#C4784A', secondaryHover: '#A66038',
    accent: '#F2B134', accentHover: '#D99A20',
    background: '#FDF8F0', foreground: '#2D2424',
    foregroundMuted: '#5C4A4A', muted: '#EDE4D8', mutedLight: '#F0D9C4',
  },
  minimal: {
    label: 'Minimalist',
    primary: '#111111', primaryHover: '#333333',
    secondary: '#666666', secondaryHover: '#555555',
    accent: '#0066FF', accentHover: '#0052CC',
    background: '#FAFAFA', foreground: '#111111',
    foregroundMuted: '#666666', muted: '#E5E5E5', mutedLight: '#F0F0F0',
  },
};

// Font presets
const FONT_PRESETS = {
  cormorant: {
    label: 'Cormorant Garamond (Elegant Serif)',
    importName: 'Cormorant_Garamond',
    css: "'Cormorant Garamond', Georgia, serif",
    weightConfig: "weight: ['300', '400', '500', '600', '700'],",
  },
  playfair: {
    label: 'Playfair Display (Bold Serif)',
    importName: 'Playfair_Display',
    css: "'Playfair Display', Georgia, serif",
    weightConfig: "weight: ['400', '500', '600', '700'],",
  },
  inter: {
    label: 'Inter (Modern Sans)',
    importName: 'Inter',
    css: "'Inter', system-ui, sans-serif",
    weightConfig: "weight: ['300', '400', '500', '600', '700'],",
  },
  dm_sans: {
    label: 'DM Sans (Clean Sans)',
    importName: 'DM_Sans',
    css: "'DM Sans', system-ui, sans-serif",
    weightConfig: "weight: ['400', '500', '600', '700'],",
  },
};

async function main() {
  console.log('\n🌟 Astral System — New Client Wizard\n');

  // 1. Client name
  const clientName = await input({
    message: 'Client name:',
    validate: (v) => v.length > 0 || 'Required',
  });

  // 2. Slug
  const defaultSlug = clientName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const slug = await input({
    message: 'Project slug:',
    default: defaultSlug,
    validate: (v) => /^[a-z0-9-]+$/.test(v) || 'Only lowercase letters, numbers, and hyphens',
  });

  // 3. Domain
  const domain = await input({
    message: 'Domain:',
    default: `${slug}.com`,
  });

  // 4. Email
  const email = await input({
    message: 'Contact email:',
    default: `hello@${domain}`,
  });

  // 5. Tagline
  const tagline = await input({
    message: 'Tagline:',
    default: `${clientName} — Your Journey Starts Here`,
  });

  // 6. Color scheme
  const colorChoice = await select({
    message: 'Color scheme:',
    choices: [
      ...Object.entries(COLOR_PRESETS).map(([key, val]) => ({
        value: key,
        name: val.label,
      })),
      { value: 'custom', name: 'Custom (enter hex values)' },
    ],
  });

  let colors;
  if (colorChoice === 'custom') {
    const primary = await input({ message: 'Primary color (hex):', default: '#2D4A3E' });
    const accent = await input({ message: 'Accent color (hex):', default: '#C9A961' });
    colors = {
      primary, primaryHover: darken(primary),
      secondary: '#8B7355', secondaryHover: '#6B5344',
      accent, accentHover: darken(accent),
      background: '#F5F1EB', foreground: '#2C2C2C',
      foregroundMuted: '#4A4A4A', muted: '#E8E2D9', mutedLight: '#D4C9B8',
    };
  } else {
    colors = COLOR_PRESETS[colorChoice];
  }

  // 7. Font
  const fontChoice = await select({
    message: 'Heading font:',
    choices: Object.entries(FONT_PRESETS).map(([key, val]) => ({
      value: key,
      name: val.label,
    })),
  });
  const font = FONT_PRESETS[fontChoice];

  // 8. Include Sanity?
  const hasSanity = await confirm({ message: 'Include Sanity CMS?', default: true });

  // 9. Include blog?
  const hasBlog = await confirm({ message: 'Include blog?', default: true });

  // 10. Include application form?
  const hasApplication = await confirm({ message: 'Include application form?', default: false });

  // --- Generate ---
  console.log(`\n📁 Creating ${slug}...`);

  const targetDir = join(APPS_DIR, slug);
  if (existsSync(targetDir)) {
    console.error(`❌ Directory apps/${slug} already exists!`);
    process.exit(1);
  }

  // Copy template
  cpSync(TEMPLATE_DIR, targetDir, { recursive: true });

  // Replace template variables in all files
  const replacements = {
    '{{CLIENT_NAME}}': clientName,
    '{{SLUG}}': slug,
    '{{DOMAIN}}': domain,
    '{{EMAIL}}': email,
    '{{TAGLINE}}': tagline,
    '{{PRIMARY_COLOR}}': colors.primary,
    '{{PRIMARY_HOVER}}': colors.primaryHover,
    '{{SECONDARY_COLOR}}': colors.secondary,
    '{{SECONDARY_HOVER}}': colors.secondaryHover,
    '{{ACCENT_COLOR}}': colors.accent,
    '{{ACCENT_HOVER}}': colors.accentHover,
    '{{BACKGROUND}}': colors.background,
    '{{FOREGROUND}}': colors.foreground,
    '{{FOREGROUND_MUTED}}': colors.foregroundMuted,
    '{{MUTED}}': colors.muted,
    '{{MUTED_LIGHT}}': colors.mutedLight,
    '{{FONT_HEADING}}': font.css,
    '{{FONT_BODY}}': "'Inter', system-ui, sans-serif",
    '{{FONT_IMPORT_NAME}}': font.importName,
    '{{FONT_WEIGHT_CONFIG}}': font.weightConfig,
    '{{FONT_HEADING_NAME}}': font.label,
    '{{HAS_SANITY}}': hasSanity ? 'Yes' : 'No',
    '{{HAS_BLOG}}': hasBlog ? 'Yes' : 'No',
    '{{HAS_APPLICATION}}': hasApplication ? 'Yes' : 'No',
  };

  replaceInDirectory(targetDir, replacements);

  // Remove blog if not needed
  if (!hasBlog) {
    const blogDir = join(targetDir, 'src', 'app', 'blog');
    if (existsSync(blogDir)) rmSync(blogDir, { recursive: true });
  }

  // Run pnpm install
  console.log('📦 Installing dependencies...');
  try {
    execSync('pnpm install', { cwd: ROOT, stdio: 'inherit' });
  } catch {
    console.log('⚠️  pnpm install had issues — you may need to run it manually.');
  }

  // Generate CLIENT.md
  console.log('📝 Generated CLIENT.md');

  console.log(`
✅ ${clientName} created at apps/${slug}/

Next steps:
  1. cd apps/${slug}
  2. Copy .env.example to .env.local and fill in values
  3. Add hero images to public/images/
  4. pnpm dev --filter @astral/${slug}
`);
}

// --- Helpers ---

function darken(hex) {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = Math.max(0, ((num >> 16) & 0xFF) - 30);
  const g = Math.max(0, ((num >> 8) & 0xFF) - 30);
  const b = Math.max(0, (num & 0xFF) - 30);
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}

function replaceInDirectory(dir, replacements) {
  const entries = readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === '.next') continue;
      replaceInDirectory(fullPath, replacements);
    } else if (isTextFile(entry.name)) {
      let content = readFileSync(fullPath, 'utf-8');
      let changed = false;
      for (const [placeholder, value] of Object.entries(replacements)) {
        if (content.includes(placeholder)) {
          content = content.replaceAll(placeholder, value);
          changed = true;
        }
      }
      if (changed) writeFileSync(fullPath, content);
    }
  }
}

function isTextFile(name) {
  const textExts = ['.ts', '.tsx', '.js', '.mjs', '.jsx', '.json', '.css', '.md', '.html', '.env', '.example', '.mts'];
  return textExts.some(ext => name.endsWith(ext));
}

main().catch(console.error);
