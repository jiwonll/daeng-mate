import MainHeader from "./MainHeader";
import MainContent from "./MainContent";

export default function MainPage() {
  return (
    <div className="relative min-h-screen max-w-md mx-auto bg-gray-50 pb-20">
      <MainHeader />
      <main>
        <MainContent />
      </main>
    </div>
  );
}
