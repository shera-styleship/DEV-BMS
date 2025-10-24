import Button from "./Button";

const meta = {
  component: Button,
  tags: ["autodocs"],
};

export default meta;

export const Default = {
  args: {
    btnType: {},
  },
};

export const Reset = {
  args: {
    btnType: "reset",
    children: "Reset",
    btnSize: "middle",
    btnChar: "orange",
  },
};
