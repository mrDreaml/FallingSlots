export default (currentSpeed: number, weight: number, deltaX: number): number => {
    return Math.sqrt(currentSpeed**2 + 2 * weight * 10 * deltaX);
}
