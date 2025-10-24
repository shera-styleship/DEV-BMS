import Input from "./Input";

const meta = {
  component: Input,
  tags: ["autodocs"],
};

export default meta;

export const Default = {
  args: {
    inputType: {},
    toggleVisibility: {},
    inputAble: {},
  },
};

export const Text = {
  args: {
    inputType: "text",
    inputPlaceholder: "이메일을 입력하세요",
    inputValue: "",
    inputChar: "login",
  },
};

export const PasswordWithToggle = {
  args: {
    inputType: "password",
    inputPlaceholder: "비밀번호",
    toggleVisibility: true,
    inputChar: "login",
  },
};

export const File = {
  args: {
    inputType: "file",
    inputLabel: "프로필 이미지",
  },
};
