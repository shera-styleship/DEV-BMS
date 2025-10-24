export const getUserImageSrc = (userImage) => {
  if (!userImage) return "/images/default.svg";
  if (typeof userImage === "string") return userImage; // 문자열 → 더미
  if (userImage instanceof File || userImage instanceof Blob)
    return URL.createObjectURL(userImage); // File → 새 가입자
  return "/images/default.svg";
};
