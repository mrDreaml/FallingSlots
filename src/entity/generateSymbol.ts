export default (): string => {
    const symbolQuantity = 7;
    const symbolId = Math.floor(Math.random() * symbolQuantity) + 1;
    const fileExtension = 'png';
    return `symbol_${symbolId}.${fileExtension}`;
}