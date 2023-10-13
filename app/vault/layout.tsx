import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vault",
  description: "Vault",
};

export default function VaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#1e293b]">
      <main className="flex flex-1 flex-row">{children}</main>
    </div>
  );
}
