type FiltersCheckboxesTypes = {
  id: string;
  title: string;
  value: string;
  type: string;
};

type FiltersCheckboxesSectionTypes = {
  title: string;
  checkboxes: FiltersCheckboxesTypes[];
  overflow?: boolean;
};

export { type FiltersCheckboxesTypes, type FiltersCheckboxesSectionTypes };
