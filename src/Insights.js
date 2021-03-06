import React from "react";
import { Typography, List } from "antd";

const { Text } = Typography;

export function Insights(props) {
  const { comments = [], isLoading } = props;

  const filterByLength = limit => comments.filter(c => c.length > limit).length;

  const insights = [
    {
      text: "All comments",
      value: comments.length
    },
    {
      text: "Max characters",
      value: comments?.sort((a,b) => b.length - a.length)[0]?.length
    },
    {
      text: "More than 200 characters",
      value: filterByLength(200)
    },
    {
      text: "More than 500 characters",
      value: filterByLength(500)
    },
    {
      text: "More than 1000 characters",
      value: filterByLength(1000)
    },

    {
      text: "More than 3000 characters",
      value: filterByLength(3000)
    },
    {
      text: "More than 5000 characters",
      value: filterByLength(5000)
    }
  ];

  return (
    <>
      <List
        loading={isLoading}
        style={{ width: 300 }}
        size="small"
        bordered
        itemLayout="horizontal"
        dataSource={insights}
        renderItem={i => (
          <List.Item>
            <Text>{i.text}</Text>
            <Text strong>{i.value}</Text>
          </List.Item>
        )}
      />
    </>
  );
}
