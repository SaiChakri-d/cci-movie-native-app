import React from 'react';
import {Image, ScrollView, StyleSheet} from 'react-native';
import {Card, IconButton, Text} from 'react-native-paper';

interface MovieModalProps {
  movie: any;
  setCloseMod: (active: boolean) => void;
}

const MovieModal = ({movie, setCloseMod}: MovieModalProps) => {
  const handleClose = () => {
    setCloseMod(false);
  };

  const placeholderImg =
    'https://placehold.co/100x200/png?text=Image+Not+Available!';

  return (
    <Card style={styles.cardContainer}>
      <IconButton
        testID='modalClose'
        icon="close-outline"
        onPress={() => handleClose()}
        style={styles.modalCloseButton}
      />
      <ScrollView>
        <Card.Content>
          <Image
            // testID={`poster-${movie.Poster}`}
            testID='poster'
            style={styles.cardImg}
            source={{
              uri: movie.Poster !== 'N/A' ? movie.Poster : placeholderImg,
            }}
          />
          <Text variant="titleMedium">
            Title: <Text>{movie.Title}</Text>
          </Text>
          <Text variant="titleMedium">
            Type: <Text>{movie.Type}</Text>
          </Text>
          <Text variant="titleMedium">
            IMDB Rating: ⭐<Text> {movie.imdbRating}</Text>
          </Text>
          <Text variant="titleMedium">
            Rated: <Text>{movie.Rated}</Text>
          </Text>
          <Text variant="titleMedium">
            Runtime: <Text>{movie.Runtime}</Text>
          </Text>
          <Text variant="titleMedium">
            Year: <Text>{movie.Released}</Text>
          </Text>
          <Text variant="titleMedium">
            Genre: <Text>{movie.Genre}</Text>
          </Text>
          <Text variant="titleMedium">
            Director: <Text>{movie.Director}</Text>
          </Text>
          <Text variant="titleMedium">
            Writer: <Text>{movie.Writer}</Text>
          </Text>
          <Text variant="titleMedium">
            Cast: <Text>{movie.Actors}</Text>
          </Text>
          <Text variant="titleMedium">
            Plot: <Text>{movie.Plot}</Text>
          </Text>
          <Text variant="titleMedium">
            Accolades: <Text>{movie.Awards}</Text>
          </Text>
          <Text variant="titleMedium">
            Language: <Text>{movie.Language}</Text>
          </Text>
          <Text variant="titleMedium">
            Country: <Text>{movie.Country}</Text>
          </Text>
        </Card.Content>
      </ScrollView>
    </Card>
  );
};

const styles = StyleSheet.create({
  modalCloseButton: {
    backgroundColor: '#ff8a8a',
    position: 'absolute',
    top: -30,
    right: -30,
  },
  cardContainer: {
    margin: 30,
    padding: 10,
    backgroundColor: '#f4e3ff',
  },
  contentKey: {
    fontWeight: 'bold',
  },
  cardImg: {
    width: 270,
    height: 400,
    borderRadius: 10,
    marginBottom: 5,
  },
});

export default MovieModal;
