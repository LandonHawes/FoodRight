import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";

export default function IndexHeader() {
  const router = useRouter();

  return (
    <div className={`${styles.healthtest} row text-center`}>
      <div>
        <h1 className={styles.headertext}>
          The health you <br></br> want is here.
        </h1>
        <h2 className={styles.foodheader}>FoodRight</h2>
        {/* <h3 className={styles.ComingTxt}>Coming Never</h3> */}
        <div className={styles.openaccbuttondiv}>
          <button
            className={styles.openaccbutton}
            onClick={() => {
              router.push("/order");
            }}
          >
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
}
