export interface INotificationService<T> {
  notify(payload: T): Promise<void>;
}
