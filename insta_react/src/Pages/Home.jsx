import Navigation from "../SubComponents/Navigation";
import LeftSection from "../SubComponents/LeftSection";
import MidSection from "../SubComponents/MidSection";
import RightSection from "../SubComponents/RightSection";
const Home = () => {
  return (
    <>
      <main className="main homepage">
        <Navigation />
        <div className="main_container">
          <LeftSection />
          <MidSection />
          <RightSection />
        </div>
      </main>
    </>
  );
};
export default Home;
