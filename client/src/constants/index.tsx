import { Bell, LayoutDashboard, MessageCircle, User } from "lucide-react";

// ===============================
// Navbar Links
// ===============================
export const SeekersNavbarLinks = [
  {
    id: "1",
    title: "Find Jobs",
    href: "/",
  },
  {
    id: "3",
    title: "Find Companies",
    href: "/companies",
  },
  {
    id: "4",
    title: "Find Events",
    href: "/events",
  },
];

export const EmployersNavbarLinks = [
  {
    id: "3",
    title: "Find Seekers",
    href: "/seekers",
  },
];

// ===============================
// Navbar Actions
// ===============================
export const SeekersNavbarActions = [
  {
    id: "1",
    href: "/messages",
    icon: <MessageCircle />,
  },
  {
    id: "2",
    href: "/notifications",
    icon: <Bell />,
  },
  {
    id: "3",
    href: "/profile",
    icon: <User />,
  },
];

export const EmployersNavbarActions = [
  {
    id: "3",
    href: "/dashboard",
    icon: <LayoutDashboard />,
  },
];

// ===============================
// Footer Links
// ===============================
export const FooterLinks = [
  {
    id: "1",
    title: "Pages",
    links: [
      { id: "1", name: "Home", href: "/" },
      { id: "2", name: "About", href: "/about" },
      { id: "3", name: "Contact Us", href: "/contact" },
    ],
  },
  {
    id: "2",
    title: "Policies",
    links: [
      { id: "1", name: "Privacy Policy", href: "/privacy-policy" },
      { id: "2", name: "Terms and Conditions", href: "/terms-and-conditions" },
      { id: "3", name: "Agreements", href: "/agreements" },
    ],
  },
  {
    id: "3",
    title: "Reference",
    links: [
      { id: "1", name: "Privacy Policy", href: "/privacy-policy" },
      { id: "2", name: "Terms and Conditions", href: "/terms-and-conditions" },
      { id: "3", name: "Agreements", href: "/agreements" },
    ],
  },
];

// ===============================
// Dropdown Options
// ===============================
export const companySizes = [
  { value: "less-than-17", label: "Less than 17" },
  { value: "20-50", label: "20-50" },
  { value: "50-100", label: "50-100" },
  { value: "100-250", label: "100-250" },
  { value: "250-500", label: "250-500" },
  { value: "500-1000", label: "500-1000" },
];

export const industries = [
  { value: "technology", label: "Technology" },
  { value: "healthcare", label: "Healthcare" },
  { value: "finance", label: "Finance" },
  { value: "education", label: "Education" },
  { value: "manufacturing", label: "Manufacturing" },
  { value: "retail", label: "Retail" },
  { value: "hospitality", label: "Hospitality" },
  { value: "automotive", label: "Automotive" },
  { value: "construction", label: "Construction" },
  { value: "media", label: "Media" },
  { value: "marketing", label: "Marketing" },
  { value: "telecommunications", label: "Telecommunications" },
  { value: "government", label: "Government" },
  { value: "nonprofit", label: "Nonprofit" },
  { value: "other", label: "Other" },
];

export const locations = [
  { label: "Australia", value: "aus" },
  { label: "England", value: "eng" },
  { label: "Turkiye", value: "tur" },
  { label: "Germany", value: "ger" },
  { label: "Spain", value: "spa" },
  { label: "France", value: "fra" },
];

// ===============================
// Filters Data
// ===============================
export const EventsFiltersData = [
  {
    id: "1",
    title: "Category",
    data: [
      { id: "1", title: "Technology", value: "Technology", type: "category" },
      { id: "2", title: "Finance", value: "Finance", type: "category" },
      { id: "3", title: "Marketing", value: "Marketing", type: "category" },
      { id: "4", title: "Sales", value: "Sales", type: "category" },
    ],
  },
  {
    id: "2",
    title: "Location",
    data: [
      { id: "1", title: "Online", value: "Online", type: "location" },
      { id: "2", title: "In Person", value: "InPerson", type: "location" },
      { id: "3", title: "Hybrid", value: "Hybrid", type: "location" },
      { id: "4", title: "Virtual", value: "Virtual", type: "location" },
      { id: "5", title: "Outdoor", value: "Outdoor", type: "location" },
      { id: "6", title: "Indoor", value: "Indoor", type: "location" },
    ],
  },
];

