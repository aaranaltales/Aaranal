"use client"
import UserProfile from './UserProfile';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function UserProfilePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-5 pb-10">
        <UserProfile />
      </main>
      <Footer />
    </div>
  );
}