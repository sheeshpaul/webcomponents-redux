/**
 * Logs error message in development mode.
 * @param message - The message to log
 */
export function logError(message: string): void {
    if (process.env.NODE_ENV === 'development') {
        console.error(message);
    }
}

/**
 * Logs error message in development mode.
 * @param message - The message to log
 */
export function logWarning(message: string): void {
    if (process.env.NODE_ENV === 'development') {
        console.warn(message);
    }
}