export const JobsFiltersData = [
  {
    id: "1",
    title: "Job Type",
    data: [
      { id: "1", title: "Internship", value: "Internship", type: "type" },
      { id: "2", title: "Full-Time", value: "Full-Time", type: "type" },
      { id: "3", title: "Part-Time", value: "Part-Time", type: "type" },
      { id: "4", title: "Freelance", value: "Freelance", type: "type" },
    ],
  },
  {
    id: "2",
    title: "Seniority",
    data: [
      { id: "1", title: "Junior", value: "Junior", type: "seniority" },
      { id: "2", title: "Medior", value: "Medior", type: "seniority" },
      { id: "3", title: "Senior", value: "Senior", type: "seniority" },
      { id: "4", title: "Lead", value: "Lead", type: "seniority" },
    ],
  },
  {
    id: "3",
    title: "Salary Range",
    data: [
      { id: "1", title: "30 000$", value: "0-30000", type: "salaryRange" },
      {
        id: "2",
        title: "30 000$ - 50 000$",
        value: "30000-50000",
        type: "salaryRange",
      },
      {
        id: "3",
        title: "50 000$ - 70 000$",
        value: "50000-70000",
        type: "salaryRange",
      },
      {
        id: "4",
        title: "70 000$ - 100 000$",
        value: "70000-100000",
        type: "salaryRange",
      },
      {
        id: "5",
        title: "100 000$ - 160 000$",
        value: "100000-160000",
        type: "salaryRange",
      },
      {
        id: "6",
        title: "160 000$ >",
        value: "160000-170000",
        type: "salaryRange",
      },
    ],
  },
  {
    id: "4",
    title: "Position",
    data: [
      { id: "1", title: "Hybrid", value: "Hybrid", type: "position" },
      { id: "2", title: "On-Site", value: "On-site", type: "position" },
      { id: "3", title: "Remote", value: "Remote", type: "position" },
    ],
  },
];

export const SeekersFiltersData = [];

