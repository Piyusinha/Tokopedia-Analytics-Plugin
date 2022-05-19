import { theme } from "flipper-plugin";

export enum AtomLoadableState {
  hasValue = "hasValue",
  loading = "loading",
  hasError = "hasError",
}

export const stateTagColor: Record<AtomLoadableState, string> = {
  hasError: theme.errorColor,
  hasValue: theme.textColorSecondary,
  loading: theme.warningColor,
};

export type Row =  {
  data: string;
  name: string;
  time: string;
  state: AtomLoadableState;
  id: number;
}
export type Message =  {
  message: string
}
// export interface RowData extends IncomingRowData {
//   id: number;
// }

export type Selection = "logs" | "atoms";

export type PluginEvents = {
  newRow: Row;
  message: Message;
};

export type Methods = {
  deleteAnalytics(params: {action: string}): Promise<string[]>;
}
