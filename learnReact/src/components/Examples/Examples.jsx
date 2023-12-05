import TabButton from "../TabButton/TabButton.jsx";
import Section from "../Section.jsx";
import Tab from "../Tab";
import { EXAMPLES } from "../../data.js";
import { useState } from "react";
import "./Examples.css";

export default function Examples() {
  const [tabContent, setTabContent] = useState("components");
  function handleClick(content) {
    setTabContent(content);
  }
  return (
    <Section id="examples">
      <Tab
        buttons={
          <>
            <ul>
              <TabButton
                isSelected={tabContent === "components"}
                onSelected={() => handleClick("components")}
              >
                Components
              </TabButton>
              <TabButton
                isSelected={tabContent === "jsx"}
                onSelected={() => handleClick("jsx")}
              >
                JSX
              </TabButton>
              <TabButton
                isSelected={tabContent === "props"}
                onSelected={() => handleClick("props")}
              >
                Props
              </TabButton>
              <TabButton
                isSelected={tabContent === "state"}
                onSelected={() => handleClick("state")}
              >
                State
              </TabButton>
            </ul>
          </>
        }
      >
        {!tabContent ? null : (
          <Section id="tab-content">
            <h3>{EXAMPLES[tabContent].title}</h3>
            <p>{EXAMPLES[tabContent].description}</p>
            <pre>
              <code>{EXAMPLES[tabContent].code}</code>
            </pre>
          </Section>
        )}
      </Tab>
    </Section>
  );
}
