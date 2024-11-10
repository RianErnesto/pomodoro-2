import PomodoroView from "@/components/ui/pomodoro-view";
import Menu from "@/components/ui/menu";

export default function Home() {
  return (
    <main className="flex-1 grid grid-cols-[1fr_200px]">
      <div className="h-full flex items-center justify-center">
        <PomodoroView />
      </div>
      <Menu />
    </main>
  );
}
