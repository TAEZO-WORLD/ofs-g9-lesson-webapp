const fs = require('fs');
const path = require('path');

const outputDir = path.join(__dirname, '../public/lessons/2026-09-21-sweden-forests-fika');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const lessonData = {
  "lessonTitle": "Sweden: Forests, Fika, and Fantastic Ideas",
  "ofsUnit": "Unit 1 — Global Cultures, Identity & Daily Life",
  "level": "OFS Grade 9 International English G1/G2 ESL",
  "textType": "Cultural Profile / Informational Visual Text",
  "writingType": "Evidence-Based Cultural Profile Paragraph",
  "duration": "90 minutes",
  "lessonGoal": "Students identify how the provided visual text describes Sweden’s geography, history, identity, current questions, and daily routines, distinguish source claims from personal experience, and write a balanced evidence-based cultural profile.",
  
  "warmUp": {
    "title": "Warm-up",
    "instructions": "Read and discuss the warm-up questions with a partner. Share your thoughts on local culture, historical influence, and daily balance. Remember that personal experience differs from person to person and no single individual represents an entire country.",
    "questions": [
      "What places, foods, traditions, or outdoor activities help describe your community?",
      "How can a country’s history influence its identity today?",
      "What makes daily life feel balanced, comfortable, or connected to nature?"
    ]
  },

  "article": {
    "title": "Sweden: Forests, Fika, and Fantastic Ideas",
    "sourceNote": "Original text transcribed from three teacher-provided classroom images. No publication credit, article URL, date, or named source is shown in the images; statements should be treated as claims of the provided visual text, not as independently verified current facts.",
    "pages": [
      {
        "pageNumber": 1,
        "pageLabel": "Page 1 — Overview & Geography",
        "epigraph": "Keep your face always toward the sunshine—and shadows will fall behind you. - Walt Whitman",
        "title": "Sweden: Forests, Fika, and Fantastic Ideas",
        "paragraphs": [
          "Sweden is a long, skinny country in Northern Europe, part of a group of countries called Scandinavia. It borders Norway to the west, Finland to the east, and has a long coastline on the Baltic Sea. Its capital is Stockholm, a city built on 14 islands!"
        ],
        "factBox": [
          "Population: About 10.5 million",
          "Size: 450,000 km² (about the size of California)",
          "Currency: Swedish krona (SEK)",
          "Language: Swedish"
        ]
      },
      {
        "pageNumber": 2,
        "pageLabel": "Page 2 — Identity & Current Questions",
        "sections": [
          {
            "heading": "What shaped its identity?",
            "intro": "Sweden’s identity was shaped by Viking explorers, peaceful traditions, and a strong focus on fairness and nature.",
            "bullets": [
              "Over 1,000 years ago, people from what is now Sweden were part of the Viking world. These Swedish Vikings traveled mostly east, trading along rivers in Russia and even reaching the Middle East.",
              "In the 1600s, Sweden was a powerful kingdom in Europe, but over time it chose peace over war. It hasn’t fought in a war for more than 200 years.",
              "In the 1900s, Sweden built a society based on education, equality, and care for all."
            ]
          },
          {
            "heading": "What Is Sweden Dealing With Today?",
            "intro": "Like many countries, Sweden is facing big questions about how to keep people safe and included.",
            "paragraphs": [
              "In recent years, there have been worries about rising crime in some cities, and leaders are working on how to make neighborhoods feel safer for everyone.",
              "Sweden is also thinking hard about how many refugees and immigrants it can help. Some people want stricter rules, while others want to keep helping more."
            ]
          }
        ]
      },
      {
        "pageNumber": 3,
        "pageLabel": "Page 3 — Daily Life & Traditions",
        "sections": [
          {
            "heading": "What is daily life like?",
            "intro": "Life in Sweden is calm, cozy, and closely connected to nature, with simple routines that focus on balance:",
            "cards": [
              "Kids usually go to school from around 8 AM to 2 PM, and everyone gets a free hot lunch — no lunchboxes needed!",
              "Most people take a break in the day for “fika”: a cozy snack time with coffee or juice and something sweet like cinnamon buns.",
              "Swedes love to bike, walk, or take public buses and trains, even in the snow. Cities are built for easy travel without a car.",
              "Whether it’s summer or snowy winter, families often spend time outdoors. Kids might go sledding, or visit a forest!"
            ]
          }
        ]
      }
    ]
  },

  "vocabularyInContext": {
    "title": "Vocabulary in Context",
    "instructions": "Study the key vocabulary items below from the visual text. Pay attention to the part of speech, accessible definition, Korean meaning, and original example sentence outside the reading.",
    "items": [
      {
        "word": "skinny",
        "partOfSpeech": "adjective",
        "definition": "thin or narrow in shape",
        "korean": "얇고 긴, 마른",
        "sentence": "The narrow peninsula forms a skinny strip of land extending into the cold northern waters."
      },
      {
        "word": "coastline",
        "partOfSpeech": "noun",
        "definition": "the boundary where land meets the sea or ocean",
        "korean": "해안선",
        "sentence": "Fishing boats travel along the long coastline to supply fresh fish to coastal markets."
      },
      {
        "word": "Scandinavia",
        "partOfSpeech": "proper noun",
        "definition": "a historical and cultural region in Northern Europe that includes Denmark, Norway, and Sweden",
        "korean": "스칸디나비아 (북유럽 지역)",
        "sentence": "Travelers visit Scandinavia to experience its breathtaking forests, lakes, and distinct winter culture."
      },
      {
        "word": "identity",
        "partOfSpeech": "noun",
        "definition": "the qualities, history, and values that define a group, nation, or person",
        "korean": "정체성",
        "sentence": "Preserving historical traditions and natural parks helps strengthen the community's cultural identity."
      },
      {
        "word": "Viking",
        "partOfSpeech": "noun",
        "definition": "historical Scandinavian seafarers, traders, and explorers active between the 8th and 11th centuries",
        "korean": "바이킹 (야망/탐험가)",
        "sentence": "Viking merchants navigated inland river networks across Eastern Europe to exchange silver and goods."
      },
      {
        "word": "equality",
        "partOfSpeech": "noun",
        "definition": "the state of having equal rights, status, and opportunities",
        "korean": "평등",
        "sentence": "Providing equal access to quality education ensures social equality for all young citizens."
      },
      {
        "word": "included",
        "partOfSpeech": "adjective",
        "definition": "feeling welcomed, valued, and made part of a community",
        "korean": "포함된, 소외되지 않은",
        "sentence": "Neighborhood welcoming committees ensure that international families feel respected and included."
      },
      {
        "word": "refugee",
        "partOfSpeech": "noun",
        "definition": "a person forced to leave their country to escape war, conflict, or persecution",
        "korean": "난민",
        "sentence": "Humanitarian aid groups work tirelessly to offer safe housing and meals to every arriving refugee."
      },
      {
        "word": "immigrant",
        "partOfSpeech": "noun",
        "definition": "a person who moves to a foreign country to settle permanently",
        "korean": "이민자",
        "sentence": "The vibrant neighborhood features international bakeries established by recent immigrant families."
      },
      {
        "word": "fika",
        "partOfSpeech": "noun",
        "definition": "a Swedish custom of taking a cozy daily break for coffee, juice, and sweet pastries with friends or colleagues",
        "korean": "피카 (커피와 디저트를 나누는 휴식 문화)",
        "sentence": "Colleagues gather in the staff lounge at mid-morning to share news during their daily fika."
      }
    ]
  },

  "mainIdeaQuestion": {
    "question": "What is the main focus of the three-page visual text?",
    "options": [
      "A. Sweden has no current social questions because its history is peaceful.",
      "B. The visual introduces Sweden’s geography, history, identity, current questions, and examples of daily life.",
      "C. Sweden is presented only as a country where every family spends time outdoors.",
      "D. The visual proves that all Swedish people follow exactly the same routines."
    ],
    "correctIndex": 1,
    "correctFeedback": "Correct! (O) The visual text spans three pages introducing location/geography (Page 1), historical identity and current social questions (Page 2), and daily life routines (Page 3).",
    "incorrectFeedback": "Incorrect. (X) Option B is correct because the source covers geography, historical identity, modern policy debates, and daily routines across all three pages without claiming every person lives identically.",
    "explanation": "Across its three pages, the visual text provides an overview of Sweden by combining physical geography (Page 1), historical background and modern questions (Page 2), and common daily life routines (Page 3)."
  },

  "readingComprehension": {
    "title": "Reading Comprehension",
    "instructions": "Answer the following 6 multiple-choice questions based on the visual text. Select the best answer for each question.",
    "questions": [
      {
        "id": "rc1",
        "question": "What does Page 1 state about Sweden’s location and geography?",
        "options": [
          "A. Sweden is located in Southern Europe and borders the Mediterranean Sea.",
          "B. Sweden is a long, skinny country in Northern Europe, part of Scandinavia, bordering Norway and Finland with a Baltic Sea coastline.",
          "C. Sweden is an island nation located entirely in the North Atlantic Ocean.",
          "D. Sweden is a landlocked country surrounded entirely by high mountain ranges."
        ],
        "correctIndex": 1,
        "correctFeedback": "Correct! (O) Page 1 explicitly states that Sweden is a long, skinny country in Northern Europe, part of Scandinavia, bordering Norway and Finland with a long Baltic Sea coastline.",
        "incorrectFeedback": "Incorrect. (X) Option B matches Page 1, which describes Sweden's Northern European location, border nations, and Baltic Sea coastline.",
        "explanation": "Page 1 describes Sweden's position in Scandinavia (Northern Europe), its land borders with Norway and Finland, and its coastline on the Baltic Sea.",
        "pageRef": "Page 1 — Overview & Geography"
      },
      {
        "id": "rc2",
        "question": "Which set of statistics appears in the Page 1 fact box?",
        "options": [
          "A. Population about 5 million, size 100,000 km², currency Euro (EUR), language English.",
          "B. Population about 10.5 million, size 450,000 km² (about the size of California), currency Swedish krona (SEK), language Swedish.",
          "C. Population about 20 million, size 900,000 km², currency Krona, language Norwegian.",
          "D. Population about 10.5 million, size equal to Texas, currency Swedish dollar, language Finnish."
        ],
        "correctIndex": 1,
        "correctFeedback": "Correct! (O) The Page 1 fact box lists Population: About 10.5 million, Size: 450,000 km² (about the size of California), Currency: Swedish krona (SEK), and Language: Swedish.",
        "incorrectFeedback": "Incorrect. (X) Option B matches the exact fact box items printed on Page 1.",
        "explanation": "The Page 1 fact box records 10.5 million population, 450,000 km² size, Swedish krona (SEK) currency, and Swedish language.",
        "pageRef": "Page 1 — Fact Box"
      },
      {
        "id": "rc3",
        "question": "What historical detail about Swedish Vikings is highlighted on Page 2?",
        "options": [
          "A. Swedish Vikings sailed west across the Atlantic Ocean to settle in North America.",
          "B. Over 1,000 years ago, Swedish Vikings traveled mostly east, trading along rivers in Russia and reaching the Middle East.",
          "C. Swedish Vikings avoided river routes and traded only along local Baltic coastlines.",
          "D. Swedish Vikings engaged in continuous European warfare for the past 200 years."
        ],
        "correctIndex": 1,
        "correctFeedback": "Correct! (O) Page 2 states that over 1,000 years ago, Swedish Vikings traveled mostly east, trading along rivers in Russia and reaching the Middle East.",
        "incorrectFeedback": "Incorrect. (X) Option B is correct according to the Page 2 history bullet about Eastern river trading routes.",
        "explanation": "Page 2 explicitly mentions that Swedish Vikings traveled east along Russian rivers and traded as far as the Middle East.",
        "pageRef": "Page 2 — What shaped its identity?"
      },
      {
        "id": "rc4",
        "question": "How does Page 2 present the current social questions facing Sweden today?",
        "options": [
          "A. Sweden faces no social questions because its history has been peaceful for 200 years.",
          "B. Sweden faces questions about safety and inclusion, including worries about crime in some cities and debates on how many refugees and immigrants to help.",
          "C. Sweden is actively engaged in military conflicts across Northern Europe.",
          "D. Sweden's main ongoing debate is whether to replace its official language with English."
        ],
        "correctIndex": 1,
        "correctFeedback": "Correct! (O) Page 2 describes worries about rising crime in some cities and public debates over whether to set stricter rules or continue helping more refugees and immigrants.",
        "incorrectFeedback": "Incorrect. (X) Option B accurately summarizes the two main current questions presented on Page 2 (neighborhood safety and refugee/immigrant policies).",
        "explanation": "Page 2 outlines modern social questions regarding neighborhood safety and public debate over refugee and immigrant policy.",
        "pageRef": "Page 2 — What Is Sweden Dealing With Today?"
      },
      {
        "id": "rc5",
        "question": "According to Page 3, what does the word “fika” refer to?",
        "options": [
          "A. A compulsory morning sports session conducted in Swedish public schools.",
          "B. A cozy break in the day for coffee or juice and something sweet like cinnamon buns.",
          "C. A traditional winter festival celebrated exclusively in deep pine forests.",
          "D. A government lunch program providing free hot meals to school students."
        ],
        "correctIndex": 1,
        "correctFeedback": "Correct! (O) Page 3 defines “fika” as a cozy snack break with coffee or juice and something sweet like cinnamon buns.",
        "incorrectFeedback": "Incorrect. (X) Option B matches the exact description of fika given on Page 3.",
        "explanation": "Page 3 describes fika as a cozy daily snack break featuring coffee or juice accompanied by a sweet baked good like a cinnamon bun.",
        "pageRef": "Page 3 — Daily Life"
      },
      {
        "id": "rc6",
        "question": "Which statement best summarizes the Page 3 description of daily routines in Sweden?",
        "options": [
          "A. Daily life centers entirely on private automobile commuting and fast food eating.",
          "B. It describes calm routines focusing on balance, including free hot school lunches, fika breaks, public transit/biking, and outdoor family activities.",
          "C. It proves that every family in Sweden visits a forest every single afternoon without exception.",
          "D. It claims that cold winter weather prevents families from spending time outdoors."
        ],
        "correctIndex": 1,
        "correctFeedback": "Correct! (O) Page 3 describes daily routines that emphasize balance: free hot school lunches, fika snack breaks, convenient public transit/biking, and year-round outdoor family recreation.",
        "incorrectFeedback": "Incorrect. (X) Option B captures the balanced daily life routines described across the four cards on Page 3.",
        "explanation": "Page 3 highlights school lunch programs, fika breaks, car-free urban travel, and year-round outdoor recreation as examples of balanced daily living.",
        "pageRef": "Page 3 — Daily Life"
      }
    ]
  },

  "evidenceFromText": {
    "title": "Evidence from the Text",
    "instructions": "Answer the following three questions using specific details from the visual text. Provide complete sentences and click Check & Compare to review rule-based feedback and a model answer.",
    "prompts": [
      {
        "id": "ev1",
        "statement": "What details from Page 1 show where Sweden is located and how it is described geographically?",
        "modelAnswer": "According to Page 1 of the visual text, Sweden is located in Northern Europe as part of Scandinavia. It is described as a long, skinny country bordering Norway to the west and Finland to the east, with a long coastline on the Baltic Sea and a capital city, Stockholm, built on 14 islands.",
        "compareTips": "Ensure your answer names Northern Europe/Scandinavia, borders (Norway/Finland), Baltic Sea coastline, and Stockholm's 14 islands."
      },
      {
        "id": "ev2",
        "statement": "Which two details from Page 2 connect Sweden’s history or identity with peace, equality, fairness, or nature?",
        "modelAnswer": "On Page 2, the text explains that Sweden's identity was shaped by peaceful traditions and care for nature. Specific details include that Sweden chose peace over war and hasn't fought in a war for more than 200 years, and that in the 1900s it built a society based on education, equality, and care for all.",
        "compareTips": "Include specific details from Page 2 such as 200+ years without war, 1900s focus on education/equality, or Viking river trading history."
      },
      {
        "id": "ev3",
        "statement": "What examples from Page 3 show the source’s idea of balanced daily life?",
        "modelAnswer": "Page 3 shows balanced daily life through routines such as students receiving free hot school lunches, people taking daily 'fika' breaks with coffee and cinnamon buns, residents relying on biking or public transit even in snow, and families spending outdoor time sledding or visiting forests.",
        "compareTips": "Check that you cited specific Page 3 examples such as free hot school lunches, fika breaks, public transit/biking, and outdoor recreation."
      }
    ]
  },

  "languageFocus": {
    "title": "Language Focus — Source Reporting & Descriptive Structure",
    "instructions": "Study how the visual text uses descriptive noun phrases, passive voice, time markers, contrast words, and cautious source reporting. Practice writing balanced sentences about cultural sources.",
    "grammarPoint": "Grammar & Source-Literacy Focus",
    "explanation": "When summarizing cultural visual texts, use accurate grammar patterns while distinguishing source claims from personal experience:",
    "examples": [
      "Descriptive Noun Phrases: 'a long, skinny country', 'a long coastline on the Baltic Sea'",
      "Passive Voice: 'was shaped by Viking explorers...', 'was built on 14 islands', 'Cities are built for easy travel...'",
      "Time Markers: 'Over 1,000 years ago', 'In the 1600s', 'In the 1900s', 'In recent years'",
      "Participle Phrase: 'trading along rivers in Russia and even reaching the Middle East'",
      "Contrast Connectors: 'but over time it chose peace', 'Some people want stricter rules, while others want...'",
      "Embedded Question / Purpose: 'how to keep people safe and included', 'how many refugees... it can help'",
      "With + Noun Phrase: 'with simple routines that focus on balance'",
      "Cautious Source Reporting: Use 'According to the visual...', 'The text notes...', 'This example suggests...' rather than making sweeping claims about all people."
    ]
  },

  "writingPractice": {
    "title": "Writing Practice",
    "instructions": "Complete the 4 writing activities below. Use the required sentence frames and connectors, then click Check & Compare to view model answers.",
    "prompts": [
      {
        "id": "wp1",
        "question": "1. Write one evidence sentence using a Page 1 fact box detail and the reporting frame 'According to the visual, ...'.",
        "modelAnswer": "According to the visual, Sweden has a population of about 10.5 million people and covers an area of 450,000 km², which is roughly the size of California.",
        "compareTips": "Verify that your sentence begins with 'According to the visual,' and includes exact Page 1 statistics (10.5 million, 450,000 km², SEK, or Swedish language)."
      },
      {
        "id": "wp2",
        "question": "2. Combine a historical detail from Page 2 and a present-day detail using 'Although' or 'While'.",
        "modelAnswer": "While Sweden was a powerful kingdom in Europe during the 1600s, over time it chose peaceful traditions and has not fought in a war for more than 200 years.",
        "compareTips": "Check that you used 'Although' or 'While' to connect a historical fact (1600s kingdom / Vikings) with a peace or modern detail."
      },
      {
        "id": "wp3",
        "question": "3. Write a cause-and-effect sentence explaining how history or social values may influence national identity, using cautious language such as 'may' or 'can'.",
        "modelAnswer": "A historical commitment to public education and social care can encourage a strong cultural focus on equality, fairness, and community wellbeing today.",
        "compareTips": "Ensure your sentence uses cautious verbs ('may', 'can', 'suggests') to link historical traditions or values with current cultural identity."
      },
      {
        "id": "wp4",
        "question": "4. Write a respectful recommendation explaining why readers should avoid generalizing about an entire population from a single visual source.",
        "modelAnswer": "While a visual text provides helpful cultural examples such as fika and outdoor recreation, readers should remember that individual experiences vary and one short source cannot represent every person in a nation.",
        "compareTips": "Verify that your sentence recommends respectful interpretation and notes that one visual source does not represent every citizen."
      }
    ]
  },

  "writingTask": {
    "title": "Final Writing Task — Evidence-Based Cultural Profile Paragraph",
    "instructions": "Write a balanced evidence-based cultural profile paragraph of 100–140 words answering the prompt below. Follow the checklist and click Check & Compare when finished.",
    "prompt": "How does the visual text present Sweden’s identity and daily life? Write a balanced evidence-based cultural profile paragraph of 100–140 words. Use at least three accurate details from the three pages, include one historical or identity detail and one daily-life detail, explain what these details suggest, acknowledge that a visual source cannot represent every person, and end with a respectful concluding sentence.",
    "checklist": [
      "Clear controlling idea about Sweden's identity and daily life as presented in the visual text",
      "At least three accurate source details drawn from Page 1, Page 2, and Page 3",
      "At least one historical or identity detail (e.g., 200 years of peace, Viking trade, 1900s equality)",
      "At least one daily-life or current question detail (e.g., fika, outdoor activities, school lunch, safety debates)",
      "Source reporting phrases (e.g., 'According to the visual...', 'The text indicates...')",
      "Cautious explanation verbs ('suggests', 'may indicate', 'can reflect')",
      "A respectful limitation acknowledging that a single visual source does not speak for all 10.5 million people",
      "Clear paragraph organization with smooth transitions and a respectful concluding sentence",
      "Word count strictly between 100 and 140 words"
    ],
    "modelAnswer": "The visual text introduces Sweden as a Scandinavian country whose identity connects historical heritage, modern social values, and cozy daily routines. According to the source, Sweden’s identity was shaped by Viking river trade, over 200 years of peace, and a 20th-century commitment to equality and public care. Today, daily life emphasizes balance through shared traditions like \"fika\" snack breaks, free school hot lunches, and outdoor family activities in nature. These details suggest that Swedish culture values community wellbeing and connection to the environment. However, readers can recognize that a single visual source presents general overview claims rather than identical experiences for all 10.5 million residents. Overall, examining both historical values and daily practices offers a respectful starting point for understanding Sweden’s cultural profile."
  },

  "selfCheck": {
    "title": "Self-Check",
    "instructions": "Review your work against these 6 criteria before submitting your lesson.",
    "items": [
      "I cited at least three accurate details from Page 1, Page 2, and Page 3 of the visual text.",
      "I included one historical or identity detail (such as 200 years of peace or Viking trade) and one daily-life detail (such as fika or outdoor recreation).",
      "I used cautious reporting frames (e.g., 'According to the visual...', 'The text suggests...') to present source claims accurately.",
      "I acknowledged that a single visual source cannot represent the individual experiences of every person in a nation.",
      "My paragraph maintains a clear controlling idea, smooth transitions, and a respectful concluding sentence.",
      "My final written paragraph is within the target length of 100–140 words."
    ]
  },

  "teacher": {
    "modelAnswer": "The visual text introduces Sweden as a Scandinavian country whose identity connects historical heritage, modern social values, and cozy daily routines. According to the source, Sweden’s identity was shaped by Viking river trade, over 200 years of peace, and a 20th-century commitment to equality and public care. Today, daily life emphasizes balance through shared traditions like \"fika\" snack breaks, free school hot lunches, and outdoor family activities in nature. These details suggest that Swedish culture values community wellbeing and connection to the environment. However, readers can recognize that a single visual source presents general overview claims rather than identical experiences for all 10.5 million residents. Overall, examining both historical values and daily practices offers a respectful starting point for understanding Sweden’s cultural profile.",
    
    "answerKey": {
      "mainIdea": "B — The visual introduces Sweden’s geography, history, identity, current questions, and examples of daily life.",
      "readingComprehension": {
        "rc1": "B — Long, skinny country in Northern Europe, part of Scandinavia, bordering Norway & Finland with Baltic Sea coastline.",
        "rc2": "B — Population: About 10.5 million, Size: 450,000 km², Currency: Swedish krona (SEK), Language: Swedish.",
        "rc3": "B — Over 1,000 years ago, Swedish Vikings traveled east, trading along Russian rivers to the Middle East.",
        "rc4": "B — Concerns about safety/crime in some cities and public debate over how many refugees/immigrants to help.",
        "rc5": "B — Cozy snack break in the day with coffee or juice and something sweet like cinnamon buns.",
        "rc6": "B — Calm routines focusing on balance: free hot lunches, fika breaks, public transit/biking, year-round outdoor time."
      },
      "evidenceFromText": {
        "ev1": "Located in Northern Europe (Scandinavia); long, skinny country; borders Norway (west), Finland (east); Baltic Sea coastline; capital Stockholm on 14 islands.",
        "ev2": "Shaped by Viking explorers, peaceful traditions, fairness/nature; chose peace over war (no war for 200+ years); 1900s society built on education, equality, care for all.",
        "ev3": "Free hot school lunch (no lunchbox); daily fika break with coffee/juice & sweet pastry; biking/public transit in snow; year-round outdoor activities (sledding, forest visits)."
      },
      "languageFocus": {
        "summary": "Demonstrates mastery of descriptive noun phrases, passive voice, historical time markers, contrast connectors, embedded questions, with+noun phrase, and cautious source-reporting frames."
      },
      "writingPractice": {
        "wp1": "According to the visual, Sweden has a population of about 10.5 million people and a land area of 450,000 km².",
        "wp2": "While Sweden was a powerful kingdom in the 1600s, it later chose peace over war and has not fought in a war for over 200 years.",
        "wp3": "A long tradition of public education and social equality can foster a strong cultural focus on fairness and community care.",
        "wp4": "Readers should avoid generalizing about an entire country because one short visual source cannot capture the diverse daily lives of all citizens."
      }
    },

    "rubric": [
      {
        "criterion": "Content & Ideas",
        "excellent": "Presents a nuanced controlling idea integrating geographical, historical, and daily life claims from all three pages of the visual text; clearly distinguishes source claims from general personal assumptions.",
        "developing": "Identifies basic information from the visual text but may overgeneralize source claims or omit key sections such as historical identity or daily routines.",
        "beginning": "Struggles to identify accurate source facts or relies heavily on unverified personal stereotypes about Sweden."
      },
      {
        "criterion": "Evidence Use",
        "excellent": "Integrates at least 3 exact, relevant source details (e.g., 200 years of peace, fika, 10.5M population, Stockholm islands) with flawless source-attribution frames.",
        "developing": "Includes 1–2 details from the text but lacks precise page attribution or leaves details unexplained.",
        "beginning": "Fails to provide specific evidence from the visual text or misquotes printed figures."
      },
      {
        "criterion": "Target Language/Structure",
        "excellent": "Uses descriptive noun phrases, passive voice ('was shaped by'), time markers, contrast structures ('while/although'), and cautious reporting verbs ('suggests', 'may indicate') effectively.",
        "developing": "Attempts target structures but makes minor errors in passive voice or contrast connector usage.",
        "beginning": "Uses repetitive basic sentence structures without applying taught language focus patterns."
      },
      {
        "criterion": "Organization",
        "excellent": "Structures paragraph logically from overview/history to daily routines and cautious limitation; ends with a strong, respectful concluding sentence.",
        "developing": "Shows basic paragraph structure but transitions between historical context and daily life feel abrupt.",
        "beginning": "Lacks clear organization, topic sentence, or concluding statement."
      },
      {
        "criterion": "Accuracy",
        "excellent": "Maintains excellent grammatical accuracy, punctuation, capitalization, and stays strictly within the 100–140 word count range.",
        "developing": "Contains minor mechanical or agreement errors that do not impair overall comprehension; word count slightly out of range.",
        "beginning": "Frequent grammatical errors interfere with clarity; word count significantly under or over limit."
      }
    ],

    "teacherNotes": [
      "Source Image Structure: The locked reading is transcribed from 3 distinct visual pages. Page 1 introduces geography/facts, Page 2 covers identity/history/current questions, and Page 3 presents daily life cards.",
      "Fact Box Verification: Ensure students preserve exact figures: Population (about 10.5 million), Size (450,000 km² / California comparison), Currency (Swedish krona / SEK), Language (Swedish).",
      "Viking History Context: Note that Swedish Vikings traveled mostly east along Russian river networks reaching the Middle East, contrasting with Norwegian/Danish Vikings who traveled west across the Atlantic.",
      "200-Year Peace & Neutrality: Emphasize that Sweden's selection of peace over war since the early 1800s is presented in the text as a key historical pillar of its modern identity.",
      "Source Claims vs. National Statistics: Remind students that statements about crime, refugee debates, school lunches, or biking are claims presented in a specific visual source, not independently verified statistical studies.",
      "Cultural Generalization Caution: Guide students to avoid saying 'All Swedes do X.' Teach cautious frames ('The visual indicates...', 'Many families enjoy...') to build respectful cultural literacy.",
      "Fika Cultural Concept: Highlight 'fika' as both a vocabulary item and a social tradition emphasizing balance and cozy rest during work or school days.",
      "Pictured Portrait & Imagery: The Walt Whitman quote on Page 1 is an epigraph. Do not invent details or attempt to identify people shown in original background photographs.",
      "ESL Scaffolding (G1 vs G2): For G1 students, provide sentence frames for combining Page 2 history with Page 3 daily routines. For G2 students, challenge them to analyze how historical peace correlates with modern social safety nets.",
      "Assessment Integrity: Ensure students complete all 8 teaching phases sequentially and do not leak teacher resources into student view."
    ],

    "teachingPhases": [
      {
        "phase": "Phase 1: Opening & Goal Setting",
        "durationMinutes": 5,
        "script": [
          "Teacher Action: Display the lesson title 'Sweden: Forests, Fika, and Fantastic Ideas' on the board. Introduce the lesson goal: examining a 3-page visual text to understand Sweden's geography, history, identity, modern questions, and daily life.",
          "Teacher Script (EN): 'Good morning class! Today we are exploring a visual cultural profile of Sweden. We will analyze how geography, history, and daily routines shape a country's identity, while learning to write about cultural sources with evidence and respect.'",
          "Teacher Script (KO): '안녕하세요 여러분! 오늘은 스웨덴의 지리, 역사, 그리고 일상문화를 다룬 시각 자료를 함께 읽고 분석합니다. 출처의 내용을 정확한 근거를 바탕으로 존중하며 서술하는 글쓰기를 연습할 것입니다.'",
          "Student Action: Listen actively, open Student Mode on their devices, and locate the lesson header.",
          "Misconception & Correction: Students might assume Sweden is small or identical to other European nations. Teacher clarifies that Sweden has unique geography (14 islands capital, 450,000 km²) and distinct historical trade routes.",
          "Transition: 'Let's begin with our Warm-up questions to connect our personal experiences with cultural identity.'"
        ]
      },
      {
        "phase": "Phase 2: Warm-up & Community Discussion",
        "durationMinutes": 10,
        "script": [
          "Teacher Action: Lead a 10-minute partner discussion using the 3 warm-up questions.",
          "Teacher Script (EN): 'Turn to your partner and discuss Question 1: What places, foods, or outdoor activities describe your community? Then consider how history shapes identity in Question 2, and what creates balance in daily life in Question 3.'",
          "Teacher Script (KO): '짝과 함께 1번 질문을 먼저 논의해보세요: 여러분의 공동체를 설명하는 장소, 음식, 야외 활동은 무엇인가요? 이어서 역사가 정체성에 미치는 영향과 일상의 균형에 대해 이야기 나눠보세요.'",
          "Student Action: Discuss questions in pairs for 6 minutes, then share 2–3 volunteer responses with the class.",
          "Misconception & Correction: Students may think one person's daily routine represents an entire country. Teacher emphasizes: 'Personal experiences vary greatly; no single person speaks for an entire nation.'",
          "Transition: 'Now let's examine the key vocabulary words we will meet in the reading.'"
        ]
      },
      {
        "phase": "Phase 3: Vocabulary in Context",
        "durationMinutes": 12,
        "script": [
          "Teacher Action: Present the 10 vocabulary terms (skinny, coastline, Scandinavia, identity, Viking, equality, included, refugee, immigrant, fika) with definitions, Korean meanings, and example sentences.",
          "Teacher Script (EN): 'Let's look at item 10, \"fika\". In Sweden, fika is not just eating a pastry; it is a cozy daily break for coffee or juice with friends or colleagues that promotes social balance.'",
          "Teacher Script (KO): '10번 단어 \"fika\"를 살펴봅시다. 스웨덴에서 피카는 단순한 빵 섭취가 아닌, 동료나 친구들과 함께 커피나 주스를 마시며 일상의 균형을 도모하는 따뜻한 휴식 문화입니다.'",
          "Student Action: Repeat key terms aloud, note parts of speech and Korean meanings, and complete practice oral sentences.",
          "Misconception & Correction: Students might confuse 'refugee' and 'immigrant'. Teacher clarifies: A refugee is forced to flee war/persecution, while an immigrant moves to settle permanently.",
          "Transition: 'With these 10 words in mind, let's read the visual text page by page.'"
        ]
      },
      {
        "phase": "Phase 4: First Reading & Visual Gist",
        "durationMinutes": 10,
        "script": [
          "Teacher Action: Guide students through a first silent reading of the locked three-page text, focusing on main layout structures.",
          "Teacher Script (EN): 'Read Page 1, Page 2, and Page 3 silently. Notice how Page 1 presents geography and facts, Page 2 explores history and current policy questions, and Page 3 highlights daily routines.'",
          "Teacher Script (KO): '1, 2, 3페이지를 조용히 읽어보세요. 1페이지는 지리와 팩트 박스, 2페이지는 역사와 현대의 사회적 질문, 3페이지는 일상 루틴을 다루고 있음에 유의하세요.'",
          "Student Action: Read the locked text individually without altering any words, then complete the Main Idea MCQ.",
          "Misconception & Correction: Students might pick Option A or C thinking Sweden has no problems or only outdoors. Teacher guides them to Option B which covers all 3 pages comprehensively.",
          "Transition: 'Great job! Now let's analyze the passage line by line in our Detailed Evidence Reading.'"
        ]
      },
      {
        "phase": "Phase 5: Detailed Evidence Reading & Sentence Analysis",
        "durationMinutes": 18,
        "script": [
          "Teacher Action: Lead the 18-minute sentence-by-sentence analysis using the 21 detailed guide entries. Cover chunking, Korean translations, grammar points, and Feynman explanations.",
          "Teacher Script (EN): 'Look at Sentence S08: \"In the 1600s, Sweden was a powerful kingdom in Europe, but over time it chose peace over war.\" Notice the contrast word \"but\" and the historical phrase \"over time\". Sweden hasn't fought in a war for over 200 years.'",
          "Teacher Script (KO): 'S08 문장을 보세요: \"1600년대에 스웨덴은 유럽의 강력한 왕국이었으나, 시간이 흐르면서 전쟁보다 평화를 선택했습니다.\" 대조를 나타내는 \"but\"과 역사적 표현 \"over time\"에 주목하세요.'",
          "Student Action: Follow along with chunk reading, annotate key grammar points, and complete the 6 Reading Comprehension MCQs and 3 Evidence written responses.",
          "Misconception & Correction: Students may treat Page 2 statements about crime or refugee policy as proven facts rather than claims of the visual text. Teacher reminds them to use reporting frames like 'The visual text notes...'.",
          "Transition: 'Now let's review the key grammar patterns in our Language Focus section.'"
        ]
      },
      {
        "phase": "Phase 6: Language Focus & Cautious Reporting",
        "durationMinutes": 12,
        "script": [
          "Teacher Action: Teach the target language structures: descriptive noun phrases, passive voice ('was shaped by'), time markers, contrast structures ('while/although'), embedded questions ('how to keep people safe'), and cautious source-reporting frames.",
          "Teacher Script (EN): 'Instead of writing \"All Swedes love cold weather,\" write \"According to the visual text, families often spend time outdoors in both summer and winter.\" This is cautious and respectful source reporting.'",
          "Teacher Script (KO): '\"모든 스웨덴 사람은 추운 날씨를 좋아한다\"라고 쓰지 않고, \"시각 자료에 따르면 가족들은 여름과 겨울 모두 야외 활동을 자주 즐긴다\"라고 서술하는 것이 신중하고 존중하는 글쓰기입니다.'",
          "Student Action: Practice transforming sweeping statements into cautious evidence-based sentences with a partner.",
          "Misconception & Correction: Students may forget to include contrast connectors when connecting historical power with peaceful traditions. Teacher reinforces 'through' and 'while'.",
          "Transition: 'Let's apply these structures in our Writing Practice activities.'"
        ]
      },
      {
        "phase": "Phase 7: Writing Practice & Final Task Execution",
        "durationMinutes": 18,
        "script": [
          "Teacher Action: Monitor students as they complete Writing Practice 1–4 and draft their 100–140 word Final Cultural Profile Paragraph.",
          "Teacher Script (EN): 'For your Final Task, make sure to include: (1) a clear controlling idea, (2) 3 exact details from Page 1, 2, and 3, (3) cautious reporting verbs, (4) a statement noting that one visual text cannot represent every citizen, and (5) a respectful concluding sentence.'",
          "Teacher Script (KO): '최종 글쓰기 과제에서는: (1) 명확한 주제문, (2) 1, 2, 3페이지의 정확한 3가지 근거, (3) 신중한 서술 동사, (4) 한 시각 자료가 모든 국민을 대변할 수 없다는 한계 명시, (5) 존중하는 결론 문장을 반드시 포함하세요.'",
          "Student Action: Draft their paragraph using live word count, execute Check & Compare, and refine word length to 100–140 words.",
          "Misconception & Correction: If a student's paragraph is under 100 words, teacher prompts them to add an identity detail from Page 2 (such as 200 years of peace or 1900s equality).",
          "Transition: 'Now let's complete our Self-Check and submit our final lesson responses.'"
        ]
      },
      {
        "phase": "Phase 8: Review, Exit & Lesson Submission",
        "durationMinutes": 5,
        "script": [
          "Teacher Action: Conduct a 5-minute exit review. Verify that students complete all 6 self-check items and submit their lesson data.",
          "Teacher Script (EN): 'Check your 6 self-check boxes. Make sure your name and code are entered properly, then click Submit. Excellent work analyzing Sweden's cultural profile today!'",
          "Teacher Script (KO): '6개 자가 점검 항목을 확인하고 이름과 코드를 입력한 후 제출 버튼을 누르세요. 오늘 스웨덴 문화 프로필을 훌륭하게 분석해 주셨습니다!'",
          "Student Action: Complete the self-check checklist, verify word count between 100–140 words, enter student identification, and submit.",
          "Misconception & Correction: Ensure students understand that submitting saves their progress locally and to D1 without overwriting previous lesson attempts.",
          "Transition: 'Lesson completed successfully! See you next class.'"
        ]
      }
    ],

    "detailedReadingGuide": {
      "openingScript": [
        {
          "english": "Welcome class! / Today we are analyzing / a three-page visual cultural profile of Sweden.",
          "korean": "환영합니다 여러분! / 오늘은 스웨덴에 관한 / 3페이지 분량의 시각 문화 프로필을 분석해보겠습니다.",
          "purpose": "Introduce lesson topic and visual source format."
        },
        {
          "english": "We will examine how geography, / 200 years of peace, / and daily routines like 'fika' / shape a nation's identity.",
          "korean": "우리는 지리, / 200년의 평화 역사, / 그리고 '피카'와 같은 일상 루틴이 / 한 국가의 정체성을 어떻게 형성하는지 살펴볼 것입니다.",
          "purpose": "Set learning objectives across geography, history, and daily life."
        },
        {
          "english": "Remember to cite specific source details / while using cautious language / to avoid overgeneralizing about all people.",
          "korean": "모든 사람에 대해 지나치게 일반화하지 않도록 / 신중한 표현을 사용하면서 / 구체적인 출처 근거를 제시하는 것을 잊지 마세요.",
          "purpose": "Establish evidence-reporting and source-literacy expectations."
        }
      ],

      "warmupGuide": [
        {
          "question": "What places, foods, traditions, or outdoor activities help describe your community?",
          "korean": "여러분의 공동체를 설명하는 데 도움이 되는 장소, 음식, 전통 또는 야외 활동은 무엇인가요?",
          "followUp": "How do these shared activities help people feel connected to one another?",
          "followUpKorean": "이러한 공유된 활동이 사람들 간의 유대감을 형성하는 데 어떻게 도움이 되나요?",
          "purpose": "Activate prior knowledge regarding community identity and local cultural traditions."
        },
        {
          "question": "How can a country’s history influence its identity today?",
          "korean": "한 국가의 역사가 오늘날 그 국가의 정체성에 어떤 영향을 미칠 수 있나요?",
          "followUp": "Can you think of historical events or long periods of peace that shaped modern values?",
          "followUpKorean": "현대적 가치관을 형성한 역사적 사건이나 오랜 평화 기간을 떠올릴 수 있나요?",
          "purpose": "Prompt critical reflection on the connection between historical experience and modern social values."
        },
        {
          "question": "What makes daily life feel balanced, comfortable, or connected to nature?",
          "korean": "일상생활이 균형 있고 편안하며 자연과 연결되어 있다고 느끼게 만드는 것은 무엇인가요?",
          "followUp": "Why might having regular breaks or outdoor exercise reduce stress in daily life?",
          "followUpKorean": "정기적인 휴식이나 야외 운동이 일상의 스트레스를 줄여주는 이유는 무엇일까요?",
          "purpose": "Prepare students to analyze Page 3 concepts of fika, public commuting, and outdoor recreation."
        }
      ],

      "sentenceAnalysis": [
        {
          "sentenceNumber": 1,
          "original": "Keep your face always toward the sunshine—and shadows will fall behind you. - Walt Whitman",
          "chunkReading": "Keep your face always / toward the sunshine— / and shadows will fall / behind you. / - Walt Whitman",
          "directKorean": "항상 햇빛을 향해 당신의 얼굴을 두어라— / 그리하면 그림자는 당신 뒤로 떨어질 것이다. / - 월트 휘트먼",
          "naturalKorean": "항상 햇살을 향해 얼굴을 두세요. 그러면 그림자는 그대 뒤로 물러날 것입니다. - 월트 휘트먼",
          "mustKnowChunks": [
            { "chunk": "keep your face toward", "meaning": "~을 향해 얼굴을 두다/시선을 유지하다", "use": "imperative sentence encouraging positive focus", "example": "Keep your face toward the light during dark times." },
            { "chunk": "shadows will fall behind", "meaning": "그림자가 뒤로 물러나다/어둠이 사라지다", "use": "metaphorical result of positive outlook", "example": "Focus on solutions and difficulties will fall behind you." }
          ],
          "mustKnowGrammar": "Imperative sentence ('Keep...') combined with coordinate conjunction ('and') expressing a condition and result ('do X and Y will happen'). Em dash connects the metaphor without a period.",
          "feynmanExplanation": "This quote by poet Walt Whitman encourages looking on the bright side. If you keep facing the sunshine, darkness will fall behind you. It sets an inspiring and positive tone for Page 1 of the text. 이 문장은 긍정적인 면을 바라보면 근심이 사라진다는 메시지를 전달합니다.",
          "teachingTranscript": [
            { "english": "Class, look at the top of Page 1. This quote by Walt Whitman encourages keeping a positive outlook.", "korean": "1페이지 상단을 보세요. 월트 휘트먼의 이 인용구는 긍정적인 시선을 유지할 것을 권장합니다." },
            { "english": "Notice how the em dash connects the idea of sunshine to shadows falling behind.", "korean": "줄표(em dash)가 햇살이라는 생각과 그림자가 뒤로 물러난다는 결과를 어떻게 연결하는지 보세요." }
          ]
        },
        {
          "sentenceNumber": 2,
          "original": "Sweden is a long, skinny country in Northern Europe, part of a group of countries called Scandinavia.",
          "chunkReading": "Sweden is / a long, skinny country / in Northern Europe, / part of a group of countries / called Scandinavia.",
          "directKorean": "스웨덴은 / 얇고 긴 국가이다 / 북유럽에 있는, / 국가들의 집단의 일부인 / 스칸디나비아라 불리는.",
          "naturalKorean": "스웨덴은 북유럽에 위치한 얇고 긴 나라로, 스칸디나비아라 불리는 국가 군의 일부입니다.",
          "mustKnowChunks": [
            { "chunk": "long, skinny country", "meaning": "길고 좁은 모양의 나라", "use": "descriptive adjective pair describing geographic shape", "example": "Chile is another long, skinny country in South America." },
            { "chunk": "part of a group called", "meaning": "~라 불리는 집단의 일부", "use": "appositive noun phrase adding regional context", "example": "Korea is part of a region called East Asia." }
          ],
          "mustKnowGrammar": "Appositive noun phrase ('part of a group...') following the comma; past participle modifier ('called Scandinavia') modifying 'group of countries'.",
          "feynmanExplanation": "This sentence introduces Sweden's geographical shape in Northern Europe. It describes the nation as long and skinny. It also explains that Sweden is part of Scandinavia. 스웨덴의 지형적 모양과 스칸디나비아 지역에 속함을 설명합니다.",
          "teachingTranscript": [
            { "english": "S02 introduces Sweden's shape using two descriptive adjectives: 'long, skinny'.", "korean": "S02 문장은 'long, skinny'라는 두 형용사로 스웨덴의 지형적 모양을 소개합니다." },
            { "english": "Remember that Scandinavia is the regional group including Sweden, Norway, and Denmark.", "korean": "스칸디나비아는 스웨덴, 노르웨이, 덴마크를 포함하는 지역 그룹임을 기억하세요." }
          ]
        },
        {
          "sentenceNumber": 3,
          "original": "It borders Norway to the west, Finland to the east, and has a long coastline on the Baltic Sea.",
          "chunkReading": "It borders Norway / to the west, / Finland to the east, / and has a long coastline / on the Baltic Sea.",
          "directKorean": "그것은 서쪽으로 노르웨이와 접하고, / 동쪽으로 핀란드와 접하며, / 긴 해안선을 가지고 있다 / 발트해에.",
          "naturalKorean": "서쪽으로는 노르웨이, 동쪽으로는 핀란드와 국경을 접하고 있으며, 발트해를 따라 긴 해안선을 접하고 있습니다.",
          "mustKnowChunks": [
            { "chunk": "borders [country] to the [direction]", "meaning": "~방향으로 ~와 국경을 접하다", "use": "spatial relationship verb construction", "example": "Canada borders the United States to the south." },
            { "chunk": "coastline on the Baltic Sea", "meaning": "발트해의 해안선", "use": "prepositional phrase specifying body of water", "example": "The town features a scenic coastline on the sea." }
          ],
          "mustKnowGrammar": "Parallel verb phrase structure: subject 'It' governs 'borders Norway...', '[borders] Finland...', 'and has a long coastline...'. Directional prepositions 'to the west/east'.",
          "feynmanExplanation": "This sentence explains Sweden's borders and marine coastline. Sweden borders Norway on the west and Finland on the east. It also features a long coastline along the Baltic Sea. 스웨덴의 동서 국경선과 발트해 해안선을 보여줍니다.",
          "teachingTranscript": [
            { "english": "Notice the parallel verbs: 'borders' and 'has'. It tells us exactly who Sweden's neighbors are.", "korean": "병렬 동사인 'borders'와 'has'에 주목하세요. 스웨덴의 이웃 국가가 누구인지 정확히 알려줍니다." }
          ]
        },
        {
          "sentenceNumber": 4,
          "original": "Its capital is Stockholm, a city built on 14 islands!",
          "chunkReading": "Its capital is Stockholm, / a city / built on 14 islands!",
          "directKorean": "그것의 수도는 스톡홀름이다, / 도시인 / 14개의 섬 위에 건설된!",
          "naturalKorean": "수도는 14개의 섬 위에 건설된 도시인 스톡홀름입니다!",
          "mustKnowChunks": [
            { "chunk": "capital is Stockholm", "meaning": "수도는 스톡홀름이다", "use": "identifying national capital city", "example": "The capital of South Korea is Seoul." },
            { "chunk": "built on 14 islands", "meaning": "14개 섬 위에 지어진", "use": "past participle phrase modifying city", "example": "Venice is a historic city built on many small islands." }
          ],
          "mustKnowGrammar": "Appositive noun phrase ('a city...') clarifying Stockholm, modified by passive participle phrase ('built on 14 islands'). Exclamation mark adds visual enthusiasm.",
          "feynmanExplanation": "Stockholm is the capital city of Sweden. What makes Stockholm special is that it is built across 14 islands. Waterways connect these islands together across the city. 스톡홀름이 14개의 섬으로 이루어진 수도임을 설명합니다.",
          "teachingTranscript": [
            { "english": "Stockholm is famous for being spread across 14 islands. This shows how closely Sweden connects to water.", "korean": "스톡홀름은 14개의 섬에 걸쳐 있는 것으로 유명합니다. 스웨덴이 물과 얼마나 가까운지 보여줍니다." }
          ]
        },
        {
          "sentenceNumber": 5,
          "original": "Sweden’s identity was shaped by Viking explorers, peaceful traditions, and a strong focus on fairness and nature.",
          "chunkReading": "Sweden’s identity / was shaped by / Viking explorers, / peaceful traditions, / and a strong focus / on fairness and nature.",
          "directKorean": "스웨덴의 정체성은 / ~에 의해 형성되었다 / 바이킹 탐험가들, / 평화로운 전통들, / 그리고 강한 집중 / 공정함과 자연에 대한.",
          "naturalKorean": "스웨덴의 정체성은 바이킹 탐험가, 평화로운 전통, 그리고 공정함과 자연에 대한 강한 관심에 의해 형성되었습니다.",
          "mustKnowChunks": [
            { "chunk": "was shaped by", "meaning": "~에 의해 형성되었다", "use": "passive voice indicating historical influence", "example": "Modern democracy was shaped by ancient philosophy." },
            { "chunk": "strong focus on fairness", "meaning": "공정함에 대한 강한 중시", "use": "noun phrase highlighting core social value", "example": "The school has a strong focus on fairness and respect." }
          ],
          "mustKnowGrammar": "Passive voice construction ('was shaped by') with three parallel agent phrases: 'Viking explorers', 'peaceful traditions', and 'a strong focus on fairness and nature'.",
          "feynmanExplanation": "This heading introduces the key elements shaping Sweden's identity. It states that Vikings, peace, fairness, and nature shaped the nation. These historical and social values form the foundation of Page 2. 스웨덴 정체성을 형성한 4가지 핵심 요소를 설명합니다.",
          "teachingTranscript": [
            { "english": "S05 is the thesis statement for Page 2. Pay attention to the passive phrase 'was shaped by'.", "korean": "S05는 2페이지의 주제문입니다. 수동태 표현인 'was shaped by'에 주의하세요." }
          ]
        },
        {
          "sentenceNumber": 6,
          "original": "Over 1,000 years ago, people from what is now Sweden were part of the Viking world.",
          "chunkReading": "Over 1,000 years ago, / people from what is now Sweden / were part of / the Viking world.",
          "directKorean": "1,000년도 더 전에, / 현재의 스웨덴 지역 사람들은 / 일부였다 / 바이킹 세계의.",
          "naturalKorean": "1,000년도 더 전, 지금의 스웨덴 지역 사람들은 바이킹 세계의 일원이었습니다.",
          "mustKnowChunks": [
            { "chunk": "Over 1,000 years ago", "meaning": "1,000년도 더 전에", "use": "historical time marker introducing ancient context", "example": "Over 1,000 years ago, ancient traders built overland routes." },
            { "chunk": "what is now Sweden", "meaning": "현재의 스웨덴 지역", "use": "nominal clause referring to present-day geography", "example": "Settlers lived in what is now modern Germany." }
          ],
          "mustKnowGrammar": "Time prepositional phrase ('Over 1,000 years ago'); nominal relative clause ('what is now Sweden') serving as object of preposition 'from'.",
          "feynmanExplanation": "Over 1,000 years ago, people in this region were part of the Viking world. Sweden did not exist as a modern state back then. However, its ancestors participated in Scandinavian Viking culture. 1,000년 전 이 지역 사람들이 바이킹 문화권이었음을 나타냅니다.",
          "teachingTranscript": [
            { "english": "Notice the precise phrase 'what is now Sweden' because Sweden as a modern state did not exist 1,000 years ago.", "korean": "1,000년 전에는 현대 국가로서의 스웨덴이 없었으므로 'what is now Sweden'이라는 정교한 표현을 사용했습니다." }
          ]
        },
        {
          "sentenceNumber": 7,
          "original": "These Swedish Vikings traveled mostly east, trading along rivers in Russia and even reaching the Middle East.",
          "chunkReading": "These Swedish Vikings / traveled mostly east, / trading along rivers in Russia / and even reaching / the Middle East.",
          "directKorean": "이들 스웨덴 바이킹들은 / 주로 동쪽으로 여행했다, / 러시아의 강들을 따라 무역하고 / 심지어 도달하면서 / 중동에.",
          "naturalKorean": "이들 스웨덴 바이킹은 주로 동쪽으로 이동하여 러시아의 강을 따라 무역을 하고 심지어 중동에까지 이르렀습니다.",
          "mustKnowChunks": [
            { "chunk": "traveled mostly east", "meaning": "주로 동쪽으로 이동했다", "use": "directional historical movement description", "example": "Explorers traveled mostly west across prairies." },
            { "chunk": "trading along rivers", "meaning": "강을 따라 무역하며", "use": "participle phrase indicating concurrent economic activity", "example": "Merchants prospered by trading along riverbanks." }
          ],
          "mustKnowGrammar": "Main clause ('These Swedish Vikings traveled mostly east') followed by two participle phrases ('trading along...', 'and even reaching...') showing simultaneous action.",
          "feynmanExplanation": "Swedish Vikings traveled mainly toward the east along rivers. They navigated Russian river systems for trade and exploration. Their journeys even extended as far as the Middle East. 스웨덴 바이킹이 동쪽 강 무역 경로를 통해 중동까지 진출했음을 보여줍니다.",
          "teachingTranscript": [
            { "english": "Unlike Atlantic Vikings who went to Britain or Greenland, Swedish Vikings specialized in Eastern river trade.", "korean": "대서양으로 간 바이킹과 달리 스웨덴 바이킹은 동유럽 강 무역에 특화되어 있었습니다." }
          ]
        },
        {
          "sentenceNumber": 8,
          "original": "In the 1600s, Sweden was a powerful kingdom in Europe, but over time it chose peace over war.",
          "chunkReading": "In the 1600s, / Sweden was / a powerful kingdom in Europe, / but over time / it chose peace over war.",
          "directKorean": "1600년대에, / 스웨덴은 ~이었다 / 유럽의 강력한 왕국, / 그러나 시간이 흐르면서 / 그것은 전쟁보다 평화를 선택했다.",
          "naturalKorean": "1600년대에 스웨덴은 유럽의 강력한 왕국이었으나, 시간이 흐르면서 전쟁보다 평화를 선택했습니다.",
          "mustKnowChunks": [
            { "chunk": "In the 1600s", "meaning": "1600년대에 (17세기)", "use": "century time marker", "example": "In the 1600s, new trade routes altered global commerce." },
            { "chunk": "chose peace over war", "meaning": "전쟁보다 평화를 선택했다", "use": "idiomatic preference phrase ('choose A over B')", "example": "The nation chose diplomacy over conflict." }
          ],
          "mustKnowGrammar": "Compound sentence joined by coordinating conjunction 'but'; prepositional time phrase 'over time'; preference verb idiom 'chose [noun A] over [noun B]'.",
          "feynmanExplanation": "During the 1600s, Sweden was a major military kingdom in Europe. Over time, however, the country chose peace instead of war. This marked a major transformation in national policy and identity. 17세기 강대국이었던 스웨덴이 평화를 선택하게 된 과정을 기술합니다.",
          "teachingTranscript": [
            { "english": "Look at the phrase 'chose peace over war'. This marks a major shift in Sweden's historical identity.", "korean": "'chose peace over war'라는 표현에 주목하세요. 이는 스웨덴 역사적 정체성의 큰 전환점을 나타냅니다." }
          ]
        },
        {
          "sentenceNumber": 9,
          "original": "It hasn’t fought in a war for more than 200 years.",
          "chunkReading": "It hasn’t fought / in a war / for more than 200 years.",
          "directKorean": "그것은 싸우지 않았다 / 전쟁에서 / 200년이 넘는 시간 동안.",
          "naturalKorean": "스웨덴은 200년이 넘는 시간 동안 전쟁을 치르지 않았습니다.",
          "mustKnowChunks": [
            { "chunk": "hasn’t fought in a war", "meaning": "전쟁에서 싸우지 않았다", "use": "present perfect negative showing continuing state", "example": "The country hasn't engaged in war for decades." },
            { "chunk": "for more than 200 years", "meaning": "200년이 넘는 기간 동안", "use": "duration phrase with 'for'", "example": "The castle has stood unchanged for more than 200 years." }
          ],
          "mustKnowGrammar": "Present perfect tense ('hasn’t fought') denoting a state that began in the past and continues to the present, specified by duration prepositional phrase ('for more than 200 years').",
          "feynmanExplanation": "Sweden has avoided military conflict for more than two centuries. That means the nation has not fought in any war for over 200 years. This long peace is a proud pillar of modern Swedish heritage. 200년 넘게 전쟁 없이 평화를 유지해왔음을 강조합니다.",
          "teachingTranscript": [
            { "english": "Present perfect 'hasn't fought' shows that peace continues right up to today.", "korean": "현재완료형 'hasn't fought'는 평화 상태가 오늘날까지 계속 이어지고 있음을 나타냅니다." }
          ]
        },
        {
          "sentenceNumber": 10,
          "original": "In the 1900s, Sweden built a society based on education, equality, and care for all.",
          "chunkReading": "In the 1900s, / Sweden built a society / based on / education, equality, / and care for all.",
          "directKorean": "1900년대에, / 스웨덴은 사회를 건설했다 / ~에 기반을 둔 / 교육, 평화, / 그리고 모두를 위한 돌봄.",
          "naturalKorean": "1900년대에 스웨덴은 교육, 평등, 그리고 모두를 위한 돌봄에 기반을 둔 사회를 건설했습니다.",
          "mustKnowChunks": [
            { "chunk": "In the 1900s", "meaning": "1900년대에 (20세기)", "use": "century time marker", "example": "In the 1900s, public healthcare systems expanded rapidly." },
            { "chunk": "built a society based on", "meaning": "~에 기반한 사회를 만들었다", "use": "past tense verb + noun + participle modifier", "example": "Founders built a community based on mutual support." },
            { "chunk": "care for all", "meaning": "모두를 위한 돌봄/복지", "use": "inclusive social goal phrase", "example": "Universal programs ensure healthcare and care for all." }
          ],
          "mustKnowGrammar": "Simple past tense ('built'); past participle phrase ('based on...') acting as an adjective modifying 'society'; series of three parallel nouns ('education, equality, and care for all').",
          "feynmanExplanation": "During the 1900s, Sweden built its modern social welfare model. The nation prioritized education, social equality, and public care for all citizens. These 20th-century reforms created modern Swedish society. 20세기 스웨덴이 교육, 평등, 복지를 중심으로 사회를 건설했음을 보여줍니다.",
          "teachingTranscript": [
            { "english": "The 1900s bullet shows how modern Swedish social values (education, equality, care for all) were formed.", "korean": "1900년대 항목은 현대 스웨덴의 사회적 가치(교육, 평등, 복지)가 어떻게 형성되었는지 보여줍니다." }
          ]
        },
        {
          "sentenceNumber": 11,
          "original": "Like many countries, Sweden is facing big questions about how to keep people safe and included.",
          "chunkReading": "Like many countries, / Sweden is facing / big questions / about how to keep / people safe and included.",
          "directKorean": "많은 나라들과 마찬가지로, / 스웨덴은 직면해 있다 / 큰 질문들에 / 방법에 관한 / 사람들을 안전하고 포함되게 유지하는.",
          "naturalKorean": "많은 나라들과 마찬가지로, 스웨덴도 사람들을 어떻게 하면 안전하고 소외되지 않게 지킬 수 있는지에 대한 큰 질문들에 직면해 있습니다.",
          "mustKnowChunks": [
            { "chunk": "Like many countries", "meaning": "많은 국가들과 마찬가지로", "use": "prepositional comparison phrase", "example": "Like many countries, we struggle with urban transit." },
            { "chunk": "is facing big questions", "meaning": "중대한 질문(과제)에 직면해 있다", "use": "present continuous verb showing ongoing social challenge", "example": "The board is facing tough questions regarding housing." },
            { "chunk": "how to keep people safe and included", "meaning": "사람들을 안전하고 소외되지 않게 유지하는 방법", "use": "wh-infinitive phrase + object + compound adjectives", "example": "Leaders discuss how to keep students safe and included." }
          ],
          "mustKnowGrammar": "Present continuous tense ('is facing'); prepositional phrase 'about' introducing an infinitival question structure ('how to keep...') with object 'people' and object complements ('safe and included').",
          "feynmanExplanation": "Sweden faces important modern social questions like many other countries. Leaders are thinking about how to keep all citizens safe. They are also working to ensure everyone feels included in society. 현시대 스웨덴이 직면한 안전과 사회적 포용 과제를 소개합니다.",
          "teachingTranscript": [
            { "english": "S11 transitions from history to modern questions facing Sweden today.", "korean": "S11 문장은 역사에서 오늘날 스웨덴이 직면한 현대적 과제로 주제를 전환합니다." }
          ]
        },
        {
          "sentenceNumber": 12,
          "original": "In recent years, there have been worries about rising crime in some cities, and leaders are working on how to make neighborhoods feel safer for everyone.",
          "chunkReading": "In recent years, / there have been worries / about rising crime in some cities, / and leaders are working on / how to make neighborhoods feel safer / for everyone.",
          "directKorean": "최근 몇 년 동안, / 우려들이 있어 왔다 / 일부 도시의 상승하는 범죄에 대한, / 그리고 지도자들은 작업하고 있다 / 마을을 더 안전하게 느끼도록 만드는 방법에 대해 / 모두를 위해.",
          "naturalKorean": "최근 몇 년 동안 일부 도시에서 범죄 증가에 대한 우려가 있어 왔으며, 지도자들은 모든 사람을 위해 동네를 더 안전하게 만드는 방법에 힘쓰고 있습니다.",
          "mustKnowChunks": [
            { "chunk": "In recent years", "meaning": "최근 몇 년 동안", "use": "recent time frame marker", "example": "In recent years, solar energy usage has grown." },
            { "chunk": "there have been worries about", "meaning": "~에 대한 우려들이 있어 왔다", "use": "existential present perfect structure", "example": "There have been worries about water quality." },
            { "chunk": "make neighborhoods feel safer", "meaning": "동네가 더 안전하게 느껴지도록 만들다", "use": "causative verb 'make' + object + bare infinitive 'feel' + comparative adjective", "example": "New streetlights make parks feel safer." }
          ],
          "mustKnowGrammar": "Compound sentence joined by 'and'; first clause uses present perfect ('there have been'); second clause uses present continuous ('leaders are working on') with an embedded question clause ('how to make...'). Causative pattern 'make [noun] feel [adjective]'.",
          "feynmanExplanation": "In recent years, rising crime in some cities has created public concern. As a result, community leaders are designing safer neighborhood programs. This statement represents a claim presented in the visual text. 최근 일부 도시의 범죄 우려와 안전 강화 노력을 기술합니다.",
          "teachingTranscript": [
            { "english": "Treat this statement as a claim in the visual source, not as an independently verified statistic.", "korean": "이 문장은 독립적으로 검증된 통계가 아닌 시각 자료에 제시된 주장으로 다루어야 합니다." }
          ]
        },
        {
          "sentenceNumber": 13,
          "original": "Sweden is also thinking hard about how many refugees and immigrants it can help.",
          "chunkReading": "Sweden is also thinking hard / about how many refugees and immigrants / it can help.",
          "directKorean": "스웨덴은 또한 진지하게 고민하고 있다 / 얼마나 많은 난민과 이민자들을 / 그것이 도울 수 있는지에 대해.",
          "naturalKorean": "스웨덴은 또한 얼마나 많은 난민과 이민자를 도울 수 있는지에 대해 진지하게 고민하고 있습니다.",
          "mustKnowChunks": [
            { "chunk": "thinking hard about", "meaning": "~에 대해 진지하게 고민하다", "use": "present continuous + adverb of intensity", "example": "Councils are thinking hard about budget cuts." },
            { "chunk": "how many refugees and immigrants", "meaning": "얼마나 많은 난민과 이민자들", "use": "embedded question quantifier phrase", "example": "The agency measured how many applicants arrived." }
          ],
          "mustKnowGrammar": "Present continuous tense ('is thinking hard'); preposition 'about' taking an indirect question clause ('how many refugees and immigrants it can help').",
          "feynmanExplanation": "Sweden is carefully considering its national immigration policy. The nation is thinking about how many refugees and immigrants it can support. This reflects ongoing public debate over global humanitarian aid. 스웨덴이 얼마나 많은 난민과 이민자를 수용할지 고민하고 있음을 보여줍니다.",
          "teachingTranscript": [
            { "english": "Note the two vocabulary words: 'refugee' (fleeing conflict) and 'immigrant' (moving to settle).", "korean": "두 핵심 단어인 'refugee'(난민)와 'immigrant'(이민자)의 구분에 주의하세요." }
          ]
        },
        {
          "sentenceNumber": 14,
          "original": "Some people want stricter rules, while others want to keep helping more.",
          "chunkReading": "Some people want stricter rules, / while others want / to keep helping more.",
          "directKorean": "어떤 사람들은 더 엄격한 규칙을 원한다, / 반면에 다른 이들은 원한다 / 계속해서 더 많이 돕기를.",
          "naturalKorean": "어떤 사람들은 더 엄격한 규칙을 원하는 반면, 다른 사람들은 계속해서 더 많이 돕기를 원합니다.",
          "mustKnowChunks": [
            { "chunk": "Some people ..., while others ...", "meaning": "어떤 이들은 ~하는 반면, 다른 이들은 ~하다", "use": "classic contrast structure presenting two viewpoints", "example": "Some prefer quiet towns, while others love busy cities." },
            { "chunk": "stricter rules", "meaning": "더 엄격한 규칙들", "use": "comparative adjective + noun", "example": "Safety inspectors imposed stricter rules." },
            { "chunk": "keep helping more", "meaning": "계속해서 더 많이 돕다", "use": "verb 'keep' + gerund 'helping'", "example": "Volunteers want to keep helping more families." }
          ],
          "mustKnowGrammar": "Contrast sentence structure comparing two perspectives: 'Some people [verb 1] ..., while others [verb 2] ...'. Comparative adjective 'stricter'; verb 'keep' followed by gerund 'helping'.",
          "feynmanExplanation": "This sentence contrasts two different public viewpoints in Sweden. Some citizens advocate for stricter immigration regulations. Meanwhile, other citizens want to keep helping more incoming people. 이민 정책에 대한 스웨덴 내부의 두 가지 상반된 의견을 비교합니다.",
          "teachingTranscript": [
            { "english": "Use the 'Some..., while others...' pattern when discussing balanced public debates.", "korean": "균형 잡힌 사회적 토론을 기술할 때 'Some..., while others...' 구문을 활용하세요." }
          ]
        },
        {
          "sentenceNumber": 15,
          "original": "Life in Sweden is calm, cozy, and closely connected to nature, with simple routines that focus on balance:",
          "chunkReading": "Life in Sweden is / calm, cozy, / and closely connected to nature, / with simple routines / that focus on balance:",
          "directKorean": "스웨덴에서의 삶은 / 평화롭고, 아늑하며, / 자연과 긴밀히 연결되어 있다, / 단순한 루틴들과 함께 / 균형에 초점을 맞추는:",
          "naturalKorean": "스웨덴에서의 삶은 잔잔하고 아늑하며 자연과 깊이 연결되어 있고, 균형에 초점을 맞춘 단순한 루틴들로 이루어져 있습니다:",
          "mustKnowChunks": [
            { "chunk": "closely connected to nature", "meaning": "자연과 긴밀히 연결된", "use": "adverb + past participle modifier phrase", "example": "Rural lifestyle is closely connected to nature." },
            { "chunk": "simple routines that focus on balance", "meaning": "균형에 초점을 맞추는 단순한 일상들", "use": "noun phrase + relative clause with 'that'", "example": "Daily walking is a simple routine that focuses on health." }
          ],
          "mustKnowGrammar": "Subject 'Life in Sweden' with three predicate adjectives ('calm, cozy, and closely connected to nature'); prepositional phrase ('with simple routines') modified by relative clause ('that focus on balance'). Colon introduces Page 3 list items.",
          "feynmanExplanation": "This heading introduces Page 3's focus on daily life. It describes daily living in Sweden as calm, cozy, and nature-connected. Simple daily routines focus on maintaining personal and social balance. 스웨덴 일상의 아늑함, 자연 친화성, 균형감을 소개합니다.",
          "teachingTranscript": [
            { "english": "S15 sets the tone for Page 3. The colon at the end signals that examples of daily routines follow.", "korean": "S15는 3페이지의 어조를 설정합니다. 끝의 쌍점(colon)은 일상 루틴의 예시가 이어짐을 나타냅니다." }
          ]
        },
        {
          "sentenceNumber": 16,
          "original": "Kids usually go to school from around 8 AM to 2 PM, and everyone gets a free hot lunch — no lunchboxes needed!",
          "chunkReading": "Kids usually go to school / from around 8 AM to 2 PM, / and everyone gets / a free hot lunch — / no lunchboxes needed!",
          "directKorean": "아이들은 보통 학교에 간다 / 오전 8시경부터 오후 2시까지, / 그리고 모두가 받는다 / 무료 따뜻한 점심을 — / 도시락이 필요 없다!",
          "naturalKorean": "아이들은 보통 오전 8시경부터 오후 2시까지 학교에 다니며, 모두에게 무료 따뜻한 점심이 제공되어 도시락이 필요 없습니다!",
          "mustKnowChunks": [
            { "chunk": "from around 8 AM to 2 PM", "meaning": "오전 8시경부터 오후 2시까지", "use": "time frame prepositional phrase", "example": "Office hours run from around 9 AM to 5 PM." },
            { "chunk": "free hot lunch", "meaning": "무료 따뜻한 점심 식사", "use": "descriptive noun phrase highlighting school policy", "example": "The school provides a free hot lunch for every student." },
            { "chunk": "no lunchboxes needed", "meaning": "도시락이 필요 없음", "use": "concise participial clause following em dash", "example": "All supplies provided — no extra fees needed!" }
          ],
          "mustKnowGrammar": "Compound sentence with 'and'; time span 'from [time 1] to [time 2]'; em dash introduces an informal descriptive comment with past participle ('needed').",
          "feynmanExplanation": "Swedish school days typically run from 8 AM to 2 PM. All students receive a free hot lunch provided by the school. Because hot meals are served, students do not need lunchboxes. 스웨덴 학교 수업 시간과 무료 핫런치 제공 정책을 설명합니다.",
          "teachingTranscript": [
            { "english": "Notice the em dash before 'no lunchboxes needed!'. It adds an enthusiastic note about the school lunch policy.", "korean": "'no lunchboxes needed!' 앞의 줄표(em dash)에 주목하세요. 학교 급식 정책에 대한 흥미로운 설명을 더해줍니다." }
          ]
        },
        {
          "sentenceNumber": 17,
          "original": "Most people take a break in the day for “fika”: a cozy snack time with coffee or juice and something sweet like cinnamon buns.",
          "chunkReading": "Most people take a break / in the day / for “fika”: / a cozy snack time / with coffee or juice / and something sweet / like cinnamon buns.",
          "directKorean": "대부분의 사람들은 휴식을 취한다 / 하루 중에 / “fika”를 위해: / 아늑한 간식 시간인 / 커피나 주스와 함께하는 / 그리고 달콤한 무언가 / 계피빵과 같은.",
          "naturalKorean": "대부분의 사람들은 하루 중 커피나 주스, 그리고 계피빵 같은 달콤한 간식을 곁들이는 아늑한 시간인 “피카(fika)”를 위해 휴식을 취합니다.",
          "mustKnowChunks": [
            { "chunk": "take a break in the day", "meaning": "하루 중 휴식을 취하다", "use": "verb phrase describing daily routine", "example": "Workers take a break in the day to rest." },
            { "chunk": "cozy snack time", "meaning": "아늑한 간식 시간", "use": "descriptive noun phrase defining fika", "example": "After school, kids enjoy a cozy snack time." },
            { "chunk": "something sweet like cinnamon buns", "meaning": "시나몬 롤 같은 달콤한 먹거리", "use": "indefinite pronoun + adjective + exemplar preposition phrase", "example": "They offered something sweet like fresh cookies." }
          ],
          "mustKnowGrammar": "Main clause followed by colon introducing an appositive definition ('a cozy snack time...'); indefinite pronoun 'something' modified post-positively by adjective 'sweet'; exemplar preposition 'like'.",
          "feynmanExplanation": "Most Swedes take a daily pause called fika. Fika is a cozy snack break with coffee or juice and sweet pastries. Cinnamon buns are a favorite treat enjoyed during this daily break. 스웨덴의 대표적 커피·디저트 휴식 문화인 '피카'를 정의합니다.",
          "teachingTranscript": [
            { "english": "'Fika' is one of the most famous vocabulary items in this reading. Note the curly quotation marks around 'fika'.", "korean": "'Fika'는 이 지문에서 가장 중요한 어휘 중 하나입니다. 단어 양옆의 굽은 따옴표에 주의하세요." }
          ]
        },
        {
          "sentenceNumber": 18,
          "original": "Swedes love to bike, walk, or take public buses and trains, even in the snow.",
          "chunkReading": "Swedes love to / bike, walk, / or take public buses and trains, / even in the snow.",
          "directKorean": "스웨덴 사람들은 좋아한다 / 자전거 타기, 걷기, / 또는 대중교통 버스와 기차 타기를, / 눈 속에서도.",
          "naturalKorean": "스웨덴 사람들은 눈이 오는 날에도 자전거를 타거나 걷고, 대중교통 버스나 기차를 이용하는 것을 좋아합니다.",
          "mustKnowChunks": [
            { "chunk": "love to bike, walk, or take", "meaning": "자전거 타기, 걷기, 또는 타기를 좋아하다", "use": "infinitive with triple parallel base verbs", "example": "Students love to run, jump, or play outside." },
            { "chunk": "public buses and trains", "meaning": "대중교통 버스와 기차", "use": "compound noun phrase specifying transit", "example": "Commuters rely on public buses and trains daily." },
            { "chunk": "even in the snow", "meaning": "심지어 눈 속에서도", "use": "prepositional phrase with adverb 'even' showing resilience", "example": "They jog daily, even in the rain." }
          ],
          "mustKnowGrammar": "Subject 'Swedes' with verb 'love' governing three parallel infinitive verbs ('bike, walk, or take'); adverbial prepositional phrase 'even in the snow' adding contrastive emphasis.",
          "feynmanExplanation": "Swedish residents love active and eco-friendly daily transportation. People bike, walk, or ride public buses and trains regularly. They continue traveling this way even during winter snowstorms. 눈 오는 날에도 도보, 자전거, 대중교통을 이용하는 활기찬 삶을 보여줍니다.",
          "teachingTranscript": [
            { "english": "Notice the emphasis in 'even in the snow'. It shows how active travel is integrated into daily life regardless of weather.", "korean": "'even in the snow'라는 강조 표현에 주목하세요. 날씨와 상관없이 활동적 이동이 일상에 녹아있음을 보여줍니다." }
          ]
        },
        {
          "sentenceNumber": 19,
          "original": "Cities are built for easy travel without a car.",
          "chunkReading": "Cities are built / for easy travel / without a car.",
          "directKorean": "도시들은 건설되어 있다 / 쉬운 이동을 위해 / 차 없이.",
          "naturalKorean": "도시들은 차 없이도 편리하게 이동할 수 있도록 설계되어 있습니다.",
          "mustKnowChunks": [
            { "chunk": "are built for", "meaning": "~을 위해 건설되어 있다/설계되었다", "use": "passive voice indicating intentional urban design", "example": "Parks are built for public recreation." },
            { "chunk": "easy travel without a car", "meaning": "차 없이 편리한 이동", "use": "noun phrase with preposition 'without'", "example": "The downtown allows easy travel without a car." }
          ],
          "mustKnowGrammar": "Passive voice ('are built'); purpose prepositional phrase ('for easy travel'); negative accompaniment phrase ('without a car').",
          "feynmanExplanation": "Swedish urban planners design cities for non-car travel. Pedestrian walkways, bike lanes, and transit networks make driving unnecessary. People can move around easily without owning a private automobile. 차 없이도 편리하게 이용 가능한 스웨덴의 친환경 도시 설계를 다룹니다.",
          "teachingTranscript": [
            { "english": "S19 explains why people can bike and ride buses so easily: urban infrastructure is built for it.", "korean": "S19는 사람들이 왜 자전거와 대중교통을 쉽게 이용하는지(도시 인프라의 차 없는 설계) 설명해 줍니다." }
          ]
        },
        {
          "sentenceNumber": 20,
          "original": "Whether it’s summer or snowy winter, families often spend time outdoors.",
          "chunkReading": "Whether it’s summer / or snowy winter, / families often spend time / outdoors.",
          "directKorean": "여름이든 / 눈 내리는 겨울이든 간에, / 가족들은 자주 시간을 보낸다 / 야외에서.",
          "naturalKorean": "여름이든 눈 내리는 겨울이든 상관없이, 가족들은 자주 야외에서 시간을 보냅니다.",
          "mustKnowChunks": [
            { "chunk": "Whether it’s A or B", "meaning": "A이든 B이든 간에", "use": "conjunction clause showing all-season commitment", "example": "Whether it's raining or sunny, we practice daily." },
            { "chunk": "spend time outdoors", "meaning": "야외에서 시간을 보내다", "use": "verb phrase describing outdoor activity", "example": "Families spend time outdoors on weekends." }
          ],
          "mustKnowGrammar": "Adverbial alternative condition clause ('Whether it’s summer or snowy winter'); main clause with frequency adverb 'often' modifying verb 'spend'.",
          "feynmanExplanation": "Changing winter or summer seasons do not keep families indoors. Whether in warm summer or snowy winter, families spend time outside. Outdoor nature recreation is a year-round priority for citizens. 계절과 관계없이 연중 야외 활동을 즐기는 가족 문화를 소개합니다.",
          "teachingTranscript": [
            { "english": "The clause 'Whether it's summer or snowy winter' shows that nature activity is a year-round priority.", "korean": "'Whether it's summer or snowy winter' 절은 자연 활동이 연중 내내 우선순위임을 보여줍니다." }
          ]
        },
        {
          "sentenceNumber": 21,
          "original": "Kids might go sledding, or visit a forest!",
          "chunkReading": "Kids might go sledding, / or visit a forest!",
          "directKorean": "아이들은 썰매를 타러 갈 수도 있고, / 숲을 방문할 수도 있다!",
          "naturalKorean": "아이들은 썰매를 타러 가거나 숲을 찾기도 합니다!",
          "mustKnowChunks": [
            { "chunk": "go sledding", "meaning": "썰매를 타러 가다", "use": "go + -ing activity structure", "example": "In January, children love to go sledding." },
            { "chunk": "visit a forest", "meaning": "숲을 방문하다/놀러 가다", "use": "verb + noun outdoor destination", "example": "On Sundays, families visit a forest for fresh air." }
          ],
          "mustKnowGrammar": "Modal verb 'might' expressing possibility; parallel activity verbs ('go sledding, or visit a forest'). Exclamation mark ends Page 3 on an engaging note.",
          "feynmanExplanation": "This final sentence gives fun examples of outdoor children's activities. Kids might go sledding down snowy hills during winter. They might also explore local pine forests with their families. 썰매 타기와 숲 탐방 등 아이들의 구체적 야외 활동 예시로 마무리합니다.",
          "teachingTranscript": [
            { "english": "S21 concludes Page 3 with two delightful examples: sledding and forest visits.", "korean": "S21은 썰매 타기와 숲 방문이라는 두 가지 즐거운 예시로 3페이지를 마무리합니다." }
          ]
        }
      ],

      "finalWritingSupport": {
        "sentenceFrames": [
          "According to the visual text, Sweden is described as ...",
          "Historically, Sweden’s identity was shaped by ..., while today it focuses on ...",
          "A key example of balanced daily life presented in the source is ...",
          "These details suggest that Swedish culture values ..., but readers should remember that one short text cannot represent every citizen."
        ],
        "usefulConnectors": [
          "According to the visual",
          "For example",
          "While",
          "Although",
          "However",
          "In addition",
          "Overall"
        ],
        "usefulVocabulary": [
          "Scandinavia",
          "identity",
          "equality",
          "fika",
          "balanced routines",
          "peaceful traditions",
          "cautious interpretation"
        ],
        "paragraphOutline": [
          "Topic Sentence: Introduce Sweden's profile combining geography, history, and daily balance as presented in the visual text.",
          "Supporting Evidence 1: State a geography/fact box detail from Page 1 (e.g., location in Scandinavia, Stockholm's 14 islands, 10.5M population).",
          "Supporting Evidence 2: Provide a historical identity detail from Page 2 (e.g., 200+ years of peace or 1900s commitment to equality).",
          "Supporting Evidence 3: Add a daily-life detail from Page 3 (e.g., fika snack breaks, free school hot lunches, or outdoor recreation).",
          "Cautious Limitation & Explanation: Explain what these details suggest while noting that one visual text cannot speak for all citizens.",
          "Concluding Sentence: Summarize with a respectful concluding statement on studying cultural profiles."
        ],
        "commonMistakes": [
          {
            "mistake": "Overgeneralizing cultural claims (e.g., writing 'All Swedish citizens eat fika every day at 10 AM without exception').",
            "correction": "Use cautious reporting frames: 'According to the visual text, many people enjoy a cozy daily snack break called fika.'"
          },
          {
            "mistake": "Misquoting figures or geography (e.g., writing 'Sweden is a small island nation in Southern Europe').",
            "correction": "Verify source facts: 'Page 1 describes Sweden as a long, skinny country in Northern Europe with a capital built on 14 islands.'"
          },
          {
            "mistake": "Confusing Korean ESL terminology between 'refugee' (피난민/난민) and 'immigrant' (이민자).",
            "correction": "Distinguish terms clearly: 'A refugee flees conflict or persecution, whereas an immigrant chooses to relocate permanently.'"
          },
          {
            "mistake": "Omitting contrast connectors when connecting historical military power with 200 years of peace.",
            "correction": "Use contrast structures: 'While Sweden was a powerful kingdom in the 1600s, over time it chose peace over war and has not fought in a war for 200+ years.'"
          }
        ],
        "teacherCorrectionFocus": [
          "Verify exact source attribution and numbers (10.5 million, 450,000 km², 200 years of peace).",
          "Check for cautious reporting verbs ('suggests', 'indicates', 'reflects') rather than absolute generalizations.",
          "Ensure inclusion of at least one historical detail and one daily-life detail.",
          "Enforce word count boundaries strictly between 100 and 140 words."
        ],
        "g1Scaffold": "Provide sentence starters for each outline step and allow students to select specific facts from Page 1 and Page 3.",
        "g2Extension": "Challenge G2 students to analyze how Sweden's historical choice of 200 years of peace influenced its modern approach to social welfare, education, and international refugee policy."
      }
    }
  }
};

const lessonFilePath = path.join(outputDir, 'lesson-data.json');
fs.writeFileSync(lessonFilePath, JSON.stringify(lessonData, null, 2), 'utf8');
console.log(`Sweden lesson-data.json updated successfully at ${lessonFilePath}!`);
