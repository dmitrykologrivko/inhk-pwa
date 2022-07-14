import { useState } from 'react';
import { SearchInput } from '../search-input';
import { SegmentedControl, SegmentedControlItem } from '../segmented-control';
import { List } from '../list';

export const STUDENT_ROLE = 'student';
export const TEACHER_ROLE = 'teacher';

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

            return items.filter(item => item.text.search(query) === 0);
        });
    };

    const onListItemClick = (object) => {
        if (props.onItemSelected) {
            props.onItemSelected(object, role);
        }
    };

    return (
        <section>
            <SearchInput onInputChange={onSearchInputChange} />
            <br />
            <SegmentedControl primaryColor={props.primaryColor}>
                <SegmentedControlItem title='Группы' onClick={onStudentsControlClick} />
                <SegmentedControlItem title='Преподаватели' onClick={onTeachersControlClick} />
            </SegmentedControl>
            <br />
            <List items={items} onItemClicked={(_, object) => onListItemClick(object)} />
        </section>
    );
}
