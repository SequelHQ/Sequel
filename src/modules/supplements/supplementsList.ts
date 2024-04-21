export interface SupplementType {
  id: string;
  supplement: string;
  dosage: string;
  description: string;
  link: string;
  ordered: boolean;
  inProgress: boolean;
}

export const supplementsList: SupplementType[] = [
	{
		"id": "BSO",
		"supplement": "Blueprint | Snake Oil",
		"dosage": "1 tbsp",
		"link": "https://blueprint.bryanjohnson.com/products/the-blueprint-stack",
		"ordered": false,
		"inProgress": false,
		"description": "Extra virgin olive oil which promotes a variety of longevity and cognitive benefits."
	},
	{
		"id": "BNP",
		"supplement": "Blueprint | Nutty Pudding",
		"dosage": "2 scoops",
		"link": "https://blueprint.bryanjohnson.com/products/the-blueprint-stack",
		"ordered": false,
		"inProgress": false,
		"description": "A nutty pudding with 26 g of protein and 300 mg of cocoa flavanols."
	},
	{
		"id": "BNP",
		"supplement": "Blueprint | Blueberry Nut Mix",
		"dosage": "1 scoop",
		"link": "https://blueprint.bryanjohnson.com/products/the-blueprint-stack",
		"ordered": false,
		"inProgress": false,
		"description": "Dried blueberries, macademia, and walnuts."
	},
	{
		"id": "BLOM",
		"supplement": "Blueprint | Longevity Mix",
		"dosage": "1 scoop",
		"link": "https://blueprint.bryanjohnson.com/products/the-blueprint-stack",
		"ordered": false,
		"inProgress": false,
		"description": "Allulose, Monk fruit extract & more to help you live longer."
	},
	{
		"id": "BNGC",
		"supplement": "Blueprint | NAC Ginger Curcumin",
		"dosage": "3 capsules",
		"link": "https://blueprint.bryanjohnson.com/products/the-blueprint-stack",
		"ordered": false,
		"inProgress": false,
		"description": "N-Acetyl-Cysteine, a powerful antioxidant that supports immune function and cognitive health."
	},
	{
		"id": "BRYR",
		"supplement": "Blueprint | Red Yeast Rice OF Garlic",
		"dosage": "1 capsule",
		"link": "https://blueprint.bryanjohnson.com/products/the-blueprint-stack",
		"ordered": false,
		"inProgress": false,
		"description": "Odorless garlic, red yeast rice for arterial and heart health"
	},
	{
		"id": "BEC",
		"supplement": "Blueprint | Essential Capsules",
		"dosage": "2 capsules",
		"link": "https://blueprint.bryanjohnson.com/products/the-blueprint-stack",
		"ordered": false,
		"inProgress": false,
		"description": "HM, pectin, rice hulls & more"
	},
	{
		"id": "BES",
		"supplement": "Blueprint | Essential Softgels",
		"dosage": "1 capsule",
		"link": "https://blueprint.bryanjohnson.com/products/the-blueprint-stack",
		"ordered": false,
		"inProgress": false,
		"description": "Vitamins, lycopene, astaxanthin, lutein & more"
	},
	{
		"id": "ASH",
		"supplement": "Ashwagandha",
		"dosage": "600mg",
		"link": "https://www.amazon.com/dp/B07XP6ND7Y?amp=&crid=1GCGXVOBFD15W&amp=&sprefix=asha&linkCode=sl1&tag=blueprint03d-20&linkId=b953da08a100224fd0013f0d5d6f689a&language=en_US&ref_=as_li_ss_tl",
		"ordered": false,
		"inProgress": false,
		"description": "Ashwagandha, an adaptogenic herb used to reduce stress and improve cognitive function."
	},
	{
		"id": "AST",
		"supplement": "Astaxanthin",
		"dosage": "12mg",
		"link": "https://www.amazon.com/BioAstin-Hawaiian-Astaxanthin-Immunity-Supports/dp/B098TZ627X?crid=LC6Q6JFTHY5B&keywords=bioastin%2Bhawaiian%2Bastaxanthin&qid=1699753896&sprefix=bioastin,aps,224&sr=8-5&th=1&linkCode=sl1&tag=blueprint03d-20&linkId=0840ebb2aa8890bc63ac42954d059b72&language=en_US&ref_=as_li_ss_tl",
		"ordered": false,
		"inProgress": false,
		"description": "Astaxanthin, a powerful antioxidant derived from algae, known for its anti-inflammatory properties."
	},
	{
		"id": "URO",
		"supplement": "Urolithin A",
		"dosage": "None",
		"link": "https://www.amazon.com/Timeline-Mitopure-Mitochondria-Supplement-Clinically/dp/B0BFRTB6MF",
		"ordered": false,
		"inProgress": false,
		"description": "Urolithin A, a metabolite that supports mitochondrial health and cellular energy production."
	},
	{
		"id": "BCX",
		"supplement": "B Complex",
		"dosage": "0.5 pill Mon & Thus",
		"link": "https://www.amazon.com/Super-B-Complex-Methylated-Vitamins-Methylcobalamin/dp/B01787EPEE?th=1&linkCode=sl1&tag=blueprint03d-20&linkId=83958904a67769b1707bc898e162532f&language=en_US&ref_=as_li_ss_tl",
		"ordered": false,
		"inProgress": false,
		"description": "B Complex, a group of essential vitamins that support energy metabolism and nervous system function."
	},
	{
		"id": "BOR",
		"supplement": "Boron",
		"dosage": "2mg",
		"link": "https://www.amazon.com/Pure-Encapsulations-Hypoallergenic-Supplement-Utilization/dp/B003PR0U7I?&linkCode=sl1&tag=blueprint03d-20&linkId=55c4b073b6094360842023cc7ae90176&language=en_US&ref_=as_li_ss_tl",
		"ordered": false,
		"inProgress": false,
		"description": "Boron, a trace mineral that plays a role in bone health, hormone regulation, and cognitive function."
	},
	{
		"id": "BRO",
		"supplement": "BroccoMax",
		"dosage": "17.5mg",
		"link": "https://www.amazon.com/Jarrow-Formulas-BroccoMax-Supports-Delayed/dp/B0013OVTM0?th=1&linkCode=sl1&tag=blueprint03d-20&linkId=fd54d8c29e19c84678a02889e02d9ef0&language=en_US&ref_=as_li_ss_tl",
		"ordered": false,
		"inProgress": false,
		"description": "BroccoMax, a concentrated extract of sulforaphane, a potent antioxidant found in broccoli."
	},
	{
		"id": "VITC",
		"supplement": "Vitamin C",
		"dosage": "500mg",
		"link": "https://www.amazon.com/Solgar-Vegetable-Capsules-Supports-Cardiovascular/dp/B0011FUSGY?crid=2OGG2X4F805OJ&keywords=Solgar+Vitamin+C+500+mg&qid=1687293760&rdc=1&s=hpc&sprefix=solgar+vitamin+c+500+mg,hpc,145&sr=1-4&linkCode=sl1&tag=blueprint03d-20&linkId=6fd060ac413265ff25bf29b911ecf089&language=en_US&ref_=as_li_ss_tl",
		"ordered": false,
		"inProgress": false,
		"description": "Vitamin C, an essential nutrient with antioxidant properties that supports immune function and collagen synthesis."
	},
	{
		"id": "CAKG",
		"supplement": "Ca-AKG",
		"dosage": "1gram",
		"link": "https://vitality-pro.com/",
		"ordered": false,
		"inProgress": false,
		"description": "Ca-AKG, or calcium alpha-ketoglutarate, a compound that supports bone health and muscle function."
	},
	{
		"id": "COCO",
		"supplement": "Cocoa Flavanols",
		"dosage": "500mg",
		"link": "https://www.amazon.com/dp/B09FVFLYTN?psc=1&pd_rd_i=B09FVFLYTN&pd_rd_w=hsEuI&content-id=amzn1.sym.ce83acae-ca3c-44cd-81e2-3d73204a3b21&pf_rd_p=ce83acae-ca3c-44cd-81e2-3d73204a3b21&pf_rd_r=5GR2VAPK3R53FCJ6E7BC&pd_rd_wg=jzUSn&pd_rd_r=93172b12-6cbb-4277-b4d6-3420eac32250&s=hpc&sp_csd=d2lkZ2V0TmFtZT1zcF9kZXRhaWxfdGhlbWF0aWM&spLa=ZW5jcnlwdGVkUXVhbGlmaWVyPUFRME0wV1dZMFhNNDEmZW5jcnlwdGVkSWQ9QTA5OTY5MjQxMjJHTkI4SU1NOVo0JmVuY3J5cHRlZEFkSWQ9QTEwNDc5MzAxUjZZMjJSODJVU1IxJndpZGdldE5hbWU9c3BfZGV0YWlsX3RoZW1hdGljJmFjdGlvbj1jbGlja1JlZGlyZWN0JmRvTm90TG9nQ2xpY2s9dHJ1ZQ%3D%3D&linkCode=sl1&tag=blueprint03d-20&linkId=3635a39325e2545f79506f2eb89039a5&language=en_US&ref_=as_li_ss_tl",
		"ordered": false,
		"inProgress": false,
		"description": "Cocoa Flavanols, plant compounds found in cocoa that support cardiovascular health and cognitive function."
	},
	{
		"id": "COQ",
		"supplement": "CoQ10",
		"dosage": "100mg",
		"link": "https://www.amazon.com/Country-Life-Vegan-CoQ10-Softgels/dp/B000UQVBLQ?crid=1CDOE97HN8GI9&keywords=coQ10+50mg+vegan&qid=1687537458&refinements=p_n_feature_ten_browse-bin:23911970011&rnid=23911968011&sprefix=coq10+50mg+vegan,aps,166&sr=8-15&linkCode=sl1&tag=blueprint03d-20&linkId=ec5e3075fef4b08c678309bc5c77c121&language=en_US&ref_=as_li_ss_tl",
		"ordered": false,
		"inProgress": false,
		"description": "CoQ10, or coenzyme Q10, an antioxidant that supports cellular energy production and cardiovascular health."
	},
	{
		"id": "VITD3",
		"supplement": "Vitamin D-3",
		"dosage": "2,000 IU",
		"link": "https://www.amazon.com/NOW-Vitamin-Structural-Support-Softgels/dp/B001UZPY1O?&linkCode=sl1&tag=blueprint03d-20&linkId=567d6971521d86fb095a766d66195a30&language=en_US&ref_=as_li_ss_tl",
		"ordered": false,
		"inProgress": false,
		"description": "Vitamin D-3, a fat-soluble vitamin that supports bone health, immune function, and muscle strength."
	},
	{
		"id": "DHEA",
		"supplement": "DHEA",
		"dosage": "25mg",
		"link": "https://www.amazon.com/gp/product/B004I229X2?&linkCode=sl1&tag=blueprint03d-20&linkId=13376cdf6a85e671016e873b9add1f2f&language=en_US&ref_=as_li_ss_tl",
		"ordered": false,
		"inProgress": false,
		"description": "DHEA, or dehydroepiandrosterone, a hormone precursor that supports healthy aging and stress management."
	},
	{
		"id": "VITE",
		"supplement": "Vitamin E",
		"dosage": "67mg",
		"link": "https://www.amazon.com/gp/product/B00020IBR2?ie=UTF8&psc=1&linkCode=sl1&tag=blueprint03d-20&linkId=80f59e596b47f1c32adddaeebee2e184&language=en_US&ref_=as_li_ss_tl",
		"ordered": false,
		"inProgress": false,
		"description": "Vitamin E, a fat-soluble antioxidant that supports cellular health and immune function."
	},
	{
		"id": "EPA",
		"supplement": "EPA/DHA/DPA",
		"dosage": "800mg",
		"link": "https://www.vegetology.com/supplements/omega-3",
		"ordered": false,
		"inProgress": false,
		"description": "EPA/DHA/DPA, omega-3 fatty acids that support cardiovascular health, brain function, and inflammation management."
	},
	{
		"id": "FIS",
		"supplement": "Fisetin",
		"dosage": "200mg",
		"link": "https://timehealth.co.uk/product/fisetin/",
		"ordered": false,
		"inProgress": false,
		"description": "Fisetin, a flavonoid with antioxidant and anti-inflammatory properties that supports healthy aging."
	},
	{
		"id": "GAR",
		"supplement": "Garlic (equivalent)",
		"dosage": "2.4g",
		"link": "https://www.amazon.com/Horbaach-Odorless-Softgels-Extract-Supplement/dp/B07M92SR4M?&linkCode=sl1&tag=blueprint03d-20&linkId=6f92fb3efcd5653ef250d775f5b2ff1e&language=en_US&ref_=as_li_ss_tl",
		"ordered": false,
		"inProgress": false,
		"description": "Garlic (equivalent), a plant with compounds that support cardiovascular health and immune function."
	},
	{
		"id": "KYOL",
		"supplement": "Garlic (Kyolic)",
		"dosage": "1.2g",
		"link": "https://www.amazon.com/gp/product/B00012NGIA?&linkCode=sl1&tag=blueprint03d-20&linkId=e4b0b66d5d72663922b25d1bfe8116f2&language=en_US&ref_=as_li_ss_tl",
		"ordered": false,
		"inProgress": false,
		"description": "Garlic (Kyolic), an aged garlic extract that supports cardiovascular health and immune function."
	},
	{
		"id": "GEN",
		"supplement": "Genistein",
		"dosage": "125mg",
		"link": "https://www.amazon.com/gp/product/B07F2ND343?ie=UTF8&psc=1&linkCode=sl1&tag=blueprint03d-20&linkId=4aebc5f27e83d291fd5843abab3c278a&language=en_US&ref_=as_li_ss_tl",
		"ordered": false,
		"inProgress": false,
		"description": "Genistein, an isoflavone found in soybeans that supports bone health and hormonal balance."
	},
	{
		"id": "GING",
		"supplement": "Ginger Root",
		"dosage": "1.1g",
		"link": "https://www.amazon.com/Natures-Way-Certified-Gluten-Free-Vegetarian/dp/B074N99XL1?th=1&linkCode=sl1&tag=blueprint03d-20&linkId=74d8938e81eaeac39162f0422b125bc4&language=en_US&ref_=as_li_ss_tl",
		"ordered": false,
		"inProgress": false,
		"description": "Ginger Root, a plant with anti-inflammatory and digestive health-supporting properties."
	},
	{
		"id": "GLUC",
		"supplement": "Glucosamine Sulphate 2KCL",
		"dosage": "1500mg",
		"link": "https://www.amazon.com/Natures-Aid-Glucosamine-90caps-Maintains-Cartilage/dp/B001FOIV9W?&linkCode=sl1&tag=blueprint03d-20&linkId=0294f5086cbd354bf7a9e6164a654c8b&language=en_US&ref_=as_li_ss_tl",
		"ordered": false,
		"inProgress": false,
		"description": "Glucosamine Sulphate 2KCL, a compound that supports joint health and mobility."
	},
	{
		"id": "IOD",
		"supplement": "Iodine as potassium iodide",
		"dosage": "125mcg",
		"link": "https://www.amazon.com/gp/product/B01AF601M0?&linkCode=sl1&tag=blueprint03d-20&linkId=18cdeb99773da63a6211db1b23716c63&language=en_US&ref_=as_li_ss_tl",
		"ordered": false,
		"inProgress": false,
		"description": "Iodine as potassium iodide, an essential mineral that supports thyroid function and hormone production."
	},
	{
		"id": "K2M4",
		"supplement": "K2-MK4",
		"dosage": "5mg",
		"link": "https://www.amazon.com/Carlson-Vitamin-Menatetrenone-Soy-free-capsules/dp/B001LF39V0?&linkCode=sl1&tag=blueprint03d-20&linkId=f3f83f24485909da0827cbc495d87b51&language=en_US&ref_=as_li_ss_tl",
		"ordered": false,
		"inProgress": false,
		"description": "K2-MK4, a form of vitamin K2 that supports bone health and cardiovascular function."
	},
	{
		"id": "K1",
		"supplement": "K1",
		"dosage": "1.5mg",
		"link": "https://www.amazon.com/Life-Extension-Super-90-Softgel/dp/B07RL1J9BV?crid=2VC5HLJ351W0I&keywords=vitamin+k&qid=1688573665&rdc=1&refresh=1&sprefix=vitamin+k,aps,167&sr=8-6&linkCode=sl1&tag=blueprint03d-20&linkId=53950dc7a5fecca34736227ac62b308f&language=en_US&ref_=as_li_ss_tl",
		"ordered": false,
		"inProgress": false,
		"description": "K1, a form of vitamin K that supports blood clotting and bone health."
	},
	{
		"id": "K2M7",
		"supplement": "K2 MK-7",
		"dosage": "600mcg",
		"link": "https://www.amazon.com/Vitamin-MK-7-600mcg-NutriZing-Books/dp/B01DAQ0C94?crid=3QER5ZZ5EIQHB&keywords=vitamin+k+600+micrograms&qid=1688573720&sprefix=vitamin+k+600+microgram,aps,155&sr=8-9&linkCode=sl1&tag=blueprint03d-20&linkId=4bef3492ce7bd2ed619050c13b59d890&language=en_US&ref_=as_li_ss_tl",
		"ordered": false,
		"inProgress": false,
		"description": "K2 MK-7, a form of vitamin K2 that supports bone health and cardiovascular function."
	},
	{
		"id": "LITH",
		"supplement": "Lithium",
		"dosage": "1mg",
		"link": "https://www.amazon.com/Life-Extension-Vegetarian-Capsules-02403/dp/B088KQFT74?&linkCode=sl1&tag=blueprint03d-20&linkId=cf846a702db1df7b585a8e4335b197b2&language=en_US&ref_=as_li_ss_tl",
		"ordered": false,
		"inProgress": false,
		"description": "Lithium, a trace mineral that supports mood regulation and brain health."
	},
	{
		"id": "LYCO",
		"supplement": "Lycopene",
		"dosage": "10mg",
		"link": "https://www.amazon.com/NOW-Lycopene-10-120-Softgels/dp/B000JN7URE?&linkCode=sl1&tag=blueprint03d-20&linkId=322ac4e780e03b8e2a27c6bda5bbf0bd&language=en_US&ref_=as_li_ss_tl",
		"ordered": false,
		"inProgress": false,
		"description": "Lycopene, a carotenoid with antioxidant properties that supports prostate health and cardiovascular function."
	},
	{
		"id": "LYS",
		"supplement": "Lysine",
		"dosage": "1g",
		"link": "https://www.amazon.com/Superior-Labs-Supplement-Absorption-Respiratory/dp/B00R5OALEY?&linkCode=sl1&tag=blueprint03d-20&linkId=983f67505bc96902be0638587a3517cd&language=en_US&ref_=as_li_ss_tl",
		"ordered": false,
		"inProgress": false,
		"description": "Lysine, an essential amino acid that supports protein synthesis, immune function, and collagen production."
	},
	{
		"id": "LCAR",
		"supplement": "L-Carnitine",
		"dosage": "330mg",
		"link": "https://www.amazon.com/NOW%C2%AE-L-Carnitine-1000-100-Tablets/dp/B0013OSNCE/ref=sr_1_6?dib=eyJ2IjoiMSJ9.3AWKtgTd1usXNNy09RCik4x-ItJ9qJ-6JezznVmHDX2a7CKKcNSQn5hIEnqW014X-RirKvU3fkt1xRmTC2roa1huNNNlhLm0K4pnikmZAdbZV3p4LLxP1Q_wRdvhN9YrUbeDfDoABqc_a5ZecQiH-ZNtZJsl5hyOfukWmJgvU9t4eP2ItaaJjuCPsZh-N530nsPBAdmTdKziQ16duZ76uuBujw9UJ74zwa-Nex1thiLvp4cc_oCJVni5QwnXx-mnXCEX2yPr2VZvenvdd3ZKnSv5KrwcytoRNKiKsm_itMg._Iowa5liu-p27T8NzfdLMA2pczRja2E9mdu9NfQWg6E&dib_tag=se&keywords=l-carnitine&qid=1710482541&sr=8-6",
		"ordered": false,
		"inProgress": false,
		"description": "L-Carnitine, an amino acid derivative that supports cellular energy production and cardiovascular health."
	},
	{
		"id": "NR",
		"supplement": "Nicotinamide Riboside",
		"dosage": "375mg",
		"link": "https://www.amazon.com/Patented-Booster-Supplement-More-Efficient/dp/B07FB6NR8V?th=1&linkCode=sl1&tag=blueprint03d-20&linkId=1b5ec949ee17ff8c850960fe333fc424&language=en_US&ref_=as_li_ss_tl",
		"ordered": false,
		"inProgress": false,
		"description": "Nicotinamide Riboside, a form of vitamin B3 that supports cellular energy production and healthy aging."
	},
	{
		"id": "NAC",
		"supplement": "N-Acetyl-L-Cysteine (NAC)",
		"dosage": "1800mg",
		"link": "https://www.amazon.com/Life-Extension-N-Acetyl-L-Cysteine-Vegetarian-Capsules/dp/B008ML8D4O?crid=1HFWAMR8Q3GYA&keywords=N-Acetyl-L-Cysteine+(NAC)&qid=1681407443&sprefix=n-acetyl-l-cysteine+nac+,aps,143&sr=8-1-spons&psc=1&spLa=ZW5jcnlwdGVkUXVhbGlmaWVyPUEyVFc5VjBCTDFTUzAwJmVuY3J5cHRlZElkPUEwOTk5MjYyS0o3MzdPSTBCQkFYJmVuY3J5cHRlZEFkSWQ9QTAzMzM0MTgyU1BIQTY5UkNaSzRHJndpZGdldE5hbWU9c3BfYXRmJmFjdGlvbj1jbGlja1JlZGlyZWN0JmRvTm90TG9nQ2xpY2s9dHJ1ZQ%3D%3D&linkCode=sl1&tag=blueprint03d-20&linkId=76752fdbcf6db6bf924900d56487cb35&language=en_US&ref_=as_li_ss_tl",
		"ordered": false,
		"inProgress": false,
		"description": "N-Acetyl-L-Cysteine (NAC), an amino acid derivative with antioxidant properties that supports liver health and detoxification."
	},
	{
		"id": "PROF",
		"supplement": "Proferrin",
		"dosage": "10mg",
		"link": "https://www.amazon.com/dp/B09Q5G6TRD?amp=&crid=39B3DOC8RLVTQ&sprefix=proferrin&th=1&linkCode=sl1&tag=blueprint03d-20&linkId=0bc70b33a63e7e51a0f225c4939dc040&language=en_US&ref_=as_li_ss_tl",
		"ordered": false,
		"inProgress": false,
		"description": "Proferrin, a highly absorbable form of iron that supports red blood cell production and oxygen transport."
	},
	{
		"id": "SPER",
		"supplement": "Spermidine",
		"dosage": "10mg",
		"link": "https://www.amazon.com/Spermidine-10mg-99-Capsules-Supplements/dp/B09NP4MPQB",
		"ordered": false,
		"inProgress": false,
		"description": "Spermidine, a polyamine that supports cellular health, autophagy, and longevity."
	},
	{
		"id": "TURM",
		"supplement": "Turmeric",
		"dosage": "1g",
		"link": "https://www.amazon.com/gp/product/B07CDQTBV8?th=1&linkCode=sl1&tag=blueprint03d-20&linkId=8c1d5fa5a256cc4d54b75efb140953dd&language=en_US&ref_=as_li_ss_tl",
		"ordered": false,
		"inProgress": false,
		"description": "Turmeric, a plant with curcumin, a compound with anti-inflammatory and antioxidant properties."
	},
	{
		"id": "TAUR",
		"supplement": "Taurine",
		"dosage": "2g",
		"link": "https://www.amazon.com/NOW-Taurine-Double-Strength-Capsules/dp/B00663G4ZK?&linkCode=sl1&tag=blueprint03d-20&linkId=ec397ace70c37c6d67dfdb8f43747d48&language=en_US&ref_=as_li_ss_tl",
		"ordered": false,
		"inProgress": false,
		"description": "Taurine, an amino acid that supports cardiovascular health, brain function, and muscle performance."
	},
	{
		"id": "VIVI",
		"supplement": "Viviscal",
		"dosage": "1 pill",
		"link": "https://www.amazon.com/gp/product/B085S7H7K1?&linkCode=sl1&tag=blueprint03d-20&linkId=4a57285d94609aeb091d9d73228516ca&language=en_US&ref_=as_li_ss_tl",
		"ordered": false,
		"inProgress": false,
		"description": "Viviscal, a blend of nutrients that supports hair growth and thickness."
	},
	{
		"id": "ZEA",
		"supplement": "Zeaxanthin (20 mg Lutein, 4 mg Zeaxanthin)",
		"dosage": "3x/wk",
		"link": "https://www.amazon.com/dp/B07Y2H11DP?amp=&crid=1UA3RPV7I2I6U&amp=&sprefix=zeaxanthin&linkCode=sl1&tag=blueprint03d-20&linkId=f063ba0b403f0cf213ee1f7498b2fc98&language=en_US&ref_=as_li_ss_tl",
		"ordered": false,
		"inProgress": false,
		"description": "Zeaxanthin (20 mg Lutein, 4 mg Zeaxanthin), carotenoids that support eye health and visual function."
	},
	{
		"id": "ZINC",
		"supplement": "Zinc",
		"dosage": "15mg",
		"link": "https://www.amazon.com/Pure-Encapsulations-Bioavailable-Hypoallergenic-Supplement/dp/B004EMGRMK?crid=V8MBZ622OJ9X&keywords=zinc+25mg&qid=1683671555&sprefix=zinc+25,aps,205&sr=8-19-spons&psc=1&spLa=ZW5jcnlwdGVkUXVhbGlmaWVyPUEyNTNVMkEyODRUVE9RJmVuY3J5cHRlZElkPUEwNzY1ODg1MVFaVkJFNEdYMVFWMSZlbmNyeXB0ZWRBZElkPUEwMzc3MTk3MkExU0tKWFhaTlVNUiZ3aWRnZXROYW1lPXNwX210ZiZhY3Rpb249Y2xpY2tSZWRpcmVjdCZkb05vdExvZ0NsaWNrPXRydWU%3D&linkCode=sl1&tag=blueprint03d-20&linkId=ffbbb9b075a30df26ddb3a7e2b7c1b39&language=en_US&ref_=as_li_ss_tl",
		"ordered": false,
		"inProgress": false,
		"description": "Zinc, an essential mineral that supports immune function, wound healing, and testosterone production."
	},
	{
		"id": "AST6",
		"supplement": "Astaxanthin",
		"dosage": "6mg",
		"link": "https://www.amazon.com/Astaxanthin-Organic-Coconut-Better-Absorption/dp/B07WP6KRN7/ref=sr_1_1_sspa?c=ts&dib=eyJ2IjoiMSJ9.bkGKsJZr4GJXpvAb5MJnRQUl0STmagS-tAugO9eulkJ8J42yrfkVLcF5NEpccKN6bWa9aWhCWx6QLHVLDASoI0m0rk0pSG-I2rzxDcJbE_ln5XndZW95aVKxHi85dnRd3uidNOkCcnTix6_cQfNkjjaabBHFTg1ZxmTSeaDHJIyYhz2bKGaEcfznLFfXxXP9t25wKFPD1FlzFBJHJP9B18R3vrXXWOhqstRCVvToYskLObHNtONOEOxkESSKfM0abtkUJevEUOSszORx2I2Bj6rEWt6PAVa6G5C4NQ-ye8o.pp6VuDJga6qvZHe-we7LJTqsoJFUzo5425x7IPMK2js&dib_tag=se&keywords=Astaxanthin+Nutritional+Supplements&qid=1710482748&s=hpc&sr=1-1-spons&ts_id=6939977011&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1",
		"ordered": false,
		"inProgress": false,
		"description": "Astaxanthin, a powerful antioxidant derived from algae, known for its anti-inflammatory properties."
	},
	{
		"id": "TA65",
		"supplement": "TA-65",
		"dosage": "10mg (might up to 20mg)",
		"link": "https://www.amazon.com/T-Sciences-Telomerase-Activation-Rejuvenation/dp/B00LTYQ5EG/ref=sr_1_1_sspa?dib=eyJ2IjoiMSJ9.vAyb8tTvbZviuwYBfXaQuUfg-dsOhaWOAzAG3kZ97glC0IBFcVPLO1mr2tIKwa6aIBGuSVITrU_TB7XyJ57OY2VFIzmfwzjf1OXgVzsEb9PXIEgdm81QYcM2K8AlpTyeWKngIL_3ikz3x5Mt662VG1H0vvyt2MmUTXCRJ7xTNnCMPTdAG53L8n5BvRYAPbeL2CFQCyMQTociS4SpFGzvH7zzgINU9i1D4NSa_zMMbaOmsGqwusky4yIzJpFbjVxx3szYZLvrrVK_mWMhyFLMBGtYBLXBY3aSmOP4oM9UCZ8._jHnAtPRlLXsfoDLaJZ56rhHes6E8Wcm8-3gIlvaCXA&dib_tag=se&keywords=ta-65&qid=1710482772&sr=8-1-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1",
		"ordered": false,
		"inProgress": false,
		"description": "TA-65, a proprietary extract of astragalus that supports telomere health and cellular aging."
	},
	{
		"id": "QUER",
		"supplement": "Quercetin",
		"dosage": "500mg",
		"link": "https://www.amazon.com/Pure-Quercetin-500mg-Supplement-Anti-Inflammatory/dp/B071Z379WC/ref=sr_1_4_sspa?dib=eyJ2IjoiMSJ9.ViUlSTlKaPJj3dXmhDNjwbLZI0vBQYANwL4U1rt4R046YFI7j1uTxNwIU7StRnPKOAnj5TaUWT1etHC5_vk6cPJKW_LYik3t0qIAgBBd2Hjip8XetcB2UNEhZKORa6YRnnTYzTGXTX1r1ppLNAanziYZsLTKt2VW77OQ26UZo8vr3HBNdLZftWp87dhcowVRdFuXw1--VtIngzoK1fyL7s98oH5oSODc8DzyfS68MEpiV-CWh-U-LT8F-wtHLgIC-fZMA-RhlSmkD1psKYvQMggmfThgD27mWB41DKtizlk.o8uUmigaZvkPed5iixXXHEvM4WRZmXsbDelGSaDBhyM&dib_tag=se&keywords=quercetin+500mg&qid=1710482792&sr=8-4-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1",
		"ordered": false,
		"inProgress": false,
		"description": "Quercetin, a flavonoid with antioxidant and anti-inflammatory properties that supports immune function and cardiovascular health."
	},
	{
		"id": "PTER",
		"supplement": "Pterostilbene",
		"dosage": "50mg",
		"link": "https://www.amazon.com/Jarrow-Formulas-Pterostilbene-Cardiovascular-Neurologic/dp/B005ACNW5S/ref=sr_1_6?dib=eyJ2IjoiMSJ9.sIHwTpuo_6PIkKct3OdbI-OXSV4hgvmqIeadDO2aWjztte_ZU3J4av4jJ8xK-AKYM8UZCOhe4gRX0a4--TnlgA7XG-6qQV9PHqXGUtcBBSKVjo7UzXpKft2et7uJPgdmD5NEo59A3A7UItfYcYg9bRbC5FjqG8axqO7vN0i5sHTNXDzb6LFVLcBrIiUz5aImtqd8SbmYjLYWg9WCf4Ymop_OpV4txm4zCCprvcI3tkuHhYKUpdU9Z5NR5rxrbFYOYr4TXB_wBgDhwWQPxlUKq35lEflGYkSysivRL4th66I.NjOhBSgk9DS2Kkmg3xJ9_4O2TLELFgkXnD8xkXltr4I&dib_tag=se&keywords=pterostilbene&qid=1710482834&sr=8-6",
		"ordered": false,
		"inProgress": false,
		"description": "Pterostilbene, a polyphenol similar to resveratrol with antioxidant and anti-aging properties."
	},
	{
		"id": "FISI",
		"supplement": "Fisitin",
		"dosage": "500mg",
		"link": "https://www.amazon.com/Therapeutic-Senolytic-Activator-Anti-Aging-Longevity/dp/B083M8QG1F",
		"ordered": false,
		"inProgress": false,
		"description": "Fisitin, a flavonoid with antioxidant and anti-inflammatory properties that supports healthy aging."
	},
	{
		"id": "MAG",
		"supplement": "Magnesium Threonate",
		"dosage": "144mg",
		"link": "https://www.amazon.com/Life-Extension-Neuro-Mag-L-Threonate-Vegetarian/dp/B006P536E6/ref=sr_1_6?dib=eyJ2IjoiMSJ9.4PBXRBbSXYJlN3aOps2HDHzIbJAz035Ak9LArv7itCTwPE-z2Z20OB7kEWtTwJwngM98zn8y4T_Rt5qlmHcMWIknG1y1R-vQ2vrft7qKUfoasTWnImxJKBjpLU78wagUyJG3CnI0NPcETlJY81mBrUaPJdnOgYgwWXjtxVTlvbGtXBXUAEuN3lTJHwytGoeIDgi8snQ8LVKAnMGFCBF2oSyaZjxgIhXqTp6SUahXYIe_AAnsqznk5QUDwQqeeqd4AR4ABXIHfnKcjRoWc2VDsUV-z1mXyyZfcH9DxYXZbqA.4s7f4PdfDAe_SAsrpTBoG-_-vexx7r1MLUkz9uSbPFg&dib_tag=se&keywords=magnesium+l-threonate&qid=1710482881&sr=8-6",
		"ordered": false,
		"inProgress": false,
		"description": "Magnesium Threonate, a form of magnesium that supports brain health, memory, and cognitive function."
	},
	{
		"id": "VITC2",
		"supplement": "Vitamin C",
		"dosage": "500mg",
		"link": "https://www.amazon.com/Nature-Made-Vitamin-500-Softgels/dp/B00I689DHY/ref=sr_1_7?dib=eyJ2IjoiMSJ9.8YqPT5Ldw6sW7Q-NrMh4zo8BwhMaPpCDMUr7PdEBmNRz_5ywgK-ZKUDhNMXeh5NNDoiFZdyWBXFu57lMnHlwygjVGmRdPiyjEUiI1TBaEKkI6RTOOO2LykOaYyDqiGwVy_3WcfxG8aNsQf039nCcRz1fUDiG-qB2sUTsaoyuOH-0Q5qY42qgVRmnVfk9X6mlwhXKbmZWmDd-Jc9JFQctoirM5l6yHkLNPpm7LpYIUsKQSq8NEfXjfMh_EANVJ7YKantvs4zSeeobIRMzvpbvTdApni_mYF7vdn1LSTGA_Gs.pNZT-zj1nSk42Dbny7wlmqhxQEd14kJbjTK6pA-AppI&dib_tag=se&hvadid=635427398333&hvdev=c&hvlocphy=9030087&hvnetw=g&hvqmt=b&hvrand=4920568680205467186&hvtargid=kwd-370811462133&hydadcr=21220_13415648&keywords=vitamin+c+500mg+capsule&qid=1710482915&sr=8-7",
		"ordered": false,
		"inProgress": false,
		"description": "Vitamin C, an essential nutrient with antioxidant properties that supports immune function and collagen synthesis."
	},
	{
		"id": "VITD",
		"supplement": "Vitamin D",
		"dosage": "5000 IU",
		"link": "https://www.amazon.com/Designs-Health-Vitamin-Supreme-Capsules/dp/B003CF7TOA/ref=sr_1_3_sspa?dib=eyJ2IjoiMSJ9.s9RFt4rLTea9WnyY3K3RITNHOrWYf3mEK-XqfVBVCtGj0TsHjGXSlyn1sU6iaxFZDELF7id9IcMRNd-DiBPjCtqmU8n4jN54ekMzFPMYJh34ut1nrsa-xYYrnVfv3ZEmoOkXy90PhUY1QPbxJCSzjEtgAUgFCmILPqfKihbb69wfUBJEs5EiBOn7s70leLoB790lAHtuzVppYgjOO4TQwJfCiHHFMjUhkTtxmjH4J3UE35UtJGBdYCwBaJXAuH0SHxTdJWwy6zvbmtFchYqihU4Z6cr7KGPFoHwrkkGSi78.c4ow701ErX52wYPKlX6MBzM5pR8wa9krI5kH5h3BK6I&dib_tag=se&keywords=vitamin+d+5000+iu&qid=1710482945&sr=8-3-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1",
		"ordered": false,
		"inProgress": false,
		"description": "Vitamin D, a fat-soluble vitamin that supports bone health, immune function, and muscle strength."
	},
	{
		"id": "PICE",
		"supplement": "Piceid Resveratrol",
		"dosage": "6mg (from Vinia)",
		"link": "https://vinia.com/",
		"ordered": false,
		"inProgress": false,
		"description": "Piceid Resveratrol, a form of resveratrol found in red grapes that supports cardiovascular health and longevity."
	},
	{
		"id": "C15",
		"supplement": "C15",
		"dosage": "1 pill",
		"link": "https://www.amazon.com/Gundry-Advantage-Mitochondrial-Booster-Function/dp/B0CK8NXJFP/ref=sr_1_2?dib=eyJ2IjoiMSJ9._JZu3LBbagrA1NSEgR66L1RHUlX72PJSuIsMjh35YPfwp4zitYEU_ImY_Tqwv5COAtoIge7Zlso4QbT59-kt7XmS8QbKxpsPBqDLpNT81DiPhwjaMuIO3fkFTRrYJvl6qNJ0w4cSggk7-1aU83HW4QOfBCia2HRRGwztpToyIMvHGboqvE8e1LcHrJlHeY7Ow3AdD-W8AEk1QLvdfR6MD0gz8mlCTs0YHyWVoXknWN7JEYlLrAPLcldAX6WmriaDZIZcetW1ht89eCKjDSrW_BJFahN0mMcvKXkz1J-m6o0.ay7LWalFZ6lpmzgJdFD_Rx_RCFt-2pe1jXOeJWNW_-A&dib_tag=se&keywords=C15&qid=1710483013&sr=8-2",
		"ordered": false,
		"inProgress": false,
		"description": "C15, a proprietary blend of ingredients that supports mitochondrial function and cellular energy production."
	},
	{
		"id": "RALA",
		"supplement": "R-ALA",
		"dosage": "100mg",
		"link": "https://www.amazon.com/Nutricost-R-Alpha-Lipoic-100mg-Capsules/dp/B09NS3KBNH/ref=sr_1_9?dib=eyJ2IjoiMSJ9.dYUxfmTAehEjylVAahLebAOiqdUV6AMCrRJ9DathONeltA0gRLcEqxTfhJyI6deqq3mV-Kq1sGAceiNKBsFv1xSrkkiRdJ8IG6NMoXKQzsIBphY4I85FyQM7ujAE4tDcO_S5RMBmXJsONowCUSR032WvheazomemD2POJU39cfo_3pxwavp6937LF8ZM2bOFT-A9pqLEGrNxwfJBkb1IyQ-VDXz2xp5b1dBpQP5T0wzTz0EtcxgINkrSGipHk_Q4fudrw6FCfyn_EvW-MJTo76xuh_YeywfaD4h3Zizx7_s.W8dxzDBpcMrVMmn5N9idLWtzk0ukrMevhmhfRRlUF0c&dib_tag=se&hvadid=377887916606&hvdev=c&hvlocphy=9030087&hvnetw=g&hvqmt=b&hvrand=17271265315270545049&hvtargid=kwd-807603144149&hydadcr=21855_9445361&keywords=r+alpha-lipoic-acid&qid=1710483042&sr=8-9",
		"ordered": false,
		"inProgress": false,
		"description": "R-ALA, or R-alpha lipoic acid, a potent antioxidant that supports cellular energy production and glucose metabolism."
	},
	{
		"id": "OMEGA",
		"supplement": "Omega-3",
		"dosage": "2-3g",
		"link": "https://www.amazon.com/Fish-Oil-Supplements-Omega3-3000mg/dp/B00SW1ULJO",
		"ordered": false,
		"inProgress": false,
		"description": "Omega-3, essential fatty acids that support cardiovascular health, brain function, and inflammation management."
	},
	{
		"id": "COLL",
		"supplement": "Collagen",
		"dosage": "15g",
		"link": "https://www.amazon.com/Medtrition-Prosource-NoCarb-Bottle/dp/B0735KJVQ4",
		"ordered": false,
		"inProgress": false,
		"description": "Collagen, a protein that supports skin, hair, nail, and joint health."
	},
	{
		"id": "AMINO",
		"supplement": "Amino Acids",
		"dosage": "5g",
		"link": "https://www.amazon.com/BSN-Recovery-Endurance-Essential-Caffeine/dp/B09HWRD7LJ",
		"ordered": false,
		"inProgress": false,
		"description": "Amino Acids, the building blocks of proteins that support muscle recovery, growth, and overall health."
	},
	{
		"id": "CREA",
		"supplement": "Creatine",
		"dosage": "5g",
		"link": "https://www.amazon.com/BULKSUPPLEMENTS-COM-Creatine-Monohydrate-Powder-Unflavored/dp/B00E9M4XFI?maas=maas_adg_F2B7DE2B62766DBD709B6B3613E2C4BF_afap_abs&ref_=aa_maas&tag=maas&utm_campaign=20888367106&utm_source=g&utm_medium=cpc&utm_content=&utm_term=creatine&ad_id=685498394336&wickedsource=google&wickedid=Cj0KCQjwwMqvBhCtARIsAIXsZpagwmC2NAd14PgRfuyw3_lpjOiQw-qA2CqbMZ_Tqmt7WWiHRf1oPrUaArkwEALw_wcB&wickedid=685498394336&wcid=20888367106&wv=4&gad_source=1&gclid=Cj0KCQjwwMqvBhCtARIsAIXsZpagwmC2NAd14PgRfuyw3_lpjOiQw-qA2CqbMZ_Tqmt7WWiHRf1oPrUaArkwEALw_wcB",
		"ordered": false,
		"inProgress": false,
		"description": "Creatine, a compound that supports muscle strength, power, and size."
	},
	{
		"id": "NR-E",
		"supplement": "NR-E",
		"dosage": "250mg",
		"link": "https://www.amazon.com/ELYSIUM-Basis-NAD-Supplement-Pterostilbene/dp/B0BRQR4M7R",
		"ordered": false,
		"inProgress": false,
		"description": "NR-E, a combination of nicotinamide riboside and pterostilbene that supports cellular energy production and healthy aging."
	},
	{
		"id": "PTER2",
		"supplement": "Pterostilbene",
		"dosage": "50mg",
		"link": "https://www.amazon.com/Jarrow-Formulas-Pterostilbene-Cardiovascular-Neurologic/dp/B005ACNW5S",
		"ordered": false,
		"inProgress": false,
		"description": "Pterostilbene, a polyphenol similar to resveratrol with antioxidant and anti-aging properties."
	},
	{
		"id": "NMN",
		"supplement": "NMN",
		"dosage": "250mg",
		"link": "https://www.amazon.com/Dihydronicotinamide-Mononucleotide-Nicotinamide-Double-Wood/dp/B0CKCPRG5W/ref=sr_1_7?dib=eyJ2IjoiMSJ9.z6TBID2-VFdEVwASgBkjwd5njFjPPZVieoC0hjKfNXUg1aiiDCT8SP7Pv29Qy3OZcCpwx7rlbQNJXJBfxFRTzpG926HJkB2Hzs8MVvFhsxJJe5SnF4sAHArCS2398vyXuC4o9_Sp0i88g_SGDck1Gxf8DNVRyv_nNAJ2CjQIsgQRxjEY9JxkOUqfz3It6v3ZYsmh6vzX2-W65Yrmxvy_zig3C6ZTDdavbvemZNcj7glg17WBpY6FPFcTe53M5V14vGvpOERvDzZod52XmHyVDm5ld6nYq05PNChN2vMRNls.WORKbPpSpTCg-gOInpNz5BR5sO1GMgxSD7C8Va7Kl88&dib_tag=se&keywords=nmn&qid=1710483229&sr=8-7",
		"ordered": false,
		"inProgress": false,
		"description": "NMN, or nicotinamide mononucleotide, a precursor to NAD+ that supports cellular energy production and healthy aging."
	},
	{
		"id": "HONO",
		"supplement": "Honokiol and Grape Vine Extract",
		"dosage": "150mg",
		"link": "https://www.elysiumhealth.com/pages/signal-supplement-facts",
		"ordered": false,
		"inProgress": false,
		"description": "Honokiol and Grape Vine Extract, a combination of compounds that supports cellular health and longevity."
	},
	{
		"id": "SULP",
		"supplement": "Sulphorophane",
		"dosage": "50mg",
		"link": "https://www.amazon.com/Peak-Revival-X-Stabilized-Sulforaphane-Supplement/dp/B0BRQTNC4C/ref=sr_1_19_sspa?dib=eyJ2IjoiMSJ9.fWY6sOB_CfR0CqEN551LaBd-kEHWXUHqimsaOIehms7GXjD4tCDJzIVNNdAXNPfxszJ9oNIdGdZhJ2j1VjJ0Zjis_AWhKBB1IoBgOGvlkzB9IVYa6DQ0dtpaj97kswkHnNSSqrTlW4rW87YgPDo8Gnn4ouQWIZS-3KjkCCW5Scc6OrCFreUcQ1sxVBQ6azs7ffSoZ9lP4RGIQifWGQpYbd9jV16ulOn6h2CXhqYFsN6YivRUrBeYnUJCYLto8i7RkCYsQp6wbbVxvcDBg5QNTXAT9yZBkXxZFv4oCueBWH4.8PoxzMDmzdYgSQOkOOfPq7IzzB4P4WtT6Ve8eAALr0k&dib_tag=se&keywords=sulforaphane&qid=1710483381&sr=8-19-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9tdGY&psc=1",
		"ordered": false,
		"inProgress": false,
		"description": "Sulphorophane, a compound found in cruciferous vegetables that supports detoxification and cellular health."
	},
	{
		"id": "BERB",
		"supplement": "Berberine",
		"dosage": "500mg",
		"link": "https://www.amazon.com/Berberine-Supplement-500mg-Veggie-Capsules/dp/B0C7FF131K/ref=sr_1_4_sspa?dib=eyJ2IjoiMSJ9.SEIVCzy9-thnGvA-I_q1t1V1RBRqJw4HS6JokM_-5r7dP_4MS3FX37V_JStLue-zEp3y4y-Lhx7BwlkySqFVkRvZ-pkKrNJ0YAhPk_4lgpUveS4ivQWK6ZnvZ7Q2VZrEU0UpqwrykGNd0dcwnti0fF9btAjHfHyH9dw372mKwdBW4r_Y96k-tPX6SGT6dX3Lb8KP_XUAC7-SCnHYtE0oAWe59B0W9d6e5Jl6vT_8GS4kugcJT7yGRuvhzKeyuBLQVSoyoVr0QN2X8gZXhtpi_T4CTJ945bAdGUg8zJEY1EQ.hccJg2q21HjQiY4adW0yTOKuehWs_Dy59YJ_v2UiNxY&dib_tag=se&hvadid=570576479003&hvdev=c&hvlocphy=9030087&hvnetw=g&hvqmt=b&hvrand=9093650510923718618&hvtargid=kwd-424584098855&hydadcr=27862_14512623&keywords=500+mg+of+berberine&qid=1710483419&sr=8-4-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1",
		"ordered": false,
		"inProgress": false,
		"description": "Berberine, a plant compound that supports glucose metabolism, cardiovascular health, and weight management."
	},
	{
		"id":"AG1S",
		"supplement": "AG1",
		"dosage": "1 Scoop",
		"link":"https://drinkag1.com",
		"ordered": false,
		"inProgress": false,
		"description": "Combines essential vitamins, minerals, and antioxidants like Alpha Lipoic Acid, CoQ10, and a blend of Calcium for comprehensive daily nutrition and healthy aging."
	}
];
