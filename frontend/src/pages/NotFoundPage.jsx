import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <section className="page-container page-section not-found">
      <span className="eyebrow">Looks like this page wandered off</span>
      <h1>Let's get you<br /><em>back to the table.</em></h1>
      <Link className="button button-primary" to="/">Return home</Link>
    </section>
  );
}
