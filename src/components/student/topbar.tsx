import { Input } from "~/components/ui/input";

export default function Topbar() {
  return (
    <div className="fixed w-screen bg-accent p-3 text-foreground shadow-md">
      <Input placeholder="Search" className="w-96" />
    </div>
  );
}
