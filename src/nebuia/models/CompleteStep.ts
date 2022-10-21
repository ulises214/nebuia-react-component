export interface CompleteStep {
  readonly name: 'email' | 'phone' | 'liveness' | 'address' | 'id';
  readonly status: boolean;
}
