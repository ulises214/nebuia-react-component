# Nebuia react component

This is a library to integrate Nebuia into your react app.

## Installation

```bash
npm install nebuia-react-component
```

## Requirements

To use this library you need to have a Nebuia account and a valid API key.
You can get this information in the Nebuia dashboard. [https://admin.nebuia.com](https://admin.nebuia.com)

## Usage

```javascript
import { NebuiaStepsList } from 'nebuia-react-component';

<NebuiaStepsList
  enableBackground // Use own background, if false its background is transparent
  withDetailsPage // Shows a final page with the report summary
  lang="es" // Optional: Language of the component, default is "es", supported languages are "es" and "en"
  kyc={REPORT} // Optional: Initialize the component with a report, if not provided it will create a new report
  email={EMAIL} // Optional: Initialize the component with an email, if not provided it will ask the user for it
  phone={PHONE} // Optional: Initialize the component with a phone, if not provided it will ask the user for it
  onFinish={async (report) => {
    // When the user finishes the process, this function is called with the report
  }}
  getKeys={() => {
    // Returns the API keys, or a promise that resolves to the API keys
    return {
      apiKey: 'API_KEY',
      apiSecret: 'API_SECRET',
    };
  }}
/>;
```

## Styles

### Global styles

If your aop use another style system other than tailwind, you should import the global styles.

```javascript
import 'nebuia-react-component/dist/esm/index.css';
```

### Tailwindcss

If your app use tailwind, you can import the tailwind config extending the default styles.

In your tailwind.config.js file add the following:

```javascript
import { NEBUIA_TAILWIND_CONFIG } from 'nebuia-react-component/dist/tailwind'; // <- Add this line

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "....." // <- Your content
    "./node_modules/nebuia-react-component/dist/**/*.{js,ts,jsx,tsx}" // <- Add this line
  ],
  theme: {
    ...NEBUIA_TAILWIND_CONFIG // <- Add this line
  }
};
```

Also the tailwind form plugin is required, you can install it with:

```bash
npm install @tailwindcss/forms
```

And add it to your tailwind.config.js file:

```javascript
module.exports = {
  plugins: [require('@tailwindcss/forms')],
};
```

In your index.css file add the following import at the top:

```css
@import 'nebuia-react-component/dist/base.css';
```
