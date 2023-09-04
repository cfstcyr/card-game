export function shuffle<T>(array: T[]): T[] {
    let currentIndex = array.length,
        randomIndex;

    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex],
        ];
    }

    return array;
}

export function popRandom<T>(array: T[]): T | undefined {
    if (array.length === 0) return;

    const index = Math.floor(Math.random() * array.length);
    const [res] = array.splice(index, 1);

    return res;
}

export function randomGroups<T>(array: T[], groupsSize = 2): T[][] {
    const copy = [...array];
    const groups: T[][] = [];

    while (copy.length >= groupsSize) {
        const group: T[] = [];

        for (let i = 0; i < groupsSize; ++i) {
            const item = popRandom(copy);
            if (item) group.push(item);
        }

        groups.push(group);
    }

    return groups;
}

export function randomItem<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
}