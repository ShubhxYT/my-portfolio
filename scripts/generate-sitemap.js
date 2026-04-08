import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const DOMAIN = 'https://shubhsomani.tech';

const routes = [
  {
    path: '/',
    changefreq: 'weekly',
    priority: '1.0',
    label: 'Home'
  },
  {
    path: '/about',
    changefreq: 'monthly',
    priority: '0.9',
    label: 'About'
  },
  {
    path: '/career',
    changefreq: 'monthly',
    priority: '0.8',
    label: 'Career'
  },
  {
    path: '/whatido',
    changefreq: 'monthly',
    priority: '0.8',
    label: 'What I Do'
  },
  {
    path: '/techstack',
    changefreq: 'monthly',
    priority: '0.8',
    label: 'Tech Stack'
  },
  {
    path: '/work',
    changefreq: 'weekly',
    priority: '0.9',
    label: 'Work'
  },
  {
    path: '/contact',
    changefreq: 'yearly',
    priority: '0.7',
    label: 'Contact'
  }
];

const getCurrentDate = () => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};

const generateSitemap = () => {
  const date = getCurrentDate();
  
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  routes.forEach(route => {
    xml += '  <url>\n';
    xml += `    <loc>${DOMAIN}${route.path}</loc>\n`;
    xml += `    <lastmod>${date}</lastmod>\n`;
    xml += `    <changefreq>${route.changefreq}</changefreq>\n`;
    xml += `    <priority>${route.priority}</priority>\n`;
    xml += '  </url>\n';
  });
  
  xml += '</urlset>';
  
  return xml;
};

const buildDir = path.join(__dirname, '../dist');
if (!fs.existsSync(buildDir)) {
  fs.mkdirSync(buildDir, { recursive: true });
}

const sitemapPath = path.join(buildDir, 'sitemap.xml');
const sitemap = generateSitemap();

fs.writeFileSync(sitemapPath, sitemap);
console.log(`✓ Sitemap generated at ${sitemapPath}`);
