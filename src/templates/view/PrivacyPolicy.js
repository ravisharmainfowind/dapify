import React from 'react'
import {useHistory} from "react-router-dom";
import left_arrow_img from '../../assets/images/Arrow-Left.svg';

function PrivacyPolicy(props,{ history }) {

  const history_back = useHistory();
  const handleBack = (event) => {

    if (props.location?.prevPath) {
      const path = props.location.prevPath.substring(0, props.location.prevPath.lastIndexOf("/") + 1);

      if (path === '/userProfile/') {
        window.location = window.location.origin + props.location.prevPath;
      }
      else {
        history_back.goBack();
      }
    } else {
      history_back.goBack();
    }
  };

  return (

    <div className="privacyPolicy-content">
      <div className="back-arrow">
        <span className="btn" onClick={handleBack}><img src={left_arrow_img} alt='' />Back</span>
      </div>
      <div className="container">
        <div className="translations-content-item">
          <h1>Privacy Policy</h1>
          <p>Last updated: January 28, 2021</p>
          <p>This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.</p>
          <p>We use Your Personal data to provide and improve the Service. By using the Service, You agree to the collection and use of information in accordance with this Privacy Policy.</p>
          <h1>Interpretation and Definitions</h1>
          <h2>Interpretation</h2>
          <p>The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.</p>
          <h2>Definitions</h2>
          <p>For the purposes of this Privacy Policy:</p>
          <ul>
            <li>
              <p><strong>Account</strong> means a unique account created for You to access our Service or parts of our Service.</p>
            </li>
            <li>
              <p><strong>Affiliate</strong> means an entity that controls, is controlled by or is under common control with a party, where "control" means ownership of 50% or more of the shares, equity interest or other securities entitled to vote for election of directors or other managing authority.</p>
            </li>
            <li>
              <p><strong>Application</strong> means the software program provided by the Company downloaded by You on any electronic device, named Dapify</p>
            </li>
            <li>
              <p><strong>Business</strong>, for the purpose of the CCPA (California Consumer Privacy Act), refers to the Company as the legal entity that collects Consumers' personal information and determines the purposes and means of the processing of Consumers' personal information, or on behalf of which such information is collected and that alone, or jointly with others, determines the purposes and means of the processing of consumers' personal information, that does business in the State of California.</p>
            </li>
            <li>
              <p><strong>Company</strong> (referred to as either "the Company", "We", "Us" or "Our" in this Agreement) refers to Osiris Complex, LLC, P.o. box 43134 Montclair, NJ 07043.</p>
            </li>
            <li>
              <p><strong>Consumer</strong>, for the purpose of the CCPA (California Consumer Privacy Act), means a natural person who is a California resident. A resident, as defined in the law, includes (1) every individual who is in the USA for other than a temporary or transitory purpose, and (2) every individual who is domiciled in the USA who is outside the USA for a temporary or transitory purpose.</p>
            </li>
            <li>
              <p><strong>Country</strong> refers to: New Jersey, United States</p>
            </li>
            <li>
              <p><strong>Device</strong> means any device that can access the Service such as a computer, a cellphone or a digital tablet.</p>
            </li>
            <li>
              <p><strong>Personal Data</strong> is any information that relates to an identified or identifiable individual.</p>
              <p>For the purposes of the CCPA, Personal Data means any information that identifies, relates to, describes or is capable of being associated with, or could reasonably be linked, directly or indirectly, with You.</p>
            </li>
            <li>
              <p><strong>Sale</strong>, for the purpose of the CCPA (California Consumer Privacy Act), means selling, renting, releasing, disclosing, disseminating, making available, transferring, or otherwise communicating orally, in writing, or by electronic or other means, a Consumer's personal information to another business or a third party for monetary or other valuable consideration.</p>
            </li>
            <li>
              <p><strong>Service</strong> refers to the Application.</p>
            </li>
            <li>
              <p><strong>Service Provider</strong> means any natural or legal person who processes the data on behalf of the Company. It refers to third-party companies or individuals employed by the Company to facilitate the Service, to provide the Service on behalf of the Company, to perform services related to the Service or to assist the Company in analyzing how the Service is used.</p>
            </li>
            <li>
              <p><strong>Third-party Social Media Service</strong> refers to any website or any social network website through which a User can log in or create an account to use the Service.</p>
            </li>
            <li>
              <p><strong>Usage Data</strong> refers to data collected automatically, either generated by the use of the Service or from the Service infrastructure itself (for example, the duration of a page visit).</p>
            </li>
            <li>
              <p><strong>You</strong> means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.</p>
            </li>
          </ul>
          <h1>Collecting and Using Your Personal Data</h1>
          <h2>Types of Data Collected</h2>
          <h3>Personal Data</h3>
          <p>While using Our Service, We may ask You to provide Us with certain personally identifiable information that can be used to contact or identify You. Personally identifiable information may include, but is not limited to:</p>
          <ul>
            <li>
              <p>Email address</p>
            </li>
            <li>
              <p>First name and last name</p>
            </li>
            <li>
              <p>Usage Data</p>
            </li>
          </ul>
          <h3>Usage Data</h3>
          <p>Usage Data is collected automatically when using the Service.</p>
          <p>Usage Data may include information such as Your Device's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that You visit, the time and date of Your visit, the time spent on those pages, unique device identifiers and other diagnostic data.</p>
          <p>When You access the Service by or through a mobile device, We may collect certain information automatically, including, but not limited to, the type of mobile device You use, Your mobile device unique ID, the IP address of Your mobile device, Your mobile operating system, the type of mobile Internet browser You use, unique device identifiers and other diagnostic data.</p>
          <p>We may also collect information that Your browser sends whenever You visit our Service or when You access the Service by or through a mobile device.</p>
          <h3>Information Collected while Using the Application</h3>
          <p>While using Our Application, in order to provide features of Our Application, We may collect, with Your prior permission:</p>
          <ul>
            <li>Pictures and other information from your Device's camera and photo library</li>
          </ul>
          <p>We use this information to provide features of Our Service, to improve and customize Our Service. The information may be uploaded to the Company's servers and/or a Service Provider's server or it may be simply stored on Your device.</p>
          <p>You can enable or disable access to this information at any time, through Your Device settings.</p>
          <h2>Use of Your Personal Data</h2>
          <p>The Company may use Personal Data for the following purposes:</p>
          <ul>
            <li>
              <p><strong>To provide and maintain our Service</strong>, including to monitor the usage of our Service.</p>
            </li>
            <li>
              <p><strong>To manage Your Account:</strong> to manage Your registration as a user of the Service. The Personal Data You provide can give You access to different functionalities of the Service that are available to You as a registered user.</p>
            </li>
            <li>
              <p><strong>For the performance of a contract:</strong> the development, compliance and undertaking of the purchase contract for the products, items or services You have purchased or of any other contract with Us through the Service.</p>
            </li>
            <li>
              <p><strong>To contact You:</strong> To contact You by email, telephone calls, SMS, or other equivalent forms of electronic communication, such as a mobile application's push notifications regarding updates or informative communications related to the functionalities, products or contracted services, including the security updates, when necessary or reasonable for their implementation.</p>
            </li>
            <li>
              <p><strong>To provide You</strong> with news, special offers and general information about other goods, services and events which we offer that are similar to those that you have already purchased or enquired about unless You have opted not to receive such information.</p>
            </li>
            <li>
              <p><strong>To manage Your requests:</strong> To attend and manage Your requests to Us.</p>
            </li>
            <li>
              <p><strong>For business transfers:</strong> We may use Your information to evaluate or conduct a merger, divestiture, restructuring, reorganization, dissolution, or other sale or transfer of some or all of Our assets, whether as a going concern or as part of bankruptcy, liquidation, or similar proceeding, in which Personal Data held by Us about our Service users is among the assets transferred.</p>
            </li>
            <li>
              <p><strong>For other purposes</strong>: We may use Your information for other purposes, such as data analysis, identifying usage trends, determining the effectiveness of our promotional campaigns and to evaluate and improve our Service, products, services, marketing and your experience.</p>
            </li>
          </ul>
          <p>We may share Your personal information in the following situations:</p>
          <ul>
            <li><strong>With Service Providers:</strong> We may share Your personal information with Service Providers to monitor and analyze the use of our Service, to show advertisements to You to help support and maintain Our Service, for payment processing, to contact You.</li>
            <li><strong>For business transfers:</strong> We may share or transfer Your personal information in connection with, or during negotiations of, any merger, sale of Company assets, financing, or acquisition of all or a portion of Our business to another company.</li>
            <li><strong>With Affiliates:</strong> We may share Your information with Our affiliates, in which case we will require those affiliates to honor this Privacy Policy. Affiliates include Our parent company and any other subsidiaries, joint venture partners or other companies that We control or that are under common control with Us.</li>
            <li><strong>With business partners:</strong> We may share Your information with Our business partners to offer You certain products, services or promotions.</li>
            <li><strong>With other users:</strong> when You share personal information or otherwise interact in the public areas with other users, such information may be viewed by all users and may be publicly distributed outside. If You interact with other users or register through a Third-Party Social Media Service, Your contacts on the Third-Party Social Media Service may see Your name, profile, pictures and description of Your activity. Similarly, other users will be able to view descriptions of Your activity, communicate with You and view Your profile.</li>
            <li><strong>With Your consent</strong>: We may disclose Your personal information for any other purpose with Your consent.</li>
          </ul>
          <h2>Retention of Your Personal Data</h2>
          <p>The Company will retain Your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use Your Personal Data to the extent necessary to comply with our legal obligations (for example, if we are required to retain your data to comply with applicable laws), resolve disputes, and enforce our legal agreements and policies.</p>
          <p>The Company will also retain Usage Data for internal analysis purposes. Usage Data is generally retained for a shorter period of time, except when this data is used to strengthen the security or to improve the functionality of Our Service, or We are legally obligated to retain this data for longer time periods.</p>
          <h2>Transfer of Your Personal Data</h2>
          <p>Your information, including Personal Data, is processed at the Company's operating offices and in any other places where the parties involved in the processing are located. It means that this information may be transferred to — and maintained on — computers located outside of Your state, province, country or other governmental jurisdiction where the data protection laws may differ than those from Your jurisdiction.</p>
          <p>Your consent to this Privacy Policy followed by Your submission of such information represents Your agreement to that transfer.</p>
          <p>The Company will take all steps reasonably necessary to ensure that Your data is treated securely and in accordance with this Privacy Policy and no transfer of Your Personal Data will take place to an organization or a country unless there are adequate controls in place including the security of Your data and other personal information.</p>
          <h2>Disclosure of Your Personal Data</h2>
          <h3>Business Transactions</h3>
          <p>If the Company is involved in a merger, acquisition or asset sale, Your Personal Data may be transferred. We will provide notice before Your Personal Data is transferred and becomes subject to a different Privacy Policy.</p>
          <h3>Law enforcement</h3>
          <p>Under certain circumstances, the Company may be required to disclose Your Personal Data if required to do so by law or in response to valid requests by public authorities (e.g. a court or a government agency).</p>
          <h3>Other legal requirements</h3>
          <p>The Company may disclose Your Personal Data in the good faith belief that such action is necessary to:</p>
          <ul>
            <li>Comply with a legal obligation</li>
            <li>Protect and defend the rights or property of the Company</li>
            <li>Prevent or investigate possible wrongdoing in connection with the Service</li>
            <li>Protect the personal safety of Users of the Service or the public</li>
            <li>Protect against legal liability</li>
          </ul>
          <h2>Security of Your Personal Data</h2>
          <p>The security of Your Personal Data is important to Us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While We strive to use commercially acceptable means to protect Your Personal Data, We cannot guarantee its absolute security.</p>
          <h1>Detailed Information on the Processing of Your Personal Data</h1>
          <p>The Service Providers We use may have access to Your Personal Data. These third-party vendors collect, store, use, process and transfer information about Your activity on Our Service in accordance with their Privacy Policies.</p>
          <h2>Advertising</h2>
          <p>We may use Service Providers to show advertisements to You to help support and maintain Our Service.</p>
          <ul>
            <li>
              <p><strong>Google AdSense &amp; DoubleClick Cookie</strong></p>
              <p>Google, as a third party vendor, uses cookies to serve ads on our Service. Google's use of the DoubleClick cookie enables it and its partners to serve ads to our users based on their visit to our Service or other websites on the Internet.</p>
              <p>You may opt out of the use of the DoubleClick Cookie for interest-based advertising by visiting the Google Ads Settings web page: <a href="http://www.google.com/ads/preferences/" rel="external nofollow noopener" target="_blank">http://www.google.com/ads/preferences/</a></p>
            </li>
          </ul>
          <h2>Email Marketing</h2>
          <p>We may use Your Personal Data to contact You with newsletters, marketing or promotional materials and other information that may be of interest to You. You may opt-out of receiving any, or all, of these communications from Us by following the unsubscribe link or instructions provided in any email We send or by contacting Us.</p>
          <p>We may use Email Marketing Service Providers to manage and send emails to You.</p>
          <ul>
            <li>
              <p><strong>Mailchimp</strong></p>
              <p>Mailchimp is an email marketing sending service provided by The Rocket Science Group LLC.</p>
              <p>For more information on the privacy practices of Mailchimp, please visit their Privacy policy: <a href="https://mailchimp.com/legal/privacy/" rel="external nofollow noopener" target="_blank">https://mailchimp.com/legal/privacy/</a></p>
            </li>
          </ul>
          <h2>Payments</h2>
          <p>We may provide paid products and/or services within the Service. In that case, we may use third-party services for payment processing (e.g. payment processors).</p>
          <p>We will not store or collect Your payment card details. That information is provided directly to Our third-party payment processors whose use of Your personal information is governed by their Privacy Policy. These payment processors adhere to the standards set by PCI-DSS as managed by the PCI Security Standards Council, which is a joint effort of brands like Visa, Mastercard, American Express and Discover. PCI-DSS requirements help ensure the secure handling of payment information.</p>
          <ul>
            <li>
              <p><strong>Apple Store In-App Payments</strong></p>
              <p>Their Privacy Policy can be viewed at <a href="https://www.apple.com/legal/privacy/en-ww/" rel="external nofollow noopener" target="_blank">https://www.apple.com/legal/privacy/en-ww/</a></p>
            </li>
            <li>
              <p><strong>Stripe</strong></p>
              <p>Their Privacy Policy can be viewed at <a href="https://stripe.com/us/privacy" rel="external nofollow noopener" target="_blank">https://stripe.com/us/privacy</a></p>
            </li>
          </ul>
          <h1>CCPA Privacy</h1>
          <p>This privacy notice section for California residents supplements the information contained in Our Privacy Policy and it applies solely to all visitors, users, and others who reside in the State of California.</p>
          <h2>Categories of Personal Information Collected</h2>
          <p>We collect information that identifies, relates to, describes, references, is capable of being associated with, or could reasonably be linked, directly or indirectly, with a particular Consumer or Device. The following is a list of categories of personal information which we may collect or may have been collected from California residents within the last twelve (12) months.</p>
          <p>Please note that the categories and examples provided in the list below are those defined in the CCPA. This does not mean that all examples of that category of personal information were in fact collected by Us, but reflects our good faith belief to the best of our knowledge that some of that information from the applicable category may be and may have been collected. For example, certain categories of personal information would only be collected if You provided such personal information directly to Us.</p>
          <ul>
            <li>
              <p><strong>Category A: Identifiers.</strong></p>
              <p>Examples: A real name, alias, postal address, unique personal identifier, online identifier, Internet Protocol address, email address, account name, driver's license number, passport number, or other similar identifiers.</p>
              <p>Collected: Yes.</p>
            </li>
            <li>
              <p><strong>Category B: Personal information categories listed in the California Customer Records statute (Cal. Civ. Code § 1798.80(e)).</strong></p>
              <p>Examples: A name, signature, Social Security number, physical characteristics or description, address, telephone number, passport number, driver's license or state identification card number, insurance policy number, education, employment, employment history, bank account number, credit card number, debit card number, or any other financial information, medical information, or health insurance information. Some personal information included in this category may overlap with other categories.</p>
              <p>Collected: Yes.</p>
            </li>
            <li>
              <p><strong>Category C: Protected classification characteristics under California or federal law.</strong></p>
              <p>Examples: Age (40 years or older), race, color, ancestry, national origin, citizenship, religion or creed, marital status, medical condition, physical or mental disability, sex (including gender, gender identity, gender expression, pregnancy or childbirth and related medical conditions), sexual orientation, veteran or military status, genetic information (including familial genetic information).</p>
              <p>Collected: No.</p>
            </li>
            <li>
              <p><strong>Category D: Commercial information.</strong></p>
              <p>Examples: Records and history of products or services purchased or considered.</p>
              <p>Collected: Yes.</p>
            </li>
            <li>
              <p><strong>Category E: Biometric information.</strong></p>
              <p>Examples: Genetic, physiological, behavioral, and biological characteristics, or activity patterns used to extract a template or other identifier or identifying information, such as, fingerprints, faceprints, and voiceprints, iris or retina scans, keystroke, gait, or other physical patterns, and sleep, health, or exercise data.</p>
              <p>Collected: No.</p>
            </li>
            <li>
              <p><strong>Category F: Internet or other similar network activity.</strong></p>
              <p>Examples: Interaction with our Service or advertisement.</p>
              <p>Collected: Yes.</p>
            </li>
            <li>
              <p><strong>Category G: Geolocation data.</strong></p>
              <p>Examples: Approximate physical location.</p>
              <p>Collected: No.</p>
            </li>
            <li>
              <p><strong>Category H: Sensory data.</strong></p>
              <p>Examples: Audio, electronic, visual, thermal, olfactory, or similar information.</p>
              <p>Collected: No.</p>
            </li>
            <li>
              <p><strong>Category I: Professional or employment-related information.</strong></p>
              <p>Examples: Current or past job history or performance evaluations.</p>
              <p>Collected: No.</p>
            </li>
            <li>
              <p><strong>Category J: Non-public education information (per the Family Educational Rights and Privacy Act (20 U.S.C. Section 1232g, 34 C.F.R. Part 99)).</strong></p>
              <p>Examples: Education records directly related to a student maintained by an educational institution or party acting on its behalf, such as grades, transcripts, class lists, student schedules, student identification codes, student financial information, or student disciplinary records.</p>
              <p>Collected: No.</p>
            </li>
            <li>
              <p><strong>Category K: Inferences drawn from other personal information.</strong></p>
              <p>Examples: Profile reflecting a person's preferences, characteristics, psychological trends, predispositions, behavior, attitudes, intelligence, abilities, and aptitudes.</p>
              <p>Collected: No.</p>
            </li>
          </ul>
          <p>Under CCPA, personal information does not include:</p>
          <ul>
            <li>Publicly available information from government records</li>
            <li>Deidentified or aggregated consumer information</li>
            <li>Information excluded from the CCPA's scope, such as:
              <ul>
                <li>Health or medical information covered by the Health Insurance Portability and Accountability Act of 1996 (HIPAA) and the California Confidentiality of Medical Information Act (CMIA) or clinical trial data</li>
                <li>Personal Information covered by certain sector-specific privacy laws, including the Fair Credit Reporting Act (FRCA), the Gramm-Leach-Bliley Act (GLBA) or California Financial Information Privacy Act (FIPA), and the Driver's Privacy Protection Act of 1994</li>
              </ul>
            </li>
          </ul>
          <h2>Sources of Personal Information</h2>
          <p>We obtain the categories of personal information listed above from the following categories of sources:</p>
          <ul>
            <li><strong>Directly from You</strong>. For example, from the forms You complete on our Service, preferences You express or provide through our Service, or from Your purchases on our Service.</li>
            <li><strong>Indirectly from You</strong>. For example, from observing Your activity on our Service.</li>
            <li><strong>Automatically from You</strong>. For example, through cookies We or our Service Providers set on Your Device as You navigate through our Service.</li>
            <li><strong>From Service Providers</strong>. For example, third-party vendors to provide advertising on our Service, third-party vendors for payment processing, or other third-party vendors that We use to provide the Service to You.</li>
          </ul>
          <h2>Use of Personal Information for Business Purposes or Commercial Purposes</h2>
          <p>We may use or disclose personal information We collect for "business purposes" or "commercial purposes" (as defined under the CCPA), which may include the following examples:</p>
          <ul>
            <li>To operate our Service and provide You with our Service.</li>
            <li>To provide You with support and to respond to Your inquiries, including to investigate and address Your concerns and monitor and improve our Service.</li>
            <li>To fulfill or meet the reason You provided the information. For example, if You share Your contact information to ask a question about our Service, We will use that personal information to respond to Your inquiry. If You provide Your personal information to purchase a product or service, We will use that information to process Your payment and facilitate delivery.</li>
            <li>To respond to law enforcement requests and as required by applicable law, court order, or governmental regulations.</li>
            <li>As described to You when collecting Your personal information or as otherwise set forth in the CCPA.</li>
            <li>For internal administrative and auditing purposes.</li>
            <li>To detect security incidents and protect against malicious, deceptive, fraudulent or illegal activity, including, when necessary, to prosecute those responsible for such activities.</li>
          </ul>
          <p>Please note that the examples provided above are illustrative and not intended to be exhaustive. For more details on how we use this information, please refer to the "Use of Your Personal Data" section.</p>
          <p>If We decide to collect additional categories of personal information or use the personal information We collected for materially different, unrelated, or incompatible purposes We will update this Privacy Policy.</p>
          <h2>Disclosure of Personal Information for Business Purposes or Commercial Purposes</h2>
          <p>We may use or disclose and may have used or disclosed in the last twelve (12) months the following categories of personal information for business or commercial purposes:</p>
          <ul>
            <li>Category A: Identifiers</li>
            <li>Category B: Personal information categories listed in the California Customer Records statute (Cal. Civ. Code § 1798.80(e))</li>
            <li>Category D: Commercial information</li>
            <li>Category F: Internet or other similar network activity</li>
          </ul>
          <p>Please note that the categories listed above are those defined in the CCPA. This does not mean that all examples of that category of personal information were in fact disclosed, but reflects our good faith belief to the best of our knowledge that some of that information from the applicable category may be and may have been disclosed.</p>
          <p>When We disclose personal information for a business purpose or a commercial purpose, We enter a contract that describes the purpose and requires the recipient to both keep that personal information confidential and not use it for any purpose except performing the contract.</p>
          <h2>Sale of Personal Information</h2>
          <p>As defined in the CCPA, "sell" and "sale" mean selling, renting, releasing, disclosing, disseminating, making available, transferring, or otherwise communicating orally, in writing, or by electronic or other means, a consumer's personal information by the business to a third party for valuable consideration. This means that We may have received some kind of benefit in return for sharing personal Iinformation, but not necessarily a monetary benefit.</p>
          <p>Please note that the categories listed below are those defined in the CCPA. This does not mean that all examples of that category of personal information were in fact sold, but reflects our good faith belief to the best of our knowledge that some of that information from the applicable category may be and may have been shared for value in return.</p>
          <p>We may sell and may have sold in the last twelve (12) months the following categories of personal information:</p>
          <ul>
            <li>Category A: Identifiers</li>
            <li>Category B: Personal information categories listed in the California Customer Records statute (Cal. Civ. Code § 1798.80(e))</li>
            <li>Category D: Commercial information</li>
            <li>Category F: Internet or other similar network activity</li>
          </ul>
          <h2>Share of Personal Information</h2>
          <p>We may share Your personal information identified in the above categories with the following categories of third parties:</p>
          <ul>
            <li>Service Providers</li>
            <li>Payment processors</li>
            <li>Our affiliates</li>
            <li>Our business partners</li>
            <li>Third party vendors to whom You or Your agents authorize Us to disclose Your personal information in connection with products or services We provide to You</li>
          </ul>
          <h2>Sale of Personal Information of Minors Under 16 Years of Age</h2>
          <p>We do not sell the personal information of Consumers We actually know are less than 16 years of age, unless We receive affirmative authorization (the "right to opt-in") from either the Consumer who is between 13 and 16 years of age, or the parent or guardian of a Consumer less than 13 years of age. Consumers who opt-in to the sale of personal information may opt-out of future sales at any time. To exercise the right to opt-out, You (or Your authorized representative) may submit a request to Us by contacting Us.</p>
          <p>If You have reason to believe that a child under the age of 13 (or 16) has provided Us with personal information, please contact Us with sufficient detail to enable Us to delete that information.</p>
          <h2>Your Rights under the CCPA</h2>
          <p>The CCPA provides California residents with specific rights regarding their personal information. If You are a resident of California, You have the following rights:</p>
          <ul>
            <li><strong>The right to notice.</strong> You have the right to be notified which categories of Personal Data are being collected and the purposes for which the Personal Data is being used.</li>
            <li><strong>The right to request.</strong> Under CCPA, You have the right to request that We disclose information to You about Our collection, use, sale, disclosure for business purposes and share of personal information. Once We receive and confirm Your request, We will disclose to You:
              <ul>
                <li>The categories of personal information We collected about You</li>
                <li>The categories of sources for the personal information We collected about You</li>
                <li>Our business or commercial purpose for collecting or selling that personal information</li>
                <li>The categories of third parties with whom We share that personal information</li>
                <li>The specific pieces of personal information We collected about You</li>
                <li>If we sold Your personal information or disclosed Your personal information for a business purpose, We will disclose to You:
                  <ul>
                    <li>The categories of personal information categories sold</li>
                    <li>The categories of personal information categories disclosed</li>
                  </ul>
                </li>
              </ul>
            </li>
            <li><strong>The right to say no to the sale of Personal Data (opt-out).</strong> You have the right to direct Us to not sell Your personal information. To submit an opt-out request please contact Us.</li>
            <li><strong>The right to delete Personal Data.</strong> You have the right to request the deletion of Your Personal Data, subject to certain exceptions. Once We receive and confirm Your request, We will delete (and direct Our Service Providers to delete) Your personal information from our records, unless an exception applies. We may deny Your deletion request if retaining the information is necessary for Us or Our Service Providers to:
              <ul>
                <li>Complete the transaction for which We collected the personal information, provide a good or service that You requested, take actions reasonably anticipated within the context of our ongoing business relationship with You, or otherwise perform our contract with You.</li>
                <li>Detect security incidents, protect against malicious, deceptive, fraudulent, or illegal activity, or prosecute those responsible for such activities.</li>
                <li>Debug products to identify and repair errors that impair existing intended functionality.</li>
                <li>Exercise free speech, ensure the right of another consumer to exercise their free speech rights, or exercise another right provided for by law.</li>
                <li>Comply with the California Electronic Communications Privacy Act (Cal. Penal Code § 1546 et. seq.).</li>
                <li>Engage in public or peer-reviewed scientific, historical, or statistical research in the public interest that adheres to all other applicable ethics and privacy laws, when the information's deletion may likely render impossible or seriously impair the research's achievement, if You previously provided informed consent.</li>
                <li>Enable solely internal uses that are reasonably aligned with consumer expectations based on Your relationship with Us.</li>
                <li>Comply with a legal obligation.</li>
                <li>Make other internal and lawful uses of that information that are compatible with the context in which You provided it.</li>
              </ul>
            </li>
            <li><strong>The right not to be discriminated against.</strong> You have the right not to be discriminated against for exercising any of Your consumer's rights, including by:
              <ul>
                <li>Denying goods or services to You</li>
                <li>Charging different prices or rates for goods or services, including the use of discounts or other benefits or imposing penalties</li>
                <li>Providing a different level or quality of goods or services to You</li>
                <li>Suggesting that You will receive a different price or rate for goods or services or a different level or quality of goods or services</li>
              </ul>
            </li>
          </ul>
          <h2>Exercising Your CCPA Data Protection Rights</h2>
          <p>In order to exercise any of Your rights under the CCPA, and if You are a California resident, You can contact Us:</p>
          <ul>
            <li>By email: Support@dapify.co</li>
          </ul>
          <p>Only You, or a person registered with the California Secretary of State that You authorize to act on Your behalf, may make a verifiable request related to Your personal information.</p>
          <p>Your request to Us must:</p>
          <ul>
            <li>Provide sufficient information that allows Us to reasonably verify You are the person about whom We collected personal information or an authorized representative</li>
            <li>Describe Your request with sufficient detail that allows Us to properly understand, evaluate, and respond to it</li>
          </ul>
          <p>We cannot respond to Your request or provide You with the required information if We cannot:</p>
          <ul>
            <li>Verify Your identity or authority to make the request</li>
            <li>And confirm that the personal information relates to You</li>
          </ul>
          <p>We will disclose and deliver the required information free of charge within 45 days of receiving Your verifiable request. The time period to provide the required information may be extended once by an additional 45 days when reasonable necessary and with prior notice.</p>
          <p>Any disclosures We provide will only cover the 12-month period preceding the verifiable request's receipt.</p>
          <p>For data portability requests, We will select a format to provide Your personal information that is readily useable and should allow You to transmit the information from one entity to another entity without hindrance.</p>
          <h2>Do Not Sell My Personal Information</h2>
          <p>You have the right to opt-out of the sale of Your personal information. Once We receive and confirm a verifiable consumer request from You, we will stop selling Your personal information. To exercise Your right to opt-out, please contact Us.</p>
          <h1>Links to Other Websites</h1>
          <p>Our Service may contain links to other websites that are not operated by Us. If You click on a third party link, You will be directed to that third party's site. We strongly advise You to review the Privacy Policy of every site You visit.</p>
          <p>We have no control over and assume no responsibility for the content, privacy policies or practices of any third party sites or services.</p>
          <h1>Changes to this Privacy Policy</h1>
          <p>We may update Our Privacy Policy from time to time. We will notify You of any changes by posting the new Privacy Policy on this page.</p>
          <p>We will let You know via email and/or a prominent notice on Our Service, prior to the change becoming effective and update the "Last updated" date at the top of this Privacy Policy.</p>
          <p>You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.</p>
          <h1>Contact Us</h1>
          <p>If you have any questions about this Privacy Policy, You can contact us:</p>
          <ul>
            <li>By email: Support@dapify.co</li>
          </ul>
        </div>
      </div>
    </div>

  );
};

export default PrivacyPolicy;