// app/newsletter/confirm/success/page.tsx
export const metadata = {
  title: "Subscription Confirmed",
};

export default function ConfirmSuccess() {
  return (
    <div className="prose prose-invert mx-auto py-12">
      <h1>You are confirmed</h1>
      <p>Thanks for subscribing to 3EF Studio! You will hear from us soon.</p>
    </div>
  );
}
