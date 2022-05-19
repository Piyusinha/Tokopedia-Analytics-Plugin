import React from "react";
import {
  DataTableColumn,
  MasterDetail,
  theme,
  usePlugin,
  useValue,
} from "flipper-plugin";

import { AtomLoadableState, Row, stateTagColor } from "../types";
import { plugin } from "..";

export const rowStyle = (state: AtomLoadableState) => ({
  ...theme.monospace,
  color: stateTagColor[state],
  margin: 0,
});

const columns: DataTableColumn<Row>[] = [
  {
    key: "name",
    onRender: (row) => <p style={rowStyle(row.state)}>{row.name}</p>,
    width: 130,
  },
  {
    key: "time",
    title: "Time",
    width: 150,
    onRender: (row) => <p style={rowStyle(row.state)}>{row.time}</p>,
  },
  {
    key: "state",
    onRender: (row) => <p style={rowStyle(row.state)}>{row.state}</p>,
    filters: Object.keys(AtomLoadableState).map((value) => ({
      label: value,
      value,
      enabled: false,
    })),
    width: 90,
  },
  {
    key: "data",
    wrap: true,
    onRender: (row) => (
      <pre style={rowStyle(row.state)}>
        {JSON.stringify(row.data, null, 2)}
      </pre>
    ),
  },
];

const RecoilLogs: React.FC = () => {
  const instance = usePlugin(plugin);
  const rows = useValue(instance.rows);

  return (
    <MasterDetail
      columns={columns}
      records={rows}
      recordsKey="id"
      enableClear
      onClear={instance.sendDelete}
    />
  );
};

export default RecoilLogs;
