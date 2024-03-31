import { industries } from "@/constants/industries";
import { SkillsInformationsData } from "@/constants/filters/skills";

export const getSkillsData = (skills: string[]) => {
  const categorizedSkills: { [key: string]: string[] } = {};

  SkillsInformationsData.forEach((category) => {
    category.data.forEach((skill) => {
      if (!categorizedSkills[category.category]) {
        categorizedSkills[category.category] = [];
      }
      if (skills?.includes(skill.title)) {
        categorizedSkills[category.category].push(skill.title);
      }
    });
  });

  return categorizedSkills;
};

export const findIndustriesData = (industry: string) => {
  let foundedIndustry = "";

  industries.forEach((industryData) => {
    if (industryData.value === industry) {
      foundedIndustry = industryData.label;
    }
  });

  return foundedIndustry;
};

export const getImageUrl = (image: string) => {
  return image?.includes("https:")
    ? image
    : `https://job-searching-application.s3.amazonaws.com/${image}`;
};

export const getMonthsLabels = () => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const currentMonth = new Date().getMonth();
  return Array.from(
    { length: 6 },
    (_, i) => monthNames[(currentMonth - 5 + i + 12) % 12]
  );
};
