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
