import React, { useState, useEffect } from "react";
import { Select, Layout, Row, Col, Alert, Divider, InputNumber } from "antd";
import { questions } from "./data/questions";
import { Insights } from "./Insights";
import { Comments } from "./Comments";
import "antd/dist/antd.css";

const { Header, Content, Footer } = Layout;
const { Option } = Select;

export default function App() {
  const [activeQuestion, setActiveQuestion] = useState(questions[1]);
  const [activeComments, setActiveComments] = useState([]);
  const [limit, setLimit] = useState(2000);
  const [skip, setSkip] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    onChangeQuestion(1);
  }, []);

  const onChangeQuestion = async index => {
    const currentQuestion = questions.find(q => q.index === index);
    setActiveQuestion(currentQuestion);

    try {
      setIsLoading(true);
      const response = await fetch(
        `https://raw.githubusercontent.com/MishaKav/gandapas-school-insights/data-only/src/data/lesson_${
          currentQuestion.index
        }.json`
      );
      const comments = await response.json();
      setActiveComments(comments);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const commentsToShow = activeComments
    .filter(c => c.length > limit)
    .filter((_, i) => i >= skip);

  return (
    <Layout>
      <Header style={{ color: "white" }}>"Компас лидера. Путь к успеху"</Header>

      <Content style={{ padding: 10 }}>
        <Row>
          <Col>
            <Select
              defaultValue={activeQuestion.index}
              onChange={onChangeQuestion}
            >
              {questions.map(q => (
                <Option key={q.index} value={q.index}>
                  Question {q.index}
                </Option>
              ))}
            </Select>
          </Col>

          <Col>
            <InputNumber
              min={0}
              max={10000}
              step={100}
              defaultValue={limit}
              onChange={value => setLimit(value)}
              placeholder="limit"
            />
          </Col>

          <Col>
            <InputNumber
              min={0}
              max={10000}
              step={1}
              defaultValue={skip}
              onChange={value => setSkip(value)}
              placeholder="skip"
            />
          </Col>
        </Row>

        <Divider />

        <Row gutter={[20, 20]} justify="space-between">
          <Col>
            <Insights comments={activeComments} />
          </Col>

          <Col>
            <Alert
              showIcon
              message={`Question ${activeQuestion.index}`}
              description={activeQuestion.question}
            />
          </Col>
        </Row>

        <Divider />

        <Row>
          <Col span={24}>{`All ${commentsToShow.length}/${
            activeComments.length
          }`}</Col>

          <Col span={24}>
            <Comments isLoading={isLoading} comments={commentsToShow} />
          </Col>
        </Row>
      </Content>

      <Footer>by Misha Kav</Footer>
    </Layout>
  );
}
