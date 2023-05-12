import testImage from "../../assets/images/about_hero.avif";
import Footer from "../../components/shared/Footer";
import Header from "../../components/shared/Header";
import MainHeading from "../../components/shared/MainHeading";
import NeetIndex from "../predictor/neet";

const Predictor = () => {
  return (
    <div>
      <Header />
      <div className="text-4x">
        <div className="flex flex-col justify-center gap-2 w-full container mx-auto p-1 lg:p-4">
          <div className="flex items-center justify-between mb-4">
            <MainHeading text={"Predictor"} />
          </div>
          <div className="mx-auto container">
            <NeetIndex />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Predictor;
