import { createContext, useContext } from 'react';
import { FavoritesService } from './favorites.service';

const FavoritesContext = createContext(null);

export function FavoritesProvider(props) {
    const favoritesService = props.favoritesService || new FavoritesService();
    return (
        <FavoritesContext.Provider value={favoritesService}>
            {props.children}
        </FavoritesContext.Provider>
    );
}

export function useFavorites() {
    return useContext(FavoritesContext);
}
