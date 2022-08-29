import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Margin, Padding } from '../common/components/spacing';
import { FlexContainer } from '../common/components/containers';
import { PageHeading, PageHeadingSecondary } from '../common/components/titles';
import { SegmentedControl, SegmentedControlItem } from '../common/components/segmented-control';
import { FavoritesProvider, useFavorites } from './favorites.context';

function FavoritesPageImpl() {
    const {t} = useTranslation();
    const favoritesService = useFavorites();

    const [favoriteGroups, setFavoriteGroups] = useState([]);
    const [favoriteTeachers, setFavoriteTeachers] = useState([]);

    useEffect(() => {
        Promise.all([favoritesService.getFavoriteTeachers(), favoritesService.getFavoriteGroups()])
            .then(values => {
                setFavoriteTeachers(values[0]);
                setFavoriteGroups(values[1]);
            });
    }, [favoritesService]);

    return (
        <Padding top={16} right={16} bottom={8} left={16}>
            {/* Top */}
            <Margin bottom={15}>
                <FlexContainer alignItems='center' justifyContent='space-between'>
                    <div>
                        <PageHeading>
                            {'Favorites'}
                        </PageHeading>
                        <PageHeadingSecondary>
                            {'Test'}
                        </PageHeadingSecondary>
                    </div>
                </FlexContainer>
            </Margin>

            {/* Content */}
            <div>
                <SegmentedControl>
                    <SegmentedControlItem title={t('groups', {ns: 'favorites'})}
                                          onClick={null}/>
                    <SegmentedControlItem title={t('teachers', {ns: 'favorites'})}
                                          onClick={null}/>
                </SegmentedControl>
                {/*  LIST  */}
            </div>
        </Padding>
    );
}

export function FavoritesPage() {
    return (
        <FavoritesProvider>
            <FavoritesPageImpl />
        </FavoritesProvider>
    );
}
