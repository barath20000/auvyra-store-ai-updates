export type CategoryId = 'career' | 'money' | 'skills' | 'growth' | 'children' | 'arts'
export type Format = 'ebook' | 'template' | 'guide' | 'storybook' | 'artbook' | 'workbook'
export type BookLanguage = 'en' | 'ta' | 'both'
export type ProductType = 'digital' | 'physical' | 'both'
export type BookEdition = 'digital' | 'physical'

export interface Category {
  id: CategoryId
  name: string
  nameTa: string
  blurb: string
  blurbTa: string
}

export const categories: Array<Category> = [
  {
    id: 'career',
    name: 'Education & Career',
    nameTa: 'கல்வி & தொழில்',
    blurb: 'Study, jobs and professional growth',
    blurbTa: 'படிப்பு, வேலை மற்றும் தொழில் வளர்ச்சி',
  },
  {
    id: 'money',
    name: 'Money & Business',
    nameTa: 'பணம் & வணிகம்',
    blurb: 'Budgeting and business basics',
    blurbTa: 'பட்ஜெட் மற்றும் வணிக அடிப்படைகள்',
  },
  {
    id: 'skills',
    name: 'Technology & Skills',
    nameTa: 'தொழில்நுட்பம் & திறன்கள்',
    blurb: 'Digital tools and practical skills',
    blurbTa: 'டிஜிட்டல் கருவிகள் மற்றும் நடைமுறைத் திறன்கள்',
  },
  {
    id: 'growth',
    name: 'Lifestyle & Personal Growth',
    nameTa: 'வாழ்க்கை முறை & வளர்ச்சி',
    blurb: 'Habits and personal development',
    blurbTa: 'பழக்கங்கள் மற்றும் தனிப்பட்ட முன்னேற்றம்',
  },
  {
    id: 'children',
    name: 'Children & Storybooks',
    nameTa: 'சிறுவர் & கதைப் புத்தகங்கள்',
    blurb: 'Illustrated stories and learning books',
    blurbTa: 'வண்ணப் படக் கதைகள் மற்றும் கற்றல் நூல்கள்',
  },
  {
    id: 'arts',
    name: 'Art, Drawing & Painting',
    nameTa: 'வரைதல் & ஓவியக் கலை',
    blurb: 'Sketching, painting and creative guides',
    blurbTa: 'ஓவியப் பயிற்சி, வரைதல் மற்றும் கைவினைக் கலை',
  },
]

export interface Product {
  id: number
  slug: string
  category: CategoryId
  format: Format
  language: BookLanguage
  coverWord: string
  name: string
  nameTa: string
  shortDescription: string
  shortDescriptionTa: string
  description: string
  descriptionTa: string
  includes: Array<string>
  includesTa: Array<string>
  pages: number
  /** Base/digital price in INR (whole rupees). Backward compatible */
  price: number
  /** Dedicated price for digital edition */
  digitalPrice: number
  /** Dedicated price for physical printed book (if available) */
  physicalPrice?: number
  /** Whether available as digital, physical, or both */
  productType: ProductType
  featured?: boolean
  coverImage?: string
  dimensions?: string
  isbn?: string
  weightGrams?: number
}

