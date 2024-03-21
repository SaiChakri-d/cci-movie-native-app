import axios from 'axios';
import React, {useState} from 'react';
import {Keyboard, StyleSheet, View} from 'react-native';
import {
  Text,
  TextInput,
  IconButton,
  ActivityIndicator,
} from 'react-native-paper';

const Home = (props: any) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    Keyboard.dismiss();
    try {
      setIsLoading(true);
      const response = await axios.get(
        `https://www.omdbapi.com/?s=${searchTerm}&apikey=9cc1e048`,
      );
      if (response.data.Response === 'True') {
        props.navigation.navigate('Movies', {
          moviedata: response.data,
          searchTerms: searchTerm,
        });
        setIsLoading(false);
        setIsError(false);
      } else {
        setIsError(true);
        // console.log('dfghjkl;kjhg');
      }
    } catch (err) {
      setIsError(true);
    } finally {
      setIsLoading(false);
      setSearchTerm('');
    }
    
    setTimeout(() => {
      setIsError(false);
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={styles.screenHeading}>
        Movies App
      </Text>
      <View style={styles.searchBox}>
        <TextInput
          testID='inputBox'
          mode="outlined"
          style={styles.textInput}
          label="Search for movies"
          placeholder="Search for movies..."
          onChangeText={searchTerm => setSearchTerm(searchTerm)}
          value={searchTerm}
        />
        {isLoading ? (
          <ActivityIndicator
            testID='activityIndicator'
            size="small"
            color="purple"
            style={styles.activityIndicator}
          />
        ) : (
          <IconButton
            testID='iconButton'
            icon="movie-search"
            iconColor="purple"
            size={40}
            onPress={handleSubmit}
            disabled={!searchTerm}
          />
        )}
      </View>
      {isError && (
        <Text testID="error" style={styles.ErrorText} variant="titleMedium">
          Movie not found in the database!
        </Text>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fbf5df',
    flex: 1,
    flexDirection: 'column',
  },
  screenHeading: {
    color: '#01146a',
    textAlign: 'center',
    marginVertical: 10,
    fontWeight: 'bold',
  },
  searchBox: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 'auto',
  },
  textInput: {width: '70%', marginLeft: 20},
  activityIndicator: {
    alignItems: 'center',
    margin: 20,
  },
  ErrorText: {
    color: 'red',
    backgroundColor: '#ffcbcb',
    padding: 10,
    margin: 10,
    borderRadius: 5,
    textAlign: 'center',
  },
  showButton: {
    margin: 10,
  },
});

export default Home;
