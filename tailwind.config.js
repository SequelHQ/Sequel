import colors from "tailwindcss/colors";

const config = {
	content: [
		"./src/**/*.{js,ts,jsx,tsx}",

		// Path to Tremor module
		"./node_modules/@tremor/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		transparent: "transparent",
		current: "currentColor",
		extend: {
			colors: {
				// light mode
				tremor: {
					brand: {
						faint: "#0B1229",
						muted: colors.blue[950],
						subtle: colors.blue[800],
						DEFAULT: colors.blue[500],
						emphasis: colors.blue[400],
						inverted: colors.blue[950],
					},
					background: {
						muted: "#131A2B",
						subtle: colors.gray[800],
						DEFAULT: colors.gray[900],
						emphasis: colors.gray[300],
					},
					border: {
						DEFAULT: colors.gray[800],
					},
					ring: {
						DEFAULT: colors.gray[800],
					},
					content: {
						subtle: colors.gray[600],
						DEFAULT: colors.gray[500],
						emphasis: colors.gray[200],
						strong: colors.gray[50],
						inverted: colors.gray[950],
					},
				},
				// dark mode
				"dark-tremor": {
					brand: {
						faint: "#0B1229",
						muted: colors.blue[950],
						subtle: colors.blue[800],
						DEFAULT: colors.blue[500],
						emphasis: colors.blue[400],
						inverted: colors.blue[950],
					},
					background: {
						muted: "#131A2B",
						subtle: colors.gray[800],
						DEFAULT: colors.gray[900],
						emphasis: colors.gray[300],
					},
					border: {
						DEFAULT: colors.gray[800],
					},
					ring: {
						DEFAULT: colors.gray[800],
					},
					content: {
						subtle: colors.gray[600],
						DEFAULT: colors.gray[500],
						emphasis: colors.gray[200],
						strong: colors.gray[50],
						inverted: colors.gray[950],
					},
				},
			},
			boxShadow: {
				// light
				"tremor-input": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
				"tremor-card":
          "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
				"tremor-dropdown":
          "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
				// dark
				"dark-tremor-input": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
				"dark-tremor-card":
          "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
				"dark-tremor-dropdown":
          "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
			},
			borderRadius: {
				"tremor-small": "0.375rem",
				"tremor-default": "0.5rem",
				"tremor-full": "9999px",
			},
			fontSize: {
				"tremor-label": ["0.75rem", { lineHeight: "1rem" }],
				"tremor-default": ["0.875rem", { lineHeight: "1.25rem" }],
				"tremor-title": ["1.125rem", { lineHeight: "1.75rem" }],
				"tremor-metric": ["1.875rem", { lineHeight: "2.25rem" }],
			},
		},
	},
	safelist: [
		{
			pattern:
        /^(bg-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
			variants: ["hover", "ui-selected"],
		},
		{
			pattern:
        /^(text-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
			variants: ["hover", "ui-selected"],
		},
		{
			pattern:
        /^(border-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
			variants: ["hover", "ui-selected"],
		},
		{
			pattern:
        /^(ring-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
		},
		{
			pattern:
        /^(stroke-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
		},
		{
			pattern:
        /^(fill-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
		},
	],
	plugins: [require("@headlessui/tailwindcss"), require("@tailwindcss/forms")],
};

export default config;
