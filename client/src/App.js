import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Route, Switch } from 'react-router-dom';

import KaydedilenlerListesi from './Filmler/KaydedilenlerListesi';
import Film from "./Filmler/Film"
import FilmListesi from "./Filmler/FilmListesi"


export default function App() {
  const [saved, setSaved] = useState([]); // Stretch: the ids of "saved" movies
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const FilmleriAl = () => {
      axios
        .get('http://localhost:5001/api/filmler') // Burayı Postman'le çalışın
        .then(response => { setMovieList(response.data) })
        .catch(error => {
          console.error('Sunucu Hatası', error);
        });
    }
    FilmleriAl();
  }, []);

  const KaydedilenlerListesineEkle = movie => {
    if (!saved.includes(movie))
      setSaved([...saved, movie])
  };

  return (
    <div>
      <KaydedilenlerListesi list={saved} />
      <Switch>
        <Route exact path="/">
          <FilmListesi movies={movieList} />
        </Route>
        <Route exact path="/filmler/:id">
          <Film kaydet={KaydedilenlerListesineEkle} />
        </Route>
      </Switch>
    </div>
  );
}
