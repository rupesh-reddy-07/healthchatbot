// Medical knowledge base for RAG system
export interface MedicalDocument {
  id: string
  title: string
  content: string
  category: string
  tags: string[]
  language: "en" | "hi" | "te"
  embedding?: number[]
}

export const medicalKnowledgeBase: MedicalDocument[] = [
  // Common Health Issues
  {
    id: "fever-1",
    title: "Fever Management",
    content:
      "Fever is a common symptom that indicates your body is fighting an infection. Normal body temperature is around 98.6°F (37°C). A fever is generally considered when temperature rises above 100.4°F (38°C). For mild fever, rest and drink plenty of fluids. Use paracetamol or ibuprofen as directed. Seek medical attention if fever exceeds 103°F (39.4°C) or persists for more than 3 days.",
    category: "symptoms",
    tags: ["fever", "temperature", "infection", "paracetamol"],
    language: "en",
  },
  {
    id: "fever-2",
    title: "बुखार का इलाज",
    content:
      "बुखार एक सामान्य लक्षण है जो दर्शाता है कि आपका शरीर संक्रमण से लड़ रहा है। सामान्य शरीर का तापमान लगभग 98.6°F (37°C) होता है। आमतौर पर बुखार तब माना जाता है जब तापमान 100.4°F (38°C) से ऊपर हो जाता है। हल्के बुखार के लिए, आराम करें और भरपूर तरल पदार्थ पिएं। निर्देशानुसार पैरासिटामोल या इबुप्रोफेन का उपयोग करें।",
    category: "symptoms",
    tags: ["बुखार", "तापमान", "संक्रमण", "पैरासिटामोल"],
    language: "hi",
  },
  {
    id: "fever-3",
    title: "జ్వరం నిర్వహణ",
    content:
      "జ్వరం అనేది మీ శరీరం ఇన్ఫెక్షన్‌తో పోరాడుతున్నట్లు సూచించే సాధారణ లక్షణం. సాధారణ శరీర ఉష్ణోగ్రత దాదాపు 98.6°F (37°C). సాధారణంగా ఉష్ణోగ్రత 100.4°F (38°C) కంటే ఎక్కువ అయినప్పుడు జ్వరం అని భావిస్తారు. తేలికపాటి జ్వరానికి, విశ్రాంతి తీసుకోండి మరియు పుష్కలంగా ద్రవాలు తాగండి।",
    category: "symptoms",
    tags: ["జ్వరం", "ఉష్ణోగ్రత", "ఇన్ఫెక్షన్", "పారాసిటమాల్"],
    language: "te",
  },
  // Vaccination Information
  {
    id: "covid-vaccine-1",
    title: "COVID-19 Vaccination",
    content:
      "COVID-19 vaccines are safe and effective. Adults should receive 2 doses of primary vaccination followed by booster doses as recommended. Common side effects include pain at injection site, fatigue, headache, and mild fever. These are normal signs that your immune system is responding. Serious adverse events are rare. Vaccination is recommended for all eligible individuals.",
    category: "vaccination",
    tags: ["covid-19", "vaccine", "booster", "side effects"],
    language: "en",
  },
  {
    id: "child-vaccines-1",
    title: "Childhood Immunization Schedule",
    content:
      "Children should receive vaccines according to the national immunization schedule. Key vaccines include: BCG (at birth), Hepatitis B (birth, 6 weeks, 10 weeks, 14 weeks), DPT (6, 10, 14 weeks), Polio (birth, 6, 10, 14 weeks), MMR (9-12 months), and others. Vaccines prevent serious diseases and are safe when given as scheduled.",
    category: "vaccination",
    tags: ["children", "immunization", "BCG", "DPT", "polio", "MMR"],
    language: "en",
  },
  // Maternal Health
  {
    id: "pregnancy-1",
    title: "Pregnancy Care",
    content:
      "Regular prenatal care is essential for healthy pregnancy. Schedule regular check-ups with healthcare provider. Take folic acid supplements, eat nutritious food, avoid alcohol and smoking. Watch for warning signs like severe headache, vision changes, severe abdominal pain, or bleeding. Attend all scheduled ultrasounds and tests.",
    category: "maternal-health",
    tags: ["pregnancy", "prenatal", "folic acid", "ultrasound"],
    language: "en",
  },
  // Emergency Situations
  {
    id: "emergency-1",
    title: "Medical Emergency Signs",
    content:
      "Seek immediate medical attention for: chest pain, difficulty breathing, severe bleeding, loss of consciousness, severe burns, suspected poisoning, severe allergic reactions, stroke symptoms (face drooping, arm weakness, speech difficulty), or severe injuries. Call emergency services or go to nearest hospital immediately.",
    category: "emergency",
    tags: ["emergency", "chest pain", "breathing", "stroke", "bleeding"],
    language: "en",
  },
  // Common Diseases
  {
    id: "diabetes-1",
    title: "Diabetes Management",
    content:
      "Diabetes requires ongoing management. Monitor blood sugar levels regularly, take medications as prescribed, follow a healthy diet, exercise regularly, and maintain healthy weight. Watch for symptoms of high blood sugar (frequent urination, excessive thirst, fatigue) or low blood sugar (shakiness, sweating, confusion). Regular check-ups are essential.",
    category: "chronic-disease",
    tags: ["diabetes", "blood sugar", "medication", "diet", "exercise"],
    language: "en",
  },
  {
    id: "hypertension-1",
    title: "High Blood Pressure",
    content:
      "High blood pressure (hypertension) often has no symptoms but increases risk of heart disease and stroke. Normal blood pressure is less than 120/80 mmHg. Manage through regular exercise, healthy diet (low sodium), maintaining healthy weight, limiting alcohol, not smoking, and taking prescribed medications. Monitor regularly.",
    category: "chronic-disease",
    tags: ["hypertension", "blood pressure", "heart disease", "diet", "exercise"],
    language: "en",
  },
  // Preventive Care
  {
    id: "hygiene-1",
    title: "Personal Hygiene",
    content:
      "Good hygiene prevents many diseases. Wash hands frequently with soap and water for at least 20 seconds, especially before eating and after using bathroom. Brush teeth twice daily, bathe regularly, keep nails clean and trimmed, wear clean clothes, and maintain clean living environment.",
    category: "prevention",
    tags: ["hygiene", "handwashing", "dental care", "cleanliness"],
    language: "en",
  },
]

