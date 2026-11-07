"use client";

type StatusPageProps = {
  title?: string;
  body?: string;
};

const StatusPage = ({ title = "", body = "" }: StatusPageProps) => {
  return (
    <div className="flex min-h-[calc(100vh-5rem)] flex-col items-center justify-center">
      <h1 className="header-text">{title}</h1>
      <p className="text-xl">{body}</p>
    </div>
  );
};

export default StatusPage;
