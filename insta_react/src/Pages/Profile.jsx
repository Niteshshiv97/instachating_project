import Navigation from "../SubComponents/Navigation";
import LeftSection from "../SubComponents/LeftSection";
import ProfilePage from "../SubComponents/ProfilePage";

const Profile = () => {
  return (
    <>
      <main className="main homepage">
        <Navigation />
        <div className="main_container">
        <LeftSection />
        <ProfilePage />
        </div>
      </main>
    </>
  );
};

export default Profile;
