import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function MainLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">

      {/* Navbar */}
      <Navbar />

      {/* Page Content */}
      <main className="flex-grow p-5">
        {children}
      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
}

export default MainLayout;