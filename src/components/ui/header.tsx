import QuickTimeSelect from "./quick-time-select";
import { ThemeToggle } from "./theme-toggle";

export default function Header() {
  return (
    <header className="w-full py-3 px-4 flex justify-between items-center border-b border-black/15 dark:border-white/15">
      <h1 className="font-bold text-3xl">Pomodoro</h1>
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <QuickTimeSelect />
      </div>
    </header>
  );
}
