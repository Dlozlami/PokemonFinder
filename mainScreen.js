import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, Button, ActivityIndicator } from 'react-native';
import axios from 'axios';

const MainScreen = () => {
  const [pokemonName, setPokemonName] = useState('');
  const [pokemonData, setPokemonData] = useState(null);
  const [loading, setLoading] = useState(false);

  const apiUrl = 'https://pokeapi.co/api/v2/pokemon/';

  const handleSearch = () => {
    if (pokemonName) {
      setLoading(true);
      axios
        .get(apiUrl + pokemonName.toLowerCase())
        .then((response) => {
          setPokemonData(response.data);
          setLoading(false);
        })
        .catch((error) => {
            alert("Error fetching pokemon. Please try again.")
          console.error('Error fetching data: ', error);
          setLoading(false);
        });
    }
  };

  function toTitleCase(text) {
    return text.replace(/\w\S*/g, function (word) {
      return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
    });
  }

  return (
    <View>
      <TextInput
        placeholder="Enter Pokémon Name"
        value={pokemonName}
        onChangeText={setPokemonName}
      />
      <Button title="Search" onPress={handleSearch} />

      {pokemonData ? (
        <View>
          <View>
            <Image
              source={{ uri: pokemonData.sprites.other['official-artwork'].front_default }}
              style={{ width: 300, height: 300 }}
            />
          </View>

          <View>
            <Text>Name: {toTitleCase(pokemonData.name)}</Text>
            <Text>Type: {toTitleCase(pokemonData.types[0].type.name)}</Text>
            <Text>Weight: {pokemonData.weight}</Text>
            {/* Add more details as needed */}
          </View>
        </View>
      ) : loading ? (
        <ActivityIndicator size="large" />
      ) : null}
    </View>
  );
};

export default MainScreen;
