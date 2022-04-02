export interface Dialog {
  question: string;
  actionSuccess: string;
  actionDanger: string;
  resultHandler(result: boolean | undefined): void;
}
