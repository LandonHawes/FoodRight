import Navbar from "../components/Navbar";
import Head from "next/head";
import styles from "../styles/About.module.css";
import Footer from "../components/Footer";

export default function About() {
  return (
    <div>
      <Head>
        <title>About Page</title>
        <meta name="description" content="About website Page" />
        <link rel="icon" href="" />
      </Head>
      <div className={styles.nav}>
        <Navbar />
      </div>
      <div className="about-background">
        <div className={`${styles.aboutrow} row text-center`}>
          <div className="col-12 col-md-12 col-lg-6 ">
            <h1 className={styles.heading}>The FoodRight Plan</h1>
          </div>
        </div>
        <div className="row d-flex justify-content-center">
          <div
            className={`${styles.aboutcontainer} shadow-lg p-3 mb-5 bg-white rounded `}
          >
            <div className={`${styles.aboutrow} row `}>
              <div className="col-12 col-md-12 col-lg-6 ">
                <h2 className={styles.steps}>Step 1. We build your goals</h2>
                <p className={styles.ptags}>
                  {
                    "Whether it's losing weight, building muscle or lowering cholesterol,\
            our expert nutritionists identify your unique diet needs and build a\
            plan customized for you alone."
                  }
                </p>
              </div>
            </div>
          </div>
          <div
            className={`${styles.aboutcontainer} shadow-lg p-3 mb-5 bg-white rounded `}
          >
            <div className={`${styles.aboutrow} row`}>
              <div className="col-12 col-md-12 col-lg-6">
                <h3 className={styles.steps}>Step 2. We make your food</h3>
                <p className={styles.ptags}>
                  {
                    "Our chefs build a menu based on your meal plan. Just open your app\
            like you would with any other fast-casual chain and order what\
            you're in the mood for. We'll take care of the measurements and\
            tracking. We also send you a weekly meal kit box (think Factor or\
            Freshly). This includes \"back up\" meals and customized supplements\
            and snacks."
                  }
                </p>
              </div>
            </div>
          </div>
          <div
            className={`${styles.aboutcontainer} shadow-lg p-3 mb-5 bg-white rounded `}
          >
            <div className={`${styles.aboutrow} row`}>
              <div className="col-12 col-md-12 col-lg-6">
                <h4 className={styles.steps}>Step 3. We track and iterate</h4>
                <p className={styles.ptags}>
                  {
                    "We adjust your meal plan in real time based on your progress. Get\
            monthly access to gold standard body composition tests in our DEX\
            Machine, and check in with your nutrition coach to talk about how\
            you're feeling. Our app also consolidates data from smart scales and\
            fitness trackers to fine-tune your plan. Over time, we'll get to\
            know your unique set of preferences and challenges, including food\
            sensitivities, \"trigger foods\" and things you just enjoy."
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
