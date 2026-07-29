import React, { useEffect } from 'react';
import { ArrowLeft, FileText, ShieldCheck, Users } from 'lucide-react';
import './terms.css';

interface TermsProps {
  onBack: () => void;
}

export const TermsAndConditions: React.FC<TermsProps> = ({ onBack }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="terms-page-wrapper">
      <div className="container">
        
        {/* Back Button */}
        <button className="terms-btn-back" onClick={onBack}>
          <ArrowLeft size={16} /> Back to Home
        </button>

        {/* Page Header matching theme */}
        <div className="terms-header-centered">
          {/* <span className="section-tag">Legal Information</span> */}
          <h2 className="section-title">
            Terms <span className="text-highlight">&amp; Conditions</span>
          </h2>
          <div className="terms-divider" />
          <p className="section-desc">
            Please read these terms and conditions carefully before using our services or enrolling in any Caddverse Techlabs program.
          </p>
        </div>

        {/* Content Card */}
        <div className="terms-content-card">
          
          {/* Section 1: General */}
          <div className="terms-section">
            <div className="terms-section-title-wrap">
              <div className="terms-icon-box">
                <FileText size={20} className="terms-icon" />
              </div>
              <h3 className="terms-h3">General Terms</h3>
            </div>
            <ul className="terms-list">
              <li>Caddverse Techlabs ("the Site") is an online learning solution providing platform which includes sale of learning resources and online learning courses for individual users for different educational domains. The terms and conditions set forth hereinafter are applicable to all visitors or users of the Site. The site is branded under the name of Caddverse TechlabsLearning.com</li>
              <li>The Site is created, updated and maintained by Caddverse Techlabs Solutions LLP (CADDVERSE TECHLABS) and the name, design and the model are exclusive property of CADDVERSE TECHLABS. Any copy and / or reproduction in any form and/or unauthorized access to any data forming part of the Site will amount to infringement of copyright laws and international treaty provisions.</li>
              <li>Data provided on this Site is on "as is" basis and/or as collected from various sources.</li>
              <li>While utmost care is taken to provide correct and up to date information, CADDVERSE TECHLABS does not warrant the accuracy, completeness and timely availability of the information provided on the Site and accepts no responsibility or liability for any error or omission in any information provided on the Site.</li>
              <li>CADDVERSE TECHLABS may, at its sole discretion, change the Fee Structure/cost/price at any time without prior intimation. Add-ons to the Fees, such as but not limited to, taxes, duties or other levies are payable by recipients of subscription service as per the governing laws of India or foreign countries.</li>
              <li>CADDVERSE TECHLABS reserves the rights to modify, add, delete and/or change the contents and classification and presentation of the information / content at any time as it may in its absolute discretion find to be expedient, and without giving any notice. It is the user's responsibility to refer to the currently prevalent terms and/or any change or addition to the same while accessing the Site.</li>
              <li>The content in different programs has been prepared by a team of subject experts. While designing the questions, the team has referred to a number of books, question papers, study material and other resources available in the market. Every effort has been made to ensure that no infringement of any copyright happens. In case any discrepancy is reported corrective action would be taken immediately by CADDVERSE TECHLABS.</li>
              <li>It is clearly understood that the use of the Service by the User is only for purposes of self-learning and continuous improvement. A poor score in such self-learning is not meant to discourage the user. The test sessions are only for practice and self assessment. CADDVERSE TECHLABS accepts no liability on this account.</li>
              <li>Though utmost precautions are taken, CADDVERSE TECHLABS offers no warranty that the contents of the Site are free from viruses or any other infection, which has contaminating or destructive properties.</li>
              <li>All Users to the Site are bound by the general terms and conditions mentioned herein and by the subscription agreement set forth hereinafter and special terms contracted therein.</li>
              <li>The Site may accept advertising material sent by third parties for display. Advertisers are responsible for ensuring that the material submitted by them complies with national and international law. CADDVERSE TECHLABS at its absolute discretion reserves the right to change, suspend or omit any advertisement without any prior notice.</li>
            </ul>
          </div>

          <div className="terms-section-divider" />

          {/* Section 2: Disclaimer */}
          <div className="terms-section">
            <div className="terms-section-title-wrap">
              <div className="terms-icon-box">
                <ShieldCheck size={20} className="terms-icon" />
              </div>
              <h3 className="terms-h3">Acceptance of Disclaimer</h3>
            </div>
            <ul className="terms-list">
              <li>The use of Caddverse TechlabsLearning.com service by any User is subject to the Terms and Conditions mentioned hereunder.</li>
              <li>The subscription is for the valid period specified at the time of booking the order. Without having any contractual obligation to give prior intimation regarding expiry of the subscription, CADDVERSE TECHLABS will endeavor to intimate the User about the expiry of the subscription.</li>
              <li>Whenever a User enrolls by agreeing to subscribe to the Service choosing payment through Credit Card as the mode of payment, User shall authorize CADDVERSE TECHLABS to realize the full fee for the Service in advance.</li>
              <li>The Site will commence service only after due realization of payment.</li>
              <li>While every endeavor shall be made to start the Service to the User as early as possible upon realization of the full payment, CADDVERSE TECHLABS shall not be liable for any damages should a delay inevitably occurs.</li>
              <li>CADDVERSE TECHLABS reserves the right, to suspend or terminate the Services at any time in its sole discretion in case any difficulty is encountered in its realization of the full value of the Fees payable.</li>
              <li>The violation of any of the terms and conditions by the User shall be adequate grounds for cancellation of the Service, and no liability shall befall CADDVERSE TECHLABS to refund the fees already paid, either in full or in part.</li>
              <li>Once the payment has been realized no refund / cancellation will be made on any ground, including non-usage of the Service.</li>
              <li>The User needs to select his or hers own login ID and password. The user is entirely responsible for maintaining the confidentiality of the login ID and its password. The user shall ensure that he/she exits from the account at the end of each session by signing out. CADDVERSE TECHLABS takes no responsibility and shall stand totally indemnified by the user for any or all consequences caused by any unauthorized use of the user's account by any third-party.</li>
              <li>The User agrees to immediately notify CADDVERSE TECHLABS of any unauthorized use of the User's password or account or any other breach of security.</li>
              <li>The User agrees to provide CADDVERSE TECHLABS current, complete, and accurate registration information as prompted by The Site and to maintain and update this information at all times as required to keep it current, complete and accurate.</li>
              <li>All the contents of the Service are only for general information or use. They do not constitute advice and should not be relied upon in making (or refraining from making) any decision. Any specific advice or replies to queries in any part of the Service is/are the personal opinion of such experts/consultants/persons and are not subscribed to by CADDVERSE TECHLABS.</li>
              <li>The information from or through the Service is provided on "AS IS" basis. CADDVERSE TECHLABS and also their parent Organizations, affiliates and associates shall not be liable, at any time for damages arising from sudden change / addition in the syllabus, or from any action taken (or refrained from being taken) as a result of using the Service or any such contents or for any failure of performance, error, omission, interruption, deletion, defect, delay in operation or transmission, computer virus, communications line failure, theft or destruction or unauthorized access to, alteration of, or use of information contained on the Service. No representations, warranties or guarantees whatsoever are made as to the accuracy, adequacy, reliability, completeness, suitability or applicability of the information to a particular situation. The User agrees that CADDVERSE TECHLABS has no responsibility or liability arising from factors including but not limiting to the deletion, corruption, loss or failure to store any messages or content / data maintained or transmitted by the Service, and that no compensation is or shall be payable whatsoever with respect to the aforesaid by CADDVERSE TECHLABS. CADDVERSE TECHLABS MAKES NO WARRANTY THAT THE SERVICE WILL BE UNINTERRUPTED, TIMELY, SECURE OR ERROR-FREE. The hardware resources procured will be under limited warranty only.</li>
              <li>Certain links on the Service lead to resources located on servers maintained by third parties over whom the Site has no control or connection, business or otherwise. These services are external to the site and the user acknowledges that the User is outside the Site's web service and its channels. The Site neither endorses in any way nor offers any judgment or warranty and accepts no responsibility or liability for the authenticity, availability of any of the goods or services or for any damage, loss or harm, direct or consequential or any violation of local or international laws that may be incurred by the User's visiting or transacting on these services.</li>
              <li>Copyright of the content lies with Caddverse Techlabs Solutions LLP No commercial use of any content available on the Caddverse TechlabsLearning.com may be made without prior expressed written permission from Caddverse Techlabs Solutions LLP</li>
              <li>CADDVERSE TECHLABS holds all other intellectual property rights pertaining to the database available on the Site. All work on the Site is protected from infringement by local and international legislation and treaties. The courseware contained within the Site is licensed, and under no circumstance the User is granted permission to produce more than a single hard copy of each module, The User is not authorized to reprint/ duplicate the modules contained within.</li>
              <li>In addition to a normal Computer System and necessary hardware, Users are required to have an installed working copy of Microsoft Internet Explorer version 9.0 or above or any other compatible web browser. The web pages are not guaranteed to display in any other format.</li>
              <li>UNDER NO CIRCUMSTANCES WILL CADDVERSE TECHLABS BE LIABLE TO THE USER FOR ANY DAMAGES, SUCH AS, BUT NOT LIMITED TO, LOSS OF DATA, LOST TIME OR OPPORTUNITIES, PROFITS, OR FOR ANY MISHAPS DUE TO IMPROPER USAGE, DIRECT, INDIRECT, INCIDENTAL, CONSEQUENTIAL, SPECIAL OR EXEMPLARY DAMAGES, ARISING FROM THE SUBJECT MATTER OF THIS AGREEMENT, REGARDLESS OF THE TYPE OF CLAIM AND EVEN IF CADDVERSE TECHLABS HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.</li>
              <li>This Agreement shall be governed by the Laws of India. The Courts of law at Vadodara, Gujarat shall have exclusive jurisdiction over any disputes arising under this Agreement.</li>
              <li>These Terms of Service constitute the entire agreement between the parties with respect to the subject matter hereof and supersedes and replaces all prior or contemporaneous understandings or agreements, written or oral, regarding such subject matter.</li>
              <li>CADDVERSE TECHLABS reserves the right to add to or change/modify the terms of this Agreement. Such Changes / Modifications would be made by CADDVERSE TECHLABS after the first posting them at the Site. The User shall be deemed to have accepted them if the User continues to access the Site thereafter.</li>
              <li>The content (content being images, text, sound and video files, programs and scripts) of this website is copyright @ Caddverse Techlabs Solutions LLP All rights are expressly reserved. CADDVERSE TECHLABS reserves the right to use User's Information and details for its online and offline promotions.</li>
              <li>All logos and trademarks used in the website belong to their respective owners only.</li>
              <li>Usually the orders with successful payment are shipped on next working day through reputed courier services or by Indian Speed Post. The Indian Speed post is used for locations where ever the courier service is not available.</li>
              <li>All other products (learning resources) listed on our website carry 10days Warranty only. Any problems reported after 10days of delivery are not entertained in any case. Customers have to send back the faulty unit to our Baroda office at their own cost, for the replacement.</li>
              <li>As a part of our return policy, only defective/damaged products will be accepted for returns/refunds. Customer need to raise an alert with us within 2 working days from the date of delivery for being eligible for the return. Only those products will be eligible for return policies which are received by us within 10 days from the date of delivery. Caddverse Techlabs retains the rights to examine whether the product returned is defective or damaged and based on the verification Caddverse Techlabs will either reship/replace the product to the customer. In case product is defective or damaged, Caddverse Techlabs will replace and reship the product to the same shipping address of the customer subject to the availability of the stock of the product. In case the returned product is not defective or damaged then the customer will be informed about the same and the same product will be reship to the shipping address of the order. Customer will have to bear the shipment charges for the replaced/reshipped product.</li>
              <li>If the product stock is unavailable then a request for the refund will be initiated and the same shall be informed to the customer through registered email.</li>
              <li>After the confirmation of order, due to some reason (unexpected lack of inventory or any other reason) if Caddverse Techlabs is not able to ship the product, the order will be cancelled and the amount will be refunded. The buyer can request for the cancellation of order, only if the order is not yet shipped.</li>
              <li>All prices for Supplies provided by the Company are in INR and are exclusive of all central, state or local tax or other governmental charges.</li>
            </ul>
          </div>

          <div className="terms-section-divider" />

          {/* Section 3: User Postings */}
          <div className="terms-section">
            <div className="terms-section-title-wrap">
              <div className="terms-icon-box">
                <Users size={20} className="terms-icon" />
              </div>
              <h3 className="terms-h3">User Postings & Conduct</h3>
            </div>
            <ul className="terms-list">
              <li>You agree that you are responsible for your own use of the Site and for your User Postings. "User Postings" include all content submitted, posted, published or distributed on the Site by you or other users of the Site, including but not limited to all forum posts, wiki edits, notes, questions, comments, videos and file uploads. You agree that you will use the Site in compliance with the terms, and all applicable local, state, national and international laws, rules and regulations, including copyright laws, any laws regarding the transmission of technical data exported from your country of residence, and all Indian export control laws.</li>
              <li>As a condition of your use of the Caddverse Techlabs services, you will not use the Site in any manner intended to damage, disable, overburden or impair any Caddverse Techlabs server or the network(s) connected to any Caddverse Techlabs server or to interfere with any other party's use and enjoyment of the Site. You may not attempt to gain unauthorized access to the Site, other accounts, computer systems or networks connected to any Caddverse Techlabs server through hacking, password mining or any other means. You may not obtain or attempt to obtain any materials or information stored on the Site, its servers or associated computers through any means not intentionally made available through the Site.</li>
              <li>The prohibition for the site includes: Content that defames, harasses or threatens others, Content that discusses illegal activities with the intent to commit them, Content that infringes another's intellectual property, including, but not limited to, copyrights or trademarks, Profane, pornographic, obscene, indecent or unlawful content, Content related to partisan political activities, Viruses, Trojan horses, worms, time bombs, corrupted files, malware, spyware or any other similar software that may damage the operation of another's computer or property and Content that contains intentionally inaccurate information or that is posted with the intent of misleading others. Furthermore, you agree not to scrape, or otherwise download in bulk, any Site content, including but not limited to a list or directory of users on the system, on-line textbooks, User Postings or user information. You agree not to misrepresent or attempt to misrepresent your identity while using the Site (although you are welcome and encouraged to use an anonymous username in the forums and to act in a manner that keeps your identity concealed).</li>
              <li>Unless otherwise expressly stated on the Site, the texts, exams, video, images and other instructional materials provided with the courses offered on this Site are for your personal use in connection with those courses only. We aim to make much of the Caddverse Techlabs course content available that will help create a vibrant ecosystem of contributors and further Caddverse Techlabs's goal of making education accessible and affordable to the world.</li>
              <li>Certain reference documents, digital textbooks, articles and other information on the Site are used with the permission of third parties, and use of that information is subject to certain rules and conditions, which will be posted along with the information. By using this Site you agree to abide by all such rules and conditions. You agree to retain all copyright and other notices on any content you obtain from the Site. All rights in the Site and its content, if not expressly granted, are reserved.</li>
              <li>By submitting or distributing your User Postings, you affirm, represent and warrant that you have the necessary rights, licenses, consents and/or permissions to reproduce and publish the User Postings and to authorize Caddverse Techlabs and its users to reproduce, modify, publish and otherwise use and distribute your User Postings. You, and not Caddverse Techlabs, are solely responsible for your User Postings and the consequences of posting or publishing them.</li>
              <li>By submitting or distributing your User Postings, you hereby grant to Caddverse Techlabs a worldwide, non-exclusive, transferable, assignable, sub licensable, fully paid-up, royalty-free, perpetual, irrevocable right and license to host, transfer, display, perform, reproduce, modify, distribute, re-distribute, relicense and otherwise use, make available and exploit your User Postings, in whole or in part, in any form and in any media formats and through any media channels (now known or hereafter developed).</li>
              <li>By submitting or distributing your User Postings, you hereby grant to each user of the Site a non-exclusive license to access and use your User Postings in connection with their use of the Site for their own personal purposes</li>
              <li>Caddverse Techlabs may offer a certificate of achievement or other acknowledgment (a "Certificate") for students who, in their judgment, have satisfactorily demonstrated mastery of the course material. Certificates will be issued by Caddverse Techlabs. The decision whether a Certificate will be awarded to a given student will be solely within the discretion of Caddverse Techlabs. Caddverse Techlabs may choose not to offer a Certificate for some courses.</li>
              <li>By enrolling in an Caddverse Techlabs course, you agree that you will complete all tests and assignments on your own, unless collaboration on an assignment is explicitly permitted, maintain only one user account and not let anyone else use your username and/or password, will not engage in any activity that would dishonestly improve your results, or improve or hurt the results of others. You will not post answers to problems that are being used to assess student performance.</li>
              <li>If you are found in violation of any of the Terms, you may be subject to one or more of the mentioned actions like receiving a zero or no credit for an assignment, having any certificate earned in the course withheld or revoked, being un enrolled from a course, or termination of your use of the site. Additional actions may be taken at the sole discretion of Caddverse Techlabs and Caddverse Techlabs authors providing courses.</li>
            </ul>
          </div>
        </div>
        
      </div>
    </div>
  );
};
