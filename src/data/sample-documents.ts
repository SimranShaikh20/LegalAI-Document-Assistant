export interface SampleDocument {
  id: string;
  title: string;
  description: string;
  language: 'en' | 'hi' | 'gu';
  category: 'rental' | 'employment' | 'service';
  content: string;
  expectedRiskScore: number;
}

export const SAMPLE_DOCUMENTS: SampleDocument[] = [
  {
    id: 'rental-en',
    title: '🏠 Rental Agreement (English)',
    description: 'Standard 12-month apartment lease',
    language: 'en',
    category: 'rental',
    expectedRiskScore: 45,
    content: `RENTAL AGREEMENT

This Rental Agreement is entered into on January 1, 2025, between:

LANDLORD: Mr. Rajesh Kumar, residing at 123 Park Street, Mumbai, Maharashtra 400001
TENANT: Ms. Priya Sharma, residing at 456 Lake View Apartments, Mumbai, Maharashtra 400002

PROPERTY: Flat No. 302, Green Valley Apartments, Andheri West, Mumbai, Maharashtra 400053

1. TERM OF LEASE
The lease shall commence on February 1, 2025, and shall continue for a period of 12 months, ending on January 31, 2026. This agreement shall automatically renew for successive periods of 12 months unless either party provides written notice of termination at least 60 days prior to the end of the current term.

2. RENT AND PAYMENT TERMS
The monthly rent is INR 25,000 (Twenty-Five Thousand Rupees Only), payable on or before the 1st day of each month. Late payment after the 5th day of the month will incur a penalty of INR 500 per day. Payment shall be made via bank transfer to Account No. 1234567890, IFSC: SBIN0001234, State Bank of India.

3. SECURITY DEPOSIT
The Tenant shall pay a refundable security deposit of INR 50,000 (Fifty Thousand Rupees Only) before occupying the premises. This deposit shall be refunded within 30 days of vacating the property, subject to deductions for any damages beyond normal wear and tear.

4. MAINTENANCE AND REPAIRS
The Tenant shall be responsible for all minor repairs and maintenance costs under INR 2,000. Major repairs, including structural issues, plumbing, and electrical problems, shall be borne by the Landlord. The Tenant must maintain the property in good condition and report any issues immediately.

5. RENT INCREASE
The rent shall be increased by 5% annually upon renewal of the agreement.

6. UTILITIES
The Tenant shall pay all utility bills including electricity, water, gas, and internet charges. Society maintenance charges of INR 3,000 per month shall be paid by the Tenant separately.

7. TERMINATION
Either party may terminate this agreement by providing 30 days written notice. If the Tenant terminates before completing 12 months, they shall forfeit one month's rent from the security deposit as an early termination fee.

8. SUBLETTING
The Tenant shall not sublet, assign, or transfer the premises or any part thereof without prior written consent from the Landlord.

9. USE OF PREMISES
The premises shall be used solely for residential purposes. No commercial activities, illegal activities, or activities causing nuisance to neighbors are permitted.

10. INSPECTION
The Landlord reserves the right to inspect the property with 24 hours prior notice to the Tenant.

11. LIABILITY
The Tenant shall be liable for any damage to the property caused by themselves, their family members, or guests. The Landlord shall not be liable for any loss or damage to the Tenant's personal property.

12. DISPUTE RESOLUTION
Any disputes arising from this agreement shall be resolved through arbitration in Mumbai, Maharashtra, in accordance with the Indian Arbitration and Conciliation Act, 1996.

SIGNATURES:

Landlord: _________________
Date: January 1, 2025

Tenant: _________________
Date: January 1, 2025

Witness 1: _________________
Witness 2: _________________`
  },
  {
    id: 'rental-hi',
    title: '🏠 किराया समझौता (Hindi)',
    description: 'मानक 12 महीने का अपार्टमेंट पट्टा',
    language: 'hi',
    category: 'rental',
    expectedRiskScore: 48,
    content: `किराया समझौता

यह किराया समझौता 1 जनवरी 2025 को निम्नलिखित के बीच किया गया है:

मकान मालिक: श्री राजेश कुमार, निवासी 123 पार्क स्ट्रीट, मुंबई, महाराष्ट्र 400001
किरायेदार: सुश्री प्रिया शर्मा, निवासी 456 लेक व्यू अपार्टमेंट्स, मुंबई, महाराष्ट्र 400002

संपत्ति: फ्लैट नंबर 302, ग्रीन वैली अपार्टमेंट्स, अंधेरी पश्चिम, मुंबई, महाराष्ट्र 400053

1. पट्टे की अवधि
पट्टा 1 फरवरी 2025 से शुरू होगा और 12 महीने की अवधि के लिए जारी रहेगा, जो 31 जनवरी 2026 को समाप्त होगा। यह समझौता 12 महीने की निरंतर अवधि के लिए स्वचालित रूप से नवीनीकृत होगा, जब तक कि कोई भी पक्ष वर्तमान अवधि के अंत से कम से कम 60 दिन पहले समाप्ति की लिखित सूचना प्रदान नहीं करता है।

2. किराया और भुगतान की शर्तें
मासिक किराया 25,000 रुपये (पच्चीस हजार रुपये मात्र) है, जो प्रत्येक महीने की पहली तारीख को या उससे पहले देय है। महीने की 5वीं तारीख के बाद देर से भुगतान पर प्रति दिन 500 रुपये का जुर्माना लगेगा। भुगतान खाता संख्या 1234567890, IFSC: SBIN0001234, भारतीय स्टेट बैंक में बैंक हस्तांतरण के माध्यम से किया जाएगा।

3. सुरक्षा जमा
किरायेदार को परिसर पर कब्जा करने से पहले 50,000 रुपये (पचास हजार रुपये मात्र) की वापसी योग्य सुरक्षा जमा राशि का भुगतान करना होगा। यह जमा राशि संपत्ति खाली करने के 30 दिनों के भीतर वापस कर दी जाएगी, सामान्य टूट-फूट से परे किसी भी क्षति के लिए कटौती के अधीन।

4. रखरखाव और मरम्मत
किरायेदार 2,000 रुपये से कम की सभी छोटी मरम्मत और रखरखाव लागत के लिए जिम्मेदार होगा। संरचनात्मक मुद्दों, प्लंबिंग और बिजली की समस्याओं सहित प्रमुख मरम्मत मकान मालिक द्वारा वहन की जाएगी। किरायेदार को संपत्ति को अच्छी स्थिति में बनाए रखना होगा और किसी भी समस्या की तुरंत रिपोर्ट करनी होगी।

5. किराया वृद्धि
समझौते के नवीनीकरण पर किराया में सालाना 5% की वृद्धि होगी।

6. उपयोगिताएँ
किरायेदार बिजली, पानी, गैस और इंटरनेट शुल्क सहित सभी उपयोगिता बिलों का भुगतान करेगा। सोसाइटी रखरखाव शुल्क 3,000 रुपये प्रति माह किरायेदार द्वारा अलग से भुगतान किया जाएगा।

7. समाप्ति
कोई भी पक्ष 30 दिन की लिखित सूचना देकर इस समझौते को समाप्त कर सकता है। यदि किरायेदार 12 महीने पूरे होने से पहले समाप्त करता है, तो वे जल्दी समाप्ति शुल्क के रूप में सुरक्षा जमा से एक महीने का किराया जब्त कर लेंगे।

8. उप-पट्टा
किरायेदार मकान मालिक की पूर्व लिखित सहमति के बिना परिसर या उसके किसी भी हिस्से को उप-पट्टे पर, असाइन या स्थानांतरित नहीं करेगा।

9. परिसर का उपयोग
परिसर का उपयोग केवल आवासीय उद्देश्यों के लिए किया जाएगा। कोई वाणिज्यिक गतिविधियाँ, अवैध गतिविधियाँ, या पड़ोसियों को उपद्रव पैदा करने वाली गतिविधियाँ की अनुमति नहीं है।

10. निरीक्षण
मकान मालिक किरायेदार को 24 घंटे की पूर्व सूचना के साथ संपत्ति का निरीक्षण करने का अधिकार सुरक्षित रखता है।

11. दायित्व
किरायेदार स्वयं, अपने परिवार के सदस्यों या मेहमानों द्वारा संपत्ति को होने वाली किसी भी क्षति के लिए उत्तरदायी होगा। मकान मालिक किरायेदार की व्यक्तिगत संपत्ति के किसी भी नुकसान या क्षति के लिए उत्तरदायी नहीं होगा।

12. विवाद समाधान
इस समझौते से उत्पन्न किसी भी विवाद को भारतीय मध्यस्थता और सुलह अधिनियम, 1996 के अनुसार मुंबई, महाराष्ट्र में मध्यस्थता के माध्यम से हल किया जाएगा।

हस्ताक्षर:

मकान मालिक: _________________
तारीख: 1 जनवरी 2025

किरायेदार: _________________
तारीख: 1 जनवरी 2025

गवाह 1: _________________
गवाह 2: _________________`
  },
  {
    id: 'employment-en',
    title: '💼 Employment Contract (English)',
    description: 'Tech company job offer with restrictive clauses',
    language: 'en',
    category: 'employment',
    expectedRiskScore: 62,
    content: `EMPLOYMENT AGREEMENT

This Employment Agreement is entered into on March 1, 2025, between:

EMPLOYER: TechCorp India Private Limited, having its registered office at Tower A, Cyber Park, Bangalore, Karnataka 560001

EMPLOYEE: Mr. Amit Patel, residing at 789 Tech Avenue, Bangalore, Karnataka 560002

1. POSITION AND DUTIES
The Employee is hired as Senior Software Engineer and shall perform duties as assigned by the Employer, including but not limited to software development, code reviews, mentoring junior developers, and participating in client meetings.

2. EMPLOYMENT TERM
Employment shall commence on April 1, 2025, and shall continue unless terminated by either party as per the terms of this agreement.

3. COMPENSATION
The Employee shall receive an annual gross salary of INR 18,00,000 (Eighteen Lakh Rupees Only), payable monthly. The salary is subject to applicable tax deductions.

4. WORKING HOURS
Standard working hours are 9:30 AM to 6:30 PM, Monday to Friday. The Employee may be required to work additional hours as per project requirements without additional compensation.

5. INTELLECTUAL PROPERTY
All work product, inventions, discoveries, improvements, and innovations created by the Employee during employment, whether during working hours or not, and whether using company resources or not, shall be the exclusive property of the Employer. This includes but is not limited to software code, documentation, designs, and processes.

6. CONFIDENTIALITY
The Employee shall maintain strict confidentiality of all company information, trade secrets, client data, and proprietary information during employment and for 3 years after termination. Violation may result in legal action and damages.

7. NON-COMPETE CLAUSE
During employment and for a period of 2 years after termination, the Employee shall not:
- Work for any company in the software development or IT services industry in India
- Provide consulting services to any client or competitor of the Employer
- Start or participate in any business competing with the Employer's services
- Solicit or contact any clients, customers, or employees of the Employer

8. TERMINATION
Either party may terminate this agreement with 90 days written notice. The Employer reserves the right to terminate employment immediately without notice for misconduct, poor performance, or breach of contract. In case of immediate termination by the Employer, the Employee shall receive only salary earned up to the termination date.

9. PROBATION PERIOD
The first 6 months shall be a probation period. During this time, employment may be terminated by either party with 7 days notice. No severance or benefits apply during probation.

10. BENEFITS
The Employee shall be entitled to:
- 15 days of paid leave per year (accrued monthly)
- Health insurance coverage (after 6 months of employment)
- Provident fund contribution as per statutory requirements

11. PERFORMANCE BOND
The Employee shall execute a performance bond of INR 2,00,000 (Two Lakh Rupees) before joining. If the Employee leaves before completing 2 years of service, this amount shall be forfeited to the Employer.

12. TRAINING RECOVERY
If the Employee attends any company-sponsored training or certification program and leaves within 1 year of completing the training, they shall reimburse 100% of the training costs to the Employer.

13. LOCATION AND TRANSFER
The Employee shall work from the Bangalore office. The Employer reserves the right to transfer the Employee to any location in India with 30 days notice. Refusal to transfer may result in termination.

14. BACKGROUND VERIFICATION
Employment is subject to satisfactory background verification including educational qualifications, employment history, and police verification. Any discrepancy may result in immediate termination without notice.

15. GOVERNING LAW
This agreement shall be governed by the laws of India and subject to the exclusive jurisdiction of courts in Bangalore, Karnataka.

ACCEPTANCE:

I, Amit Patel, have read and understood all terms of this agreement and accept them voluntarily.

Employee Signature: _________________
Date: March 1, 2025

Employer Representative: _________________
Name: Ms. Sarah Reddy, HR Director
Date: March 1, 2025`
  }
];
