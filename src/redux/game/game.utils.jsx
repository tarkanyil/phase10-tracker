export const increaseId = (count) => {
    const newId = count + 1;
    return newId;
}

export const gameRollback = (state) => {
    const newGivesCard = state.prevGivesCard;
    const newCount = state.count - 1;
    return {
        count: newCount,
        givesCard: newGivesCard,
        prevGivesCard: "",
        completedGame: false
    }
}