import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  about: {
    display: 'flex',
    alignItems: 'center',
  },
  flexGroup: {
    display: 'flex',
    flexDirection: 'row',
    marginVertical: 4,
    flexWrap: 'wrap',
    alignItems: 'center'
  },
  ratingModal: {
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 12,
    width: '90%',
    alignSelf: 'center',
    borderRadius: 8
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

export default styles;