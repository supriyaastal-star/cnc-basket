import ProfileSidebar from "../components/profileSidebar";
import HistoryOverview from "../components/HistoryOverview";

export default function HistoryPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex">
      <ProfileSidebar />
      <section className="flex-1 p-6 md:p-10">
        <div className="mx-auto w-full max-w-6xl">
          <HistoryOverview />
        </div>
      </section>
    </main>
  );
}
