# Sequel: Your Longevity Assistant

Sequel is an open-source software application meticulously designed to be your ultimate companion in taking control of your health through personalized nutrition. By leveraging our cutting-edge platform, users can effortlessly analyze lab reports, track supplement and nutrient intake, and access a comprehensive library of evidence-based information. Our mission is to empower you with the tools and knowledge necessary to make informed decisions about your well-being, guiding you towards a healthier, longer life.

![Sequel Logo](https://res.cloudinary.com/dxnttogew/image/upload/f_auto,q_auto/lgd7qlaz1tuzlvcqlhd2)

## Getting Started

To embark on your journey with Sequel, clone our project repository from GitHub and follow the setup instructions laid out below. Sequel is developed using modern web technologies and adheres to best practices in the industry, ensuring a user-friendly experience.

### Prerequisites

- Node.js (LTS Version recommended)
- npm (Node Package Manager)

### Installation

1. Clone the Sequel repository:
```sh
git clone https://github.com/sequelhq/sequel.git
```

2. Navigate to the Sequel project directory:
```sh
cd sequel
```

3. Add the .env file to the root of the project (see .env.example)
   - If you are using Whoop, please make sure to update the redirect URIs in your developer portal:
    ```sh
        sequel://app-view?module=whoop, http://localhost:3000
    ```


4. Install the project dependencies:
```sh
bun install
```


5. Start the development server:
```sh
bun run devstart
```


6. Start the electron app:
```sh
bun run electron
```


## Key Features

- **Lab Report Analysis**: Upload and analyze your medical lab reports to gain insights into your health status and how you can improve it through nutrition.
- **Nutrient Tracking**: Keep a detailed log of your daily supplement and nutrient intake to ensure you're meeting your personalized health goals.
- **Evidence-Based Information**: Access a vast collection of scientific research and information to support your nutrition choices, ensuring they're grounded in credible evidence.
- **Community Engagement**: Connect with a supportive community of individuals who are also on their journey to improved health. Share experiences, tips, and encouragement.
## Contributing to Sequel

Sequel thrives on the vibrant contributions of our community. We encourage you to contribute, whether it's through adding new features, fixing bugs, or enhancing our documentation. Your efforts help make Sequel a more powerful tool for everyone.

## License

Sequel is proudly open source, licensed under the MIT License. You are free to use, modify, and distribute the software in accordance with the license terms.