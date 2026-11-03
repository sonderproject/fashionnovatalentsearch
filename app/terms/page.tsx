import type { Metadata } from "next";
import LegalPage from "../LegalPage";

export const metadata: Metadata = { title: "Terms — Independent Talent Search" };

export default function Terms() {
  return (
    <LegalPage title="Terms">
      <p>Last updated: November 2026</p>
      <h2>About this site</h2>
      <p>Independent Talent Search is an independent project. It is not affiliated with, endorsed by, or sponsored by Fashion Nova or any other brand.</p>
      <h2>Registration</h2>
      <p>Registering is free and only signs you up to receive updates. It does not guarantee selection, representation, payment, or any opportunity.</p>
      <h2>Eligibility</h2>
      <p>You must be at least 18 years old, or have permission from a parent or guardian, to register.</p>
      <h2>Changes</h2>
      <p>We may update these terms at any time. Continued use of the site means you accept the current terms.</p>
      <h2>Contact</h2>
      <p>Questions? Email us at [your contact email].</p>
    </LegalPage>
  );
}
