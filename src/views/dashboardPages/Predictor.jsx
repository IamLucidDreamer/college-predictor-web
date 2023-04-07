import testImage from "../../assets/images/about_hero.avif";
import Footer from "../../components/shared/Footer";
import Header from "../../components/shared/Header";
import NeetIndex from "../predictor/neet";

const Predictor = () => {
  return (
    <div>
      <Header />
      <div className="text-4x">
        <div className="flex flex-col justify-center gap-2 w-full">
          <div
            className="h-56 w-full flex justify-center items-center bg-center bg-no-repeat bg-cover bg-blend-darken bg-black bg-opacity-60"
            style={{ backgroundImage: `url(${testImage})` }}
          >
            <h1 className="text-5xl text-white">Predictor</h1>
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