// Simple text similarity function for basic RAG
export function calculateSimilarity(query: string, document: string): number {
  const queryWords = query.toLowerCase().split(/\s+/)
  const docWords = document.toLowerCase().split(/\s+/)

  let matches = 0
  queryWords.forEach((word) => {
    if (docWords.some((docWord) => docWord.includes(word) || word.includes(docWord))) {
      matches++
    }
  })

  return matches / queryWords.length
}

// Retrieve relevant documents based on query
export function retrieveRelevantDocuments(
  query: string,
  language: "en" | "hi" | "te" = "en",
  limit = 3,
): MedicalDocument[] {
  const filteredDocs = medicalKnowledgeBase.filter((doc) => doc.language === language)

  const scoredDocs = filteredDocs.map((doc) => ({
    ...doc,
    score: calculateSimilarity(query, `${doc.title} ${doc.content} ${doc.tags.join(" ")}`),
  }))

  return scoredDocs
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .filter((doc) => doc.score > 0.1) // Only return docs with some relevance
}

// Generate context for LLM prompt
export function generateMedicalContext(documents: MedicalDocument[]): string {
  if (documents.length === 0) {
    return "No specific medical information found in knowledge base."
  }

  return documents
    .map(
      (doc) => `Title: ${doc.title}\nCategory: ${doc.category}\nContent: ${doc.content}\nTags: ${doc.tags.join(", ")}`,
    )
    .join("\n\n---\n\n")
}
