import styles from './VTunes.module.css';
import Container from './component/Container';
import ControlBarContainer from './containers/ControlBarContainer';

const VTunes = () => {
  return (
    <div className={styles.vtunes}>
      <Container />
      <ControlBarContainer />
    </div>
  );
};

export default VTunes;
