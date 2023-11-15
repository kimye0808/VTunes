import styles from './VTunes.module.css';
import ControlBar from "./component/ControlBar";
import Container from './component/Container';

const VTunes = () => {
  return (
    <div className={styles.vtunes}>
      <Container />
      <ControlBar />
    </div>
  );
};

export default VTunes;
