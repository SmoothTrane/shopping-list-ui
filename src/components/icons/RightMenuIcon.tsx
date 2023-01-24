interface RightMenuProps {
  handleClick: React.MouseEventHandler<HTMLDivElement>;
}

export default function RightMenu({ handleClick }: RightMenuProps) {
  return (
    <div style={{ cursor: "pointer" }} onClick={handleClick}>
      <svg
        width="13"
        height="12"
        viewBox="0 0 13 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.59 1.41L5.18 6L0.59 10.59L2 12L8 6L2 0L0.59 1.41ZM11 0H13V12H11V0Z"
          fill="#555F7C"
        />
      </svg>
    </div>
  );
}
