import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Margin, Padding } from '../common/components/spacing';
import { FlexContainer } from '../common/components/containers';
import { PageTitle } from '../common/components/titles';
import { Card } from '../common/components/containers';
import { List } from '../common/components/list';
import { SimpleListItem } from '../common/components/list-items';
import { FavoritesProvider, useFavorites } from '../inhk';

const TEACHER_ROLE = 'teacher';
const STUDENT_ROLE = 'student';

function FavoritesList(props) {
    return (
        <List {...props}
              render={(children) => (
                  <Card>
                      {children}
                  </Card>
              )}>
            {props.items.map((item, index) => <SimpleListItem key={index} object={item} textKey='name'/>)}
        </List>
    );
}

function FavoritesPageImpl() {
    const navigate = useNavigate();
    const {t} = useTranslation();
    const favoritesService = useFavorites();

    const [favoriteGroups, setFavoriteGroups] = useState([]);
    const [favoriteTeachers, setFavoriteTeachers] = useState([]);

    const onUserSelected = (object, role) => {
        if (role === TEACHER_ROLE) {
            navigate(`/schedule/teacher/${object.id}`);
            return;
        }
        if (role === STUDENT_ROLE) {
            navigate(`/schedule/group/${object.id}`);
        }
    };

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
                        <PageTitle>
                            {t('title', { ns: 'favorites' })}
                        </PageTitle>
                    </div>
                </FlexContainer>
            </Margin>

            {/* Content */}
            <div>
                {/* Groups */}
                <h4>{t('groups', {ns: 'favorites'})}</h4>
                {favoriteGroups.length === 0 ? (
                    <div>{t('noFavoriteGroups', {ns: 'favorites'})}</div>
                ) :  (
                    <FavoritesList items={favoriteGroups}
                                   onItemClicked={(_, object) => onUserSelected(object, STUDENT_ROLE)} />
                )}

                {/* Teachers */}
                <h4>{t('teachers', {ns: 'favorites'})}</h4>
                {favoriteTeachers.length === 0 ? (
                    <div>{t('noFavoriteTeachers', {ns: 'favorites'})}</div>
                ) :  (
                    <FavoritesList items={favoriteTeachers}
                                   onItemClicked={(_, object) => onUserSelected(object, TEACHER_ROLE)} />
                )}
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
