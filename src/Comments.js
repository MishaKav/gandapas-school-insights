import React from "react";
import { List, Avatar, Typography } from "antd";

const { Text } = Typography;

export function Comments(props) {
  const { comments = [] } = props;

  return (
    <>
      <List
        bordered
        itemLayout="horizontal"
        dataSource={comments}
        pagination
        renderItem={(c, i) => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
              }
              title={
                <>
                  Comment {i}{" "}
                  <Text type="secondary">
                    characters {c.length}, words {c.split(" ").length}
                  </Text>
                </>
              }
              description={
                <div style={{ whiteSpace: "break-spaces" }}>{c}</div>
              }
            />
          </List.Item>
        )}
      />
    </>
  );
}
