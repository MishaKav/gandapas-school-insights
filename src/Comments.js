import React, { useState, useEffect } from "react";
import { List, Typography, Button } from "antd";

const { Text } = Typography;

export function Comments(props) {
  const {
    isLoading,
    activeQuestion = {},
    allComments = [],
    comments = []
  } = props;

  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setFavorites(getFromLocalStorage());
  }, [allComments]);

  const handleFavorite = index => {
    let arr = [...favorites];

    if (favorites.includes(index)) {
      arr = favorites.filter(f => f != index);
    } else {
      arr.push(index);
    }

    saveToLocalStorage(arr);
    setFavorites(arr);
  };

  const getFromLocalStorage = () => {
    const arrString = localStorage.getItem(getName());

    if (arrString) {
      return JSON.parse(arrString);
    }

    return [];
  };

  const saveToLocalStorage = arr => {
    localStorage.setItem(getName(), JSON.stringify(arr));
  };

  const getName = () => `lesson_${activeQuestion?.index}`;

  const startIcon = () => (
    <span role="img" aria-label="star" class="anticon anticon-star">
      <svg
        viewBox="64 64 896 896"
        focusable="false"
        data-icon="star"
        width="1em"
        height="1em"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3zM664.8 561.6l36.1 210.3L512 672.7 323.1 772l36.1-210.3-152.8-149L417.6 382 512 190.7 606.4 382l211.2 30.7-152.8 148.9z" />
      </svg>
    </span>
  );

  return (
    <>
      <List
        bordered
        itemLayout="vertical"
        loading={isLoading}
        dataSource={comments}
        pagination
        renderItem={(c, i) => {
          const index = allComments.indexOf(c);

          return (
            <List.Item
              actions={[
                <Button
                  key="start"
                  shape="circle"
                  type={favorites.includes(index) ? "primary" : "default"}
                  onClick={() => handleFavorite(index)}
                  icon={startIcon()}
                />
              ]}
            >
              <List.Item.Meta
                title={
                  <>
                    Comment {i}{" "}
                    <Text type="secondary">
                      characters {c.length}, words {c.split(" ").length}
                    </Text>{" "}
                    #{index}
                  </>
                }
                description={
                  <div style={{ whiteSpace: "break-spaces" }}>{c}</div>
                }
              />
            </List.Item>
          );
        }}
      />
    </>
  );
}
