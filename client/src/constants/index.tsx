import {
  Bell,
  Building,
  FileText,
  LayoutDashboard,
  MessageCircle,
  Search,
  User,
} from "lucide-react";

// ===============================
// Navbar Links
// ===============================
export const SeekersNavbarLinks = [
  {
    id: "1",
    title: "Find Jobs",
    href: "/",
    icon: <Search />,
  },
  {
    id: "3",
    title: "Find Companies",
    href: "/companies",
    icon: <Building />,
  },
  {
    id: "4",
    title: "Find Events",
    href: "/events",
    icon: <FileText />,
  },
];

export const EmployersNavbarLinks = [
  {
    id: "3",
    title: "Find Seekers",
    href: "/seekers",
    icon: <Building />,
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
    checkboxes: [
      { id: "1", title: "Technology", value: "Technology", type: "category" },
      { id: "2", title: "Finance", value: "Finance", type: "category" },
      { id: "3", title: "Marketing", value: "Marketing", type: "category" },
      { id: "4", title: "Sales", value: "Sales", type: "category" },
    ],
  },
  {
    id: "2",
    title: "Location",
    checkboxes: [
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
    checkboxes: [
      { id: "1", title: "Internship", value: "Internship", type: "type" },
      { id: "2", title: "Full-Time", value: "Full-Time", type: "type" },
      { id: "3", title: "Part-Time", value: "Part-Time", type: "type" },
      { id: "4", title: "Freelance", value: "Freelance", type: "type" },
    ],
  },
  {
    id: "2",
    title: "Seniority",
    checkboxes: [
      { id: "1", title: "Junior", value: "Junior", type: "seniority" },
      { id: "2", title: "Medior", value: "Medior", type: "seniority" },
      { id: "3", title: "Senior", value: "Senior", type: "seniority" },
      { id: "4", title: "Lead", value: "Lead", type: "seniority" },
    ],
  },
  {
    id: "3",
    title: "Salary Range",
    checkboxes: [
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
    checkboxes: [
      { id: "1", title: "Hybrid", value: "Hybrid", type: "position" },
      { id: "2", title: "On-Site", value: "On-site", type: "position" },
      { id: "3", title: "Remote", value: "Remote", type: "position" },
    ],
  },
];

export const SeekersFiltersData = [
  {
    id: "1",
    title: "Databases",
    checkboxes: [
      { id: "1", title: "MySQL", value: "mysql", type: "skills" },
      { id: "2", title: "PostgreSQL", value: "postgresql", type: "skills" },
      { id: "3", title: "MongoDB", value: "MongoDB", type: "skills" },
      { id: "4", title: "SQLite", value: "sqlite", type: "skills" },
      { id: "5", title: "Oracle", value: "oracle", type: "skills" },
      { id: "6", title: "SQL Server", value: "sqlserver", type: "skills" },
    ],
  },
];

// ===============================
// Skills Information Data
// ===============================
export const SkillsInformationsData = [
  {
    id: 1,
    category: "Programming Languages",
    data: [
      { id: 1, title: "Java", value: "java" },
      { id: 2, title: "Python", value: "python" },
      { id: 3, title: "JavaScript", value: "javascript" },
      { id: 4, title: "C++", value: "cplusplus" },
      { id: 5, title: "C#", value: "csharp" },
      { id: 6, title: "Ruby", value: "ruby" },
      { id: 7, title: "PHP", value: "php" },
      { id: 8, title: "Swift", value: "swift" },
      { id: 9, title: "Node.js", value: "nodejs" },
    ],
  },
  {
    id: 2,
    category: "Frameworks",
    data: [
      { id: 1, title: "React.js", value: "react" },
      { id: 2, title: "Angular", value: "angular" },
      { id: 3, title: "Vue.js", value: "vuejs" },
      { id: 4, title: "Spring", value: "spring" },
      { id: 5, title: "Django", value: "django" },
      { id: 6, title: "Flask", value: "flask" },
      { id: 7, title: "Express.js", value: "expressjs" },
    ],
  },
  {
    id: 3,
    category: "Databases",
    data: [
      { id: 1, title: "MySQL", value: "mysql" },
      { id: 2, title: "PostgreSQL", value: "postgresql" },
      { id: 3, title: "MongoDB", value: "mongodb" },
      { id: 4, title: "SQLite", value: "sqlite" },
      { id: 5, title: "Oracle", value: "oracle" },
      { id: 6, title: "SQL Server", value: "sqlserver" },
    ],
  },
  {
    id: 4,
    category: "Libraries",
    data: [
      { id: 1, title: "jQuery", value: "jquery" },
      { id: 2, title: "Bootstrap", value: "bootstrap" },
      { id: 3, title: "Lodash", value: "lodash" },
      { id: 4, title: "Moment.js", value: "momentjs" },
      { id: 5, title: "React Router", value: "reactrouter" },
      { id: 6, title: "Redux", value: "redux" },
      { id: 7, title: "Axios", value: "axios" },
    ],
  },
];
