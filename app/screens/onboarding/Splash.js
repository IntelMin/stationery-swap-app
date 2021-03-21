import React, { useEffect } from 'react';
import { View, Image } from 'react-native';

import assets from '../../assets';

const Splash = (props) => {
  return (
    <View style={styles.container}>
      <Image source={assets.images.splash} style={styles.backgroundImage} />
    </View>
  );
};

const styles = {
  container: {
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    width: '100%',
    height: '100%'
  }
};

export default Splash;
