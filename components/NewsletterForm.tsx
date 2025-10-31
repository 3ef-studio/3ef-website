"use client";
export default function NewsletterForm() {
  // TODO: replace `threeeaglesforge` with your Buttondown username later
  const action = "https://buttondown.email/api/emails/embed-subscribe/3ef-studio";
  return (
    <form
      action={action}
      method="post"
      target="popupwindow"
      onSubmit={() => window.open("https://buttondown.email/3ef-studio","popupwindow")}
      className="flex flex-col sm:flex-row gap-3"
    >
      <label htmlFor="email" className="sr-only">Email</label>
      <input
        id="email"
        name="email"
        type="email"
        required
        placeholder="you@domain.com"
        className="w-full rounded-xl bg-card border border-border px-3 py-2 text-sm"
      />
      <button type="submit" className="inline-flex items-center rounded-xl bg-primary px-4 py-2 text-primary-foreground">
        Subscribe
      </button>
    </form>
  );
}
