import Footer from "../../components/shared/Footer";
import Header from "../../components/shared/Header";
import Updates from "../layout/Updates";
import NeetIndex from "../predictor/neet";

const Predictor = () => {
  return (
    <div>
      <Header />
      <div className="text-4x">
        <div className="flex flex-col justify-center gap-2 w-full">
          <div className="h-56 w-full bg-red-400 flex justify-center items-center ">
            <h1 className="text-5xl">Predictor</h1>
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
