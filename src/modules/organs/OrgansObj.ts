export const ORGANS_DATA = {
	"heart" : {
		"status": "Unsure",
		"reason": "No data",
		"display_name": "Heart",
		"tests": [ "Resting Heart Rate (RHR)", "Heart Rate Variability (HRV)", "VO2Max", "LV septal A' mitral", "Aortic root diameter", "LA E' latbasal", "RVSP", "LV sepal E/E'", "RV E/A", "MaxHR", "LV E/A", "PSEM", "IVRT", "E/A pulsed wave doppler in the mitral valve", "Tissue doppler septal LV E"]
	},
	"brain": {
		"status": "Unsure",
		"reason": "No data",
		"display_name": "Brain",
		"tests": [ "White Matter Hyperintensities", "Pineal calcification", "Ventricular volume", "Cortical grey volume", "AI T1 brain age", "RAVENS PM", "Total Cerebral WMV", "WASO"]
	},
	"lung": {
		"status": "Unsure",
		"reason": "No data",
		"display_name": "Lung",
		"tests": [ "FEV1", "FVC (Forced Vital Capacity)", "PEFR", "A lines", "DLCOc", "KCOc", "MIP", "MEP"]
	},
	"gastrointestinal_tract": {
		"status": "Unsure",
		"reason": "No data",
		"display_name": "Gastrointestinal Tract",
		"tests": [ "SCFAs", "Elastase", "Polyps", "Bleeds", "FIT FOBT"]
	},
	"joints": {
		"status": "Unsure",
		"reason": "No data",
		"display_name": "Joints",
		"tests": [ "MRI findings", "Musculoskeletal ultrasound findings"]
	},
	"hair": {
		"status": "Unsure",
		"reason": "No data",
		"display_name": "Hair",
		"tests": [ "Grey+white hair measurement", "Quant Hamilton-Norwood scale"]
	},
	"skin": {
		"status": "Unsure",
		"reason": "No data",
		"display_name": "Skin",
		"tests": [ "Spots", "Wrinkles", "Texture", "Pores", "UV Spots", "Brown spots", "Red areas", "Autofluorescence", "Multispectral imaging face age"]
	},
	"eye": {
		"status": "Unsure",
		"reason": "No data",
		"display_name": "Eye",
		"tests": [ "Drusen volume", "Subfoveal choroidal thickness", "IOP ", "Accommodative distance", "Eyelash length"]
	},
	"ear": {
		"status": "Unsure",
		"reason": "No data",
		"display_name": "Ear",
		"tests": [ "Normal frequency", "Extended high frequency", "Tympanometric markers", "Otoacoustic emissions", "Cochlear magnetic resonance markers"]
	},
	"oral": {
		"status": "Unsure",
		"reason": "No data",
		"display_name": "Oral",
		"tests": [ "Plaque index", "Recession", "Attachment loss", "Gingival index", "Calculus index"]
	}
}

export type OrganTestResultType = string;

export interface OrganDetailsType {
    status: string;
    reason: string;
    display_name: string;
    tests: OrganTestResultType[];
}

export interface OrgansDataType {
    lung: OrganDetailsType;
    gastrointestinal_tract: OrganDetailsType;
    joints: OrganDetailsType;
    hair: OrganDetailsType;
    skin: OrganDetailsType;
    eye: OrganDetailsType;
    ear: OrganDetailsType;
    oral: OrganDetailsType;
}

