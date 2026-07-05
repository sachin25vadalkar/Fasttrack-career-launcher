export interface CareerPath {
  title: string;
  tagline: string;
  skills: string[];
}

export interface Qualification {
  id: string;
  label: string;
  fullForm: string;
  category: string;
  paths: CareerPath[];
}

export const QUALIFICATIONS: Qualification[] = [
  {
    id: 'btech',
    label: 'B.Tech / B.E.',
    fullForm: 'Bachelor of Technology / Bachelor of Engineering',
    category: 'Engineering',
    paths: [
      {
        title: 'Software Development Engineer',
        tagline: 'Building products used by millions',
        skills: ['Data Structures & Algorithms', 'Git & Version Control', 'REST API Design', 'Unit Testing', 'System Design Basics', 'SQL Fundamentals', 'CI/CD Pipelines'],
      },
      {
        title: 'Cloud & DevOps Engineer',
        tagline: 'Keeping infrastructure fast and resilient',
        skills: ['Linux Administration', 'Docker & Containers', 'Kubernetes', 'AWS or Azure Fundamentals', 'Infrastructure as Code', 'Monitoring & Observability', 'Shell Scripting'],
      },
      {
        title: 'Data Engineer',
        tagline: 'Wrangling pipelines that feed every decision',
        skills: ['SQL & Data Modeling', 'Python for Data', 'ETL Pipeline Design', 'Apache Spark', 'Data Warehousing', 'Workflow Orchestration', 'Cloud Storage Systems'],
      },
    ],
  },
  {
    id: 'bca',
    label: 'BCA',
    fullForm: 'Bachelor of Computer Applications',
    category: 'Computer Applications',
    paths: [
      {
        title: 'Full-Stack Web Developer',
        tagline: 'Shipping end-to-end web experiences',
        skills: ['HTML/CSS/JavaScript', 'React or Vue', 'Node.js & Express', 'Database Design', 'API Integration', 'Responsive Design', 'Deployment Basics'],
      },
      {
        title: 'QA & Test Automation Engineer',
        tagline: 'Guarding quality before customers ever see a bug',
        skills: ['Manual Testing Fundamentals', 'Selenium or Playwright', 'Test Case Design', 'API Testing (Postman)', 'Bug Tracking Tools', 'Basic Scripting (Python/JS)', 'Agile/Scrum Basics'],
      },
    ],
  },
  {
    id: 'bsc',
    label: 'B.Sc',
    fullForm: 'Bachelor of Science',
    category: 'Science',
    paths: [
      {
        title: 'Data Analyst',
        tagline: 'Turning raw numbers into clear decisions',
        skills: ['Excel & Spreadsheets', 'SQL Querying', 'Statistics Fundamentals', 'Data Visualization (Power BI/Tableau)', 'Python or R', 'Storytelling with Data', 'A/B Testing Basics'],
      },
      {
        title: 'Research & Lab Technician',
        tagline: 'Precision work behind every scientific breakthrough',
        skills: ['Laboratory Safety Protocols', 'Sample Handling', 'Instrumentation Calibration', 'Data Recording Standards', 'Statistical Analysis', 'Technical Report Writing', 'Regulatory Compliance Basics'],
      },
    ],
  },
  {
    id: 'bcom',
    label: 'B.Com',
    fullForm: 'Bachelor of Commerce',
    category: 'Commerce',
    paths: [
      {
        title: 'Financial Analyst',
        tagline: 'Reading markets and company health fluently',
        skills: ['Financial Statement Analysis', 'Excel Modeling', 'Valuation Basics', 'Accounting Standards (GAAP/IFRS)', 'Bloomberg or similar terminals', 'Corporate Finance Fundamentals', 'Presentation & Reporting'],
      },
      {
        title: 'Investment Banking Analyst',
        tagline: 'Structuring the deals that move capital',
        skills: ['Financial Modeling', 'DCF & Comparable Valuation', 'PowerPoint / Pitch Decks', 'M&A Fundamentals', 'Market Research', 'Excel Advanced Functions', 'Attention to Detail under Deadlines'],
      },
    ],
  },
  {
    id: 'bba',
    label: 'BBA',
    fullForm: 'Bachelor of Business Administration',
    category: 'Management',
    paths: [
      {
        title: 'Business Analyst',
        tagline: 'Bridging what the business needs and what tech builds',
        skills: ['Requirements Gathering', 'Process Mapping', 'SQL Basics', 'Stakeholder Communication', 'Excel & Dashboards', 'Agile Fundamentals', 'Documentation Standards'],
      },
      {
        title: 'Digital Marketing Strategist',
        tagline: 'Growing brands across every channel that matters',
        skills: ['SEO Fundamentals', 'Paid Ads (Google/Meta)', 'Analytics (GA4)', 'Content Strategy', 'Email Marketing Automation', 'Social Media Strategy', 'Copywriting Basics'],
      },
    ],
  },
  {
    id: 'ba',
    label: 'B.A.',
    fullForm: 'Bachelor of Arts',
    category: 'Arts & Humanities',
    paths: [
      {
        title: 'Content Strategist',
        tagline: 'Shaping how brands speak to the world',
        skills: ['Long-form Writing', 'SEO Writing Basics', 'Editorial Planning', 'Audience Research', 'Basic Analytics Reading', 'Style Guide Adherence', 'Cross-team Collaboration'],
      },
      {
        title: 'UX Research Associate',
        tagline: 'Making sure products are built around real people',
        skills: ['User Interview Techniques', 'Survey Design', 'Qualitative Data Analysis', 'Usability Testing', 'Persona Development', 'Basic Figma Familiarity', 'Research Synthesis & Reporting'],
      },
    ],
  },
  {
    id: 'bpharm',
    label: 'B.Pharm',
    fullForm: 'Bachelor of Pharmacy',
    category: 'Pharmacy & Life Sciences',
    paths: [
      {
        title: 'Clinical Research Associate',
        tagline: 'Making sure new treatments are safe and proven',
        skills: ['Good Clinical Practice (GCP)', 'Clinical Trial Documentation', 'Regulatory Submission Basics', 'Medical Terminology', 'Data Integrity Standards', 'Site Monitoring Fundamentals', 'Report Writing'],
      },
      {
        title: 'Regulatory Affairs Specialist',
        tagline: 'Navigating the rules that get medicines to market',
        skills: ['Drug Approval Processes', 'Dossier Compilation', 'Pharmacovigilance Basics', 'Global Regulatory Frameworks', 'Technical Writing', 'Quality Management Systems', 'Cross-functional Coordination'],
      },
    ],
  },
  {
    id: 'llb',
    label: 'LLB',
    fullForm: 'Bachelor of Legislative Law',
    category: 'Law',
    paths: [
      {
        title: 'Corporate Legal Associate',
        tagline: 'Protecting business decisions with sound counsel',
        skills: ['Contract Drafting', 'Corporate Law Fundamentals', 'Legal Research', 'Compliance Frameworks', 'Negotiation Basics', 'Due Diligence Process', 'Legal Documentation Tools'],
      },
      {
        title: 'IP & Compliance Analyst',
        tagline: 'Guarding ideas and keeping companies on the right side of the law',
        skills: ['Intellectual Property Law Basics', 'Patent & Trademark Filing', 'Regulatory Risk Assessment', 'Policy Analysis', 'Legal Research Databases', 'Report Writing', 'Cross-border Compliance Awareness'],
      },
    ],
  },
];
