export const roundSubmit = (id, givesCard) => {
    const newId = id + 1;
    return { id: newId, givesCard: givesCard }
}