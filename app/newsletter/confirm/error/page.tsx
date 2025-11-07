// app/newsletter/confirm/error/page.tsx
export const metadata = {
  title: "Confirmation Error",
};

type PageProps = {
  searchParams?: Record<string, string | string[] | undefined>;
};

export default function ConfirmError({ searchParams }: PageProps) {
  const reason = typeof searchParams?.reason === "string" ? searchParams.reason : undefined;

  const msg =
    reason === "expired"
      ? "That confirmation link has expired. Please subscribe again."
      : reason === "missing"
      ? "Missing confirmation token."
      : "That confirmation link is invalid.";

  return (
    <div className="prose prose-invert mx-auto py-12">
      <h1>We could not confirm your email</h1>
      <p>{msg}</p>
    </div>
  );
}
