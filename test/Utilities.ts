export default class Utilities {
    /**
     * A method to allow for JavaScript threads to sleep using await.
     * @param timeInMilliseconds The amount of time to sleep, in milliseconds.
     */
    public static sleep(timeInMilliseconds: number): Promise<void> {
        return new Promise<void>(resolve => setTimeout(resolve, timeInMilliseconds));
    }
}