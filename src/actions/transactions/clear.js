export const DESTROY_TRANSACTION = 'DESTROY_TRANSACTION'
export function clearTransaction() {
    return {
        type: DESTROY_TRANSACTION
    } 
}