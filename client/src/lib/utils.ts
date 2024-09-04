import moment from "moment";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { industries, locations, SkillsInformationsData } from "@/constants";

// ===============================
// Utility Functions
// ===============================

/**
 * Merges and returns Tailwind CSS classes.
 * @param inputs - The list of class values.
 * @returns The merged class names.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Returns the labels of the last six months including the current month.
 * @returns An array of month names.
 */
export const getMonthsLabels = (): string[] => {
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

/**
 * Generates a full image URL for a given image path.
 * @param image - The image path or URL.
 * @returns The full image URL.
 */
export const getImageUrl = (image: string): string => {
  return image?.includes("https:")
    ? image
    : `https://job-searching-application.s3.amazonaws.com/${image}`;
};

/**
 * Finds the industry label based on the industry value.
 * @param industry - The industry value.
 * @returns The industry label.
 */
export const findIndustriesData = (industry: string): string => {
  const industryData = industries.find((item) => item.value === industry);
  return industryData ? industryData.label : "";
};

/**
 * Categorizes skills based on predefined categories.
 * @param skills - An array of skill titles.
 * @returns An object categorizing the skills.
 */
export const getSkillsData = (
  skills: string[]
): { [key: string]: string[] } => {
  const categorizedSkills: { [key: string]: string[] } = {};

  SkillsInformationsData.forEach((category) => {
    category.data.forEach((skill) => {
      if (!categorizedSkills[category.category]) {
        categorizedSkills[category.category] = [];
      }
      if (skills?.includes(skill.value)) {
        categorizedSkills[category.category].push(skill.title);
      }
    });
  });

  return categorizedSkills;
};

export const getSkillNames = (technologies: string[]): string[] => {
  return technologies
    .map((technology) => {
      const matchingSkill = SkillsInformationsData.flatMap(
        (skill) => skill.data
      ).find((data) => data.value === technology);
      return matchingSkill ? matchingSkill.title : null;
    })
    .filter((skillName): skillName is string => skillName !== null);
};

export const multiselectSkills = SkillsInformationsData.flatMap((category) =>
  category.data.map((data) => ({
    label: data.title,
    value: data.value,
  }))
);

/**
 * Finds the location label based on the selected value.
 * @param selectedValue - The value of the selected location.
 * @returns The location label or "Location not found".
 */
export const findLocationData = (selectedValue: string): string => {
  const selectedOption = locations.find(
    (option) => option.value === selectedValue
  );
  return selectedOption ? selectedOption.label : "Location not found";
};

/**
 * Formats a date string to a specified format.
 * @param date - The date string to format.
 * @param format - The format string (default: "DD/MM/YYYY").
 * @returns The formatted date string.
 */
export const formatDate = (
  date: string,
  format: string = "DD/MM/YYYY"
): string => {
  return date ? moment.utc(date).format(format) : date;
};

/**
 * Checks if a given date is expired (i.e., is in the past).
 * @param date - The date string to check.
 * @returns True if the date is expired, false otherwise.
 */
export const checkExpired = (date: string): boolean => {
  const currentDateTime = new Date();
  const expirationDateTime = new Date(date);
  return currentDateTime > expirationDateTime;
};

/**
 * Calculates and returns a human-readable time difference from the current time.
 * @param date - The date string to compare.
 * @returns A string indicating how long ago the event occurred.
 */
export const getTime = (date: string): string => {
  const postedDateTime = moment(date);
  const currentDateTime = moment();
  const diffInSeconds = currentDateTime.diff(postedDateTime, "seconds");
  const diffInMinutes = currentDateTime.diff(postedDateTime, "minutes");
  const diffInHours = currentDateTime.diff(postedDateTime, "hours");
  const diffInDays = currentDateTime.diff(postedDateTime, "days");
  const diffInMonths = currentDateTime.diff(postedDateTime, "months");
  const diffInYears = currentDateTime.diff(postedDateTime, "years");

  if (diffInYears >= 1) {
    return `Posted ${diffInYears} year${diffInYears > 1 ? "s" : ""} ago`;
  } else if (diffInMonths >= 1) {
    return `Posted ${diffInMonths} month${diffInMonths > 1 ? "s" : ""} ago`;
  } else if (diffInDays >= 1) {
    return `Posted ${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
  } else if (diffInHours >= 1) {
    return `Posted ${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
  } else if (diffInMinutes >= 1) {
    return `Posted ${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`;
  } else if (diffInSeconds >= 1) {
    return `Posted ${diffInSeconds} second${diffInSeconds > 1 ? "s" : ""} ago`;
  } else {
    return `Posted just now`;
  }
};
