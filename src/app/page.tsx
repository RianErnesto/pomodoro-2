import PomodoroView from "@/components/ui/pomodoro-view";
import Menu from "@/components/ui/menu";
import FocusedVideo from "@/components/ui/focused-video-view";

export default function Home() {
  return (
    <main className="flex-1 grid grid-cols-[1fr_300px]">
      <div className="h-full flex items-center justify-center relative">
        <FocusedVideo />
        <PomodoroView />
      </div>
      <Menu />
    </main>
  );
}
