For error free session use virtual environment and always be on root of the project’s directory .

Step 1: Install Expo CLI
	npm install -g expo-cli
Step 2: Create your project
	expo init currency-recognition-app
	# Choose 'blank (JavaScript)' or 'blank (TypeScript)' template
Step 3: Start the app
	cd currency-recognition-app
	expo start
deleteApp.tsx /rename into  App.js
How to run backend:
    1. Install required packages:
		pip install fastapi uvicorn python-multipart opencv-python numpy
	Run the server:
		uvicorn main:app --reload --host 0.0.0.0 --port 8000 
How to Replace('Dataset') folder with your currency template database
“dataset_path = 'Dataset'” in main.py 

How to test from React Native app :
From your phone (Expo), update this line in your app:
	const response = await fetch('http://YOUR_MAC_IP:8000/recognize', { …

for ip address :	
	ipconfig    --for windows ,
	ipconfig getifaddr en0   --for mac .

Step-by-Step Explanation
1.FastAPI server is running on your pc :
	uvicorn main:app --reload --host 0.0.0.0 --port 8000
Build the React Native App :
	npx expo install expo-image-picker


Your actual app is the React Native mobile app you built using Expo.
Download ‘Expo Go’ app from app/playstore .

Use Expo Go {easy} : 
	npx expo start 
Open the QR code scanner in the Expo Go app (on your phone).
    • Scan the QR code → it will open your app.
For apk file :
Login to your Expo account :
	eas login 
‘https://expo.dev/signup’
Configure your project for EAS Build : 

	eas build:configure

Build the Android App :

	eas build -p android --profile preview

if your local FastAPI backend be reachable over the internet via HTTPS:
1.Install ngrok:
	npm install -g ngrok
2.Once logged in, go to:
https://dashboard.ngrok.com/get-started/your-authtoken
You’ll see a token like this:
		ngrok config add-authtoken 2P1cXJ4...xyz
run that code 
Example:
	ngrok config add-authtoken 2P1cXJ4abc123xyz456
It will show:
	Authtoken saved to configuration file: ~/.ngrok2/ngrok.yml
now
Now Run Ngrok Again
Start your FastAPI backend:
	uvicorn main:app --reload --host 0.0.0.0 --port 8000
Then in another terminal:
	ngrok http 8000
To use your ngrok HTTPS forwarding URL:
const response = await fetch('https://<your-ngrok-id>.ngrok.io/recognize', {
Example:
const response = await fetch('https://a1b2c3d4.ngrok.io/recognize', {

Then in another terminal:
	npx expo start
if you want Rebuild the APK
	eas build -p android --profile preview
Or:
	eas build -p android



