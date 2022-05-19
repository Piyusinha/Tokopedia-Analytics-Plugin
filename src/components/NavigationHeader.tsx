import React from "react";
import { Radio, Row, Typography } from "antd";
import { Toolbar, usePlugin, useValue } from "flipper-plugin";
import {
  BarsOutlined,
  DeploymentUnitOutlined,
  GithubOutlined,
} from "@ant-design/icons";

import { plugin } from "..";

const NavigationHeader: React.FC = () => {
  const instance = usePlugin(plugin);
  const selection = useValue(instance.selection);

  return (
    <Toolbar
      position="bottom"
    >
      <Radio.Group
        defaultValue={selection}
        onChange={({ target: { value } }) => instance.setSelection(value)}
      >
        <Radio.Button value="atoms">
          <DeploymentUnitOutlined style={{ marginRight: 5 }} />
          <Typography.Text>Card Views</Typography.Text>
        </Radio.Button>
        <Radio.Button value="logs">
          <BarsOutlined style={{ marginRight: 5 }} />
          <Typography.Text>List Views</Typography.Text>
        </Radio.Button>
      </Radio.Group>
    </Toolbar>
  );
};

export default NavigationHeader;
