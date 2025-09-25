import { retrieveRelevantDocuments, generateMedicalContext, type MedicalDocument } from "./medical-knowledge"

export interface RAGQuery {
  query: string
  language: "en" | "hi" | "te" | "ta" | "or" | "kn" // Added new language codes
  location?: string
  userContext?: {
    age?: number
    gender?: string
    medicalHistory?: string[]
  }
}

export interface RAGResponse {
  retrievedDocuments: MedicalDocument[]
  generatedPrompt: string
  context: string
}

// Enhanced prompt generation with medical context
export function generateMedicalPrompt(ragQuery: RAGQuery, retrievedDocs: MedicalDocument[]): string {
  const { query, language, location, userContext } = ragQuery
  const context = generateMedicalContext(retrievedDocs)

  const languageInstructions = {
    en: "Respond in English",
    hi: "हिंदी में उत्तर दें (Respond in Hindi)",
    te: "తెలుగులో సమాధానం ఇవ్వండి (Respond in Telugu)",
    ta: "தமிழில் பதிலளிக்கவும் (Respond in Tamil)",
    or: "ଓଡ଼ିଆରେ ଉତ୍ତର ଦିଅନ୍ତୁ (Respond in Odia)",
    kn: "ಕನ್ನಡದಲ್ಲಿ ಉತ್ತರಿಸಿ (Respond in Kannada)",
  }

  const basePrompt = `You are a helpful medical AI assistant for rural healthcare in India. ${languageInstructions[language]}.

IMPORTANT GUIDELINES:
- Always provide accurate, evidence-based medical information
- For serious symptoms, always recommend consulting a healthcare professional
- Be culturally sensitive and use simple, understandable language
- Include preventive care advice when relevant
- If unsure about any medical advice, recommend consulting a doctor
- Never provide specific medication dosages without professional consultation

MEDICAL CONTEXT FROM KNOWLEDGE BASE:
${context}

USER QUERY: ${query}

${
  userContext
    ? `USER CONTEXT:
- Age: ${userContext.age || "Not specified"}
- Gender: ${userContext.gender || "Not specified"}
- Medical History: ${userContext.medicalHistory?.join(", ") || "None specified"}`
    : ""
}

${location ? `LOCATION: ${location}` : ""}

Please provide a helpful, accurate response based on the medical context above. If the query is about emergency symptoms, emphasize the need for immediate medical attention.`

  return basePrompt
}

// Main RAG function
export function processRAGQuery(ragQuery: RAGQuery): RAGResponse {
  // Retrieve relevant documents
  const retrievedDocuments = retrieveRelevantDocuments(
    ragQuery.query,
    ragQuery.language,
    5, // Get top 5 relevant documents
  )

  // Generate enhanced prompt
  const generatedPrompt = generateMedicalPrompt(ragQuery, retrievedDocuments)

  // Generate context summary
  const context = generateMedicalContext(retrievedDocuments)

  return {
    retrievedDocuments,
    generatedPrompt,
    context,
  }
}

// Safety check for medical queries
export function isMedicalEmergency(query: string): boolean {
  const emergencyKeywords = [
    "chest pain",
    "heart attack",
    "stroke",
    "bleeding",
    "unconscious",
    "difficulty breathing",
    "severe pain",
    "poisoning",
    "allergic reaction",
    "suicide",
    "overdose",
    "severe burn",
    "broken bone",
    "head injury",
  ]

  const queryLower = query.toLowerCase()
  return emergencyKeywords.some((keyword) => queryLower.includes(keyword))
}

