import type { Metadata } from "next";
import LegalPage from "../LegalPage";

export const metadata: Metadata = { title: "Privacy Policy — Independent Talent Search" };

export default function Privacy() {
  return (
    <LegalPage title="Privacy Policy">
      <p>Last updated: November 2026</p>
      <h2>What we collect</h2>
      <p>When you register, we collect your email address, the date of your submission, and whether you opted in to marketing emails.</p>
      <h2>How we use it</h2>
      <p>We use your email to send updates about the talent search you registered for. If you opted in, we may also send marketing emails about future opportunities. We do not sell your personal information.</p>
      <h2>Storage</h2>
      <p>Your information is stored securely with our database provider and retained until you ask us to delete it.</p>
      <h2>Your choices</h2>
      <p>You can unsubscribe from marketing emails at any time using the link in any email, or request access to or deletion of your data by contacting us.</p>
      <h2>Contact</h2>
      <p>Questions? Email us at [your contact email].</p>
    </LegalPage>
  );
}
