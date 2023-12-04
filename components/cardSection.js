import Image from "next/image";
import styles from "../styles/CardSection.module.css";

export default function CardSection() {
  return (
    <div className="container my-5">
      <div className="row text-center  ">
        <div className="col-4 d-flex justify-content-center">
          <div className={`${styles.cardWidth} card`}>
            <Image
              className="card-img-top"
              src="/images/foodphoto1.jpg"
              alt="Card image cap"
              height="350px"
              width="300px"
            />
            <div className="card-body">
              <p className={styles.cardTitle}>Grilled Chicken Sandwhich</p>
              <p className={styles.cardText}>
                Some quick example text to build on the card title and make up
                the bulk of the card&#39;s content.
              </p>
            </div>
          </div>
        </div>
        <div className="col-4 d-flex justify-content-center">
          <div className={`${styles.cardWidth} card`}>
            <Image
              className="card-img-top"
              src="/images/foodphoto2.jpg"
              alt="Card image cap"
              height="350px"
              width="300px"
            />
            <div className="card-body">
              <p className={styles.cardTitle}>Chicken Parm Sandwhich</p>

              <p className={styles.cardText}>
                Some quick example text to build on the card title and make up
                the bulk of the card&#39;s content.
              </p>
            </div>
          </div>
        </div>
        <div className="col-4 d-flex justify-content-center">
          <div className={`${styles.cardWidth} card`}>
            <Image
              className="card-img-top"
              src="/images/fishtacos.png"
              alt="Card image cap"
              height="350px"
              width="300px"
            />
            <div className="card-body">
              <p className={styles.cardTitle}>Loaded Protein Bowl</p>

              <p className={styles.cardText}>
                Some quick example text to build on the card title and make up
                the bulk of the card&#39;s content.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
