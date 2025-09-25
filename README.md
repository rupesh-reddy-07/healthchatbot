# Health Chatbot

We built this project during a hackathon as a team of 6. The goal was to create a chatbot that makes health information more accessible and interactive.
What started as a simple AI chat app quickly grew as we experimented and added more features.

 # What It Does

   Chat with an AI about health questions

   AI can read out answers (with play/stop controls)

   Understand  multiple languages for giving Reply's  

   Works smoothly on both desktop and mobile

 # Features Added During the Hackathon :

   Vaccination schedule reminders

   Smarter AI health chat with improved responses

   Basic doctor consultation support

   Visual health analysis (sample inputs included)

   Health tracking for ongoing monitoring

   Healthcare finder to locate nearby services

   Health alerts and notifications

We’ve also included sample inputs so anyone testing the app can quickly see how the features work.

 # How to Run Locally :

   Clone the repository 

   git clone https://github.com/rupesh-reddy-07/healthchatbot.git
   cd healthchatbot


# Install dependencies :

  npm install
  # or
  yarn install


# Add environment variables :
  Create a .env.local file in the root directory and add:

  TWILIO_ACCOUNT_SID=your_twilio_account_sid
  TWILIO_AUTH_TOKEN=your_twilio_auth_token
  TWILIO_PHONE_NUMBER=your_twilio_phone_number
  OPENAI_API_KEY=your_openai_api_key
  NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000/


# Start the development server

  npm run dev
  # or
  yarn dev


 Open http://localhost:3000
  in your browser.

# Tech We Used :

   Next.js + React – Frontend framework

   Tailwind CSS – Styling

   Twilio – Planned for SMS/WhatsApp features

   Web Speech API – Voice responses

# What’s Next :

   The hackathon version gave us a solid foundation. We are planning to expand it with more features to make it an even stronger health assistant.
