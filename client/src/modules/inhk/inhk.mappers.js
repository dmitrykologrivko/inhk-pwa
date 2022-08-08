export async function mapTeachers(dto) {
    return dto.result?.teachers?.map(item => ({id: item.id, text: item.name})); // map to name ???
}

export async function mapGroups(dto) {
    return dto.result?.teachers?.map(item => ({id: item.id, text: item.name})); // map to name ???
}
