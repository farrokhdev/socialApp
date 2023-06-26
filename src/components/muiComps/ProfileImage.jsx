import { Box } from "@mui/material";

const ProfileImage = ({ image, size = "60px" }) => {
  return (
    <Box
      className="rounded-full"
      width={size}
      height={size}
      overflow={"hidden"}
    >
      <img
        className="object-coverb rounded-full"
        width={size}
        height={size}
        src={`http://localhost:5173/assets/${image}`}
        // src={image}
        alt="user"
      />
    </Box>
  );
};

export default ProfileImage;
