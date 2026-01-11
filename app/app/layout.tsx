import { AppShell } from "@/components/shell/app-shell";
import { DemoDataProvider } from "@/components/providers/demo-data-provider";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DemoDataProvider>
      <AppShell>{children}</AppShell>
    </DemoDataProvider>
  );
}
