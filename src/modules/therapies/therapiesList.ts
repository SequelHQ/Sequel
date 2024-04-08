export interface TherapyItem {
  label: string;
  uri: string;
  inProgress: boolean;
}

export const THERAPIES_LIST: TherapyItem[] = [
	{
		label: "Minicircle Life-Extension Gene Therapy Clinic",
		uri: "https://minicircle.clinic/",
		inProgress: false,
	},
	{
		label: "Peptide Therapy | Next Health",
		uri: "https://www.next-health.com/category/peptide-therapy",
		inProgress: false,
	},
	{
		label: "Maximus",
		uri: "https://www.maximustribe.com",
		inProgress: false,
	},
	{
		label: "Dryp Hydration: Peptide Therapy",
		uri: "https://driphydration.com/peptide-therapy/",
		inProgress: false,
	},
];
