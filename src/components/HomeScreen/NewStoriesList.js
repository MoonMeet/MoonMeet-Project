import {
  Dimensions,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import React from 'react';
import {Avatar} from 'react-native-paper';
import AddIcon from '../../assets/images/add.png';
import {COLORS, FONTS} from '../../config/Miscellaneous';
import {useNavigation} from '@react-navigation/native';
import {fontValue, heightPercentageToDP} from '../../config/Dimensions';
import {uniqBy} from 'lodash';
import MiniBaseView from '../MiniBaseView/MiniBaseView';

const NewStoriesList = ({ListData, myUID}) => {
  const navigation = useNavigation();

  const _listEmptyComponent = () => {
    return (
      <MiniBaseView>
        <View style={styles.emptyView}>
          <Text style={styles.heading}>No stories available, yet.</Text>
          <Text style={styles.subheading}>
            there's no story available at the moment.
          </Text>
        </View>
      </MiniBaseView>
    );
  };
  const _renderItem = ({item}) => (
    <Pressable
      onPress={() => {
        navigation?.navigate('story', {userUID: item?.uid, myUID: myUID});
      }}
      style={{
        height: 85,
        width: 70,
        backgroundColor: COLORS.primaryLight,
      }}>
      <ImageBackground
        source={item?.image ? {uri: item?.image} : {uri: item?.avatar}}
        resizeMode="cover">
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Avatar.Image
            style={styles.userHaveStory}
            size={50}
            source={item?.image ? {uri: item?.image} : {uri: item?.avatar}}
          />
        </View>
        <Text style={styles.nameAndLastname}>{item?.first_name}</Text>
        <Text style={styles.nameAndLastname}>{item?.last_name}</Text>
      </ImageBackground>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        numColumns={2}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingEnd: '13%',
          alignSelf: 'center',
          justifyContent: ListData?.length > 0 ? 'flex-start' : 'center',
          minWidth:
            Dimensions.get('window')?.width -
            (13 / 100) * Dimensions.get('window')?.width,
        }}
        removeClippedSubviews={true}
        initialNumToRender={10}
        ListEmptyComponent={_listEmptyComponent}
        data={uniqBy(ListData, 'uid')}
        renderItem={_renderItem}
        keyExtractor={item => item?.uid}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    padding: '2%',
  },
  addStory: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  storyHolderLeft: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  storyText: {
    position: 'relative',
    fontSize: fontValue(13),
    padding: heightPercentageToDP(-0.5),
    textAlign: 'center',
    color: COLORS.black,
  },
  emptyView: {
    backgroundColor: COLORS.white,
    height: 85,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  heading: {
    fontSize: 16,
    textAlign: 'center',
    color: COLORS.black,
    fontFamily: FONTS.regular,
    width: '100%',
  },
  subheading: {
    fontSize: 14,
    paddingTop: '1%',
    textAlign: 'center',
    color: COLORS.black,
    opacity: 0.4,
    fontFamily: FONTS.regular,
    width: '100%',
  },
  nameAndLastname: {
    textAlign: 'center',
    color: COLORS.black,
    padding: heightPercentageToDP(-0.5),
    fontSize: fontValue(13),
  },
});

export default NewStoriesList;