// ===============================
// Skills Information Data
// ===============================
export const SkillsInformationsData = [
  {
    id: "1",
    category: "Databases",
    data: [
      { id: "1", title: "MySQL", value: "mysql", type: "skills" },
      { id: "2", title: "PostgreSQL", value: "postgresql", type: "skills" },
      { id: "3", title: "MongoDB", value: "mongodb", type: "skills" },
      { id: "4", title: "SQLite", value: "sqlite", type: "skills" },
      { id: "5", title: "Oracle", value: "oracle", type: "skills" },
      { id: "6", title: "SQL Server", value: "sqlserver", type: "skills" },
      { id: "7", title: "Redis", value: "redis", type: "skills" },
      { id: "8", title: "Cassandra", value: "cassandra", type: "skills" },
      { id: "9", title: "Firebase", value: "firebase", type: "skills" },
      {
        id: "10",
        title: "Elasticsearch",
        value: "elasticsearch",
        type: "skills",
      },
      { id: "11", title: "DynamoDB", value: "dynamodb", type: "skills" },
      { id: "12", title: "Couchbase", value: "couchbase", type: "skills" },
      { id: "13", title: "MariaDB", value: "mariadb", type: "skills" },
      { id: "14", title: "Neo4j", value: "neo4j", type: "skills" },
    ],
  },
  {
    id: "2",
    category: "Programming Languages",
    data: [
      { id: "1", title: "JavaScript", value: "javascript", type: "skills" },
      { id: "2", title: "Python", value: "python", type: "skills" },
      { id: "3", title: "Java", value: "java", type: "skills" },
      { id: "4", title: "C#", value: "csharp", type: "skills" },
      { id: "5", title: "C++", value: "cplusplus", type: "skills" },
      { id: "6", title: "Ruby", value: "ruby", type: "skills" },
      { id: "7", title: "PHP", value: "php", type: "skills" },
      { id: "8", title: "Go", value: "go", type: "skills" },
      { id: "9", title: "Swift", value: "swift", type: "skills" },
      { id: "10", title: "Kotlin", value: "kotlin", type: "skills" },
      { id: "11", title: "Rust", value: "rust", type: "skills" },
      { id: "12", title: "TypeScript", value: "typescript", type: "skills" },
      { id: "13", title: "Perl", value: "perl", type: "skills" },
      { id: "14", title: "Scala", value: "scala", type: "skills" },
      { id: "15", title: "Dart", value: "dart", type: "skills" },
      { id: "16", title: "R", value: "r", type: "skills" },
      { id: "17", title: "Objective-C", value: "objective-c", type: "skills" },
      { id: "18", title: "Shell Scripting", value: "shell", type: "skills" },
    ],
  },
  {
    id: "3",
    category: "Web Development",
    data: [
      { id: "1", title: "HTML", value: "html", type: "skills" },
      { id: "2", title: "CSS", value: "css", type: "skills" },
      { id: "3", title: "JavaScript", value: "javascript", type: "skills" },
      { id: "4", title: "React", value: "react", type: "skills" },
      { id: "5", title: "Angular", value: "angular", type: "skills" },
      { id: "6", title: "Vue.js", value: "vuejs", type: "skills" },
      { id: "7", title: "Node.js", value: "nodejs", type: "skills" },
      { id: "8", title: "Express.js", value: "expressjs", type: "skills" },
      {
        id: "9",
        title: "Ruby on Rails",
        value: "ruby-on-rails",
        type: "skills",
      },
      { id: "10", title: "Django", value: "django", type: "skills" },
      { id: "11", title: "Flask", value: "flask", type: "skills" },
      { id: "12", title: "ASP.NET", value: "aspnet", type: "skills" },
      { id: "13", title: "Spring Boot", value: "springboot", type: "skills" },
      { id: "14", title: "Laravel", value: "laravel", type: "skills" },
      { id: "15", title: "Bootstrap", value: "bootstrap", type: "skills" },
      { id: "16", title: "Tailwind CSS", value: "tailwindcss", type: "skills" },
      { id: "17", title: "SASS", value: "sass", type: "skills" },
      { id: "18", title: "jQuery", value: "jquery", type: "skills" },
      { id: "19", title: "WordPress", value: "wordpress", type: "skills" },
      { id: "20", title: "Magento", value: "magento", type: "skills" },
    ],
  },
  {
    id: "4",
    category: "Cloud Platforms",
    data: [
      { id: "1", title: "AWS", value: "aws", type: "skills" },
      { id: "2", title: "Microsoft Azure", value: "azure", type: "skills" },
      { id: "3", title: "Google Cloud Platform", value: "gcp", type: "skills" },
      { id: "4", title: "IBM Cloud", value: "ibmcloud", type: "skills" },
      { id: "5", title: "Oracle Cloud", value: "oraclecloud", type: "skills" },
      { id: "6", title: "Heroku", value: "heroku", type: "skills" },
      { id: "7", title: "DigitalOcean", value: "digitalocean", type: "skills" },
      {
        id: "8",
        title: "Alibaba Cloud",
        value: "alibabacloud",
        type: "skills",
      },
      { id: "9", title: "Rackspace", value: "rackspace", type: "skills" },
      { id: "10", title: "Salesforce", value: "salesforce", type: "skills" },
      {
        id: "11",
        title: "SAP Cloud Platform",
        value: "sapcloud",
        type: "skills",
      },
      { id: "12", title: "VMware Cloud", value: "vmwarecloud", type: "skills" },
    ],
  },
  {
    id: "5",
    category: "DevOps Tools",
    data: [
      { id: "1", title: "Docker", value: "docker", type: "skills" },
      { id: "2", title: "Kubernetes", value: "kubernetes", type: "skills" },
      { id: "3", title: "Jenkins", value: "jenkins", type: "skills" },
      { id: "4", title: "Ansible", value: "ansible", type: "skills" },
      { id: "5", title: "Terraform", value: "terraform", type: "skills" },
      { id: "6", title: "GitLab CI/CD", value: "gitlab-ci-cd", type: "skills" },
      { id: "7", title: "Travis CI", value: "travisci", type: "skills" },
      { id: "8", title: "CircleCI", value: "circleci", type: "skills" },
      { id: "9", title: "Puppet", value: "puppet", type: "skills" },
      { id: "10", title: "Chef", value: "chef", type: "skills" },
      { id: "11", title: "Nagios", value: "nagios", type: "skills" },
      { id: "12", title: "Prometheus", value: "prometheus", type: "skills" },
      { id: "13", title: "Grafana", value: "grafana", type: "skills" },
      { id: "14", title: "Splunk", value: "splunk", type: "skills" },
      { id: "15", title: "ELK Stack", value: "elkstack", type: "skills" },
    ],
  },
  {
    id: "6",
    category: "Data Science & Machine Learning",
    data: [
      { id: "1", title: "TensorFlow", value: "tensorflow", type: "skills" },
      { id: "2", title: "PyTorch", value: "pytorch", type: "skills" },
      { id: "3", title: "Scikit-Learn", value: "scikit-learn", type: "skills" },
      { id: "4", title: "Keras", value: "keras", type: "skills" },
      { id: "5", title: "Pandas", value: "pandas", type: "skills" },
      { id: "6", title: "NumPy", value: "numpy", type: "skills" },
      { id: "7", title: "Matplotlib", value: "matplotlib", type: "skills" },
      { id: "8", title: "Seaborn", value: "seaborn", type: "skills" },
      { id: "9", title: "Apache Spark", value: "apachespark", type: "skills" },
      { id: "10", title: "Hadoop", value: "hadoop", type: "skills" },
      { id: "11", title: "RapidMiner", value: "rapidminer", type: "skills" },
      { id: "12", title: "Weka", value: "weka", type: "skills" },
      { id: "13", title: "Tableau", value: "tableau", type: "skills" },
      { id: "14", title: "Power BI", value: "powerbi", type: "skills" },
      { id: "15", title: "SAS", value: "sas", type: "skills" },
      { id: "16", title: "BigQuery", value: "bigquery", type: "skills" },
      { id: "17", title: "Databricks", value: "databricks", type: "skills" },
    ],
  },
  {
    id: "7",
    category: "Mobile Development",
    data: [
      { id: "1", title: "Android", value: "android", type: "skills" },
      { id: "2", title: "iOS", value: "ios", type: "skills" },
      { id: "3", title: "React Native", value: "reactnative", type: "skills" },
      { id: "4", title: "Flutter", value: "flutter", type: "skills" },
      { id: "5", title: "Xamarin", value: "xamarin", type: "skills" },
      { id: "6", title: "Swift", value: "swift", type: "skills" },
      { id: "7", title: "Kotlin", value: "kotlin", type: "skills" },
      { id: "8", title: "Objective-C", value: "objective-c", type: "skills" },
      { id: "9", title: "Cordova", value: "cordova", type: "skills" },
      { id: "10", title: "Ionic", value: "ionic", type: "skills" },
      { id: "11", title: "PhoneGap", value: "phonegap", type: "skills" },
    ],
  },
  {
    id: "8",
    category: "Cybersecurity",
    data: [
      {
        id: "1",
        title: "Penetration Testing",
        value: "pentesting",
        type: "skills",
      },
      {
        id: "2",
        title: "Ethical Hacking",
        value: "ethicalhacking",
        type: "skills",
      },
      {
        id: "3",
        title: "Network Security",
        value: "networksecurity",
        type: "skills",
      },
      { id: "4", title: "Cryptography", value: "cryptography", type: "skills" },
      {
        id: "5",
        title: "Malware Analysis",
        value: "malwareanalysis",
        type: "skills",
      },
      {
        id: "6",
        title: "Security Information and Event Management (SIEM)",
        value: "siem",
        type: "skills",
      },
      {
        id: "7",
        title: "Incident Response",
        value: "incidentresponse",
        type: "skills",
      },
      { id: "8", title: "Firewalls", value: "firewalls", type: "skills" },
      {
        id: "9",
        title: "Intrusion Detection Systems (IDS)",
        value: "ids",
        type: "skills",
      },
      {
        id: "10",
        title: "Identity and Access Management (IAM)",
        value: "iam",
        type: "skills",
      },
      {
        id: "11",
        title: "Security Compliance",
        value: "securitycompliance",
        type: "skills",
      },
      {
        id: "12",
        title: "Data Loss Prevention (DLP)",
        value: "dlp",
        type: "skills",
      },
    ],
  },
  {
    id: "9",
    category: "Project Management",
    data: [
      { id: "1", title: "Agile Methodology", value: "agile", type: "skills" },
      { id: "2", title: "Scrum", value: "scrum", type: "skills" },
      { id: "3", title: "Kanban", value: "kanban", type: "skills" },
      {
        id: "4",
        title: "Waterfall Methodology",
        value: "waterfall",
        type: "skills",
      },
      { id: "5", title: "Lean Methodology", value: "lean", type: "skills" },
      { id: "6", title: "PRINCE2", value: "prince2", type: "skills" },
      {
        id: "7",
        title: "Project Planning",
        value: "projectplanning",
        type: "skills",
      },
      {
        id: "8",
        title: "Risk Management",
        value: "riskmanagement",
        type: "skills",
      },
      {
        id: "9",
        title: "Stakeholder Management",
        value: "stakeholdermanagement",
        type: "skills",
      },
      {
        id: "10",
        title: "Microsoft Project",
        value: "msproject",
        type: "skills",
      },
      { id: "11", title: "JIRA", value: "jira", type: "skills" },
      { id: "12", title: "Trello", value: "trello", type: "skills" },
      { id: "13", title: "Asana", value: "asana", type: "skills" },
      { id: "14", title: "Basecamp", value: "basecamp", type: "skills" },
    ],
  },
  {
    id: "10",
    category: "Soft Skills",
    data: [
      {
        id: "1",
        title: "Communication",
        value: "communication",
        type: "skills",
      },
      { id: "2", title: "Teamwork", value: "teamwork", type: "skills" },
      {
        id: "3",
        title: "Problem-Solving",
        value: "problem-solving",
        type: "skills",
      },
      { id: "4", title: "Leadership", value: "leadership", type: "skills" },
      {
        id: "5",
        title: "Time Management",
        value: "timemanagement",
        type: "skills",
      },
      { id: "6", title: "Adaptability", value: "adaptability", type: "skills" },
      {
        id: "7",
        title: "Critical Thinking",
        value: "criticalthinking",
        type: "skills",
      },
      { id: "8", title: "Creativity", value: "creativity", type: "skills" },
      { id: "9", title: "Work Ethic", value: "workethic", type: "skills" },
      {
        id: "10",
        title: "Interpersonal Skills",
        value: "interpersonalskills",
        type: "skills",
      },
      {
        id: "11",
        title: "Emotional Intelligence",
        value: "emotionalintelligence",
        type: "skills",
      },
      {
        id: "12",
        title: "Conflict Resolution",
        value: "conflictresolution",
        type: "skills",
      },
    ],
  },
];
