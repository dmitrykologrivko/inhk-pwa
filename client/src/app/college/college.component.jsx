import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SearchInput } from '../common/components/search-input';
import { SegmentedControl, SegmentedControlItem } from '../common/components/segmented-control';
import { List } from '../common/components/list';
import { SimpleListItem } from '../common/components/list-items';
import { Margin } from '../common/components/spacing';
import { Card } from '../common/components/containers';

export const STUDENT_ROLE = 'student';
export const TEACHER_ROLE = 'teacher';

function CollegeList(props) {
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

export function College(props) {
    const {t} = useTranslation();

    const [items, setItems] = useState(props.students);
    const [role, setRole] = useState(STUDENT_ROLE);

    const onStudentsControlClick = () => {
        setRole(STUDENT_ROLE);
        setItems(props.students);
    };

    const onTeachersControlClick = () => {
        setRole(TEACHER_ROLE);
        setItems(props.teachers);
    };

    const onSearchInputChange = (query) => {
        setItems(() => {
            let items = [];

            if (role === STUDENT_ROLE) {
                items = props.students;
            } else if (role === TEACHER_ROLE) {
                items = props.teachers;
            }

            return items.filter(item => item.name.toLowerCase().search(query.toLowerCase()) === 0);
        });
    };

    const onListItemClick = (object) => {
        if (props.onItemSelected) {
            props.onItemSelected(object, role);
        }
    };

    return (
        <div>
            <Margin bottom={10}>
                <SearchInput placeholder={t('search')}
                             onInputChange={onSearchInputChange}/>
            </Margin>
            <Margin bottom={10}>
                <SegmentedControl>
                    <SegmentedControlItem title={t('groups', {ns: 'college'})}
                                          onClick={onStudentsControlClick}/>
                    <SegmentedControlItem title={t('teachers', {ns: 'college'})}
                                          onClick={onTeachersControlClick}/>
                </SegmentedControl>
            </Margin>
            <CollegeList items={items} onItemClicked={(_, object) => onListItemClick(object)}/>
        </div>
    );
}
