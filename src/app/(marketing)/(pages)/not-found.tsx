import StatusPage from "@/app/(marketing)/components/shared/status-page";

// Shown for any URL that doesn't exist (see [...slug]/page.tsx) and whenever
// a page calls notFound(), e.g. a work project with an unknown id.
const NotFound = () => {
  return (
    <StatusPage
      title="404"
      lines={["Page was moved", "Some things are not meant to be found"]}
    />
  );
};

export default NotFound;
