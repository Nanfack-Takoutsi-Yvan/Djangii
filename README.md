<img src="https://djangii.com/assets/images/Djangii.png" width="160px" alt="Djangii logo" style="display: block; margin: 0 auto"/>

# Djangii - Tontine Management App

Djangii is a React Native app that allows users to manage and track their tontine savings. With Djangii, you can easily keep track of contributions and withdrawals, view payment histories, and communicate with other members of your tontine group.

## Features

- Secure authentication with user login and registration.
- Add and manage tontine groups.
- Add and manage tontine members.
- Keep track of member contributions and withdrawals.
- View tontine payment histories and balances.
- In-app messaging between tontine members.
- Push notifications for important updates.

## Requirements

- Node.js
- npm or yarn
- React Native development environment set up on your machine.

## Installation

To install and run the Djangii app, follow these steps:

1. Clone the repository:
   ```bash
   ssh://djangit@test.djangii.com:7328/repositories/djangii-mobile.git
   ```
2. Navigate to the project directory:
   ```bash
   cd djangii-mobile
   ```
3. Install the project dependencies:
   ```bash
   npm install
   ```
   or
   ```bash
   yarn install
   ```
4. Run the app:
   ```bash
   npm run start
   ```
   or
   ```bash
   yarn start
   ```

## Configuration

To configure Djangii to work with your backend, you will need to update the API_URL variable in the src/config/index.js file. Replace the value with the URL of your backend API.

    ``` javascript
    export const API_URL = '...';
    ```

## Contributing

If you would like to contribute to Djangii, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them with a descriptive message.
4. Push your changes to your forked repository.
5. Open a pull request.

## License

Djangii is released under the MIT License.
