import React, { useState } from "react";
import {
  Select,
  Typography,
  Layout,
  Row,
  Col,
  Alert,
  Divider,
  InputNumber,
  Button
} from "antd";
import { questions } from "./data/questions";
import { Insights } from "./Insights";
import { Comments } from "./Comments";
import lessons0 from "./data/lesson_0_173121130_6200";
import "antd/dist/antd.css";

const { Header, Content, Footer } = Layout;
const { Text } = Typography;
const { Option } = Select;

export default function App() {
  const [activeQuestion, setActiveQuestion] = useState(questions[0]);
  const [activeComments, setActiveComments] = useState(lessons0);
  const [limit, setLimit] = useState(2000);
  const [skip, setSkip] = useState(0);

  const onChangeQuestion = async index => {
    const currentQuestion = questions.find(q => q.index === index);
    setActiveQuestion(currentQuestion);

    // very ugly solution, await import is not working properly
    if (currentQuestion.index === 0) {
      const comments = (await import(`./data/lesson_0_173121130_6200.js`))
        .default;
      setActiveComments(comments);
    }
    if (currentQuestion.index === 1) {
      const comments = (await import(`./data/lesson_1_173121131_7743.js`))
        .default;
      setActiveComments(comments);
    }
    if (currentQuestion.index === 2) {
      const comments = (await import(`./data/lesson_2_173121132_6273.js`))
        .default;
      setActiveComments(comments);
    }
    if (currentQuestion.index === 3) {
      const comments = (await import(`./data/lesson_3_173121133_5364.js`))
        .default;
      setActiveComments(comments);
    }
    if (currentQuestion.index === 4) {
      const comments = (await import(`./data/lesson_4_173121134_3753.js`))
        .default;
      setActiveComments(comments);
    }
    if (currentQuestion.index === 5) {
      const comments = (await import(`./data/lesson_5_173121135_1693.js`))
        .default;
      setActiveComments(comments);
    }
  };

  const commentsToShow = activeComments
    .filter(c => c.length > limit)
    .filter((_, i) => i >= skip);

  return (
    <Layout>
      <Header style={{ color: "white" }}>"Компас лидера. Путь к успеху"</Header>

      <Content style={{ padding: 20, minHeight: "89vh" }}>
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

        <Row justify="space-between">
          <Col style={{ width: 300 }}>
            <Insights comments={activeComments} />
          </Col>

          <Col style={{ width: "calc(100% - 340px)" }}>
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
            <Comments comments={commentsToShow} />
          </Col>
        </Row>
      </Content>

      <Footer>by Misha Kav</Footer>
    </Layout>
  );
}