// Generate emergency response
export function generateEmergencyResponse(language: "en" | "hi" | "te" | "ta" | "or" | "kn"): string {
  // Updated type
  const responses = {
    en: "🚨 MEDICAL EMERGENCY DETECTED 🚨\n\nThis appears to be a medical emergency. Please:\n1. Call emergency services immediately (108 in India)\n2. Go to the nearest hospital\n3. If someone is unconscious, check breathing and pulse\n4. Stay calm and follow emergency operator instructions\n\nDo not delay seeking professional medical help.",
    hi: "🚨 चिकित्सा आपातकाल का पता चला 🚨\n\nयह एक चिकित्सा आपातकाल लगता है। कृपया:\n1. तुरंत आपातकालीन सेवाओं को कॉल करें (भारत में 108)\n2. निकटतम अस्पताल जाएं\n3. यदि कोई बेहोश है, तो सांस और नाड़ी की जांच करें\n4. शांत रहें और आपातकालीन ऑपरेटर के निर्देशों का पालन करें\n\nपेशेवर चिकित्सा सहायता लेने में देरी न करें।",
    te: "🚨 వైద్య అత్యవసర పరిస్థితి గుర్తించబడింది 🚨\n\nఇది వైద్య అత్యవసర పరిస్థితిగా కనిపిస్తోంది. దయచేసి:\n1. వెంటనే అత్యవసర సేవలకు కాల్ చేయండి (భారతదేశంలో 108)\n2. సమీప ఆసుపత్రికి వెళ్లండి\n3. ఎవరైనా అపస్మారక స్థితిలో ఉంటే, శ్వాస మరియు నాడిని తనిఖీ చేయండి\n4. ప్రశాంతంగా ఉండండి మరియు అత్యవసర ఆపరేటర్ సూచనలను అనుసరించండి\n\nవృత్తిపరమైన వైద్య సహాయం పొందడంలో ఆలస్యం చేయవద్దు।",
    ta: "🚨 மருத்துவ அவசரநிலை கண்டறியப்பட்டது 🚨\n\nஇது மருத்துவ அவசரநிலையாக தோன்றுகிறது. தயவுசெய்து:\n1. உடனடியாக அவசர சேவைகளை அழைக்கவும் (இந்தியாவில் 108)\n2. அருகிலுள்ள மருத்துவமனைக்கு செல்லவும்\n3. யாராவது மயக்கமடைந்திருந்தால், சுவாசம் மற்றும் நாடித்துடிப்பை சரிபார்க்கவும்\n4. அமைதியாக இருங்கள் மற்றும் அவசர ஆபரேட்டர் அறிவுரைகளை பின்பற்றவும்\n\nதொழில்முறை மருத்துவ உதவியை பெறுவதில் தாமதம் செய்யாதீர்கள்।",
    or: "🚨 ଚିକିତ୍ସା ଜରୁରୀକାଳୀନ ପରିସ୍ଥିତି ଚିହ୍ନଟ ହୋଇଛି 🚨\n\nଏହା ଏକ ଚିକିତ୍ସା ଜରୁରୀକାଳୀନ ପରିସ୍ଥିତି ପରି ଦେଖାଯାଉଛି। ଦୟାକରି:\n1. ତୁରନ୍ତ ଜରୁରୀକାଳୀନ ସେବାକୁ କଲ କରନ୍ତୁ (ଭାରତରେ 108)\n2. ନିକଟସ୍ଥ ଡାକ୍ତରଖାନାକୁ ଯାଆନ୍ତୁ\n3. ଯଦି କେହି ଅଚେତନ ଅଛନ୍ତି, ତେବେ ଶ୍ୱାସ ଏବଂ ନାଡ଼ି ଯାଞ୍ଚ କରନ୍ତୁ\n4. ଶାନ୍ତ ରୁହନ୍ତୁ ଏବଂ ଜରୁରୀକାଳୀନ ଅପରେଟରଙ୍କ ନିର୍ଦ୍ଦେଶ ଅନୁସରଣ କରନ୍ତୁ\n\nବୃତ୍ତିଗତ ଚିକିତ୍ସା ସହାୟତା ନେବାରେ ବିଳମ୍ବ କରନ୍ତୁ ନାହିଁ।",
    kn: "🚨 ವೈದ್ಯಕೀಯ ತುರ್ತುಸ್ಥಿತಿ ಪತ್ತೆಯಾಗಿದೆ 🚨\n\nಇದು ವೈದ್ಯಕೀಯ ತುರ್ತುಸ್ಥಿತಿಯಂತೆ ಕಾಣುತ್ತದೆ. ದಯವಿಟ್ಟು:\n1. ತಕ್ಷಣ ತುರ್ತು ಸೇವೆಗಳಿಗೆ ಕರೆ ಮಾಡಿ (ಭಾರತದಲ್ಲಿ 108)\n2. ಹತ್ತಿರದ ಆಸ್ಪತ್ರೆಗೆ ಹೋಗಿ\n3. ಯಾರಾದರೂ ಪ್ರಜ್ಞೆ ಕಳೆದುಕೊಂಡಿದ್ದರೆ, ಉಸಿರಾಟ ಮತ್ತು ನಾಡಿಮಿಡಿತವನ್ನು ಪರಿಶೀಲಿಸಿ\n4. ಶಾಂತವಾಗಿರಿ ಮತ್ತು ತುರ್ತು ಆಪರೇಟರ್ ಸೂಚನೆಗಳನ್ನು ಅನುಸರಿಸಿ\n\nವೃತ್ತಿಪರ ವೈದ್ಯಕೀಯ ಸಹಾಯವನ್ನು ಪಡೆಯುವಲ್ಲಿ ವಿಳಂಬ ಮಾಡಬೇಡಿ।",
  }

  return responses[language]
}
