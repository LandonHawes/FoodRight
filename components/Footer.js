import styles from "../styles/Footer.module.css";
import Link from "next/link";

export default function Footer() {
  return (
    <footer
      className={`${styles.footerbackground} text-center text-lg-start text-white`}
    >
      <div className="container p-4 pb-0">
        <section className="">
          <div className="row">
            <div className="col-lg-6 col-md-6 mb-4 mb-md-0">
              <h5 className="text-uppercase useFont">FoodRight</h5>

              <p className="useFont">
                FoodRight is a game-changer in healthy food delivery, offering a
                carefully curated menu of delicious and nutritious meals.
                Collaborating with local chefs and nutritionists, the platform
                provides a diverse range of options, from vibrant salads to
                protein-packed bowls. FoodRight aims to make mindful eating
                easy, appealing to fitness enthusiasts and health-conscious
                individuals alike. It&#39;s your go-to service for a satisfying,
                guilt-free dining experience.
              </p>
            </div>

            <div className="col-lg-6 col-md-6 mb-4 mb-md-0">
              <h5 className="text-uppercase">Links</h5>

              <ul className="list-unstyled mb-0">
                <li>
                  <Link href="/">
                    <a className={`${styles.linkB} nav-link`}>Home</a>
                  </Link>
                </li>
                <li>
                  <Link href="/about">
                    <a className={`${styles.linkB} nav-link`}>About</a>
                  </Link>
                </li>
                <li>
                  <Link href="/order">
                    <a className={`${styles.linkB} nav-link`}>Order</a>
                  </Link>
                </li>
                <li>
                  <Link href="/newarrivals">
                    <a className={`${styles.linkB} nav-link`}>New</a>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>

      <div className="text-center p-3 useFont">
        © 2023 Copyright:
        <a className="text-white useFont"> FoodRight</a>
      </div>
    </footer>
  );
}
