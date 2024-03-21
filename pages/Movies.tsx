import axios from 'axios';
import React, {useState, useEffect } from 'react';
import {
  Image,
  StyleSheet,
  View,
  FlatList,
} from 'react-native';
import {
  Text,
  Button,
  ActivityIndicator,
  Card,
} from 'react-native-paper';
import MovieModal from '../components/MovieModal';
import Pagination from '../components/Pagination';

interface MovieInfo {
  Title: string;
  Type: string;
  Year: string;
  Poster: string;
  imdbID: string;
  Error: any;

  imdbRating: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Awards: string;
  Language: string;
  Country: string;
}

const Movies = (props: any) => {
  const {moviedata, searchTerms} = props.route?.params;
  // console.log(moviedata, 'gggg');
  const [movieData, setMovieData] = useState<any | null>();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [infoLoading, setInfoLoading] = useState<boolean>(false);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<any>(0);
  const [closeMod, setCloseMod] = useState<boolean>(false); //for MovieModal Open and Close actions
  const [selectedMovie, setSelectedMovie] = useState<MovieInfo>(); //for showing more info onclick
  const [active, setActive] = useState<any>();

  const placeholderImg =
    'https://placehold.co/200x400/png?text=Image+Not+Available!';

  useEffect(() => {
    setTotalPages(moviedata?.totalResults);
    setMovieData(moviedata?.Search);
    setSearchTerm(searchTerms);
  }, [moviedata]);
  // console.log('results', totalPages);
  // console.log('movidata from prams', moviedata);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `https://www.omdbapi.com/?s=${searchTerm}&apikey=9cc1e048&page=${currentPage}`,
      );
      if (response?.data?.Response === 'True') {
        setMovieData(response?.data?.Search);
        // console.log(response?.data?.Search);
      } else {
        setIsError(true);
      }
    } catch (err) {
      setTotalPages(0);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  // console.log(movieData, 'mhhhh');
  
  const handleShowMoreInfo = async (imdbID: string) => {
    setInfoLoading(true);
    // setIsError(null);
    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?i=${imdbID}&apikey=9cc1e048`,
      );
      setSelectedMovie(response?.data);
      setCloseMod(true);
      // console.log(response?.data);
    } catch (error) {
      // setSelectedMovie(null);
      // setIsError('Movie details not found!');
      setIsError(true);
      console.warn('Movie details not found!');
    } finally {
      setInfoLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator
          size="large"
          color="purple"
          style={styles.activityIndicator}
        />
      ) : (
        <View style={styles.movieContainer}>
          <FlatList
            data={movieData}
            renderItem={({item, index}: any) => {
              return (
                <View style={styles.scrollViewContent}>
                  <Card key={index} style={styles.cardContainer}>
                    <Image
                      testID='poster'
                      style={styles.cardImg}
                      source={{
                        uri:
                          item.Poster !== 'N/A' ? item.Poster : placeholderImg,
                      }}
                    />
                    <Card.Content style={styles.cardInfo}>
                      <Text testID='movieTitle' variant="titleMedium">
                        {item.Title}
                      </Text>
                      <Text variant="titleMedium">{item.Year}</Text>
                      <Text variant="titleMedium">
                        {item.Type.toUpperCase()}
                      </Text>
                    </Card.Content>
                    {item.imdbID &&
                      (infoLoading && active === item.imdbID ? (
                        <ActivityIndicator
                          testID='showMoreLoader'
                          size="small"
                          color="purple"
                          style={styles.activityIndicatorShowInfo}
                        />
                      ) : (
                        <Button
                          mode="contained-tonal"
                          style={styles.showButton}
                          testID='imdbID'
                          onPress={() => {
                            handleShowMoreInfo(item.imdbID),
                              setActive(item.imdbID);
                          }}>
                          Show Info
                        </Button>
                      ))}
                  </Card>
                </View>
              );
            }}
            ListFooterComponent={
              <Pagination
                totalCount={totalPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            }
          />
          {closeMod && (
            <MovieModal movie={selectedMovie} setCloseMod={setCloseMod} />
          )}
        </View>
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
    marginVertical: 5,
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
    flex: 1,
    alignItems: 'center',
  },
  activityIndicatorShowInfo: {
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
  movieContainer: {
    flex: 1,
    margin: 0,
    justifyContent: 'center',
    alignContent: 'center',
  },
  scrollViewContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  cardContainer: {
    flexDirection: 'column',
    width: 300,
    height: 600,
    margin: 10,
    overflow: 'hidden',
  },
  cardInfo: {
    padding: 10,
  },
  cardImg: {
    alignSelf: 'center',
    overflow: 'hidden',
    resizeMode: 'cover',
    width: 300,
    height: 420,
  },
  showButton: {
    margin: 10,
  },
});
export default Movies;
