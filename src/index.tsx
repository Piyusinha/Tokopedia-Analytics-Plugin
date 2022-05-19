import React from "react";
import { usePlugin, useValue, Layout } from "flipper-plugin";
import { PluginClient, createState } from "flipper-plugin";
import dayjs from "dayjs";
import { v4 } from "uuid";

import localizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(localizedFormat);

import { Row, PluginEvents, Selection ,Methods } from "./types";
import { NavigationHeader } from "./components";
import { AtomStates, RecoilLogs } from "./pages";
import { message } from "antd";

export function plugin(client: PluginClient<PluginEvents, Methods>) {
  const rows = createState<Row[]>([], { persist: "rows" });
  const atoms = createState<Record<string, Row>>({}, { persist: "atoms" });
  const selection = createState<Selection>("logs", {
    persist: "selection",
  });
  const expandData = createState<boolean>(false, { persist: "expandData" });

  client.onMessage("newRow", (row) => {
    // const formattedRow = {
    //   ...row,
    //   id:v4()
    // };
    rows.update((draft) => [...draft, row]);
    // atoms.update((draft) => ({ draft, [row.data]: row }));
    atoms.update((draft) => {
      draft[row.id] = row;
    });
  });

  client.onMessage("message",(message)=>{
    if(message.message = "delete"){
      clearRows()
    }
  })
  const setSelection = (newSelection: Selection) => {
    selection.set(newSelection);
  };

  const setExpandData = (newExpandData: boolean) => {
    expandData.set(newExpandData);
  };

  const clearRows = () => {
    rows.set([]);
    atoms.set({})
  };
  async function sendDelete(){
        rows.set([]);
        atoms.set({})
    if(client.isConnected){
      try {
        const currentLogs = await client.send('deleteAnalytics', {
          action: "delete"
        })
        console.log("Deleted")
      } catch (e) {
        console.error("Failed to retrieve current logs: ", e)
      }
  }else{
    console.log("NotConnected")
  }
}
  return {
    clearRows,
    rows,
    atoms,
    selection,
    setSelection,
    expandData,
    setExpandData,
    sendDelete
  };
}

export function Component() {
  const instance = usePlugin(plugin);
  const selection = useValue(instance.selection);

  return (
    <Layout.Container grow>
      <NavigationHeader />
      {selection === "logs" && <RecoilLogs />}
      {selection === "atoms" && <AtomStates />}
    </Layout.Container>
  );
}