const products: Array<Product> = [
  {
    id: 1,
    slug: 'resume-starter-kit',
    category: 'career',
    format: 'template',
    language: 'both',
    coverWord: 'CAREER',
    name: 'Resume Starter Kit',
    nameTa: 'ரெஸ்யூம் தொடக்கக் கருவி',
    shortDescription:
      'Simple resume layouts and a checklist for first-time job seekers.',
    shortDescriptionTa:
      'முதல் முறை வேலை தேடுபவர்களுக்கான எளிய ரெஸ்யூம் வடிவங்கள் மற்றும் சரிபார்ப்புப் பட்டியல்.',
    description:
      'Five clean, recruiter-friendly resume layouts you can edit in Word or Google Docs, plus a step-by-step checklist that walks you through writing a strong summary, listing projects and tailoring your resume to each job.',
    descriptionTa:
      'Word அல்லது Google Docs-இல் திருத்தக்கூடிய ஐந்து தெளிவான ரெஸ்யூம் வடிவங்கள். வலுவான சுருக்கம் எழுதுவது, திட்டங்களைப் பட்டியலிடுவது மற்றும் ஒவ்வொரு வேலைக்கும் ஏற்ப மாற்றுவது பற்றிய வழிகாட்டி.',
    includes: ['5 editable resume layouts', 'Cover letter sample', 'Job-ready checklist'],
    includesTa: ['5 திருத்தக்கூடிய ரெஸ்யூம் வடிவங்கள்', 'கவர் லெட்டர் மாதிரி', 'வேலைக்குத் தயார் சரிபார்ப்புப் பட்டியல்'],
    pages: 24,
    price: 199,
    digitalPrice: 199,
    physicalPrice: 299,
    productType: 'both',
    dimensions: 'A4 Spiral Workbook',
    featured: true,
  },
  {
    id: 2,
    slug: 'interview-ready',
    category: 'career',
    format: 'guide',
    language: 'both',
    coverWord: 'INTERVIEW',
    name: 'Interview Ready',
    nameTa: 'நேர்காணலுக்குத் தயார்',
    shortDescription:
      'Common interview questions with clear sample answers in Tamil and English.',
    shortDescriptionTa:
      'பொதுவான நேர்காணல் கேள்விகளும் தெளிவான மாதிரி பதில்களும் — தமிழிலும் ஆங்கிலத்திலும்.',
    description:
      'Walk into your next interview with confidence. This guide covers the 50 most common questions, how to structure your answers, body language basics and a simple preparation plan for the week before.',
    descriptionTa:
      'அடுத்த நேர்காணலுக்கு நம்பிக்கையுடன் செல்லுங்கள். அதிகம் கேட்கப்படும் 50 கேள்விகள், பதில்களை அமைக்கும் முறை, உடல்மொழி அடிப்படைகள் மற்றும் ஒரு வார தயாரிப்புத் திட்டம் இதில் உள்ளன.',
    includes: ['50 questions with sample answers', 'One-week prep plan', 'HR round tips'],
    includesTa: ['மாதிரி பதில்களுடன் 50 கேள்விகள்', 'ஒரு வார தயாரிப்புத் திட்டம்', 'HR சுற்றுக்கான குறிப்புகள்'],
    pages: 68,
    price: 249,
    digitalPrice: 249,
    physicalPrice: 420,
    productType: 'both',
    dimensions: 'Paperback (5.5" x 8.5")',
  },
  {
    id: 3,
    slug: 'everyday-money-basics',
    category: 'money',
    format: 'ebook',
    language: 'ta',
    coverWord: 'MONEY',
    name: 'Everyday Money Basics',
    nameTa: 'அன்றாட பண அடிப்படைகள்',
    shortDescription:
      'A simple guide to budgeting, tracking expenses and building better money habits.',
    shortDescriptionTa:
      'பட்ஜெட், செலவுக் கண்காணிப்பு மற்றும் சிறந்த பணப் பழக்கங்களுக்கான எளிய வழிகாட்டி.',
    description:
      'Money made simple. Learn how to build a monthly budget, set up an emergency fund, understand savings options and avoid common debt traps — explained in plain, friendly language.',
    descriptionTa:
      'எளிமையாக்கப்பட்ட பண மேலாண்மை. மாதாந்திர பட்ஜெட் அமைப்பது, அவசர நிதி சேமிப்பது, சேமிப்பு வழிகளைப் புரிந்துகொள்வது மற்றும் கடன் சிக்கல்களைத் தவிர்ப்பது.',
    includes: ['Monthly budget worksheet', '30-day savings challenge', 'Expense tracker'],
    includesTa: ['மாதாந்திர பட்ஜெட் தாள்', '30 நாள் சேமிப்புச் சவால்', 'செலவுக் கண்காணிப்பு'],
    pages: 82,
    price: 179,
    digitalPrice: 179,
    physicalPrice: 360,
    productType: 'both',
    dimensions: 'Crown Octavo Paperback',
    featured: true,
  },
  {
    id: 4,
    slug: 'small-business-starter',
    category: 'money',
    format: 'template',
    language: 'en',
    coverWord: 'BUSINESS',
    name: 'Small Business Starter Pack',
    nameTa: 'சிறு வணிகத் தொடக்கத் தொகுப்பு',
    shortDescription:
      'Invoice, pricing and planning templates for your first small business.',
    shortDescriptionTa:
      'உங்கள் முதல் சிறு வணிகத்திற்கான விலைப்பட்டியல், விலை நிர்ணயம் மற்றும் திட்டமிடல் டெம்ப்ளேட்கள்.',
    description:
      'Everything you need to start selling with clarity: a one-page business plan, pricing calculator, invoice and quotation templates, and a simple sales tracker that works in Excel or Google Sheets.',
    descriptionTa:
      'தெளிவுடன் விற்பனையைத் தொடங்க தேவையானவை: ஒரு பக்க வணிகத் திட்டம், விலைக் கணிப்பான், விலைப்பட்டியல் மற்றும் மேற்கோள் டெம்ப்ளேட்கள்.',
    includes: ['One-page business plan', 'Invoice & quotation templates', 'Pricing calculator'],
    includesTa: ['ஒரு பக்க வணிகத் திட்டம்', 'விலைப்பட்டியல் & மேற்கோள் டெம்ப்ளேட்கள்', 'விலைக் கணிப்பான்'],
    pages: 18,
    price: 349,
    digitalPrice: 349,
    productType: 'digital',
  },
  {
    id: 5,
    slug: 'excel-for-beginners',
    category: 'skills',
    format: 'guide',
    language: 'both',
    coverWord: 'EXCEL',
    name: 'Excel for Beginners',
    nameTa: 'தொடக்கநிலையாளர்களுக்கான Excel',
    shortDescription:
      'Spreadsheets, simple formulas, shortcuts and practical examples.',
    shortDescriptionTa:
      'ஸ்ப்ரெட்ஷீட்கள், எளிய சூத்திரங்கள், குறுக்குவழிகள் மற்றும் நடைமுறை உதாரணங்கள்.',
    description:
      'Go from blank sheet to confident user. Learn formatting, SUM, IF and VLOOKUP, charts, filters and the keyboard shortcuts that save hours — with practice files for every chapter.',
    descriptionTa:
      'வெற்றுத் தாளிலிருந்து நம்பிக்கையான பயனராக மாறுங்கள். வடிவமைப்பு, SUM, IF, VLOOKUP, விளக்கப்படங்கள், வடிகட்டிகள் மற்றும் குறுக்குவழிகள்.',
    includes: ['12 illustrated chapters', 'Practice workbook', 'Shortcut cheat sheet'],
    includesTa: ['12 விளக்கப்பட அத்தியாயங்கள்', 'பயிற்சிப் புத்தகம்', 'குறுக்குவழிக் குறிப்புத் தாள்'],
    pages: 96,
    price: 299,
    digitalPrice: 299,
    physicalPrice: 499,
    productType: 'both',
    dimensions: 'Crown Quarto (7" x 10")',
    featured: true,
  },
  {
    id: 6,
    slug: 'ai-tools-everyday-work',
    category: 'skills',
    format: 'ebook',
    language: 'en',
    coverWord: 'AI',
    name: 'AI Tools for Everyday Work',
    nameTa: 'அன்றாட வேலைக்கான AI கருவிகள்',
    shortDescription:
      'Use AI assistants to write, plan and research faster — safely and clearly.',
    shortDescriptionTa:
      'AI உதவியாளர்களைப் பயன்படுத்தி வேகமாக எழுத, திட்டமிட, ஆராய — பாதுகாப்பாகவும் தெளிவாகவும்.',
    description:
      'A practical introduction to AI assistants for students and professionals. Learn how to write good prompts, check answers, draft emails and reports, and use AI responsibly at work and school.',
    descriptionTa:
      'மாணவர்கள் மற்றும் பணியாளர்களுக்கான AI உதவியாளர்கள் பற்றிய நடைமுறை அறிமுகம். நல்ல கேள்விகளை எழுதுவது, பதில்களைச் சரிபார்ப்பது, பொறுப்புடன் பயன்படுத்துவது.',
    includes: ['100 ready-to-use prompts', 'Fact-checking checklist', 'Workflow examples'],
    includesTa: ['100 பயன்படுத்தத் தயாரான கேள்விகள்', 'உண்மைச் சரிபார்ப்புப் பட்டியல்', 'பணிமுறை உதாரணங்கள்'],
    pages: 74,
    price: 279,
    digitalPrice: 279,
    physicalPrice: 450,
    productType: 'both',
    dimensions: 'Paperback (6" x 9")',
  },
  {
    id: 7,
    slug: 'build-better-habits',
    category: 'growth',
    format: 'ebook',
    language: 'both',
    coverWord: 'GROW',
    name: 'Build Better Habits',
    nameTa: 'சிறந்த பழக்கங்களை உருவாக்குங்கள்',
    shortDescription:
      'Practical ideas to organise your day and make steady progress.',
    shortDescriptionTa:
      'உங்கள் நாளை ஒழுங்கமைத்து நிலையான முன்னேற்றம் பெற நடைமுறை யோசனைகள்.',
    description:
      'Small changes, lasting results. Understand how habits form, design a morning routine that sticks, beat procrastination and track your progress with simple weekly reviews.',
    descriptionTa:
      'சிறிய மாற்றங்கள், நீடித்த பலன்கள். பழக்கங்கள் எப்படி உருவாகின்றன, நிலைக்கும் காலை வழக்கத்தை அமைப்பது, தள்ளிப்போடுதலை வெல்வது.',
    includes: ['21-day habit tracker', 'Morning routine planner', 'Weekly review pages'],
    includesTa: ['21 நாள் பழக்கக் கண்காணிப்பு', 'காலை வழக்கத் திட்டமிடல்', 'வாராந்திர மதிப்பாய்வுப் பக்கங்கள்'],
    pages: 64,
    price: 199,
    digitalPrice: 199,
    physicalPrice: 380,
    productType: 'both',
    dimensions: 'Paperback (5.5" x 8.5")',
    featured: true,
  },
  {
    id: 8,
    slug: 'daily-planner-journal',
    category: 'growth',
    format: 'template',
    language: 'both',
    coverWord: 'PLANNER',
    name: 'Daily Planner & Journal',
    nameTa: 'தினசரி திட்டமிடல் & நாட்குறிப்பு',
    shortDescription:
      'A printable and tablet-friendly planner for calm, focused days.',
    shortDescriptionTa:
      'அமைதியான, கவனமான நாட்களுக்கான அச்சிடக்கூடிய மற்றும் டேப்லெட்டுக்கு ஏற்ற திட்டமிடல்.',
    description:
      'An elegant undated planner with daily, weekly and monthly pages, gratitude prompts and goal-setting worksheets. Print it at home or use it on a tablet with any PDF annotation app.',
    descriptionTa:
      'தினசரி, வாராந்திர, மாதாந்திர பக்கங்கள், நன்றிக் குறிப்புகள் மற்றும் இலக்கு நிர்ணயத் தாள்களுடன் கூடிய நேர்த்தியான திட்டமிடல்.',
    includes: ['Daily, weekly & monthly pages', 'Goal-setting worksheets', 'Printable + tablet PDF'],
    includesTa: ['தினசரி, வாராந்திர & மாதாந்திர பக்கங்கள்', 'இலக்கு நிர்ணயத் தாள்கள்', 'அச்சு + டேப்லெட் PDF'],
    pages: 120,
    price: 149,
    digitalPrice: 149,
    physicalPrice: 349,
    productType: 'both',
    dimensions: 'Hardbound A5 Journal (100gsm Ivory Paper)',
  },
  /* NEW EXPANDED CATALOG: Arts, Drawing, Children's Storybooks & Educational Books */
  {
    id: 9,
    slug: 'creative-watercolor-painting-book',
    category: 'arts',
    format: 'artbook',
    language: 'both',
    coverWord: 'PAINTING',
    name: 'Creative Watercolor & Painting Book',
    nameTa: 'படைப்பு நீர்வண்ண ஓவியப் புத்தகம்',
    shortDescription:
      'Hands-on painting workbook with step-by-step landscape and botanical lessons.',
    shortDescriptionTa:
      'இயற்கைக் காட்சிகள் மற்றும் தாவர ஓவியங்களுக்கான படிப்படியான வழிகாட்டி நூல்.',
    description:
      'Master watercolor washes, pigment blending, and brush techniques. Includes 24 guided painting projects from beginner color gradients to vibrant botanical art, with dedicated practice pages in the physical printed edition.',
    descriptionTa:
      'நீர்வண்ணக் கலவை, தூரிகை உத்திகள் மற்றும் வண்ண நிழல்களைக் கற்றுக்கொள்ளுங்கள். தொடக்கநிலை முதல் மேம்பட்ட நிலை வரை 24 வழிகாட்டப்பட்ட ஓவியத் திட்டங்கள் அடங்கிய முழுமையான நூல்.',
    includes: ['24 guided painting projects', 'Color mixing chart', 'Brush stroke reference drills'],
    includesTa: ['24 வழிகாட்டப்பட்ட ஓவியத் திட்டங்கள்', 'வண்ணக் கலவை அட்டவணை', 'தூரிகைப் பயிற்சி வழிகாட்டி'],
    pages: 112,
    price: 249,
    digitalPrice: 249,
    physicalPrice: 499,
    productType: 'both',
    dimensions: 'A4 Lay-Flat Artbook (180gsm Cold-Pressed Watercolor Paper)',
    featured: true,
  },
  {
    id: 10,
    slug: 'master-pencil-sketching-drawing',
    category: 'arts',
    format: 'artbook',
    language: 'both',
    coverWord: 'DRAWING',
    name: 'Master Pencil Sketching & Drawing Book',
    nameTa: 'பென்சில் வரைதல் & ஸ்கெட்சிங் பயிற்சி நூல்',
    shortDescription:
      'Foundational shading, perspective, portrait, and freehand drawing exercises.',
    shortDescriptionTa:
      'அடிப்படை கோடுகள், நிழல் நுட்பங்கள் மற்றும் உருவ வரைதலுக்கான முழுமையான பயிற்சி.',
    description:
      'Discover the joy of drawing with graphite and charcoal. From basic geometric volume shading to realistic portraits, still life, and outdoor landscape sketching — with step-by-step grid guides.',
    descriptionTa:
      'கிராஃபைட் மற்றும் கரிக்கோல் கொண்டு வரையும் கலை. எளிய வடிவியல் நிழல்கள் முதல் தத்ரூபமான உருவப்படங்கள் மற்றும் நிலப்பரப்பு வரைதல் வரை.',
    includes: ['Over 60 drawing exercises', 'Tonal value guide', 'Perforated sketch practice sheets'],
    includesTa: ['60-க்கும் மேற்பட்ட வரைதல் பயிற்சிகள்', 'டோனல் வழிகாட்டி', 'பயிற்சித் தாள்கள்'],
    pages: 130,
    price: 199,
    digitalPrice: 199,
    physicalPrice: 429,
    productType: 'both',
    dimensions: 'A4 Spiral-Bound Drawing Book (130gsm Heavy Cartridge)',
    featured: true,
  },
  {
    id: 11,
    slug: 'tamil-illustrated-children-stories',
    category: 'children',
    format: 'storybook',
    language: 'both',
    coverWord: 'STORIES',
    name: 'Tamil Illustrated Storybook: Little Birds',
    nameTa: 'சிட்டுக் குருவிகள் — வண்ணப் படக் கதைகள்',
    shortDescription:
      'Richly illustrated bilingual fables and moral tales for young readers and parents.',
    shortDescriptionTa:
      'குழந்தைகளுக்கான நன்னெறிக் கதைகளும் வண்ணமயமான படங்களும் நிறைந்த கதைப் புத்தகம்.',
    description:
      'Bring stories alive! A heartwarming collection of 15 classic and contemporary illustrated moral tales designed for bedtime reading and early Tamil and English language fluency.',
    descriptionTa:
      'குழந்தைகளுக்கு வாசிப்புப் பழக்கத்தை வளர்க்கும் 15 அழகான தமிழ்க் கதைகள். எளிய நடை, கவர்ச்சிகரமான வண்ணப் படங்கள் மற்றும் சொல்லகராதியுடன் கூடிய பொக்கிஷம்.',
    includes: ['15 fully illustrated tales', 'Bilingual read-aloud prompts', 'Moral discussion questions'],
    includesTa: ['15 வண்ணமயமான கதைகள்', 'இருமொழி வாசிப்பு குறிப்புகள்', 'நன்னெறிக் கலந்துரையாடல்'],
    pages: 80,
    price: 179,
    digitalPrice: 179,
    physicalPrice: 399,
    productType: 'both',
    dimensions: '8.5" x 8.5" Hardcover Picture Book (150gsm Glossy Art Paper)',
    featured: true,
  },
  {
    id: 12,
    slug: 'little-explorers-science-activity',
    category: 'children',
    format: 'workbook',
    language: 'both',
    coverWord: 'EXPLORER',
    name: 'Little Explorers Science & Logic Book',
    nameTa: 'சிறு ஆய்வாளர் அறிவியல் & சிந்தனைப் புத்தகம்',
    shortDescription:
      'Hands-on STEM puzzles, nature discoveries, and pattern logic for curious minds.',
    shortDescriptionTa:
      'குழந்தைகளின் மூளை வளர்ச்சிக்கும் அறிவியல் சிந்தனைக்கும் உதவும் செயல்முறைப் புத்தகம்.',
    description:
      'Inspire the young scientist! Over 50 playful activities exploring plants, stars, water cycles, simple machines, and logic mazes in both English and Tamil.',
    descriptionTa:
      'விளையாட்டு வழியில் அறிவியல் மற்றும் கணித தர்க்கங்களை கற்பிக்கும் 50-க்கும் மேற்பட்ட சுவாரஸ்யமான பயிற்சிகள் மற்றும் புதிர்கள்.',
    includes: ['50 interactive activity pages', 'Cut-and-paste science projects', 'Sticker badges included'],
    includesTa: ['50 செயல்முறைப் பக்கங்கள்', 'அறிவியல் திட்டங்கள்', 'பாராட்டு பேட்ஜ்கள்'],
    pages: 92,
    price: 199,
    digitalPrice: 199,
    physicalPrice: 369,
    productType: 'both',
    dimensions: 'Crown Quarto Activity Workbook',
  },
  {
    id: 13,
    slug: 'tamil-calligraphy-handwriting-book',
    category: 'arts',
    format: 'artbook',
    language: 'ta',
    coverWord: 'CALLIGRAPHY',
    name: 'Tamil Calligraphy & Handwriting Workbook',
    nameTa: 'அழகிய தமிழ் கையெழுத்துப் பயிற்சி நூல்',
    shortDescription:
      'Stroke-order diagrams, cursive flourishes, and calligraphy practice pages.',
    shortDescriptionTa:
      'நேர்த்தியான தமிழ் எழுத்துக்களை எழுத உதவும் வரைகலை மற்றும் கையெழுத்துப் பயிற்சி.',
    description:
      'Learn the ancient elegance of Tamil script. Features guidelines for traditional and modern calligraphy pens, stroke sequences, spacing harmony, and poetic quotes for daily practice.',
    descriptionTa:
      'தமிழ் எழுத்துக்களை அழகாகவும் நேர்த்தியாகவும் எழுத வழிகாட்டும் பயிற்சி நூல். ஸ்ட்ரோக் வரிசைகள், பேனா பயன்பாட்டு முறைகள் மற்றும் பயிற்சித் தாள்கள் அடங்கியது.',
    includes: ['Stroke sequence charts', 'Ruling guidelines', 'Calligraphic proverb templates'],
    includesTa: ['எழுத்து வரிசை விளக்கப்படங்கள்', 'பயிற்சி வரிகள்', 'பொன்மொழி வார்ப்புருக்கள்'],
    pages: 88,
    price: 149,
    digitalPrice: 149,
    physicalPrice: 299,
    productType: 'both',
    dimensions: 'A4 Landscape Bound Workbook',
  },
  {
    id: 14,
    slug: 'visual-math-mental-shortcuts',
    category: 'career',
    format: 'guide',
    language: 'both',
    coverWord: 'MATH',
    name: 'Visual Math & Speed Calculation Guide',
    nameTa: 'காட்சி வழி கணிதமும் மனக்கணக்கு நுட்பங்களும்',
    shortDescription:
      'Vedic and visual math tricks for students, competitive exams, and daily calculations.',
    shortDescriptionTa:
      'மாணவர்களுக்கும் போட்டித் தேர்வுகளுக்கும் உதவும் விரைவுக் கணித எளிய உத்திகள்.',
    description:
      'Never fear numbers again! Visual explanations of multiplication shortcuts, percentage tricks, square roots in seconds, and practical estimation drills for students and competitive exam aspirants.',
    descriptionTa:
      'எண்களை எளிதாகக் கையாளுங்கள்! பெருக்கல் குறுக்குவழிகள், சதவீதக் கணக்குகள் மற்றும் விரைவுக் கணித உத்திகள் விளக்கப் படங்களுடன்.',
    includes: ['30 speed calculation formulas', '100 timed drills', 'Formula memory card'],
    includesTa: ['30 விரைவுக் கணித சூத்திரங்கள்', '100 நேரப் பயிற்சிகள்', 'நினைவு அட்டை'],
    pages: 104,
    price: 229,
    digitalPrice: 229,
    physicalPrice: 440,
    productType: 'both',
    dimensions: 'Royal 8vo Paperback',
  },
]

export function getProduct(id: number) {
  return products.find((p) => p.id === id)
}

export function formatPrice(rupees: number) {
  return `₹${rupees.toLocaleString('en-IN')}`
}

export function getPrice(product: Product, edition: BookEdition = 'digital'): number {
  if (edition === 'physical' && product.physicalPrice) {
    return product.physicalPrice
  }
  return product.digitalPrice ?? product.price
}

export function hasDigitalEdition(product: Product): boolean {
  return product.productType === 'digital' || product.productType === 'both'
}

export function hasPhysicalEdition(product: Product): boolean {
  return (product.productType === 'physical' || product.productType === 'both') && !!product.physicalPrice
}

export default products
