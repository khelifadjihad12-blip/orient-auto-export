/**
 * Legal content for HAKO Global Trading Limited.
 *
 * Each document is written in professional legal English, suitable for
 * publishing on a real commercial website. Documents are internally
 * consistent and use legally accurate terminology.
 *
 * Company: HAKO Global Trading Limited
 * Jurisdiction: Hong Kong SAR
 * Email: CONTACT@hakoautomobile.com
 * WhatsApp: +213 780 442 267
 */

export interface LegalDocument {
  slug: string;
  title: string;
  description: string;
  lastUpdated: string;
  category: "legal";
  content: string; // Markdown
}

const COMPANY = "HAKO Global Trading Limited";
const EMAIL = "CONTACT@hakoautomobile.com";
const WHATSAPP = "+213 780 442 267";
const JURISDICTION = "Hong Kong Special Administrative Region";
const UPDATED = "7 July 2025";

export const legalDocuments: LegalDocument[] = [
  {
    slug: "privacy-policy",
    title: "Privacy Policy",
    description:
      "How HAKO Global Trading Limited collects, uses, and protects personal data in accordance with Hong Kong law and the GDPR.",
    lastUpdated: UPDATED,
    category: "legal",
    content: `# Privacy Policy

**Last updated:** ${UPDATED}

${COMPANY} ("we", "us", or "our") is a company registered in the ${JURISDICTION}, specializing in the export of brand-new Chinese vehicles to international markets. We are committed to protecting the privacy and personal data of our customers, website visitors, and business counterparts.

This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, request a quotation, or communicate with us. It complies with the Personal Data (Privacy) Ordinance (Cap. 486) of Hong Kong and the European Union's General Data Protection Regulation (Regulation (EU) 2016/679) ("GDPR").

## 1. Information We Collect

### 1.1 Information You Provide

We collect information that you voluntarily provide when you interact with us:

- **Contact form submissions:** your name, email address, subject, and message.
- **Quotation requests:** your business name, contact person, email address, phone number, country, preferred vehicle, quantity, destination port, and payment preference.
- **WhatsApp communications:** your phone number and the content of messages you send to our WhatsApp Business line.
- **Email communications:** your email address and the content of correspondence.
- **KYC documentation:** identity verification documents, proof of address, and business registration documents (see our KYC Information page).

### 1.2 Information Collected Automatically

When you visit our website, we may automatically collect:

- IP address and browser type;
- Device information and operating system;
- Pages visited, time spent, and referral source;
- Cookies and similar technologies (see our Cookie Policy).

## 2. Legal Basis for Processing

Where the GDPR applies, we process personal data on the following legal bases:

- **Contractual necessity:** processing required to respond to your quotation request and to conclude a supply agreement.
- **Legitimate interests:** responding to enquiries, communicating with prospective customers, and detecting fraud.
- **Legal obligation:** compliance with Anti-Money Laundering (AML), Know Your Customer (KYC), sanctions screening, and record-keeping requirements under Hong Kong law.
- **Consent:** where you consent to the use of cookies for analytics or to receive marketing communications.

You may withdraw consent at any time without affecting the lawfulness of processing carried out before withdrawal.

## 3. How We Use Your Information

We use your personal data to:

1. Respond to quotation requests and vehicle enquiries;
2. Process orders, prepare proforma invoices, and arrange shipping;
3. Conduct KYC, AML, and sanctions screening checks;
4. Communicate with you via email and WhatsApp regarding your enquiry or order;
5. Maintain records as required by Hong Kong law;
6. Improve our website, services, and customer experience;
7. Comply with applicable legal and regulatory obligations.

We do not sell your personal data to third parties.

## 4. Data Retention

We retain personal data only for as long as necessary to fulfil the purposes for which it was collected, including:

- **Enquiry data:** up to 24 months after last contact, unless a transaction results.
- **Transaction records:** a minimum of six (6) years from the date of transaction, as required by Hong Kong AML record-keeping regulations.
- **KYC documentation:** six (6) years after the end of the business relationship.
- **Website analytics:** up to 26 months.

After the retention period, data is securely deleted or anonymized.

## 5. International Data Transfers

As an international export business, your data may be transferred to and processed in countries outside Hong Kong, including China (for manufacturing and logistics coordination), Algeria and other destination countries, and the European Economic Area.

We ensure such transfers are carried out in accordance with applicable data protection laws, using standard contractual clauses or other appropriate safeguards where required. When transferring data to jurisdictions without adequate data protection, we implement additional protections to safeguard your information.

## 6. Cookies and Analytics

We use cookies and similar technologies to operate and improve our website. Essential cookies are necessary for the site to function. Analytics cookies help us understand visitor behaviour. For full details, please refer to our Cookie Policy.

## 7. Data Security

We implement reasonable technical and organizational measures to protect personal data, including:

- Encrypted transmission (HTTPS/TLS) for all website traffic;
- Restricted access controls limited to authorized personnel;
- Secure storage of KYC and transaction documentation;
- Regular review of our information security practices.

Despite these measures, no method of transmission over the Internet is completely secure. We cannot guarantee absolute security.

## 8. Your Rights Under the GDPR

If you are a data subject in the European Economic Area or the United Kingdom, you have the following rights:

1. **Right of access:** request a copy of the personal data we hold about you.
2. **Right to rectification:** request correction of inaccurate or incomplete data.
3. **Right to erasure:** request deletion of your personal data, subject to legal retention obligations.
4. **Right to restrict processing:** request that we limit the processing of your data.
5. **Right to data portability:** receive your data in a structured, machine-readable format.
6. **Right to object:** object to processing based on legitimate interests or for direct marketing.
7. **Right to withdraw consent:** withdraw consent at any time where processing is based on consent.

To exercise these rights, contact us using the details in Section 10. We will respond within one (1) month of receiving a valid request.

## 9. Hong Kong Personal Data (Privacy) Ordinance

Under the Personal Data (Privacy) Ordinance (Cap. 486), you have the right to:

- Request access to and correction of your personal data;
- Ascertain our policies and practices in relation to personal data;
- Be informed of the kinds of personal data we hold.

A nominal fee may be charged for processing data access requests.

## 10. Contact Details

If you have any questions about this Privacy Policy or wish to exercise your data protection rights, please contact us:

- **Company:** ${COMPANY}
- **Email:** ${EMAIL}
- **WhatsApp:** ${WHATSAPP}
- **Jurisdiction:** ${JURISDICTION}

## 11. Changes to This Policy

We may update this Privacy Policy from time to time. The "Last updated" date at the top of this page indicates the most recent revision. We encourage you to review this page periodically.

## 12. Governing Law

This Privacy Policy is governed by the laws of the ${JURISDICTION}. Any disputes arising in connection with this policy shall be subject to the exclusive jurisdiction of the courts of Hong Kong.`,
  },
  {
    slug: "terms-of-trade",
    title: "Terms of Trade",
    description:
      "The contractual terms governing vehicle quotations, orders, payments, shipping, Incoterms, and dispute resolution for HAKO Global Trading Limited.",
    lastUpdated: UPDATED,
    category: "legal",
    content: `# Terms of Trade

**Last updated:** ${UPDATED}

These Terms of Trade ("Terms") govern all quotations, orders, and transactions between ${COMPANY} ("we", "us", or "the Company") and any customer ("you", "the Customer") who requests a quotation, places an order, or purchases a vehicle through the Company.

By requesting a quotation or placing an order, you accept these Terms in full. If you do not accept these Terms, you should not submit a quotation request or place an order.

## 1. Scope of Services

The Company provides the following services from its base in the ${JURISDICTION}:

1. Sourcing of brand-new Chinese vehicles from manufacturers and authorized distributors;
2. Preparation of vehicle quotations and proforma invoices;
3. Coordination of pre-shipment inspection and documentation;
4. Arrangement of international ocean freight shipping;
5. Support for customs clearance at the destination port;
6. Customer communication via email and WhatsApp.

The Company acts as an export intermediary. It is not the vehicle manufacturer and does not hold a dealership licence for any specific brand.

## 2. Vehicle Quotations

### 2.1 Quotation Validity

All quotations are provided in writing and are valid for fourteen (14) days from the date of issue, unless otherwise stated. Prices are subject to change after this period without prior notice.

### 2.2 Quotation Contents

Each quotation specifies:

- Vehicle model, configuration, and quantity;
- Unit price and total price in the stated currency;
- Applicable Incoterms (FOB, CIF, or EXW);
- Estimated shipping and transit time;
- Payment terms and deposit requirement;
- Validity period.

### 2.3 No Binding Offer

A quotation constitutes an invitation to treat, not a binding offer. A binding agreement is formed only upon our acceptance of your written purchase order and receipt of the required deposit.

## 3. Orders and Acceptance

### 3.1 Order Confirmation

To place an order, you must submit a written purchase order referencing the quotation number. We will issue a written order confirmation and a proforma invoice.

### 3.2 Right to Decline

We reserve the right to decline any order, in whole or in part, without providing reasons. In such cases, any deposit received will be refunded in full.

### 3.3 Order Amendments

Once an order is confirmed, amendments may be requested in writing. We will assess the feasibility and any cost implications, and issue an amended proforma invoice where the amendment is accepted.

## 4. Deposits and Payment Terms

### 4.1 Deposit

A non-refundable deposit of thirty per cent (30%) of the total order value is required to confirm an order, unless otherwise agreed in writing. The deposit secures the vehicle allocation and initiates the export process.

### 4.2 Balance Payment

The remaining balance is due before shipment, typically against the bill of lading and shipping documents. The exact timing will be specified in the proforma invoice.

### 4.3 Payment Methods

We accept payment by:

- **Telegraphic Transfer (T/T)** to our verified Hong Kong company bank account; or
- **Irrevocable Documentary Letter of Credit (L/C)** issued by a first-class international bank, subject to our acceptance of the issuing bank and L/C terms.

We do not accept cash, cryptocurrency, or transfers to personal accounts.

### 4.4 Late Payment

If payment is not received by the due date, we reserve the right to:

- Delay shipment until full payment is received;
- Cancel the order and retain the deposit as liquidated damages;
- Charge interest at a rate of one and one-half per cent (1.5%) per month on the outstanding balance.

## 5. Currency

Unless otherwise stated, all quotations and invoices are issued in United States Dollars (USD). If payment is made in another currency, exchange rate conversion costs and any bank charges are borne by the Customer. The exchange rate is determined by our bank on the date of payment receipt.

## 6. Export Procedures

Upon receipt of the deposit, the Company will:

1. Confirm the vehicle allocation with the manufacturer or distributor;
2. Arrange pre-shipment inspection at the Chinese port of loading;
3. Prepare the export documentation pack, including the certificate of origin, commercial invoice, and packing list;
4. Book ocean freight with the carrier;
5. Load the vehicle and issue the bill of lading.

The Customer is responsible for providing any import authorisation or licence required by the destination country. We cannot be held liable for delays or refusals caused by the Customer's failure to obtain such authorisations.

## 7. Delivery Terms and Incoterms

### 7.1 FOB (Free On Board)

Under FOB terms, the Company delivers the vehicle on board the vessel at the named Chinese port of loading. Risk and cost transfer to the Customer once the vehicle is loaded. The Customer is responsible for ocean freight, insurance, and all subsequent costs.

### 7.2 CIF (Cost, Insurance and Freight)

Under CIF terms, the Company arranges and pays for ocean freight and minimum marine insurance to the named destination port. Risk transfers to the Customer once the vehicle is loaded on board the vessel at the port of origin. The Customer is responsible for customs clearance, duties, and inland transport at the destination.

### 7.3 EXW (Ex Works)

Under EXW terms, the Customer takes delivery of the vehicle at the manufacturer's premises in China and bears all costs and risks from that point onward, including export clearance from China.

### 7.4 Incoterms Version

All Incoterms references are to Incoterms 2020 published by the International Chamber of Commerce.

## 8. Shipping Responsibility

The Company will use reasonable endeavours to meet estimated shipping and transit times, but these are estimates only and not guaranteed. Factors beyond our control, including port congestion, carrier schedules, weather, and government actions, may cause delays.

The Customer is responsible for inspecting the vehicle upon arrival at the destination port and noting any damage on the bill of lading or delivery receipt before taking possession.

## 9. Customs Responsibility

The Customer is responsible for all import customs clearance, duties, taxes, and regulatory compliance at the destination port. The Company will provide the necessary export documentation but does not act as the Customer's customs broker at the destination.

Any customs duties, import taxes, or regulatory fees levied by the destination country are the sole responsibility of the Customer.

## 10. Force Majeure

Neither party shall be liable for any failure or delay in performing its obligations under these Terms where such failure or delay is caused by events beyond its reasonable control, including but not limited to:

- Acts of God, natural disasters, fires, floods, or epidemics;
- War, armed conflict, or civil unrest;
- Government actions, embargoes, or trade restrictions;
- Port closures, carrier insolvency, or shipping disruptions;
- Labour disputes or industrial action.

The affected party shall notify the other party promptly and use reasonable efforts to resume performance once the force majeure event ends.

## 11. Warranty Limitations

### 11.1 Manufacturer Warranty

Vehicles are supplied with the original manufacturer's warranty as applicable in the destination market. The Company facilitates warranty registration and provides supporting documentation, but does not itself warrant the vehicle.

### 11.2 Exclusion of Implied Warranties

To the maximum extent permitted by law, the Company excludes all implied warranties, conditions, and representations other than those expressly set out in the proforma invoice or these Terms.

### 11.3 No Guarantee of Outcomes

The Company does not guarantee specific regulatory, banking, or customs outcomes, as these depend on the policies of third-party institutions over which we have no control.

## 12. Returns

Vehicles are custom-ordered for export and are non-returnable except where the vehicle delivered does not match the confirmed order specification or arrives with manufacturing defects covered by the manufacturer's warranty.

In such cases, the Customer must notify the Company in writing within seven (7) days of receiving the vehicle. We will coordinate with the manufacturer to address the issue in accordance with the manufacturer's warranty process.

## 13. Cancellation

### 13.1 Cancellation by the Customer

Orders may be cancelled only with our written agreement. Where cancellation is accepted, the deposit shall be forfeited as liquidated damages to cover costs already incurred. If the vehicle has been allocated, manufactured, or shipped, additional cancellation charges may apply.

### 13.2 Cancellation by the Company

We reserve the right to cancel an order where:

- Payment is not received by the due date;
- KYC or AML screening reveals a sanctioned party or prohibited transaction;
- Export controls or sanctions prevent shipment;
- The manufacturer is unable to supply the vehicle.

In such cases, any deposit received will be refunded in full, less any reasonable costs already incurred.

## 14. Governing Law and Jurisdiction

These Terms are governed by the laws of the ${JURISDICTION}. Any dispute arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts of Hong Kong, without prejudice to the Company's right to enforce a judgment in any competent jurisdiction.

## 15. Dispute Resolution

### 15.1 Good-Faith Negotiation

In the event of a dispute, both parties shall first attempt to resolve the matter through good-faith negotiation within thirty (30) days of written notice of the dispute.

### 15.2 Mediation

If the dispute is not resolved through negotiation, the parties agree to attempt mediation in Hong Kong in accordance with the Mediation Rules of the Hong Kong International Arbitration Centre (HKIAC) before commencing litigation.

### 15.3 Arbitration

If mediation fails, the dispute shall be referred to and finally resolved by arbitration administered by the HKIAC under the HKIAC Administered Arbitration Rules. The seat of arbitration shall be Hong Kong, the number of arbitrators shall be one (1), and the language shall be English.

## 16. Contact

For any questions regarding these Terms of Trade, please contact us:

- **Company:** ${COMPANY}
- **Email:** ${EMAIL}
- **WhatsApp:** ${WHATSAPP}`,
  },
  {
    slug: "cookie-policy",
    title: "Cookie Policy",
    description:
      "The types of cookies used by HAKO Global Trading Limited, their purpose, and how to manage or disable them.",
    lastUpdated: UPDATED,
    category: "legal",
    content: `# Cookie Policy

**Last updated:** ${UPDATED}

${COMPANY} ("we", "us", or "our") uses cookies and similar technologies on our website to operate the site, analyse traffic, and improve the user experience. This Cookie Policy explains what cookies are, how we use them, and the choices you have.

This policy should be read alongside our Privacy Policy.

## 1. What Are Cookies

Cookies are small text files placed on your device by the websites you visit. They are widely used to make websites function efficiently and to provide information to site owners. Cookies do not typically identify you personally; they identify your browser session.

## 2. Types of Cookies We Use

### 2.1 Essential Cookies

These cookies are strictly necessary for the website to function. They enable core functionality such as security, session management, and accessibility. The website cannot function properly without these cookies. Essential cookies do not require your consent.

**Examples:** session identifiers, security tokens, language preference storage.

### 2.2 Analytics Cookies

These cookies collect anonymous information about how visitors use our website, including pages visited, time spent on pages, and error messages. We use this data to improve website performance and user experience.

**Service used:** We may use privacy-respecting analytics to aggregate visitor statistics.

Analytics cookies are set only with your consent. You may decline them without affecting the functionality of the website.

### 2.3 Functional Cookies

These cookies enable enhanced functionality and personalisation, such as remembering your language preference (English, French, or Arabic), theme preference (light or dark mode), and recently viewed vehicles. Functional cookies are stored locally on your device and do not track you across other websites.

Functional cookies are set with your consent and can be cleared at any time through your browser settings.

### 2.4 Third-Party Cookies

Our website may embed content or use services from third parties that set their own cookies. Currently, this may include:

- **WhatsApp:** when you click a WhatsApp link, WhatsApp's own cookies may apply on their platform;
- **Image hosting services:** for vehicle photography served from external content delivery networks;
- **Cloudflare:** our hosting provider may set cookies for security and performance optimization.

We do not control third-party cookies. We recommend reviewing the cookie policies of these third parties directly.

## 3. Cookie Duration

Cookies are categorised by their duration:

- **Session cookies:** deleted when you close your browser;
- **Persistent cookies:** remain on your device until they expire or you delete them. Persistent cookies used on this site typically expire after 26 months or less.

## 4. Managing Cookies

### 4.1 Browser Controls

You can control and delete cookies through your browser settings. Each browser offers different instructions:

- **Google Chrome:** Settings > Privacy and security > Cookies and other site data;
- **Mozilla Firefox:** Settings > Privacy & Security > Cookies and Site Data;
- **Safari:** Preferences > Privacy > Cookies and website data;
- **Microsoft Edge:** Settings > Cookies and site permissions.

Blocking all cookies will affect the functionality of this and other websites. Essential cookies cannot be disabled.

### 4.2 Do Not Track Signals

We respond to Do Not Track (DNT) signals where supported by your browser. Where DNT is enabled, we limit non-essential cookies.

### 4.3 Clearing Local Storage

Some preferences (language, theme, recently viewed vehicles) are stored using browser local storage rather than cookies. You can clear local storage through your browser's site data settings.

## 5. Consent

Where required by applicable law, including the EU ePrivacy Directive and the GDPR, we seek your consent before setting non-essential cookies. You may withdraw consent at any time by clearing cookies through your browser settings.

## 6. Updates to This Policy

We may update this Cookie Policy from time to time to reflect changes in technology, regulation, or our business practices. The "Last updated" date indicates the most recent revision.

## 7. Contact

If you have questions about our use of cookies, please contact us:

- **Company:** ${COMPANY}
- **Email:** ${EMAIL}
- **WhatsApp:** ${WHATSAPP}`,
  },
  {
    slug: "trade-compliance-policy",
    title: "Trade Compliance Policy",
    description:
      "HAKO Global Trading Limited's commitment to export control compliance, sanctions screening, anti-bribery, and ethical sourcing.",
    lastUpdated: UPDATED,
    category: "legal",
    content: `# Trade Compliance Policy

**Last updated:** ${UPDATED}

${COMPANY} ("the Company") is a Hong Kong registered entity engaged in the international export of brand-new Chinese vehicles. We are committed to conducting our business in full compliance with applicable trade control, sanctions, anti-bribery, and ethical sourcing laws.

This Trade Compliance Policy sets out the principles and procedures that govern our export operations and the responsibilities of our customers.

## 1. Export Control Compliance

### 1.1 Hong Kong Export Controls

The Company complies with the Import and Export Ordinance (Cap. 60) of Hong Kong and all applicable regulations governing the export of goods from the Hong Kong Special Administrative Region. We ensure that all export documentation, including certificates of origin, commercial invoices, and bills of lading, is accurately prepared and submitted to the relevant authorities.

### 1.2 People's Republic of China Export Controls

As vehicles are sourced from manufacturers in the People's Republic of China, the Company works with suppliers and freight forwarders to ensure compliance with applicable Chinese export procedures. We do not export goods subject to specific Chinese export licences without obtaining the required authorisations.

### 1.3 Destination Country Regulations

The Company supports customers in understanding destination country import requirements; however, the Customer bears ultimate responsibility for obtaining any import licences, authorisations, or compliance approvals required by the destination jurisdiction.

## 2. International Sanctions

### 2.1 Sanctions Screening

The Company conducts sanctions screening on all customers and transaction counterparts against published sanctions lists, including:

- The United Nations Security Council Consolidated List;
- The European Union Consolidated Financial Sanctions List;
- The United Kingdom HM Treasury Office of Financial Sanctions Implementation (OFSI) list;
- The United States Office of Foreign Assets Control (OFAC) Specially Designated Nationals (SDN) list;
- The Hong Kong Monetary Authority list of designated persons.

### 2.2 Restricted Countries

The Company does not engage in transactions involving parties located in, or goods destined for, countries subject to comprehensive United Nations, European Union, or Hong Kong sanctions. Where partial sanctions apply, the Company will assess the specific transaction and may decline or impose additional conditions.

### 2.3 Prohibited Parties

The Company will not enter into any transaction with a party that appears on a sanctions list, or with a party that we reasonably believe is acting on behalf of a sanctioned person or entity.

## 3. Anti-Bribery and Anti-Corruption

### 3.1 Zero-Tolerance Policy

The Company maintains a zero-tolerance policy toward bribery and corruption in any form. We comply with the Prevention of Bribery Ordinance (Cap. 201) of Hong Kong, the United Kingdom Bribery Act 2010, and other applicable anti-corruption laws.

### 3.2 Prohibited Conduct

No employee, agent, or representative of the Company may:

- Offer, promise, give, or accept a bribe or improper advantage;
- Make facilitation payments to expedite routine government action;
- Make political contributions or charitable donations as a means to secure improper advantage;
- Engage in any activity that creates a conflict of interest with the Company's ethical obligations.

### 3.3 Third-Party Due Diligence

The Company conducts due diligence on agents, freight forwarders, customs brokers, and other intermediaries to ensure they uphold equivalent anti-corruption standards.

## 4. Ethical Sourcing

### 4.1 Authorised Sourcing

The Company sources vehicles exclusively from manufacturers and authorised distributors. We do not engage in the trade of used, reconditioned, stolen, or counterfeit vehicles.

### 4.2 Manufacturer Compliance

We select manufacturing partners that demonstrate compliance with applicable labour, environmental, and quality standards. While we rely on manufacturer representations regarding their own compliance, we prioritise partners with established export track records.

### 4.3 Quality Assurance

Every vehicle is subject to pre-shipment inspection at the Chinese port of loading before export. The inspection verifies the vehicle's condition, configuration, and documentation.

## 5. Regulatory Compliance

### 5.1 Hong Kong Regulation

The Company operates under the regulatory framework of the ${JURISDICTION}, including:

- The Companies Ordinance (Cap. 622);
- The Inland Revenue Ordinance (Cap. 112);
- The Anti-Money Laundering and Counter-Terrorist Financing Ordinance (Cap. 615);
- The Personal Data (Privacy) Ordinance (Cap. 486).

### 5.2 International Compliance

Where transactions involve parties in the European Union, the United Kingdom, or other regulated jurisdictions, the Company respects applicable extraterritorial regulations, including the GDPR and relevant trade control regimes.

## 6. Customer Responsibilities

### 6.1 Accurate Information

Customers must provide accurate and complete information when requesting quotations, placing orders, and submitting KYC documentation. The provision of false or misleading information may result in order cancellation and reporting to the relevant authorities.

### 6.2 Import Compliance

Customers are responsible for ensuring that the import of vehicles into the destination country complies with all local laws, including customs declarations, duty payments, and vehicle registration requirements.

### 6.3 Prohibited Use

Customers must not use the Company's services for any illegal purpose, including money laundering, terrorism financing, sanctions evasion, or tax evasion. Any suspected prohibited use will be reported to the relevant authorities.

### 6.4 Cooperation

Customers agree to cooperate with the Company's compliance procedures, including KYC verification, sanctions screening, and transaction monitoring, as described in our KYC Information and AML Policy pages.

## 7. Reporting and Whistleblowing

The Company encourages employees, customers, and business partners to report any suspected violation of this policy. Reports may be made confidentially to ${EMAIL}. The Company does not tolerate retaliation against any person who reports a suspected violation in good faith.

## 8. Review and Updates

This Trade Compliance Policy is reviewed at least annually and may be updated to reflect changes in law or business practice. The "Last updated" date indicates the most recent revision.

## 9. Contact

For questions regarding this Trade Compliance Policy, please contact us:

- **Company:** ${COMPANY}
- **Email:** ${EMAIL}
- **WhatsApp:** ${WHATSAPP}`,
  },
  {
    slug: "aml-policy",
    title: "Anti-Money Laundering (AML) Policy",
    description:
      "HAKO Global Trading Limited's risk-based approach to anti-money laundering, transaction monitoring, and suspicious activity reporting.",
    lastUpdated: UPDATED,
    category: "legal",
    content: `# Anti-Money Laundering (AML) Policy

**Last updated:** ${UPDATED}

${COMPANY} ("the Company") is a Hong Kong registered entity engaged in international vehicle export. We are committed to preventing our services from being used for money laundering, terrorism financing, or other illicit purposes.

This Anti-Money Laundering (AML) Policy describes the framework we apply to identify, assess, and mitigate money laundering and terrorist financing risks, in accordance with the Anti-Money Laundering and Counter-Terrorist Financing Ordinance (Cap. 615) of Hong Kong ("AMLO").

## 1. Company Commitment

The Company maintains a strong commitment to AML compliance. Our senior management is responsible for ensuring that adequate resources, systems, and controls are in place to identify and mitigate money laundering risks. We do not conduct business with customers who refuse to provide required information or who are suspected of engaging in illicit activity.

## 2. Risk-Based Approach

### 2.1 Risk Assessment

The Company applies a risk-based approach to AML compliance. We assess the money laundering and terrorist financing risk of each customer and transaction based on factors including:

- The customer's country of residence or incorporation;
- The destination country of the vehicle;
- The nature of the customer (individual, corporate, or government);
- The payment method and source of funds;
- The transaction value and complexity;
- Any unusual or inconsistent patterns of behaviour.

### 2.2 Risk Categorisation

Customers are categorised as low, medium, or high risk. Higher-risk customers are subject to enhanced due diligence, including additional documentation, senior management approval, and more frequent transaction monitoring.

### 2.3 High-Risk Indicators

Transactions that present any of the following indicators are treated as high risk:

- Payments from third parties not named on the order;
- Payments in cash or cash-equivalent instruments;
- Requests to route payments through multiple jurisdictions without legitimate business reasons;
- Customers based in or connected to high-risk jurisdictions as identified by the Financial Action Task Force (FATF);
- Transactions that do not match the customer's known profile or business activity.

## 3. Customer Due Diligence (CDD)

The Company conducts Customer Due Diligence on all customers before entering into a business relationship or carrying out a transaction. The scope of CDD depends on the risk categorisation and is described in detail on our KYC Information page.

Where CDD cannot be satisfactorily completed, the Company will not establish or continue the business relationship and may file a suspicious transaction report.

## 4. Transaction Monitoring

### 4.1 Ongoing Monitoring

The Company monitors transactions on an ongoing basis to ensure they are consistent with the customer's known profile, business activity, and risk categorisation. Monitoring includes:

- Verifying that payment origin matches the customer's identified bank account;
- Checking for unusual payment structures or jurisdictions;
- Reviewing vehicle destination and shipping routes against sanctions lists;
- Identifying transactions that deviate from expected patterns.

### 4.2 Enhanced Monitoring

High-risk customers and transactions are subject to enhanced monitoring, including:

- Additional verification of the source of funds;
- Senior management review and approval;
- More frequent re-screening against sanctions lists;
- Retention of additional supporting documentation.

## 5. Suspicious Activity Reporting

Where the Company knows or suspects that a customer, transaction, or property is connected to money laundering, terrorist financing, or other criminal activity, we will:

1. Seek the consent of the Joint Financial Intelligence Unit (JFIU) of Hong Kong before completing the transaction, where required by the AMLO;
2. File a Suspicious Transaction Report with the JFIU;
3. Not disclose to the customer or any third party that a report has been made (tipping off is a criminal offence under Hong Kong law);
4. Retain all relevant records and documentation.

## 6. Sanctions Screening

The Company screens all customers, beneficial owners, and transaction counterparts against published sanctions lists at onboarding and on an ongoing basis. The lists screened include those maintained by the United Nations, the European Union, the United Kingdom, the United States, and Hong Kong authorities.

Where a match is identified, the transaction is suspended pending investigation. Confirmed matches result in transaction refusal, account termination, and reporting to the relevant authorities.

## 7. Record Keeping

The Company maintains records of all transactions, customer identification documents, and AML screening results for a minimum of six (6) years from the date of the transaction or the end of the business relationship, whichever is later.

Records are stored securely and are accessible to authorised personnel and competent authorities upon lawful request.

## 8. Compliance Responsibilities

### 8.1 Management Oversight

The Company's senior management is ultimately responsible for AML compliance. A designated compliance officer is responsible for the day-to-day implementation of this policy.

### 8.2 Employee Training

All employees receive AML training appropriate to their role, including identification of suspicious activity, sanctions screening procedures, and reporting obligations. Training is refreshed at least annually.

### 8.3 Independent Review

The Company's AML framework is subject to periodic independent review to ensure its effectiveness and compliance with applicable laws.

## 9. Customer Cooperation

Customers are required to cooperate with the Company's AML procedures, including:

- Providing accurate and complete KYC documentation;
- Disclosing the source of funds where requested;
- Consenting to sanctions screening and transaction monitoring;
- Notifying the Company of any change in beneficial ownership or business structure.

Refusal to cooperate may result in the refusal or termination of services.

## 10. Contact

For questions regarding this AML Policy, please contact us:

- **Company:** ${COMPANY}
- **Email:** ${EMAIL}
- **WhatsApp:** ${WHATSAPP}`,
  },
  {
    slug: "kyc-information",
    title: "Know Your Customer (KYC) Information",
    description:
      "The identity verification requirements for individual and corporate customers of HAKO Global Trading Limited.",
    lastUpdated: UPDATED,
    category: "legal",
    content: `# Know Your Customer (KYC) Information

**Last updated:** ${UPDATED}

${COMPANY} ("the Company") is required by Hong Kong law, including the Anti-Money Laundering and Counter-Terrorist Financing Ordinance (Cap. 615), to verify the identity of our customers and understand the nature of their business with us.

This page explains why customer verification is required, what information we request, and how the process works.

## 1. Why Customer Verification Is Required

Customer verification, commonly known as Know Your Customer or KYC, serves three principal purposes:

1. **Preventing money laundering and terrorist financing:** verifying customer identity helps ensure our services are not used to launder proceeds of crime or finance terrorism;
2. **Sanctions compliance:** screening customers against published sanctions lists is a legal requirement under Hong Kong and international law;
3. **Protecting customers:** identity verification protects you from identity fraud and unauthorised transactions.

The Company cannot process orders or ship vehicles without completing KYC verification. This is a legal obligation, not a discretionary policy.

## 2. Individual Customer Requirements

Where the Customer is an individual (a private buyer), the following documentation is required:

### 2.1 Identity Verification

- A valid government-issued identity document showing your full name, date of birth, photograph, and document number. Acceptable documents include:
  - National identity card;
  - Passport (preferred for international transactions);
  - Driving licence (where it includes a photograph).

The document must be valid at the time of submission and clearly legible.

### 2.2 Proof of Address

- A utility bill, bank statement, or government-issued document showing your full name and residential address, dated within the last three (3) months.

### 2.3 Contact Verification

- A working email address;
- A working phone number capable of receiving WhatsApp messages.

## 3. Corporate Customer Requirements

Where the Customer is a corporate entity (a business, dealership, or fleet buyer), the following documentation is required:

### 3.1 Business Registration Documents

- Certificate of incorporation or equivalent registration document from the jurisdiction of incorporation;
- Business registration certificate or equivalent current trading licence;
- Memorandum and Articles of Association, or equivalent constitutional documents.

### 3.2 Authorised Representatives

- A list of directors or equivalent officers;
- Identification of the authorised representative who will sign the purchase order, as per Section 2.1 above;
- A board resolution or power of attorney authorising the representative to act on behalf of the company.

### 3.3 Registered Office and Business Address

- Proof of the company's registered office and principal place of business, such as a utility bill or lease agreement dated within the last three (3) months.

## 4. Ultimate Beneficial Owner (UBO)

### 4.1 Definition

An Ultimate Beneficial Owner is any individual who ultimately owns or controls the customer entity, directly or indirectly, through ownership of twenty-five per cent (25%) or more of the shares or voting rights, or who otherwise exercises control over the entity.

### 4.2 UBO Documentation

For each UBO, the Company requires:

- Identity verification as per Section 2.1;
- A declaration of the ownership structure showing the chain of ownership down to the UBO;
- Where the ownership structure is complex, a certified organisational chart may be requested.

### 4.3 Nominee Arrangements

Where a UBO acts through nominees, trustees, or other intermediaries, full details of the arrangement must be disclosed. The Company does not accept customers who refuse to disclose their UBOs.

## 5. Source of Funds

Where the transaction value, risk profile, or other factors indicate elevated money laundering risk, the Company may request information regarding the source of funds used for the purchase. This may include:

- Bank statements showing the accumulation of funds;
- Sale proceeds documentation (e.g., sale of property or business);
- Business revenue documentation;
- Salary or employment income evidence.

The Company treats source-of-funds information as confidential and uses it solely for AML compliance purposes.

## 6. Identity Verification Process

### 6.1 Document Submission

Documents may be submitted via encrypted email to ${EMAIL} or through a secure upload link provided by the Company. We do not accept documents via unsecured messaging applications.

### 6.2 Verification Method

The Company verifies documents by:

- Comparing the information provided against the identity document;
- Cross-checking business registration details with public registries where available;
- Screening the customer and UBOs against sanctions lists;
- Where required, using electronic identity verification services.

### 6.3 In-Person Verification

In exceptional cases, the Company may request an in-person or video call verification. This is typically reserved for high-risk transactions.

## 7. Data Protection

KYC documentation is treated as highly sensitive personal data. The Company:

- Stores documentation in encrypted, access-controlled systems;
- Limits access to authorised compliance and finance personnel only;
- Retains documentation for six (6) years after the end of the business relationship, as required by law;
- Does not share KYC documentation with third parties except where required by law or where the customer has provided written consent.

For full details, please refer to our Privacy Policy.

## 8. Processing Times

KYC verification is typically completed within two (2) to five (5) business days of receiving complete documentation. The Company will notify the Customer if additional information is required.

Verification may take longer in the following circumstances:

- The documentation submitted is incomplete or unclear;
- The customer is classified as high risk, requiring enhanced due diligence;
- The ownership structure is complex, requiring additional review;
- Sanctions screening returns a potential match requiring investigation.

The Company will not process an order or ship a vehicle until KYC verification is complete.

## 9. Ongoing Obligations

KYC verification is not a one-time event. The Company conducts periodic reviews of customer information and may request updated documentation at any time during the business relationship. Customers must notify the Company of any material change in their identity, ownership structure, or business activity.

## 10. Refusal or Termination

The Company reserves the right to refuse or terminate a business relationship where:

- KYC documentation cannot be satisfactorily verified;
- The customer appears on a sanctions list;
- There are reasonable grounds to suspect money laundering or other illicit activity;
- The customer refuses to provide requested information.

In such cases, any deposit received will be refunded in accordance with our Terms of Trade, less any reasonable costs already incurred and subject to any legal obligation to retain funds.

## 11. Contact

For questions regarding the KYC process, please contact us:

- **Company:** ${COMPANY}
- **Email:** ${EMAIL}
- **WhatsApp:** ${WHATSAPP}`,
  },
  {
    slug: "disclaimer",
    title: "Disclaimer",
    description:
      "Important limitations of liability, accuracy of information, and use of the HAKO Global Trading Limited website.",
    lastUpdated: UPDATED,
    category: "legal",
    content: `# Disclaimer

**Last updated:** ${UPDATED}

This Disclaimer governs your use of the website operated by ${COMPANY} ("the Company", "we", or "us"). By accessing and using this website, you accept the terms of this Disclaimer in full.

## 1. Website Information

The information provided on this website is for general informational purposes only. While the Company endeavours to keep the information up to date and accurate, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the website or the information, products, services, or related graphics contained on the website for any purpose.

Any reliance you place on such information is strictly at your own risk.

## 2. Vehicle Specifications

Vehicle specifications, features, and technical data displayed on this website are provided by the manufacturers and are intended as general guidance only. Specifications may vary by market, production batch, and configuration. Final specifications for any vehicle will be confirmed in writing on the proforma invoice at the time of order.

The Company does not warrant that the specifications displayed on the website are error-free or applicable to every market. Customers should verify all material specifications with the Company before placing an order.

## 3. Availability

The availability of specific vehicle models, configurations, and colours is subject to change without notice. The Company does not guarantee that any vehicle displayed on the website will be available at the time of order. Vehicle availability depends on manufacturer production schedules, stock levels, and export allocations.

## 4. Prices

All prices displayed on the website are indicative and expressed in United States Dollars (USD) unless otherwise stated. Actual prices are confirmed in the written quotation and proforma invoice. Prices are subject to change due to:

- Manufacturer price adjustments;
- Currency exchange rate fluctuations;
- Changes in freight, insurance, or regulatory costs;
- Changes in applicable taxes or duties.

The Company reserves the right to amend prices at any time before an order is confirmed. The price applicable to your order is the price stated in the proforma invoice issued upon order confirmation.

## 5. Exchange Rates

Where payments are made in a currency other than USD, the applicable exchange rate is determined by the Company's bank on the date the payment is received. The Company is not responsible for exchange rate losses or bank charges incurred by the Customer.

## 6. Images

Vehicle images displayed on this website are provided for illustrative purposes only. They may include optional equipment, accessories, or features not included in the standard specification. Images may not depict the exact configuration, colour, or trim available in your market.

The Company does not guarantee that the vehicle delivered will match the website images in every detail. The binding specification is that set out in the proforma invoice.

## 7. Third-Party Information

This website may contain references or links to third-party websites, services, or content. The Company has no control over the nature, content, and availability of those sites. The inclusion of any links does not necessarily imply a recommendation or endorse the views expressed within them.

The Company is not responsible for the accuracy or reliability of any information, opinion, or statement made on third-party websites and disclaims all liability for any loss or damage arising from reliance on such information.

## 8. No Legal Advice

The content of this website, including the Privacy Policy, Terms of Trade, Cookie Policy, Trade Compliance Policy, AML Policy, KYC Information, and this Disclaimer, is provided for informational purposes only and does not constitute legal, tax, financial, or regulatory advice.

You should consult qualified professional advisers in your jurisdiction before making any decision based on information contained on this website. The Company does not accept any liability for decisions made in reliance on website content without taking appropriate professional advice.

## 9. No Guarantee of Regulatory or Banking Outcomes

The Company facilitates the export of vehicles and the preparation of documentation. However, we do not guarantee:

- The approval of any import authorisation by the destination country;
- The clearance of any shipment through customs at the destination port;
- The acceptance of any payment method by our bank or the customer's bank;
- The outcome of any sanctions, AML, or KYC screening process;
- The acceptance or registration of a vehicle by the destination country's authorities.

These outcomes depend on the policies and decisions of third-party institutions over which the Company has no control.

## 10. Limitation of Liability

To the maximum extent permitted by law, the Company, its directors, employees, agents, and affiliates shall not be liable for any direct, indirect, incidental, consequential, special, or exemplary damages arising out of or in connection with:

- Your use of or inability to use the website;
- Any vehicle specification, price, or availability displayed on the website;
- Any delay or failure in shipping, customs clearance, or delivery;
- Any action or inaction by a third party, including manufacturers, carriers, banks, or government authorities;
- Any loss of profits, business, goodwill, or data.

Nothing in this Disclaimer excludes or limits liability for fraud, or for any liability that cannot be excluded or limited under applicable law.

## 11. External Links

The Company is not responsible for the content of external websites that link to this website, nor for the content of websites to which this website links. The presence of a link does not constitute an endorsement or recommendation.

## 12. Intellectual Property

All content on this website, including text, graphics, logos, images, the "HAKO AUTOMOBILE" wordmark, the geometric "H" icon, and software, is the property of ${COMPANY} or its content providers and is protected by international copyright, trademark, and other intellectual property laws.

You may not reproduce, distribute, modify, transmit, reuse, or use the content of this website for public or commercial purposes without the prior written consent of the Company.

## 13. Changes to This Disclaimer

The Company reserves the right to modify this Disclaimer at any time. Changes are effective immediately upon posting on this website. Continued use of the website after any changes constitutes acceptance of the modified Disclaimer.

## 14. Governing Law

This Disclaimer is governed by the laws of the ${JURISDICTION}. Any disputes arising in connection with this Disclaimer shall be subject to the exclusive jurisdiction of the courts of Hong Kong.

## 15. Contact

If you have any questions about this Disclaimer, please contact us:

- **Company:** ${COMPANY}
- **Email:** ${EMAIL}
- **WhatsApp:** ${WHATSAPP}`,
  },
];

/** Get a single legal document by slug. */
export function getLegalDocument(slug: string): LegalDocument | undefined {
  return legalDocuments.find((d) => d.slug === slug);
}

/** Get all legal document slugs (for static generation). */
export function getAllLegalSlugs(): string[] {
  return legalDocuments.map((d) => d.slug);
}
