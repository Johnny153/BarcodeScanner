import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
  backbutton: {
    position: 'absolute',
    left: 20,
    top: 20,
    flexDirection: 'row',
    backgroundColor: 'grey',
    width: 80,
    height: 45,
    borderRadius: 10,
  },
  loginbutton: {
    position: 'absolute',
    right: 30,
    top: 20,
    flexDirection: 'row',
    backgroundColor: 'grey',
    width: 80,
    height: 45,
    borderRadius: 10,
  },
  detailsName:{
    position: 'absolute',
    top: 70,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'left',
    padding: 30,
    fontSize:18,
    width: 400
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 13,
  },
  barcodeText: {
    position: 'absolute',
    left:100,
    top: 350,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 13,
  },
  rnholeView: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.75)',
  },
  paragraph: {
    marginVertical: 8,
    lineHeight: 20,
  },
  container: {
    flex: 1,
    padding: 20,
  },
});