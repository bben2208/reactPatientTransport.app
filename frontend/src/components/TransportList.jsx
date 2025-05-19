import { useContext } from "react";
import { TransportContext } from "../context/TransportContext";
import TransportItem from "./TransportItem";
import styles from "./TransportList.module.css";

const TransportList = () => {
  const { transports } = useContext(TransportContext);

  return (
    <div className={styles.transportList}>
      <h2>Transport List</h2>
      {transports.length > 0 ? (
        transports.map((transport) => (
          <TransportItem key={transport.id} transport={transport} />
        ))
      ) : (
        <p>No transports available</p>
      )}
    </div>
  );
};

export default TransportList;
