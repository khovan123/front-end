export default function Tab({ children, buttons, ElementContainer = "menu" }) {
  return (
    <>
      <ElementContainer>{buttons}</ElementContainer>
      {children}
    </>
  );
}
