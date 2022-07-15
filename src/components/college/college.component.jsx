import { useState } from 'react';
import { SearchInput } from '../search-input';
import { SegmentedControl, SegmentedControlItem } from '../segmented-control';
import { List } from '../list';
import { SimpleListItem } from '../list-items';
import { Margin } from '../spacing';
import styles from './college.module.css';

export const STUDENT_ROLE = 'student';
export const TEACHER_ROLE = 'teacher';

function CollegeList(props) {
    return (
        <List {...props}
            render={(children) => (
                <div className={styles.list}>
                    {children}
                </div>
            )}>
            {props.items.map((item, index) => <SimpleListItem key={index} object={item} />)}
        </List>
    );
}

export function College(props) {
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

            return items.filter(item => item.text.toLowerCase().search(query.toLowerCase()) === 0);
        });
    };

    const onListItemClick = (object) => {
        if (props.onItemSelected) {
            props.onItemSelected(object, role);
        }
    };

    return (
        <section>
            <Margin bottom={10}>
                <SearchInput onInputChange={onSearchInputChange} />
            </Margin>
            <Margin bottom={10}>
                <SegmentedControl primaryColor={props.primaryColor}>
                    <SegmentedControlItem title='Группы' onClick={onStudentsControlClick} />
                    <SegmentedControlItem title='Преподаватели' onClick={onTeachersControlClick} />
                </SegmentedControl>
            </Margin>
            <CollegeList items={items} onItemClicked={(_, object) => onListItemClick(object)} />
        </section>
    );
}
