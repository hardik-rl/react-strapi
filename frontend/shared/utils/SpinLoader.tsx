import { Loader } from "lucide-react";

export default function SpinLoader() {
  return (
    <div className="loading-wrapper">
      <Loader className="spin" size={40} strokeWidth={2} />
    </div>
  );
}
