# LifeScape

## Our Vision
LifeScape is an innovative mobile application designed to transform your personal growth and productivity journey into an engaging and immersive experience. Inspired by the dynamic elements of Massively Multiplayer Online Role-Playing Games (MMO-RPGs), LifeScape provides a unique environment where users can set personal goals on a daily, weekly, monthly, yearly, or custom basis, track their progress, and stay motivated. In LifeScape, your reallife tasks and objectives become exciting quests. Completing these goals is akin to completing a quest in a game, unlocking new levels and rewards that mirror your accomplishments in real life. Each user has their own character that they can level up and upgrade using the rewards earned from completing quests. This gamified approach adds an extra layer of motivation to everyday activities. 

## First time setup client side:
- Make sure Node is installed
- Download Expo Go on your Android/IOS device
- Make an account (remember username and password)
- Clone the respository and go to `lifescape-app` directory
- Run `npx expo login` in the terminal
- Login using credentials
- Run `npm i` to install packages
- Run `npx expo start`
- The terminal will display a bunch of text and a QR Code.
- Under the QRCode, there should be a line with text displaying "Metro waiting on exp://IP_ADDRESS:PORT"
- Copy the IP_ADDRESS part of the text and then create a `.env` file under the root directory("lifescape-app")
- In the `.env` file, create a variable called EXPO_PUBLIC_IP_ADDRESS and assign it the IP_ADDRESS, ex. EXPO_PUBLIC_IP_ADDRESS="IP_ADDRESS"
- After setting that up, follow the instructions to setup the server side and run the server
- After running the server, terminate current expo session using ctrl-c and then run `npx expo start -c`.
- The app should now appear in your expo go app on your phone, click on it and make an account. 

## First time setup server side:
- Make sure Node is installed
- Go into the `lifescape-server` directory
- Run `npm i` to install packages
- Create a `.env` file under `lifescape-server`
- In the `.env` file, create a variable called DATABASE_URL and assign it your given connection_url, ex. DATABASE_URL="DATABASE_URL"
- Afterwards, run `npx prisma db pull`
- Then run `npx prisma generate`
- Thats it for the database, now for setting up Firebase.
- Log in to Google Firebase with the email that you gave me
- After logging it, it should be telling you to select a project, you should see lifescape as a project, click on it
- Afterwards, on the top left, to the right of Project Overview is settings icon, click on it and select `Project Settings`
- Click on the `Service Accounts` tab on the top and then click `Generate new private key`
- Once you generate the private key, which should be a json file, rename it `credentials.json` and then move the file to be under the `lifescape-server` directory
- Make sure that its named correctly or you might push it onto the repository which is big nono. Triple check.
- Finally, run `npm start` and all should be good.

## Common Errors:
**Q: Why does it say expo is in non-interactive mode? I can't run the npx expo login command.**

This is an issue specific to Git Bash. Try using cmd or another unix distro.

**Q: Issues connecting the expo app from your terminal:**

If the internet connection to your phone is not optimal, you may not be able to connect. Please ensure that your phone is also receiving good connection. 
