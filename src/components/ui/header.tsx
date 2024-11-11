import { Button } from "./button";
import QuickTimeSelect from "./quick-time-select";
import { ThemeToggle } from "./theme-toggle";
import StatisticsDialog from "./statistics-dialog";

export default function Header() {
  return (
    <header className="w-full py-3 px-4 flex justify-between items-center border-b border-black/15 dark:border-white/15">
      <h1 className="font-bold text-3xl">Pomodoro</h1>
      <div className="flex items-center gap-2">
        <StatisticsDialog>
          <Button variant="secondary">Statistics</Button>
        </StatisticsDialog>
        <ThemeToggle />
        <QuickTimeSelect />
      </div>
    </header>
  );
}
