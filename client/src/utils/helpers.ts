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
