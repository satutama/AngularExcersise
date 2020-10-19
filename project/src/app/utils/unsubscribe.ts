import { Subscription } from 'rxjs';

export function unsubscribe(subscription: Subscription | null | undefined): void {
    if (subscription) {
        subscription.unsubscribe();
    }
}

export function unsubscribeAll(subscriptions: Array<Subscription | null | undefined> = []): void {
    subscriptions.forEach(unsubscribe);
}
