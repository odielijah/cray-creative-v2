import StatusPage from "@/app/(marketing)/components/shared/status-page";

export const metadata = { title: "Coming soon — Cray Creative" };

const ComingSoon = () => {
  return (
    <StatusPage
      title="Coming soon"
      lines={["We're still making this one."]}
    />
  );
};

export default ComingSoon;
